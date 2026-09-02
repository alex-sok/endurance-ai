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
              src="/landing/home-field-art.jpg"
              alt="Paper collage: a bearded marble bust holding a ruled paper ledger, with an ember circle and bar"
              width={1244}
              height={636}
              style={{ aspectRatio: "1244 / 636" }}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
