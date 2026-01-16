/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Tu paleta de colores
        "primary-100": "#2E8B57",
        "primary-200": "#61bc84",
        "primary-300": "#c6ffe6",
        "accent-100": "#8FBC8F",
        "accent-200": "#345e37",
        "text-100": "#FFFFFF",
        "text-200": "#e0e0e0",
        "bg-100": "#1E1E1E",
        "bg-200": "#2d2d2d",
        "bg-300": "#454545",

        // Alias para usar más fácil
        primary: "#2E8B57",
        "primary-light": "#61bc84",
        "primary-bright": "#c6ffe6",
        accent: "#8FBC8F",
        "accent-dark": "#345e37",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        gradient: "gradient 8s ease infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
