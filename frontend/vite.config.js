import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Otimizações de build
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    
    // Code splitting otimizado
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar vendor libraries
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-tabs'],
          utils: ['framer-motion', 'clsx', 'tailwind-merge'],
        },
        // Otimizar nomes dos chunks
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    
    // Otimizações de assets
    assetsInlineLimit: 4096, // Inline assets < 4KB
  },
  
  // Otimizações de desenvolvimento
  server: {
    hmr: true,
  },
  
  // Otimizações de preview
  preview: {
    port: 4173,
  }
})
