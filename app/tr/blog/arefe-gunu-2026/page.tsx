import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import LanguageSwitcher from "@/components/blog/LanguageSwitcher";
import { blogHreflangAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "🌙 Arefe Günü 2026: Salı 26 Mayıs · Oruç, faziletler, dualar",
  description:
    "📅 Arefe Günü 2026, Salı 26 Mayıs'a (9 Zilhicce 1447) denk geliyor. Şiddetle tavsiye edilen oruç, büyük faziletler (2 yıllık günahların affı), dualar ve 27 Mayıs Kurban Bayramı ile bağlantısı 🐑",
  keywords: [
    "arefe günü 2026",
    "arefe orucu 2026",
    "9 zilhicce 2026",
    "arefe duaları",
    "kurban bayramı 2026",
    "yawm arefe",
    "arefe orucu nasıl tutulur",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/tr/blog/arefe-gunu-2026",
    languages: blogHreflangAlternates("jour-arafat-2026"),
  },
  openGraph: {
    title: "🌙 Arefe Günü 2026: Salı 26 Mayıs · Oruç, faziletler, dualar",
    description:
      "📅 Arefe Günü 2026, Salı 26 Mayıs 2026'ya denk geliyor. Şiddetle tavsiye edilen oruç, dualar ve Kurban Bayramı ile bağlantısı 🐑",
    url: "https://qurbaniya.fr/tr/blog/arefe-gunu-2026",
    locale: "tr",
    type: "article",
    publishedTime: "2026-05-24T00:00:00Z",
    modifiedTime: "2026-05-24T00:00:00Z",
  },
};

function ArticleJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Arefe Günü 2026: Salı 26 Mayıs — oruç, faziletler ve dualar",
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
    mainEntityOfPage: "https://qurbaniya.fr/tr/blog/arefe-gunu-2026",
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
        name: "Arefe Günü 2026'da hangi tarihe denk geliyor?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Arefe Günü 2026, hicri takvimde 9 Zilhicce 1447'ye karşılık gelen Salı 26 Mayıs 2026'ya denk gelmektedir. Bu, Kurban Bayramı'nın (Çarşamba 27 Mayıs 2026) bir gün öncesidir.",
        },
      },
      {
        "@type": "Question",
        name: "Arefe günü oruç tutmak gerekir mi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Arefe günü orucu, hacca gitmeyen tüm Müslümanlar için şiddetle tavsiye edilen müekked bir sünnettir. Müslim'in rivayet ettiği sahih bir hadise göre bu oruç, geçmiş yılın ve gelecek yılın günahlarına kefarettir. Hac ibadetini yapanlar ise bu günde oruç tutmazlar.",
        },
      },
      {
        "@type": "Question",
        name: "Arefe orucu ne zaman başlar ve ne zaman biter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Arefe günü orucu, her İslami oruç gibi aynı kurallara tabidir: tan vaktinden (Fecir) güneşin batışına (Akşam) kadar sürer. 26 Mayıs 2026'da Fransa'da tan vakti yaklaşık 04:00-04:30, güneşin batışı ise şehre göre 21:30-21:45 civarındadır. Kesin saatler için yerel caminizin namaz vakitlerine bakınız.",
        },
      },
      {
        "@type": "Question",
        name: "Arefe gününde okunacak en faziletli dua nedir?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Peygamber Efendimiz (s.a.v.) şöyle buyurmuştur: «Duaların en hayırlısı Arefe günü duasıdır. Benim ve benden önceki peygamberlerin söylediği en güzel söz şudur: La ilahe illallahü vahdehu la şerike leh, lehü'l-mülkü ve lehü'l-hamdü ve hüve ala külli şey'in kadir» (Tirmizi). Ayrıca gün boyunca zikri (Allah'ı anmayı), istiğfarı (af dilemeyi) ve şahsi duaları çoğaltmak tavsiye edilir.",
        },
      },
      {
        "@type": "Question",
        name: "Arefe Günü ile Kurban Bayramı arasında ne ilişki vardır?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Arefe Günü, Kurban Bayramı'nın hemen bir gün öncesidir. Hac ibadetinin en önemli günü olan 9 Zilhicce'dir: hacılar Arafat Dağı'nda toplanarak Allah'a dua ederler. Ertesi gün (10 Zilhicce, Çarşamba 27 Mayıs 2026) ise Kurban Bayramı ve kurban kesimi günüdür.",
        },
      },
      {
        "@type": "Question",
        name: "Zilhicce'nin diğer günlerinde oruç tutmadan sadece Arefe günü oruç tutulabilir mi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Evet, kesinlikle. Sadece Arefe günü orucu, Zilhicce'nin ilk dokuz gününün orucundan (ki o da tavsiye edilen ama mendup olan bir oruçtur) bağımsız, başlı başına bir sünnettir. Pek çok Müslüman, Peygamber Efendimiz'in (s.a.v.) bildirdiği büyük sevap nedeniyle sadece Arefe günü oruç tutar.",
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

export default function ArticleArefeGunu() {
  return (
    <>
      <ArticleJsonLd />
      <ArticleFaqJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", url: "https://qurbaniya.fr/tr" },
          { name: "Blog", url: "https://qurbaniya.fr/tr/blog" },
          {
            name: "Arefe Günü 2026",
            url: "https://qurbaniya.fr/tr/blog/arefe-gunu-2026",
          },
        ]}
      />
      <article className="max-w-3xl mx-auto px-4">
        <LanguageSwitcher
          canonicalSlug="jour-arafat-2026"
          currentLocale="tr"
          className="mb-6"
        />

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-muted-light mb-8 font-inter">
          <Link href="/tr" className="hover:text-gold transition-colors">
            Ana Sayfa
          </Link>
          <span>/</span>
          <Link href="/tr/blog" className="hover:text-gold transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="text-text-primary">Arefe Günü 2026</span>
        </nav>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full font-inter">
            Dini Rehber
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Calendar size={12} /> 24 Mayıs 2026 tarihinde yayımlandı
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Clock size={12} /> 7 dakikalık okuma
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6">
          Arefe Günü 2026:{" "}
          <span className="text-gold">Salı 26 Mayıs 2026</span>
        </h1>

        <p className="text-lg text-text-muted leading-relaxed mb-8 border-l-4 border-gold pl-4">
          Arefe Günü — <em>Yawm Arefe</em>,{" "}
          <strong className="text-text-primary">9 Zilhicce 1447</strong>{" "}
          — Kurban Bayramı&apos;nın arefesi olan{" "}
          <strong className="text-text-primary">Salı 26 Mayıs 2026</strong> tarihine denk gelmektedir. İslami yılın en mübarek günlerinden biridir: oruç tutmak şiddetle tavsiye edilir ve iki yıllık günahlara kefaret olur. İşte bilmeniz gereken her şey.
        </p>

        {/* Quick summary card */}
        <div className="bg-bg-secondary rounded-xl p-6 border border-gold/10 mb-10">
          <h2 className="text-gold font-bold text-sm uppercase tracking-wider mb-3 font-inter">
            30 saniyede özet
          </h2>
          <ul className="space-y-2 text-text-muted text-sm font-inter">
            <li>
              📅 <strong className="text-text-primary">Tarih:</strong> Salı 26 Mayıs 2026 (9 Zilhicce 1447)
            </li>
            <li>
              🌙 <strong className="text-text-primary">Şu günün arefesi:</strong> Kurban Bayramı (Çarşamba 27 Mayıs 2026)
            </li>
            <li>
              🤲 <strong className="text-text-primary">Tavsiye edilen:</strong> oruç tutmak ve duaları çoğaltmak
            </li>
            <li>
              ✨ <strong className="text-text-primary">Sevabı:</strong> geçmiş ve gelecek yılın günahlarına kefaret
            </li>
            <li>
              🚫 <strong className="text-text-primary">İstisna:</strong> Hac ibadetinde olanlar bu gün oruç tutmaz
            </li>
          </ul>
        </div>

        {/* Content */}
        <div className="prose-custom space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Arefe Günü 2026 tam olarak ne zaman?
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Arefe Günü her hicri yılın{" "}
              <strong className="text-text-primary">9 Zilhicce</strong>&apos;sinde kutlanır. 2026 yılında bu, Fransa&apos;daki ve uluslararası alandaki Müslüman federasyonların büyük çoğunluğu tarafından kabul edilen astronomik hesaplamalara göre{" "}
              <strong className="text-text-primary">Salı 26 Mayıs 2026</strong> tarihine karşılık gelmektedir.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              Bu tarih, Arefe&apos;nin her zaman Kurban Günü&apos;nün (<em>Yawm an-Nahr</em>) bir gün öncesi olduğu için Kurban Bayramı&apos;nın doğrulanmış tarihi (Çarşamba 27 Mayıs 2026) ile tutarlıdır.
            </p>
            <p className="text-text-muted leading-relaxed">
              Mekke&apos;de bulunan hacılar için 9 Zilhicce, Mekke&apos;ye yaklaşık 20 km uzaklıktaki{" "}
              <strong className="text-text-primary">Arafat Dağı&apos;nda</strong> büyük vakfe günüdür. Bu, Hac&apos;ın merkezi ibadetidir: bu vakfe (<em>vukuf</em>) olmadan hac geçerli olmaz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Arefe Günü neden bu kadar önemlidir?
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Arefe Günü, pek çok âlime göre <strong className="text-text-primary">İslami yılın en hayırlı günüdür</strong>. Birkaç sahih hadis onun olağanüstü önemini vurgular:
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border-l-4 border-gold mb-4">
              <p className="text-text-primary italic leading-relaxed">
                «Allah&apos;ın, kullarını cehennem ateşinden Arefe gününden daha fazla azat ettiği başka bir gün yoktur.»
              </p>
              <p className="text-text-muted-light text-sm mt-2 font-inter">
                — Müslim (no. 1348), Hz. Aişe (r.a.)&apos;dan rivayet edilmiştir
              </p>
            </div>
            <p className="text-text-muted leading-relaxed mb-4">
              Ayrıca Veda Haccı sırasında (10 H) Peygamber Efendimiz Hz. Muhammed&apos;e (s.a.v.) dini tamamlayan ayet bu günde indirilmiştir:
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border-l-4 border-gold mb-4">
              <p className="text-text-primary italic leading-relaxed">
                «Bugün size dininizi tamamladım, üzerinize nimetimi tamamladım ve sizin için din olarak İslam&apos;ı seçtim.»
              </p>
              <p className="text-text-muted-light text-sm mt-2 font-inter">
                — Kur&apos;an-ı Kerim, Maide Suresi (5:3)
              </p>
            </div>
            <p className="text-text-muted leading-relaxed">
              Bir Cuma günü Arafat Dağı&apos;nda nazil olan bu ayet, vahyin tamamlanışını ifade eder. Böylece Arefe Günü, hem tarihi hem manevi hem de uhrevi açıdan büyük bir öneme sahiptir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Arefe orucu: kuralları ve sevabı
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Arefe orucu, hacca gitmeyen tüm Müslümanlar için bir{" "}
              <strong className="text-text-primary">müekked sünnettir</strong> (kuvvetle pekiştirilmiş sünnet). Peygamber Efendimiz (s.a.v.) şöyle buyurmuştur:
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border-l-4 border-gold mb-4">
              <p className="text-text-primary italic leading-relaxed">
                «Arefe günü orucu — Allah&apos;tan umarım ki geçmiş yılın ve gelecek yılın günahlarına kefaret olur.»
              </p>
              <p className="text-text-muted-light text-sm mt-2 font-inter">
                — Müslim (no. 1162), Ebu Katade (r.a.)&apos;dan rivayet edilmiştir
              </p>
            </div>
            <p className="text-text-muted leading-relaxed mb-4">
              Pratik olarak oruç, her İslami oruç gibi aynı kurallara tabidir:
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter pl-1 mb-4">
              <li>
                • <strong className="text-text-primary">Başlangıç:</strong> tan vaktinin doğuşunda (Fecir) — Fransa&apos;da 26 Mayıs 2026&apos;da, şehre göre yaklaşık 04:00-04:30
              </li>
              <li>
                • <strong className="text-text-primary">Bitiş:</strong> güneşin batışında (Akşam) — Fransa&apos;da yaklaşık 21:30-21:45
              </li>
              <li>
                • <strong className="text-text-primary">Niyet:</strong> bir gece önceden veya tan vaktinden önce edilir (<em>niyet</em>)
              </li>
              <li>
                • <strong className="text-text-primary">Yasaklar:</strong> gün boyunca yeme, içme, sigara ve eşlerin yakınlaşması
              </li>
            </ul>
            <p className="text-text-muted leading-relaxed mb-4">
              <strong className="text-text-primary">Önemli:</strong> Arafat&apos;ta bulunan hacılar bu günde <em>oruç tutmazlar</em>; bu, Veda Haccı&apos;nda bu günü oruçlu geçirmeyen Peygamber Efendimiz&apos;in (s.a.v.) sünnetine uygundur. Oruç, hacca gitmeyenlere mahsustur.
            </p>
            <p className="text-text-muted leading-relaxed">
              Adetli veya loğusa kadınlar, hastalar, yolcular veya oruç tutamayan yaşlı kimseler için herhangi bir mecburiyet yoktur ve günün iyiliklerinin sevabı diğer yollarla (zikir, sadaka, dua) erişilebilir kalır.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Tavsiye edilen dualar ve zikirler
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Peygamber Efendimiz (s.a.v.) şöyle buyurmuştur:
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border-l-4 border-gold mb-4">
              <p className="text-text-primary italic leading-relaxed">
                «Duaların en hayırlısı Arefe günü duasıdır. Benim ve benden önceki peygamberlerin söylediği en güzel söz şudur:
              </p>
              <p className="text-text-primary font-bold mt-3 leading-relaxed">
                «La ilahe illallahü vahdehu la şerike leh, lehü&apos;l-mülkü ve lehü&apos;l-hamdü ve hüve ala külli şey&apos;in kadir»
              </p>
              <p className="text-text-muted text-sm mt-2 italic">
                (Allah&apos;tan başka ibadete layık ilah yoktur. O, tektir, ortağı yoktur. Mülk O&apos;nundur, hamd O&apos;na mahsustur ve O her şeye kadirdir.)
              </p>
              <p className="text-text-muted-light text-sm mt-2 font-inter">
                — Tirmizi (no. 3585)
              </p>
            </div>
            <p className="text-text-muted leading-relaxed mb-4">
              Bu tevhid sözünün yanı sıra bu günü şu amellerle değerlendirmek tavsiye edilir:
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter pl-1 mb-4">
              <li>
                • <strong className="text-text-primary">Zikri</strong> çoğaltmak (Subhanallah, Elhamdülillah, Allahu Ekber)
              </li>
              <li>
                • Kendiniz, aileniz ve tüm ümmet için <strong className="text-text-primary">af dilemek (istiğfar)</strong>
              </li>
              <li>
                • <strong className="text-text-primary">Şahsi dualar</strong> etmek — bu, duaların özellikle kabul edildiği bir gündür
              </li>
              <li>
                • <strong className="text-text-primary">Kur&apos;an okumak</strong> ve manaları üzerinde tefekkür etmek
              </li>
              <li>
                • İhtiyaç sahiplerine <strong className="text-text-primary">sadaka</strong> vermek
              </li>
            </ul>
            <p className="text-text-muted leading-relaxed">
              Pek çok âlim, özellikle güneşin batışından önceki saatleri dualara ayırmayı tavsiye eder; çünkü bu, Arafat&apos;taki hacıların kendileri de tam dua vakfesinde oldukları andır.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Arefe Günü ile Kurban Bayramı arasındaki bağlantı
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Arefe Günü tek başına bir olay değildir: Kurban Bayramı&apos;nın <strong className="text-text-primary">doğrudan girişidir</strong>. 3 önemli günün sıralaması:
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border border-gold/10 mb-4">
              <ul className="space-y-3 text-text-muted text-sm font-inter">
                <li className="flex items-start gap-3">
                  <span className="text-gold font-bold whitespace-nowrap">8 Zilhicce</span>
                  <span>
                    <strong className="text-text-primary">Pazartesi 25 Mayıs 2026</strong> — <em>Yawm at-Terviye</em>, hacıların Mina&apos;ya intikal ettiği gün
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold font-bold whitespace-nowrap">9 Zilhicce</span>
                  <span>
                    <strong className="text-text-primary">Salı 26 Mayıs 2026</strong> — <em>Yawm Arefe</em>, Arefe Günü (oruç ve dualar)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold font-bold whitespace-nowrap">10 Zilhicce</span>
                  <span>
                    <strong className="text-text-primary">Çarşamba 27 Mayıs 2026</strong> — <em>Yawm an-Nahr</em>, Kurban Bayramı ve kurban kesimi
                  </span>
                </li>
              </ul>
            </div>
            <p className="text-text-muted leading-relaxed mb-4">
              <strong className="text-text-primary">Kurban</strong>, bayram gününün merkezi ibadetidir. Dört Sünni mezhebe göre kişi tarafından bizzat yerine getirilebileceği gibi başkasına da vekâlet (<em>tevkil</em>) yoluyla yaptırılabilir — bu uygulama Peygamber Efendimiz&apos;in (s.a.v.) sahabesine kadar uzanır.
            </p>
            <p className="text-text-muted leading-relaxed">
              Eğer kurbanınızı henüz organize etmediyseniz, Arefe Günü bunu yapmak için{" "}
              <strong className="text-text-primary">son ideal zamandır</strong> — büyük günün arefesi. Kurban, Arefe&apos;den sonraki 4 gün boyunca (27, 28, 29 ve 30 Mayıs 2026) geçerlidir; ancak önemli olan bu mübarek güne girmeden önce organize edilmiş olmasıdır.
            </p>
          </section>

          {/* CTA Box — central conversion bridge */}
          <div className="bg-gradient-to-br from-gold/10 via-bg-secondary to-gold/10 rounded-2xl border-2 border-gold/30 p-6 md:p-8 my-10">
            <h3 className="text-xl md:text-2xl font-black text-text-primary mb-3">
              Kurban Bayramı 2026 için kurbanınızı henüz ayırtmadınız mı?
            </h3>
            <p className="text-text-muted leading-relaxed mb-5">
              Qurbaniya, kurbanınızı Madagaskar&apos;da Sünnete uygun şekilde organize eder ve{" "}
              <strong className="text-text-primary">24 saat içinde WhatsApp&apos;tan isminize özel video</strong> gönderir. Et, yerinde ihtiyaç sahibi ailelere dağıtılır.
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter mb-5">
              <li>✓ 140 € her şey dahil</li>
              <li>✓ Bir şeyh denetiminde, Sünnete uygun kurban</li>
              <li>✓ WhatsApp ve e-posta ile gönderilen isminize özel video</li>
              <li>✓ Rezervasyon Çarşamba 27 Mayıs sabah 3&apos;e kadar açık</li>
            </ul>
            <Link
              href="/commander"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-5 py-3 rounded-xl transition-colors font-inter"
            >
              Kurbanımı Ayır <ArrowRight size={16} />
            </Link>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Arefe&apos;den sonra? Teşrik günleri
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Kurban Bayramı&apos;nın (27 Mayıs) hemen ardından{" "}
              <strong className="text-text-primary">teşrik günleri</strong> gelir (28, 29 ve 30 Mayıs 2026). Bu 3 gün boyunca:
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter pl-1 mb-4">
              <li>
                • <strong className="text-text-primary">Kurban geçerli olmaya devam eder</strong> 30 Mayıs günü güneşin batışına kadar
              </li>
              <li>
                • <strong className="text-text-primary">Tekbir</strong> (Allahu Ekber, Allahu Ekber, La ilahe illallah…), 30 Mayıs ikindi namazı dahil her farz namazın ardından getirilir
              </li>
              <li>
                • Mezheplerin çoğunluğuna göre <strong className="text-text-primary">bu günlerde oruç tutmak yasaktır</strong>; çünkü bunlar «yeme, içme ve Allah&apos;ı zikretme günleridir»
              </li>
            </ul>
            <p className="text-text-muted leading-relaxed">
              Zilhicce&apos;nin tam takvimi hakkında daha fazla bilgi için{" "}
              <Link
                href="/tr/blog/kurban-bayrami-2026-tarihi"
                className="text-gold hover:underline font-semibold"
              >
                Kurban Bayramı 2026 tarihine ayrılmış makalemize
              </Link>
              {" "}göz atın.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Arefe günü oruç tutamazsam ne yapabilirim?
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Oruç, o gün açılan pek çok ibadet kapısından sadece biridir. Oruç tutamıyorsanız (hastalık, yolculuk, adet, loğusalık, emzirme…), Arefe Günü&apos;nün bereketinden şu yollarla faydalanabilirsiniz:
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter pl-1 mb-4">
              <li>
                • <strong className="text-text-primary">Şahsi duaları çoğaltmak</strong> — duaların en çok kabul olduğu gündür
              </li>
              <li>
                • <strong className="text-text-primary">Sadaka vermek:</strong> ihtiyaç sahiplerine yardım etmek, dini bir davaya destek olmak
              </li>
              <li>
                • Kur&apos;an&apos;ı <strong className="text-text-primary">okumak ve tefekkür etmek</strong>
              </li>
              <li>
                • Gün boyunca, özellikle tevhid kelimesi olmak üzere <strong className="text-text-primary">zikre devam etmek</strong>
              </li>
              <li>
                • Henüz yapılmadıysa <strong className="text-text-primary">bayram kurbanınızı hazırlamak</strong> — başlı başına büyük bir ibadettir
              </li>
            </ul>
            <p className="text-text-muted leading-relaxed">
              O günde gösterdiğiniz samimi niyet ve gayret, hangi şekli alırsa alsın, başlı başına sevap kazandıran ibadetlerdir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Arefe Günü hakkında sıkça sorulan sorular
            </h2>
            <div className="space-y-4">
              <details className="group bg-white border border-gray-100/80 rounded-card p-5 shadow-soft">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between">
                  Arefe orucu farz mıdır?
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  Hayır, bu bir farz değil, <strong className="text-text-primary">müekked sünnettir</strong> (kuvvetle pekiştirilmiş sünnet). Peygamber Efendimiz (s.a.v.), bu orucu (2 yıllık günahlara kefaret olan) eşsiz sevabını belirterek şiddetle teşvik etmiştir. Tutmamak günah değildir, ancak olağanüstü bir manevi fırsatı kaçırmak demektir.
                </p>
              </details>

              <details className="group bg-white border border-gray-100/80 rounded-card p-5 shadow-soft">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between">
                  Arefe&apos;den önceki 8 günde de oruç tutmak gerekir mi?
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  <strong className="text-text-primary">Zilhicce&apos;nin ilk 9 günü</strong> orucu (Fransa&apos;da 17 ila 25 Mayıs 2026), birçok hadise göre bir sünnettir. Peygamber Efendimiz (s.a.v.), bu ilk 10 günün amellerinin Allah&apos;a en sevimli ameller olduğunu bildirmiştir. Ancak bu oruç şart değildir: diğer günleri tutamayan kişi, sadece Arefe gününü (9 Zilhicce) oruçlu geçirebilir.
                </p>
              </details>

              <details className="group bg-white border border-gray-100/80 rounded-card p-5 shadow-soft">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between">
                  Arefe Günü dünyanın her yerinde aynı güne mi denk gelir?
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  Ülkelerin <em>çoğunluğu</em> Suudi tarihine (Salı 26 Mayıs 2026) uyar; çünkü hacıların Mekke&apos;de Arafat vakfesini gerçekleştirdiği gündür. Bazı ülkeler, yerel hilal gözlemine göre bir gün kaydırabilir. Fransa&apos;da federasyonların çoğunluğu Suudi tarihini takip eder, dolayısıyla Salı 26 Mayıs 2026.
                </p>
              </details>

              <details className="group bg-white border border-gray-100/80 rounded-card p-5 shadow-soft">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between">
                  Bir gece önceden niyet etmeyi unutursam ne yapmalıyım?
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  Arefe gibi nafile bir oruçta niyet, tan vaktinden bu yana hiçbir şey yiyip içmediğiniz sürece <strong className="text-text-primary">gün içinde</strong> edilebilir. Bu, gönüllü oruç için tanınan bir kolaylıktır. 26 Mayıs 2026 sabahı uyandığınızda hiçbir şey tüketmediyseniz, o anda niyet edip orucunuza başlayabilirsiniz.
                </p>
              </details>

              <details className="group bg-white border border-gray-100/80 rounded-card p-5 shadow-soft">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between">
                  Arefe Günü ile Hac arasındaki fark nedir?
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  <strong className="text-text-primary">Hac</strong>, Mekke&apos;ye yapılan ve birkaç güne yayılan (8&apos;den 13 Zilhicce&apos;ye kadar) eksiksiz hac ibadetidir (İslam&apos;ın 5. şartı). <strong className="text-text-primary">Arefe Günü</strong> (9 Zilhicce), Hac&apos;ın <em>belirli bir günüdür</em> ve onun merkezi ibadeti sayılır. Hacca gitmeyenler için ise oruç ve dualarla yoğun bir ibadet günüdür; herhangi bir yere seyahat etmek gerekmez.
                </p>
              </details>
            </div>
          </section>
        </div>

        <LanguageSwitcher
          canonicalSlug="jour-arafat-2026"
          currentLocale="tr"
          className="mb-6"
        />

        {/* Bottom navigation */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/tr/blog"
            className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors font-inter text-sm"
          >
            <ArrowLeft size={14} /> Blog&apos;a dön
          </Link>
          <Link
            href="/tr/blog/kurban-bayrami-2026-tarihi"
            className="flex items-center gap-2 text-gold font-semibold font-inter text-sm"
          >
            Sonraki makale: Kurban Bayramı 2026 Tarihi <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    </>
  );
}
