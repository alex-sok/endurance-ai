import { AccessForm } from "./AccessForm";
import "./access.css";

export const metadata = {
  title: "Copperline Logistics — access",
  description: "Password protected.",
  robots: { index: false, follow: false },
};

/**
 * /copperline/access — the password gate for the Copperline Logistics demo.
 *
 * Routed to by proxy.ts when the visitor doesn't carry a valid access cookie.
 * This is a real page in this app, so it wins over the /copperline/:path*
 * rewrite (an array return from rewrites() is matched afterFiles, i.e. after
 * filesystem routes). Everything else under /copperline proxies to the demo.
 */
export default async function AccessPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; err?: string }>;
}) {
  const params = await searchParams;
  return (
    <main className="cl-access">
      <div className="cl-access__inner">
        <div className="cl-access__mark">
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden focusable="false">
            <rect x="1" y="1" width="22" height="22" rx="6" fill="#1a1a18" />
            <path
              d="M17 8.2a5.6 5.6 0 1 0 0 7.6"
              fill="none"
              stroke="#2e6ff2"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <circle cx="12" cy="12" r="1.7" fill="#fff" />
          </svg>
          <span>Copperline Logistics</span>
        </div>

        <h1 className="cl-access__title">This demo is password protected.</h1>
        <p className="cl-access__sub">
          Enter the access phrase you were sent to open the platform walkthrough.
        </p>

        <AccessForm from={params.from} configError={params.err === "config"} />

        <p className="cl-access__foot">
          Copperline Logistics is a fictional freight brokerage used to demonstrate the Endurance
          logistics operating platform. All data behind this gate is synthetic. Trouble getting in?
          Email <a href="mailto:hello@endurancelabs.ai">hello@endurancelabs.ai</a>.
        </p>
      </div>
    </main>
  );
}
