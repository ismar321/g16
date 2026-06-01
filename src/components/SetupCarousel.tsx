import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import s1a from "@/assets/setup_1780061439212_800.webp.asset.json";
import s1b from "@/assets/setup_1780061439212_1600.webp.asset.json";
import s2a from "@/assets/setup_1780061447175_800.webp.asset.json";
import s2b from "@/assets/setup_1780061447175_1600.webp.asset.json";
import s3a from "@/assets/setup_1780061452666_800.webp.asset.json";
import s3b from "@/assets/setup_1780061452666_1600.webp.asset.json";
import s4a from "@/assets/setup_1780061463989_800.webp.asset.json";
import s4b from "@/assets/setup_1780061463989_1600.webp.asset.json";
import s5a from "@/assets/setup_1780061467526_800.webp.asset.json";
import s5b from "@/assets/setup_1780061467526_1600.webp.asset.json";
import s6a from "@/assets/setup_1780061473541_800.webp.asset.json";
import s6b from "@/assets/setup_1780061473541_1600.webp.asset.json";

const images = [
  { s: s1a.url, l: s1b.url },
  { s: s2a.url, l: s2b.url },
  { s: s3a.url, l: s3b.url },
  { s: s4a.url, l: s4b.url },
  { s: s5a.url, l: s5b.url },
  { s: s6a.url, l: s6b.url },
];

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
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-gray-900 animate-pulse shadow-card"
        style={{ aspectRatio: "1 / 1" }}
      >
        {images.map((img, idx) => (
          <img
            key={img.l}
            src={img.l}
            srcSet={`${img.s} 800w, ${img.l} 1600w`}
            sizes="(max-width: 768px) 100vw, 800px"
            alt={`Setup ${idx + 1}`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover cursor-zoom-in transition-opacity duration-700"
            style={{ opacity: i === idx ? 1 : 0, contentVisibility: "auto" }}
          />
        ))}

        <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur text-white text-xs font-bold border border-white/15 flex items-center gap-1.5 z-10">
          <ZoomIn className="w-3.5 h-3.5" />
          {i + 1} / {images.length}
        </div>

        <button
          type="button"
          aria-label="السابق"
          onClick={(e) => { e.stopPropagation(); go(i - 1); }}
          className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-3 w-10 h-10 rounded-full bg-black/55 hover:bg-black/75 text-white flex items-center justify-center border border-white/15 backdrop-blur transition z-10"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <button
          type="button"
          aria-label="التالي"
          onClick={(e) => { e.stopPropagation(); go(i + 1); }}
          className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-3 w-10 h-10 rounded-full bg-black/55 hover:bg-black/75 text-white flex items-center justify-center border border-white/15 backdrop-blur transition z-10"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

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
