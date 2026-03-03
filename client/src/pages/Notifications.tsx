import { BellOff, ChevronLeft, Settings, BellRing } from "lucide-react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

export default function Notifications() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Notifications
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Stay updated with your latest activities
            </p>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden min-h-[500px] flex flex-col items-center justify-center p-8 text-center">
          {/* Visual Indicator */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-orange-100 blur-2xl rounded-full opacity-60 scale-150" />
            <div className="relative bg-white p-8 rounded-[2rem] shadow-xl border border-slate-50">
              <BellOff className="text-slate-300 w-16 h-16" strokeWidth={1.5} />

              {/* Floating Pulse Dot */}
              <div className="absolute top-6 right-6 w-4 h-4 bg-orange-500 rounded-full border-4 border-white animate-ping" />
              <div className="absolute top-6 right-6 w-4 h-4 bg-orange-500 rounded-full border-4 border-white" />
            </div>
          </div>

          {/* Text Information */}
          <div className="max-w-sm space-y-3">
            <h3 className="text-2xl font-bold text-slate-800">Quiet for now</h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              When you receive updates about matches, training schedules, or
              profile approvals, they will appear here.
            </p>
          </div>

          {/* Action Footer */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/profile"
              className="bg-slate-900 text-white px-6 py-2 rounded-2xl font-bold shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all flex items-center gap-2"
            >
              <ChevronLeft size={18} />
              Back to Dashboard
            </Link>

            <Button
              variant="flat"
              className="bg-orange-50 text-orange-600 px-8 py-6 rounded-2xl font-bold hover:bg-orange-100 transition-all flex items-center gap-2"
            >
              <BellRing size={18} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Static Tips Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-slate-100/50 rounded-3xl border border-dashed border-slate-200">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
              Pro Tip
            </p>
            <p className="text-sm text-slate-600 font-medium">
              You can customize notification types in your Account Settings.
            </p>
          </div>
          <div className="p-6 bg-slate-100/50 rounded-3xl border border-dashed border-slate-200">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
              Archive
            </p>
            <p className="text-sm text-slate-600 font-medium">
              Deleted notifications are automatically cleared after 30 days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
