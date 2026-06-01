import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import img1 from "@/assets/setup_1780061439212.png.asset.json";
import img2 from "@/assets/setup_1780061447175.png.asset.json";
import img3 from "@/assets/setup_1780061452666.png.asset.json";
import img4 from "@/assets/setup_1780061463989.png.asset.json";
import img5 from "@/assets/setup_1780061467526.png.asset.json";
import img6 from "@/assets/setup_1780061473541.png.asset.json";

const images = [img1.url, img2.url, img3.url, img4.url, img5.url, img6.url];

const SetupCarousel = () => {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((p) => (p + 1) % images.length), 3500);
    return () => clearInterval(t);
  }, [paused]);

  const go = (n: number) => setI((n + images.length) % images.length);

  return (
    <div
      className="relative max-w-4xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-card"
        style={{ aspectRatio: "1 / 1" }}
      >
        {images.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt={`Setup ${idx + 1}`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover cursor-zoom-in transition-opacity duration-700"
            style={{ opacity: i === idx ? 1 : 0 }}
          />
        ))}

        {/* Counter */}
        <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur text-white text-xs font-bold border border-white/15 flex items-center gap-1.5">
          <ZoomIn className="w-3.5 h-3.5" />
          {i + 1} / {images.length}
        </div>

        {/* Arrows */}
        <button
          type="button"
          aria-label="السابق"
          onClick={(e) => { e.stopPropagation(); go(i - 1); }}
          className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-3 w-10 h-10 rounded-full bg-black/55 hover:bg-black/75 text-white flex items-center justify-center border border-white/15 backdrop-blur transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <button
          type="button"
          aria-label="التالي"
          onClick={(e) => { e.stopPropagation(); go(i + 1); }}
          className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-3 w-10 h-10 rounded-full bg-black/55 hover:bg-black/75 text-white flex items-center justify-center border border-white/15 backdrop-blur transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`صورة ${idx + 1}`}
            onClick={() => go(idx)}
            className="h-2 rounded-full transition-all"
            style={{
              width: i === idx ? 28 : 8,
              background: i === idx ? "linear-gradient(90deg,#00c8ff,#8b5cf6)" : "rgba(255,255,255,0.25)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SetupCarousel;
