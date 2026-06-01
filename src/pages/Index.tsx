import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { wilayas } from "@/data/algeria";
import productVideo from "@/assets/g16.mp4.asset.json";
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

const scrollToOrder = () => {
  document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
};

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
  const [address, setAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
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
          <div className="mx-auto max-w-2xl mb-12 sm:mb-16">
            <video
              src={productVideo.url}
              autoPlay
              muted
              loop
              playsInline
              controls
              className="w-full aspect-video rounded-2xl border border-white/10 shadow-card video-glow object-cover"
            />
          </div>


          {/* Feature Cards 2x2 */}
          <div className="max-w-3xl mx-auto space-y-6 text-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto text-right">
              {[
                {
                  icon: "🖥️",
                  title: "إضافة فعلية للـ Setup تاعك",
                  text: "مش مجرد إكسسوار — شاشة حقيقية تضيف قيمة عملية وبصرية للـ Setup تاعك",
                  border: "rgba(0,200,255,0.3)",
                  borderHover: "rgba(0,200,255,0.6)",
                },
                {
                  icon: "🏆",
                  title: "خامات CNC ممتازة",
                  text: "مصنوعة من معدن CNC عالي الجودة — متينة، فينيشنها ممتاز، وتبقى شكلها زين مع الوقت",
                  border: "rgba(139,92,246,0.3)",
                  borderHover: "rgba(139,92,246,0.6)",
                },
                {
                  icon: "🎨",
                  title: "خلفيات حسب مزاجك",
                  text: "غيّر الثيم متى تحب، وصنع خلفياتك الخاصة — كل يوم Setup بشكل جديد",
                  border: "rgba(0,200,255,0.3)",
                  borderHover: "rgba(0,200,255,0.6)",
                },
                {
                  icon: "🛠️",
                  title: "برنامج تعديل سهل وممتاز",
                  text: "واجهة بسيطة تخليك تخصص كل شيء بسهولة — بدون تعقيد ولا خبرة تقنية",
                  border: "rgba(139,92,246,0.3)",
                  borderHover: "rgba(139,92,246,0.6)",
                  download: true,
                },
              ].map((c) => (
                <div
                  key={c.title}
                  className="feature-card"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${c.border}`,
                    borderRadius: 20,
                    padding: "28px 24px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                    backdropFilter: "blur(10px)",
                    transition: "all 0.3s ease",
                    minHeight: 160,
                    ["--hover-border" as any]: c.borderHover,
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 14,
                      background: "rgba(0,200,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 28,
                      flexShrink: 0,
                    }}
                  >
                    {c.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: "#ffffff", marginBottom: 8 }}>{c.title}</h3>
                    <p style={{ fontSize: 15, color: "#cbd5e1", lineHeight: 1.7, margin: 0, fontWeight: 500 }}>{c.text}</p>
                    {c.download && (
                      <button
                        type="button"
                        onClick={() => window.open("https://www.swisstransfer.com/d/11894fd0-2360-4b07-86a3-a71ffc1b4ced", "_blank")}
                        className="w-full mt-4 py-3 font-bold text-white rounded-lg"
                        style={{
                          background: "linear-gradient(135deg, #00c8ff, #7c3aed)",
                          boxShadow: "0 4px 20px rgba(0,200,255,0.3)",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        ⬇️ تحميل البرنامج مجاناً
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>


            <div className="flex flex-col items-center gap-4 pt-4">
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(0,200,255,0.08), rgba(139,92,246,0.08))",
                  border: "1px solid rgba(0,200,255,0.25)",
                  borderRadius: 20,
                  padding: "24px 40px",
                  textAlign: "center",
                  maxWidth: 320,
                  margin: "0 auto",
                  width: "100%",
                }}
              >
                <div style={{ fontSize: 14, color: "#94a3b8", marginBottom: 4 }}>ابتداءً من</div>
                <div
                  style={{
                    fontSize: 52,
                    fontWeight: 900,
                    color: "#00c8ff",
                    lineHeight: 1.1,
                    textShadow: "0 0 30px rgba(0,200,255,0.6)",
                  }}
                >
                  12,800 دج
                </div>
                <div style={{ fontSize: 13, color: "#10b981", marginTop: 8, fontWeight: 600 }}>
                  الدفع عند الاستلام ✓
                </div>
              </div>
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
                  marginTop: 16,
                  cursor: "pointer",
                }}
              >
                🛒 اطلب الآن ←
              </button>
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

          <div className="grid lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                icon: "🌡️",
                title: "تعرف واش راك تدير",
                desc: "تشوف حرارة CPU و GPU في الوقت الحقيقي — تعرف متى تخفف اللعبة أو تنظف الجهاز قبل ما يتعطل",
                feel: "",
              },
              {
                icon: "🖥️",
                title: "شاشة حقيقية مش غادجيت",
                desc: "IPS LCD 9.16 بوصة بخامات معدن CNC — مش بلاستيك رخيص. تدوم وتبقى شكلها زين مع الوقت",
                feel: "",
              },
              {
                icon: "⚡",
                title: "بدون لاق بدون تعقيد",
                desc: "Plug & Play مباشرة — ما تحتاجش تبرمج أو تنصب درايفرات. توصلها وتخدم فوراً",
                feel: "",
              },
            ].map((c) => (
              <Card
                key={c.title}
                className="p-6 sm:p-7 bg-white/5 backdrop-blur border border-white/10 shadow-card hover:shadow-glow hover:border-primary/40 transition-all duration-500 text-center space-y-4"
                style={{ borderRadius: 20 }}
              >
                <div
                  className="mx-auto flex items-center justify-center"
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 18,
                    background: "linear-gradient(135deg, rgba(0,200,255,0.15), rgba(139,92,246,0.15))",
                    border: "1px solid rgba(0,200,255,0.25)",
                    fontSize: 36,
                  }}
                >
                  {c.icon}
                </div>
                <h3 className="text-xl font-black text-white">{c.title}</h3>
                <p className="text-foreground/75 text-sm sm:text-base leading-relaxed">{c.desc}</p>
                <p className="text-sm font-bold text-gradient pt-2">{c.feel}</p>
              </Card>
            ))}
          </div>

          {/* Before / After images grid (no labels) */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-10 sm:mt-14 max-w-4xl mx-auto">
            <ImagePlaceholder label="Setup قبل" />
            <ImagePlaceholder label="Setup بعد" />
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

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {["ثيم Dashboard", "ثيم Anime", "ثيم Minimal", "ثيم RGB"].map((label) => (
              <ImagePlaceholder key={label} label={label} aspect="aspect-[4/5]" />
            ))}
          </div>

          <div className="text-center pt-10 sm:pt-12">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto">
            {[
              { icon: Ruler, title: "📐 الأبعاد", desc: "25.3 × 6.8 سم | حجم مثالي يناسب أي Setup بدون تعقيد" },
              { icon: Wrench, title: "🔩 تركيب سهل", desc: "بدون أدوات خاصة | plug & play في دقائق" },
              { icon: Monitor, title: '🖥️ IPS LCD 9.16"', desc: "دقة عالية وزوايا مشاهدة واسعة" },
              { icon: Shield, title: "🏆 معدن CNC", desc: "هيكل قوي ومقاوم مع فينيشن فاخر" },
            ].map(({ icon: Icon, title, desc }) => (
              <Card
                key={title}
                className="p-5 sm:p-6 bg-white/5 backdrop-blur border border-white/10 shadow-card flex items-start gap-4 hover:shadow-glow hover:border-primary/40 transition-all duration-500"
              >
                <span className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center shrink-0 shadow-blue">
                  <Icon className="w-6 h-6 text-white" />
                </span>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">{title}</h3>
                  <p className="text-foreground/70 text-sm sm:text-base leading-relaxed">{desc}</p>
                </div>
              </Card>
            ))}
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
            <div className="mb-6 space-y-1.5">
              <div className="text-sm text-slate-400">سعر المنتج: {productPrice.toLocaleString()} دج</div>
              <div className="text-sm text-slate-400">التوصيل: +{deliveryPrice.toLocaleString()} دج</div>
              <div className="my-3 h-px bg-white/10" />
              <div className="text-5xl sm:text-6xl font-black text-gradient leading-tight">
                {totalPrice.toLocaleString()} دج
              </div>
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
                if (!wilayaCode || !commune || !fullName || !phone || submitting) return;

                setSubmitting(true);
                const wilayaName = wilayas.find((w) => w.code === wilayaCode)?.name ?? "";
                const orderData = {
                  name: fullName,
                  phone: phone,
                  state: `${wilayaCode} - ${wilayaName}`,
                  city: `${commune} - ${address}`,
                  color: color,
                  version: color,
                  delivery_type:
                    delivery === "home"
                      ? "توصيل لباب الدار — 700 دج"
                      : "توصيل للمكتب — 400 دج",
                  total_price: totalPrice,
                };

                try {
                  fetch(
                    "https://script.google.com/macros/s/AKfycbwyqf4c2m5gqRFDMdrUl8U5A41nSVuV5DXbdV4uvtshWVhXGNhdU6r2o1Ka4Xn34Kdc/exec",
                    {
                      method: "POST",
                      mode: "no-cors",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(orderData),
                    },
                  ).catch(() => {});
                } finally {
                  navigate("/thank-you");
                }
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
