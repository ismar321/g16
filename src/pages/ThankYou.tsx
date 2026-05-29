import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Check, ArrowLeft, PhoneCall } from "lucide-react";
import { trackPurchase } from "@/lib/meta-pixel";

const ThankYou = () => {
  useEffect(() => {
    // Fire Purchase pixel only when Thank You page becomes visible
    trackPurchase();
  }, []);

  return (
    <div
      dir="rtl"
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ background: "linear-gradient(160deg, #080c1a 0%, #0d1528 100%)" }}
    >
      <Card
        className="max-w-xl w-full text-center space-y-6"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(0,200,255,0.2)",
          borderRadius: 20,
          padding: "32px",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Green Checkmark */}
        <div className="mx-auto flex items-center justify-center">
          <Check
            className="text-[#10b981]"
            style={{
              width: 64,
              height: 64,
              filter: "drop-shadow(0 0 20px rgba(16,185,129,0.6))",
            }}
          />
        </div>

        {/* Main Title */}
        <h1
          style={{
            color: "#ffffff",
            fontSize: 36,
            fontWeight: 900,
            lineHeight: 1.2,
          }}
        >
          تم استلام طلبك{" "}
          <span style={{ color: "#00c8ff" }}>بنجاح</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            color: "#cbd5e1",
            fontSize: 18,
            lineHeight: 1.7,
          }}
        >
          شكراً على ثقتك! فريقنا راح يتصل بيك في أقرب وقت لتأكيد الطلبية وتفاصيل التوصيل.
        </p>

        {/* Phone Note */}
        <div
          className="flex items-center justify-center gap-2 text-sm rounded-lg py-3 px-4"
          style={{
            background: "rgba(0,200,255,0.08)",
            border: "1px solid rgba(0,200,255,0.2)",
            color: "#ffffff",
          }}
        >
          <PhoneCall style={{ width: 16, height: 16, color: "#00c8ff" }} />
          <span>تأكد من أن هاتفك متاح للمكالمة</span>
        </div>

        {/* CTA Button */}
        <Link to="/">
          <button
            className="w-full"
            style={{
              background: "linear-gradient(135deg, #00c8ff, #7c3aed)",
              color: "#ffffff",
              fontSize: 18,
              fontWeight: 700,
              padding: "16px 40px",
              borderRadius: 50,
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            العودة للصفحة الرئيسية
            <ArrowLeft style={{ width: 20, height: 20 }} />
          </button>
        </Link>
      </Card>
    </div>
  );
};

export default ThankYou;
