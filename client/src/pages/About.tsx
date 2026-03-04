import { Navbar } from "@/components/navbar";
import about from "../assets/about2.jpg";
import about2 from "../assets/about3.jpg";
import { Link } from "@heroui/link";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen selection:bg-orange-100">
      <Navbar />

      <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] min-h-[400px] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src={about}
            alt="about-img"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/20 via-black/50 to-zinc-950" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <h1 className="font-black text-4xl sm:text-6xl md:text-8xl text-white uppercase tracking-tighter drop-shadow-2xl leading-none">
            Munger <span className="text-orange-500">handball</span>{" "}
            <br className="hidden md:block" /> Association
          </h1>
          <p className="text-slate-200 max-w-xl mx-auto mt-6 font-medium text-base md:text-xl leading-relaxed opacity-90">
            Discover the passion, the history, and the future of Handball in
            Munger.
          </p>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full lg:w-1/2 flex flex-col items-start space-y-6 md:space-y-8 order-2 lg:order-1">
            <div>
              <span className="text-orange-500 font-black uppercase tracking-[0.2em] text-xs md:text-sm mb-3 block">
                Our Evolution
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[1.1]">
                A Decade of Grit: <br />
                <span className="text-orange-500 italic">From 7 to 300+</span>
              </h2>
            </div>

            <div className="space-y-5 md:space-y-6">
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
                It is our distinct privilege to celebrate the legacy and
                evolution of Munger Handball, an odyssey that began in{" "}
                <span className="text-slate-900 font-bold underline decoration-orange-400 decoration-2 underline-offset-4">
                  2011
                </span>{" "}
                under the visionary leadership of our Secretary,{" "}
                <span className="text-slate-900 font-bold">Rakesh Ranjan</span>.
              </p>

              <p className="text-base md:text-lg text-slate-500 leading-relaxed">
                What started as a humble initiative with just 7 dedicated
                players has now flourished into a powerhouse of talent, boasting
                a thriving community of over 300+ active athletes. Our brand-new
                digital platform connects every stakeholder to the heartbeat of
                Munger’s handball activities.
              </p>
            </div>

            <div className="flex items-center gap-4 py-6 border-t border-slate-100 w-full">
              <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-black text-lg shadow-inner">
                RR
              </div>
              <div>
                <p className="font-black text-slate-900 text-lg leading-none">
                  Rakesh Ranjan
                </p>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-2">
                  Secretary, Munger Handball
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="w-full sm:w-auto text-center bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-5 rounded-2xl shadow-xl shadow-orange-100 transition-all text-lg active:scale-95"
            >
              Get in Touch
            </Link>
          </div>

          <div className="w-full lg:w-1/2 relative order-1 lg:order-2 mb-12 lg:mb-0">
            <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-full h-full border-2 border-orange-200 rounded-[2rem] md:rounded-[2.5rem] z-0" />

            <div className="relative z-10 overflow-hidden rounded-[2rem] md:rounded-[2.5rem] shadow-2xl aspect-[4/5] sm:aspect-video lg:aspect-square">
              <img
                src={about2}
                alt="Munger Handball Legacy"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
              />

              <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-white/95 backdrop-blur-md p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl border border-white/20">
                <p className="text-3xl md:text-4xl font-black text-orange-500 leading-none">
                  15+
                </p>
                <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
                  Years of Excellence
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
