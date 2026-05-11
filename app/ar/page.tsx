import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "تسجيل أضحية العيد 2026 من فرنسا",
  description:
    "احجز أضحية عيد الأضحى 2026 من فرنسا. ذبح الكبش بإشراف شيخ، فيديو باسمك، توزيع اللحم على العائلات المحتاجة في مدغشقر. 140€ شامل كل شيء.",
  keywords: [
    "تسجيل في أضاحي العيد 2026",
    "كيفية تسجيل اضحية العيد",
    "موقع تسجيل الاضاحي 2026",
    "حجز الاضحية",
    "سعر الكبش في فرنسا",
    "كيف احجز اضحية العيد",
    "اضحية عيد الأضحى 2026 فرنسا",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/ar",
    languages: {
      "fr-FR": "https://qurbaniya.fr",
      "en": "https://qurbaniya.fr/en",
      "ar": "https://qurbaniya.fr/ar",
      "tr": "https://qurbaniya.fr/tr",
    },
  },
  openGraph: {
    title: "تسجيل أضحية عيد الأضحى 2026 — قرباني",
    description:
      "احجز أضحيتك من فرنسا، ذبح بإشراف شيخ، فيديو شخصي، توزيع على العائلات المحتاجة.",
    url: "https://qurbaniya.fr/ar",
    locale: "ar",
    type: "website",
  },
};

export default function ArHomePage() {
  return (
    <article className="max-w-3xl mx-auto px-4">
      {/* Language switcher */}
      <nav className="flex items-center gap-3 text-sm mb-8 font-inter">
        <Link href="/" className="text-text-muted hover:text-gold transition-colors">
          Français
        </Link>
        <span className="text-text-muted-light">·</span>
        <span className="text-gold font-semibold">العربية</span>
        <span className="text-text-muted-light">·</span>
        <Link href="/tr" className="text-text-muted hover:text-gold transition-colors">
          Türkçe
        </Link>
      </nav>

      {/* Hero */}
      <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6 text-text-primary">
        تسجيل أضحية عيد الأضحى <span className="text-gold">2026</span> من فرنسا
      </h1>

      <p className="text-lg text-text-muted leading-relaxed mb-8 border-r-4 border-gold pr-4">
        احجز أضحيتك لعيد الأضحى <strong className="text-text-primary">يوم الأربعاء 27 مايو 2026</strong>. قرباني خدمة موثوقة من فرنسا: نذبح الكبش باسمك بإشراف شيخ، نرسل لك فيديو شخصي، ونوزع اللحم على العائلات المحتاجة في مدغشقر.
      </p>

      {/* 3 key bullets */}
      <div className="space-y-5 mb-10">
        <div className="bg-bg-secondary rounded-xl p-5 border border-gold/10">
          <h2 className="text-gold font-bold text-sm uppercase tracking-wider mb-2 font-inter">١ — التوكيل شرعي</h2>
          <p className="text-text-muted leading-relaxed">
            توكيل الأضحية صحيح عند المذاهب الأربعة (حنفي، مالكي، شافعي، حنبلي). كان الصحابة الكرام يوكلون من يذبح عنهم.
          </p>
        </div>

        <div className="bg-bg-secondary rounded-xl p-5 border border-gold/10">
          <h2 className="text-gold font-bold text-sm uppercase tracking-wider mb-2 font-inter">٢ — تنفيذ موثق</h2>
          <p className="text-text-muted leading-relaxed">
            الذبح يتم بإشراف شيخ، باسمك الكامل، يوم العيد. تستلم فيديو شخصي عبر واتساب كدليل على الذبح.
          </p>
        </div>

        <div className="bg-bg-secondary rounded-xl p-5 border border-gold/10">
          <h2 className="text-gold font-bold text-sm uppercase tracking-wider mb-2 font-inter">٣ — توزيع على المحتاجين</h2>
          <p className="text-text-muted leading-relaxed">
            اللحم يُوزع على العائلات الفقيرة في مدغشقر، تطبيقاً لروح الأضحية والصدقة.
          </p>
        </div>
      </div>

      {/* Price + CTA */}
      <div className="bg-gradient-to-l from-primary to-primary-light rounded-xl p-6 md:p-8 text-center mb-10">
        <p className="text-white/80 text-sm uppercase tracking-wider mb-2 font-inter">السعر شامل كل شيء</p>
        <p className="text-white text-4xl font-black mb-4 font-playfair">140 €</p>
        <p className="text-white/70 text-sm mb-5 font-inter">
          كبش مطابق للسنة · إشراف شيخ · فيديو شخصي · توزيع خيري
        </p>
        <Link
          href="/commander"
          className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
        >
          <ArrowLeft size={14} /> احجز أضحيتي الآن
        </Link>
      </div>

      {/* FAQ short */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-text-primary mb-5">أسئلة شائعة</h2>

        <div className="space-y-5">
          <div>
            <h3 className="font-bold text-text-primary mb-2">متى عيد الأضحى 2026؟</h3>
            <p className="text-text-muted leading-relaxed">
              يوم الأربعاء 27 مايو 2026 (10 ذو الحجة 1447). الذبح صحيح من 27 إلى 30 مايو 2026.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-text-primary mb-2">هل التوكيل في الأضحية جائز؟</h3>
            <p className="text-text-muted leading-relaxed">
              نعم، التوكيل جائز بإجماع المذاهب الأربعة. والأصل في ذلك فعل النبي ﷺ حيث وكّل علياً رضي الله عنه في إتمام نحر الهدي.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-text-primary mb-2">كيف أعرف أن أضحيتي ذُبحت؟</h3>
            <p className="text-text-muted leading-relaxed">
              تستلم فيديو شخصي عبر واتساب يوم العيد، يظهر فيه الذبح مع ذكر اسمك الكامل.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-text-primary mb-2">أين يُوزع اللحم؟</h3>
            <p className="text-text-muted leading-relaxed">
              اللحم يُوزع على العائلات المحتاجة في مدغشقر، بإشراف فريقنا المحلي.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-l from-primary to-primary-light rounded-xl p-6 text-center">
        <h3 className="text-white font-bold text-lg mb-3 font-playfair">
          لا تتأخر — الأماكن محدودة
        </h3>
        <Link
          href="/commander"
          className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
        >
          احجز أضحيتي الآن
        </Link>
      </div>
    </article>
  );
}
