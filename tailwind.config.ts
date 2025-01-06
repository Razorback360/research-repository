import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
		extend: {
			colors: {
				"primary": '#008DC3',
				"primary-light": '#E3E0D2',
				"secondary": {
          900: "#748995",
          800: "#8295a0",
          700: "#90a1aa",
          600: "#9eacb5",
          500: "#acb8bf",
          400: "#bac4ca",
          300: "#c7d0d5",
          200: "#d5dcdf"
        },
        "secondary-dark": {
          900: "#000000",
          800: "#1a1a1a",
          700: "#333333",
          600: "#4d4d4d",
          500: "#666666",
          400: "#808080",
          300: "#999999",
          200: "#b3b3b3"
        }
			},
      fontFamily: {
        'sans': ['"Stag Sans"', '"GE Dinar One"']
      }
		}
	},
  plugins: [],
} satisfies Config;
