import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "المدونة — أدلة أضحية عيد الأضحى | Qurbaniya",
  description:
    "أدلة شاملة حول أضحية عيد الأضحى: التواريخ، الأسعار، الأحكام الشرعية، النصائح العملية. كل ما تحتاج معرفته قبل حجز قربانك.",
  alternates: {
    canonical: "https://qurbaniya.fr/ar/blog",
    languages: {
      "fr-FR": "https://qurbaniya.fr/blog",
      en: "https://qurbaniya.fr/en/blog",
      ar: "https://qurbaniya.fr/ar/blog",
      tr: "https://qurbaniya.fr/tr/blog",
      es: "https://qurbaniya.fr/es/blog",
    },
  },
  openGraph: {
    title: "مدونة Qurbaniya — أدلة أضحية عيد الأضحى",
    description: "أدلة شاملة حول أضحية عيد الأضحى: التواريخ، الأسعار، الأحكام، النصائح.",
    url: "https://qurbaniya.fr/ar/blog",
    locale: "ar",
  },
};

const articles = [
  {
    slug: "yawm-arafah-2026",
    title: "🌙 يوم عرفة 2026: الثلاثاء 26 مايو · الصيام والفضائل والأدعية",
    excerpt:
      "9 ذو الحجة 2026 يوافق الثلاثاء 26 مايو. كل شيء عن صيام عرفة (تكفير سنتين من الذنوب)، الفضائل، الأدعية المستحبة وعلاقته بعيد الأضحى.",
    date: "24 مايو 2026",
    readTime: "7 دقائق",
    category: "دليل شرعي",
  },
  {
    slug: "eid-al-adha-2026-aad-tanazuli",
    title: "🌙 كم يوم متبقي على عيد الأضحى 2026؟",
    excerpt: "العد التنازلي الرسمي لعيد الأضحى 2026 (الأربعاء 27 مايو). التقويم الكامل (عرفة، التشريق)، ولماذا 27 مايو، وما العمل الآن.",
    date: "12 مايو 2026",
    readTime: "4 دقائق",
    category: "عد تنازلي",
  },
  {
    slug: "hajz-kharuf-eid-akhir-lahza-2026",
    title: "🚨 حجز خروف العيد في آخر لحظة 2026",
    excerpt: "لم تحجز بعد؟ إليك كيفية الطلب في اللحظة الأخيرة (D-15 إلى D-1) بكل اطمئنان. المواعيد، الخيارات، النصائح لتفادي الفوات.",
    date: "12 مايو 2026",
    readTime: "5 دقائق",
    category: "عاجل",
  },
  {
    slug: "tabaski-2026-fransa",
    title: "تاباسكي 2026 في فرنسا: تفويض أضحيتك من فرنسا",
    excerpt: "بعيد عن بلدك هذا العام لتاباسكي 2026؟ التوكيل في الأضحية معترف به من المذاهب الأربعة. التاريخ، الآلية، وكيفية الحجز من فرنسا.",
    date: "11 مايو 2026",
    readTime: "7 دقائق",
    category: "شتات إفريقيا",
  },
  {
    slug: "thaman-kharuf-eid-2026-fransa",
    title: "ثمن خروف عيد الأضحى 2026 في فرنسا؟",
    excerpt: "من 140 يورو (عبر الإنترنت) إلى 450 يورو فما فوق (حي + مسلخ معتمد): مقارنة شاملة لـ 3 طرق للحصول على خروف العيد 2026 في فرنسا.",
    date: "7 مايو 2026",
    readTime: "7 دقائق",
    category: "مقارنة أسعار",
  },
  {
    slug: "tarikh-eid-al-adha-2026",
    title: "تاريخ عيد الأضحى 2026: كل ما تحتاج معرفته",
    excerpt: "عيد الأضحى 2026 مقرر يوم 27 مايو. اكتشف التواريخ الدقيقة، أيام التشريق، وكيف تحضّر أضحيتك هذه السنة.",
    date: "15 مارس 2026",
    readTime: "5 دقائق",
    category: "دليل",
  },
  {
    slug: "qurbani-online-kayfa-yaamal",
    title: "أضحية العيد عبر الإنترنت: كيف يعمل النظام؟",
    excerpt: "التوكيل في الأضحية عبر الإنترنت يوافق السنة. إليك العملية خطوة بخطوة، من الحجز إلى استلام فيديو الأضحية باسمك.",
    date: "10 مارس 2026",
    readTime: "7 دقائق",
    category: "دليل عملي",
  },
  {
    slug: "siar-al-kharuf-fransa-2026",
    title: "سعر الخروف في فرنسا 2026: لماذا التفويض أذكى",
    excerpt: "مقارنة مفصّلة للأسعار: شراء خروف في فرنسا (350-400 يورو) مقابل التوكيل في الأضحية عبر الإنترنت (140 يورو).",
    date: "5 مارس 2026",
    readTime: "6 دقائق",
    category: "مقارنة",
  },
];

export default function ArBlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4" dir="rtl">
      <BreadcrumbJsonLd
        items={[
          { name: "الرئيسية", url: "https://qurbaniya.fr/ar" },
          { name: "المدونة", url: "https://qurbaniya.fr/ar/blog" },
        ]}
      />
      <div className="text-center mb-12">
        <span className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-3 block font-inter">
          المدونة
        </span>
        <h1 className="text-3xl md:text-4xl font-black uppercase mb-4">
          أدلة <span className="text-gold">ونصائح</span>
        </h1>
        <p className="text-text-muted max-w-xl mx-auto">
          كل ما تحتاج لمعرفته عن أضحية عيد الأضحى، الأحكام الشرعية، وكيفية تحضير طلبك بشكل جيد.
        </p>
      </div>

      <div className="space-y-6">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/ar/blog/${article.slug}`}
            className="group block bg-white rounded-xl border border-gray-100 p-6 md:p-8 hover:border-gold/20 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full font-inter">
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
                <Calendar size={12} />
                {article.date}
              </span>
              <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
                <Clock size={12} />
                {article.readTime}
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-text-primary group-hover:text-gold transition-colors mb-3">
              {article.title}
            </h2>

            <p className="text-text-muted leading-relaxed mb-4">
              {article.excerpt}
            </p>

            <span className="inline-flex items-center gap-1.5 text-gold font-semibold text-sm font-inter group-hover:gap-2.5 transition-all">
              قراءة المقال
              <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center bg-gradient-to-r from-primary to-primary-light rounded-xl p-8 md:p-10">
        <h3 className="text-white font-bold text-xl md:text-2xl mb-3 font-playfair">
          مستعد لحجز أضحيتك؟
        </h3>
        <p className="text-white/70 mb-6 font-inter">
          خروف موافق للسنة، فيديو باسمك، ابتداءً من 140 يورو.
        </p>
        <Link
          href="/commander"
          className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
        >
          احجز أضحيتي <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
