export default function Members() {
  const memberData = [
    {
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
      name: "A.K. Singh",
      position: "President",
    },
    {
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
      name: "Rakesh Ranjan",
      position: "Secretary General",
    },
    {
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
      name: "Santosh Kumar",
      position: "Treasurer",
    },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-orange-600 font-bold tracking-widest uppercase text-sm">
            Leadership
          </span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mt-2 text-zinc-900">
            The Executive Board
          </h2>
          <div className="h-1.5 w-16 bg-orange-500 mt-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {memberData.map((data, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-3xl border border-zinc-100 bg-zinc-50 p-8 transition-all hover:shadow-2xl hover:border-orange-200"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-orange-500 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform"></div>
                  <img
                    src={data.image || "https://via.placeholder.com/150"}
                    alt={data.name}
                    className="relative w-32 h-32 object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all border-2 border-white shadow-lg"
                  />
                </div>
                <h3 className="text-2xl font-black text-zinc-900 uppercase tracking-tight">
                  {data.name}
                </h3>
                <p className="text-orange-600 font-bold text-sm uppercase tracking-widest mt-1">
                  {data.position}
                </p>

                <div className="mt-6 h-1 w-8 bg-zinc-300 group-hover:w-16 group-hover:bg-orange-500 transition-all"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
