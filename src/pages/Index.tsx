import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { wilayas } from "@/data/algeria";
import themePreview800 from "@/assets/theme_preview_800.webp.asset.json";
import themePreview1600 from "@/assets/theme_preview_1600.webp.asset.json";
import themesGallery800 from "@/assets/themes_gallery_800.webp.asset.json";
import themesGallery1600 from "@/assets/themes_gallery_1600.webp.asset.json";
import themePreviewV2_800 from "@/assets/theme_preview_v2_800.webp.asset.json";
import themePreviewV2_1600 from "@/assets/theme_preview_v2_1600.webp.asset.json";
import themesLandscape800 from "@/assets/themes_landscape_800.webp.asset.json";
import themesLandscape1600 from "@/assets/themes_landscape_1600.webp.asset.json";
import themesPortrait800 from "@/assets/themes_portrait_800.webp.asset.json";
import themesPortrait1600 from "@/assets/themes_portrait_1600.webp.asset.json";
import themesGta800 from "@/assets/themes_gta_800.webp.asset.json";
import themesGta1600 from "@/assets/themes_gta_1600.webp.asset.json";
import themesQwq800 from "@/assets/themes_qwq_800.webp.asset.json";
import themesQwq1600 from "@/assets/themes_qwq_1600.webp.asset.json";
import themesQwq3_800 from "@/assets/themes_qwq3_800.webp.asset.json";
import themesQwq3_1600 from "@/assets/themes_qwq3_1600.webp.asset.json";
import heroBuild1_800 from "@/assets/hero_build_1_800.webp.asset.json";
import heroBuild1_1600 from "@/assets/hero_build_1_1600.webp.asset.json";
import heroBuild2_800 from "@/assets/hero_build_2_800.webp.asset.json";
import heroBuild2_1600 from "@/assets/hero_build_2_1600.webp.asset.json";
import dimSize800 from "@/assets/dim_size_800.webp.asset.json";
import dimSize1600 from "@/assets/dim_size_1600.webp.asset.json";
import dimBack800 from "@/assets/dim_back_800.webp.asset.json";
import dimBack1600 from "@/assets/dim_back_1600.webp.asset.json";
import dimBox800 from "@/assets/dim_box_800.webp.asset.json";
import dimBox1600 from "@/assets/dim_box_1600.webp.asset.json";
import SetupCarousel from "@/components/SetupCarousel";
import LazyImage from "@/components/LazyImage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader as Loader2, Play, Shield, Sparkles, Check, Truck, Cpu, ArrowLeft, CreditCard, ShieldCheck, Ruler, Wrench, Monitor } from "lucide-react";

const DOWNLOAD_URL = "https://www.swisstransfer.com/d/11894fd0-2360-4b07-86a3-a71ffc1b4ced";

const scrollToOrder = () => {
  document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
};

const DownloadButton = ({ className = "" }: { className?: string }) => (
  <a
    href={DOWNLOAD_URL}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary/60 text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300 font-bold ${className}`}
    style={{ minWidth: 260, padding: "16px 28px", fontSize: 16, background: "rgba(0,200,255,0.04)" }}
  >
    حمل البرنامج والخلفيات ⬇️
  </a>
);

const CTAButton = ({
  children = "🛒 اطلب الآن ←",
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <Button
    onClick={scrollToOrder}
    size="lg"
    style={{ minWidth: 260, padding: "18px 40px", fontSize: 20, fontWeight: 800 }}
    className={`cta-pulse bg-gradient-primary text-primary-foreground hover:opacity-95 hover:scale-105 transition-all duration-300 rounded-xl w-full sm:w-auto shadow-blue ${className}`}
  >
    {children}
    <ArrowLeft className="w-5 h-5 mr-2" />
  </Button>
);

const CTAGroup = () => (
  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
    <CTAButton />
    <DownloadButton />
  </div>
);

// Generic image placeholder block (dark with subtle gradient + label)
const ImagePlaceholder = ({
  label,
  aspect = "aspect-[4/3]",
  icon,
}: {
  label: string;
  aspect?: string;
  icon?: React.ReactNode;
}) => (
  <div
    className={`w-full ${aspect} rounded-2xl border border-white/10 flex flex-col items-center justify-center gap-3 text-center px-4`}
    style={{
      background:
        "linear-gradient(135deg, rgba(0,200,255,0.08), rgba(139,92,246,0.08)), #0d1528",
    }}
  >
    {icon ?? <Monitor className="w-10 h-10 text-primary/70" />}
    <span className="text-sm font-semibold text-foreground/70">{label}</span>
  </div>
);

type ColorOpt = "White" | "Black" | "ARGB";
type DeliveryOpt = "office" | "home";

const Index = () => {
  const navigate = useNavigate();
  const [wilayaCode, setWilayaCode] = useState<string>("");
  const [commune, setCommune] = useState<string>("");
  const [color, setColor] = useState<ColorOpt>("ARGB");
  const [delivery, setDelivery] = useState<DeliveryOpt | null>(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState<string>("");
  const [address, setAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [stock, setStock] = useState<Record<ColorOpt, boolean>>({ White: true, Black: true, ARGB: true });

  useEffect(() => {
    fetch(
      "https://script.google.com/macros/s/AKfycbz2obxhDROav--g05sz_RewTRRQZe6br9GfokwIpfDC3Pmc0NV2mNXjORjJhwbMiG2ifw/exec?action=getStock",
      { mode: "cors" },
    )
      .then((r) => r.json())
      .then((data) => {
        if (data && typeof data === "object") {
          setStock({
            White: data.White !== false,
            Black: data.Black !== false,
            ARGB: data.ARGB !== false,
          });
        }
      })
      .catch(() => {
        // Fallback: try no-cors (response opaque, keeps defaults)
        fetch(
          "https://script.google.com/macros/s/AKfycbz2obxhDROav--g05sz_RewTRRQZe6br9GfokwIpfDC3Pmc0NV2mNXjORjJhwbMiG2ifw/exec?action=getStock",
          { mode: "no-cors" },
        ).catch(() => {});
      });
  }, []);

  const communes = useMemo(
    () => wilayas.find((w) => w.code === wilayaCode)?.communes ?? [],
    [wilayaCode],
  );

  const productPrice = color === "ARGB" ? 12800 : 13200;
  const deliveryPrice = delivery ? (delivery === "home" ? 700 : 400) : null;
  const totalPrice = deliveryPrice !== null ? productPrice + deliveryPrice : null;


  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container flex items-center justify-between py-3 sm:py-4 px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-primary flex items-center justify-center shadow-blue">
              <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
            </div>
            <span className="font-black text-base sm:text-lg text-foreground">AK Tech Vault</span>
          </div>
          <Button onClick={scrollToOrder} size="sm" className="bg-gradient-primary text-primary-foreground rounded-lg font-bold text-xs sm:text-sm hover:opacity-90 transition-all">
            اطلب الآن
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero py-8 sm:py-12 md:py-16">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-0 -left-32 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 -right-32 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />

        <div className="container relative px-4">
          {/* Headline */}
          <div className="max-w-3xl mx-auto space-y-6 text-center fade-in mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/10 backdrop-blur border border-primary/30 shadow-card mx-auto">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-foreground">🖥️ الأكثر طلباً · إصدار</span>
            </div>

            <h1
              className="leading-tight font-black text-foreground text-glow"
              style={{ fontSize: "clamp(28px, 6vw, 56px)" }}
            >
              انفرد بـ Setup تاعك
              <br />
              <span className="text-gradient">وخليه يبان Premium 🔥</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-foreground/90 font-semibold leading-relaxed">
              شاشة ثانوية IPS LCD بحجم <span className="text-gradient font-bold">9.16 بوصة</span> بخامات معدن CNC عالية الجودة
              <br />
              تعرض معلومات CPU / GPU / RAM والحرارة بشكل أنيق — أداء سلس بدون أي لاق ⚡
            </p>
          </div>

          {/* Product video */}
          <div className="mx-auto max-w-2xl mb-6 sm:mb-8">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full aspect-video rounded-2xl border border-white/10 shadow-card video-glow object-cover"
            >
              <source src="https://mediag16.aktechvault.com/g16.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Real build showcase — موضوعة بعد العنوان والفيديو مباشرة */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto mb-8 sm:mb-10">
            {[
              { s: heroBuild1_800, l: heroBuild1_1600, alt: "Setup حقيقي 1" },
              { s: heroBuild2_800, l: heroBuild2_1600, alt: "Setup حقيقي 2" },
            ].map((it) => (
              <div key={it.alt} className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-card hover:shadow-glow hover:border-primary/40 transition-all duration-500">
                <LazyImage
                  src800={it.s}
                  src1600={it.l}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  alt={it.alt}
                  className="w-full h-auto object-contain cursor-zoom-in"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center mb-12 sm:mb-16">
            <CTAGroup />
          </div>


          {/* Feature Cards 2x2 */}
          <div className="max-w-3xl mx-auto space-y-6 text-center">


            <div className="flex flex-col items-center gap-4 pt-4">

              <div
                style={{
                  background: "linear-gradient(135deg, rgba(0,200,255,0.08), rgba(139,92,246,0.08))",
                  border: "1px solid rgba(0,200,255,0.25)",
                  borderRadius: 20,
                  padding: "28px 32px",
                  textAlign: "center",
                  maxWidth: 480,
                  margin: "0 auto",
                  width: "100%",
                }}
              >
                <div className="ali-amazon-pulse" style={{ fontSize: 16, color: "#fbbf24", marginBottom: 16, fontWeight: 700, lineHeight: 1.6, padding: "12px 14px", background: "rgba(251,191,36,0.10)", border: "1px solid rgba(251,191,36,0.35)", borderRadius: 12 }}>
                  السعر في المواقع العالمية
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, margin: "0 6px", verticalAlign: "middle" }}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/72/AliExpress_logo.svg" alt="AliExpress" loading="lazy" decoding="async" style={{ height: 16, width: "auto", background: "#fff", padding: "2px 4px", borderRadius: 4 }} />
                    <span>AliExpress</span>
                  </span>
                  /
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, margin: "0 6px", verticalAlign: "middle" }}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" loading="lazy" decoding="async" style={{ height: 14, width: "auto", background: "#fff", padding: "2px 4px", borderRadius: 4 }} />
                    <span>Amazon</span>
                  </span>
                  يبدأ من <span style={{ fontSize: 22, fontWeight: 900, color: "#fcd34d" }}>55 USD</span>
                </div>
                <div style={{ fontSize: 16, color: "#cbd5e1", marginBottom: 6, fontWeight: 600 }}>
                  السعر عندنا يبدأ من
                </div>
                <div
                  style={{
                    fontSize: 60,
                    fontWeight: 900,
                    color: "#10b981",
                    lineHeight: 1.05,
                    textShadow: "0 0 30px rgba(16,185,129,0.5)",
                  }}
                >
                  12,800 دج
                </div>
                <div style={{ fontSize: 13, color: "#10b981", marginTop: 10, fontWeight: 600 }}>
                  الدفع عند الاستلام ✓
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full" style={{ marginTop: 16 }}>
                <button
                  type="button"
                  onClick={scrollToOrder}
                  className="cta-pulse w-full sm:w-auto"
                  style={{
                    background: "linear-gradient(135deg, #00c8ff, #7c3aed)",
                    color: "white",
                    fontSize: 22,
                    fontWeight: 800,
                    padding: "20px 60px",
                    borderRadius: 50,
                    border: "none",
                    boxShadow: "0 8px 32px rgba(0,200,255,0.4)",
                    cursor: "pointer",
                  }}
                >
                  🛒 اطلب الآن ←
                </button>
                <DownloadButton />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 justify-center text-xs sm:text-sm text-foreground/70 pt-2">
              <span className="flex items-center gap-1"><Truck className="w-4 h-4 text-primary" /> توصيل لكامل الولايات</span>
              <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-primary" /> دفع عند الاستلام</span>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSFORMATION */}
      <section className="py-14 sm:py-20 relative overflow-hidden bg-transparent">
        <div className="absolute inset-0 grid-bg opacity-15" />
        <div className="container relative max-w-7xl px-4">
          <div className="text-center mb-10 sm:mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/8 text-primary font-bold text-sm border border-primary/20">
              <Sparkles className="w-4 h-4" /> 🚀 التحول
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black leading-tight">
              كيفاش راح <span className="text-gradient">تولي السيتاب تاعك</span>
            </h2>
            <p className="text-foreground/75 text-base sm:text-lg max-w-2xl mx-auto">
              مجرد ما تضيف الشاشة — كل شيء يتغير
            </p>
          </div>

          {/* Setup gallery — مباشرة بعد العنوان */}
          <div className="mb-10 sm:mb-14">
            <SetupCarousel />
          </div>


          <div className="text-center pt-10 sm:pt-12">
            <CTAButton />
          </div>
        </div>
      </section>

      {/* CUSTOMIZATION */}
      <section className="py-16 sm:py-24 relative overflow-hidden bg-transparent">
        <div className="absolute inset-0 grid-bg opacity-15" />
        <div className="absolute top-1/4 right-1/3 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="container relative max-w-6xl px-4">
          <div className="text-center mb-12 sm:mb-14 space-y-5">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur text-foreground border border-white/15 shadow-card">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-black tracking-wide text-foreground">✨ تخصيص كامل</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black leading-tight">
              تحكم كامل في <span className="text-gradient">الثيمات والخلفيات</span>
            </h2>
            <p className="text-foreground/70 text-base sm:text-lg max-w-3xl mx-auto leading-loose">
              اختر المعطيات اللي تحب تعرضها: حرارة، أداء، وقت، وأكثر
              <br className="hidden sm:block" />
              خصص الثيمات والخلفيات بسهولة تامة لتطابق Setup تاعك بالضبط
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-card hover:shadow-glow hover:border-primary/40 transition-all duration-500">
              <LazyImage
                src800={themesQwq800}
                src1600={themesQwq1600}
                alt="واجهة Theme Preview - معاينة وإدارة الثيمات والخلفيات"
                className="w-full h-auto object-contain cursor-zoom-in"
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 pt-10 sm:pt-12">
            <CTAButton />
          </div>
        </div>
      </section>

      {/* DIMENSIONS */}
      <section className="py-14 sm:py-20 bg-transparent">
        <div className="container max-w-6xl px-4">
          <div className="text-center mb-10 sm:mb-12 space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black">
              الأبعاد و <span className="text-gradient">طريقة التركيب</span>
            </h2>
          </div>

          {/* Images — مباشرة بعد العنوان */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto mb-10 sm:mb-12">
            {[
              { s: dimSize800, l: dimSize1600, label: "📐 الأبعاد: 253 × 68 × 13 مم" },
              { s: dimBack800, l: dimBack1600, label: "🔩 ظهر معدني بفتحات تثبيت متعددة" },
              { s: dimBox800, l: dimBox1600, label: "📦 محتويات العلبة: شاشة + كابلات + حوامل" },
            ].map((it) => (
              <div key={it.label} className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-card hover:shadow-glow hover:border-primary/40 transition-all duration-500">
                <LazyImage
                  src800={it.s}
                  src1600={it.l}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  alt={it.label}
                  className="w-full h-56 sm:h-64 object-cover cursor-zoom-in"
                />
                <div className="p-3 sm:p-4 text-center text-foreground/80 text-sm font-bold">{it.label}</div>
              </div>
            ))}
          </div>


          {/* Easy mounting options */}
          <div className="max-w-4xl mx-auto mt-8 sm:mt-10">
            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-black text-foreground">🔩 تركيب سهل</h3>
              <p className="text-foreground/70 text-sm sm:text-base mt-2">بدون أدوات خاصة | plug & play في دقائق</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {[
                {
                  emoji: "🧲",
                  title: "تركيب بالمغناطيس القوي",
                  desc: "مغناطيس قوي جداً يثبت الشاشة بثبات تام على جدار الكيس أو المرواح — بدون حاجة لأي أدوات أو ثقب",
                },
                {
                  emoji: "🔩",
                  title: "تركيب بالبراغي فوق المرواح",
                  desc: "فتحات تثبيت متعددة تسمح لك بتركيب الشاشة بالبراغي فوق المرواح أو على أي سطح مسطح للثبات الأقصى",
                },
              ].map((opt) => (
                <Card
                  key={opt.title}
                  className="p-5 sm:p-6 bg-white/5 backdrop-blur border border-white/10 shadow-card hover:shadow-glow hover:border-primary/40 transition-all duration-500"
                  style={{ borderRadius: 20 }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex items-center justify-center shrink-0"
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 14,
                        background: "rgba(0,200,255,0.1)",
                        fontSize: 28,
                      }}
                    >
                      {opt.emoji}
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-white mb-1">{opt.title}</h4>
                      <p className="text-foreground/70 text-sm leading-relaxed">{opt.desc}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>



          <div className="text-center mt-10 sm:mt-12">
            <CTAButton />
          </div>
        </div>
      </section>

      {/* ORDER FORM */}
      <section id="order" className="py-14 sm:py-20 relative overflow-hidden bg-transparent">
        <div className="absolute inset-0 grid-bg opacity-15" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-80 bg-primary/6 blur-3xl rounded-full" />
        <div className="container relative max-w-2xl px-4">
          <Card className="p-6 sm:p-8 md:p-10 bg-[#0f172a]/80 backdrop-blur border border-white/10 text-center" style={{ borderRadius: 20, boxShadow: "0 20px 50px rgba(0,0,0,0.35)" }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-primary text-white font-bold text-sm mb-5 sm:mb-6 shadow-blue">
              <Sparkles className="w-4 h-4" /> 🔥 عرض خاص
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 font-black text-white">احصل عليها الآن</h2>

            {/* Dynamic price breakdown */}
            <div className="mb-6 space-y-2">
              <div
                className="rounded-xl px-4 py-3 flex items-center justify-between"
                style={{
                  background: "linear-gradient(135deg, rgba(0,200,255,0.10), rgba(139,92,246,0.10))",
                  border: "1px solid rgba(0,200,255,0.3)",
                }}
              >
                <span className="text-sm sm:text-base font-bold text-slate-200">سعر المنتج</span>
                <span className="text-xl sm:text-2xl font-black text-[#00c8ff]" style={{ textShadow: "0 0 18px rgba(0,200,255,0.5)" }}>
                  {productPrice.toLocaleString()} دج
                </span>
              </div>
              {deliveryPrice !== null && (
                <div className="rounded-xl px-4 py-3 flex items-center justify-between bg-white/5 border border-white/10">
                  <span className="text-sm sm:text-base font-semibold text-slate-300">التوصيل</span>
                  <span className="text-lg sm:text-xl font-extrabold text-white">+{deliveryPrice.toLocaleString()} دج</span>
                </div>
              )}
              {totalPrice !== null && (
                <>
                  <div className="my-3 h-px bg-white/10" />
                  <div className="text-xs sm:text-sm text-slate-400 font-bold">المجموع الكلي</div>
                  <div className="text-5xl sm:text-6xl font-black text-gradient leading-tight">
                    {totalPrice.toLocaleString()} دج
                  </div>
                </>
              )}
              <div className="text-sm font-semibold text-emerald-400 pt-1">الدفع عند الاستلام ✓</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 sm:mb-8">
              {[
                { icon: CreditCard, t: "دفع عند الاستلام" },
                { icon: Truck, t: "توصيل لكل الجزائر" },
                { icon: ShieldCheck, t: "ضمان الجودة" },
              ].map(({ icon: Icon, t }) => (
                <div
                  key={t}
                  className="flex items-center justify-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                >
                  <Icon className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold text-white">{t}</span>
                </div>
              ))}
            </div>

            <form
              className="space-y-3 sm:space-y-4 text-right"
              onSubmit={async (e) => {
                e.preventDefault();
                if (!wilayaCode || !commune || !fullName || !phone || !delivery || submitting) return;

                setSubmitting(true);
                const wilayaName = wilayas.find((w) => w.code === wilayaCode)?.name ?? "";
                const orderData = {
                  name: fullName,
                  phone: phone,
                  state: `${wilayaCode} - ${wilayaName}`,
                  city: `${commune} - ${address}`,
                  version: color,
                  delivery_type:
                    delivery === "home"
                      ? "توصيل لباب الدار — 700 دج"
                      : "توصيل للمكتب — 400 دج",
                  total_price: totalPrice,
                };

                fetch(
                  "https://script.google.com/macros/s/AKfycbz2obxhDROav--g05sz_RewTRRQZe6br9GfokwIpfDC3Pmc0NV2mNXjORjJhwbMiG2ifw/exec",
                  {
                    method: "POST",
                    mode: "no-cors",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(orderData),
                  },
                ).catch(() => {});

                navigate("/thank-you");
              }}
            >
              <div className="text-xs text-right mb-3" style={{ color: "#94a3b8" }}>
                <span className="font-bold" style={{ color: "#ef4444" }}>*</span> الحقول المطلوبة
              </div>

              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <input
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="الاسم الكامل"
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-lg text-right font-medium"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#ffffff",
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#00c8ff"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                />
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="رقم الهاتف"
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-lg text-right font-medium"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#ffffff",
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#00c8ff"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <Select
                  value={wilayaCode}
                  onValueChange={(v) => {
                    setWilayaCode(v);
                    setCommune("");
                  }}
                  required
                >
                  <SelectTrigger
                    className="h-auto px-4 sm:px-5 py-3 sm:py-4 rounded-lg text-right font-medium"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", color: "#ffffff" }}
                  >
                    <SelectValue placeholder="اختر الولاية" />
                  </SelectTrigger>
                  <SelectContent className="max-h-72" style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.15)" }}>
                    {wilayas.map((w) => (
                      <SelectItem key={w.code} value={w.code} className="text-right" style={{ color: "#ffffff" }}>
                        {w.code} - {w.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={commune}
                  onValueChange={setCommune}
                  disabled={!wilayaCode}
                  required
                >
                  <SelectTrigger
                    className="h-auto px-4 sm:px-5 py-3 sm:py-4 rounded-lg text-right font-medium disabled:opacity-50"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", color: "#ffffff" }}
                  >
                    <SelectValue placeholder={wilayaCode ? "اختر البلدية" : "اختر الولاية أولاً"} />
                  </SelectTrigger>
                  <SelectContent className="max-h-72" style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.15)" }}>
                    {communes.map((c) => (
                      <SelectItem key={c} value={c} className="text-right" style={{ color: "#ffffff" }}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="العنوان بالتفصيل (اختياري)"
                className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-lg text-right font-medium"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#ffffff",
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#00c8ff"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
              />

              {/* Version selector */}
              <div className="space-y-2 pt-1">
                <label className="block text-sm font-semibold text-white">🎨 اختر الإصدار</label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {([
                    { value: "White" as ColorOpt, label: "⬜ White", swatchStyle: { background: "#ffffff", borderColor: "#cbd5e1" } },
                    { value: "Black" as ColorOpt, label: "⬛ Black", swatchStyle: { background: "#0a0a0a", borderColor: "#475569" } },
                    { value: "ARGB" as ColorOpt, label: "✨ ARGB", swatchStyle: { background: "linear-gradient(135deg,#a855f7,#22d3ee)", borderColor: "#475569" } },
                  ]).map((opt) => {
                    const active = color === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setColor(opt.value)}
                        className={`flex flex-col items-center justify-center gap-2 px-2 py-3 rounded-lg border-2 transition-all font-semibold text-sm ${
                          active
                            ? "border-primary shadow-blue text-white"
                            : "border-white/20 hover:border-primary/50 text-white"
                        }`}
                        style={{
                          background: active ? "rgba(0,200,255,0.12)" : "rgba(255,255,255,0.05)",
                        }}
                      >
                        <span className="w-6 h-6 rounded-full border-2" style={opt.swatchStyle} />
                        <span>{opt.label}</span>
                        {active && <Check className="w-4 h-4 text-primary" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Delivery type selector */}
              <div className="space-y-2 pt-2">
                <label className="block text-sm font-semibold text-white">🚚 نوع التوصيل</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {([
                    {
                      value: "office" as DeliveryOpt,
                      title: "🏢 توصيل للمكتب — 400 دج",
                      desc: "تستلم من أقرب مكتب للشركة",
                    },
                    {
                      value: "home" as DeliveryOpt,
                      title: "🏠 توصيل لباب الدار — 700 دج",
                      desc: "يوصلك مباشرة لعنوانك",
                    },
                  ]).map((opt) => {
                    const active = delivery === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setDelivery(opt.value)}
                        className={`flex items-start gap-3 text-right px-4 py-3 rounded-lg border-2 transition-all ${
                          active
                            ? "border-primary shadow-blue"
                            : "border-white/20 hover:border-primary/50"
                        }`}
                        style={{
                          background: active ? "rgba(0,200,255,0.12)" : "rgba(255,255,255,0.05)",
                        }}
                      >
                        {active ? (
                          <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        ) : (
                          <span className="w-5 h-5 rounded-full border-2 border-white/30 shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <div className="text-sm font-bold text-white">{opt.title}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{opt.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="w-full bg-gradient-primary text-white hover:opacity-90 shadow-blue text-base sm:text-lg font-black py-5 sm:py-6 rounded-lg transition-all disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    جاري الإرسال...
                  </>
                ) : (
                  <>تأكيد الطلب 🚀</>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-primary/10 bg-card/5 backdrop-blur">
        <div className="container text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-blue">
              <Cpu className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-foreground">AK Tech Vault</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2025 AK Tech Vault · جميع الحقوق محفوظة · صُمم لعشاق Gaming</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
