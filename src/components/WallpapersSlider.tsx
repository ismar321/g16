import { useEffect, useState } from "react";
import wp1 from "@/assets/wp_tokyo.jpg.asset.json";
import wp2 from "@/assets/wp_shock.jpg.asset.json";
import wp3 from "@/assets/wp_anime.jpg.asset.json";
import wp4 from "@/assets/wp_skull.jpg.asset.json";

const images = [wp1.url, wp2.url, wp3.url, wp4.url];

const WallpapersSlider = () => {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % images.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="max-w-md mx-auto">
      <div
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-card"
        style={{ aspectRatio: "9 / 19" }}
      >
        {images.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt={`Wallpaper ${idx + 1}`}
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

export default WallpapersSlider;
