/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Roboto", "san-serif"],
      headings: ["Poppins", "san-serif"],
    },
    extend: {
      screens: {
        "800px": "800px"
      }
    }
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
            primary: "#f97316",
            secondary: "#f000b8",
            accent: "#1dcdbc",
            neutral: "#2e2e3a",
            base_100: "#ffffff",
            success: "#36d399",
            warning: "#fbbd23",
            error: "#f87272"
      }}
    ]
}
}