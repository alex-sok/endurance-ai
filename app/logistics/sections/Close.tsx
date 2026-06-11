import { SectionShell } from "../components/SectionShell";
import { CloseClient } from "../components/CloseClient";

/**
 * §12 — Close. "05:58, dawn."
 *
 * V2 (see DESIGN-V2.md): the same WebGL night world that opened the
 * page, re-shot from road level toward a dawn horizon — the journey
 * completed. All choreography (scramble kicker, masked headline rise,
 * magnetic primary CTA, hairline draw) lives in CloseClient; this
 * stays a server component.
 *
 * Lead CTAs reuse the existing Calendly + contact email from
 * data/close.ts (closeCTAs) — swap targets there only.
 */
export function Close() {
  return (
    <SectionShell id="close" index="12" eyebrow="Join us" className="v2-close">
      <CloseClient />
    </SectionShell>
  );
}
