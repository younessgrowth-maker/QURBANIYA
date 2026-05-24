import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import LanguageSwitcher from "@/components/blog/LanguageSwitcher";
import { blogHreflangAlternates } from "@/lib/i18n";
import { AID_DATE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "🌙 العد التنازلي لعيد الأضحى 2026: كم يوم متبقي؟",
  description:
    "📅 عيد الأضحى 2026 يوافق الأربعاء 27 مايو 2026. كم يوم متبقي على عيد الأضحى؟ التقويم الكامل (يوم عرفة، أيام التشريق) وكيفية حجز أضحيتك قبل الإغلاق 🐑",
  keywords: [
    "العد التنازلي عيد الأضحى 2026",
    "كم يوم متبقي على عيد الأضحى",
    "كم يوم متبقي على العيد",
    "متى عيد الأضحى 2026",
    "عيد الأضحى 2026 موعد",
    "27 مايو 2026 عيد",
    "عيد مايو 2026",
    "عد تنازلي عيد الأضحى",
    "موعد عيد الأضحى 2026",
    "عيد الأضحى دولفي",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/ar/blog/eid-al-adha-2026-aad-tanazuli",
    languages: blogHreflangAlternates("aid-al-adha-2026-dans-combien-de-jours"),
  },
  openGraph: {
    title: "🌙 العد التنازلي لعيد الأضحى 2026",
    description:
      "الأربعاء 27 مايو 2026. عد تنازلي، تقويم كامل، وكيفية حجز أضحيتك 🐑",
    url: "https://qurbaniya.fr/ar/blog/eid-al-adha-2026-aad-tanazuli",
    type: "article",
    locale: "ar",
    publishedTime: "2026-05-12T00:00:00Z",
    modifiedTime: "2026-05-12T00:00:00Z",
  },
};

// Revalidate every 6 hours so the countdown stays close to real
export const revalidate = 21600;

function ArticleJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "العد التنازلي لعيد الأضحى 2026: كم يوم متبقي؟",
    author: { "@type": "Organization", name: "Qurbaniya" },
    datePublished: "2026-05-12",
    dateModified: "2026-05-12",
    publisher: {
      "@type": "Organization",
      name: "Qurbaniya",
      logo: { "@type": "ImageObject", url: "https://qurbaniya.fr/logos/qurbaniya-logo-dark.svg" },
    },
    mainEntityOfPage: "https://qurbaniya.fr/ar/blog/eid-al-adha-2026-aad-tanazuli",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function ArticleFaqJsonLd(daysLeft: number) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "كم يوم متبقي على عيد الأضحى 2026؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: `يوافق عيد الأضحى 2026 يوم الأربعاء 27 مايو 2026 في فرنسا. متبقي ${daysLeft} يوم${daysLeft > 1 ? "اً" : ""} على عيد الأضحى (10 ذو الحجة 1447).`,
        },
      },
      {
        "@type": "Question",
        name: "متى يكون عيد الأضحى في 2026؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "يحتفل بعيد الأضحى 2026 (عيد الكبير، تاباسكي) يوم الأربعاء 27 مايو 2026 في فرنسا. يوم عرفة هو الثلاثاء 26 مايو، وأيام التشريق تمتد من الخميس 28 إلى السبت 30 مايو 2026.",
        },
      },
      {
        "@type": "Question",
        name: "إلى متى يمكنني حجز أضحية لعيد الأضحى 2026؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: `تُغلق حجوزات Qurbaniya لعيد 2026 في 27 مايو 2026 الساعة 03:00 صباحاً (بتوقيت باريس)، أي بضع ساعات قبل الذبح. متبقي ${daysLeft} يوم${daysLeft > 1 ? "اً" : ""} للحجز، لكن الأماكن محدودة: ننصح بعدم الانتظار.`,
        },
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function ArticleCountdown() {
  const now = new Date();
  const aid = new Date(AID_DATE);
  const msPerDay = 86_400_000;
  const daysLeft = Math.max(
    0,
    Math.ceil((aid.getTime() - now.getTime()) / msPerDay)
  );
  const aidPassed = daysLeft === 0;

  return (
    <>
      <ArticleJsonLd />
      {ArticleFaqJsonLd(daysLeft)}
      <BreadcrumbJsonLd
        items={[
          { name: "الرئيسية", url: "https://qurbaniya.fr/ar" },
          { name: "المدونة", url: "https://qurbaniya.fr/ar/blog" },
          {
            name: "العد التنازلي لعيد الأضحى 2026",
            url: "https://qurbaniya.fr/ar/blog/eid-al-adha-2026-aad-tanazuli",
          },
        ]}
      />
      <article dir="rtl" className="max-w-3xl mx-auto px-4 text-right">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-muted-light mb-8 font-inter">
          <Link href="/ar" className="hover:text-gold transition-colors">
            الرئيسية
          </Link>
          <span>/</span>
          <Link href="/ar/blog" className="hover:text-gold transition-colors">
            المدونة
          </Link>
          <span>/</span>
          <span className="text-text-primary">العد التنازلي لعيد الأضحى 2026</span>
        </nav>

        <LanguageSwitcher
          canonicalSlug="aid-al-adha-2026-dans-combien-de-jours"
          currentLocale="ar"
          className="mb-6"
        />

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full font-inter">
            عد تنازلي
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Calendar size={12} /> تحديث تلقائي
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Clock size={12} /> 4 دقائق قراءة
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6">
          عيد الأضحى 2026: <span className="text-gold">كم يوم متبقي</span>؟
        </h1>

        {/* Big countdown box */}
        {aidPassed ? (
          <div className="bg-bg-secondary border-2 border-gold rounded-card p-6 md:p-8 text-center mb-8">
            <p className="text-text-muted text-sm uppercase tracking-wider mb-2 font-inter">
              عيد الأضحى 2026 قد انقضى
            </p>
            <p className="text-text-primary font-bold text-lg">
              العيد القادم (عيد الأضحى 2027) سيكون حوالي 16 مايو 2027 وفقاً للحسابات الفلكية.
            </p>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-gold/10 via-bg-secondary to-bg-secondary border-2 border-gold rounded-card p-6 md:p-10 text-center mb-8">
            <p className="text-text-muted text-sm uppercase tracking-wider mb-3 font-inter">
              متبقي بالضبط
            </p>
            <div className="flex items-baseline justify-center gap-2 mb-4">
              <span className="text-6xl md:text-8xl font-black text-gold leading-none">
                {daysLeft}
              </span>
              <span className="text-2xl md:text-3xl font-bold text-text-primary">
                يوم{daysLeft > 1 ? "اً" : ""}
              </span>
            </div>
            <p className="text-text-muted leading-relaxed mb-1">
              على عيد الأضحى 2026
            </p>
            <p className="text-text-primary font-bold">
              📅 الأربعاء 27 مايو 2026
            </p>
          </div>
        )}

        <p className="text-lg text-text-muted leading-relaxed mb-8 border-r-4 border-gold pr-4">
          <strong className="text-text-primary">عيد الأضحى 2026</strong> — يُسمى أيضاً <strong className="text-text-primary">العيد الكبير</strong> أو <strong className="text-text-primary">تاباسكي</strong> أو <strong className="text-text-primary">عيد النحر</strong> — يوافق <strong className="text-text-primary">الأربعاء 27 مايو 2026</strong> في فرنسا. وهذا يوافق 10 ذو الحجة 1447 من التقويم الهجري.
        </p>

        <div className="prose-custom space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              📅 التقويم الكامل لعيد الأضحى 2026
            </h2>
            <div className="bg-bg-secondary rounded-xl p-5 border border-gold/10">
              <ul className="space-y-3 text-text-muted text-sm font-inter">
                <li className="flex items-center gap-3">
                  <span className="text-gold font-bold w-32 flex-shrink-0">26 مايو 2026</span>
                  <span>
                    <strong className="text-text-primary">الثلاثاء · يوم عرفة</strong> — الصيام مستحب بشدة لغير الحجاج
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gold font-bold w-32 flex-shrink-0">27 مايو 2026</span>
                  <span>
                    <strong className="text-text-primary">الأربعاء · يوم العيد</strong> — صلاة الصباح + الأضحية (يوم النحر)
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gold font-bold w-32 flex-shrink-0">28 مايو 2026</span>
                  <span>أول أيام التشريق · الأضحية لا تزال صالحة</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gold font-bold w-32 flex-shrink-0">29 مايو 2026</span>
                  <span>ثاني أيام التشريق</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gold font-bold w-32 flex-shrink-0">30 مايو 2026</span>
                  <span>ثالث وآخر أيام التشريق</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              لماذا 27 مايو هذا العام؟
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              يُحتفل بعيد الأضحى كل عام في <strong className="text-text-primary">10 ذو الحجة</strong>، آخر أشهر التقويم الهجري. ولأن التقويم الإسلامي قمري (~354 يوماً)، فإن موعد العيد يتقدم بحوالي 11 يوماً كل عام في التقويم الميلادي.
            </p>
            <p className="text-text-muted leading-relaxed">
              في عام 2026، يبدأ شهر ذو الحجة 1447 في 17 مايو 2026 وفقاً للحسابات الفلكية الرسمية (تقويم <em>أم القرى</em>). وبالتالي يوافق 10 ذو الحجة — يوم النحر — الأربعاء 27 مايو 2026.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              ⏳ متبقي {daysLeft} يوم{daysLeft > 1 ? "اً" : ""} — ماذا تفعل الآن؟
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              إذا كنت تنوي أداء أضحية عيد 2026، إليك الإجراءات التي يجب أن تعطيها الأولوية بالترتيب:
            </p>
            <ol className="space-y-3 text-text-muted font-inter">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">
                  1
                </span>
                <span>
                  <strong className="text-text-primary">احجز أضحيتك</strong> — كل عام تنفد الأماكن في الأيام الأخيرة. راجع <Link href="/ar/blog/siar-al-kharuf-fransa-2026" className="text-gold hover:underline">دليلنا لأسعار الخروف 2026</Link>.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">
                  2
                </span>
                <span>
                  <strong className="text-text-primary">حضّر نيتك</strong> — قرر باسم من تريد أداء الأضحية (نفسك، عائلتك، صدقة عن أحد الأحباء).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">
                  3
                </span>
                <span>
                  <strong className="text-text-primary">استفسر عن صلاة العيد</strong> — تأكد من الوقت والمكان من مسجدك المحلي (عادة من 7 إلى 10 صباحاً).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">
                  4
                </span>
                <span>
                  <strong className="text-text-primary">صم يوم عرفة (26 مايو)</strong> — سنة مؤكدة لغير الحجاج. وفقاً لحديث صحيح، صيام هذا اليوم يكفّر ذنوب السنة الماضية والسنة المقبلة.
                </span>
              </li>
            </ol>
          </section>

          {/* CTA mid-article */}
          {!aidPassed && (
            <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 md:p-8 text-center my-10">
              <h3 className="text-white font-bold text-lg md:text-xl mb-2 font-playfair">
                متبقي {daysLeft} يوم{daysLeft > 1 ? "اً" : ""} — احجز قبل الإغلاق
              </h3>
              <p className="text-white/70 text-sm mb-4 font-inter">
                أضحية وفق السنة · فيديو شخصي عبر واتساب · 140€ شامل كل شيء
              </p>
              <Link
                href="/commander"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
              >
                احجز أضحيتي <ArrowRight size={14} />
              </Link>
            </div>
          )}

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              ماذا عن الدول المجاورة؟
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              تحتفل معظم الدول الإسلامية بعيد الأضحى 2026 يوم <strong className="text-text-primary">الأربعاء 27 مايو 2026</strong>، تبعاً للتقويم السعودي <em>أم القرى</em>. قد توجد فروقات بسيطة لمدة يوم واحد بحسب طريقة رؤية الهلال المحلية:
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter pr-1">
              <li>• <strong className="text-text-primary">فرنسا، بلجيكا، سويسرا</strong>: 27 مايو 2026 (الموقف الأغلبي)</li>
              <li>• <strong className="text-text-primary">المغرب، الجزائر، تونس</strong>: 27 مايو 2026 (أحياناً +1 يوم حسب الرؤية المحلية)</li>
              <li>• <strong className="text-text-primary">السنغال، مالي، ساحل العاج (تاباسكي)</strong>: عموماً متوافقة</li>
              <li>• <strong className="text-text-primary">السعودية، الإمارات، مصر</strong>: 27 مايو 2026 مؤكد</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              للمزيد من المعلومات
            </h2>
            <ul className="space-y-2 text-text-muted font-inter text-sm pr-1">
              <li>
                • <Link href="/ar/blog/tarikh-eid-al-adha-2026" className="text-gold hover:underline">موعد عيد الأضحى 2026 الكامل (يوم عرفة، التشريق، الأوقات)</Link>
              </li>
              <li>
                • <Link href="/ar/blog/siar-al-kharuf-fransa-2026" className="text-gold hover:underline">دليل أسعار الخروف في فرنسا 2026</Link>
              </li>
              <li>
                • <Link href="/ar/blog/qurbani-online-kayfa-yaamal" className="text-gold hover:underline">كيف تعمل الأضحية عبر الإنترنت؟</Link>
              </li>
              <li>
                • <Link href="/ar/blog/tabaski-2026-fransa" className="text-gold hover:underline">تاباسكي 2026 في فرنسا: تفويض الأضحية من الأراضي الفرنسية</Link>
              </li>
            </ul>
          </section>
        </div>

        <LanguageSwitcher
          canonicalSlug="aid-al-adha-2026-dans-combien-de-jours"
          currentLocale="ar"
          className="mt-12 mb-6"
        />

        {/* Bottom nav */}
        <div className="mt-4 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/ar/blog"
            className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors font-inter text-sm"
          >
            <ArrowLeft size={14} /> العودة إلى المدونة
          </Link>
          <Link
            href="/commander"
            className="flex items-center gap-2 text-gold font-semibold font-inter text-sm"
          >
            احجز أضحيتي <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    </>
  );
}
