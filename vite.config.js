import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api':
      {
        target: 'https://api.infojobs.net/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/oferta/api':
      {
        target: 'https://api.infojobs.net/',
        changeOrigin: true,
        rewrite: (path) => path.replace('/oferta/api/', '')
      }
    }
  },
  plugins: [react()]
})
