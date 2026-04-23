/**
 * Downloads and extracts plain text from file attachments.
 * Supports: PDF (.pdf), Word (.docx), plain text (.txt, .md)
 * Skips: images, spreadsheets, and other binary formats
 */

export async function parseFileFromUrl(
  url: string,
  filename: string
): Promise<string | null> {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";

  // Skip file types we can't meaningfully parse
  const skip = ["jpg", "jpeg", "png", "gif", "webp", "svg", "xlsx", "xls", "csv", "zip"];
  if (skip.includes(ext)) {
    console.log(`[parse-file] Skipping unsupported file type: ${filename}`);
    return null;
  }

  // Download the file
  let buffer: Buffer;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`[parse-file] Failed to download ${filename}: ${res.status}`);
      return null;
    }
    const arrayBuffer = await res.arrayBuffer();
    buffer = Buffer.from(arrayBuffer);
  } catch (err) {
    console.error(`[parse-file] Download error for ${filename}:`, err);
    return null;
  }

  // Parse based on extension
  try {
    if (ext === "pdf") {
      return await parsePdf(buffer, filename);
    }
    if (ext === "docx") {
      return await parseDocx(buffer, filename);
    }
    if (["txt", "md", "markdown"].includes(ext)) {
      return buffer.toString("utf-8");
    }
  } catch (err) {
    console.error(`[parse-file] Parse error for ${filename}:`, err);
  }

  return null;
}

// ── PDF ───────────────────────────────────────────────────────────────────────

async function parsePdf(buffer: Buffer, filename: string): Promise<string | null> {
  try {
    // Dynamic import avoids the test-file loading issue pdf-parse has at static import time
    const pdfParse = (await import("pdf-parse/lib/pdf-parse.js")).default;
    const data = await pdfParse(buffer);
    const text = data.text?.trim();
    if (!text) {
      console.warn(`[parse-file] PDF had no extractable text: ${filename}`);
      return null;
    }
    console.log(`[parse-file] PDF parsed: ${filename} (${data.numpages} pages, ${text.length} chars)`);
    return text;
  } catch (err) {
    console.error(`[parse-file] PDF parse failed for ${filename}:`, err);
    return null;
  }
}

// ── DOCX ──────────────────────────────────────────────────────────────────────

async function parseDocx(buffer: Buffer, filename: string): Promise<string | null> {
  try {
    const mammoth = await import("mammoth");
    const result = await mammoth.extractRawText({ buffer });
    const text = result.value?.trim();
    if (!text) {
      console.warn(`[parse-file] DOCX had no extractable text: ${filename}`);
      return null;
    }
    console.log(`[parse-file] DOCX parsed: ${filename} (${text.length} chars)`);
    return text;
  } catch (err) {
    console.error(`[parse-file] DOCX parse failed for ${filename}:`, err);
    return null;
  }
}
