/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/offrandes",
        destination: "/commander",
        permanent: true,
      },
      {
        source: "/offres",
        destination: "/commander",
        permanent: true,
      },
      {
        source: "/sacrifice",
        destination: "/commander",
        permanent: true,
      },
      {
        source: "/sacrifice-aid-2026",
        destination: "/commander",
        permanent: true,
      },
      {
        source: "/products/:slug*",
        destination: "/commander",
        permanent: true,
      },
      {
        source: "/collections/:slug*",
        destination: "/commander",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            // Header XSS auditeur déprécié : "1; mode=block" peut introduire
            // des vulnérabilités sur de vieux navigateurs. La reco moderne est
            // "0" (désactivé) + s'appuyer sur une CSP (à ajouter séparément).
            key: "X-XSS-Protection",
            value: "0",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            // Content-Security-Policy — défense en profondeur XSS/exfiltration.
            // 'unsafe-inline' requis par Next (scripts d'hydratation) + Framer
            // Motion (styles inline). Sources externes minimales : Supabase
            // (API client + images /impact), Unsplash (images), Vercel
            // Analytics/Speed Insights. Stripe est 100% server-side (checkout
            // en redirection) → rien à autoriser. Pas de realtime → pas de wss.
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://smhpeolksotaabdnfcxf.supabase.co https://images.unsplash.com",
              "media-src 'self' https://smhpeolksotaabdnfcxf.supabase.co",
              "font-src 'self' data:",
              "connect-src 'self' https://smhpeolksotaabdnfcxf.supabase.co https://va.vercel-scripts.com",
              "frame-src 'self'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "object-src 'none'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
      {
        source: "/(.*)\\.(js|css|svg|png|jpg|webp|avif|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
