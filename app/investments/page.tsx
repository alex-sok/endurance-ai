import { Hero } from "./sections/Hero";
import { ExecutiveSummary } from "./sections/ExecutiveSummary";
import { Problem } from "./sections/Problem";
import { Solution } from "./sections/Solution";
import { Modules } from "./sections/Modules";
import { Market } from "./sections/Market";
import { Competitive } from "./sections/Competitive";
import { WhyNow } from "./sections/WhyNow";
import { Vision } from "./sections/Vision";
import { Close } from "./sections/Close";
import { RevealClient } from "./components/RevealClient";

/**
 * /investments — the investor pitch page for Endurance Investments.
 *
 * Ten sections, in narrative order, mirroring the vision doc:
 *  01 — Hero
 *  02 — Executive summary
 *  03 — The problem
 *  04 — The solution
 *  05 — Product modules
 *  06 — Market opportunity
 *  07 — Competitive positioning
 *  08 — Why now
 *  09 — Long-term vision
 *  10 — Close & CTA
 */
export default function InvestmentsPage() {
  return (
    <main>
      <RevealClient />
      <Hero />
      <hr className="inv-rule" />
      <ExecutiveSummary />
      <hr className="inv-rule" />
      <Problem />
      <hr className="inv-rule" />
      <Solution />
      <hr className="inv-rule" />
      <Modules />
      <hr className="inv-rule" />
      <Market />
      <hr className="inv-rule" />
      <Competitive />
      <hr className="inv-rule" />
      <WhyNow />
      <hr className="inv-rule" />
      <Vision />
      <hr className="inv-rule" />
      <Close />
    </main>
  );
}
