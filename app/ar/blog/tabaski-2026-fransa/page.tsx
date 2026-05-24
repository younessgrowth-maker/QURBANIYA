import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import LanguageSwitcher from "@/components/blog/LanguageSwitcher";
import { blogHreflangAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "تاباسكي 2026 من فرنسا: 27 مايو · أضحية حلال بـ 140€ 🐑",
  description:
    "تاباسكي 2026 يوافق الأربعاء 27 مايو. الجالية الإفريقية في فرنسا؟ توكيل الأضحية الحلال، فيديو باسمك، توزيع اللحم على الأسر المحتاجة. 140€ شامل كل شيء.",
  keywords: [
    "تاباسكي 2026",
    "tabaski 2026",
    "tabaski 2026 fransa",
    "تاباسكي فرنسا 2026",
    "توكيل أضحية تاباسكي",
    "تاباسكي من فرنسا",
    "عيد الأضحى 2026 السنغال",
    "أضحية تاباسكي السنغال مالي",
    "tabaski delegate",
    "tabaski from france",
    "أضحية أونلاين 2026",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/ar/blog/tabaski-2026-fransa",
    languages: blogHreflangAlternates("tabaski-2026-france"),
  },
  openGraph: {
    title: "🐑 تاباسكي 2026 — 27 مايو · توكيل الأضحية الحلال من فرنسا",
    description:
      "الجالية الإفريقية في فرنسا لعيد تاباسكي 2026؟ توكيل أضحية حلال، فيديو باسمك، توزيع على الأسر المحتاجة. 140€ شامل.",
    url: "https://qurbaniya.fr/ar/blog/tabaski-2026-fransa",
    type: "article",
    locale: "ar",
    publishedTime: "2026-05-11T00:00:00Z",
    modifiedTime: "2026-05-25T00:00:00Z",
  },
};

function ArticleJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "تاباسكي 2026 من فرنسا: توكيل الأضحية لأبناء الجالية",
    author: { "@type": "Organization", name: "Qurbaniya" },
    datePublished: "2026-05-11",
    dateModified: "2026-05-25",
    publisher: {
      "@type": "Organization",
      name: "Qurbaniya",
      logo: { "@type": "ImageObject", url: "https://qurbaniya.fr/logos/qurbaniya-logo-dark.svg" },
    },
    mainEntityOfPage: "https://qurbaniya.fr/ar/blog/tabaski-2026-fransa",
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
        name: "ما هو تاريخ تاباسكي 2026 في فرنسا؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "تاباسكي 2026 (عيد الأضحى) يوافق الأربعاء 27 مايو 2026 في فرنسا، الموافق لـ 10 ذو الحجة 1447 هجريًا. ويُحتفل بالتاريخ نفسه في السنغال ومالي وساحل العاج وغينيا، مع احتمال تأخره يومًا واحدًا حسب رؤية الهلال محليًا.",
        },
      },
      {
        "@type": "Question",
        name: "هل تاباسكي وعيد الأضحى نفس العيد؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "نعم. تاباسكي هو الاسم المستخدم في غرب إفريقيا الناطقة بالفرنسية (السنغال، مالي، ساحل العاج، غينيا، بوركينا فاسو). وعيد الأضحى هو الاسم العربي الرسمي. أما العيد الكبير فيستخدم في المغرب العربي. كلها تشير إلى نفس الاحتفال: نحر الأضحية يوم 10 ذو الحجة إحياء لذكرى سيدنا إبراهيم عليه السلام.",
        },
      },
      {
        "@type": "Question",
        name: "هل يمكنني الاحتفال بتاباسكي من فرنسا إذا لم أستطع العودة إلى البلد؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "نعم، توكيل الأضحية صحيح ومعتبر شرعًا عند المذاهب السنية الأربعة. يمكنك توكيل خدمة موثوقة لتنفيذ الأضحية نيابة عنك، وفق أحكام السنة، وتصلك صورة فيديو بأسمك كدليل، ويُوزَّع اللحم على الأسر المحتاجة.",
        },
      },
      {
        "@type": "Question",
        name: "كم تكلف الأضحية بالتوكيل لتاباسكي 2026؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "في قربانية، تكلفة الأضحية بالتوكيل لتاباسكي 2026 هي 140€ شاملة كل شيء: خروف مطابق للسنة، ذبح بإشراف شيخ، فيديو باسمك يُرسل عبر واتساب، وتوزيع خيري على الأسر المحتاجة في مدغشقر.",
        },
      },
      {
        "@type": "Question",
        name: "حتى متى يمكنني الحجز لتاباسكي 2026؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "يُغلق الحجز تلقائيًا يوم 27 مايو 2026 الساعة 03:00 صباحًا (بتوقيت باريس)، أي قبل ساعات من بدء الذبح. لضمان أضحيتك وجودة الخدمة نوصي بشدة بالحجز قبل 7 إلى 15 يومًا على الأقل لأن الأماكن محدودة.",
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

export default function ArticleTabaski() {
  return (
    <>
      <ArticleJsonLd />
      <ArticleFaqJsonLd />
      <BreadcrumbJsonLd items={[
        { name: "الرئيسية", url: "https://qurbaniya.fr/ar" },
        { name: "المدونة", url: "https://qurbaniya.fr/ar/blog" },
        { name: "تاباسكي 2026 فرنسا", url: "https://qurbaniya.fr/ar/blog/tabaski-2026-fransa" },
      ]} />
      <article dir="rtl" className="max-w-3xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-muted-light mb-8 font-inter">
          <Link href="/ar" className="hover:text-gold transition-colors">الرئيسية</Link>
          <span>/</span>
          <Link href="/ar/blog" className="hover:text-gold transition-colors">المدونة</Link>
          <span>/</span>
          <span className="text-text-primary">تاباسكي 2026 فرنسا</span>
        </nav>

        <LanguageSwitcher
          canonicalSlug="tabaski-2026-france"
          currentLocale="ar"
          className="mb-6"
        />

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full font-inter">دليل</span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Calendar size={12} /> نُشر في 11 مايو 2026
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Clock size={12} /> 7 دقائق قراءة
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6">
          تاباسكي 2026 من فرنسا: توكيل الأضحية من بلاد المهجر — <span className="text-gold">الأربعاء 27 مايو</span>
        </h1>

        <p className="text-lg text-text-muted leading-relaxed mb-8 border-r-4 border-gold pr-4">
          يوافق <strong className="text-text-primary">تاباسكي 2026</strong> يوم <strong className="text-text-primary">الأربعاء 27 مايو 2026</strong>. أنت تعيش في فرنسا ولا تستطيع العودة إلى البلد هذا العام؟ توكيل الأضحية حلٌّ معتبَر شرعًا عند المذاهب الفقهية الأربعة: تُنفَّذ الأضحية باسمك، وفق أحكام السنة، ويوزَّع اللحم على الأسر المحتاجة.
        </p>

        {/* Content */}
        <div className="prose-custom space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">تاريخ تاباسكي 2026 في فرنسا</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              يُحتفل بـ <strong className="text-text-primary">تاباسكي 2026</strong> يوم <strong className="text-text-primary">الأربعاء 27 مايو 2026</strong> في فرنسا، الموافق لـ 10 ذو الحجة 1447 هجريًا. ويُعتمَد التاريخ نفسه في معظم دول غرب إفريقيا (السنغال، مالي، ساحل العاج، غينيا، بوركينا فاسو)، مع احتمال تأخره يومًا واحدًا حسب رؤية الهلال محليًا.
            </p>
            <p className="text-text-muted leading-relaxed">
              يجوز ذبح الأضحية من 27 إلى 30 مايو 2026 (يوم النحر + أيام التشريق الثلاثة).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">تاباسكي وعيد الأضحى وعيد الكبير: شيء واحد</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              ستسمع تسميات مختلفة بحسب البلد والأصل، وكلها تشير إلى نفس الاحتفال:
            </p>
            <ul className="space-y-2 text-text-muted font-inter text-sm pr-1">
              <li><strong className="text-text-primary">تاباسكي (Tabaski)</strong> — السنغال، مالي، ساحل العاج، غينيا، بوركينا فاسو، موريتانيا.</li>
              <li><strong className="text-text-primary">عيد الأضحى</strong> (Eid al-Adha) — الاسم العربي الرسمي، «عيد النحر».</li>
              <li><strong className="text-text-primary">العيد الكبير</strong> — في المغرب العربي (المغرب، الجزائر، تونس).</li>
              <li><strong className="text-text-primary">عيد الخروف</strong> — تسمية شائعة في فرنسا.</li>
            </ul>
            <p className="text-text-muted leading-relaxed mt-4">
              كل هذه الأسماء تشير إلى نفس الشعيرة الدينية: إحياء ذكرى أضحية سيدنا إبراهيم عليه السلام، التي يُحتفل بها كل عام في 10 ذو الحجة.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">لماذا توكِّل كثير من الأسر الإفريقية في فرنسا أضحيتها؟</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              كل عام في تاباسكي، يجد آلاف السنغاليين والماليين والإيفواريين والغينيين والبوركينابيّين المقيمين في فرنسا أنفسهم أمام نفس المعضلة: <strong className="text-text-primary">أداء فريضة الأضحية دون التمكن من العودة إلى البلد</strong>.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              عدة أسباب واقعية تفسِّر اللجوء إلى التوكيل:
            </p>
            <ul className="space-y-2 text-text-muted font-inter text-sm pr-1">
              <li>• <strong className="text-text-primary">تعذُّر السفر</strong> — العمل، الدراسة، الوضع الإداري، الأعباء العائلية.</li>
              <li>• <strong className="text-text-primary">ارتفاع أسعار الخروف في البلد</strong> — تتضاعف الأسعار في دكار وباماكو وأبيدجان مع اقتراب العيد.</li>
              <li>• <strong className="text-text-primary">صعوبة الذبح في فرنسا</strong> — قلة المسالخ المعتمدة، الحجوزات مشبعة، إجراءات معقدة.</li>
              <li>• <strong className="text-text-primary">رغبة في العمل الخيري</strong> — لحم الأضحية يُطعم مباشرة الأسر المحتاجة.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">كيف يعمل توكيل الأضحية (التوكيل الشرعي)؟</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              <em>التوكيل</em> في الأضحية ممارسة معتبَرة عند <strong className="text-text-primary">المذاهب السنية الأربعة</strong> (الحنفي والمالكي والشافعي والحنبلي). وقد ثبت عن عدد من الصحابة رضوان الله عليهم أنهم وكَّلوا غيرهم بذبح أضاحيهم.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              عمليًا، أنت توكِّل خدمة موثوقة لتنفيذ الأضحية باسمك يوم تاباسكي وفق أحكام الشرع. ثم تصلك <strong className="text-text-primary">صورة فيديو باسمك كدليل</strong>، ويُوزَّع اللحم على الأسر المحتاجة.
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border border-gold/10">
              <h3 className="text-gold font-bold text-sm uppercase tracking-wider mb-3 font-inter">شروط الصحة (تذكير)</h3>
              <ul className="space-y-2 text-text-muted text-sm font-inter">
                <li>• النية الصادقة باسم الموكِّل</li>
                <li>• حيوان سليم خالٍ من العيوب، بلغ السن الشرعية</li>
                <li>• الذبح من قِبل مسلم وفق أحكام السنة</li>
                <li>• تنفيذ الأضحية بين 27 و30 مايو 2026 (الأيام المعتبرة)</li>
                <li>• توزيع اللحم، ويُسنّ تقسيمه إلى ثلاثة أقسام (الأهل، الأقارب، الفقراء)</li>
              </ul>
            </div>
          </section>

          {/* CTA mid-article */}
          <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 md:p-8 text-center my-10">
            <h3 className="text-white font-bold text-lg md:text-xl mb-2 font-playfair">
              تاباسكي 2026 — احجز أضحيتك بنقرات قليلة
            </h3>
            <p className="text-white/70 text-sm mb-4 font-inter">
              وفق السنة · فيديو باسمك · توزيع على الأسر المحتاجة · 140€ شامل
            </p>
            <Link
              href="/commander"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
            >
              احجز أضحيتي <ArrowRight size={14} />
            </Link>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">قربانية لتاباسكي 2026: ما الذي نفعله لأجلك</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              خدمتنا مصمَّمة للأسر الإفريقية الفرنكوفونية المقيمة في فرنسا الراغبة في أداء أضحيتها دون عناء لوجستي:
            </p>
            <ol className="space-y-3 text-text-muted font-inter">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">1</span>
                <span><strong className="text-text-primary">تحجز عبر الإنترنت</strong> — في دقيقتين، دفع آمن عبر Stripe. تذكر الاسم الكامل للشخص الذي تُؤدّى الأضحية باسمه.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">2</span>
                <span><strong className="text-text-primary">ذبح بإشراف شيخ</strong> — يوم تاباسكي، يُذبَح الخروف وفق السنة، ويُنطَق اسمك عند النية.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">3</span>
                <span><strong className="text-text-primary">دليل فيديو عبر واتساب</strong> — يصلك فيديو باسمك يُثبت تنفيذ الأضحية.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">4</span>
                <span><strong className="text-text-primary">توزيع خيري في مدغشقر</strong> — يُطعَم اللحم الأسر المحتاجة، تحقيقًا لمقصد الأضحية.</span>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">كم تكلف الأضحية بالتوكيل لتاباسكي 2026؟</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              السعر الموحَّد في قربانية هو <strong className="text-text-primary">140€ شامل كل شيء</strong>. ويشمل هذا السعر:
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter pr-1">
              <li>• شراء الخروف (مطابق للسن والصحة المطلوبتَين شرعًا)</li>
              <li>• الذبح بإشراف شيخ</li>
              <li>• تجهيز اللحم وتوزيعه على الأسر المحتاجة</li>
              <li>• فيديو باسمك كدليل</li>
              <li>• لا رسوم خفية ولا إضافات</li>
            </ul>
            <p className="text-text-muted leading-relaxed mt-4">
              للتذكير، قد يتجاوز ثمن خروف تاباسكي في السنغال أو مالي 250,000 فرنك (≈ 380€) قبيل العيد. راجع <Link href="/ar/blog/siar-al-kharuf-fransa-2026" className="text-gold hover:underline">دليلنا الكامل لأسعار الخروف في فرنسا 2026</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">حتى متى يمكن الحجز؟</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              تُغلَق الحجوزات تلقائيًا يوم <strong className="text-text-primary">27 مايو 2026 الساعة 03:00 صباحًا (بتوقيت باريس)</strong>، أي قبل ساعات من بدء الذبح. ولكن لا تتأخر: الأماكن محدودة وتنفد بسرعة كلما اقترب العيد. نوصي بالحجز قبل 7 إلى 15 يومًا على الأقل لضمان أضحيتك.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">لمعرفة المزيد</h2>
            <ul className="space-y-2 text-text-muted font-inter text-sm pr-1">
              <li>• <Link href="/ar/blog/tarikh-eid-al-adha-2026" className="text-gold hover:underline">تاريخ عيد الأضحى / تاباسكي 2026 كاملًا (يوم عرفة، التشريق)</Link></li>
              <li>• <Link href="/ar/blog/qurbani-online-kayfa-yaamal" className="text-gold hover:underline">كيف تعمل الأضحية أونلاين؟</Link></li>
              <li>• <Link href="/ar/blog/thaman-kharuf-eid-2026-fransa" className="text-gold hover:underline">كم يكلف خروف تاباسكي / العيد في فرنسا؟</Link></li>
              <li>• <Link href="/faq" className="text-gold hover:underline">جميع الأسئلة الشائعة حول توكيل الأضحية</Link></li>
            </ul>
          </section>
        </div>

        <LanguageSwitcher
          canonicalSlug="tabaski-2026-france"
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
            className="flex items-center gap-2 text-gold font-semibold font-inter text-sm"
          >
            احجز أضحيتي <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    </>
  );
}
