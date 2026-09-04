// What a year costs, drawn. Two bars that end at the same place: the
// implementation fee is credited back across the first twelve months, so
// year one and year two total the same. Two paragraphs used to say this.
// Worked at the middle band; the shape holds at every band.
const TOTAL = 33000;
const IMPL = 9500;
const X0 = 150;
const W = 760;
const SPLIT = X0 + (W * IMPL) / TOTAL;

export function PricePlan() {
  return (
    <figure className="lp-plan">
      <figcaption className="lp-eyebrow">A year at $2,750 a month</figcaption>
      <svg viewBox="0 0 1160 196" role="img" aria-labelledby="plan-title">
        <title id="plan-title">
          In year one you pay $9,500 of implementation at signature and $23,500 of subscription
          after the monthly credit. In year two you pay $33,000 of subscription. Both years total
          $33,000.
        </title>

        <g className="p-rule">
          <line x1="0" y1="0.5" x2="1160" y2="0.5" />
          <line x1="0" y1="195.5" x2="1160" y2="195.5" />
        </g>

        {/* Year one: the fee, then the subscription it is credited against */}
        <text className="p-side" x="130" y="66">Year one</text>
        <rect className="p-solid" x={X0} y="40" width={SPLIT - X0} height="42" />
        <text className="p-in" x={X0 + 16} y="66">$9,500</text>
        <rect className="p-hollow" x={SPLIT} y="40" width={X0 + W - SPLIT} height="42" />
        <text className="p-on" x={SPLIT + 16} y="66">$23,500</text>
        <text className="p-total" x={X0 + W + 24} y="66">$33,000</text>

        {/* Year two: the same total, one line item */}
        <text className="p-side" x="130" y="136">Year two</text>
        <rect className="p-hollow" x={X0} y="110" width={W} height="42" />
        <text className="p-on" x={X0 + 16} y="136">$33,000</text>
        <text className="p-total" x={X0 + W + 24} y="136">$33,000</text>

        <text className="p-key" x={X0} y="176">Implementation</text>
        <text className="p-key" x={SPLIT + 16} y="176">Subscription</text>
      </svg>
    </figure>
  );
}
