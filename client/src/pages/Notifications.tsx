import { BellOff, ChevronLeft, BellRing } from "lucide-react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

export default function Notifications() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header Section - Adaptive text alignment */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-10 gap-2">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Notifications
            </h1>
            <p className="text-slate-500 font-medium mt-1 text-sm md:text-base">
              Stay updated with your latest activities
            </p>
          </div>
        </div>

        {/* Main Content Card - Reduced radius on mobile for better fit */}
        <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden min-h-[450px] md:min-h-[500px] flex flex-col items-center justify-center p-6 md:p-8 text-center">
          {/* Visual Indicator - Scaled down for mobile */}
          <div className="relative mb-6 md:mb-8">
            <div className="absolute inset-0 bg-orange-100 blur-2xl rounded-full opacity-60 scale-125 md:scale-150" />
            <div className="relative bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-xl border border-slate-50">
              <BellOff
                className="text-slate-300 w-12 h-12 md:w-16 md:h-16"
                strokeWidth={1.5}
              />

              {/* Floating Pulse Dot */}
              <div className="absolute top-4 right-4 md:top-6 md:right-6 w-3 h-3 md:w-4 md:h-4 bg-orange-500 rounded-full border-2 md:border-4 border-white animate-ping" />
              <div className="absolute top-4 right-4 md:top-6 md:right-6 w-3 h-3 md:w-4 md:h-4 bg-orange-500 rounded-full border-2 md:border-4 border-white" />
            </div>
          </div>

          {/* Text Information */}
          <div className="max-w-sm space-y-3">
            <h3 className="text-xl md:text-2xl font-bold text-slate-800">
              Quiet for now
            </h3>
            <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed">
              When you receive updates about matches, training schedules, or
              profile approvals, they will appear here.
            </p>
          </div>

          {/* Action Footer - Full width buttons on mobile */}
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto">
            <Link
              href="/profile"
              className="bg-slate-900 text-white px-6 py-3 md:py-2 rounded-xl md:rounded-2xl font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <ChevronLeft size={18} />
              Back to Dashboard
            </Link>

            <Button
              variant="flat"
              className="bg-orange-50 text-orange-600 px-6 py-6 md:py-6 rounded-xl md:rounded-2xl font-bold hover:bg-orange-100 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <BellRing size={18} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Static Tips Section - 1 col mobile, 2 col desktop */}
        <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 md:p-6 bg-slate-100/50 rounded-2xl md:rounded-3xl border border-dashed border-slate-200">
            <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
              Pro Tip
            </p>
            <p className="text-xs md:text-sm text-slate-600 font-medium">
              You can customize notification types in your Account Settings.
            </p>
          </div>
          <div className="p-5 md:p-6 bg-slate-100/50 rounded-2xl md:rounded-3xl border border-dashed border-slate-200">
            <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
              Archive
            </p>
            <p className="text-xs md:text-sm text-slate-600 font-medium">
              Deleted notifications are automatically cleared after 30 days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
