import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/navbar";
import { Maximize2, X } from "lucide-react";
import img1 from "../assets/gallery/img1.jpg";
import img2 from "../assets/gallery/img2.jpg";
import img3 from "../assets/gallery/img3.jpg";
import img4 from "../assets/gallery/img4.jpg";
import img5 from "../assets/gallery/img5.jpeg";
import img6 from "../assets/gallery/img6.jpg";
import img7 from "../assets/gallery/img7.jpeg";

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImg(null);
    };
    if (selectedImg) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [selectedImg]);

  const images = [
    { src: img1, title: "Championship Finals", category: "Match" },
    { src: img2, title: "Morning Drill", category: "Training" },
    { src: img3, title: "Team Spirit", category: "Club" },
    { src: img4, title: "Fast Break", category: "Match" },
    { src: img5, title: "Goalkeeper Save", category: "Match" },
    { src: img6, title: "Junior Squad", category: "Training" },
    { src: img7, title: "Defense Wall", category: "Match" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <section className="flex-1 py-12 md:py-24 px-4 sm:px-6 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-10 md:mb-16">
            <div className="space-y-2 md:space-y-4 text-center md:text-left">
              <span className="text-orange-500 font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm block">
                Visual Legacy
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
                Moments in <span className="text-orange-500">Action.</span>
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImg(img.src)}
                className="relative group aspect-square overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-slate-200 shadow-md md:shadow-lg cursor-pointer transition-all duration-500 hover:shadow-orange-200/50"
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 md:p-8">
                  <span className="text-orange-500 font-bold uppercase tracking-widest text-[9px] md:text-[10px] mb-1">
                    {img.category}
                  </span>
                  <div className="flex justify-between items-center gap-2">
                    <h3 className="text-white text-lg md:text-xl font-black italic uppercase tracking-tight truncate">
                      {img.title}
                    </h3>
                    <div className="bg-white/20 backdrop-blur-md p-2 rounded-lg md:rounded-xl text-white shrink-0">
                      <Maximize2 size={18} className="md:w-5 md:h-5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImg && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 backdrop-blur-sm p-2 sm:p-4 cursor-zoom-out"
          onClick={() => setSelectedImg(null)}
        >
          <button
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 md:p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-10 active:scale-90"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImg(null);
            }}
          >
            <X size={24} className="md:w-8 md:h-8" />
          </button>

          <img
            src={selectedImg}
            alt="Maximized view"
            className="max-w-full max-h-[85vh] md:max-h-[90vh] rounded-xl md:rounded-2xl shadow-2xl transition-all duration-300 transform scale-100 object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Footer />
    </div>
  );
}
