"use client";

import { CALENDLY_URL, CONTACT_EMAIL } from "@/lib/conversation-flows";
import { EmailCapture } from "./EmailCapture";
import type { ProductClose } from "./product-content";

interface Props {
  onOpenChat: () => void;
  close?: ProductClose;
}

export function LandingClose({ onOpenChat, close }: Props) {
  const title = close?.title ?? "The work, then the software.";
  const lede = close ? close.lede : "If there is a system worth building, we will say so.";
  const talkLabel = close?.talkLabel ?? "Talk to us";

  return (
    <footer className="lp-close" id="cta" data-section="close">
      <div className="lp-close-inner">
        <img
          className="lp-close-logo"
          src="/logo-endurance-white.svg"
          alt="Endurance AI Labs"
        />
        {close?.kicker ? <p className="lp-kicker">{close.kicker}</p> : null}
        <h2 className="lp-h2">{title}</h2>
        {lede ? <p className="lp-lede">{lede}</p> : null}
        <div className="lp-cta-actions">
          <button type="button" className="lp-btn lp-btn-fill" onClick={onOpenChat}>
            {talkLabel}
          </button>
          <a
            className="lp-btn lp-btn-line"
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a call
          </a>
        </div>
        {close?.hideCapture ? null : <EmailCapture />}
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
