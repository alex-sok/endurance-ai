import { Exhibit } from "./Exhibit";
import { BRAIN_ANSWERS } from "./product-content";

/* The first two verticals. Brain OS leads because it is the claim the
   company makes; Foundations follows as the vertical where that claim has
   been running in production since March. */
export function LandingProducts() {
  return (
    <div id="work" data-section="work">
      <section className="lp-chapter" aria-labelledby="work-brain">
        <div className="lp-chapter-copy">
          <p className="lp-eyebrow">01 · Brain OS</p>
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
        <Exhibit
          exhibit={{
            caption: "Example use cases",
            head: "Ask Brain",
            meta: "Ask in plain language · documents behind each answer",
            rows: BRAIN_ANSWERS,
          }}
        />
      </section>

      <section className="lp-chapter" aria-labelledby="work-foundations">
        <div className="lp-chapter-copy">
          <p className="lp-eyebrow">02 · Foundations</p>
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
          <p className="lp-proofline">
            <b>$4.02M</b> settled · <b>200,000</b> loads of data · <b>20</b>{" "}
            duplicate loads stopped before they paid twice
          </p>
          <a className="lp-feature-cta" href="/margins">
            Open Margins
          </a>
        </div>
        <Exhibit
          exhibit={{
            caption: "Autonomized, end to end",
            head: "The freight stack",
            meta: "Every aspect of the business, running itself",
            rows: [
              {
                label: "Margins",
                sub: "every commission computed off the TMS, penny-accurate, exceptions held",
                value: "$4.02M",
              },
              {
                label: "Carrier invoicing",
                sub: "every invoice matched to its rate confirmation, carrier side and shipper side",
                value: "318/wk",
              },
              {
                label: "CRM",
                sub: "prospecting embedded: the next best carrier and shipper, surfaced with the reason",
                value: "2,627",
              },
              {
                label: "Nova",
                sub: "a live dispatcher, texting drivers and shippers in real time from tender to delivery",
                value: "24/7",
              },
            ],
          }}
        />
      </section>
    </div>
  );
}
