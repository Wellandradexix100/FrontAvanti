/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#F5DCFF",
          surface: "#EAD7F1",
          DEFAULT: "#420C57",
          dark: "#420C57",
        },
        cta: {
          hover: "#c43aff",
        },
        slate: {
          800: "#1E293B",
          900: "#0F172A",
        },
        accent: "#10B981",
      },
      fontFamily: {
        sans: ["Roboto", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        glow: "0 0 18px rgba(196,58,255,0.72)",
        "glow-soft": "0 0 16px rgba(196,58,255,0.55)",
      },
    },
  },
  plugins: [],
};
