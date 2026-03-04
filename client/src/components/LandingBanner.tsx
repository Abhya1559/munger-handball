import { Button } from "@heroui/button";

export default function LandingBanner() {
  return (
    <div className="w-full bg-white py-12 md:py-20 px-6 mb-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        <p className="font-medium text-lg lg:text-xl leading-relaxed max-w-2xl text-zinc-800">
          More than a sport, we build character and lifelong bonds in Munger.{" "}
          <br />
          From grassroots training to regional glory, our platform helps you
          shine. <br />
          Join the Munger Handball Association—Register today to play your part.
        </p>
        <Button
          radius="full"
          className="bg-orange-500 text-white font-bold px-16 py-8 text-xl shadow-[0_10px_40px_-10px_rgba(249,115,22,0.5)] hover:scale-105 transition-transform shrink-0"
        >
          Register Now
        </Button>
      </div>
    </div>
  );
}
