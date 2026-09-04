import type { Exhibit as ExhibitData } from "@/components/margins/proof-content";

// Product data, typeset in the page's own hand. A marketing page never shows
// eight-pixel interface text; where a detail matters, it is set here.
export function Exhibit({ exhibit }: { exhibit: ExhibitData }) {
  return (
    <figure className="lp-exhibit">
      <figcaption className="lp-exhibit-cap">{exhibit.caption}</figcaption>
      <p className="lp-exhibit-head">{exhibit.head}</p>
      <p className="lp-exhibit-meta">{exhibit.meta}</p>
      <ul className="lp-exhibit-rows">
        {exhibit.rows.map((row) => (
          <li key={row.label}>
            <span>
              {row.label}
              <em>{row.sub}</em>
            </span>
            <b>{row.value}</b>
          </li>
        ))}
      </ul>
      {exhibit.foot ? (
        <p className="lp-exhibit-foot">
          <span>{exhibit.foot.label}</span>
          <b>{exhibit.foot.value}</b>
        </p>
      ) : null}
    </figure>
  );
}
