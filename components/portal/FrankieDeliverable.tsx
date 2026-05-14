"use client";

import { useState } from "react";

// ── Color palette ──────────────────────────────────────────────────────────────

const ACCENT = "#7c3aed"; // purple

const COLOR_MAP: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  blue:    { bg: "#dbeafe", text: "#1e3a8a", border: "#bfdbfe", dot: "#3b82f6" },
  green:   { bg: "#dcfce7", text: "#14532d", border: "#bbf7d0", dot: "#22c55e" },
  purple:  { bg: "#ede9fe", text: "#3b0764", border: "#ddd6fe", dot: "#7c3aed" },
  indigo:  { bg: "#e0e7ff", text: "#1e1b4b", border: "#c7d2fe", dot: "#6366f1" },
  copper:  { bg: "#fef3c7", text: "#78350f", border: "#fde68a", dot: "#f59e0b" },
  magenta: { bg: "#fce7f3", text: "#831843", border: "#fbcfe8", dot: "#ec4899" },
  red:     { bg: "#fee2e2", text: "#7f1d1d", border: "#fecaca", dot: "#ef4444" },
  yellow:  { bg: "#fef9c3", text: "#713f12", border: "#fef08a", dot: "#eab308" },
};

function getColor(name: string) {
  return COLOR_MAP[name] ?? COLOR_MAP.blue;
}

// ── Primitive UI components ───────────────────────────────────────────────────

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ border: "1px solid #e6e5e0", borderRadius: "6px", background: "#fff", overflow: "hidden" }}>
      {children}
    </div>
  );
}

function CardHeader({ children }: { children: React.ReactNode }) {
  return <div style={{ padding: "16px 20px 12px" }}>{children}</div>;
}

function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  const isLarge = className?.includes("text-h2");
  return (
    <p style={{ fontSize: isLarge ? "22px" : "14px", fontWeight: 600, color: "#262510", letterSpacing: "-0.02em", marginBottom: "2px" }}>
      {children}
    </p>
  );
}

function CardDescription({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: "12px", color: "#7a7974", lineHeight: 1.5 }}>{children}</p>;
}

function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  const noPadding = className?.includes("p-0");
  return <div style={{ padding: noPadding ? "0" : "0 20px 16px" }}>{children}</div>;
}

function Table({ children }: { children: React.ReactNode }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
      {children}
    </table>
  );
}

function TableHeader({ children }: { children: React.ReactNode }) {
  return <thead>{children}</thead>;
}

function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

function TableRow({ children, className }: { children: React.ReactNode; className?: string }) {
  const highlight = className?.includes("bg-purple");
  return (
    <tr style={{ background: highlight ? "#ede9fe" : undefined, borderBottom: "1px solid #f0efe9" }}>
      {children}
    </tr>
  );
}

function TableHead({ children }: { children: React.ReactNode }) {
  return (
    <th style={{ padding: "8px 12px", textAlign: "left", fontSize: "11px", fontWeight: 600, color: "#7a7974", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #e6e5e0" }}>
      {children}
    </th>
  );
}

function TableCell({ children, className }: { children: React.ReactNode; className?: string }) {
  const isBold = className?.includes("font-semibold") || className?.includes("font-medium");
  const isPurple = className?.includes("text-purple");
  return (
    <td style={{ padding: "8px 12px", color: isPurple ? "#3b0764" : "#262510", fontWeight: isBold ? 600 : 400 }}>
      {children}
    </td>
  );
}

function Badge({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "secondary" | "outline" }) {
  const styles: Record<string, React.CSSProperties> = {
    default:    { background: ACCENT, color: "#fff" },
    secondary:  { background: "#f0efe9", color: "#262510" },
    outline:    { background: "transparent", color: "#262510", border: "1px solid #e6e5e0" },
  };
  return (
    <span style={{ ...styles[variant], display: "inline-block", padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 500 }}>
      {children}
    </span>
  );
}

// ── Reusable sub-components ───────────────────────────────────────────────────

function DeliverableTag({ children, color = "blue" }: { children: React.ReactNode; color?: string }) {
  const c = getColor(color);
  return (
    <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 500, background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
      {children}
    </span>
  );
}

function SectionHeader({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "16px" }}>
      <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: "50%", background: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#3b0764" }}>{number}</span>
      </div>
      <div>
        <p style={{ fontSize: "13px", fontWeight: 500, color: "#262510" }}>{title}</p>
        <p style={{ fontSize: "11px", color: "#7a7974" }}>{subtitle}</p>
      </div>
    </div>
  );
}

function FeatureRow({ icon, title, description, tags = [] }: {
  icon: string;
  title: string;
  description: string;
  tags?: { label: string; color: string }[];
}) {
  return (
    <div style={{ display: "flex", gap: "12px", padding: "12px 0", borderBottom: "1px solid #f0efe9" }}>
      <div style={{ fontSize: "16px", marginTop: "2px", flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <span style={{ fontSize: "13px", fontWeight: 500, color: "#262510" }}>{title}</span>
          {tags.map(t => <DeliverableTag key={t.label} color={t.color}>{t.label}</DeliverableTag>)}
        </div>
        <p style={{ fontSize: "12px", color: "#7a7974", lineHeight: 1.6 }}>{description}</p>
      </div>
    </div>
  );
}

// ── Milestone data ─────────────────────────────────────────────────────────────

const MILESTONES = [
  {
    week: "Week 1", label: "Discovery & Setup", color: "blue",
    tasks: ["Intake call with Lance", "Data ingestion from website & podcast", "System prompt architecture draft", "Voice selection & persona definition"],
  },
  {
    week: "Week 2", label: "Build & Tune", color: "purple",
    tasks: ["Pipeline wiring (CRM → Frankie)", "Web chat widget live on staging URL", "Phone number provisioned & routed", "Personality iteration sessions"],
  },
  {
    week: "Week 3", label: "Test & Refine", color: "indigo",
    tasks: ["Full QA across all 3 channels", "Territory check automation tested", "Lance live demo session", "Optimization harness configured"],
  },
  {
    week: "Week 4", label: "Launch", color: "green",
    tasks: ["Production deployment", "Branded portal handoff", "Monitoring dashboards live", "Expansion roadmap delivered"],
  },
];

// ── Tab content ───────────────────────────────────────────────────────────────

function OverviewTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Card>
        <CardHeader>
          <CardTitle>What We&apos;re Building</CardTitle>
          <CardDescription>A production-ready AI voice agent named Frankie — tailored for Lance Graulich&apos;s franchise consulting practice at Franmore</CardDescription>
        </CardHeader>
        <CardContent>
          <p style={{ fontSize: "13px", color: "#7a7974", lineHeight: 1.6, marginBottom: "16px" }}>
            Frankie is a custom-trained AI sales agent that handles Lance&apos;s first-touch client interactions: gathering prospect information, qualifying budgets, answering franchise questions, and automating territory checks — all before Lance ever gets on a call. Frankie is built on Endurance AI Labs&apos; optimization harness, delivering production-grade voice quality, low latency, and a self-improving feedback loop.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            <DeliverableTag color="purple">AI Voice Agent</DeliverableTag>
            <DeliverableTag color="blue">Web Chat</DeliverableTag>
            <DeliverableTag color="green">Phone Channel</DeliverableTag>
            <DeliverableTag color="indigo">Dedicated URL</DeliverableTag>
            <DeliverableTag color="copper">Territory Automation</DeliverableTag>
            <DeliverableTag color="magenta">White Label</DeliverableTag>
          </div>
        </CardContent>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
        {[
          { label: "Contract Value", value: "$3,500", sub: <Badge variant="secondary">Won — May 8, 2026</Badge> },
          { label: "Build Timeline", value: "4 Weeks", sub: <Badge variant="outline">Starts May 15</Badge> },
          { label: "Deployment Channels", value: "3", sub: <span style={{ fontSize: "11px", color: "#7a7974" }}>Web chat · URL · Phone</span> },
          { label: "Post-Launch Monthly", value: "$500", sub: <span style={{ fontSize: "11px", color: "#7a7974" }}>Optimization & updates</span> },
        ].map(({ label, value, sub }) => (
          <Card key={label}>
            <CardHeader>
              <CardDescription>{label}</CardDescription>
              <p style={{ fontSize: "24px", fontWeight: 600, letterSpacing: "-0.03em", color: "#262510" }}>{value}</p>
            </CardHeader>
            <CardContent>{sub}</CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>Scope at a Glance</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deliverable</TableHead>
                <TableHead>Included</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                ["Web chat widget (embeddable)", "✅"],
                ["Dedicated Frankie URL", "✅"],
                ["Inbound phone number", "✅"],
                ["Custom system prompt architecture", "✅"],
                ["Personality & voice tuning", "✅"],
                ["Branding portal access", "✅"],
                ["Optimization harness + self-learning loop", "✅"],
                ["CRM / Fran Tracker data pipeline", "✅"],
                ["Territory check automation", "✅"],
                ["Ongoing monthly optimization", "Retainer"],
              ].map(([d, s]) => (
                <TableRow key={d}>
                  <TableCell>{d}</TableCell>
                  <TableCell><Badge variant={s === "✅" ? "default" : "secondary"}>{s}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function DeploymentTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Card>
        <CardHeader>
          <CardTitle>Deliverable 1 — Multi-Channel Deployment</CardTitle>
          <CardDescription>Frankie is accessible across three fully independent channels from day one</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div style={{ padding: "0 20px 16px" }}>
            <FeatureRow icon="💬" title="Web Chat Widget" tags={[{ label: "Embeddable", color: "blue" }, { label: "Day 1", color: "green" }]}
              description="A fully branded chat interface deployed directly on Lance's website. Visitors can interact with Frankie in real time — typing or speaking — without leaving the page. The widget is configured with Lance's branding: colors, name, avatar, and intro message. Works on mobile and desktop. Drop-in embed code provided for any website platform (WordPress, Webflow, custom)." />
            <FeatureRow icon="🔗" title="Dedicated Frankie URL" tags={[{ label: "Public Link", color: "indigo" }, { label: "Shareable", color: "purple" }]}
              description="A clean, standalone URL (e.g. frankie.lance-franmore.com or a custom subdomain) where any prospect can access Frankie directly — no website visit required. Lance can drop this link into emails, Go High Level automations, LinkedIn DMs, or text messages. The page is fully branded and loads instantly with Frankie ready to talk." />
            <FeatureRow icon="📞" title="Dedicated Phone Number" tags={[{ label: "24/7 Inbound", color: "copper" }, { label: "Voice AI", color: "magenta" }]}
              description="A real US phone number routed directly to Frankie's voice AI — available 24 hours a day, 7 days a week. Prospects can call this number and have a natural conversation with Frankie at any time. Frankie handles the full first-call process: qualifying budget, capturing goals, and automating territory checks. All calls are recorded and transcribed. Call summaries are pushed to Lance's CRM automatically." />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Channel Capability Matrix</CardTitle></CardHeader>
        <CardContent>
          <div style={{ overflowX: "auto" }}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Capability</TableHead>
                  <TableHead>Web Chat</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Phone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  ["Voice conversation", "✅", "✅", "✅"],
                  ["Text / typed input", "✅", "✅", "—"],
                  ["24/7 availability", "✅", "✅", "✅"],
                  ["Lead capture to CRM", "✅", "✅", "✅"],
                  ["Territory check trigger", "✅", "✅", "✅"],
                  ["Call recording & transcript", "—", "—", "✅"],
                  ["Embeddable", "✅", "—", "—"],
                  ["Shareable link", "—", "✅", "✅"],
                  ["Mobile-friendly", "✅", "✅", "✅"],
                ].map(([cap, wc, url, ph]) => (
                  <TableRow key={cap}>
                    <TableCell>{cap}</TableCell>
                    <TableCell><span style={{ textAlign: "center", display: "block" }}>{wc}</span></TableCell>
                    <TableCell><span style={{ textAlign: "center", display: "block" }}>{url}</span></TableCell>
                    <TableCell><span style={{ textAlign: "center", display: "block" }}>{ph}</span></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>CRM & Territory Check Integration</CardTitle>
          <CardDescription>Frankie feeds data directly into Lance&apos;s existing stack</CardDescription>
        </CardHeader>
        <CardContent>
          <FeatureRow icon="🗺️" title="Automated Territory Checks" tags={[{ label: "Fran Tracker", color: "copper" }]}
            description="After gathering a prospect's investment level, goals, and location, Frankie automatically queues territory checks against Lance's pre-defined avatar lists in Fran Tracker. The agent identifies which of Lance's 5 client personas the prospect falls into, then triggers checks only for the relevant brand set — eliminating manual clicks and lookup time." />
          <FeatureRow icon="📤" title="CRM Data Push" tags={[{ label: "Go High Level", color: "blue" }, { label: "Fran Tracker", color: "copper" }]}
            description="Every Frankie conversation generates a structured summary automatically delivered to Lance's CRM: contact info, investment budget, business ownership goals, location, franchise interests, and call transcript. No manual data entry required after the first call." />
          <FeatureRow icon="🔔" title="Real-Time Notifications" tags={[{ label: "Email", color: "green" }, { label: "SMS", color: "indigo" }]}
            description="Lance receives an instant notification the moment a prospect finishes a Frankie conversation — with a one-page summary of key answers and recommended next steps, so he can walk into the follow-up call fully prepared." />
        </CardContent>
      </Card>
    </div>
  );
}

function PersonalityTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Card>
        <CardHeader>
          <CardTitle>Deliverable 2 — Personality Tuning Engine, Custom System Prompt Architecture & Branding Portal</CardTitle>
          <CardDescription>Frankie doesn&apos;t sound like a generic AI — she sounds like Lance&apos;s best hire</CardDescription>
        </CardHeader>
        <CardContent>
          <p style={{ fontSize: "13px", color: "#7a7974", lineHeight: 1.6 }}>
            This deliverable is the brain and identity of Frankie. It covers everything that makes her distinctly Lance&apos;s agent: her voice, her conversational logic, how she handles objections, and the portal Lance uses to update her over time.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Prompt Architecture</CardTitle>
          <CardDescription>The logic layer that governs every conversation</CardDescription>
        </CardHeader>
        <CardContent>
          <FeatureRow icon="🧠" title="Multi-Layer Prompt Design" tags={[{ label: "Custom Built", color: "purple" }]}
            description="Frankie's system prompt is structured in distinct layers: Persona (who she is and how she speaks), Business Logic (how to handle each stage of the first call), Knowledge Base (franchise industry context, Lance's brand list, investor profiles), and Guardrails (what she never says, when she hands off to Lance). Each layer is independently tunable without breaking the others." />
          <FeatureRow icon="💡" title="Few-Shot Conversation Training" tags={[{ label: "Lance's Style", color: "indigo" }]}
            description="We record and splice 4–6 examples of Lance's actual first-call conversations into the training architecture. Frankie learns how Lance handles the investment question, how he redirects restaurant-franchise obsessives, how he builds rapport quickly, and how he pivots when a prospect doesn't fit. She mirrors his NLP cadence without sounding like an impersonation." />
          <FeatureRow icon="🔀" title="Avatar-Driven Conversation Flows" tags={[{ label: "5 Personas", color: "copper" }]}
            description="Frankie is pre-loaded with Lance's 5 client archetypes — differentiated by investment level (under $50K, $50–100K, $100K+), ownership preference (full-time vs. semi-passive), and skills profile (sales background, operations, management). She routes each prospect into the correct avatar mid-conversation and adjusts her brand recommendations accordingly." />
          <FeatureRow icon="🛑" title="Graceful Objection Handling" tags={[{ label: "Programmed", color: "red" }]}
            description={`Frankie knows how to respond when a prospect pushes back on investment size, expresses interest in restaurants specifically, or asks questions only Lance can answer. She acknowledges, pivots, and bridges — e.g. "That's a great question — Lance is actually a restaurant franchise expert, and I'll make sure he covers that on your next call."`} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Personality Tuning Engine</CardTitle>
          <CardDescription>Voice, tone, and character — all configurable</CardDescription>
        </CardHeader>
        <CardContent>
          <FeatureRow icon="🎤" title="Voice & Tone Selection" tags={[{ label: "Female Voice", color: "magenta" }, { label: "Natural", color: "green" }]}
            description="Frankie uses a warm, professional female voice selected from Endurance AI Labs' curated voice library — optimized for the franchise consulting context. Tone is confident but approachable: she asks the hard money questions without being awkward, uses humor naturally, and paces conversations to feel human. Lance approves the final voice before go-live." />
          <FeatureRow icon="⏱️" title="Latency & Interruption Handling" tags={[{ label: "< 400ms", color: "blue" }]}
            description="Frankie responds within 400 milliseconds — matching natural human conversation pacing. When a prospect interrupts, she stops immediately and listens, rather than talking over them. This is one of the most common failure points in competitor AI agents and a key differentiator in our implementation." />
          <FeatureRow icon="🔁" title="Handoff Logic" tags={[{ label: "Configurable", color: "indigo" }]}
            description="When a prospect is ready for Lance, Frankie doesn't just hang up. She sets expectations: confirms next steps, tells them exactly what to expect from the follow-up call with Lance, and — if the Go High Level calendar is connected — offers to book the appointment directly before ending the session." />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Branding Portal</CardTitle>
          <CardDescription>Lance&apos;s control center for Frankie</CardDescription>
        </CardHeader>
        <CardContent>
          <FeatureRow icon="🎨" title="Visual Branding Controls" tags={[{ label: "No-Code", color: "green" }]}
            description="A dedicated branding portal where Lance (or Tory) can update Frankie's web widget appearance: name, avatar image, greeting message, color scheme, and button labels. Changes publish instantly — no developer needed. The portal also manages the dedicated URL's landing page copy and background." />
          <FeatureRow icon="📝" title="Knowledge Base Editor" tags={[{ label: "Self-Service", color: "blue" }]}
            description="Lance can add new brands, remove outdated ones, update investment thresholds, or add new franchise categories directly through the portal. Changes are reflected in Frankie's responses within minutes. When a new brand enters Lance's favorites list, it's live in Frankie the same day." />
          <FeatureRow icon="📊" title="Conversation Logs & Insights" tags={[{ label: "Dashboard", color: "purple" }]}
            description="The portal includes a full conversation history view: every Frankie session, with transcript, prospect summary, avatar classification, territory check status, and cost per conversation. Lance can flag conversations for review, export prospect data, or mark sessions as qualified/unqualified." />
          <FeatureRow icon="⚪" title="White Label Ready" tags={[{ label: "Resellable", color: "copper" }]}
            description="The entire portal is white-labeled — no Endurance AI Labs branding visible to end users. When Lance is ready to sell Frankie to other franchise consultants through Renee's network, the portal scales to support multiple client accounts, each with their own branding, brand lists, and avatar configurations." />
        </CardContent>
      </Card>
    </div>
  );
}

function OptimizationTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Card>
        <CardHeader>
          <CardTitle>Deliverable 3 — Optimization Harness & Deployment</CardTitle>
          <CardDescription>The factory behind Frankie — built for performance, cost efficiency, and continuous improvement</CardDescription>
        </CardHeader>
        <CardContent>
          <p style={{ fontSize: "13px", color: "#7a7974", lineHeight: 1.6 }}>
            Frankie is not a one-time build. She runs on Endurance AI Labs&apos; proprietary optimization harness — the same infrastructure used for Expedia, Macy&apos;s, and American Express engagements — scaled and priced for the franchise consulting market.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Multi-Model Architecture</CardTitle>
          <CardDescription>The right model for every task — no waste, no overkill</CardDescription>
        </CardHeader>
        <CardContent>
          <FeatureRow icon="🧩" title="Intelligent Model Routing" tags={[{ label: "Cost Optimized", color: "green" }, { label: "Multi-Modal", color: "blue" }]}
            description="Frankie uses a multi-model architecture under the hood. Simple tasks — greeting a caller, scheduling a follow-up — run on lightweight 7–40B parameter models (e.g. Llama 3.3). Complex reasoning — matching a prospect to the right franchise persona, handling unusual objections — escalates to a more capable model only when needed. This prevents the 'AI tax' where simple interactions burn expensive inference budget." />
          <FeatureRow icon="📉" title="Supervised Fine-Tuning (SFT) Pipeline" tags={[{ label: "Teacher → Student", color: "purple" }]}
            description="We run a teacher-student training cycle: an advanced reasoning model (e.g. Claude Opus) is used to generate ideal responses for every conversation scenario from Lance's practice. Those responses train a smaller, faster student model that runs Frankie day-to-day. The result: advanced-model quality at a fraction of the inference cost." />
          <FeatureRow icon="⚡" title="LPU / GPU Hybrid Routing" tags={[{ label: "Low Latency", color: "indigo" }]}
            description="Where available, Frankie routes inference through Language Processing Units (LPUs) — silicon architectures designed specifically for LLMs, offering faster throughput and lower energy cost than traditional GPU inference. This is the same infrastructure advantage that enables Frankie to respond within 400ms even during high-volume call periods." />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Self-Learning Feedback Loop</CardTitle>
          <CardDescription>Frankie improves with every conversation automatically</CardDescription>
        </CardHeader>
        <CardContent>
          <FeatureRow icon="🔄" title="Automated Conversation Capture" tags={[{ label: "Always On", color: "green" }]}
            description="Every Frankie conversation — regardless of channel — is automatically captured, transcribed, and fed into the optimization harness. The system tags each exchange by quality: was the prospect qualification successful? Did Frankie classify the avatar correctly? Was the territory check triggered? These signals drive the next training cycle." />
          <FeatureRow icon="📈" title="Weekly Tuning Cycles" tags={[{ label: "Included in Retainer", color: "copper" }]}
            description="Each week, the Endurance AI Labs team reviews Frankie's conversation quality metrics, identifies failure modes, and pushes targeted prompt or training updates. If Frankie is fumbling the investment question for one avatar type, we fix it. If a new brand enters Lance's favorites, we add it. The model gets smarter every week without Lance having to do anything." />
          <FeatureRow icon="🧪" title="A/B Testing Framework" tags={[{ label: "Portal Access", color: "blue" }]}
            description="The harness supports split-testing different greeting styles, objection-handling approaches, or handoff scripts. Lance can approve a test from the portal, let it run across 50 conversations, and see which version drives higher prospect engagement — without any engineering involvement." />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Production Deployment & Monitoring</CardTitle></CardHeader>
        <CardContent>
          <FeatureRow icon="🚀" title="Production-Grade Infrastructure" tags={[{ label: "99.9% Uptime", color: "green" }]}
            description="Frankie is deployed on production infrastructure with redundant failover — not a hobbyist setup. Uptime SLA targets 99.9%. If the primary model provider has an outage, the harness automatically reroutes to a fallback model, keeping Frankie live." />
          <FeatureRow icon="💰" title="Real-Time Cost Monitoring" tags={[{ label: "Transparent", color: "yellow" }]}
            description="The branding portal shows live inference cost per conversation and projected monthly spend. Lance will never be surprised by a large AI bill he didn't see coming. Alerts are configurable — if any conversation exceeds a cost threshold, Lance is notified immediately." />
          <FeatureRow icon="🔐" title="Data Privacy & Security" tags={[{ label: "Compliant", color: "indigo" }]}
            description="All prospect conversation data is stored securely and never used to train third-party models. Call transcripts are encrypted at rest. Data retention and deletion policies are configurable from the portal to meet any future compliance requirements as the franchise industry's AI regulations evolve." />
        </CardContent>
      </Card>
    </div>
  );
}

function TimelineTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Card>
        <CardHeader>
          <CardTitle>Build Timeline — 4 Weeks to Launch</CardTitle>
          <CardDescription>Kickoff begins May 15, 2026 — first meeting already scheduled</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {MILESTONES.map((m) => {
              const c = getColor(m.color);
              return (
                <div key={m.week} style={{ borderRadius: "6px", border: `1px solid ${c.border}`, background: c.bg, padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: c.text }}>{m.week}</span>
                    <Badge variant="outline">{m.label}</Badge>
                  </div>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    {m.tasks.map(t => (
                      <li key={t} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#7a7974" }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.dot, flexShrink: 0 }} />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Investment Summary</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                ["System prompt architecture", "One-time", "$—"],
                ["Data pipelines & CRM wiring", "One-time", "$—"],
                ["Voice tuning & personality build", "One-time", "$—"],
                ["Deployment (all 3 channels)", "One-time", "$—"],
                ["Branding portal setup", "One-time", "$—"],
                ["Total Build", "One-time", "$3,500"],
                ["Ongoing optimization & tuning", "Monthly retainer", "$500/mo"],
              ].map(([item, type, amount]) => (
                <TableRow key={item} className={item === "Total Build" ? "bg-purple-z1" : ""}>
                  <TableCell className={item === "Total Build" ? "text-purple-z9 font-semibold" : ""}>{item}</TableCell>
                  <TableCell><Badge variant={item === "Total Build" ? "default" : "outline"}>{type}</Badge></TableCell>
                  <TableCell className={item === "Total Build" ? "text-purple-z9 font-semibold" : ""}>{amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expansion Roadmap</CardTitle>
          <CardDescription>Land and expand — what comes after Frankie v1</CardDescription>
        </CardHeader>
        <CardContent>
          {[
            { phase: "Phase 2", title: "Multi-Consultant Rollout", color: "blue", description: "Package Frankie as a white-label product for other Franmore/Fran Serve consultants via Renee's agency. $1,000 setup + $500/mo per consultant." },
            { phase: "Phase 3", title: "Franchisor Tier", color: "purple", description: "Deploy enterprise-grade version for franchise brands (e.g. Horsepower Brands, Neighborly) with full call-center replacement. Estimated $20–30K setup per brand." },
            { phase: "Phase 4", title: "LinkedIn Prospecting Agent", color: "indigo", description: "Activate the AI-powered LinkedIn outreach tool already built — finding managers at Fortune 500 companies in target territories and initiating contact on Lance's behalf." },
          ].map(p => {
            const c = getColor(p.color);
            return (
              <div key={p.phase} style={{ borderRadius: "6px", border: `1px solid ${c.border}`, background: c.bg, padding: "12px 16px", marginBottom: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <Badge variant="outline">{p.phase}</Badge>
                  <span style={{ fontSize: "13px", fontWeight: 500, color: c.text }}>{p.title}</span>
                </div>
                <p style={{ fontSize: "12px", color: "#7a7974" }}>{p.description}</p>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Key Contacts</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              {[
                ["Lance Graulich", "Client — Franmore", "lance@franmore.com"],
                ["Alex Sok", "Account Lead — Endurance AI Labs", "alex@endurancelabs.ai"],
                ["Ben Keeney", "Solutions — Endurance AI Labs", "ben@endurancelabs.ai"],
                ["Renee Boudakian", "Distribution Partner — RF Partners", "renee@rf.partners"],
              ].map(([name, role, email]) => (
                <TableRow key={name}>
                  <TableCell className="font-medium">{name}</TableCell>
                  <TableCell>{role}</TableCell>
                  <TableCell>{email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

const TABS = [
  { label: "Overview",              icon: "🎯" },
  { label: "Deployment",            icon: "🌐" },
  { label: "Personality & Branding",icon: "🎙️" },
  { label: "Optimization",          icon: "⚙️" },
  { label: "Timeline & Pricing",    icon: "📋" },
];

const TAB_CONTENT = [<OverviewTab key="overview" />, <DeploymentTab key="deployment" />, <PersonalityTab key="personality" />, <OptimizationTab key="optimization" />, <TimelineTab key="timeline" />];

export function FrankieDeliverable() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{ fontFamily: "var(--font-figtree)", color: "#262510" }}>
      {/* Header */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <div style={{ width: 40, height: 40, borderRadius: "10px", background: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
            🤖
          </div>
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: 600, letterSpacing: "-0.025em", color: "#262510", margin: 0 }}>
              Frankie — Voice Agent Deliverable
            </h2>
            <p style={{ fontSize: "12px", color: "#7a7974", margin: 0 }}>
              Endurance AI Labs × Franmore · Project Specification · May 2026
            </p>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "10px" }}>
          <DeliverableTag color="green">Won</DeliverableTag>
          <DeliverableTag color="purple">$3,500 Build</DeliverableTag>
          <DeliverableTag color="blue">$500/mo Retainer</DeliverableTag>
          <DeliverableTag color="indigo">4-Week Timeline</DeliverableTag>
        </div>
      </div>

      {/* Tab nav */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
        {TABS.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(i)}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 500,
              border: activeTab === i ? `1px solid #c4b5fd` : "1px solid #e6e5e0",
              background: activeTab === i ? "#ede9fe" : "#f0efe9",
              color: activeTab === i ? "#3b0764" : "#7a7974",
              cursor: "pointer",
              transition: "all 0.15s",
              whiteSpace: "nowrap",
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {TAB_CONTENT[activeTab]}
    </div>
  );
}
