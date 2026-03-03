import { Navbar } from "@/components/navbar";
import about from "../assets/about2.jpg";
import about2 from "../assets/about3.jpg";
import { Link } from "@heroui/link";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="flex flex-col min-h-[80vh]">
      <Navbar />
      <section className="relative w-full h-full min-h-[500px] overflow-hidden flex-1 flex items-center justify-center">
        <div className="absolute inset-0 z-0 ">
          <img
            src={about}
            alt="about-img"
            className="w-full h-full object-cover "
          />
          <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/40 via-black/60 to-black" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="font-black text-4xl uppercase md:text-8xl text-white tracking-tighter drop-shadow-2xl">
            Munger <span className="text-orange-500">handball</span> Association
          </h1>
          <p className="text-slate-200 max-w-lg mx-auto mt-6 font-medium text-lg leading-relaxed">
            Discover the passion, the history, and the future of Handball in
            Munger.
          </p>
        </div>
      </section>
      <section className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 flex flex-col items-start space-y-8">
            <div>
              <span className="text-orange-500 font-black uppercase tracking-[0.2em] text-sm mb-3 block">
                Our Evolution
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[1.1]">
                A Decade of Grit: <br />
                <span className="text-orange-500 italic">From 7 to 300+</span>
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-xl text-slate-600 leading-relaxed font-medium">
                It is our distinct privilege to celebrate the legacy and
                evolution of Munger Handball, an odyssey that began in{" "}
                <span className="text-slate-900 font-bold underline decoration-orange-400">
                  2011
                </span>{" "}
                under the visionary leadership of our Secretary,{" "}
                <span className="text-slate-900 font-bold">Rakesh Ranjan</span>.
              </p>

              <p className="text-lg text-slate-500 leading-relaxed">
                What started as a humble initiative with just 7 dedicated
                players has now flourished into a powerhouse of talent, boasting
                a thriving community of over 300+ active athletes. Our brand-new
                digital platform is launched with the primary mission of
                connecting every stakeholder to the heartbeat of Munger’s
                handball activities.
              </p>
            </div>

            <div className="flex items-center gap-4 py-4 border-t border-slate-100 w-full">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                RR
              </div>
              <div>
                <p className="font-black text-slate-900 leading-none">
                  Rakesh Ranjan
                </p>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mt-1">
                  Secretary, Munger Handball
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-4 rounded-2xl shadow-xl shadow-orange-100 transition-all text-lg"
            >
              Get in Touch
            </Link>
          </div>

          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -top-6 -right-6 w-full h-full border-2 border-orange-200 rounded-[2.5rem] z-0" />

            <div className="relative z-10 overflow-hidden rounded-[2.5rem] shadow-2xl">
              <img
                src={about2}
                alt="Munger Handball Legacy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/20">
                <p className="text-4xl font-black text-orange-500">15+</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
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
