import { SectionShell } from "../components/SectionShell";
import { closeContent, closeCTAs } from "../data/close";

/**
 * §10 — Close & CTA.
 *
 * Final stat strip (15K+ / $240B / 6 Modules / Year 3), the "we are
 * building the infrastructure" headline, CTAs, footer.
 */
export function Close() {
  return (
    <SectionShell id="close" index="10" eyebrow="Join us">
      <div className="inv-close__frame" aria-hidden="true">
        <div className="inv-hero__halo" />
        <div className="inv-hero__fog" />
      </div>

      <div className="inv-close__copy">
        <div className="inv-close__stats">
          {closeContent.closingStats.map((s) => (
            <div key={s.value} className="inv-close__stat">
              <div className="inv-stat">{s.value}</div>
              <p className="inv-stat__label">{s.label}</p>
            </div>
          ))}
        </div>

        <h2 className="inv-display inv-close__headline">
          {closeContent.headlinePrefix}
          <br />
          <span className="inv-close__accent">
            {closeContent.headlineAccent}
          </span>
        </h2>

        <p className="inv-body inv-body-muted inv-close__sub">
          {closeContent.sub}
        </p>

        <div className="inv-close__ctas">
          <a
            className="inv-cta"
            href={closeCTAs.callUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {closeCTAs.callLabel} →
          </a>
          {closeCTAs.deckUrl ? (
            <a
              className="inv-cta inv-cta--ghost"
              href={closeCTAs.deckUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {closeCTAs.deckLabel} ↓
            </a>
          ) : (
            <a
              className="inv-cta inv-cta--ghost"
              href={`mailto:${closeCTAs.contactEmail}?subject=Endurance Investments deck`}
            >
              {closeCTAs.deckLabel} ↓
            </a>
          )}
          <a
            className="inv-cta inv-cta--ghost"
            href={`mailto:${closeCTAs.contactEmail}?subject=Endurance Investments — intro`}
          >
            {closeCTAs.leadLabel} →
          </a>
        </div>

        <footer className="inv-close__footer inv-mono">
          <span>© 2026 Endurance Labs · Confidential</span>
          <a href={`mailto:${closeCTAs.contactEmail}`}>
            {closeCTAs.contactEmail}
          </a>
        </footer>
      </div>
    </SectionShell>
  );
}
