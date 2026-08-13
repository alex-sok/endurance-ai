"use client";

import { useState } from "react";

interface Props {
  onOpenChat: () => void;
}

const FAQS = [
  {
    q: "What is Endurance, exactly?",
    a: "A research and engineering lab. We study how a specific industry actually runs, then we write the vertical software for that work. Some of that software is a product. Some of it is a system built around one operation.",
  },
  {
    q: "How is this different from a consulting firm?",
    a: "Consultants leave you a recommendation. We leave you running software. The research is in service of the system, not the other way around.",
  },
  {
    q: "Do you sell a product or build to spec?",
    a: "Both, on purpose. Brain and Logistics are products. When the operation is too specific, we build a vertical system the same way we would a product: research, architecture, then ship.",
  },
  {
    q: "Where does our data live?",
    a: "In your environment when the work requires it. We design for permissioned access and an audit trail. We do not train external models on your data.",
  },
  {
    q: "We are in a regulated industry. Does that change things?",
    a: "It changes the constraints, not the outcome. We have shipped production systems in financial services, healthcare, pharma, and insurance.",
  },
  {
    q: "How long does it take?",
    a: "A focused system is usually weeks, not quarters. We scope to a fixed deliverable. If the first thing you need is a reading of the operation, that is a short engagement of its own.",
  },
  {
    q: "How does pricing work?",
    a: "Fixed scope, flat fee. No hourly billing. Products are priced as products. Custom systems are priced to the system, then delivered.",
  },
];

export function LandingFAQ({ onOpenChat }: Props) {
  const [open, setOpen] = useState(0);

  return (
    <section className="lp-on-light" id="faq" aria-label="Questions">
      <div className="lp-section">
        <p className="lp-kicker">Questions</p>
        <h2 className="lp-h2">Answered plainly.</h2>
        <div className="lp-faq">
          {FAQS.map((faq, i) => (
            <div key={faq.q}>
              <button
                type="button"
                onClick={() => setOpen(i === open ? -1 : i)}
                aria-expanded={i === open}
              >
                {faq.q}
                <span aria-hidden="true">{i === open ? "–" : "+"}</span>
              </button>
              {i === open ? <p>{faq.a}</p> : null}
            </div>
          ))}
        </div>
        <p className="lp-note">
          Still have a question?{" "}
          <button type="button" className="lp-link" onClick={onOpenChat}>
            Ask Grace
          </button>
        </p>
      </div>
    </section>
  );
}
