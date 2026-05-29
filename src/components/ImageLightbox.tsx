import { useEffect, useState, useCallback, useRef } from "react";
import { X } from "lucide-react";

const SKIP_SELECTOR = "[data-no-lightbox]";

const ImageLightbox = () => {
  const [src, setSrc] = useState<string | null>(null);
  const [alt, setAlt] = useState<string>("");
  const [scale, setScale] = useState(1);
  const [visible, setVisible] = useState(false);
  const touchStartDist = useRef<number | null>(null);
  const startScale = useRef(1);

  const open = useCallback((s: string, a: string) => {
    setSrc(s);
    setAlt(a);
    setScale(1);
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    setTimeout(() => setSrc(null), 200);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const img = target.closest("img") as HTMLImageElement | null;
      if (!img) return;
      if (img.closest(SKIP_SELECTOR)) return;
      // ignore tiny icons / decorative
      if (img.naturalWidth && img.naturalWidth < 80) return;
      e.preventDefault();
      e.stopPropagation();
      open(img.currentSrc || img.src, img.alt || "");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [open]);

  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [src, close]);

  if (!src) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={close}
      onWheel={(e) => {
        e.preventDefault();
        setScale((s) => Math.min(5, Math.max(1, s + (e.deltaY < 0 ? 0.15 : -0.15))));
      }}
      onTouchStart={(e) => {
        if (e.touches.length === 2) {
          const dx = e.touches[0].clientX - e.touches[1].clientX;
          const dy = e.touches[0].clientY - e.touches[1].clientY;
          touchStartDist.current = Math.hypot(dx, dy);
          startScale.current = scale;
        }
      }}
      onTouchMove={(e) => {
        if (e.touches.length === 2 && touchStartDist.current) {
          const dx = e.touches[0].clientX - e.touches[1].clientX;
          const dy = e.touches[0].clientY - e.touches[1].clientY;
          const d = Math.hypot(dx, dy);
          const next = startScale.current * (d / touchStartDist.current);
          setScale(Math.min(5, Math.max(1, next)));
        }
      }}
      onTouchEnd={() => { touchStartDist.current = null; }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.92)",
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.2s ease",
        cursor: "zoom-out",
        overflow: "hidden",
        touchAction: "none",
      }}
    >
      <button
        type="button"
        aria-label="إغلاق"
        onClick={(e) => { e.stopPropagation(); close(); }}
        style={{
          position: "absolute",
          top: 16,
          right: 20,
          background: "transparent",
          border: "none",
          color: "#ffffff",
          fontSize: 32,
          cursor: "pointer",
          zIndex: 2,
          lineHeight: 1,
          padding: 8,
        }}
      >
        <X size={32} />
      </button>
      <img
        src={src}
        alt={alt}
        data-no-lightbox
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "90vw",
          maxHeight: "90vh",
          objectFit: "contain",
          transform: `scale(${visible ? scale : 0.9})`,
          transition: touchStartDist.current ? "none" : "transform 0.25s ease",
          cursor: scale > 1 ? "zoom-out" : "zoom-in",
          userSelect: "none",
        }}
      />
    </div>
  );
};

export default ImageLightbox;
