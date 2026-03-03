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
} from "lucide-react";
import React from "react";
import { Button } from "@heroui/button";
import { useAuth } from "@/context/useAuth";
import { Link } from "@heroui/link";

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

export default function Profile() {
  const [player, setPlayer] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
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
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50 gap-4">
        <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
        <p className="text-slate-500 font-medium animate-pulse">
          Loading your profile...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="p-6">
        <Alert color="danger" title={`${error}`} />
      </div>
    );

  if (!player) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row font-sans">
      {/* --- SIDEBAR --- */}
      <aside className="w-full md:w-72 bg-white border-r border-slate-200 p-6 flex flex-col sticky top-0 h-auto md:h-screen">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-2.5 rounded-xl shadow-lg shadow-orange-100">
            <Target className="text-white" size={22} />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-800">
            Munger<span className="text-orange-500">HB</span>
          </span>
        </div>

        <nav className="space-y-2 flex-1">
          <NavItem icon={<User size={19} />} label="Profile" />

          <Link href="/notification" className="w-full">
            {" "}
            <NavItem icon={<Bell size={19} />} label="Notifications" />
          </Link>
          <Link href="/achievements" className="w-full">
            {" "}
            <NavItem icon={<ShieldCheck size={19} />} label="Achievements" />
          </Link>
        </nav>

        <div className="pt-6 border-t border-slate-100">
          <Button
            onPress={logoutUser}
            className="w-full flex justify-start hover:cursor-pointer bg-transparent items-center gap-3 px-4 py-3 text-slate-500 font-semibold hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut size={19} />
            Logout
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-4 md:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center gap-8 mb-10 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -mr-16 -mt-16 opacity-50" />
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-tr from-orange-500 to-orange-400 rounded-[2.5rem] shadow-2xl shadow-orange-200 flex items-center justify-center text-white text-5xl font-black ring-8 ring-orange-50">
                {player.name.charAt(0)}
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider mb-2">
                Professional Player
              </div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                {player.name}
              </h1>
              <p className="text-slate-500 font-medium flex items-center gap-2">
                <Trophy size={16} className="text-orange-500" />
                {player.position} •{" "}
                <span className="text-slate-400">
                  ID: {player.aadhar.slice(-4)}
                </span>
                {new Intl.DateTimeFormat("en-GB", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date())}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                onPress={handleRequest}
                disabled={success}
                className={`${success ? "bg-green-500" : "bg-slate-900"} text-white px-8 py-6 rounded-2xl font-bold shadow-xl transition-all`}
              >
                {success ? "Request Sent" : "Request Edit"}
              </Button>

              {success && (
                <div className="absolute top-0 left-1/2  -translate-x-1/2 w-full max-w-xs animate-appearance-in">
                  <Alert color="success" title="Request sent successfully" />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Details */}
              <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
              <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <MapPin className="text-orange-500" size={22} />
                    Residential Address
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
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

            {/* Sidebar Cards */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-orange-500 to-orange-700 p-8 rounded-[2rem] text-white shadow-2xl shadow-orange-200 relative overflow-hidden group">
                <div className="relative z-10">
                  <h4 className="text-orange-100 text-xs font-bold uppercase tracking-widest">
                    Efficiency
                  </h4>
                  <div className="text-5xl font-black mt-2">8.4</div>
                  <div className="mt-6 flex items-center gap-2 text-sm font-bold bg-white/20 w-fit px-3 py-1 rounded-lg backdrop-blur-md">
                    Top 5% in Club <ChevronRight size={14} />
                  </div>
                </div>
                <Target
                  className="absolute -right-6 -bottom-6 text-white/10 group-hover:scale-110 transition-transform duration-500"
                  size={160}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Sub-components with improved styling
const NavItem = ({ icon, label, active = false }: any) => (
  <button
    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all duration-200 ${
      active
        ? "bg-orange-500 text-white shadow-lg shadow-orange-100"
        : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
    }`}
  >
    {icon}
    <span className="text-sm tracking-wide">{label}</span>
  </button>
);

const InfoItem = ({ icon, label, value }: any) => (
  <div className="flex items-start gap-4 group">
    <div className="p-3 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors duration-300">
      {React.cloneElement(icon, { size: 22 })}
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] mb-1">
        {label}
      </p>
      <p className="text-slate-800 font-bold leading-tight">{value}</p>
    </div>
  </div>
);

const AddressBlock = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
      {label}
    </p>
    <p className="text-slate-700 font-bold">{value}</p>
  </div>
);
