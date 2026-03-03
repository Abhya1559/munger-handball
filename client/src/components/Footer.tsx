import React from "react";
import {
  Target,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  ChevronRight,
  ArrowUpCircle,
} from "lucide-react";
import { Button } from "@heroui/button";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 p-2 rounded-xl shadow-lg shadow-orange-500/20">
                <Target className="text-white" size={24} />
              </div>
              <span className="font-black text-2xl tracking-tighter text-white uppercase italic">
                Munger<span className="text-orange-500">HB</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Established in 2011, Munger Handball Club is dedicated to
              fostering athletic excellence and sportsmanship in the heart of
              Bihar. From 7 pioneers to 300+ champions.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Facebook size={18} />} />
              <SocialIcon icon={<Instagram size={18} />} />
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Youtube size={18} />} />
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">
              Navigation
            </h4>
            <ul className="space-y-4">
              <FooterLink label="Home" />
              <FooterLink label="About Our Legacy" />
              <FooterLink label="Players Portal" />
              <FooterLink label="Latest Achievements" />
              <FooterLink label="Upcoming Tournaments" />
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">
              Get In Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <MapPin className="text-orange-500 mt-1 shrink-0" size={18} />
                <span className="text-sm">
                  Polo Ground, Munger, <br />
                  Bihar, India - 811201
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="text-orange-500 shrink-0" size={18} />
                <span className="text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail className="text-orange-500 shrink-0" size={18} />
                <span className="text-sm">contact@mungerhandball.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter/CTA */}
          <div className="bg-slate-800/50 p-6 rounded-[2rem] border border-slate-800">
            <h4 className="text-white font-bold text-lg mb-2">
              Stay in the Loop
            </h4>
            <p className="text-xs text-slate-500 mb-4 font-medium">
              Get match updates and news directly.
            </p>
            <div className="relative">
              <Button
                onPress={() => (window.location.pathname = "/contact")}
                className="bg-orange-500 text-white font-semibold"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Copyright & Scroll to Top */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
            © 2026 Munger Handball Association. All Rights Reserved.
          </p>

          <div className="flex items-center gap-8">
            <div className="flex gap-6 text-xs font-bold uppercase tracking-widest text-slate-500">
              <a href="#" className="hover:text-orange-500 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors">
                Terms
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-slate-400 hover:text-white transition-all"
            >
              <span className="text-xs font-black uppercase tracking-widest">
                Back to top
              </span>
              <ArrowUpCircle className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <a
    href="#"
    className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-lg"
  >
    {icon}
  </a>
);

const FooterLink = ({ label }: { label: string }) => (
  <li className="group flex items-center gap-2 cursor-pointer">
    <div className="w-0 group-hover:w-2 h-0.5 bg-orange-500 transition-all duration-300" />
    <span className="text-sm font-medium group-hover:text-orange-500 transition-colors tracking-wide">
      {label}
    </span>
  </li>
);
