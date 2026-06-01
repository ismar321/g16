import { useState, ImgHTMLAttributes } from "react";

type AssetJson = { url: string };

interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "sizes"> {
  src800: AssetJson | string;
  src1600?: AssetJson | string;
  sizes?: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
}

const url = (s: AssetJson | string) => (typeof s === "string" ? s : s.url);

const LazyImage = ({
  src800,
  src1600,
  sizes = "(max-width: 768px) 100vw, 50vw",
  alt,
  className = "",
  wrapperClassName = "",
  ...rest
}: Props) => {
  const [loaded, setLoaded] = useState(false);
  const u800 = url(src800);
  const u1600 = src1600 ? url(src1600) : u800;
  const srcSet = `${u800} 800w, ${u1600} 1600w`;

  return (
    <div className={`relative ${!loaded ? "bg-gray-900 animate-pulse" : ""} ${wrapperClassName}`}>
      <img
        src={u1600}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={className}
        style={{ contentVisibility: "auto", ...((rest as any).style || {}) }}
        {...rest}
      />
    </div>
  );
};

export default LazyImage;
