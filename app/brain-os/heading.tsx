// A section heading in the homepage's grammar: eyebrow, two-line title with
// the second line in the accent, and the lede alongside.
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
