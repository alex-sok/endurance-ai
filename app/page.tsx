import Home from "./landing/home";
import LandingFrame, { homepageMetadata } from "./landing/landing-frame";

export const metadata = homepageMetadata;

export default function Page() {
  return <LandingFrame><Home /></LandingFrame>;
}
