import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#e0d5e8",
        input: "#f1e3ff",
        ring: "#a9def9",
        background: "#FCF5FF",
        foreground: "#4B3B63",
        primary: {
          DEFAULT: "#a9def9",
          foreground: "#1F1729"
        },
        secondary: {
          DEFAULT: "#FFE3B3",
          foreground: "#4B3B63"
        },
        destructive: {
          DEFAULT: "#FCA5A5",
          foreground: "#7F1D1D"
        },
        muted: {
          DEFAULT: "#EEE3FF",
          foreground: "#6B5A80"
        },
        accent: {
          DEFAULT: "#FFD166",
          foreground: "#78350F"
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#4B3B63"
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#4B3B63"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(135deg, rgba(245,247,250,0.8) 0%, rgba(231,218,255,0.8) 100%)',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
