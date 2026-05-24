import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Blog — Kurban Bayramı Kurban Rehberleri | Qurbaniya",
  description:
    "Kurban Bayramı kurbanı hakkında kapsamlı rehberler: tarihler, fiyatlar, İslami kurallar, pratik tavsiyeler. Kurbanınızı ayırtmadan önce bilmeniz gereken her şey.",
  alternates: {
    canonical: "https://qurbaniya.fr/tr/blog",
    languages: {
      "fr-FR": "https://qurbaniya.fr/blog",
      en: "https://qurbaniya.fr/en/blog",
      ar: "https://qurbaniya.fr/ar/blog",
      tr: "https://qurbaniya.fr/tr/blog",
      es: "https://qurbaniya.fr/es/blog",
    },
  },
  openGraph: {
    title: "Qurbaniya Blog — Kurban Bayramı Kurban Rehberleri",
    description:
      "Kurban Bayramı kurbanı hakkında kapsamlı rehberler: tarihler, fiyatlar, kurallar, tavsiyeler.",
    url: "https://qurbaniya.fr/tr/blog",
    locale: "tr",
  },
};

const articles = [
  {
    slug: "arefe-gunu-2026",
    title: "🌙 Arefe Günü 2026: Salı 26 Mayıs · Oruç, Faziletler, Dualar",
    excerpt:
      "9 Zilhicce 2026, Salı 26 Mayıs'a denk gelir. Arefe orucu (2 yıl günahların affı), faziletler, tavsiye edilen dualar ve Kurban Bayramı ile bağlantısı hakkında her şey.",
    date: "24 Mayıs 2026",
    readTime: "7 dak.",
    category: "Dini rehber",
  },
  {
    slug: "kurban-bayrami-2026-geri-sayim",
    title: "🌙 Kurban Bayramı 2026'ya kaç gün kaldı?",
    excerpt: "Kurban Bayramı 2026 (Çarşamba 27 Mayıs) için resmi geri sayım. Tam takvim (Arefe, teşrik), neden 27 Mayıs ve şimdi ne yapmalı.",
    date: "12 Mayıs 2026",
    readTime: "4 dak.",
    category: "Geri sayım",
  },
  {
    slug: "son-dakika-kurban-rezervasyonu-2026",
    title: "🚨 Son dakika Kurban Bayramı kurban rezervasyonu 2026",
    excerpt: "Henüz ayırtmadınız mı? İşte son dakika (D-15 ila D-1) huzur içinde nasıl sipariş verilir. Süreler, seçenekler, kaçırmamak için ipuçları.",
    date: "12 Mayıs 2026",
    readTime: "5 dak.",
    category: "Acil",
  },
  {
    slug: "tabaski-2026-fransa",
    title: "Tabaski 2026 Fransa'da: Kurbanınızı Fransa'dan tevkil etmek",
    excerpt: "Bu yıl Tabaski 2026 için memleketinizden uzakta mısınız? Kurbanda tevkil 4 mezhep tarafından da kabul edilmiştir. Tarih, mekanik ve Fransa'dan nasıl ayırtılır.",
    date: "11 Mayıs 2026",
    readTime: "7 dak.",
    category: "Batı Afrika diasporası",
  },
  {
    slug: "kurban-koyunu-fiyati-2026-fransa",
    title: "Kurban Bayramı 2026 koyunu Fransa'da ne kadar?",
    excerpt: "140 € (online) ila 450 €+ (canlı + sertifikalı mezbaha): Fransa'da Kurban Bayramı 2026 koyunu almak için 3 yolun kapsamlı karşılaştırması.",
    date: "7 Mayıs 2026",
    readTime: "7 dak.",
    category: "Fiyat karşılaştırması",
  },
  {
    slug: "kurban-bayrami-2026-tarihi",
    title: "Kurban Bayramı 2026 tarihi: Bilmeniz gereken her şey",
    excerpt: "Kurban Bayramı 2026, 27 Mayıs için planlanmıştır. Kesin tarihleri, teşrik günlerini ve bu yıl kurbanınızı nasıl hazırlayacağınızı keşfedin.",
    date: "15 Mart 2026",
    readTime: "5 dak.",
    category: "Rehber",
  },
  {
    slug: "online-kurban-nasil-yapilir",
    title: "Online Kurban Bayramı kurbanı: nasıl çalışır?",
    excerpt: "Online kurban tevkili Sünnete uygundur. Sipariş aşamasından adınıza özel video alımına kadar adım adım süreç.",
    date: "10 Mart 2026",
    readTime: "7 dak.",
    category: "Pratik rehber",
  },
  {
    slug: "fransa-koyun-fiyati-2026",
    title: "Fransa'da koyun fiyatı 2026: neden tevkil daha akıllıca",
    excerpt: "Detaylı fiyat karşılaştırması: Fransa'da koyun satın almak (350-400 €) vs online tevkil (140 €). Avantajlar fiyatın çok ötesinde.",
    date: "5 Mart 2026",
    readTime: "6 dak.",
    category: "Karşılaştırma",
  },
];

export default function TrBlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", url: "https://qurbaniya.fr/tr" },
          { name: "Blog", url: "https://qurbaniya.fr/tr/blog" },
        ]}
      />
      <div className="text-center mb-12">
        <span className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-3 block font-inter">
          Blog
        </span>
        <h1 className="text-3xl md:text-4xl font-black uppercase mb-4">
          REHBERLER & <span className="text-gold">TAVSİYELER</span>
        </h1>
        <p className="text-text-muted max-w-xl mx-auto">
          Kurban Bayramı kurbanı, İslami kurallar ve siparişinizi nasıl iyi hazırlayacağınız hakkında bilmeniz gereken her şey.
        </p>
      </div>

      <div className="space-y-6">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/tr/blog/${article.slug}`}
            className="group block bg-white rounded-xl border border-gray-100 p-6 md:p-8 hover:border-gold/20 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-3">
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
              Makaleyi oku
              <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center bg-gradient-to-r from-primary to-primary-light rounded-xl p-8 md:p-10">
        <h3 className="text-white font-bold text-xl md:text-2xl mb-3 font-playfair">
          Kurbanınızı ayırtmaya hazır mısınız?
        </h3>
        <p className="text-white/70 mb-6 font-inter">
          Sünnete uygun koyun, isminize özel video, 140 €&apos;dan itibaren.
        </p>
        <Link
          href="/commander"
          className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
        >
          Kurbanımı Ayır <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
