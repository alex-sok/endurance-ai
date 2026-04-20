export interface Portal {
  id: string;
  slug: string;
  client_name: string;
  tagline: string | null;
  logo_url: string | null;
  hero_title: string | null;
  hero_body: string | null;
  accent_color: string;
  is_published: boolean;
  config: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface PortalSection {
  id: string;
  portal_id: string;
  slug: string;
  title: string;
  icon: string | null;
  content: Record<string, unknown>;
  sort_order: number;
  is_visible: boolean;
}

export interface PortalDocument {
  id: string;
  portal_id: string;
  filename: string;
  file_url: string | null;
  mime_type: string | null;
  byte_size: number | null;
  status: "pending" | "processing" | "ready" | "error";
  error_msg: string | null;
  created_at: string;
}

export interface PortalChunk {
  id: string;
  portal_id: string;
  document_id: string | null;
  content: string;
  metadata: Record<string, unknown>;
}

export interface PortalLead {
  id: string;
  portal_id: string;
  session_id: string | null;
  name: string | null;
  email: string | null;
  company: string | null;
  notes: string | null;
  score: number | null;
  created_at: string;
}

export type SectionSlug =
  | "overview"
  | "problem"
  | "solution"
  | "roadmap"
  | "team"
  | "metrics";
