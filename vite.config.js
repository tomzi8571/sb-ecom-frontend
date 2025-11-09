import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

console.log("Frontend Url: ", import.meta.env.VITE_FRONTEND_URL)
console.log("Base Url: ", import.meta.env.VITE_FRONTEND_BASE_URL)
console.log("Backend Url: ", import.meta.env.VITE_BACK_END_URL)

// https://vite.dev/config/
export default defineConfig({
  base: import.meta.env.VITE_FRONTEND_BASE_URL || './',
  plugins: [
      react(),
      tailwindcss()  ],
})
