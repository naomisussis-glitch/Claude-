import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        cream: "#FAF7F2",
        blush: "#E8C4B8",
        sage: "#8FAF8F",
        charcoal: "#2C2C2C",
        gold: "#C9A96E",
      },
    },
  },
  plugins: [],
};

export default config;
