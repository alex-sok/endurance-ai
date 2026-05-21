import { AccessForm } from "./AccessForm";

export const metadata = {
  title: "Endurance Logistics — access",
  description: "Password protected.",
  robots: { index: false, follow: false },
};

/**
 * /logistics/access — the password gate.
 *
 * Routed to by middleware.ts when the visitor doesn't carry a valid
 * access cookie. Inherits the logistics dark theme (via the parent
 * layout at app/logistics/layout.tsx), then renders a single centered
 * password form. No animation, no chrome — this isn't a marketing
 * surface.
 */
export default async function AccessPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; err?: string }>;
}) {
  const params = await searchParams;
  return (
    <main className="logi-access">
      <div className="logi-access__inner">
        <div className="logi-tag">Endurance Logistics</div>
        <h1 className="logi-display-sm logi-access__title">
          This page is{" "}
          <span className="logi-access__accent">password protected</span>.
        </h1>
        <p className="logi-body logi-body-muted logi-access__sub">
          Enter the access phrase you were sent.
        </p>
        <AccessForm from={params.from} configError={params.err === "config"} />
        <p className="logi-mono logi-access__foot">
          Trouble getting in? Email{" "}
          <a href="mailto:hello@endurancelabs.ai">hello@endurancelabs.ai</a>.
        </p>
      </div>
    </main>
  );
}
