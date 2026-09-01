import type { LearnArticle as LearnArticleData } from "@/lib/learn-articles";

export function LearnArticle({ article }: { article: LearnArticleData }) {
  return (
    <article className="learn-article">
      <header className="learn-chrome" id="top">
        <p className="learn-kicker">{article.kicker}</p>
        <h1 className="learn-hed">{article.hed}</h1>
        <p className="learn-dek">{article.dek}</p>
      </header>
      <p className="learn-pull">{article.pull}</p>
      <div className="learn-body">
        {article.grafs.map((graf) => (
          <p key={graf}>{graf}</p>
        ))}
        <p className="learn-close">{article.close}</p>
      </div>
    </article>
  );
}
