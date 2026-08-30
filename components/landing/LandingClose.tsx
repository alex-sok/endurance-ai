"use client";

import { CONTACT_EMAIL } from "@/lib/conversation-flows";

interface Props {
  onOpenChat: () => void;
}

export function LandingClose({ onOpenChat }: Props) {
  return (
    <footer className="lp-close" id="cta" data-section="close">
      <div className="lp-close-inner">
        <img
          className="lp-close-logo"
          src="/logo-endurance-white.svg"
          alt="Endurance AI Labs"
        />
        <h2 className="lp-h2">The work, then the software.</h2>
        <p className="lp-lede">
          If the week still lives in someone&apos;s head, we should talk.
        </p>
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
            <a href="/margins">Margins</a>
            {" · "}
            <a href="/system">System</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
