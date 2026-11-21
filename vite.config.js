import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  cacheDir: 'node_modules/.cache/astralsight-vite',
  optimizeDeps: {
    include: [
      '@mui/icons-material/ArrowBackRounded',
      '@mui/icons-material/FileUploadOutlined',
      '@mui/icons-material/PhotoOutlined',
    ],
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'script-defer',
      manifest: {
        id: './',
        name: 'AstralSight',
        short_name: 'AstralSight',
        description: 'Explorador celeste y galería de observaciones',
        lang: 'es',
        start_url: './',
        scope: './',
        display: 'standalone',
        theme_color: '#060606',
        background_color: '#060606',
        icons: [
          { src: 'pwa/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'pwa/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'pwa/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        globPatterns: ['**/*.{html,js,png,jpg,webp}'],
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true,
      },
    }),
  ],
})
