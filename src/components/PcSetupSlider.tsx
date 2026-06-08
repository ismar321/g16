import { useEffect, useState } from "react";
import s1 from "@/assets/pc_setup_1.png.asset.json";
import s2 from "@/assets/pc_setup_2.png.asset.json";
import s3 from "@/assets/pc_setup_3.png.asset.json";
import s4 from "@/assets/pc_setup_4.png.asset.json";

const images = [s1.url, s2.url, s3.url, s4.url];

const PcSetupSlider = () => {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % images.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-card"
        style={{ aspectRatio: "1 / 1" }}
      >
        {images.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt={`PC Setup ${idx + 1}`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
            style={{ opacity: i === idx ? 1 : 0 }}
          />
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 mt-4">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`صورة ${idx + 1}`}
            onClick={() => setI(idx)}
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

export default PcSetupSlider;
