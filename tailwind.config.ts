import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    //"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // NextUIの型を読み込む
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;