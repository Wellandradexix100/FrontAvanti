/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#F0F7FF",
          DEFAULT: "#2563EB",
          dark: "#1E40AF",
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
    },
  },
  plugins: [],
};
