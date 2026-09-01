import type { CSSProperties } from "react";

export function LandingProof() {
  return (
    <div className="lp-chapter" id="proof" data-section="proof">
      <section
        className="lp-wash lp-split"
        style={{ "--wash-angle": "137deg" } as CSSProperties}
        aria-labelledby="proof-title"
      >
        <div className="lp-split-copy">
          <p className="lp-kicker">In the field</p>
          <p className="lp-pain">
            Margins is in production inside a freight brokerage, running the
            weekly pay run from their TMS.
          </p>
          <h2 className="lp-h2" id="proof-title">
            That is the method. Sit in the operation. Ship the system.
          </h2>
        </div>
        <div className="lp-split-shot">
          <div className="lp-bleed">
            <img
              src="/landing/margins-frag-catches.jpg"
              alt="The Margins exceptions worklist: one blocker holding the run, fifteen warnings, and the dollars at stake on each row"
              width={1848}
              height={1258}
              style={{ aspectRatio: "1848 / 1258" }}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
