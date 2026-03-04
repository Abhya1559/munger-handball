export default function News() {
  const newsItems = [
    {
      date: "March 10, 2026",
      category: "Trials",
      title: "District Championship Selection",
      desc: "Open trials for the upcoming Bihar State Championship start this Monday at the Munger Sports Complex.",
    },
    {
      date: "Feb 28, 2026",
      category: "Coaching",
      title: "Welcome Coach Anand Singh",
      desc: "We are proud to welcome National-level coach Anand Singh to lead our elite player development program.",
    },
    {
      date: "Feb 15, 2026",
      category: "Tournament",
      title: "U-17 Victory in Regional Finals",
      desc: "Our Munger Tigers secured a hard-fought 1st place victory in the zonal handball tournament last night.",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 selection:bg-orange-100 selection:text-orange-900">
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-orange-600 font-bold tracking-[0.2em] uppercase text-sm">
              Update Center
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mt-2">
              Latest News
            </h2>
          </div>
          <div className="h-[2px] flex-grow bg-zinc-200 mb-4 mx-8 hidden md:block"></div>
          <p className="text-zinc-500 font-medium italic">
            Fueling the passion for Munger Sports
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {newsItems.map((item, i) => (
            <div
              key={i}
              className="group flex flex-col bg-white p-8 rounded-[2rem] border border-zinc-200 hover:border-orange-500 transition-all duration-300 hover:shadow-2xl"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tight">
                  {item.category}
                </span>
                <span className="text-zinc-400 font-medium text-sm">
                  {item.date}
                </span>
              </div>

              <h4 className="text-2xl font-bold mb-4 group-hover:text-orange-600 transition-colors leading-tight">
                {item.title}
              </h4>
              <p className="text-zinc-600 leading-relaxed mb-8 flex-grow">
                {item.desc}
              </p>

              <button className="flex items-center gap-2 text-zinc-900 font-black text-xs uppercase tracking-widest hover:text-orange-600 transition-colors">
                View Details <span className="text-orange-500">→</span>
              </button>
            </div>
          ))}
        </div>
      </section>{" "}
      {/* Subtle ending spacer */}
      <div className="h-24 bg-zinc-50"></div>
    </div>
  );
}
