import Home from "./landing/home";
import LandingFrame, { homepageMetadata } from "./landing/landing-frame";
import { homepageJsonLd } from "@/lib/site-schema";

export const metadata = homepageMetadata;

export default function Page() {
  return (
    <LandingFrame>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd()).replace(/</g, "\\u003c") }}
      />
      <Home />
    </LandingFrame>
  );
}
