import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight, X, Check } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import LanguageSwitcher from "@/components/blog/LanguageSwitcher";
import { blogHreflangAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "🐑 سعر الخروف في فرنسا 2026: من 140€ إلى 450€ · الدليل الشامل",
  description:
    "💰 خروف حي في فرنسا: 350-450€. تفويض الذبح أونلاين: 140€ شامل كل شيء. مقارنة تفصيلية لأسعار عيد الأضحى 2026، ما هو مشمول وكيف تختار.",
  keywords: [
    "سعر خروف العيد 2026",
    "ثمن الأضحية",
    "ثمن الخروف فرنسا",
    "خروف العيد رخيص فرنسا",
    "شراء خروف العيد أونلاين",
    "مقارنة أسعار خروف الأضحية",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/ar/blog/siar-al-kharuf-fransa-2026",
    languages: blogHreflangAlternates("prix-mouton-france-2026"),
  },
  openGraph: {
    title: "🐑 سعر الخروف في فرنسا 2026: من 140€ إلى 450€",
    description:
      "مقارنة شاملة: خروف حي في فرنسا 350-450€ مقابل ذبح أونلاين 140€. كل ما تحتاج معرفته قبل الاختيار 🌙",
    url: "https://qurbaniya.fr/ar/blog/siar-al-kharuf-fransa-2026",
    type: "article",
    locale: "ar",
    publishedTime: "2026-03-05T00:00:00Z",
  },
};

function ArticleJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "سعر الخروف في فرنسا 2026: لماذا التفويض هو الخيار الأذكى",
    author: { "@type": "Organization", name: "Qurbaniya" },
    datePublished: "2026-03-05",
    dateModified: "2026-03-05",
    publisher: {
      "@type": "Organization",
      name: "Qurbaniya",
      logo: { "@type": "ImageObject", url: "https://qurbaniya.fr/logos/qurbaniya-logo-dark.svg" },
    },
    mainEntityOfPage: "https://qurbaniya.fr/ar/blog/siar-al-kharuf-fransa-2026",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function ArticleSiarKharuf() {
  return (
    <>
      <ArticleJsonLd />
      <BreadcrumbJsonLd items={[
        { name: "الرئيسية", url: "https://qurbaniya.fr/ar" },
        { name: "المدونة", url: "https://qurbaniya.fr/ar/blog" },
        { name: "سعر الخروف فرنسا 2026", url: "https://qurbaniya.fr/ar/blog/siar-al-kharuf-fransa-2026" },
      ]} />
      <article dir="rtl" className="max-w-3xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-muted-light mb-8 font-inter">
          <Link href="/ar" className="hover:text-gold transition-colors">الرئيسية</Link>
          <span>/</span>
          <Link href="/ar/blog" className="hover:text-gold transition-colors">المدونة</Link>
          <span>/</span>
          <span className="text-text-primary">سعر الخروف 2026</span>
        </nav>

        <LanguageSwitcher
          canonicalSlug="prix-mouton-france-2026"
          currentLocale="ar"
          className="mb-6"
        />

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full font-inter">مقارنة</span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Calendar size={12} /> 5 مارس 2026
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Clock size={12} /> 6 دقائق قراءة
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6">
          سعر الخروف في فرنسا 2026: <span className="text-gold">لماذا التفويض أذكى</span>
        </h1>

        <p className="text-lg text-text-muted leading-relaxed mb-8 border-r-4 border-gold pr-4">
          كل عام ترتفع أسعار خرفان العيد في فرنسا بشكل كبير. في عام 2026، توقّع أن تدفع ما بين 350€ و450€ للخروف وحده — دون احتساب تكاليف الخدمات اللوجستية. إليك مقارنة تفصيلية لاتخاذ القرار الأفضل.
        </p>

        {/* Content */}
        <div className="prose-custom space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">كم يكلف الخروف في فرنسا عام 2026؟</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              يختلف سعر خروف عيد الأضحى في فرنسا حسب السلالة والوزن والمنطقة. إليك نطاقات الأسعار الشائعة:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-red-50 rounded-xl p-5 border border-red-100">
                <h3 className="text-red-700 font-bold text-sm uppercase tracking-wider mb-3 font-inter">في فرنسا</h3>
                <ul className="space-y-2 text-sm font-inter">
                  <li className="text-text-muted"><strong className="text-red-700">خروف صغير:</strong> 280 - 350€</li>
                  <li className="text-text-muted"><strong className="text-red-700">خروف متوسط:</strong> 350 - 420€</li>
                  <li className="text-text-muted"><strong className="text-red-700">خروف كبير:</strong> 420 - 500€+</li>
                  <li className="text-text-muted mt-3 text-xs">+ رسوم المسلخ، النقل، التخزين...</li>
                </ul>
              </div>
              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
                <h3 className="text-emerald-700 font-bold text-sm uppercase tracking-wider mb-3 font-inter">مع Qurbaniya</h3>
                <ul className="space-y-2 text-sm font-inter">
                  <li className="text-text-muted"><strong className="text-emerald-700">خروف كامل:</strong> 140€</li>
                  <li className="text-text-muted"><strong className="text-emerald-700">شامل كل شيء:</strong> الذبح + الفيديو</li>
                  <li className="text-text-muted"><strong className="text-emerald-700">التوزيع:</strong> 100% من اللحم</li>
                  <li className="text-text-muted mt-3 text-xs">بدون رسوم خفية · دفع آمن</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">التكلفة الحقيقية للأضحية في فرنسا (الرسوم الخفية)</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              سعر الخروف ليس إلا قمة جبل الجليد. في فرنسا، يجب إضافة:
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border border-gold/10">
              <ul className="space-y-3 text-text-muted text-sm font-inter">
                <li className="flex justify-between"><span>سعر الخروف</span><span className="text-text-primary font-bold">350 - 400€</span></li>
                <li className="flex justify-between"><span>النقل ذهاباً (السوق → المنزل)</span><span className="text-text-primary font-bold">30 - 50€</span></li>
                <li className="flex justify-between"><span>تكلفة العلف إذا تم الاحتفاظ به أياماً</span><span className="text-text-primary font-bold">10 - 20€</span></li>
                <li className="flex justify-between"><span>رسوم المسلخ المعتمد</span><span className="text-text-primary font-bold">40 - 80€</span></li>
                <li className="flex justify-between"><span>النقل عودة (المسلخ → المنزل)</span><span className="text-text-primary font-bold">20 - 40€</span></li>
                <li className="flex justify-between border-t border-gold/10 pt-3 mt-3"><span className="font-bold text-text-primary">الإجمالي الفعلي المقدّر</span><span className="text-red-600 font-black text-lg">450 - 590€</span></li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">مقارنة تفصيلية: فرنسا مقابل التفويض أونلاين</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse font-inter">
                <thead>
                  <tr className="border-b-2 border-gold/20">
                    <th className="text-right py-3 text-text-muted font-medium">المعيار</th>
                    <th className="text-center py-3 text-red-600 font-bold">في فرنسا</th>
                    <th className="text-center py-3 text-emerald-700 font-bold">Qurbaniya</th>
                  </tr>
                </thead>
                <tbody className="text-text-muted">
                  {[
                    { label: "السعر الإجمالي", france: "450 - 590€", nous: "140€", bad: true },
                    { label: "اللوجستيات", france: "على عاتقك", nous: "نتولى كل شيء" },
                    { label: "المطابقة الشرعية", france: "متفاوتة", nous: "شيخ مؤهل" },
                    { label: "الإثبات", france: "لا يوجد", nous: "فيديو باسمك" },
                    { label: "هدر اللحم", france: "متكرر", nous: "100% موزّع" },
                    { label: "الأثر الاجتماعي", france: "محدود", nous: "+30 وجبة/خروف" },
                    { label: "التوتر", france: "مرتفع", nous: "صفر" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="py-3 font-medium text-text-primary">{row.label}</td>
                      <td className="py-3 text-center">
                        <span className="inline-flex items-center gap-1">
                          <X size={14} className="text-red-400" />
                          <span className={row.bad ? "line-through text-red-400" : ""}>{row.france}</span>
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        <span className="inline-flex items-center gap-1">
                          <Check size={14} className="text-emerald-600" />
                          <span className="text-emerald-700 font-semibold">{row.nous}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* CTA mid-article */}
          <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 md:p-8 text-center my-10">
            <h3 className="text-white font-bold text-lg md:text-xl mb-2 font-playfair">
              وفّر حتى 260€ على أضحيتك
            </h3>
            <p className="text-white/70 text-sm mb-4 font-inter">
              140€ شامل كل شيء · ذبح مطابق للسنّة · فيديو باسمك · توزيع اللحم
            </p>
            <Link
              href="/commander"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
            >
              احجز بـ 140€ <ArrowRight size={14} />
            </Link>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">المزايا بعيداً عن السعر</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              تفويض الأضحية ليس مجرد توفير مالي. بل أيضاً:
            </p>
            <ul className="space-y-3">
              {[
                { title: "أثر اجتماعي مباشر", desc: "كل خروف يُطعم حتى 30 شخصاً محتاجاً، أي حوالي 5 عائلات. يُوزّع اللحم بالكامل ولا يُهدر منه شيء." },
                { title: "بدون لوجستيات", desc: "لا سوق ماشية، ولا نقل، ولا مسلخ تبحث عنه. تطلب في دقيقتين من الأريكة." },
                { title: "ضمان المطابقة الشرعية", desc: "تتم الأضحية على يد شيخ مؤهل، وفق قواعد السنّة الصارمة. لا تقريب ولا اجتهاد." },
                { title: "إثبات ملموس", desc: "الفيديو باسمك يضمن لك أن أضحيتك تمّت فعلاً باسمك. شفافية تامة." },
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <Check size={18} className="text-gold flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-text-primary">{item.title}</strong>
                    <p className="text-text-muted text-sm mt-0.5">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">لماذا ترتفع الأسعار كل عام في فرنسا؟</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              تفسّر عدة عوامل الارتفاع المستمر لأسعار الخرفان في فرنسا: التضخم العام، وندرة مزارع تربية الأغنام، والمعايير الصحية الصارمة المتزايدة، إضافة إلى الطلب القوي المتركّز في أيام قليلة حول <Link href="/ar/blog/tarikh-eid-al-adha-2026" className="text-gold hover:underline">الأربعاء 27 مايو 2026، يوم عيد الأضحى</Link>.
            </p>
            <p className="text-text-muted leading-relaxed">
              عبر التفويض في بلدان تتطور فيها تربية الأغنام بشكل أكبر وبتكلفة أقل، تستفيد من سعر عادل مع أثر اجتماعي كبير.
            </p>
          </section>

          {/* Go further — internal linking */}
          <section className="bg-bg-secondary rounded-xl p-5 md:p-6 border border-gold/10">
            <h3 className="text-gold font-bold text-sm uppercase tracking-wider mb-3 font-inter">لمزيد من المعلومات</h3>
            <ul className="space-y-2 text-sm font-inter">
              <li>
                <Link href="/ar/blog/tarikh-eid-al-adha-2026" className="text-text-primary hover:text-gold transition-colors">
                  ← تاريخ عيد الأضحى 2026: الأربعاء 27 مايو
                </Link>
              </li>
              <li>
                <Link href="/ar/blog/thaman-kharuf-eid-2026-fransa" className="text-text-primary hover:text-gold transition-colors">
                  ← كم يكلف خروف العيد 2026؟ (مقارنة تفصيلية)
                </Link>
              </li>
              <li>
                <Link href="/ar/blog/qurbani-online-kayfa-yaamal" className="text-text-primary hover:text-gold transition-colors">
                  ← أضحية العيد أونلاين: كيف تتم؟
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-text-primary hover:text-gold transition-colors">
                  ← الأسئلة الشائعة عن عيد الأضحى 2026
                </Link>
              </li>
            </ul>
          </section>
        </div>

        <LanguageSwitcher
          canonicalSlug="prix-mouton-france-2026"
          currentLocale="ar"
          className="mt-12 mb-6"
        />

        {/* Bottom navigation */}
        <div className="mt-4 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/ar/blog/qurbani-online-kayfa-yaamal" className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors font-inter text-sm">
            <ArrowLeft size={14} /> الأضحية أونلاين
          </Link>
          <Link href="/ar/blog" className="flex items-center gap-2 text-gold font-semibold font-inter text-sm">
            جميع المقالات <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    </>
  );
}
