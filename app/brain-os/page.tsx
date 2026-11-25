import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { BrainOSConsole } from "@/components/landing/BrainOSConsole";
import { industries } from "@/app/landing/industries";
import { callUrl } from "@/app/landing/site-chrome";
import "../landing.css";
import styles from "./console.module.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const industryExamples = industries.filter(({ id }) => id === "auto-dealerships" || id === "architecture-firms" || id === "golf-courses");

export const metadata: Metadata = {
  title: "Brain OS — Endurance AI Labs",
  description:
    "Explore Brain OS workflows and specialized products for golf courses, auto dealerships, architecture firms, and more.",
};

export default function BrainOSPage() {
  return (
    <div className={`theme-paper bos-page ${styles.console} ${geist.variable}`}>
      <header className="bos-top">
        <Link className="bos-back" href="/">
          <span aria-hidden="true">&larr;</span> Endurance AI Labs
        </Link>
        <div className="bos-title">
          <span className="bpos-sq">B</span>
          <b>Brain OS</b>
          <span className="bos-sub">Brain powered operating systems</span>
        </div>
        <Link className="bos-cta" href="/#contact">
          See what we’d build for you
        </Link>
      </header>

      <main className="bos-main">
        <BrainOSConsole variant="full" />
        <section className={styles.industryExamples} aria-labelledby="industry-examples-title">
          <h2 id="industry-examples-title">Brain OS for your industry</h2>
          <div className={styles.industryGrid}>
            {industryExamples.map((industry) => (
              <article key={industry.id} id={industry.id}>
                <Image src={industry.imageSrc} alt={industry.imageLabel} width={1536} height={512} sizes="(max-width: 700px) 100vw, 33vw" />
                <h3>{industry.label}</h3>
                <p>{industry.copy}</p>
                <ul>{industry.examples.map((example) => <li key={example}>{example}</li>)}</ul>
                {industry.id === "golf-courses" && <a href={callUrl} target="_blank" rel="noreferrer">Talk about your golf operation</a>}
              </article>
            ))}
          </div>
          <Link href="/#work">Explore the industry map</Link>
        </section>
      </main>
    </div>
  );
}
