// vite.config.js (Modified)
import { defineConfig } from 'vite' 
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { 
    port: 5173,
    // When set to false (or removed), Vite will find the next available port.
    strictPort: false, 
  },
})