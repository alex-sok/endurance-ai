import { AccessForm } from "./AccessForm";

export const metadata = {
  title: "Endurance Investments — access",
  description: "Password protected.",
  robots: { index: false, follow: false },
};

export default async function AccessPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; err?: string }>;
}) {
  const params = await searchParams;
  return (
    <main className="inv-access">
      <div className="inv-access__inner">
        <div className="inv-tag">Endurance Investments</div>
        <h1 className="inv-display-sm inv-access__title">
          This page is{" "}
          <span className="inv-access__accent">password protected</span>.
        </h1>
        <p className="inv-body inv-body-muted inv-access__sub">
          Enter the access phrase you were sent.
        </p>
        <AccessForm from={params.from} configError={params.err === "config"} />
        <p className="inv-mono inv-access__foot">
          Trouble getting in? Email{" "}
          <a href="mailto:hello@endurancelabs.ai">hello@endurancelabs.ai</a>.
        </p>
      </div>
    </main>
  );
}
