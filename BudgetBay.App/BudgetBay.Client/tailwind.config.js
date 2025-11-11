/** @type {import('tailwindcss').Config} */
export default {
  // Add this content property to tell Tailwind where to look for classes
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Map the CSS variables from index.css to Tailwind theme colors
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
        },
        secondary: 'var(--color-secondary)',
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        text: {
          base: 'var(--color-text-base)',
          muted: 'var(--color-text-muted)',
        },
      },
    },
  },
  plugins: [
    // Add the line-clamp plugin for easy text truncation
    require('@tailwindcss/line-clamp'),
  ],
};