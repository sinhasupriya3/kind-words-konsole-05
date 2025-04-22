
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
        border: "#e9ecef",
        input: "#f1f3f5",
        ring: "#A5B4FC",
        background: "#ffffff",
        foreground: "#4B5563",
        primary: {
          DEFAULT: "#A5B4FC",
          foreground: "#1F2937"
        },
        secondary: {
          DEFAULT: "#F3F4F6",
          foreground: "#4B5563"
        },
        destructive: {
          DEFAULT: "#FCA5A5",
          foreground: "#7F1D1D"
        },
        muted: {
          DEFAULT: "#F3F4F6",
          foreground: "#6B7280"
        },
        accent: {
          DEFAULT: "#FDE68A",
          foreground: "#78350F"
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#4B5563"
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#4B5563"
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
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
