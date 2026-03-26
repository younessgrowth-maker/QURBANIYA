import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Primary — Vert islamique profond */
        primary: "#1B4332",
        "primary-light": "#2D6A4F",
        "primary-dark": "#14342A",

        /* Gold — Or islamique */
        gold: "#B8860B",
        "gold-light": "#D4A843",
        "gold-dark": "#8B6508",

        /* Backgrounds */
        "bg-primary": "#FEFCF8",
        "bg-secondary": "#F7F3ED",
        "bg-tertiary": "#EFE9DF",
        "bg-dark": "#1B4332",

        /* Text */
        "text-primary": "#1A1A18",
        "text-muted": "#5C5347",
        "text-muted-light": "#8C8279",

        /* Status */
        success: "#2D6A4F",
        warning: "#D4A843",
        error: "#C0392B",
        urgency: "#C0392B",

        /* Legacy aliases */
        emerald: "#2D6A4F",
        "emerald-light": "#3D8C69",
        "emerald-dark": "#1B4332",
        "green-accent": "#2D6A4F",
        "green-light": "#3D8C69",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        button: "10px",
        input: "10px",
      },
      boxShadow: {
        soft: "0 1px 3px rgba(26,26,24,0.04), 0 4px 12px rgba(26,26,24,0.03)",
        medium: "0 2px 6px rgba(26,26,24,0.06), 0 8px 24px rgba(26,26,24,0.05)",
        elevated: "0 4px 12px rgba(26,26,24,0.08), 0 16px 40px rgba(26,26,24,0.06)",
        "glow-primary": "0 4px 20px rgba(27,67,50,0.2)",
        "glow-gold": "0 4px 20px rgba(184,134,11,0.15)",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "pulse-gold": "pulse-gold 2s ease-in-out infinite",
        "glow-pulse": "glow-pulse-kf 3s ease-in-out infinite",
        "gradient-shift": "gradient-shift-kf 20s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-gold": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "glow-pulse-kf": {
          "0%, 100%": { boxShadow: "0 4px 20px rgba(184, 134, 11, 0.15)" },
          "50%": { boxShadow: "0 4px 30px rgba(184, 134, 11, 0.3)" },
        },
        "gradient-shift-kf": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
