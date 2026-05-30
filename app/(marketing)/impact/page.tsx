import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nos actions — L'impact de vos sacrifices | Qurbaniya",
  description:
    "Découvrez en images la distribution de la viande de l'Aïd al-Adha (2025 et 2026) aux familles dans le besoin, dans des villages reculés de Madagascar. Voici à qui vos sacrifices ont profité.",
  alternates: { canonical: "https://qurbaniya.fr/impact" },
};

// Médias hébergés sur Supabase storage (bucket public "impact").
const STORAGE =
  "https://smhpeolksotaabdnfcxf.supabase.co/storage/v1/object/public/impact";
const BASE = `${STORAGE}/2026`;
const BASE_2025 = `${STORAGE}/2025`;

const PHOTOS = [
  { src: `${BASE}/distribution-1.jpg`, alt: "Des centaines de familles rassemblées pour la distribution de la viande à Madagascar" },
  { src: `${BASE}/distribution-2.jpg`, alt: "Vue aérienne d'un village reculé de Madagascar lors de la distribution" },
  { src: `${BASE}/distribution-3.jpg`, alt: "Distribution de la viande de l'Aïd aux habitants du village" },
  { src: `${BASE}/distribution-4.jpg`, alt: "Familles recevant leur part de viande pour l'Aïd al-Adha" },
  { src: `${BASE}/distribution-5.jpg`, alt: "Des femmes du village reçoivent leur part de viande de l'Aïd à Madagascar" },
  { src: `${BASE}/distribution-6.jpg`, alt: "Hommes et jeunes du village repartant avec leur part de viande de l'Aïd" },
];

const VIDEOS = [
  { src: `${BASE}/distribution-video-1.mp4`, poster: `${BASE}/distribution-3.jpg` },
  { src: `${BASE}/distribution-video-2.mp4`, poster: `${BASE}/distribution-4.jpg` },
];

// Aïd 2025 — première édition, preuve de track record.
const PHOTO_2025 = {
  src: `${BASE_2025}/distribution-1.jpg`,
  alt: "Distribution de la viande de l'Aïd 2025 aux familles d'un village de Madagascar",
};
const VIDEO_2025 = {
  src: `${BASE_2025}/distribution-video-1.mp4`,
  poster: `${BASE_2025}/distribution-1.jpg`,
};

export default function ImpactPage() {
  return (
    <main className="bg-bg-primary">
      {/* Hero — pt augmenté pour dégager le header fixe (72px) */}
      <section className="section-padding pt-28 md:pt-36">
        <div className="max-w-4xl mx-auto text-center px-4">
          <p className="text-gold font-bold uppercase tracking-[0.2em] text-xs mb-4">
            Aïd al-Adha 2026 · Madagascar
          </p>
          <h1 className="text-3xl md:text-5xl font-black uppercase text-text-primary leading-tight mb-6">
            L&apos;impact de votre{" "}
            <span className="text-primary">sacrifice</span>
          </h1>
          <p className="text-lg text-text-muted leading-relaxed max-w-2xl mx-auto">
            Depuis 2025, nous menons chaque année cette action dans des
            <strong className="text-text-primary"> villages reculés de Madagascar</strong>,
            là où le besoin est le plus grand et où la viande arrive rarement.
            Grâce à vous, des centaines de familles ont pu célébrer l&apos;Aïd
            dignement. Voici à qui votre sacrifice a profité.
          </p>
        </div>
      </section>

      {/* Photos 2026 */}
      <section className="pb-12">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black uppercase text-text-primary text-center mb-8">
            Aïd 2026
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PHOTOS.map((photo, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full aspect-[4/3] rounded-card shadow-soft object-cover"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Vidéos */}
      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black uppercase text-text-primary text-center mb-8">
            La distribution en vidéo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VIDEOS.map((video, i) => (
              <video
                key={i}
                controls
                preload="metadata"
                playsInline
                poster={video.poster}
                className="w-full aspect-video rounded-card shadow-soft bg-black object-cover"
              >
                <source src={video.src} type="video/mp4" />
                Votre navigateur ne supporte pas la lecture vidéo.
              </video>
            ))}
          </div>
        </div>
      </section>

      {/* Texte de fond — la démarche */}
      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-white rounded-card p-8 md:p-10 shadow-soft border border-gray-100/80">
            <p className="text-text-muted leading-relaxed mb-4">
              Chaque sacrifice a été effectué durant les jours autorisés de
              l&apos;Aïd, dans le strict respect de la Sunnah, par notre cheikh.
              La viande n&apos;a pas été distribuée dans une grande ville
              facilement accessible, mais dans des villages isolés où elle
              change réellement le quotidien des familles.
            </p>
            <p className="text-text-muted leading-relaxed mb-6">
              C&apos;est ce qui donne tout son sens à votre intention&nbsp;:
              nourrir ceux qui en ont le plus besoin. Qu&apos;Allah accepte
              votre sacrifice et celui de tous les musulmans.
            </p>
            <p className="text-gold font-bold italic font-serif">
              Taqabbal Allahu minna wa minkum 🤲
            </p>
          </div>
        </div>
      </section>

      {/* Aïd 2025 — première édition, track record */}
      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black uppercase text-text-primary text-center mb-3">
            Aïd 2025 — notre première édition
          </h2>
          <p className="text-text-muted text-center max-w-2xl mx-auto mb-8">
            Ce n&apos;est pas notre première année. En 2025 déjà, grâce à la
            confiance de <strong className="text-text-primary">93 familles</strong>,
            nous avons pu accomplir <strong className="text-text-primary">102 sacrifices</strong>{" "}
            et distribuer la viande dans des villages reculés de Madagascar.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PHOTO_2025.src}
              alt={PHOTO_2025.alt}
              loading="lazy"
              className="w-full aspect-video rounded-card shadow-soft object-cover"
            />
            <video
              controls
              preload="metadata"
              playsInline
              poster={VIDEO_2025.poster}
              className="w-full aspect-video rounded-card shadow-soft bg-black object-cover"
            >
              <source src={VIDEO_2025.src} type="video/mp4" />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
          </div>
        </div>
      </section>

      {/* CTA waitlist 2027 */}
      <section className="pb-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-text-muted mb-4">
            Vous souhaitez renouveler votre confiance l&apos;an prochain&nbsp;?
          </p>
          <Link
            href="/commander"
            className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
          >
            S&apos;inscrire pour l&apos;Aïd 2027
          </Link>
        </div>
      </section>
    </main>
  );
}
