import { LEARN_ARTICLES, LEARN_INDEX_LINE } from "@/lib/learn-articles";

export function LearnIndex() {
  return (
    <div className="learn-index" id="top">
      <p className="learn-kicker">LEARN</p>
      <p className="learn-index-line">{LEARN_INDEX_LINE}</p>
      <ul className="learn-index-list">
        {LEARN_ARTICLES.map((article) => (
          <li key={article.slug}>
            <a href={`/learn/${article.slug}`}>{article.hed}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
