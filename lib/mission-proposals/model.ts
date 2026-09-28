import { z } from "zod";

// Versioned wire contract. The website carries an identical copy; see contract test.
const text = (max: number) => z.string().trim().min(1).max(max);
const httpsUrl = z
  .string()
  .url()
  .max(500)
  .refine((v) => new URL(v).protocol === "https:", "Use an https URL.");
export const proofLibrary = {
  status: {
    title: "One answer, with its sources",
    body: "At another freight operation, Brain OS brings load records, driver messages and email together to answer status questions.",
    qualifier:
      "Reference deployment; integration and results depend on your systems.",
    url: "https://endurancelabs.ai/brain-os/use-cases",
  },
  documents: {
    title: "A clearer path from delivery to billing",
    body: "A scheduled digest identifies delivered loads without a bill date or proof of delivery, with the party to follow up with.",
    qualifier:
      "An existing workflow at another operation, not a promised result.",
    url: "https://endurancelabs.ai/brain-os/use-cases",
  },
  review: {
    title: "People keep the final say",
    body: "Brain OS prepares order changes for review before writing them to the connected system of record.",
    qualifier: "Operational actions are scoped for each engagement.",
    url: "https://endurancelabs.ai/brain-os/use-cases",
  },
} as const;
export const proposalSchema = z
  .object({
    schemaVersion: z.literal(1),
    clientName: text(90),
    title: text(110),
    summary: text(420),
    context: text(500),
    facts: z
      .array(
        z.object({
          text: text(170),
          basis: z.enum(["rep brief", "meeting notes", "public source"]),
          sourceId: text(40),
        }),
      )
      .min(1)
      .max(4),
    workflows: z
      .array(
        z.object({
          title: text(65),
          question: text(130),
          today: text(240),
          withBrain: text(320),
          needs: text(200),
        }),
      )
      .length(3),
    proofIds: z
      .array(z.enum(["status", "documents", "review"]))
      .min(1)
      .max(3),
    impact: z
      .object({
        annualLoads: z.number().int().positive().max(100000000),
        eligiblePercent: z.number().min(0).max(100),
        adoptionPercent: z.number().min(0).max(100),
        minutesSaved: z.number().positive().max(120),
        volumeSourceId: text(40),
      })
      .nullable(),
    pilot: z.object({
      title: text(90),
      description: text(320),
      steps: z.array(z.object({ title: text(60), body: text(200) })).length(3),
      success: text(240),
    }),
    nextStep: text(240),
    questions: z.array(text(170)).min(1).max(5),
    sources: z
      .array(
        z.object({ id: text(40), label: text(100), url: httpsUrl.nullable() }),
      )
      .min(1)
      .max(12),
  })
  .strict()
  .superRefine((p, ctx) => {
    const ids = new Set(p.sources.map((s) => s.id));
    if (ids.size !== p.sources.length)
      ctx.addIssue({
        code: "custom",
        message: "Source IDs must be unique.",
        path: ["sources"],
      });
    for (const [i, f] of p.facts.entries())
      if (!ids.has(f.sourceId))
        ctx.addIssue({
          code: "custom",
          message: "Fact needs a source.",
          path: ["facts", i, "sourceId"],
        });
    if (p.impact && !ids.has(p.impact.volumeSourceId))
      ctx.addIssue({
        code: "custom",
        message: "Load volume needs a source.",
        path: ["impact", "volumeSourceId"],
      });
  });
export type Proposal = z.infer<typeof proposalSchema>;
export const OFFERING_VERSION = "brain-os-2026-09-28";
export const TEMPLATE_VERSION = "mission-1";
export function annualHours(impact: NonNullable<Proposal["impact"]>) {
  return (
    (((((impact.annualLoads * impact.eligiblePercent) / 100) *
      impact.adoptionPercent) /
      100) *
      impact.minutesSaved) /
    60
  );
}
export const sectionKeys = [
  "title",
  "summary",
  "context",
  "workflows",
  "pilot",
  "nextStep",
] as const;
export type ProposalSection = (typeof sectionKeys)[number];
export const publishSchema = z
  .object({
    id: z.string().uuid(),
    orgId: z.string().uuid(),
    revision: z.number().int().positive(),
    operation: z.number().int().positive(),
    slug: z.string().regex(/^[a-z0-9-]{1,100}$/),
    active: z.boolean(),
    content: proposalSchema,
    pdf: z.string().max(3000000),
    code: z.string().min(8).max(100).optional(),
    issuedAt: z.string().datetime(),
  })
  .strict();
export type Publication = z.infer<typeof publishSchema>;
export type ProposalDTO = {
  id: string;
  slug: string;
  head: number;
  publishedRevision: number | null;
  url: string | null;
  live: boolean;
  publicationPending: boolean;
  brief: string;
  status: "idle" | "generating" | "failed";
  error: string | null;
  content: Proposal | null;
  revisions: { revision: number; createdAt: string; label: string }[];
};
