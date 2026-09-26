const TOTAL = 33000;
const IMPL = 9500;
const X0 = 150;
const W = 760;
const SPLIT = X0 + (W * IMPL) / TOTAL;

export function PricePlan() {
  return (
    <figure className="lp-plan">
      <figcaption className="lp-eyebrow">Illustration at $2,750 a month</figcaption>
      <svg viewBox="0 0 1160 196" role="img" aria-labelledby="plan-title">
        <title id="plan-title">
          With all twelve credits applied, the $9,500 implementation fee is offset against
          subscription charges. This illustration rounds the credits to $9,500, for a total
          of $33,000 including implementation. Annual subscription alone is $33,000.
          Credits begin in the month the third live run closes, so calendar-year totals vary.
        </title>

        <g className="p-rule">
          <line x1="0" y1="0.5" x2="1160" y2="0.5" />
          <line x1="0" y1="195.5" x2="1160" y2="195.5" />
        </g>

        {/* Illustration after all twelve credits, rounded to the implementation fee */}
        <text className="p-side" x="130" y="66">With credits</text>
        <rect className="p-solid" x={X0} y="40" width={SPLIT - X0} height="42" />
        <text className="p-in" x={X0 + 16} y="66">$9,500</text>
        <rect className="p-hollow" x={SPLIT} y="40" width={X0 + W - SPLIT} height="42" />
        <text className="p-on" x={SPLIT + 16} y="66">$23,500</text>
        <text className="p-total" x={X0 + W + 24} y="66">$33,000</text>

        {/* Annual subscription without implementation or credits */}
        <text className="p-side" x="130" y="136">Subscription</text>
        <rect className="p-hollow" x={X0} y="110" width={W} height="42" />
        <text className="p-on" x={X0 + 16} y="136">$33,000</text>
        <text className="p-total" x={X0 + W + 24} y="136">$33,000</text>

        <text className="p-key" x={X0} y="176">Implementation</text>
        <text className="p-key" x={SPLIT + 16} y="176">Subscription</text>
      </svg>
      <p className="lp-note">Credits are rounded to $9,500 in this illustration. They begin in the month your third live run closes, so the amount paid in a calendar year depends on that date.</p>
    </figure>
  );
}
