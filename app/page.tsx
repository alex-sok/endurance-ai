import ArtfieldHome from "./artfield/home";
import HomeFrame, { homepageMetadata } from "./artfield/home-frame";

export const metadata = homepageMetadata;

export default function Home() {
  return <HomeFrame><ArtfieldHome /></HomeFrame>;
}
