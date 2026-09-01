import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LearnArticle } from "@/components/learn/LearnArticle";
import { LEARN_ARTICLES, getLearnArticle } from "@/lib/learn-articles";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return LEARN_ARTICLES.map((article) => ({ slug: article.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getLearnArticle(slug);
  if (!article) return {};

  const title = article.htmlTitle ?? `${article.hed} — Endurance AI Labs`;
  const url = `https://endurancelabs.ai/learn/${article.slug}`;

  return {
    title,
    description: article.dek,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: article.dek,
      url,
      type: "article",
    },
  };
}

export default async function LearnArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getLearnArticle(slug);
  if (!article) notFound();

  return <LearnArticle article={article} />;
}
