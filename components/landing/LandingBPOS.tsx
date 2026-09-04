import Link from "next/link";
import { BrainOSConsole } from "./BrainOSConsole";

/* The console on the landing page. It is the same component that runs full
   screen at /brain-os; here it is one chapter of the argument, there it is
   the whole thing. */
export function LandingBPOS() {
  return (
    <section className="lp-sheet" id="bpos" data-section="bpos" aria-label="Inside Brain OS">
      <p className="lp-kicker">03 · Inside Brain OS</p>
      <h2 className="lp-h2">Pick an industry. Look inside the system.</h2>
      <p className="lp-lede">
        Each of these is a product already running. The shape changes with the
        operation, because the operation is what it is wired into.
      </p>

      <BrainOSConsole />

      <Link className="lp-feature-cta" href="/brain-os">
        Open Brain OS full screen
      </Link>
    </section>
  );
}
