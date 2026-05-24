import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight, Check } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import LanguageSwitcher from "@/components/blog/LanguageSwitcher";
import { blogHreflangAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "الأضحية عبر الإنترنت: كيف تعمل فعلياً؟",
  description:
    "دليل شامل لتوكيل أضحية عيد الأضحى عبر الإنترنت. خطوات العملية، المطابقة للسنة، فيديو باسم الموكل. كل ما تحتاج معرفته.",
  keywords: [
    "أضحية عبر الإنترنت 2026",
    "توكيل أضحية العيد",
    "كيف تعمل القرباني أونلاين",
    "ذبح خروف العيد عبر الإنترنت",
    "أضحية عيد الأضحى أونلاين",
    "التوكيل في الأضحية",
    "قرباني أونلاين",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/ar/blog/qurbani-online-kayfa-yaamal",
    languages: blogHreflangAlternates("sacrifice-aid-en-ligne-comment-ca-marche"),
  },
  openGraph: {
    title: "الأضحية عبر الإنترنت: كيف تعمل فعلياً؟",
    description:
      "دليل شامل لتوكيل أضحيتك عبر الإنترنت. العملية، المطابقة، الفيديو.",
    url: "https://qurbaniya.fr/ar/blog/qurbani-online-kayfa-yaamal",
    type: "article",
    locale: "ar",
    publishedTime: "2026-03-10T00:00:00Z",
  },
};

function ArticleJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "الأضحية عبر الإنترنت: كيف تعمل فعلياً؟",
    author: { "@type": "Organization", name: "Qurbaniya" },
    datePublished: "2026-03-10",
    dateModified: "2026-03-10",
    publisher: {
      "@type": "Organization",
      name: "Qurbaniya",
      logo: { "@type": "ImageObject", url: "https://qurbaniya.fr/logos/qurbaniya-logo-dark.svg" },
    },
    mainEntityOfPage: "https://qurbaniya.fr/ar/blog/qurbani-online-kayfa-yaamal",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function ArticleQurbaniOnlineAr() {
  return (
    <>
      <ArticleJsonLd />
      <BreadcrumbJsonLd items={[
        { name: "الرئيسية", url: "https://qurbaniya.fr/ar" },
        { name: "المدونة", url: "https://qurbaniya.fr/ar/blog" },
        { name: "الأضحية عبر الإنترنت", url: "https://qurbaniya.fr/ar/blog/qurbani-online-kayfa-yaamal" },
      ]} />
      <article dir="rtl" className="max-w-3xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-muted-light mb-8 font-inter">
          <Link href="/ar" className="hover:text-gold transition-colors">الرئيسية</Link>
          <span>/</span>
          <Link href="/ar/blog" className="hover:text-gold transition-colors">المدونة</Link>
          <span>/</span>
          <span className="text-text-primary">الأضحية عبر الإنترنت</span>
        </nav>

        <LanguageSwitcher
          canonicalSlug="sacrifice-aid-en-ligne-comment-ca-marche"
          currentLocale="ar"
          className="mb-6"
        />

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full font-inter">دليل عملي</span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Calendar size={12} /> 10 مارس 2026
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Clock size={12} /> 7 دقائق قراءة
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6">
          الأضحية عبر الإنترنت: <span className="text-gold">كيف تعمل فعلياً؟</span>
        </h1>

        <p className="text-lg text-text-muted leading-relaxed mb-8 border-r-4 border-gold pr-4">
          يختار المزيد من المسلمين في أوروبا توكيل ذبح أضحية عيد الأضحى عبر الإنترنت. لكن هل هذا موافق للسنة فعلاً؟ وكيف تتم العملية على أرض الواقع؟ يجيب هذا الدليل عن كل أسئلتك.
        </p>

        {/* Content */}
        <div className="prose-custom space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">هل التوكيل في الأضحية صحيح شرعاً؟</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              نعم، بكل تأكيد. التوكيل في الأضحية (<strong className="text-text-primary">التوكيل</strong>) جائز بإجماع المذاهب الفقهية الأربعة (الحنفي والمالكي والشافعي والحنبلي).
            </p>
            <p className="text-text-muted leading-relaxed">
              النبي ﷺ نفسه وكّل غيره في ذبح بعض هديه. وقد فوّض علي بن أبي طالب رضي الله عنه بإتمام نحر ما تبقى من الهدي في حجة الوداع.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">العملية في 4 خطوات بسيطة</h2>
            <div className="space-y-4">
              {[
                { step: "1", title: "تطلب عبر الإنترنت", desc: "اختر نوع الذبيحة (أضحية، عقيقة، صدقة)، أدخل اسم من ستُذبح باسمه، وادفع بكل أمان." },
                { step: "2", title: "يُحجز خروفك", desc: "يُختار خروف يستوفي الشروط الشرعية (السن، الصحة، الخلو من العيوب) ويُحجز باسمك." },
                { step: "3", title: "تُنفَّذ الأضحية يوم العيد", desc: "في يوم العيد، يقوم شيخ مؤهَّل بالذبح وفق أحكام السنة: استقبال القبلة، ذكر اسم الله واسمك، بالطريقة الشرعية الصحيحة." },
                { step: "4", title: "تستلم فيديو الأضحية", desc: "يُرسل فيديو خاص بأضحيتك عبر واتساب خلال 24 ساعة. ويوزَّع اللحم كاملاً على الأسر المحتاجة." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 bg-bg-secondary rounded-xl p-5 border border-gold/10">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gold text-white font-bold flex items-center justify-center font-inter">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-text-primary font-bold mb-1">{item.title}</h3>
                    <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">شروط صحة الأضحية وفق السنة</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              لكي تكون الأضحية صحيحة، يجب توفر عدة شروط. وفي قربانيّة، نتحقق بدقة من كل نقطة:
            </p>
            <ul className="space-y-2">
              {[
                "أن يبلغ الحيوان السن الشرعية (سنة كاملة على الأقل للخروف)",
                "أن يكون الحيوان سليماً من العيوب الظاهرة",
                "أن يُنفَّذ الذبح في الوقت الشرعي (من 10 إلى 13 ذي الحجة)",
                "أن يذكر الذابح اسم الله (بسم الله، الله أكبر)",
                "أن يُذكر اسم صاحب الأضحية عند الذبح",
                "أن يُوجَّه الحيوان نحو القبلة",
                "أن تكون طريقة الذبح سريعة ورحيمة بالحيوان",
              ].map((condition, i) => (
                <li key={i} className="flex items-start gap-2 text-text-muted text-sm font-inter">
                  <Check size={16} className="text-emerald flex-shrink-0 mt-0.5" />
                  <span>{condition}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* CTA mid-article */}
          <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 md:p-8 text-center my-10">
            <h3 className="text-white font-bold text-lg md:text-xl mb-2 font-playfair">
              أضحية مطابقة للسنة، بسيطة وشفافة
            </h3>
            <p className="text-white/70 text-sm mb-4 font-inter">
              شيخ مؤهَّل · فيديو باسم الموكل · لحم موزَّع · 140€
            </p>
            <Link
              href="/commander"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
            >
              احجز أضحيتي <ArrowRight size={14} />
            </Link>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">لماذا تختار التوكيل بدلاً من الذبح بنفسك؟</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              في أوروبا، أصبح تنظيم الأضحية بنفسك أمراً معقَّداً: قوانين صحية صارمة، مسالخ مزدحمة في أيام العيد، تكلفة مرتفعة (350–400€ في المتوسط)، فضلاً عن عناء النقل وتخزين اللحم.
            </p>
            <p className="text-text-muted leading-relaxed">
              يتيح لك التوكيل أداء هذه الشعيرة الدينية بطريقة شرعية، وبتكلفة أقل، مع تحقيق أثر اجتماعي مباشر: إذ يُوزَّع اللحم كاملاً على الأسر المحتاجة.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">الفيديو باسم الموكل: دليلك على إتمام الأضحية</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              هذا ما يميِّز الخدمة الجادة عن غيرها. في قربانيّة، يُصوَّر كل ذبح بشكل فردي. ويُظهر الفيديو:
            </p>
            <ul className="space-y-2 text-text-muted text-sm font-inter">
              <li className="flex items-start gap-2"><Check size={16} className="text-emerald flex-shrink-0 mt-0.5" /> ذكر اسمك قبل تنفيذ الذبح</li>
              <li className="flex items-start gap-2"><Check size={16} className="text-emerald flex-shrink-0 mt-0.5" /> تنفيذ الأضحية وفق الأحكام الشرعية</li>
              <li className="flex items-start gap-2"><Check size={16} className="text-emerald flex-shrink-0 mt-0.5" /> توزيع اللحم على الأسر المحتاجة</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">الأسئلة الشائعة</h2>
            <div className="space-y-4">
              {[
                { q: "هل يمكنني الطلب باسم شخص آخر؟", a: "نعم، يمكنك إدخال اسم أي شخص عند الطلب، وستُنفَّذ الأضحية باسمه بالنية المطلوبة." },
                { q: "متى ينبغي أن أحجز؟", a: "في أقرب وقت ممكن. الأماكن محدودة والأسعار ترتفع مع اقتراب العيد. ننصح بالحجز قبل العيد بأسبوعين على الأقل." },
                { q: "وماذا لو أردت الإلغاء؟", a: "يمكنك الإلغاء حتى 7 أيام قبل العيد مع استرداد كامل للمبلغ. تواصل معنا عبر البريد الإلكتروني أو واتساب." },
              ].map((faq, i) => (
                <div key={i} className="bg-bg-secondary rounded-xl p-5 border border-gray-100">
                  <h3 className="text-text-primary font-bold mb-2 text-sm">{faq.q}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Read more — internal linking */}
          <section className="bg-bg-secondary rounded-xl p-5 md:p-6 border border-gold/10">
            <h3 className="text-gold font-bold text-sm uppercase tracking-wider mb-3 font-inter">للاستزادة</h3>
            <ul className="space-y-2 text-sm font-inter">
              <li>
                <Link href="/ar/blog/tarikh-eid-al-adha-2026" className="text-text-primary hover:text-gold transition-colors">
                  ← تاريخ عيد الأضحى 2026: الأربعاء 27 مايو
                </Link>
              </li>
              <li>
                <Link href="/ar/blog/siar-al-kharuf-fransa-2026" className="text-text-primary hover:text-gold transition-colors">
                  ← أسعار الخروف في فرنسا 2026: مقارنة شاملة
                </Link>
              </li>
              <li>
                <Link href="/ar/blog/thaman-kharuf-eid-2026-fransa" className="text-text-primary hover:text-gold transition-colors">
                  ← كم يكلِّف خروف العيد سنة 2026؟
                </Link>
              </li>
              <li>
                <Link href="/ar/blog/yawm-arafah-2026" className="text-text-primary hover:text-gold transition-colors">
                  ← يوم عرفة 2026: الصيام والفضائل والأدعية
                </Link>
              </li>
            </ul>
          </section>
        </div>

        <LanguageSwitcher
          canonicalSlug="sacrifice-aid-en-ligne-comment-ca-marche"
          currentLocale="ar"
          className="mt-12 mb-6"
        />

        {/* Bottom navigation */}
        <div className="mt-4 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/ar/blog/tarikh-eid-al-adha-2026" className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors font-inter text-sm">
            <ArrowLeft size={14} /> تاريخ العيد 2026
          </Link>
          <Link
            href="/ar/blog/siar-al-kharuf-fransa-2026"
            className="flex items-center gap-2 text-gold font-semibold font-inter text-sm"
          >
            أسعار الخروف في فرنسا <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    </>
  );
}
