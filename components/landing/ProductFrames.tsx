// The product's screens, rebuilt in markup instead of pasted in as bitmaps.
// Same structure and palette as the product, the site's sans, real text, so
// each frame reflows on a narrow screen and stays crisp at any density. Demo
// data throughout; the strings are the product's own.
export type ProductFrameKind = "paid" | "held" | "statement";

const PAID = {
  profit: 413,
  shares: [
    { name: "Hutchins reserve", code: "", sub: "Office reserve · 5%", amount: 21, tone: "pf-t1" },
    { name: "Hutchins team", code: "HUTCGRCO", sub: "Team pool · 70%", amount: 274, tone: "pf-t2" },
    { name: "Theo York", code: "THEOYOH", sub: "Dispatch share · 7%", amount: 29, tone: "pf-t3" },
    { name: "Margins keeps", code: "", sub: "Remainder after payouts (house)", amount: 89, tone: "pf-t4" },
  ],
};

const money = (n: number) => `$${n.toFixed(2)}`;

function Paid() {
  return (
    <div className="pf pf-paid">
      <div className="pf-card">
        <p className="pf-h">Who got paid</p>
        <p className="pf-sub">How this load&rsquo;s ${PAID.profit} of profit was distributed.</p>
        <div className="pf-bar" aria-hidden="true">
          {PAID.shares.map((s) => (
            <span key={s.name} className={s.tone} style={{ flexGrow: s.amount }}>
              {s.amount >= 80 ? `$${s.amount}` : ""}
            </span>
          ))}
        </div>
        <ul className="pf-rows">
          {PAID.shares.map((s) => (
            <li key={s.name}>
              <i className={s.tone} aria-hidden="true" />
              <div>
                <p className="pf-name">
                  {s.name}
                  {s.code ? <span className="pf-code">{s.code}</span> : null}
                </p>
                <p className="pf-fine">{s.sub}</p>
              </div>
              <p className="pf-amt">{money(s.amount)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Held() {
  return (
    <div className="pf pf-held">
      <div className="pf-alert">
        <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
          <rect x="3" y="7" width="10" height="7" rx="1.5" />
          <path d="M5 7V5a3 3 0 0 1 6 0v2" />
        </svg>
        <div className="pf-alert-text">
          <p className="pf-alert-title">1 blocker is holding the run</p>
          <p className="pf-fine">
            Step 3 — <b>Run pay for the week</b>
            {" — "}stays locked until every blocker is resolved. Warnings don&rsquo;t block.
          </p>
        </div>
        <span className="pf-pill">This week →</span>
      </div>
      <div className="pf-tiles">
        <div>
          <p className="pf-label">Blockers</p>
          <p className="pf-fig pf-red">1</p>
          <p className="pf-sub">must fix to run</p>
        </div>
        <div>
          <p className="pf-label">Warnings</p>
          <p className="pf-fig">15</p>
          <p className="pf-sub">worth a look</p>
        </div>
        <div>
          <p className="pf-label">$ at stake</p>
          <p className="pf-fig">$3,442.33</p>
          <p className="pf-sub">across 16 exceptions</p>
        </div>
        <div>
          <p className="pf-label">Resolved</p>
          <p className="pf-fig">0 / 16</p>
          <p className="pf-sub">this session</p>
        </div>
      </div>
    </div>
  );
}

function Statement() {
  return (
    <div className="pf pf-statement">
      <div className="pf-paper">
        <header className="pf-masthead">
          <div>
            <p className="pf-brand">Margins</p>
            <p className="pf-doc">Commission statement</p>
          </div>
          <div className="pf-dates">
            <p>Week ending Jun 20th, 2026</p>
            <p>Payday Friday, Jun 27</p>
          </div>
        </header>
        <div className="pf-payee">
          <div>
            <p className="pf-payee-name">Beck Zimmer</p>
            <p className="pf-fine">
              BECKZFL · Broker · Granite (Denver) · paid as <b>Flat rate</b>
            </p>
          </div>
          <div className="pf-net">
            <p className="pf-label">Net pay</p>
            <p className="pf-net-fig">$544.00</p>
          </div>
        </div>
        <div className="pf-gate">
          <p className="pf-gate-title">
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <path d="M2 11l4-4 3 3 5-6" />
              <path d="M10 4h4v4" />
            </svg>
            Margin cliff cleared — full rate on all loads
          </p>
          <p className="pf-fine">
            Weekly average margin <b>21.5%</b> vs a <b>13%</b> full-rate threshold — the gate is OFF this
            week: every load pays full rate, including those under the min margin.
          </p>
        </div>
      </div>
    </div>
  );
}

export function ProductFrame({ kind }: { kind: ProductFrameKind }) {
  if (kind === "paid") return <Paid />;
  if (kind === "held") return <Held />;
  return <Statement />;
}
