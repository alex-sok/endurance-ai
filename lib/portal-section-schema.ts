import { z } from "zod";

// Keep in sync with CRM lib/briefings/schema.ts

export const portalSectionMapSchema = z.object({
  overview: z.object({
    body: z.string(),
    bullets: z.array(z.string()),
  }),
  problem: z.object({
    body: z.string(),
    challenges: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      }),
    ),
  }),
  solution: z.object({
    body: z.string(),
    pillars: z.array(
      z.object({
        title: z.string(),
        tag: z.string().optional(),
        description: z.string(),
      }),
    ),
  }),
  roadmap: z.object({
    phases: z.array(
      z.object({
        phase: z.string(),
        title: z.string(),
        duration: z.string(),
        milestones: z.array(z.string()),
      }),
    ),
  }),
  team: z.object({
    members: z.array(
      z.object({
        name: z.string(),
        role: z.string(),
        bio: z.string().optional(),
      }),
    ),
  }),
  metrics: z.object({
    body: z.string().optional(),
    kpis: z.array(
      z
        .object({
          label: z.string(),
          value: z.string(),
          description: z.string().optional(),
        })
        .passthrough(),
    ),
  }),
});

export const publishPortalSectionsSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  client_name: z.string().min(1),
  hero_title: z.string().min(1),
  hero_body: z.string().optional(),
  tagline: z.string().optional(),
  accent_color: z.string().optional(),
  sections: portalSectionMapSchema,
  portal_id: z.string().uuid().nullable().optional(),
  force: z.boolean().optional(),
});

export type PortalSectionMap = z.infer<typeof portalSectionMapSchema>;
export type PublishPortalSectionsBody = z.infer<typeof publishPortalSectionsSchema>;
