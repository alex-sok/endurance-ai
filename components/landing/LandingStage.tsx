// The product laid out beneath the claim: the Margins run in one frame,
// with a Margins card and a Brain window floating over its edges. The
// floats repeat what the frames already say, so they stay decorative.
export function LandingStage() {
  return (
    <figure className="lp-stage" data-section="product">
      <div className="lp-feature-frame lp-stage-main">
        <img
          src="/landing/margins.jpg"
          alt="Margins commissions run"
          width={2880}
          height={1800}
          decoding="async"
        />
      </div>
      <div className="lp-stage-float is-left" aria-hidden="true">
        <img
          src="/landing/margins-card-ready.jpg"
          alt=""
          width={1064}
          height={508}
          decoding="async"
        />
      </div>
      <div className="lp-stage-float is-right is-wide" aria-hidden="true">
        <img
          src="/landing/brain-card-answers.jpg"
          alt=""
          width={728}
          height={225}
          decoding="async"
        />
      </div>
    </figure>
  );
}
