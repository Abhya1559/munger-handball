type Profile = {
  name: string;
  email: string;
  position: string;
  aadhar: string;
  address: {
    house: string;
    mohalla: string;
    landmark: string;
  };
};

import { profile } from "@/api/auth.api";
import { Alert } from "@heroui/alert";
import { useEffect, useState } from "react";
import {
  User,
  Mail,
  CreditCard,
  MapPin,
  Target,
  Bell,
  ShieldCheck,
  LogOut,
  Globe,
  Loader2,
  ChevronRight,
  Trophy,
  Menu,
  X,
} from "lucide-react";
import React from "react";
import { Button } from "@heroui/button";
import { useAuth } from "@/context/useAuth";
import { Link } from "@heroui/link";

export default function Profile() {
  const [player, setPlayer] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile sidebar

  const { logoutUser } = useAuth();

  const handleRequest = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await profile();
        setPlayer(res.data.player);
      } catch (error: any) {
        setError(error.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 gap-4 p-4">
        <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
        <p className="text-slate-500 font-medium animate-pulse text-center">
          Loading your professional profile...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="p-6">
        <Alert color="danger" title={error} />
      </div>
    );
  if (!player) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row font-sans">
      {/* --- MOBILE HEADER --- */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-orange-500 p-1.5 rounded-lg">
            <Target className="text-white" size={18} />
          </div>
          <span className="font-extrabold text-lg tracking-tight">
            Munger<span className="text-orange-500">HB</span>
          </span>
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-slate-600"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- SIDEBAR (Hidden on mobile unless toggled) --- */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 p-6 flex flex-col transition-transform duration-300 transform
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:sticky md:h-screen
      `}
      >
        <div className="hidden md:flex items-center gap-3 mb-10 px-2">
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-2.5 rounded-xl shadow-lg shadow-orange-100">
            <Target className="text-white" size={22} />
          </div>
          <Link
            href="/"
            className="font-extrabold text-xl tracking-tight text-slate-800"
          >
            Munger<span className="text-orange-500">HB</span>
          </Link>
        </div>

        <nav className="space-y-2 mt-14 flex-1">
          <NavItem icon={<User size={19} />} label="Profile" active />
          <Link href="/notification" className="block">
            <NavItem icon={<Bell size={19} />} label="Notifications" />
          </Link>
          <Link href="/achievements" className="block">
            <NavItem icon={<ShieldCheck size={19} />} label="Achievements" />
          </Link>
        </nav>

        <div className="pt-6 border-t border-slate-100">
          <Button
            onPress={logoutUser}
            className="w-full flex justify-start bg-transparent items-center gap-3 px-4 py-3 text-slate-500 font-semibold hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut size={19} /> Logout
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isMenuOpen && (
        <div
          className="fixed inset-0  bg-slate-900/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-4 sm:p-6 md:p-12 overflow-x-hidden">
        <div className="max-w-4xl mx-auto">
          {/* Hero Profile Card */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8 mb-8 bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -mr-16 -mt-16 opacity-50" />

            <div className="flex justify-center md:justify-start relative">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-tr from-orange-500 to-orange-400 rounded-[2rem] md:rounded-[2.5rem] shadow-xl flex items-center justify-center text-white text-4xl md:text-5xl font-black ring-4 md:ring-8 ring-orange-50">
                {player.name.charAt(0)}
              </div>
            </div>

            <div className="flex-1 space-y-2 text-center md:text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-[10px] font-bold uppercase tracking-wider">
                Professional Player
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                {player.name}
              </h1>
              <div className="text-slate-500 font-medium flex flex-wrap justify-center md:justify-start items-center gap-2 text-sm">
                <Trophy size={14} className="text-orange-500" />
                <span>{player.position}</span>
                <span className="hidden xs:inline">•</span>
                <span className="text-slate-400">
                  ID: {player.aadhar.slice(-4)}
                </span>
              </div>
            </div>

            <div className="w-full md:w-auto">
              <Button
                onPress={handleRequest}
                disabled={success}
                className={`w-full md:w-auto ${success ? "bg-green-500" : "bg-slate-900"} text-white px-8 py-6 rounded-2xl font-bold shadow-xl transition-all`}
              >
                {success ? "Request Sent" : "Request Edit"}
              </Button>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Details */}
              <section className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100">
                <h3 className="text-lg md:text-xl font-bold mb-6 text-slate-800">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                  <InfoItem
                    icon={<Mail />}
                    label="Official Email"
                    value={player.email}
                  />
                  <InfoItem
                    icon={<CreditCard />}
                    label="Aadhar Number"
                    value={player.aadhar}
                  />
                  <InfoItem
                    icon={<Globe />}
                    label="Nationality"
                    value="Indian"
                  />
                </div>
              </section>

              {/* Address Section */}
              <section className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100">
                <h3 className="text-lg md:text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
                  <MapPin className="text-orange-500" size={20} /> Residential
                  Address
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                  <AddressBlock
                    label="House / Flat"
                    value={player.address.house}
                  />
                  <AddressBlock
                    label="Mohhalla"
                    value={player.address.mohalla}
                  />
                  <AddressBlock
                    label="Landmark"
                    value={player.address.landmark}
                  />
                </div>
              </section>
            </div>

            {/* Performance Card */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-700 p-6 md:p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden group h-fit">
              <div className="relative z-10">
                <h4 className="text-orange-100 text-xs font-bold uppercase tracking-widest">
                  Efficiency
                </h4>
                <div className="text-4xl md:text-5xl font-black mt-2">8.4</div>
                <div className="mt-6 flex items-center gap-2 text-xs font-bold bg-white/20 w-fit px-3 py-1.5 rounded-lg backdrop-blur-md">
                  Top 5% in Club <ChevronRight size={14} />
                </div>
              </div>
              <Target
                className="absolute -right-6 -bottom-6 text-white/10 group-hover:scale-110 transition-transform duration-500"
                size={140}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Sub-components: Fixed sizing for better mobile display
const NavItem = ({ icon, label, active = false }: any) => (
  <button
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
      active
        ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
        : "text-slate-400 hover:bg-slate-50"
    }`}
  >
    {icon} <span className="text-sm tracking-wide">{label}</span>
  </button>
);

const InfoItem = ({ icon, label, value }: any) => (
  <div className="flex items-center sm:items-start gap-4">
    <div className="p-3 rounded-xl bg-slate-50 text-slate-400 shrink-0">
      {React.cloneElement(icon, { size: 18 })}
    </div>
    <div className="min-w-0">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
        {label}
      </p>
      <p className="text-slate-800 font-bold text-sm md:text-base truncate">
        {value}
      </p>
    </div>
  </div>
);

const AddressBlock = ({ label, value }: { label: string; value: string }) => (
  <div className="border-b border-slate-200 sm:border-0 pb-3 sm:pb-0 last:border-0">
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">
      {label}
    </p>
    <p className="text-slate-700 font-bold text-sm">{value}</p>
  </div>
);
