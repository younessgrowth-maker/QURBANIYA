import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight, Check, X } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import LanguageSwitcher from "@/components/blog/LanguageSwitcher";
import { blogHreflangAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "كم يبلغ ثمن خروف العيد 2026 في فرنسا؟ مقارنة بين 3 خيارات",
  description:
    "شراء خروف حيّ، أو الذهاب إلى مسلخ، أو تفويض الأضحية عبر الإنترنت؟ مقارنة شاملة بين 3 خيارات لعيد الأضحى 2026 في فرنسا، مع المعايير والتكاليف الخفية والنصائح.",
  keywords: [
    "ثمن خروف العيد 2026",
    "كم سعر الأضحية",
    "ثمن خروف الأضحية في فرنسا",
    "سعر خروف العيد فرنسا 2026",
    "تكلفة الأضحية 2026",
    "سعر الخروف الحي في فرنسا",
    "سعر كيلو لحم الخروف",
    "تعرفة المسلخ خروف",
    "تكلفة خروف العيد",
    "سعر خروف كامل في فرنسا",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/ar/blog/thaman-kharuf-eid-2026-fransa",
    languages: blogHreflangAlternates("combien-coute-mouton-aid-2026-france"),
  },
  openGraph: {
    title: "كم يبلغ ثمن خروف العيد 2026 في فرنسا؟ مقارنة بين 3 خيارات",
    description:
      "خروف حيّ أو جزّار حلال أو تفويض الأضحية: ما الخيار الأنسب لعيد 2026 في فرنسا؟ مقارنة بين 3 طرق بتكاليف حقيقية.",
    url: "https://qurbaniya.fr/ar/blog/thaman-kharuf-eid-2026-fransa",
    type: "article",
    locale: "ar",
    publishedTime: "2026-05-07T00:00:00Z",
    modifiedTime: "2026-05-07T00:00:00Z",
  },
};

function ArticleJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "كم يبلغ ثمن خروف عيد الأضحى في فرنسا 2026؟",
    author: { "@type": "Organization", name: "Qurbaniya" },
    datePublished: "2026-05-07",
    dateModified: "2026-05-07",
    publisher: {
      "@type": "Organization",
      name: "Qurbaniya",
      logo: { "@type": "ImageObject", url: "https://qurbaniya.fr/logos/qurbaniya-logo-dark.svg" },
    },
    mainEntityOfPage: "https://qurbaniya.fr/ar/blog/thaman-kharuf-eid-2026-fransa",
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
        name: "كم يبلغ ثمن خروف عيد الأضحى في فرنسا في 2026؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "يتفاوت ثمن خروف عيد الأضحى 2026 في فرنسا حسب الصيغة المختارة: 140€ لتفويض الأضحية عبر الإنترنت (شامل كل شيء)، و200 إلى 280€ لخروف جاهز للاستهلاك عند جزّار حلال، و350 إلى 450€ لخروف حيّ يُشترى من مربٍّ مع مسلخ خاص.",
        },
      },
      {
        "@type": "Question",
        name: "لماذا يبلغ ثمن الخروف 350€ عند المربّي و140€ عبر الإنترنت؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ثمن الخروف الحيّ في فرنسا مرتفع لأنه يشمل تكلفة التربية المحلية (العلف، البيطري)، والنقل، والضريبة على القيمة المضافة، وهامش الوسيط. أما تفويض الأضحية عبر الإنترنت فأرخص لأن الحيوان يُشترى مباشرة من المصدر (في الخارج غالباً) دون نقل حيّ ولا وسطاء.",
        },
      },
      {
        "@type": "Question",
        name: "كم سعر الكيلو لخروف العيد؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "يتراوح سعر الكيلو من اللحم الصافي بين 12 و18€/كغ حسب الجزّار والمنطقة. وبالتالي فإن خروفاً يزن 25 كغ من اللحم يكلّف من 300 إلى 450€. وهذا السعر لا يشمل الذبح الشرعي ولا التقطيع، اللذين يُحتسبان عادةً بشكل إضافي.",
        },
      },
      {
        "@type": "Question",
        name: "هل سعر 140€ لدى Qurbaniya شامل كل شيء؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "نعم، 140€ يشمل: شراء الحيوان المطابق للمعايير الشرعية، والذبح الشرعي على يد شيخ مختص، وفيديو شخصي عبر واتساب، والتوزيع الكامل للحم على العائلات المحتاجة. لا توجد رسوم خفية.",
        },
      },
      {
        "@type": "Question",
        name: "ما الخيار الأنسب: خروف حيّ، أو جزّار، أو عبر الإنترنت؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "خروف حيّ: لمن يرغب في حضور الذبح (لكن يستلزم مسلخاً معتمداً، إذ يُحظر قانوناً في فرنسا الذبح الشخصي خارج المسلخ). جزّار حلال: لاستلام اللحم في المنزل. عبر الإنترنت: لأداء الواجب الديني ببساطة، مع فيديو إثبات، بدون أي قيود لوجستية. الاختيار يعتمد على أولويتك: المشاركة الفعلية أم البساطة.",
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

export default function ArticleThamanKharufEid() {
  return (
    <>
      <ArticleJsonLd />
      <ArticleFaqJsonLd />
      <BreadcrumbJsonLd items={[
        { name: "الرئيسية", url: "https://qurbaniya.fr/ar" },
        { name: "المدونة", url: "https://qurbaniya.fr/ar/blog" },
        { name: "ثمن خروف العيد 2026", url: "https://qurbaniya.fr/ar/blog/thaman-kharuf-eid-2026-fransa" },
      ]} />
      <article dir="rtl" className="max-w-3xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-muted-light mb-8 font-inter">
          <Link href="/ar" className="hover:text-gold transition-colors">الرئيسية</Link>
          <span>/</span>
          <Link href="/ar/blog" className="hover:text-gold transition-colors">المدونة</Link>
          <span>/</span>
          <span className="text-text-primary">ثمن خروف العيد 2026</span>
        </nav>

        <LanguageSwitcher
          canonicalSlug="combien-coute-mouton-aid-2026-france"
          currentLocale="ar"
          className="mb-6"
        />

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full font-inter">مقارنة الأسعار</span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Calendar size={12} /> 7 مايو 2026
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Clock size={12} /> 7 دقائق قراءة
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6">
          كم يبلغ ثمن خروف <span className="text-gold">عيد الأضحى 2026</span> في فرنسا؟
        </h1>

        <p className="text-lg text-text-muted leading-relaxed mb-8 border-r-4 border-gold pr-4">
          يتراوح ثمن خروف عيد الأضحى 2026 (الأربعاء 27 مايو) في فرنسا بين <strong className="text-text-primary">140€ و450€</strong> حسب الصيغة المختارة. إليك التفاصيل الكاملة لفهم هذا الفارق، وما هو مشمول، وكيف تختار حسب وضعك.
        </p>

        {/* Quick answer */}
        <div className="bg-gold/5 border border-gold/20 rounded-xl p-5 md:p-6 mb-10">
          <h3 className="text-gold font-bold text-sm uppercase tracking-wider mb-3 font-inter">إجابة سريعة</h3>
          <ul className="space-y-2 text-text-muted text-sm font-inter">
            <li className="flex items-start gap-2"><Check size={16} className="text-gold mt-0.5 flex-shrink-0" /><span><strong className="text-text-primary">تفويض الأضحية عبر الإنترنت</strong>: 140€ شامل كل شيء (الحيوان + الذبح الحلال + الفيديو + التوزيع)</span></li>
            <li className="flex items-start gap-2"><Check size={16} className="text-gold mt-0.5 flex-shrink-0" /><span><strong className="text-text-primary">خروف جاهز للاستهلاك</strong> عند جزّار حلال: من 200 إلى 280€ (ذبيحة مقطّعة)</span></li>
            <li className="flex items-start gap-2"><Check size={16} className="text-gold mt-0.5 flex-shrink-0" /><span><strong className="text-text-primary">خروف حيّ + مسلخ خاص</strong>: من 350 إلى 450€ (الحيوان + النقل + الذبح)</span></li>
          </ul>
        </div>

        <div className="prose-custom space-y-8">
          {/* Section 1 — The 3 options */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">الطرق الثلاث للحصول على خروف عيد 2026</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              في فرنسا، تتعايش ثلاث صيغ رئيسية لأداء أضحية العيد. ولكل واحدة منها سعر، وقيود، ومستوى مختلف من الالتزام.
            </p>

            <div className="space-y-4 mt-6">
              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <div className="flex items-baseline justify-between mb-2 gap-3 flex-wrap">
                  <h3 className="font-bold text-text-primary">1. تفويض الأضحية عبر الإنترنت</h3>
                  <span className="text-gold font-bold text-lg whitespace-nowrap">140€</span>
                </div>
                <p className="text-sm text-text-muted mb-2">
                  تطلب عبر الإنترنت، ويتم تنفيذ الأضحية باسمك على يد شيخ مختصّ، وتستلم فيديو شخصياً عبر واتساب. ويُوزَّع اللحم على العائلات المحتاجة.
                </p>
                <p className="text-xs text-text-muted-light font-inter">
                  <strong className="text-text-primary">الميزة</strong>: لا توجد أي قيود لوجستية، مطابقة للسنّة، فيديو إثبات. <strong className="text-text-primary">العيب</strong>: لا تستلم اللحم.
                </p>
              </div>

              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <div className="flex items-baseline justify-between mb-2 gap-3 flex-wrap">
                  <h3 className="font-bold text-text-primary">2. خروف جاهز للاستهلاك (جزارة حلال)</h3>
                  <span className="text-gold font-bold text-lg whitespace-nowrap">200-280€</span>
                </div>
                <p className="text-sm text-text-muted mb-2">
                  تطلب عند جزّار حلال يتولّى الذبح الشرعي. وتستلم الذبيحة المقطّعة (مع الرأس أو بدونه حسب رغبتك).
                </p>
                <p className="text-xs text-text-muted-light font-inter">
                  <strong className="text-text-primary">الميزة</strong>: تحتفظ باللحم لعائلتك. <strong className="text-text-primary">العيب</strong>: تتبّع الاسم (النية) على الحيوان بعينه ليس مضموناً دائماً دون حجز صريح.
                </p>
              </div>

              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <div className="flex items-baseline justify-between mb-2 gap-3 flex-wrap">
                  <h3 className="font-bold text-text-primary">3. خروف حيّ + مسلخ معتمد</h3>
                  <span className="text-gold font-bold text-lg whitespace-nowrap">350-450€</span>
                </div>
                <p className="text-sm text-text-muted mb-2">
                  شراء خروف حيّ من المربّي (≈250-350€)، ثم النقل إلى مسلخ معتمد يمارس الذبح الشرعي (≈80-150€ إضافية كرسوم ذبح وتقطيع).
                </p>
                <p className="text-xs text-text-muted-light font-inter">
                  <strong className="text-text-primary">الميزة</strong>: إمكانية حضور الذبح. <strong className="text-text-primary">العيب</strong>: الذبح بنفسك في المنزل <strong className="text-text-primary">غير قانوني في فرنسا</strong> (عقوبة جنائية، المادة R214-78 من قانون الريف). يجب أن يتم الذبح إلزامياً في مسلخ معتمد.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 — Why this price gap */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">لماذا هذا الفارق الكبير في السعر (140€ مقابل 450€)؟</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              يُفسَّر الفارق بين 140€ و450€ بأربعة عوامل رئيسية:
            </p>
            <ul className="space-y-3 text-text-muted font-inter">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">1</span>
                <span><strong className="text-text-primary">تكلفة التربية المحلية</strong> — تربية الخروف في فرنسا مكلفة (العلف، الأرض، البيطري، المعايير). أما على المستوى الدولي فتكلفة التربية أقل بكثير.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">2</span>
                <span><strong className="text-text-primary">النقل</strong> — نقل حيوان حيّ إلى مسلخ معتمد في فرنسا يضيف بسهولة من 30 إلى 80€.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">3</span>
                <span><strong className="text-text-primary">الضريبة والوسطاء</strong> — ضريبة القيمة المضافة 5.5٪ على اللحم + هامش المربّي + هامش الجزّار، تتراكم لتُضيف من 20 إلى 35٪ على سعر التكلفة.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">4</span>
                <span><strong className="text-text-primary">النموذج الاقتصادي</strong> — تفويض الأضحية عبر الإنترنت يُجمِّع التكاليف (موقع ذبح واحد، مئات الخراف)، مما يسمح بالوصول إلى 140€ شاملاً كل شيء.</span>
              </li>
            </ul>
          </section>

          {/* Section 3 — Comparison table */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">جدول مقارنة مفصّل</h2>
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <table className="w-full text-sm font-inter min-w-[640px] mx-4 md:mx-0">
                <thead>
                  <tr className="border-b-2 border-gold/30">
                    <th className="text-right py-3 px-3 font-bold text-text-primary">المعيار</th>
                    <th className="text-right py-3 px-3 font-bold text-text-primary">عبر الإنترنت (140€)</th>
                    <th className="text-right py-3 px-3 font-bold text-text-primary">جزّار حلال (200-280€)</th>
                    <th className="text-right py-3 px-3 font-bold text-text-primary">حيّ + مسلخ (350-450€)</th>
                  </tr>
                </thead>
                <tbody className="text-text-muted">
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-3 font-semibold">المطابقة للسنّة</td>
                    <td className="py-3 px-3"><Check className="text-green-600" size={18} /></td>
                    <td className="py-3 px-3"><Check className="text-green-600" size={18} /></td>
                    <td className="py-3 px-3"><Check className="text-green-600" size={18} /></td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-3 font-semibold">فيديو شخصي</td>
                    <td className="py-3 px-3"><Check className="text-green-600" size={18} /></td>
                    <td className="py-3 px-3"><X className="text-red-500" size={18} /></td>
                    <td className="py-3 px-3"><X className="text-red-500" size={18} /></td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-3 font-semibold">تستلم اللحم</td>
                    <td className="py-3 px-3"><X className="text-red-500" size={18} /></td>
                    <td className="py-3 px-3"><Check className="text-green-600" size={18} /></td>
                    <td className="py-3 px-3"><Check className="text-green-600" size={18} /></td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-3 font-semibold">التوزيع على المحتاجين</td>
                    <td className="py-3 px-3"><Check className="text-green-600" size={18} /></td>
                    <td className="py-3 px-3">اختياري</td>
                    <td className="py-3 px-3">يجب تنظيمه</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-3 font-semibold">الإجراءات اللوجستية</td>
                    <td className="py-3 px-3">لا شيء</td>
                    <td className="py-3 px-3">استلام من الجزّار</td>
                    <td className="py-3 px-3">المربّي + النقل + المسلخ</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-3 font-semibold">مهلة الحجز</td>
                    <td className="py-3 px-3">قبل يوم</td>
                    <td className="py-3 px-3">قبل 7 إلى 15 يوماً</td>
                    <td className="py-3 px-3">قبل 30 يوماً أو أكثر</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* CTA mid-article */}
          <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 md:p-8 text-center my-10">
            <h3 className="text-white font-bold text-lg md:text-xl mb-2 font-playfair">
              الخيار الأبسط: 140€ شاملاً كل شيء
            </h3>
            <p className="text-white/70 text-sm mb-4 font-inter">
              أضحية شرعية · فيديو شخصي عبر واتساب · توزيع على المحتاجين
            </p>
            <Link
              href="/commander"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
            >
              احجز أضحيتي <ArrowRight size={14} />
            </Link>
          </div>

          {/* Section 4 — Which choice for your situation */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">أي خيار تختار حسب وضعك؟</h2>

            <div className="space-y-5">
              <div>
                <h3 className="font-bold text-text-primary mb-2">← تريد أداء الواجب الشرعي ببساطة، دون قيود</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  تفويض الأضحية عبر الإنترنت هو الخيار الأكثر منطقية: 140€، مطابق للسنّة وفق المذاهب الفقهية الأربعة، فيديو شخصي كإثبات، واللحم يذهب مباشرة إلى العائلات المحتاجة. لا لوجستيات، ولا تقطيع، ولا مشاكل تخزين في الفريزر.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-text-primary mb-2">← تريد اللحم لعائلتك</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  الجزّار الحلال هو الخيار المناسب. احجز مبكراً (قبل 7 أيام على الأقل) مع جزّار موثوق. تأكد من أن <em>التسمية</em> تذكر اسمك وأن تتبّع الحيوان مضمون.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-text-primary mb-2">← تريد حضور الأضحية</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  هذا ممكن فقط عبر مسلخ معتمد يقبل الأفراد (وهذا نادر عملياً). <strong className="text-text-primary">الذبح بنفسك خارج المسلخ غير قانوني في فرنسا</strong>، ويعرّضك لعقوبات جنائية (المادة R214-78 وما يليها من قانون الريف). تأكّد جيداً قبل اختيار هذا الخيار.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 — Price per kilo */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">وماذا عن سعر كيلو لحم الخروف في فرنسا؟</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              إذا اشتريت من الجزارة خارج فترة العيد، فإن سعر الكيلو من اللحم الصافي يتراوح بين <strong className="text-text-primary">12 و18€/كغ</strong> حسب المنطقة والجودة (خروف من المروج المالحة، حملان سيستيرون، خروف عادي). يزن خروف العيد في المتوسط من 20 إلى 30 كغ من اللحم، مما يعطي سعراً بين 240 و540€ — دون احتساب الذبح الشرعي ولا التقطيع.
            </p>
            <p className="text-text-muted leading-relaxed">
              في فترة العيد، ترتفع الأسعار من 10 إلى 25٪ بسبب الطلب. وهنا تكمن بالضبط أهمية تفويض الأضحية عبر الإنترنت: سعر ثابت (140€)، محجوز بعيداً عن الارتفاع الموسمي.
            </p>
          </section>

          {/* Section 6 — Internal links */}
          <section className="bg-bg-secondary rounded-xl p-5 md:p-6 border border-gold/10">
            <h3 className="text-gold font-bold text-sm uppercase tracking-wider mb-3 font-inter">للاستزادة</h3>
            <ul className="space-y-2 text-sm font-inter">
              <li>
                <Link href="/ar/blog/siar-al-kharuf-fransa-2026" className="text-text-primary hover:text-gold transition-colors">
                  ← سعر الخروف في فرنسا 2026: لماذا التفويض أذكى
                </Link>
              </li>
              <li>
                <Link href="/ar/blog/tarikh-eid-al-adha-2026" className="text-text-primary hover:text-gold transition-colors">
                  ← تاريخ عيد الأضحى 2026: الأربعاء 27 مايو
                </Link>
              </li>
              <li>
                <Link href="/ar/blog/qurbani-online-kayfa-yaamal" className="text-text-primary hover:text-gold transition-colors">
                  ← أضحية العيد عبر الإنترنت: كيف تعمل؟
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-text-primary hover:text-gold transition-colors">
                  ← الأسئلة الشائعة لعيد الأضحى 2026 — أضحية الخروف عبر الإنترنت
                </Link>
              </li>
            </ul>
          </section>
        </div>

        <LanguageSwitcher
          canonicalSlug="combien-coute-mouton-aid-2026-france"
          currentLocale="ar"
          className="mt-12 mb-6"
        />

        {/* Bottom navigation */}
        <div className="mt-4 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/ar/blog" className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors font-inter text-sm">
            <ArrowLeft size={14} /> العودة إلى المدونة
          </Link>
          <Link
            href="/commander"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-5 py-2.5 rounded-xl transition-colors font-inter"
          >
            اطلب بـ 140€ <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    </>
  );
}
