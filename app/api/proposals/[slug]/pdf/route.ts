import {
  findPublishedProposal,
  canReadProposal,
  readPublishedPdf,
} from "@/lib/mission-proposals/server";
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const p = await findPublishedProposal(slug);
  if (!p) return new Response("Not found", { status: 404 });
  if (!(await canReadProposal(p)))
    return new Response(
      "Enter your access code in the mission briefing first.",
      { status: 401 },
    );
  const pdf = await readPublishedPdf(p);
  if (!pdf)
    return new Response("The briefing changed. Reload and try again.", {
      status: 409,
    });
  return new Response(new Uint8Array(Buffer.from(pdf, "base64")), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${slug}-v${p.revision}.pdf"`,
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
