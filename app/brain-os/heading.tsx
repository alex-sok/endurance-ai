// Match the landing page: eyebrow, heading, and supporting copy beneath it.
export function Heading({ kicker, title, lede, id }: { kicker: string; title: string[]; lede: string; id: string }) {
  return (
    <div className="bp-heading">
      <div>
        <p className="eyebrow">{kicker}</p>
        <h2 id={id}>{title[0]}<br /><span className="text-accent">{title[1]}</span></h2>
      </div>
      <p>{lede}</p>
    </div>
  );
}
