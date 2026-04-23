/**
 * Fetches Notion pages via the REST API and splits them into text chunks
 * ready for embedding and storage in portal_chunks.
 */

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
      case "child_page":
        // Skip — handled separately as its own document
        break;
      default:
        break;
    }

    if (text.trim()) lines.push(text.trim());

    // Recurse into non-child_page blocks that have children (toggles, etc.)
    if (block.has_children && block.type !== "child_page") {
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

    // Recurse into child pages
    const blocks = await getBlocks(pageId, token);
    for (const block of blocks) {
      if (block.type === "child_page") {
        const childChunks = await fetchAndChunkPage(block.id, token, visited);
        allChunks.push(...childChunks);
      }
    }
  } catch (err) {
    console.error(`[notion-sync] Failed to fetch page ${pageId}:`, err);
  }

  return allChunks;
}
