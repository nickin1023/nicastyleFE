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
      fontFamily: {
        linejp: ["LINESeedJP", "sans-serif"]
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        neumorphismBg: "#fff9e6",
        neumorphismWhiteBg: "#ffffff"
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
      }),
      boxShadow: {
        neumorphism:
          // シャドウサイズを大きく＆コントラスト強調
          "12px 12px 35px rgba(180, 160, 120, 0.6), -12px -12px 35px rgba(255, 255, 255, 0.9)",
        neumorphismInset:
          // インセット影も対応調整
          "inset 12px 12px 35px rgba(180, 160, 120, 0.4), inset -12px -12px 35px rgba(255, 255, 255, 0.9)",
        neumorphismWhite:
          "12px 12px 35px rgba(200, 200, 200, 0.6), -12px -12px 35px #fff",
        neumorphismWhiteInset:
          "inset 12px 12px 35px rgba(200, 200, 200, 0.4), inset -12px -12px 35px #fff"
      },
      transitionProperty: {
        "box-shadow": "box-shadow"
      },
      padding: {
        "50": "50px"
      },
      borderRadius: {
        "10": "10px"
      }
    }
  },
  safelist: [{ pattern: /grid*/ }],
  plugins: [require("@tailwindcss/typography")],
  future: {
    hoverOnlyWhenSupported: true
  }
};
export default config;
