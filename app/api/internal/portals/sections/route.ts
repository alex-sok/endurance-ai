/**
 * POST /api/internal/portals/sections
 *
 * CRM briefing publish: draft upsert of portal_sections.content.
 * Bearer PORTAL_PUBLISH_SECRET. Never sets is_published or password_hash.
 */

import { createClient } from "@/lib/supabase/server";
import { authorizePublish } from "@/lib/portal-publish-auth";
import { rateLimit, getIP } from "@/lib/rate-limit";
import {
  publishPortalSectionsSchema,
  type PortalSectionMap,
} from "@/lib/portal-section-schema";

export const dynamic = "force-dynamic";

const DEFAULT_ACCENT = "#5b8dee";

const NEW_SECTIONS = [
  { slug: "overview" as const, title: "Overview", icon: "LayoutDashboard", sort_order: 0 },
  { slug: "problem" as const, title: "Problem", icon: "Target", sort_order: 1 },
  { slug: "solution" as const, title: "Solution", icon: "Zap", sort_order: 2 },
  { slug: "roadmap" as const, title: "Roadmap", icon: "Map", sort_order: 3 },
  { slug: "team" as const, title: "Team", icon: "Users", sort_order: 4 },
  { slug: "metrics" as const, title: "Metrics", icon: "BarChart2", sort_order: 5 },
];

type PortalRow = {
  id: string;
  slug: string;
  is_published: boolean;
  password_hash: string | null;
  config: Record<string, unknown> | null;
};

function configSource(config: unknown): unknown {
  if (!config || typeof config !== "object") return undefined;
  return (config as Record<string, unknown>).source;
}

function okBody(portal: PortalRow) {
  return {
    ok: true,
    portal_id: portal.id,
    slug: portal.slug,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/mission/${portal.slug}`,
    is_published: portal.is_published,
    needs_password: !portal.password_hash,
  };
}

async function upsertSectionContent(
  supabase: Awaited<ReturnType<typeof createClient>>,
  portalId: string,
  sections: PortalSectionMap,
): Promise<string | null> {
  const fullRows = NEW_SECTIONS.map((meta) => ({
    ...meta,
    portal_id: portalId,
    content: sections[meta.slug],
  }));

  const { error: insertError } = await supabase.from("portal_sections").insert(fullRows);
  if (!insertError) return null;
  if (insertError.code !== "23505") return insertError.message;

  // Unique (portal_id, slug): rows already exist. Content only — do not write title.
  const results = await Promise.all(
    NEW_SECTIONS.map((meta) =>
      supabase
        .from("portal_sections")
        .update({ content: sections[meta.slug] })
        .eq("portal_id", portalId)
        .eq("slug", meta.slug),
    ),
  );
  const failed = results.find((r) => r.error);
  return failed?.error?.message ?? null;
}

export async function POST(request: Request) {
  const ip = getIP(request);
  if (!rateLimit(ip, 30, 60_000)) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  if (!authorizePublish(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = publishPortalSectionsSchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: "Invalid body" }, { status: 400 });
  }

  const {
    slug,
    client_name,
    hero_title,
    hero_body,
    tagline,
    accent_color,
    sections,
    portal_id,
    force,
  } = parsed.data;
  const incomingId = portal_id ?? null;

  const supabase = await createClient(true);

  const { data: existing, error: loadError } = await supabase
    .from("portals")
    .select("id, slug, is_published, password_hash, config")
    .eq("slug", slug)
    .maybeSingle();

  if (loadError) {
    console.log(`[portal-publish] status=500 slug=${slug}`);
    return Response.json({ error: loadError.message }, { status: 500 });
  }

  let portal: PortalRow | null = existing as PortalRow | null;

  if (!portal) {
    const { data: created, error: portalError } = await supabase
      .from("portals")
      .insert({
        slug,
        client_name,
        hero_title,
        hero_body: hero_body?.trim() || null,
        tagline: tagline?.trim() || null,
        accent_color: accent_color?.trim() || DEFAULT_ACCENT,
        is_published: false,
        password_hash: null,
        config: { source: "crm-briefing" },
      })
      .select("id, slug, is_published, password_hash, config")
      .single();

    if (portalError?.code === "23505") {
      const { data: raced, error: raceError } = await supabase
        .from("portals")
        .select("id, slug, is_published, password_hash, config")
        .eq("slug", slug)
        .maybeSingle();
      if (raceError || !raced) {
        console.log(`[portal-publish] status=500 slug=${slug}`);
        return Response.json(
          { error: raceError?.message ?? "Failed to load portal" },
          { status: 500 },
        );
      }
      portal = raced as PortalRow;
    } else if (portalError || !created) {
      console.log(`[portal-publish] status=500 slug=${slug}`);
      return Response.json(
        { error: portalError?.message ?? "Failed to create portal" },
        { status: 500 },
      );
    } else {
      portal = created as PortalRow;
      const sectionError = await upsertSectionContent(supabase, portal.id, sections);
      if (sectionError) {
        console.log(`[portal-publish] status=500 slug=${slug}`);
        return Response.json({ error: sectionError }, { status: 500 });
      }
      console.log(`[portal-publish] status=200 slug=${slug}`);
      return Response.json(okBody(portal));
    }
  }

  if (incomingId && incomingId !== portal.id) {
    console.log(`[portal-publish] status=409 slug=${slug}`);
    return Response.json({ error: "slug_taken" }, { status: 409 });
  }

  if (!incomingId && configSource(portal.config) !== "crm-briefing") {
    console.log(`[portal-publish] status=409 slug=${slug}`);
    return Response.json({ error: "slug_taken" }, { status: 409 });
  }

  if (portal.is_published && force !== true) {
    console.log(`[portal-publish] status=409 slug=${slug}`);
    return Response.json({ error: "portal_live", is_published: true }, { status: 409 });
  }

  const updates: Record<string, unknown> = { client_name };
  if (hero_title !== undefined) updates.hero_title = hero_title;
  if (hero_body !== undefined) updates.hero_body = hero_body.trim() || null;
  if (tagline !== undefined) updates.tagline = tagline.trim() || null;
  if (accent_color !== undefined) updates.accent_color = accent_color.trim() || DEFAULT_ACCENT;

  const portalUpdate =
    force === true
      ? supabase.from("portals").update(updates).eq("id", portal.id)
      : supabase.from("portals").update(updates).eq("id", portal.id).eq("is_published", false);

  const { data: updated, error: updateError } = await portalUpdate.select("id");

  if (updateError) {
    console.log(`[portal-publish] status=500 slug=${slug}`);
    return Response.json({ error: updateError.message }, { status: 500 });
  }

  if (force !== true && (updated?.length ?? 0) === 0) {
    console.log(`[portal-publish] status=409 slug=${slug}`);
    return Response.json({ error: "portal_live", is_published: true }, { status: 409 });
  }

  const sectionError = await upsertSectionContent(supabase, portal.id, sections);
  if (sectionError) {
    console.log(`[portal-publish] status=500 slug=${slug}`);
    return Response.json({ error: sectionError }, { status: 500 });
  }

  console.log(`[portal-publish] status=200 slug=${slug}`);
  return Response.json(okBody(portal));
}
