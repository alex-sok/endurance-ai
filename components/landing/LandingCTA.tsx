"use client";

import { EmailCapture } from "./EmailCapture";
import { CALENDLY_URL, CONTACT_EMAIL } from "@/lib/conversation-flows";

interface Props {
  onOpenChat: () => void;
  onCtaClick?: (label: string) => void;
}

export function LandingCTA({ onOpenChat, onCtaClick }: Props) {
  return (
    <section className="lp-on-light lp-cta" id="cta" aria-label="Talk to Endurance">
      <div className="lp-cta-mark" aria-hidden="true">
        Endurance
      </div>
      <div className="lp-section">
        <p className="lp-kicker">Start here</p>
        <h2 className="lp-h2">Tell us how the work actually runs.</h2>
        <p className="lp-lede">
          A working conversation, not a pitch. If there is a system worth
          building, we will say so. If there is not, we will say that too.
        </p>
        <div className="lp-cta-actions">
          <button type="button" className="lp-btn lp-btn-fill" onClick={onOpenChat}>
            Talk to us
          </button>
          <a
            className="lp-btn lp-btn-line"
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onCtaClick?.("cta-book")}
          >
            Book a call
          </a>
        </div>
        <EmailCapture />
        <footer className="lp-foot">
          <span>
            © {new Date().getFullYear()} Endurance ·{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </span>
          <span>
            <a href="/brain">Brain</a>
            {" · "}
            <a href="/logistics/new">Logistics</a>
            {" · "}
            <a href="/margins">Margins</a>
          </span>
        </footer>
      </div>
    </section>
  );
}
