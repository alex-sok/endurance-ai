/**
 * Text embeddings via OpenAI text-embedding-3-small (1536 dimensions).
 * Used for both sync (storing chunks) and query (RAG retrieval) so vectors match.
 * xAI is used for chat (Grok); OpenAI is used only for embeddings.
 */

import OpenAI from "openai";

const EMBEDDING_MODEL = "text-embedding-3-small";

function client(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not set");
  return new OpenAI({ apiKey });
}

/** Embed a single string. Returns null on failure. */
export async function embedText(text: string): Promise<number[] | null> {
  try {
    const xai = client();
    const res = await xai.embeddings.create({ model: EMBEDDING_MODEL, input: text });
    return res.data[0]?.embedding ?? null;
  } catch (err) {
    console.error("[embed] embedText failed:", err);
    return null;
  }
}

/** Embed multiple strings in a single API call. */
export async function embedBatch(texts: string[]): Promise<(number[] | null)[]> {
  if (texts.length === 0) return [];
  try {
    const xai = client();
    const res = await xai.embeddings.create({ model: EMBEDDING_MODEL, input: texts });
    // API returns results in order
    return res.data.map((d) => d.embedding ?? null);
  } catch (err) {
    console.error("[embed] embedBatch failed:", err);
    return texts.map(() => null);
  }
}
