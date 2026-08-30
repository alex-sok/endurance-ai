"use client";

import { EmailCapture } from "./EmailCapture";
import { LandingClose } from "./LandingClose";
import { CALENDLY_URL } from "@/lib/conversation-flows";

interface Props {
  onOpenChat: () => void;
  onCtaClick?: (label: string) => void;
}

export function LandingCTA({ onOpenChat, onCtaClick }: Props) {
  return (
    <>
      <section className="lp-sheet" id="cta" data-section="cta" aria-label="Talk to Endurance">
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

      <LandingClose onOpenChat={onOpenChat} />
    </>
  );
}
