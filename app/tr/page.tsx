import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Kurban Bayramı 2026 Fransa — Online Kurban Hizmeti",
  description:
    "Kurban Bayramı 2026 (27 Mayıs Çarşamba) için Fransa'dan kurbanınızı vekâleten kestirin. Şeyh denetiminde kesim, isminize özel video, Madagaskar'daki ihtiyaç sahibi ailelere dağıtım. 140€ her şey dahil.",
  keywords: [
    "kurban bayramı 2026",
    "kurban bayramı 2026 fransa",
    "online kurban 2026",
    "vekaletle kurban",
    "kurbanlik koyun fiyati 2026",
    "adaklik koyun fiyatları 2026",
    "kurban kesim hizmeti",
    "fransa kurban kesimi",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/tr",
    languages: {
      "fr-FR": "https://qurbaniya.fr",
      "en": "https://qurbaniya.fr/en",
      "ar": "https://qurbaniya.fr/ar",
      "tr": "https://qurbaniya.fr/tr",
    },
  },
  openGraph: {
    title: "Kurban Bayramı 2026 Fransa — Online Kurban Hizmeti",
    description:
      "Fransa'dan vekâletle kurban kesimi: şeyh denetimi, isminize özel video kanıt, ihtiyaç sahiplerine dağıtım. 27 Mayıs 2026.",
    url: "https://qurbaniya.fr/tr",
    locale: "tr_TR",
    type: "website",
  },
};

export default function TrHomePage() {
  return (
    <article className="max-w-3xl mx-auto px-4">
      {/* Language switcher */}
      <nav className="flex items-center gap-3 text-sm mb-8 font-inter">
        <Link href="/" className="text-text-muted hover:text-gold transition-colors">
          Français
        </Link>
        <span className="text-text-muted-light">·</span>
        <Link href="/ar" className="text-text-muted hover:text-gold transition-colors">
          العربية
        </Link>
        <span className="text-text-muted-light">·</span>
        <span className="text-gold font-semibold">Türkçe</span>
      </nav>

      {/* Hero */}
      <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6 text-text-primary">
        Kurban Bayramı 2026 Fransa — <span className="text-gold">Vekâletle Kurban</span> Hizmeti
      </h1>

      <p className="text-lg text-text-muted leading-relaxed mb-8 border-l-4 border-gold pl-4">
        Kurban Bayramı 2026, <strong className="text-text-primary">27 Mayıs Çarşamba</strong> günü idrak edilecek. Fransa&apos;dan ya da Avrupa&apos;dan vekâlet vererek kurbanınızı kestirebilirsiniz: kesim şeyh denetiminde, isminize özel video kanıtı ile, et Madagaskar&apos;daki ihtiyaç sahibi ailelere dağıtılır.
      </p>

      {/* 3 key bullets */}
      <div className="space-y-5 mb-10">
        <div className="bg-bg-secondary rounded-xl p-5 border border-gold/10">
          <h2 className="text-gold font-bold text-sm uppercase tracking-wider mb-2 font-inter">1 — Vekâlet Caizdir</h2>
          <p className="text-text-muted leading-relaxed">
            Vekâletle kurban kesimi, dört mezhep âlimlerinin ittifakıyla caizdir (Hanefî, Mâlikî, Şâfiî, Hanbelî). Peygamberimizin (s.a.v.) sünnetinde yer alır.
          </p>
        </div>

        <div className="bg-bg-secondary rounded-xl p-5 border border-gold/10">
          <h2 className="text-gold font-bold text-sm uppercase tracking-wider mb-2 font-inter">2 — Belgelenmiş Kesim</h2>
          <p className="text-text-muted leading-relaxed">
            Kesim, şeyh denetiminde, tam adınızla, bayram günü gerçekleştirilir. WhatsApp üzerinden isminize özel video kanıtı alırsınız.
          </p>
        </div>

        <div className="bg-bg-secondary rounded-xl p-5 border border-gold/10">
          <h2 className="text-gold font-bold text-sm uppercase tracking-wider mb-2 font-inter">3 — İhtiyaç Sahiplerine Dağıtım</h2>
          <p className="text-text-muted leading-relaxed">
            Kurban eti, Madagaskar&apos;daki ihtiyaç sahibi ailelere dağıtılır. Sadaka ve kurbanın gerçek ruhuna uygun olarak.
          </p>
        </div>
      </div>

      {/* Price + CTA */}
      <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 md:p-8 text-center mb-10">
        <p className="text-white/80 text-sm uppercase tracking-wider mb-2 font-inter">Her Şey Dahil Fiyat</p>
        <p className="text-white text-4xl font-black mb-4 font-playfair">140 €</p>
        <p className="text-white/70 text-sm mb-5 font-inter">
          Sünnete uygun koyun · Şeyh denetimi · Kişisel video · Hayır dağıtımı
        </p>
        <Link
          href="/commander"
          className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
        >
          Kurbanımı Şimdi Ayırt <ArrowRight size={14} />
        </Link>
      </div>

      {/* FAQ short */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-text-primary mb-5">Sıkça Sorulan Sorular</h2>

        <div className="space-y-5">
          <div>
            <h3 className="font-bold text-text-primary mb-2">Kurban Bayramı 2026 ne zaman?</h3>
            <p className="text-text-muted leading-relaxed">
              27 Mayıs 2026 Çarşamba (10 Zilhicce 1447). Kesim 27-30 Mayıs 2026 tarihleri arasında geçerlidir.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-text-primary mb-2">Vekâletle kurban kesimi caiz mi?</h3>
            <p className="text-text-muted leading-relaxed">
              Evet, dört mezhebe göre tamamen caizdir. Peygamberimiz (s.a.v.) bizzat Hz. Ali&apos;ye (r.a.) hedy kurbanlarının kesimini vekâleten devretmiştir.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-text-primary mb-2">Kurbanımın kesildiğini nasıl bileceğim?</h3>
            <p className="text-text-muted leading-relaxed">
              Bayram günü WhatsApp üzerinden, tam adınızı içeren ve kesim anını gösteren kişisel bir video alırsınız.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-text-primary mb-2">Et nereye dağıtılıyor?</h3>
            <p className="text-text-muted leading-relaxed">
              Et, Madagaskar&apos;daki ihtiyaç sahibi ailelere yerel ekibimiz tarafından dağıtılır.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 text-center">
        <h3 className="text-white font-bold text-lg mb-3 font-playfair">
          Gecikmeyin — Yerler Sınırlı
        </h3>
        <Link
          href="/commander"
          className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
        >
          Kurbanımı Şimdi Ayırt <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}
