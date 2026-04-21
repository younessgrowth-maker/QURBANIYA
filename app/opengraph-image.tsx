import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Qurbaniya — Sacrifice Aïd al-Adha 2026 avec vidéo nominative";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(135deg, #0F2E21 0%, #1B4332 55%, #2D6A4F 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top row — logo + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="g" x1="15%" y1="15%" x2="85%" y2="85%">
                <stop offset="0%" stopColor="#EACE7E" />
                <stop offset="45%" stopColor="#C9A84C" />
                <stop offset="100%" stopColor="#8B6508" />
              </linearGradient>
              <mask id="c">
                <rect width="64" height="64" fill="black" />
                <circle cx="28" cy="34" r="22" fill="white" />
                <circle cx="38" cy="28" r="19" fill="black" />
              </mask>
            </defs>
            <rect width="64" height="64" fill="url(#g)" mask="url(#c)" />
            <path
              transform="translate(50 16)"
              d="M 0,-7.5 L 1.72,-2.32 L 7.13,-2.32 L 2.76,0.89 L 4.41,6.07 L 0,2.86 L -4.41,6.07 L -2.76,0.89 L -7.13,-2.32 L -1.72,-2.32 Z"
              fill="url(#g)"
            />
          </svg>
          <div
            style={{
              display: "flex",
              fontSize: 42,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#EACE7E",
            }}
          >
            Qurbaniya
          </div>
        </div>

        {/* Middle — main copy */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C9A84C",
            }}
          >
            Aïd al-Adha · Mai 2026
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Déléguez votre sacrifice
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#EACE7E",
            }}
          >
            en toute confiance
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "rgba(255,255,255,0.78)",
              fontWeight: 400,
              marginTop: 8,
            }}
          >
            Mouton conforme à la Sunnah · Vidéo nominative WhatsApp · 140€
          </div>
        </div>

        {/* Bottom row — trust + domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <div style={{ display: "flex", gap: 28 }}>
            <div style={{ display: "flex" }}>Cheikh diplômé</div>
            <div style={{ display: "flex" }}>Preuve vidéo</div>
            <div style={{ display: "flex" }}>+300 familles</div>
          </div>
          <div style={{ display: "flex", color: "#EACE7E", fontWeight: 600 }}>
            qurbaniya.fr
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
