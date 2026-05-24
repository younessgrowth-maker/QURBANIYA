import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight, Zap, Check } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import LanguageSwitcher from "@/components/blog/LanguageSwitcher";
import { blogHreflangAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "🚨 حجز خروف العيد في آخر لحظة 2026: في دقيقتين فقط",
  description:
    "⏳ لم تحجز بعد لعيد 2026؟ إليك كيف تحجز أضحيتك في آخر لحظة (من D-15 إلى D-1) بكل اطمئنان. المواعيد الحقيقية، الخيارات المتاحة، وكل ما يجب معرفته قبل النقر.",
  keywords: [
    "حجز خروف العيد في آخر لحظة 2026",
    "أضحية اللحظة الأخيرة",
    "حجز أضحية عيد الأضحى 2026",
    "حجز خروف العيد بسرعة",
    "أضحية عاجلة 2026",
    "حجز قرباني آخر لحظة",
    "حجز أضحية أونلاين 2026",
    "خروف العيد بالأمس",
    "tawkil derniere minute",
    "qurbani last minute arabic",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/ar/blog/hajz-kharuf-eid-akhir-lahza-2026",
    languages: blogHreflangAlternates("reserver-mouton-aid-derniere-minute-2026"),
  },
  openGraph: {
    title: "🚨 حجز خروف العيد في آخر لحظة 2026: في دقيقتين فقط",
    description:
      "⏳ كيف تحجز أضحية قبل عيد 2026 مباشرة. المواعيد، الخيارات، وكل ما يجب معرفته 🐑",
    url: "https://qurbaniya.fr/ar/blog/hajz-kharuf-eid-akhir-lahza-2026",
    type: "article",
    locale: "ar",
    publishedTime: "2026-05-12T00:00:00Z",
    modifiedTime: "2026-05-12T00:00:00Z",
  },
};

function ArticleJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "حجز خروف العيد في آخر لحظة 2026",
    author: { "@type": "Organization", name: "Qurbaniya" },
    datePublished: "2026-05-12",
    dateModified: "2026-05-12",
    publisher: {
      "@type": "Organization",
      name: "Qurbaniya",
      logo: { "@type": "ImageObject", url: "https://qurbaniya.fr/logos/qurbaniya-logo-dark.svg" },
    },
    mainEntityOfPage: "https://qurbaniya.fr/ar/blog/hajz-kharuf-eid-akhir-lahza-2026",
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
        name: "هل يمكنني حجز خروف العيد 2026 قبل أيام قليلة من العيد؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "نعم، طالما توجد أماكن متاحة. في Qurbaniya تبقى الحجوزات مفتوحة حتى الأربعاء 27 مايو 2026 الساعة 03:00 صباحًا (بتوقيت باريس)، أي قبل ساعات قليلة من الذبح. بما أن الأضحية تُفوَّض في مدغشقر فلا يوجد أي قيد لوجستي في فرنسا، ويمكن إتمام الطلب عبر الإنترنت في دقيقتين.",
        },
      },
      {
        "@type": "Question",
        name: "كم تستغرق عملية الحجز في آخر لحظة؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "يستغرق النموذج الإلكتروني دقيقتين: الاسم، اللقب، البريد الإلكتروني، رقم WhatsApp، النية (لنفسك / للعائلة / صدقة)، والنية (الاسم المذكور أثناء الذبح). الدفع ببطاقة بنكية فوريًا عبر Stripe، وتأكيد عبر البريد الإلكتروني في غضون دقيقة.",
        },
      },
      {
        "@type": "Question",
        name: "هل هناك خطر نفاد المخزون قبل العيد مباشرة؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "نعم. كل عام تنفد الأماكن في الأسبوع الأخير. المخزون محدود لأن كل أضحية تُجهَّز فعليًا مسبقًا في مدغشقر. يظهر عداد الأماكن المتبقية بشكل لحظي على الموقع.",
        },
      },
      {
        "@type": "Question",
        name: "ماذا يحدث إذا حجزت ليلة العيد؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "يتم تنفيذ الذبح يوم 27 مايو 2026 (يوم العيد) باسمك، تمامًا كباقي الطلبات الأقدم. وتستلم الفيديو المخصص باسمك خلال 24 ساعة عبر WhatsApp.",
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

export default function ArticleLastMinuteAr() {
  return (
    <>
      <ArticleJsonLd />
      <ArticleFaqJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "الرئيسية", url: "https://qurbaniya.fr/ar" },
          { name: "المدونة", url: "https://qurbaniya.fr/ar/blog" },
          {
            name: "الحجز في آخر لحظة",
            url: "https://qurbaniya.fr/ar/blog/hajz-kharuf-eid-akhir-lahza-2026",
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
          <span className="text-text-primary">الحجز في آخر لحظة</span>
        </nav>

        <LanguageSwitcher
          canonicalSlug="reserver-mouton-aid-derniere-minute-2026"
          currentLocale="ar"
          className="mb-6"
        />

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-semibold text-urgency bg-urgency/10 px-2.5 py-1 rounded-full font-inter flex items-center gap-1">
            <Zap size={11} className="fill-current" /> عاجل
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Calendar size={12} /> نُشر في 12 مايو 2026
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Clock size={12} /> 5 دقائق قراءة
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6">
          احجز أضحيتك لعيد 2026 في <span className="text-gold">آخر لحظة</span>
        </h1>

        <p className="text-lg text-text-muted leading-relaxed mb-8 border-r-4 border-gold pr-4">
          عيد الأضحى 2026 على بُعد <strong className="text-text-primary">أقل من أسبوعين</strong> (الأربعاء 27 مايو 2026). إذا لم تحجز أضحيتك بعد، فإليك الدليل الكامل لتفعل ذلك <strong className="text-text-primary">بسرعة</strong>، و<strong className="text-text-primary">بإتقان</strong>، و<strong className="text-text-primary">بمطابقة شرعية كاملة</strong>.
        </p>

        <div className="prose-custom space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              ⏳ نعم، ما زال ممكنًا
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              خلافًا لما قد يُشاع، يمكن حجز خروف العيد في الأسبوع الأخير — بل وحتى ليلة العيد نفسها — <strong className="text-text-primary">طالما هناك أماكن متوفرة</strong>. في Qurbaniya يُظهر العداد اللحظي على الصفحة الرئيسية المخزون المتاح. تُغلق الحجوزات تلقائيًا في <strong className="text-text-primary">27 مايو 2026 الساعة 03:00 صباحًا</strong> (بتوقيت باريس)، أي قبل ساعات قليلة من الذبح.
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border-r-4 border-gold">
              <p className="text-text-muted leading-relaxed text-sm">
                <strong className="text-text-primary">للتذكير:</strong> كل عام تنفد آخر 30-40 مكانًا خلال 48 ساعة السابقة للعيد. إذا رأيت العداد ينزل تحت 20، لا تتأخر.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              ⚡ مسار الحجز في دقيقتين
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              الإجراء قصير عمدًا لأن الكثير من الحجوزات تتم عبر الهاتف، من العمل، أو في المترو، أو خلال استراحة الغداء:
            </p>
            <ol className="space-y-3 text-text-muted font-inter">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">
                  1
                </span>
                <span>
                  <strong className="text-text-primary">املأ النموذج</strong> — الاسم، اللقب، البريد الإلكتروني، رقم WhatsApp (لاستلام الفيديو)، النية (لنفسك، للعائلة، أو صدقة)، والاسم الذي يُذكر عند الذبح.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">
                  2
                </span>
                <span>
                  <strong className="text-text-primary">الدفع بالبطاقة البنكية</strong> — 140€ شاملة كل شيء عبر Stripe الآمن (Visa، Mastercard، Apple Pay، Google Pay).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">
                  3
                </span>
                <span>
                  <strong className="text-text-primary">تأكيد فوري بالبريد الإلكتروني</strong> — مكانك محجوز. يُنفَّذ الذبح يوم 27 مايو باسمك.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">
                  4
                </span>
                <span>
                  <strong className="text-text-primary">فيديو مخصص خلال 24 ساعة</strong> — تستلم دليل الفيديو على WhatsApp مع ذكر اسمك أثناء <em>التسمية</em>.
                </span>
              </li>
            </ol>
          </section>

          {/* CTA mid-article */}
          <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 md:p-8 text-center my-10">
            <h3 className="text-white font-bold text-lg md:text-xl mb-2 font-playfair">
              احجز الآن قبل الإغلاق
            </h3>
            <p className="text-white/70 text-sm mb-4 font-inter">
              مطابق للسنة · فيديو باسمك · توزيع على الأسر المحتاجة · 140€ شاملة كل شيء
            </p>
            <Link
              href="/commander"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
            >
              احجز في دقيقتين <ArrowRight size={14} />
            </Link>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              ✅ لماذا تبقى التوكيل صحيحًا حتى في آخر لحظة
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              <em>التوكيل</em> في الأضحية <strong className="text-text-primary">مُعتمد عند المذاهب الأربعة السنية</strong> (الحنفي، المالكي، الشافعي، الحنبلي). ويعود إلى عهد الصحابة رضي الله عنهم — فقد وكّل عدد منهم في ذبح أضحيتهم في حياتهم.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              ما يهم من الناحية الشرعية هو:
            </p>
            <ul className="space-y-2 text-text-muted font-inter text-sm pr-1">
              <li className="flex items-start gap-2">
                <Check size={14} className="text-emerald flex-shrink-0 mt-1" strokeWidth={3} />
                <span>النية الصادقة (<em>النيّة</em>) باسم الموكِّل.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={14} className="text-emerald flex-shrink-0 mt-1" strokeWidth={3} />
                <span>الحيوان المطابق (السن الأدنى، الصحة، السلامة من العيوب).</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={14} className="text-emerald flex-shrink-0 mt-1" strokeWidth={3} />
                <span>الذبح الشرعي على يد مسلم وفق السنة النبوية.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={14} className="text-emerald flex-shrink-0 mt-1" strokeWidth={3} />
                <span>تنفيذ الذبح بين 27 و30 مايو 2026 شاملة.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={14} className="text-emerald flex-shrink-0 mt-1" strokeWidth={3} />
                <span>توزيع اللحم (الأسرة، الأقارب، المحتاجون).</span>
              </li>
            </ul>
            <p className="text-text-muted leading-relaxed mt-4">
              كل ذلك مضمون من قِبل Qurbaniya، سواء حجزت قبل 3 أشهر أو قبل 3 أيام من العيد.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              💡 نصائح حتى لا تخطئ في آخر لحظة
            </h2>
            <ul className="space-y-3 text-text-muted font-inter text-sm">
              <li>
                <strong className="text-text-primary">📱 جهّز بطاقتك البنكية مسبقًا</strong> — تأكد من السقف مع بنكك (140€ لا تشكل مشكلة عادةً، لكن بعض البطاقات المدفوعة مسبقًا قد تُرفض).
              </li>
              <li>
                <strong className="text-text-primary">📞 تحقق من رقم WhatsApp</strong> — سيصل الفيديو إليه، فأدخل بدقة الرقم الذي تريد استلامه عليه.
              </li>
              <li>
                <strong className="text-text-primary">🤲 جهّز النية</strong> — حدد مسبقًا باسم من تُقدَّم الأضحية (أنت، أبوك، أمك، أسرتك، صدقة عن متوفى).
              </li>
              <li>
                <strong className="text-text-primary">💬 احفظ رقم الدعم</strong> — في حال أي شك بعد الطلب، يمكنك مراسلتنا على WhatsApp ونرد في نفس اليوم.
              </li>
              <li>
                <strong className="text-text-primary">📧 تحقق من البريد المزعج</strong> — يصل تأكيد البريد من <code>noreply@qurbaniya.fr</code>. أحيانًا تتم تصفيته، فلا داعي للقلق.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              🐑 وإن أردت المقارنة أولًا؟
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              إذا كنت متردداً بين شراء خروف حي في فرنسا (350-450€ + إجراءات الذبح) أو التوكيل عبر الإنترنت (140€ شاملة كل شيء)، فإن <Link href="/ar/blog/siar-al-kharuf-fransa-2026" className="text-gold hover:underline">دليلنا الكامل لأسعار الخروف 2026</Link> يغطي كل شيء: المعايير الشرعية، التكاليف الخفية، ومقارنة المطابقة.
            </p>
            <p className="text-text-muted leading-relaxed">
              قبل 15 يومًا من العيد، معظم المربين المحليين لم يعد لديهم خراف متاحة أو رفعوا الأسعار. يبقى التوكيل هو الخيار الأكثر سهولة.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              ❓ أسئلة شائعة لمن يحجزون في آخر لحظة
            </h2>
            <div className="space-y-5">
              <div>
                <h3 className="font-bold text-text-primary mb-2">
                  هل المخزون محدود فعلاً؟
                </h3>
                <p className="text-text-muted leading-relaxed text-sm">
                  نعم. كل أضحية تقابل حيوانًا فعليًا مُجهَّزًا في مدغشقر. يُظهر العداد الأماكن المتبقية بشكل لحظي. حين يصل إلى 0 فهو 0 — لا نفتح أي أماكن إضافية.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-text-primary mb-2">
                  هل يمكنني الطلب لشخص آخر؟
                </h3>
                <p className="text-text-muted leading-relaxed text-sm">
                  نعم، عبر وضع &laquo;هدية&raquo; أثناء الطلب: تكتب اسم المستفيد، تدفع، ويمكن إرسال التأكيد إلى المستفيد إن أردت.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-text-primary mb-2">
                  ماذا لو طلبت يوم 27 مايو الساعة 2:59 صباحًا؟
                </h3>
                <p className="text-text-muted leading-relaxed text-sm">
                  يُقبل طلبك إذا تم التحقق منه ودفعه قبل الساعة 3:00 صباحًا. عند الساعة 3:00 تمامًا ترفض الواجهة البرمجية أي طلب جديد لعام 2026، وسنفتح حجوزات عيد 2027 في بداية العام المقبل.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-text-primary mb-2">
                  وبعد الدفع، هل أصبحت متفرغًا؟
                </h3>
                <p className="text-text-muted leading-relaxed text-sm">
                  نعم. لا يبقى عليك شيء. بريد إلكتروني للتأكيد، تذكير قبل العيد بأسبوع، ويصل الفيديو المخصص خلال 24 ساعة بعد يوم 27 مايو. يمكنك التفرغ للصلاة والعيد.
                </p>
              </div>
            </div>
          </section>
        </div>

        <LanguageSwitcher
          canonicalSlug="reserver-mouton-aid-derniere-minute-2026"
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
