import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <-- CHANGE: Import the new plugin
import path from "path"

export default defineConfig({
  // This is now correct because you're using the official plugin
  plugins: [react(), tailwindcss()], 
  
  // The `css.postcss` block is NOT needed with the new plugin.
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})