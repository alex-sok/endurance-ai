import { BRAIN_ANSWERS } from "./product-content";

/* The first two verticals. The side-panel modules are gone: each chapter
   runs its copy at full measure, then opens into a showcase that spans the
   band — the use cases as tiles for Brain OS, the autonomized stack as
   tiles for Foundations. */

const FREIGHT_STACK = [
  {
    name: "Margins",
    value: "$4.02M",
    sub: "Every commission computed off the TMS, penny-accurate, exceptions held.",
  },
  {
    name: "Carrier invoicing",
    value: "318/wk",
    sub: "Every invoice matched to its rate confirmation, carrier side and shipper side.",
  },
  {
    name: "CRM",
    value: "2,627",
    sub: "Prospecting embedded: the next best carrier and shipper, surfaced with the reason.",
  },
  {
    name: "Nova",
    value: "24/7",
    sub: "A live dispatcher, texting drivers and shippers in real time from tender to delivery.",
  },
];

export function LandingProducts() {
  return (
    <div id="work" data-section="work">
      <section className="lp-chapter is-showcase" aria-labelledby="work-brain">
        <div className="lp-chapter-copy">
          <p className="lp-eyebrow">01 · Brain OS</p>
          <p className="lp-pain">
            &ldquo;We have the data somewhere, but every answer takes three
            people and a day.&rdquo;
          </p>
          <p className="lp-solve">How Endurance solves it —</p>
          <h2 id="work-brain">
            Your whole company&rsquo;s operations - automated before anybody
            asks.
          </h2>
          <p className="lp-lead">
            Ask your business a question, get the answer with the receipt. The
            operating system is what we ship, wired into what you already run.
          </p>
          <p className="lp-body">
            Deterministic by design: ask twice, get the same answer. Every
            output traces back to a source of truth. Nothing is invented. And
            your best people stop doing admin and start doing the work you
            hired them for.
          </p>
          <a className="lp-feature-cta" href="/brain-os">
            Open Brain OS
          </a>
        </div>

        <div className="lp-showcase-head">
          <p className="lp-showcase-title">Ask Brain</p>
          <p className="lp-showcase-meta">
            Example use cases · documents behind each answer
          </p>
        </div>
        <div className="lp-showcase">
          {BRAIN_ANSWERS.map((a) => (
            <div className="lp-tile" key={a.label}>
              <p className="lp-tile-q">{a.label}</p>
              <p className="lp-tile-a">{a.sub}</p>
              <p className="lp-tile-n">{a.value} documents</p>
            </div>
          ))}
        </div>
      </section>

      <section className="lp-chapter is-showcase" aria-labelledby="work-foundations">
        <div className="lp-chapter-copy">
          <p className="lp-eyebrow">02 · Foundations</p>
          <p className="lp-pain">
            &ldquo;A third of our miles run empty, and the back office runs on
            spreadsheets.&rdquo;
          </p>
          <p className="lp-solve">How Endurance solves it —</p>
          <h2 id="work-foundations">Revolutionizing the freight marketplace.</h2>
          <p className="lp-lead">
            We are building the Uber for freight: a marketplace where the
            load, the truck and the money clear without a phone call.
          </p>
          <p className="lp-body">
            It starts from a key strategic partnership already in place,
            seeded with ten-plus years and 200,000 loads of operating data.
            That history is the edge: real rates, real lanes, real carriers
            and real outcomes the marketplace prices against from day one.
          </p>
          <blockquote className="lp-quote">
            &ldquo;Foundations is fundamentally killing deadhead: the empty
            mile.&rdquo;
          </blockquote>
          <p className="lp-proofline">
            <b>$4.02M</b> settled · <b>200,000</b> loads of data · <b>20</b>{" "}
            duplicate loads stopped before they paid twice
          </p>
          <a className="lp-feature-cta" href="/margins">
            Open Margins
          </a>
        </div>

        <div className="lp-showcase-head">
          <p className="lp-showcase-title">The freight stack</p>
          <p className="lp-showcase-meta">
            Autonomized, end to end · every aspect running itself
          </p>
        </div>
        <div className="lp-showcase lp-showcase-4">
          {FREIGHT_STACK.map((m) => (
            <div className="lp-tile" key={m.name}>
              <div className="lp-tile-row">
                <p className="lp-tile-q">{m.name}</p>
                <p className="lp-tile-v">{m.value}</p>
              </div>
              <p className="lp-tile-a">{m.sub}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
