// The run, drawn. The page spends four sections describing this mechanism and
// never shows it: loads arrive, each is priced against the ladder taking the
// first rule that matches, whatever fails to prove out is held behind a gate
// that locks the pay step, and only what clears becomes pay.
// Hairlines and the site's own type. No icons.
export function RunDiagram() {
  return (
    <figure className="lp-diagram">
      <figcaption className="lp-eyebrow">The run, end to end</figcaption>
      <svg viewBox="0 0 1240 340" role="img" aria-labelledby="run-diagram-title">
        <title id="run-diagram-title">
          A week of loads arrives from the transportation management system. Each load is
          priced against the precedence ladder, which takes the first rule that matches.
          Loads that do not prove out are held behind a gate that locks the pay step until
          a person clears every blocker. What clears becomes one statement per earner.
        </title>

        <g className="d-rule">
          <line x1="0" y1="0.5" x2="1240" y2="0.5" />
          <line x1="0" y1="339.5" x2="1240" y2="339.5" />
        </g>

        {/* 01 · in */}
        <text className="d-step" x="0" y="40">01</text>
        <text className="d-label" x="0" y="66">FROM THE TMS</text>
        <text className="d-fig" x="0" y="118">1,077</text>
        <text className="d-sub" x="0" y="142">loads, one week</text>
        <text className="d-sub" x="0" y="176">each one priced on its own</text>

        <g className="d-arrow">
          <line x1="236" y1="110" x2="298" y2="110" />
          <polyline points="290,104 298,110 290,116" />
        </g>

        {/* 02 · the ladder */}
        <text className="d-step" x="330" y="40">02</text>
        <text className="d-label" x="330" y="66">THE PRECEDENCE LADDER</text>
        <text className="d-fig" x="330" y="118">13</text>
        <text className="d-sub" x="330" y="142">pay mechanisms in force</text>
        <g className="d-ladder">
          <line x1="330" y1="176" x2="600" y2="176" />
          <text className="d-rung d-rung-off" x="330" y="200">Customer deal</text>
          <text className="d-rung-note" x="600" y="200">falls through</text>
          <line x1="330" y1="214" x2="600" y2="214" />
          <text className="d-rung" x="330" y="238">Team pool · 70%</text>
          <text className="d-rung-note d-on" x="600" y="238">applies</text>
          <line x1="330" y1="252" x2="600" y2="252" />
          <text className="d-rung d-rung-off" x="330" y="276">Dispatch share</text>
          <text className="d-rung-note" x="600" y="276">not reached</text>
          <line x1="330" y1="290" x2="600" y2="290" />
        </g>
        <text className="d-sub" x="330" y="318">the first rule that matches, and no other</text>

        <g className="d-arrow">
          <line x1="626" y1="110" x2="688" y2="110" />
          <polyline points="680,104 688,110 680,116" />
        </g>

        {/* 03 · the gate */}
        <text className="d-step" x="716" y="40">03</text>
        <text className="d-label" x="716" y="66">HELD AT THE GATE</text>
        <text className="d-fig d-flare" x="716" y="118">16</text>
        <text className="d-sub" x="716" y="142">exceptions, 1 a blocker</text>
        <g className="d-gate">
          <line x1="718" y1="176" x2="718" y2="290" />
          <line x1="726" y1="176" x2="726" y2="290" />
        </g>
        <text className="d-sub" x="744" y="200">the pay step stays</text>
        <text className="d-sub" x="744" y="222">locked until a</text>
        <text className="d-sub" x="744" y="244">person clears</text>
        <text className="d-sub" x="744" y="266">every blocker</text>

        <g className="d-arrow">
          <line x1="936" y1="110" x2="998" y2="110" />
          <polyline points="990,104 998,110 990,116" />
        </g>

        {/* 04 · out */}
        <text className="d-step" x="1026" y="40">04</text>
        <text className="d-label" x="1026" y="66">OUT</text>
        <text className="d-fig" x="1026" y="118">54</text>
        <text className="d-sub" x="1026" y="142">people paid</text>
        <text className="d-sub" x="1026" y="200">one statement</text>
        <text className="d-sub" x="1026" y="222">each, tracing to</text>
        <text className="d-sub" x="1026" y="244">the loads behind it</text>
      </svg>
    </figure>
  );
}
