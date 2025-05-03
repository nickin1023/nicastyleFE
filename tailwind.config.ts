import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)"
      },
      typography: (theme: PluginAPI["theme"]) => ({
        DEFAULT: {
          css: {
            color: "#333",
            a: {
              color: "#3182ce",
              "&:hover": {
                color: "#2c5282"
              }
            },
            code: {
              backgroundColor: theme("colors.gray.100"),
              color: "#964a91",
              // セレクタ内のプロパティを削除
              fontWeight: false,
              // 自分で設定した値も参照できる
              padding: `${theme("spacing[0.5]")} ${theme("spacing.1")}`,
              borderRadius: theme("borderRadius.sm")
            },
            "code::before": false,
            "code::after": false
          }
        }
      })
    }
  },
  safelist: [{ pattern: /grid*/ }],
  plugins: [require("@tailwindcss/typography")],
  future: {
    hoverOnlyWhenSupported: true
  }
};
export default config;
