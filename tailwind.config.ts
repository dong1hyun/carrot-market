import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        //layout.tsx에서 만든 gothic, rubik text 변수를 가리킴
        rubick: "var(--rubick-text)",
        gothic: "var(--gothic)"
      },
      margin: {
        myMargin: "200px"
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms")
  ],
};
export default config;