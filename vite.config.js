/* eslint-env node */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// IMPORTANT: this config runs in Node (during dev/build). Do NOT use import.meta.env here.
// Use loadEnv(mode, process.cwd(), '') to read VITE_ variables for the current mode.

export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), '')

  // Preferably keep variable names consistent in your .env files. Support a common alternate key for backend URL.
  const frontendUrl = env.VITE_FRONTEND_URL || ''
  const baseUrl = env.VITE_FRONTEND_BASE_URL || './'
  const backendUrl = env.VITE_BACK_END_URL || ''

  console.log('Using Vite env (mode=', mode, ')')
  console.log('VITE_FRONTEND_URL =', frontendUrl)
  console.log('VITE_FRONTEND_BASE_URL =', baseUrl)
  console.log('VITE_BACK_END_URL =', backendUrl)

  return {
    base: baseUrl,
    plugins: [
      react(),
      tailwindcss()
    ]
  }
})
