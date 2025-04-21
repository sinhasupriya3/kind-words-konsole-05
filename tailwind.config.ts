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
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(145, 50%, 15%)', // Dark green border
        input: 'hsl(145, 50%, 20%)', // Slightly lighter input
        ring: 'hsl(145, 50%, 25%)', // Ring color
        background: 'hsl(145, 50%, 10%)', // Very dark green background
        foreground: 'hsl(145, 10%, 95%)', // Light text for contrast
        primary: {
          DEFAULT: 'hsl(145, 50%, 30%)', // Medium dark green
          foreground: 'hsl(145, 10%, 95%)'
        },
        secondary: {
          DEFAULT: 'hsl(145, 50%, 20%)', // Darker green
          foreground: 'hsl(145, 10%, 95%)'
        },
        destructive: {
          DEFAULT: 'hsl(0, 84.2%, 60.2%)', // Keep destructive red
          foreground: 'hsl(0, 0%, 98%)'
        },
        muted: {
          DEFAULT: 'hsl(145, 50%, 15%)', // Muted dark green
          foreground: 'hsl(145, 10%, 70%)' // Muted text
        },
        accent: {
          DEFAULT: 'hsl(145, 50%, 25%)', // Accent green
          foreground: 'hsl(145, 10%, 95%)'
        },
        popover: {
          DEFAULT: 'hsl(145, 50%, 15%)', // Popover background
          foreground: 'hsl(145, 10%, 95%)'
        },
        card: {
          DEFAULT: 'hsl(145, 50%, 15%)', // Card background
          foreground: 'hsl(145, 10%, 95%)' // Card text
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
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
