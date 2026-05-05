"use client";

import { useState } from "react";
import { LandingHero } from "./LandingHero";
import { LandingProblem } from "./LandingProblem";
import { LandingServices } from "./LandingServices";
import { LandingProof } from "./LandingProof";
import { LandingHowWeWork } from "./LandingHowWeWork";
import { LandingWhoWeHelp } from "./LandingWhoWeHelp";
import { LandingTeam } from "./LandingTeam";
import { LandingCTA } from "./LandingCTA";
import { ChatOverlay } from "./ChatOverlay";

export function LandingShell() {
  const [chatOpen, setChatOpen] = useState(false);
  const openChat = () => setChatOpen(true);

  return (
    <>
      <LandingHero     onOpenChat={openChat} />
      <LandingProblem  onOpenChat={openChat} />
      <LandingServices onOpenChat={openChat} />
      <LandingProof    onOpenChat={openChat} />
      <LandingHowWeWork onOpenChat={openChat} />
      <LandingWhoWeHelp onOpenChat={openChat} />
      <LandingTeam />
      <LandingCTA      onOpenChat={openChat} />

      <ChatOverlay open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
