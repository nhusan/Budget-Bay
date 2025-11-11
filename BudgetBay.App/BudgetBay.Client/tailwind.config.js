import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */

export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
    './index.html',
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
        ... colors,
        border: "hsl(var(--color-border, var(--border)))",
        input: "hsl(var(--color-input, var(--input)))",
        ring: "hsl(var(--color-ring, var(--ring)))",
        background: "hsl(var(--color-background, var(--background)))",
        foreground: "hsl(var(--color-foreground, var(--foreground)))",
        primary: {
          DEFAULT: "hsl(var(--color-primary, var(--primary)))",
          foreground: "hsl(var(--color-primary-foreground, var(--primary-foreground)))",
        },
        secondary: {
          DEFAULT: "hsl(var(--color-secondary, var(--secondary)))",
          foreground: "hsl(var(--color-secondary-foreground, var(--secondary-foreground)))",
        },
        destructive: {
          DEFAULT: "hsl(var(--color-destructive, var(--destructive)))",
          foreground: "hsl(var(--color-destructive-foreground, var(--destructive-foreground)))",
        },
        muted: {
          DEFAULT: "hsl(var(--color-muted, var(--muted)))",
          foreground: "hsl(var(--color-muted-foreground, var(--muted-foreground)))",
        },
        accent: {
          DEFAULT: "hsl(var(--color-accent, var(--accent)))",
          foreground: "hsl(var(--color-accent-foreground, var(--accent-foreground)))",
        },
        popover: {
          DEFAULT: "hsl(var(--color-popover, var(--popover)))",
          foreground: "hsl(var(--color-popover-foreground, var(--popover-foreground)))",
        },
        card: {
          DEFAULT: "hsl(var(--color-card, var(--card)))",
          foreground: "hsl(var(--color-card-foreground, var(--card-foreground)))",
        },
        success: "hsl(var(--color-success, var(--success)))",
        error: "hsl(var(--color-error, var(--error)))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [], 
}