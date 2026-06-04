import { SectionShell } from "../components/SectionShell";
import { closeCTAs } from "../data/close";

/**
 * §12 — Close & CTA.
 *
 * Phase 1: Three working CTAs side-by-side, contact + footer. Reuses
 * the existing convoy/network silhouette from the Hero so the page
 * closes on the same visual it opened with.
 *
 * Phase 3: Network nodes resolve into a single convoy moving toward
 * the horizon.
 *
 * Lead form posts to the existing /api/notify endpoint (Slack +
 * scoring) so leads route to the team on day one. Swap to Loops /
 * Resend / HubSpot later per closeCTAs.leadEndpoint.
 */
export function Close() {
  return (
    <SectionShell
      id="close"
      index="12"
      eyebrow="Join us"
    >
      <div className="logi-close__frame" aria-hidden="true">
        <div className="logi-hero__cones" />
        <div className="logi-hero__fog" />
      </div>

      <div className="logi-close__copy">
        <h2 className="logi-display logi-close__headline">
          Join the <span className="logi-close__accent">convoy</span>.
        </h2>
        <p className="logi-body logi-body-muted logi-close__sub">
          We&rsquo;re raising the round that builds the next freight network.
          Pick the door.
        </p>

        <div className="logi-close__ctas">
          <a
            className="logi-cta"
            href={closeCTAs.callUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {closeCTAs.callLabel} →
          </a>
          {closeCTAs.deckUrl ? (
            <a
              className="logi-cta logi-cta--ghost"
              href={closeCTAs.deckUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {closeCTAs.deckLabel} ↓
            </a>
          ) : (
            <a
              className="logi-cta logi-cta--ghost"
              href={`mailto:${closeCTAs.contactEmail}?subject=Endurance Logistics deck`}
            >
              {closeCTAs.deckLabel} ↓
            </a>
          )}
          <a
            className="logi-cta logi-cta--ghost"
            href={`mailto:${closeCTAs.contactEmail}?subject=Endurance Logistics — intro`}
          >
            {closeCTAs.leadLabel} →
          </a>
        </div>

        <footer className="logi-close__footer logi-mono">
          <span>© 2026 Endurance Labs.</span>
          <a href={`mailto:${closeCTAs.contactEmail}`}>
            {closeCTAs.contactEmail}
          </a>
        </footer>
      </div>
    </SectionShell>
  );
}
