import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        skywash: "#effaff",
        ink: "#243044",
        candy: "#ff4f88",
        sunny: "#ffc936",
        grass: "#54c86a",
        ocean: "#24a8ff",
        grape: "#8b5cf6"
      },
      boxShadow: {
        soft: "0 24px 60px rgba(47, 84, 131, 0.16)",
        button: "0 12px 24px rgba(255, 79, 136, 0.28)"
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: []
};

export default config;
