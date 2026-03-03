import { Trophy, ChevronLeft, Sparkles } from "lucide-react";
import { Button } from "@heroui/button";

export default function Achievements() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Animated Icon Cluster */}
        <div className="relative flex justify-center">
          <div className="absolute inset-0 bg-orange-200 blur-3xl rounded-full opacity-30 animate-pulse" />

          <div className="relative bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 transform hover:rotate-3 transition-transform duration-500">
            <Trophy className="text-orange-500 w-20 h-20" strokeWidth={1.5} />
            <div className="absolute -top-2 -right-2 bg-slate-900 text-white p-3 rounded-2xl shadow-lg animate-bounce">
              <Sparkles size={20} />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Hall of <span className="text-orange-500">Fame</span>
          </h1>
          <p className="text-slate-500 font-medium leading-relaxed px-4">
            We're building a space to celebrate your victories. Your stats,
            medals, and club milestones will appear here soon.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="w-2/3 h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full animate-progress-flow" />
          </div>
          <span className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
            Construction 70% Complete
          </span>
        </div>
        <div className="pt-4">
          <Button
            className="bg-slate-900 text-white px-8 py-6 rounded-2xl font-bold shadow-xl hover:bg-slate-800 transition-all flex items-center gap-2 mx-auto"
            onPress={() => window.history.back()}
          >
            <ChevronLeft size={18} />
            Back to Profile
          </Button>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes progress-flow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-progress-flow {
          animation: progress-flow 2s infinite linear;
        }
      `,
        }}
      />
    </div>
  );
}
