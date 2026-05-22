import { SectionShell } from "../components/SectionShell";
import { whyNow, whyNowClose } from "../data/whyNow";

/**
 * §8 — Why now.
 *
 * Three converging forces as large numbered pillars, with a closing
 * "bottom line" statement.
 */
export function WhyNow() {
  return (
    <SectionShell id="why-now" index="08" eyebrow="Why now">
      <h2 className="inv-display-md inv-whynow__headline">
        Three forces,{" "}
        <span className="inv-whynow__accent">converging</span>.
      </h2>

      <div className="inv-whynow__grid">
        {whyNow.map((w) => (
          <article key={w.num} className="inv-whynow__force">
            <div className="inv-mono inv-whynow__force-num">{w.num}</div>
            <h3 className="inv-display-sm inv-whynow__force-title">
              {w.title}
            </h3>
            <p className="inv-body inv-body-muted">{w.body}</p>
          </article>
        ))}
      </div>

      <div className="inv-whynow__close">
        <div className="inv-tag">The bottom line</div>
        <p className="inv-display-sm inv-whynow__close-body">{whyNowClose}</p>
      </div>
    </SectionShell>
  );
}
