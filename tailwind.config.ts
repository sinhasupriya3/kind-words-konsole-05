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
        border: "#2C2C2C",
        input: "#3C3C3C",
        ring: "#9b87f5",
        background: "#000000",
        foreground: "#9b87f5",
        primary: {
          DEFAULT: "#9b87f5",
          foreground: "#000000"
        },
        secondary: {
          DEFAULT: "#2C2C2C",
          foreground: "#9b87f5"
        },
        destructive: {
          DEFAULT: "#FF4500",
          foreground: "#FFFFFF"
        },
        muted: {
          DEFAULT: "#2C2C2C",
          foreground: "#6E59A5"
        },
        accent: {
          DEFAULT: "#7E69AB",
          foreground: "#000000"
        },
        popover: {
          DEFAULT: "#1C1C1C",
          foreground: "#9b87f5"
        },
        card: {
          DEFAULT: "#1C1C1C",
          foreground: "#9b87f5"
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
