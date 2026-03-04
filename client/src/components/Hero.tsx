import hero from "@/assets/hero2.webm";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";
export default function Hero() {
  const navigate = useNavigate();
  return (
    <div className="max-w-full min-h-[80vh]">
      <div className="relative w-full h-full min-h-[800px] overflow-hidden flex-1 flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            {" "}
            <source src={hero} type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-black/40  bg-gradient-to-b from-black/40 via-black/40 to-black/40"></div>
        </div>
        <div className="relative z-10  text-center px-4">
          <h1 className="font-black text-4xl uppercase md:text-8xl text-white tracking-tighter drop-shadow-2xl">
            Munger <span className="text-orange-500">handball</span> Association
          </h1>
          <p className="text-slate-200 max-w-lg mx-auto mt-6 font-medium text-lg leading-relaxed">
            Discover the passion, the history, and the future of Handball in
            Munger.
          </p>
          <div className="space-x-5 w-full flex mt-6 items-center justify-center">
            <Button
              onPress={() => navigate("/gallery")}
              className="bg-orange-400 text-white w-[10%] font-medium"
            >
              Gallery
            </Button>
            <Button
              onPress={() => navigate("/contact")}
              className="border-orange-500 border-2 bg-transparent font-medium text-white w-[10%]"
            >
              Contact us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
