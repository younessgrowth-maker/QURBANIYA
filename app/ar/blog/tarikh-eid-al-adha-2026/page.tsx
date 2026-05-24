import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import LanguageSwitcher from "@/components/blog/LanguageSwitcher";
import { blogHreflangAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "🌙 عيد الأضحى 2026: الأربعاء 27 مايو · التاريخ المؤكد + التقويم الكامل",
  description:
    "📅 التاريخ المؤكد: الأربعاء 27 مايو 2026 (10 ذو الحجة). يوم عرفة 26 مايو، أيام التشريق 28-30 مايو. مواقيت الصلاة حسب المدينة، وكيفية حجز أضحيتك قبل إغلاق التسجيل 🐑",
  keywords: [
    "تاريخ عيد الأضحى 2026",
    "موعد عيد الأضحى 2026",
    "عيد الأضحى 2026",
    "27 مايو 2026 عيد",
    "العيد الكبير 2026",
    "أضحية 2026",
    "أيام التشريق 2026",
    "يوم عرفة 2026",
    "10 ذو الحجة 2026",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/ar/blog/tarikh-eid-al-adha-2026",
    languages: blogHreflangAlternates("date-aid-al-adha-2026"),
  },
  openGraph: {
    title: "🌙 عيد الأضحى 2026: الأربعاء 27 مايو · التقويم الكامل",
    description:
      "📅 التاريخ المؤكد: 27 مايو 2026. يوم عرفة 26 مايو، أيام التشريق 28-30 مايو. مواقيت الصلاة + كيفية حجز أضحيتك 🐑",
    url: "https://qurbaniya.fr/ar/blog/tarikh-eid-al-adha-2026",
    type: "article",
    locale: "ar",
    publishedTime: "2026-03-15T00:00:00Z",
    modifiedTime: "2026-05-08T00:00:00Z",
  },
};

function ArticleJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "عيد الأضحى 2026: يوم الأربعاء 27 مايو في فرنسا",
    author: { "@type": "Organization", name: "Qurbaniya" },
    datePublished: "2026-03-15",
    dateModified: "2026-05-08",
    publisher: {
      "@type": "Organization",
      name: "Qurbaniya",
      logo: { "@type": "ImageObject", url: "https://qurbaniya.fr/logos/qurbaniya-logo-dark.svg" },
    },
    mainEntityOfPage: "https://qurbaniya.fr/ar/blog/tarikh-eid-al-adha-2026",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function ArticleFaqJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "ما هو تاريخ عيد الأضحى 2026 في فرنسا؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "يصادف عيد الأضحى 2026 (المعروف أيضاً بالعيد الكبير أو التاباسكي) يوم الأربعاء 27 مايو 2026 في فرنسا، الموافق لـ 10 ذو الحجة 1447 من التقويم الهجري.",
        },
      },
      {
        "@type": "Question",
        name: "ما هي أيام التشريق في 2026؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "أيام التشريق في 2026 هي 28 و29 و30 مايو. الأضحية صحيحة من 27 إلى 30 مايو 2026 شاملاً.",
        },
      },
      {
        "@type": "Question",
        name: "متى يكون يوم عرفة في 2026؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "يصادف يوم عرفة 2026 يوم الثلاثاء 26 مايو 2026، عشية عيد الأضحى. صيام هذا اليوم مستحب جداً لغير الحجاج.",
        },
      },
      {
        "@type": "Question",
        name: "هل يجوز التوكيل في أضحية العيد؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "نعم، التوكيل في الأضحية صحيح بإجماع المذاهب الأربعة السنية. وهذه الممارسة تعود إلى الصحابة الكرام رضوان الله عليهم.",
        },
      },
      {
        "@type": "Question",
        name: "لماذا يُسمى عيد الأضحى أيضاً بالتاباسكي؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "التاباسكي هو الاسم الذي يُطلق على عيد الأضحى في غرب أفريقيا (السنغال، مالي، ساحل العاج، غينيا). إنها نفس المناسبة الدينية، تُحتفل في نفس التاريخ: 27 مايو 2026.",
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

export default function ArticleTarikhEidAlAdha() {
  return (
    <>
      <ArticleJsonLd />
      <ArticleFaqJsonLd />
      <BreadcrumbJsonLd items={[
        { name: "الرئيسية", url: "https://qurbaniya.fr/ar" },
        { name: "المدونة", url: "https://qurbaniya.fr/ar/blog" },
        { name: "تاريخ عيد الأضحى 2026", url: "https://qurbaniya.fr/ar/blog/tarikh-eid-al-adha-2026" },
      ]} />
      <article dir="rtl" className="max-w-3xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-muted-light mb-8 font-inter">
          <Link href="/ar" className="hover:text-gold transition-colors">الرئيسية</Link>
          <span>/</span>
          <Link href="/ar/blog" className="hover:text-gold transition-colors">المدونة</Link>
          <span>/</span>
          <span className="text-text-primary">تاريخ عيد الأضحى 2026</span>
        </nav>

        <LanguageSwitcher canonicalSlug="date-aid-al-adha-2026" currentLocale="ar" className="mb-6" />

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full font-inter">دليل</span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Calendar size={12} /> تم التحديث في 8 مايو 2026
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Clock size={12} /> 8 دقائق قراءة
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6">
          عيد الأضحى 2026: يصادف يوم <span className="text-gold">الأربعاء 27 مايو 2026</span> في فرنسا
        </h1>

        <p className="text-lg text-text-muted leading-relaxed mb-8 border-r-4 border-gold pr-4">
          عيد الأضحى 2026 — المعروف أيضاً بـ<strong className="text-text-primary">العيد الكبير</strong> أو <strong className="text-text-primary">التاباسكي</strong> — يصادف يوم <strong className="text-text-primary">الأربعاء 27 مايو 2026</strong> في فرنسا. إليك التقويم الكامل (يوم عرفة، أيام التشريق) وكل ما تحتاج معرفته لتحضير أضحيتك.
        </p>

        {/* Content */}
        <div className="prose-custom space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">ما هو تاريخ عيد الأضحى 2026؟</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              وفقاً للحسابات الفلكية، من المتوقع أن يكون عيد الأضحى 2026 يوم <strong className="text-text-primary">الأربعاء 27 مايو 2026</strong> (10 ذو الحجة 1447). يوافق هذا التاريخ يوم النحر.
            </p>
            <p className="text-text-muted leading-relaxed">
              كما هو الحال كل عام، سيتم تأكيد التاريخ النهائي برؤية هلال شهر ذي الحجة. وقد يختلف بيوم واحد حسب البلدان.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">لماذا يصادف عيد الأضحى 2026 يوم 27 مايو؟</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              يُحتفل بعيد الأضحى في <strong className="text-text-primary">العاشر من ذي الحجة</strong>، الشهر الثاني عشر والأخير من التقويم الهجري. وبما أن التقويم الإسلامي قمري، فإنه يحتوي على حوالي 354 يوماً في السنة — أي 11 يوماً أقل من التقويم الميلادي. لذلك يتقدم تاريخ عيد الأضحى بحوالي 11 يوماً كل عام في التقويم الميلادي.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              في عام 2026، يبدأ شهر ذي الحجة 1447 في <strong className="text-text-primary">17 مايو 2026</strong> حسب الحسابات الفلكية (<em>أم القرى</em>، التقويم السعودي الرسمي). وبالتالي فإن العاشر من ذي الحجة، يوم النحر، يصادف يوم الأربعاء 27 مايو 2026.
            </p>
            <p className="text-text-muted leading-relaxed">
              يستخدم المسلمون طريقتين لتأكيد التاريخ: <strong className="text-text-primary">الحساب الفلكي</strong> (المستخدم في معظم الدول الإسلامية) أو <strong className="text-text-primary">رؤية الهلال مباشرة</strong> (<em>رؤية الهلال</em>). في فرنسا، يتبع مسجد باريس الكبير تقليدياً قرار المجلس الثيولوجي الإسلامي، الذي يمكن أن يعتمد على أي من الطريقتين حسب السنوات.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">العيد الكبير، التاباسكي، عيد الأضحى: نفس العيد</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              تشير عدة أسماء إلى نفس الاحتفال الديني حسب مناطق العالم الإسلامي:
            </p>
            <ul className="space-y-2 text-text-muted font-inter text-sm pr-1">
              <li><strong className="text-text-primary">عيد الأضحى</strong> (عيد الأضحى) — الاسم العربي الرسمي، حرفياً «عيد النحر».</li>
              <li><strong className="text-text-primary">العيد الكبير</strong> («العيد الكبير») — الاسم الشائع في المغرب العربي وفرنسا.</li>
              <li><strong className="text-text-primary">التاباسكي</strong> — الاسم المستخدم في غرب أفريقيا (السنغال، مالي، ساحل العاج، غينيا).</li>
              <li><strong className="text-text-primary">العيد الكبير</strong> أو <strong className="text-text-primary">العيد الثاني</strong> — في مقابل عيد الفطر الذي يصادف نهاية شهر رمضان.</li>
            </ul>
            <p className="text-text-muted leading-relaxed mt-4">
              مهما كان الاسم المستخدم، فإن التاريخ هو نفسه في كل مكان: <strong className="text-text-primary">الأربعاء 27 مايو 2026</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">أيام التشريق: 28 و29 و30 مايو 2026</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              الأيام الثلاثة التي تلي العيد هي <strong className="text-text-primary">أيام التشريق</strong> (أيام التشريق). الأضحية صحيحة خلال هذه الأيام. عملياً، لديك من 27 إلى 30 مايو 2026 لذبح أضحيتك.
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border border-gold/10">
              <h3 className="text-gold font-bold text-sm uppercase tracking-wider mb-3 font-inter">التقويم الكامل</h3>
              <ul className="space-y-2 text-text-muted text-sm font-inter">
                <li className="flex items-center gap-2"><span className="text-gold font-bold">27 مايو</span> — يوم العيد (يوم النحر)</li>
                <li className="flex items-center gap-2"><span className="text-gold font-bold">28 مايو</span> — اليوم الأول من التشريق</li>
                <li className="flex items-center gap-2"><span className="text-gold font-bold">29 مايو</span> — اليوم الثاني من التشريق</li>
                <li className="flex items-center gap-2"><span className="text-gold font-bold">30 مايو</span> — اليوم الثالث من التشريق (اليوم الأخير)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">يوم عرفة: 26 مايو 2026</h2>
            <p className="text-text-muted leading-relaxed">
              عشية العيد، <strong className="text-text-primary">26 مايو 2026</strong>، تصادف يوم عرفة. صيام هذا اليوم مستحب جداً لغير الحجاج. وفقاً لحديث صحيح، فإنه يكفر ذنوب السنة الماضية والسنة القادمة.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">متى تُصلى صلاة عيد الأضحى 2026 في فرنسا؟</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              تُؤدى صلاة العيد (<em>صلاة العيد</em>) صباح <strong className="text-text-primary">الأربعاء 27 مايو 2026</strong>، جماعةً، بعد طلوع الشمس وقبل زوالها. وهي <em>سنة مؤكدة</em> عند أغلب المذاهب الفقهية.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              في فرنسا الحضرية، يمتد وقت الصلاة تقريباً من <strong className="text-text-primary">الساعة 7:00 صباحاً إلى 11:00 صباحاً</strong> حسب المدينة والموسم. تنظم المساجد الكبرى عادةً عدة موجات صلاة بين الساعة 7:30 و10:00 صباحاً لاستيعاب الإقبال الكبير. بعض الأمثلة:
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter pr-1 mb-4">
              <li>• <strong className="text-text-primary">باريس / إيل دو فرانس</strong>: عادةً حوالي 7:00-9:00 صباحاً</li>
              <li>• <strong className="text-text-primary">ليون</strong>: من 7:30 إلى 9:30 صباحاً</li>
              <li>• <strong className="text-text-primary">مرسيليا</strong>: من 7:00 إلى 9:00 صباحاً حسب المساجد</li>
              <li>• <strong className="text-text-primary">تولوز، بوردو، نيس</strong>: متغير، من 7:30 إلى 10:00 صباحاً</li>
            </ul>
            <p className="text-text-muted leading-relaxed">
              استفسر مباشرة من مسجدك المحلي قبل العيد بحوالي 7-10 أيام، عندما يتم نشر المواقيت الدقيقة.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">كيف تُحضّر أضحيتك بشكل جيد؟</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              لا تتأخر في حجز أضحيتك. كل عام، تنفد المخزونات بسرعة مع اقتراب العيد. إليك الخطوات الرئيسية:
            </p>
            <ol className="space-y-3 text-text-muted font-inter">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">1</span>
                <span><strong className="text-text-primary">احجز مبكراً</strong> — ترتفع الأسعار وتقل الأماكن مع اقتراب العيد. راجع <Link href="/ar/blog/siar-al-kharuf-fransa-2026" className="text-gold hover:underline">دليلنا لأسعار الخروف في فرنسا 2026</Link>.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">2</span>
                <span><strong className="text-text-primary">اختر خدمة موثوقة</strong> — تأكد من أن الذبح يتم وفقاً للسنة وتحت إشراف إمام.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">3</span>
                <span><strong className="text-text-primary">اطلب دليلاً</strong> — الفيديو الاسمي هو أفضل ضمان على أن أضحيتك تم ذبحها فعلاً.</span>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">هل يجوز التوكيل في الأضحية؟</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              نعم، التوكيل في الأضحية صحيح تماماً وفقاً للمذاهب الفقهية الأربعة في الإسلام. وهي ممارسة العديد من صحابة النبي (صلى الله عليه وسلم).
            </p>
            <p className="text-text-muted leading-relaxed">
              مع Qurbaniya، تُذبح أضحيتك على يد شيخ مؤهل، وفقاً للسنة، وتتلقى فيديو اسمياً كدليل.
            </p>
          </section>

          {/* CTA mid-article */}
          <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 md:p-8 text-center my-10">
            <h3 className="text-white font-bold text-lg md:text-xl mb-2 font-playfair">
              العيد يقترب — احجز أضحيتك
            </h3>
            <p className="text-white/70 text-sm mb-4 font-inter">
              خروف مطابق للسنة · فيديو اسمي · 140€ شامل كل شيء
            </p>
            <Link
              href="/commander"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
            >
              احجز أضحيتي <ArrowRight size={14} />
            </Link>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">الفرق بين عيد الأضحى وعيد الفطر</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              يجب عدم الخلط بين العيدين. عيد الفطر يصادف نهاية شهر رمضان، بينما عيد الأضحى يحيي ذكرى أضحية إبراهيم (عليه السلام) ويتزامن مع الحج.
            </p>
            <p className="text-text-muted leading-relaxed">
              يُعتبر عيد الأضحى أعظم أعياد الإسلام. وهو اليوم الذي يقوم فيه المسلمون القادرون بأداء الذبح الشرعي.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">قصة عيد الأضحى: أضحية إبراهيم</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              يحيي عيد الأضحى ذكرى ابتلاء إبراهيم (عليه السلام)، الذي أمره الله في الرؤيا بذبح ابنه. وفقاً للتقليد الإسلامي، هذا الابن هو <strong className="text-text-primary">إسماعيل</strong>. وقد قبل الأب والابن الأمر الإلهي بتسليم كامل.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              في لحظة الذبح، فدى الله إسماعيل بكبش من الجنة، مكافأةً على إيمان إبراهيم الراسخ. وإحياءً لذكرى هذا العمل من التسليم (<em>الإسلام</em>)، يضحي المسلمون كل عام بحيوان في العاشر من ذي الحجة.
            </p>
            <p className="text-text-muted leading-relaxed">
              ذُكرت القصة في القرآن (سورة الصافات، الآيات 100-111). أضحية العيد ليست مجرد طقس: إنها تعبير عن الطاعة الكاملة لله ومشاركة مع الأكثر فقراً (تُقسّم اللحم تقليدياً إلى ثلاثة أجزاء: الأسرة، الأقارب، الفقراء).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">حج 2026: التقويم الكامل</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              يندرج عيد الأضحى ضمن الدورة الأوسع لـ<strong className="text-text-primary">الحج</strong>، الحج الأكبر إلى مكة المكرمة، الركن الخامس من أركان الإسلام. إليك التقويم الكامل لعام 2026 (مقارنة هجري ↔ ميلادي):
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border border-gold/10 mb-4">
              <ul className="space-y-2 text-text-muted text-sm font-inter">
                <li><strong className="text-gold">8 ذو الحجة</strong> (الإثنين 25 مايو 2026) — <em>يوم التروية</em>، انطلاق الحجاج نحو منى</li>
                <li><strong className="text-gold">9 ذو الحجة</strong> (الثلاثاء 26 مايو 2026) — <em>يوم عرفة</em>، يوم عرفة (الصيام مستحب لغير الحجاج)</li>
                <li><strong className="text-gold">10 ذو الحجة</strong> (الأربعاء 27 مايو 2026) — <em>يوم النحر</em>، يوم الأضحية وعيد الأضحى</li>
                <li><strong className="text-gold">11 ذو الحجة</strong> (الخميس 28 مايو) — أول أيام التشريق</li>
                <li><strong className="text-gold">12 ذو الحجة</strong> (الجمعة 29 مايو) — ثاني أيام التشريق</li>
                <li><strong className="text-gold">13 ذو الحجة</strong> (السبت 30 مايو) — ثالث وآخر أيام التشريق</li>
              </ul>
            </div>
            <p className="text-text-muted leading-relaxed">
              بالنسبة للحجاج، 9 ذو الحجة (يوم عرفة) هو أكثر لحظات الحج كثافة: يجتمعون على جبل عرفات لدعاء الله. أما لغير الحجاج، فهو يوم يُستحب فيه الصيام بشدة.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">هل يصادف عيد الأضحى نفس اليوم في كل أنحاء العالم؟</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              <strong className="text-text-primary">ليس دائماً.</strong> رغم أن معظم الدول الإسلامية تتماشى مع القرار السعودي (طريقة الحساب الفلكي <em>أم القرى</em>)، فقد توجد فروقات بيوم واحد حسب الطريقة المعتمدة محلياً.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              في عام 2026، من المتوقع أن تتبع المناطق الجغرافية الرئيسية هذا التقويم:
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter pr-1 mb-4">
              <li>• <strong className="text-text-primary">المملكة العربية السعودية، الإمارات، مصر، الأردن</strong>: 27 مايو 2026 (حساب فلكي)</li>
              <li>• <strong className="text-text-primary">فرنسا، بلجيكا، سويسرا</strong>: 27 مايو 2026 (معظم الاتحادات تتبع القرار السعودي)</li>
              <li>• <strong className="text-text-primary">المغرب العربي (المغرب، الجزائر، تونس)</strong>: 27 مايو 2026، أحياناً +1 يوم حسب الرؤية المحلية للهلال</li>
              <li>• <strong className="text-text-primary">غرب أفريقيا (التاباسكي)</strong>: عموماً متماشٍ، قد يتأخر بـ 24 ساعة</li>
              <li>• <strong className="text-text-primary">إندونيسيا، ماليزيا، باكستان</strong>: 27 مايو 2026 متوقع، بانتظار التأكيد بالرؤية المحلية</li>
            </ul>
            <p className="text-text-muted leading-relaxed">
              يتم تأكيد التاريخ النهائي دائماً في اليوم السابق (26 مايو 2026)، بعد الرؤية الرسمية للهلال في الدول التي تتبع هذه الطريقة. في فرنسا، تُعلن <em>ليلة الشك</em> عبر المؤسسات الإسلامية الرسمية.
            </p>
          </section>
        </div>

        <LanguageSwitcher canonicalSlug="date-aid-al-adha-2026" currentLocale="ar" className="mt-12 mb-6" />

        {/* Bottom navigation */}
        <div className="mt-4 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/ar/blog" className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors font-inter text-sm">
            <ArrowLeft size={14} /> العودة إلى المدونة
          </Link>
          <Link
            href="/ar/blog/qurbani-online-kayfa-yaamal"
            className="flex items-center gap-2 text-gold font-semibold font-inter text-sm"
          >
            المقال التالي: كيف يعمل ؟ <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    </>
  );
}
