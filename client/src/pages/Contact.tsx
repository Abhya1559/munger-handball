import Footer from "@/components/Footer";
import { Navbar } from "@/components/navbar";

import { Button } from "@heroui/button";
import { Home, Mail, Phone, Send } from "lucide-react";

export default function Contact() {
  return (
    <div>
      <Navbar />
      <section className="relative py-16 md:py-24 px-6 overflow-hidden ">
        <div className="absolute top-0 right-0 -z-10 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="flex-1 flex flex-col space-y-10">
            <div>
              <span className="text-orange-500 font-black uppercase tracking-[0.2em] text-sm mb-3 block">
                Get In Touch
              </span>
              <h1 className="font-black text-5xl md:text-7xl text-slate-900 tracking-tighter mb-6">
                Connect with <br /> <span className="text-orange-500">US.</span>
              </h1>
              <p className="font-medium text-xl text-slate-500 max-w-xl leading-relaxed">
                Have questions about our training programs or upcoming
                tournaments? Reach out to the Munger Handball Association
                directly.
              </p>
            </div>

            <div className="space-y-6">
              <ContactCard
                icon={<Mail className="text-orange-500" size={24} />}
                label="Official Email"
                value="abhya1559@gmail.com"
              />
              <ContactCard
                icon={<Phone className="text-orange-500" size={24} />}
                label="Phone Number"
                value="+91 62069 0XXXX"
              />
              <ContactCard
                icon={<Home className="text-orange-500" size={24} />}
                label="Our Headquarters"
                value="Jamalpur, Munger, Bihar"
              />
            </div>
          </div>

          <div className="w-full lg:w-[500px]">
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 relative">
              <form action="" className="flex flex-col space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full bg-slate-50 border-2 border-slate-50 px-5 py-4 rounded-2xl transition duration-300 focus:outline-none focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 text-slate-700 font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    className="w-full bg-slate-50 border-2 border-slate-50 px-5 py-4 rounded-2xl transition duration-300 focus:outline-none focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 text-slate-700 font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="How can we help you?"
                    className="w-full bg-slate-50 border-2 border-slate-50 px-5 py-4 rounded-2xl transition duration-300 focus:outline-none focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 text-slate-700 font-medium resize-none"
                  ></textarea>
                </div>

                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-8 rounded-2xl shadow-xl shadow-orange-200 transition-all text-lg flex gap-2">
                  Send Message <Send size={18} />
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

// Sub-component for info items
const ContactCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-6 group">
    <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
        {label}
      </p>
      <h4 className="text-xl font-bold text-slate-700">{value}</h4>
    </div>
  </div>
);
