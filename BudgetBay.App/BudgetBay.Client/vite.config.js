// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// ⬇️ CHANGE 1: Import the new PostCSS plugin
import tailwindcssPostcss from '@tailwindcss/postcss' 

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        // ⬇️ CHANGE 2: Use the new plugin package
        tailwindcssPostcss(), 
        // Note: You should also include 'autoprefixer' here if it's needed
      ],
    },
  },
})