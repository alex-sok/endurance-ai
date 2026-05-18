/**
 * Fetches Notion pages via the REST API and splits them into text chunks
 * ready for embedding and storage in portal_chunks.
 * Handles page text, child pages (recursive), and file attachments (PDF, DOCX).
 */

import { parseFileFromUrl } from "./parse-file";

const NOTION_API = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";
const CHUNK_WORDS = 400; // ~500 tokens

// ── Types ─────────────────────────────────────────────────────────────────────

export interface NotionChunk {
  content: string;
  source_url: string;
  source_title: string;
  chunk_index: number;
}

interface Block {
  id: string;
  type: string;
  has_children: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// ── Notion API helpers ────────────────────────────────────────────────────────

function headers(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "Notion-Version": NOTION_VERSION,
    "Content-Type": "application/json",
  };
}

async function getPage(pageId: string, token: string): Promise<{ title: string; url: string }> {
  const res = await fetch(`${NOTION_API}/pages/${pageId}`, { headers: headers(token) });
  if (!res.ok) throw new Error(`Notion getPage ${pageId}: ${res.status}`);
  const data = await res.json();

  // Extract title from properties
  const titleProp = Object.values(data.properties ?? {}).find(
    (p: any) => p.type === "title"
  ) as any;
  const title = titleProp?.title?.[0]?.plain_text ?? "Untitled";
  const url = data.url ?? `https://notion.so/${pageId.replace(/-/g, "")}`;
  return { title, url };
}

async function getBlocks(blockId: string, token: string): Promise<Block[]> {
  const blocks: Block[] = [];
  let cursor: string | undefined;

  do {
    const url = `${NOTION_API}/blocks/${blockId}/children?page_size=100${cursor ? `&start_cursor=${cursor}` : ""}`;
    const res = await fetch(url, { headers: headers(token) });
    if (!res.ok) throw new Error(`Notion getBlocks ${blockId}: ${res.status}`);
    const data = await res.json();
    blocks.push(...(data.results ?? []));
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);

  return blocks;
}

// ── Rich text extraction ──────────────────────────────────────────────────────

function richTextToString(richText: any[]): string {
  return (richText ?? []).map((t: any) => t.plain_text ?? "").join("");
}

// ── Block tree → plain text ───────────────────────────────────────────────────

async function blocksToText(blockId: string, token: string, depth = 0): Promise<string> {
  const blocks = await getBlocks(blockId, token);
  const lines: string[] = [];

  for (const block of blocks) {
    let text = "";

    switch (block.type) {
      case "paragraph":
        text = richTextToString(block.paragraph?.rich_text);
        break;
      case "heading_1":
        text = `# ${richTextToString(block.heading_1?.rich_text)}`;
        break;
      case "heading_2":
        text = `## ${richTextToString(block.heading_2?.rich_text)}`;
        break;
      case "heading_3":
        text = `### ${richTextToString(block.heading_3?.rich_text)}`;
        break;
      case "bulleted_list_item":
        text = `• ${richTextToString(block.bulleted_list_item?.rich_text)}`;
        break;
      case "numbered_list_item":
        text = `- ${richTextToString(block.numbered_list_item?.rich_text)}`;
        break;
      case "quote":
        text = `> ${richTextToString(block.quote?.rich_text)}`;
        break;
      case "callout":
        text = richTextToString(block.callout?.rich_text);
        break;
      case "toggle":
        text = richTextToString(block.toggle?.rich_text);
        break;
      case "to_do":
        text = richTextToString(block.to_do?.rich_text);
        break;
      case "code":
        text = richTextToString(block.code?.rich_text);
        break;
      case "file":
      case "pdf": {
        // Notion uploaded file or embedded PDF — download and parse
        const fileObj = block[block.type];
        const fileUrl: string | undefined =
          fileObj?.file?.url ?? fileObj?.external?.url;
        const fileName: string =
          fileObj?.name ?? (block.type === "pdf" ? "attachment.pdf" : "attachment");
        if (fileUrl) {
          const parsed = await parseFileFromUrl(fileUrl, fileName);
          if (parsed) text = `[File: ${fileName}]\n${parsed}`;
        }
        break;
      }
      case "child_page":
        // Skip — handled separately as its own document
        break;
      case "link_to_page":
        // Skip inline — the target page is crawled in fetchAndChunkPage
        break;
      case "synced_block": {
        // Synced blocks: recurse into the synced source if present
        const syncedFrom = block.synced_block?.synced_from;
        if (!syncedFrom && block.has_children) {
          // Original synced block — children are inline, recurse normally
          const syncedText = await blocksToText(block.id, token, depth + 1);
          if (syncedText.trim()) lines.push(syncedText);
        }
        break;
      }
      default:
        break;
    }

    if (text.trim()) lines.push(text.trim());

    // Recurse into non-child_page / non-link_to_page blocks that have children
    if (
      block.has_children &&
      block.type !== "child_page" &&
      block.type !== "link_to_page" &&
      block.type !== "synced_block"
    ) {
      const childText = await blocksToText(block.id, token, depth + 1);
      if (childText.trim()) lines.push(childText);
    }
  }

  return lines.join("\n");
}

// ── Text chunker ──────────────────────────────────────────────────────────────

function chunkText(text: string, title: string, url: string): NotionChunk[] {
  // Split into paragraphs, then merge into ~CHUNK_WORDS word chunks
  const paragraphs = text.split(/\n+/).filter((p) => p.trim().length > 0);
  const chunks: NotionChunk[] = [];
  let current: string[] = [];
  let wordCount = 0;

  const flush = () => {
    if (current.length === 0) return;
    const content = `${title}\n\n${current.join("\n")}`.trim();
    if (content.length > 50) {
      chunks.push({ content, source_url: url, source_title: title, chunk_index: chunks.length });
    }
    current = [];
    wordCount = 0;
  };

  for (const para of paragraphs) {
    const words = para.split(/\s+/).length;
    if (wordCount + words > CHUNK_WORDS && current.length > 0) {
      flush();
    }
    current.push(para);
    wordCount += words;
  }
  flush();

  return chunks;
}

// ── Extract Notion page links from rich text ──────────────────────────────────

/**
 * Scans a block list for rich_text elements whose href points to a Notion page,
 * extracts the page IDs, and returns them for recursive crawling.
 * Handles the "Master Index" pattern where bullet items are plain text linked to pages.
 */
function extractNotionHrefLinks(blocks: Block[]): string[] {
  const pageIds: string[] = [];
  // Match notion.so/<optional-workspace>/<32-hex-char page ID>
  const notionPagePattern = /notion\.so\/(?:[^/]*\/)?([a-f0-9]{32})(?:[?#]|$)/i;

  for (const block of blocks) {
    const blockContent = block[block.type];
    if (!blockContent) continue;

    const richTextArrays: any[][] = [
      blockContent.rich_text,
      blockContent.title,
      blockContent.caption,
    ].filter(Array.isArray);

    for (const richText of richTextArrays) {
      for (const rt of richText) {
        const href: string | null = rt.href ?? rt.text?.link?.url ?? null;
        if (!href) continue;
        const match = href.match(notionPagePattern);
        if (match) {
          const raw = match[1];
          // Format raw 32-char hex into UUID format
          const uuid = `${raw.slice(0,8)}-${raw.slice(8,12)}-${raw.slice(12,16)}-${raw.slice(16,20)}-${raw.slice(20)}`;
          pageIds.push(uuid);
        }
      }
    }
  }

  return pageIds;
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Fetches a Notion page and all its child pages recursively.
 * Returns an array of chunks ready for embedding.
 */
export async function fetchAndChunkPage(
  pageId: string,
  token: string,
  visited = new Set<string>()
): Promise<NotionChunk[]> {
  if (visited.has(pageId)) return [];
  visited.add(pageId);

  const allChunks: NotionChunk[] = [];

  try {
    // Get page metadata
    const { title, url } = await getPage(pageId, token);

    // Get page text
    const text = await blocksToText(pageId, token);
    if (text.trim()) {
      allChunks.push(...chunkText(text, title, url));
    }

    // Recurse into child pages and linked page references
    const blocks = await getBlocks(pageId, token);

    // Follow Notion href links embedded in rich text (Master Index pattern)
    const hrefPageIds = extractNotionHrefLinks(blocks);
    for (const linkedId of hrefPageIds) {
      const linkedChunks = await fetchAndChunkPage(linkedId, token, visited);
      allChunks.push(...linkedChunks);
    }

    for (const block of blocks) {
      if (block.type === "child_page") {
        const childChunks = await fetchAndChunkPage(block.id, token, visited);
        allChunks.push(...childChunks);
      } else if (block.type === "link_to_page") {
        // Linked page reference (used in Master Index / hub pages)
        const linkedId: string | undefined =
          block.link_to_page?.page_id ?? block.link_to_page?.database_id;
        if (linkedId) {
          const linkedChunks = await fetchAndChunkPage(linkedId, token, visited);
          allChunks.push(...linkedChunks);
        }
      } else if (block.type === "child_database") {
        // Inline database — fetch all its pages
        try {
          const dbRes = await fetch(`${NOTION_API}/databases/${block.id}/query`, {
            method: "POST",
            headers: headers(token),
            body: JSON.stringify({ page_size: 100 }),
          });
          if (dbRes.ok) {
            const dbData = await dbRes.json();
            for (const page of dbData.results ?? []) {
              const dbPageChunks = await fetchAndChunkPage(page.id, token, visited);
              allChunks.push(...dbPageChunks);
            }
          }
        } catch (err) {
          console.error(`[notion-sync] Failed to query database ${block.id}:`, err);
        }
      }
    }
  } catch (err) {
    console.error(`[notion-sync] Failed to fetch page ${pageId}:`, err);
  }

  return allChunks;
}
