"use client";

import { EmailCapture } from "./EmailCapture";
import { CALENDLY_URL, CONTACT_EMAIL } from "@/lib/conversation-flows";

interface Props {
  onOpenChat: () => void;
  onCtaClick?: (label: string) => void;
}

export function LandingCTA({ onOpenChat, onCtaClick }: Props) {
  return (
    <>
      <div className="lp-slide" id="cta" data-section="cta">
        <section className="lp-sheet" aria-label="Talk to Endurance">
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
        </section>
      </div>

      <div className="lp-slide" data-section="cta">
        <footer className="lp-close">
          <div className="lp-close-inner">
            <img
              className="lp-close-logo"
              src="/logo-endurance-white.svg"
              alt="Endurance AI Labs"
            />
            <h2 className="lp-h2">The work, then the software.</h2>
            <div className="lp-cta-actions">
              <button type="button" className="lp-btn lp-btn-fill" onClick={onOpenChat}>
                Talk to us
              </button>
            </div>
            <div className="lp-foot">
              <span>
                © {new Date().getFullYear()}{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </span>
              <span>
                <a href="/brain">Brain</a>
                {" · "}
                <a href="/logistics/new">Logistics</a>
                {" · "}
                <a href="/margins">Margins</a>
                {" · "}
                <a href="/system">System</a>
              </span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
