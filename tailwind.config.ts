import type { Config } from "tailwindcss";
const {nextui} = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#272829",
        secondary: "#61677A",
        buttons: "#D8D9DA",
        typography: "#FFF6E0",
        "primary-aliansalud": "#64a414",
        "secondary-aliansalud": "#FFF6E0",
        "primary-neps": "#4c94cc",

      }
    },
  },
  plugins: [nextui()],
};
export default config;
