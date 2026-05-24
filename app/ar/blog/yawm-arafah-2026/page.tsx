import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import LanguageSwitcher from "@/components/blog/LanguageSwitcher";
import { blogHreflangAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "🌙 يوم عرفة 2026: الثلاثاء 26 مايو · الصيام والفضائل والأدعية",
  description:
    "📅 يوم عرفة 2026 يوافق الثلاثاء 26 مايو (9 ذو الحجة 1447). صيامه سنة مؤكدة، فضائله عظيمة (تكفير ذنوب سنتين)، والأدعية وارتباطه بعيد الأضحى يوم 27 مايو 🐑",
  keywords: [
    "يوم عرفة 2026",
    "تاريخ يوم عرفة 2026",
    "صيام يوم عرفة 2026",
    "فضل يوم عرفة",
    "ثواب يوم عرفة",
    "دعاء يوم عرفة",
    "9 ذو الحجة 2026",
    "yawm arafah",
    "yawm arafa",
    "عرفة عيد الأضحى",
    "كيفية صيام يوم عرفة",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/ar/blog/yawm-arafah-2026",
    languages: blogHreflangAlternates("jour-arafat-2026"),
  },
  openGraph: {
    title: "🌙 يوم عرفة 2026: الثلاثاء 26 مايو · الصيام والفضائل والأدعية",
    description:
      "📅 يوم عرفة 2026 يوافق الثلاثاء 26 مايو 2026. صيامه سنة مؤكدة، وأدعية، وارتباطه بعيد الأضحى 🐑",
    url: "https://qurbaniya.fr/ar/blog/yawm-arafah-2026",
    type: "article",
    locale: "ar",
    publishedTime: "2026-05-24T00:00:00Z",
    modifiedTime: "2026-05-24T00:00:00Z",
  },
};

function ArticleJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "يوم عرفة 2026: يوافق الثلاثاء 26 مايو — الصيام والفضائل والأدعية",
    author: { "@type": "Organization", name: "Qurbaniya" },
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
    publisher: {
      "@type": "Organization",
      name: "Qurbaniya",
      logo: {
        "@type": "ImageObject",
        url: "https://qurbaniya.fr/logos/qurbaniya-logo-dark.svg",
      },
    },
    mainEntityOfPage: "https://qurbaniya.fr/ar/blog/yawm-arafah-2026",
    inLanguage: "ar",
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
        name: "ما هو تاريخ يوم عرفة في عام 2026؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "يوافق يوم عرفة 2026 يوم الثلاثاء 26 مايو 2026، الموافق لـ 9 ذو الحجة 1447 هـ في التقويم الهجري. وهو اليوم الذي يسبق عيد الأضحى (الأربعاء 27 مايو 2026).",
        },
      },
      {
        "@type": "Question",
        name: "هل يجب صيام يوم عرفة؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "صيام يوم عرفة سنة مؤكدة لجميع المسلمين غير الحجاج. ووفقاً للحديث الصحيح الذي رواه مسلم، فإن هذا الصيام يكفر ذنوب السنة الماضية والسنة القادمة. أما الحجاج فلا يصومون هذا اليوم.",
        },
      },
      {
        "@type": "Question",
        name: "متى يبدأ وينتهي صيام يوم عرفة؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "يتبع صيام يوم عرفة نفس قواعد الصيام الإسلامي: من طلوع الفجر إلى غروب الشمس (المغرب). في فرنسا في 26 مايو 2026، يكون الفجر حوالي الساعة 4:00 - 4:30 صباحاً وغروب الشمس حوالي 21:30 - 21:45 حسب المدينة. راجع مواقيت الصلاة في مسجدك المحلي للحصول على الأوقات الدقيقة.",
        },
      },
      {
        "@type": "Question",
        name: "ما هو أفضل دعاء في يوم عرفة؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "قال النبي ﷺ: «خير الدعاء دعاء يوم عرفة، وخير ما قلتُ أنا والنبيون من قبلي: لا إله إلا الله وحده لا شريك له، له الملك وله الحمد، وهو على كل شيء قدير» (رواه الترمذي). ويُستحب كذلك الإكثار من ذكر الله والاستغفار والأدعية الشخصية طوال هذا اليوم.",
        },
      },
      {
        "@type": "Question",
        name: "ما العلاقة بين يوم عرفة وعيد الأضحى؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "يوم عرفة هو اليوم السابق مباشرة لعيد الأضحى. وهو يوم 9 ذو الحجة، أهم أيام الحج: يجتمع الحجاج على جبل عرفات للدعاء إلى الله. وفي اليوم التالي (10 ذو الحجة، الأربعاء 27 مايو 2026) يكون عيد الأضحى والذبح.",
        },
      },
      {
        "@type": "Question",
        name: "هل يجوز صيام يوم عرفة فقط دون باقي أيام ذي الحجة؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "نعم، تماماً. صيام يوم عرفة وحده سنة قائمة بذاتها، مستقلة عن صيام الأيام التسعة الأولى من ذي الحجة (والتي هي أيضاً مستحبة لكنها اختيارية). كثير من المسلمين يصومون يوم عرفة فقط لعظم الأجر الذي بشّر به النبي ﷺ.",
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

export default function ArticleYawmArafah() {
  return (
    <>
      <ArticleJsonLd />
      <ArticleFaqJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "الرئيسية", url: "https://qurbaniya.fr/ar" },
          { name: "المدونة", url: "https://qurbaniya.fr/ar/blog" },
          {
            name: "يوم عرفة 2026",
            url: "https://qurbaniya.fr/ar/blog/yawm-arafah-2026",
          },
        ]}
      />
      <article dir="rtl" className="max-w-3xl mx-auto px-4">
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
          <span className="text-text-primary">يوم عرفة 2026</span>
        </nav>

        <LanguageSwitcher
          canonicalSlug="jour-arafat-2026"
          currentLocale="ar"
          className="mb-6"
        />

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full font-inter">
            دليل ديني
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Calendar size={12} /> نُشر في 24 مايو 2026
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Clock size={12} /> 7 دقائق قراءة
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6">
          يوم عرفة 2026: يوم{" "}
          <span className="text-gold">الثلاثاء 26 مايو 2026</span>
        </h1>

        <p className="text-lg text-text-muted leading-relaxed mb-8 border-r-4 border-gold pr-4">
          يوم عرفة — <em>يوم عرفة</em>،{" "}
          <strong className="text-text-primary">9 ذو الحجة 1447 هـ</strong>{" "}
          — يوافق <strong className="text-text-primary">الثلاثاء 26 مايو 2026</strong>، وهو اليوم السابق لعيد الأضحى. وهو من أعظم أيام السنة الإسلامية بركةً: صيامه سنة مؤكدة ويكفّر ذنوب سنتين. إليك كل ما تحتاج معرفته.
        </p>

        {/* Quick summary card */}
        <div className="bg-bg-secondary rounded-xl p-6 border border-gold/10 mb-10">
          <h2 className="text-gold font-bold text-sm uppercase tracking-wider mb-3 font-inter">
            الخلاصة في 30 ثانية
          </h2>
          <ul className="space-y-2 text-text-muted text-sm font-inter">
            <li>
              📅 <strong className="text-text-primary">التاريخ:</strong> الثلاثاء 26 مايو 2026 (9 ذو الحجة 1447 هـ)
            </li>
            <li>
              🌙 <strong className="text-text-primary">يسبق:</strong> عيد الأضحى (الأربعاء 27 مايو 2026)
            </li>
            <li>
              🤲 <strong className="text-text-primary">المستحب:</strong> الصيام والإكثار من الأدعية
            </li>
            <li>
              ✨ <strong className="text-text-primary">الأجر:</strong> تكفير ذنوب السنة الماضية والسنة القادمة
            </li>
            <li>
              🚫 <strong className="text-text-primary">استثناء:</strong> الحجاج لا يصومون هذا اليوم
            </li>
          </ul>
        </div>

        {/* Content */}
        <div className="prose-custom space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              متى يوافق يوم عرفة في عام 2026 بالضبط؟
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              يُحتفل بيوم عرفة في{" "}
              <strong className="text-text-primary">9 ذو الحجة</strong> من كل عام هجري. وفي عام 2026، يوافق ذلك{" "}
              <strong className="text-text-primary">الثلاثاء 26 مايو 2026</strong> وفقاً للحسابات الفلكية المعتمدة لدى أغلب الاتحادات الإسلامية في فرنسا وعلى المستوى الدولي.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              هذا التاريخ يتوافق مع التاريخ المؤكد لعيد الأضحى (الأربعاء 27 مايو 2026)، إذ يقع يوم عرفة دائماً في اليوم السابق ليوم النحر.
            </p>
            <p className="text-text-muted leading-relaxed">
              وبالنسبة للحجاج في مكة المكرمة، فإن يوم 9 ذو الحجة هو يوم الوقوف العظيم على{" "}
              <strong className="text-text-primary">جبل عرفات</strong>، على بُعد نحو 20 كم من مكة. وهو الركن الأعظم في الحج: فلا يصح الحج دون هذا الوقوف.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              لماذا يوم عرفة بهذه الأهمية العظيمة؟
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              يوم عرفة، عند كثير من العلماء، هو{" "}
              <strong className="text-text-primary">أفضل أيام السنة الإسلامية</strong>. وقد وردت أحاديث صحيحة عديدة تؤكد أهميته الاستثنائية:
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border-r-4 border-gold mb-4">
              <p className="text-text-primary italic leading-relaxed">
                «ما من يوم أكثر من أن يُعتق الله فيه عبداً من النار من يوم عرفة».
              </p>
              <p className="text-text-muted-light text-sm mt-2 font-inter">
                — رواه مسلم (رقم 1348)، عن عائشة رضي الله عنها
              </p>
            </div>
            <p className="text-text-muted leading-relaxed mb-4">
              وفي هذا اليوم أيضاً، في حجة الوداع (10 هـ)، نزل على النبي محمد ﷺ الآية التي أتمّت الدين:
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border-r-4 border-gold mb-4">
              <p className="text-text-primary leading-relaxed font-bold">
                ٱلْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِي وَرَضِيتُ لَكُمُ ٱلْإِسْلَامَ دِينًا
              </p>
              <p className="text-text-muted-light text-sm mt-2 font-inter">
                — القرآن الكريم، سورة المائدة (5:3)
              </p>
            </div>
            <p className="text-text-muted leading-relaxed">
              هذه الآية، التي نزلت يوم الجمعة على جبل عرفات، تُؤذِن باكتمال الوحي. ولذلك يحمل يوم عرفة بعداً تاريخياً وروحياً وأخروياً عظيماً في آنٍ معاً.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              صيام يوم عرفة: أحكامه وثوابه
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              صيام يوم عرفة{" "}
              <strong className="text-text-primary">سنة مؤكدة</strong> لكل مسلم غير حاج. قال النبي ﷺ:
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border-r-4 border-gold mb-4">
              <p className="text-text-primary italic leading-relaxed">
                «صيام يوم عرفة، أحتسب على الله أن يكفّر السنة التي قبله والسنة التي بعده».
              </p>
              <p className="text-text-muted-light text-sm mt-2 font-inter">
                — رواه مسلم (رقم 1162)، عن أبي قتادة رضي الله عنه
              </p>
            </div>
            <p className="text-text-muted leading-relaxed mb-4">
              عملياً، يخضع هذا الصيام لنفس أحكام الصيام الإسلامي:
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter pr-1 mb-4">
              <li>
                • <strong className="text-text-primary">البداية:</strong> طلوع الفجر — في فرنسا يوم 26 مايو 2026، حوالي الساعة 4:00 - 4:30 حسب المدينة
              </li>
              <li>
                • <strong className="text-text-primary">النهاية:</strong> غروب الشمس (المغرب) — حوالي الساعة 21:30 - 21:45 في فرنسا
              </li>
              <li>
                • <strong className="text-text-primary">النية:</strong> تُعقد ليلة الصيام أو قبل طلوع الفجر
              </li>
              <li>
                • <strong className="text-text-primary">المفطرات:</strong> الأكل والشرب والتدخين والمعاشرة الزوجية خلال النهار
              </li>
            </ul>
            <p className="text-text-muted leading-relaxed mb-4">
              <strong className="text-text-primary">ملاحظة مهمة:</strong> الحجاج في عرفة <em>لا يصومون</em> هذا اليوم، اقتداءً بسنة النبي ﷺ الذي لم يصمه في حجة الوداع. فالصيام مشروع لغير الحجاج.
            </p>
            <p className="text-text-muted leading-relaxed">
              أما النساء في الحيض أو النفاس، والمرضى، والمسافرون، وكبار السن الذين لا يقدرون على الصيام: فلا حرج عليهم، ويبقى أجر الأعمال الصالحة في هذا اليوم متاحاً من خلال أبواب أخرى (الذكر والصدقة والدعاء).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              الأدعية والأذكار المستحبة
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              قال النبي ﷺ:
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border-r-4 border-gold mb-4">
              <p className="text-text-primary italic leading-relaxed">
                «خير الدعاء دعاء يوم عرفة، وخير ما قلتُ أنا والنبيون من قبلي:
              </p>
              <p className="text-text-primary font-bold mt-3 leading-relaxed">
                لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ
              </p>
              <p className="text-text-muted-light text-sm mt-2 font-inter">
                — رواه الترمذي (رقم 3585)
              </p>
            </div>
            <p className="text-text-muted leading-relaxed mb-4">
              إضافة إلى كلمة التوحيد هذه، يُستحب اغتنام هذا اليوم في:
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter pr-1 mb-4">
              <li>
                • الإكثار من <strong className="text-text-primary">الذكر</strong> (سبحان الله، والحمد لله، والله أكبر)
              </li>
              <li>
                • <strong className="text-text-primary">الاستغفار</strong> للنفس والأهل وجميع الأمة
              </li>
              <li>
                • <strong className="text-text-primary">الدعاء الشخصي</strong> — فهو يوم تُستجاب فيه الأدعية بشكل خاص
              </li>
              <li>
                • <strong className="text-text-primary">قراءة القرآن</strong> والتدبر في معانيه
              </li>
              <li>
                • إخراج <strong className="text-text-primary">الصدقة</strong> للمحتاجين
              </li>
            </ul>
            <p className="text-text-muted leading-relaxed">
              يوصي كثير من العلماء بتخصيص الساعات التي تسبق غروب الشمس للدعاء بصفة خاصة، لأن ذلك هو الوقت الذي يكون فيه الحجاج في عرفة في ذروة وقوفهم ودعائهم.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              العلاقة بين يوم عرفة وعيد الأضحى
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              يوم عرفة ليس حدثاً منعزلاً: بل هو <strong className="text-text-primary">المقدمة المباشرة</strong> لعيد الأضحى. وفيما يلي تتابع الأيام الثلاثة الأساسية:
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border border-gold/10 mb-4">
              <ul className="space-y-3 text-text-muted text-sm font-inter">
                <li className="flex items-start gap-3">
                  <span className="text-gold font-bold whitespace-nowrap">8 ذو الحجة</span>
                  <span>
                    <strong className="text-text-primary">الاثنين 25 مايو 2026</strong> — <em>يوم التروية</em>، اليوم الذي ينتقل فيه الحجاج إلى منى
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold font-bold whitespace-nowrap">9 ذو الحجة</span>
                  <span>
                    <strong className="text-text-primary">الثلاثاء 26 مايو 2026</strong> — <em>يوم عرفة</em> (الصيام والدعاء)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold font-bold whitespace-nowrap">10 ذو الحجة</span>
                  <span>
                    <strong className="text-text-primary">الأربعاء 27 مايو 2026</strong> — <em>يوم النحر</em>، عيد الأضحى والذبح
                  </span>
                </li>
              </ul>
            </div>
            <p className="text-text-muted leading-relaxed mb-4">
              <strong className="text-text-primary">الأضحية</strong> هي الشعيرة المحورية في يوم العيد. ووفقاً للمذاهب السنية الأربعة، يجوز للمسلم أن يذبح بنفسه أو يوكّل غيره (التوكيل) — وهي ممارسة تعود إلى الصحابة رضي الله عنهم.
            </p>
            <p className="text-text-muted leading-relaxed">
              إذا لم تُنظِّم أضحيتك بعد، فإن يوم عرفة هو{" "}
              <strong className="text-text-primary">آخر فرصة مثالية</strong> لذلك — أي عشية يوم العيد. تبقى الأضحية صحيحة خلال الأيام الأربعة التالية ليوم عرفة (27، 28، 29 و30 مايو 2026)، لكن الأفضل ترتيبها قبل دخولك في هذا اليوم المبارك.
            </p>
          </section>

          {/* CTA Box — central conversion bridge */}
          <div className="bg-gradient-to-br from-gold/10 via-bg-secondary to-gold/10 rounded-2xl border-2 border-gold/30 p-6 md:p-8 my-10">
            <h3 className="text-xl md:text-2xl font-black text-text-primary mb-3">
              لم تحجز أضحيتك بعد لعيد 2026؟
            </h3>
            <p className="text-text-muted leading-relaxed mb-5">
              تقوم Qurbaniya بتنظيم أضحيتك في مدغشقر وفق أحكام السنة، مع <strong className="text-text-primary">فيديو باسمك عبر واتساب خلال 24 ساعة</strong>. توزّع اللحوم على الأسر المحتاجة هناك.
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter mb-5">
              <li>✓ 140 € شاملة كل شيء</li>
              <li>✓ أضحية على السنة، بإشراف شيخ</li>
              <li>✓ فيديو باسمك يُرسل عبر واتساب والبريد الإلكتروني</li>
              <li>✓ الحجز مفتوح حتى الأربعاء 27 مايو الساعة 3 صباحاً</li>
            </ul>
            <Link
              href="/commander"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-5 py-3 rounded-xl transition-colors font-inter"
            >
              احجز أضحيتي <ArrowRight size={16} />
            </Link>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              وماذا بعد عرفة؟ أيام التشريق
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              مباشرة بعد عيد الأضحى (27 مايو) تأتي{" "}
              <strong className="text-text-primary">أيام التشريق</strong> (28، 29 و30 مايو 2026). خلال هذه الأيام الثلاثة:
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter pr-1 mb-4">
              <li>
                • <strong className="text-text-primary">تبقى الأضحية صحيحة</strong> إلى غروب شمس يوم 30 مايو
              </li>
              <li>
                • يستمر <strong className="text-text-primary">التكبير</strong> (الله أكبر، الله أكبر، لا إله إلا الله…) بعد كل صلاة مفروضة، إلى صلاة العصر من يوم 30 مايو
              </li>
              <li>
                • <strong className="text-text-primary">الصيام فيها محرّم</strong> عند جمهور المذاهب، لأنها «أيام أكل وشرب وذكر لله»
              </li>
            </ul>
            <p className="text-text-muted leading-relaxed">
              لمزيد من التفاصيل حول التقويم الكامل لشهر ذي الحجة، راجع{" "}
              <Link
                href="/ar/blog/tarikh-eid-al-adha-2026"
                className="text-gold hover:underline font-semibold"
              >
                مقالنا المخصص لتاريخ عيد الأضحى 2026
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              ماذا أفعل إن لم أستطع صيام يوم عرفة؟
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              الصيام ليس إلا باباً واحداً من أبواب العبادة المفتوحة في هذا اليوم. إن كنتَ معذوراً عن الصيام (مرض، سفر، حيض، نفاس، رضاعة…)، فبإمكانك أن تنال بركة يوم عرفة من خلال:
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter pr-1 mb-4">
              <li>
                • <strong className="text-text-primary">الإكثار من الدعاء</strong> — فهو اليوم الذي تُستجاب فيه الأدعية أكثر من سواه
              </li>
              <li>
                • <strong className="text-text-primary">الصدقة</strong>: العطاء للمحتاجين ودعم القضايا الدينية
              </li>
              <li>
                • <strong className="text-text-primary">قراءة القرآن وتدبره</strong>
              </li>
              <li>
                • <strong className="text-text-primary">المداومة على الذكر</strong> طوال اليوم، وخاصة كلمة التوحيد
              </li>
              <li>
                • <strong className="text-text-primary">تجهيز أضحية العيد</strong> إن لم تكن قد فعلت — فهي عبادة عظيمة بحد ذاتها
              </li>
            </ul>
            <p className="text-text-muted leading-relaxed">
              النية الصادقة والجهد الذي تبذله في هذا اليوم هي بحد ذاتها عبادات يُؤجَر عليها العبد، مهما اختلفت صورها.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              الأسئلة الشائعة حول يوم عرفة
            </h2>
            <div className="space-y-4">
              <details className="group bg-white border border-gray-100/80 rounded-card p-5 shadow-soft">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between">
                  هل صيام يوم عرفة واجب؟
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  لا، ليس بفرض، بل هو <strong className="text-text-primary">سنة مؤكدة</strong>. وقد رغّب فيه النبي ﷺ ترغيباً شديداً مع ذكر أجره الفريد (تكفير ذنوب سنتين). وعدم صيامه ليس بإثم، لكنه تفويت لفرصة روحية استثنائية.
                </p>
              </details>

              <details className="group bg-white border border-gray-100/80 rounded-card p-5 shadow-soft">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between">
                  هل ينبغي صيام الأيام الثمانية التي تسبق يوم عرفة أيضاً؟
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  صيام <strong className="text-text-primary">التسع الأول من ذي الحجة</strong> (من 17 إلى 25 مايو 2026 في فرنسا) سنة بحسب عدة أحاديث. وقد قال النبي ﷺ إن العمل في هذه الأيام العشر الأولى أحبّ إلى الله. لكنه ليس شرطاً: يمكن للمسلم أن يصوم يوم عرفة وحده (9 ذو الحجة) إن لم يستطع صيام الأيام الأخرى.
                </p>
              </details>

              <details className="group bg-white border border-gray-100/80 rounded-card p-5 shadow-soft">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between">
                  هل يقع يوم عرفة في نفس اليوم في جميع أنحاء العالم؟
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  <em>أغلب</em> الدول تتبع التاريخ السعودي (الثلاثاء 26 مايو 2026)، لأنه اليوم الذي يقف فيه الحجاج بعرفة في مكة. وقد تتأخر بعض الدول يوماً واحداً وفقاً للرؤية الشرعية المحلية للهلال. في فرنسا، تتبنى أغلب الاتحادات التاريخ السعودي، أي الثلاثاء 26 مايو 2026.
                </p>
              </details>

              <details className="group bg-white border border-gray-100/80 rounded-card p-5 shadow-soft">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between">
                  ماذا أفعل إن نسيتُ عقد النية للصيام من الليل؟
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  في صيام التطوع كصيام عرفة، يمكن عقد النية <strong className="text-text-primary">في النهار</strong>، ما لم تكن قد أكلت أو شربت منذ طلوع الفجر. وهذا تيسير ثبت في صيام النفل. فإن استيقظت صباح 26 مايو 2026 ولم تتناول شيئاً، فبإمكانك عقد النية في تلك اللحظة والشروع في الصيام.
                </p>
              </details>

              <details className="group bg-white border border-gray-100/80 rounded-card p-5 shadow-soft">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between">
                  ما الفرق بين يوم عرفة وفريضة الحج؟
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  <strong className="text-text-primary">الحج</strong> هو الرحلة الكاملة إلى مكة المكرمة (الركن الخامس من أركان الإسلام)، ويمتد على عدة أيام (من 8 إلى 13 ذو الحجة). أما <strong className="text-text-primary">يوم عرفة</strong> (9 ذو الحجة) فهو <em>يوم واحد محدد</em> من أيام الحج، يُعدّ ركنه الأعظم. ولغير الحجاج، فهو يوم عبادة مكثفة بالصيام والدعاء دون الحاجة إلى السفر.
                </p>
              </details>
            </div>
          </section>
        </div>

        <LanguageSwitcher
          canonicalSlug="jour-arafat-2026"
          currentLocale="ar"
          className="mt-10"
        />

        {/* Bottom navigation */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/ar/blog"
            className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors font-inter text-sm"
          >
            <ArrowLeft size={14} /> العودة إلى المدونة
          </Link>
          <Link
            href="/ar/blog/tarikh-eid-al-adha-2026"
            className="flex items-center gap-2 text-gold font-semibold font-inter text-sm"
          >
            المقال التالي: تاريخ عيد الأضحى 2026 <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    </>
  );
}
