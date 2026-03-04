import Footer from "@/components/Footer";
import { Navbar } from "@/components/navbar";
import { Button } from "@heroui/button";
import { Home, Mail, Phone, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="relative py-12 md:py-24 px-6 overflow-hidden flex-grow">
        <div className="absolute top-0 right-0 -z-10 w-48 h-48 md:w-64 md:h-64 bg-orange-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 -z-10 w-64 h-64 md:w-96 md:h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          <div className="flex-1 w-full flex flex-col space-y-8 md:space-y-10 order-2 lg:order-1">
            <div className="text-center lg:text-left">
              <span className="text-orange-500 font-black uppercase tracking-[0.2em] text-xs md:text-sm mb-3 block">
                Get In Touch
              </span>
              <h1 className="font-black text-4xl sm:text-5xl md:text-7xl text-slate-900 tracking-tighter mb-4 md:mb-6 leading-none">
                Connect with <br className="hidden sm:block" />{" "}
                <span className="text-orange-500">US.</span>
              </h1>
              <p className="font-medium text-lg md:text-xl text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Have questions about our training programs or upcoming
                tournaments? Reach out to the Munger Handball Association
                directly.
              </p>
            </div>

            {/* Info Cards Stack */}
            <div className="space-y-4 md:space-y-6 w-full max-w-md mx-auto lg:mx-0">
              <ContactCard
                icon={
                  <Mail className="text-orange-500 w-5 h-5 md:w-6 md:h-6" />
                }
                label="Official Email"
                value="abhya1559@gmail.com"
              />
              <ContactCard
                icon={
                  <Phone className="text-orange-500 w-5 h-5 md:w-6 md:h-6" />
                }
                label="Phone Number"
                value="+91 62069 0XXXX"
              />
              <ContactCard
                icon={
                  <Home className="text-orange-500 w-5 h-5 md:w-6 md:h-6" />
                }
                label="Our Headquarters"
                value="Jamalpur, Munger, Bihar"
              />
            </div>
          </div>

          {/* Form Area */}
          <div className="w-full lg:w-[500px] order-1 lg:order-2">
            <div className="bg-white p-6 sm:p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100">
              <form action="" className="flex flex-col space-y-4 md:space-y-6">
                <div className="space-y-1 md:space-y-2">
                  <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full bg-slate-50 border-2 border-slate-50 px-4 md:px-5 py-3 md:py-4 rounded-xl md:rounded-2xl transition duration-300 focus:outline-none focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 text-slate-700 font-medium text-sm md:text-base"
                  />
                </div>

                <div className="space-y-1 md:space-y-2">
                  <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    className="w-full bg-slate-50 border-2 border-slate-50 px-4 md:px-5 py-3 md:py-4 rounded-xl md:rounded-2xl transition duration-300 focus:outline-none focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 text-slate-700 font-medium text-sm md:text-base"
                  />
                </div>

                <div className="space-y-1 md:space-y-2">
                  <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="How can we help you?"
                    className="w-full bg-slate-50 border-2 border-slate-50 px-4 md:px-5 py-3 md:py-4 rounded-xl md:rounded-2xl transition duration-300 focus:outline-none focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 text-slate-700 font-medium resize-none text-sm md:text-base"
                  ></textarea>
                </div>

                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-6 md:py-8 rounded-xl md:rounded-2xl shadow-xl shadow-orange-100 transition-all text-base md:text-lg flex gap-2 active:scale-95">
                  Send Message <Send size={18} className="hidden sm:block" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

const ContactCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-4 md:gap-6 group">
    <div className="p-3 md:p-4 bg-white rounded-xl md:rounded-2xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300 shrink-0">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5 md:mb-1">
        {label}
      </p>
      <h4 className="text-base md:text-xl font-bold text-slate-700 truncate">
        {value}
      </h4>
    </div>
  </div>
);
