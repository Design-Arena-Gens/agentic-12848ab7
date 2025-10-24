import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"]
      },
      colors: {
        primary: {
          DEFAULT: "#4F46E5",
          foreground: "#F5F3FF"
        },
        accent: {
          DEFAULT: "#14B8A6",
          foreground: "#F0FDFA"
        }
      }
    }
  },
  plugins: []
};

export default config;
