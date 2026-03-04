import Hero from "./Hero";
import LandingBanner from "./LandingBanner";
// import LandingBanner from "./LandingBanner";
import News from "./News";
import Members from "./OfficeBearer";

export default function Landing() {
  return (
    <div className="w-full flex flex-col gap-y-4">
      <Hero />
      <News />
      <Members />
      <LandingBanner />
    </div>
  );
}
