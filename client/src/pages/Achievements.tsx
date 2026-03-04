import { Trophy, ChevronLeft, Sparkles } from "lucide-react";
import { Button } from "@heroui/button";

export default function Achievements() {
  return (
    <div className="min-h-screen md:min-h-[80vh] flex items-center justify-center p-4 md:p-6 bg-white sm:bg-transparent">
      <div className="max-w-md w-full text-center space-y-6 md:space-y-8">
        <div className="relative flex justify-center">
          <div className="absolute inset-0 bg-orange-200 blur-2xl md:blur-3xl rounded-full opacity-30 animate-pulse" />

          <div className="relative bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-xl md:shadow-2xl border border-slate-100 transform hover:rotate-3 transition-transform duration-500">
            <Trophy
              className="text-orange-500 w-16 h-16 md:w-20 md:h-20"
              strokeWidth={1.5}
            />
            <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-slate-900 text-white p-2 md:p-3 rounded-xl md:rounded-2xl shadow-lg animate-bounce">
              <Sparkles size={16} className="md:w-5 md:h-5" />
            </div>
          </div>
        </div>

        <div className="space-y-2 md:space-y-3">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Hall of <span className="text-orange-500">Fame</span>
          </h1>
          <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed px-2 md:px-4">
            We're building a space to celebrate your victories. Your stats,
            medals, and club milestones will appear here soon.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 md:gap-4">
          <div className="w-40 md:w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="w-2/3 h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full animate-progress-flow" />
          </div>
          <span className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.15em] md:tracking-[0.2em]">
            Construction 70% Complete
          </span>
        </div>

        <div className="pt-2 md:pt-4">
          <Button
            className="w-full sm:w-auto bg-slate-900 text-white px-6 md:px-8 py-5 md:py-6 rounded-xl md:rounded-2xl font-bold shadow-lg md:shadow-xl hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center gap-2 mx-auto"
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
          0% { transform: translateX(-150%); }
          100% { transform: translateX(150%); }
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
