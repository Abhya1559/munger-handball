import hero from "@/assets/hero2.webm";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-[80vh]">
      <div className="relative w-full h-full min-h-[70vh] md:min-h-[80vh] overflow-hidden flex items-center justify-center">
        {/* VIDEO BACKGROUND */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={hero} type="video/webm" />
          </video>

          <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/40 via-black/40 to-black/40"></div>
        </div>

        {/* CONTENT */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl">
          <h1
            className="font-black uppercase text-white tracking-tighter drop-shadow-2xl
          text-3xl sm:text-4xl md:text-6xl lg:text-8xl"
          >
            Munger <span className="text-orange-500">handball</span> Association
          </h1>

          <p
            className="text-slate-200 max-w-lg mx-auto mt-6 font-medium
          text-sm sm:text-base md:text-lg leading-relaxed"
          >
            Discover the passion, the history, and the future of Handball in
            Munger.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-6 items-center justify-center">
            <Button
              onPress={() => navigate("/gallery")}
              className="bg-orange-400 text-white font-medium
              w-full sm:w-auto px-6 py-2"
            >
              Gallery
            </Button>

            <Button
              onPress={() => navigate("/contact")}
              className="border-orange-500 border-2 bg-transparent font-medium text-white
              w-full sm:w-auto px-6 py-2"
            >
              Contact us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
