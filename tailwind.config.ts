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
        border: "#1C1C1C", // Dark charcoal border
        input: "#2C2C2C", // Slightly lighter input
        ring: "#FFD700", // Gold ring
        background: "#000000", // Pure black background
        foreground: "#FFD700", // Gold text
        primary: {
          DEFAULT: "#FFD700", // Gold primary
          foreground: "#000000" // Black text on gold background
        },
        secondary: {
          DEFAULT: "#1C1C1C", // Dark charcoal secondary
          foreground: "#FFD700" // Gold text on secondary
        },
        destructive: {
          DEFAULT: "#FF4500", // Orangered for destructive actions
          foreground: "#FFFFFF"
        },
        muted: {
          DEFAULT: "#2C2C2C", // Muted dark gray
          foreground: "#A9A9A9" // Dim gray text
        },
        accent: {
          DEFAULT: "#FFD700", // Gold accent
          foreground: "#000000"
        },
        popover: {
          DEFAULT: "#1C1C1C", // Dark popover
          foreground: "#FFD700"
        },
        card: {
          DEFAULT: "#1C1C1C", // Dark card
          foreground: "#FFD700"
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
