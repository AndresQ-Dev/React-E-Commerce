// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // Opciones específicas de build
  build: {
    // Usa esbuild para minificar (rápido y eficiente)
    minify: 'esbuild',

    // Habilita el cálculo del tamaño Brotli en los informes de build
    brotliSize: true,

    // Parametrización de Rollup para treeshaking
    rollupOptions: {
      treeshake: true,
      output: {
        // Separar dependencias comunes en chunks, si quisieras
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  },

  // Opciones para `vite preview` (simula servidor de producción)
  preview: {
    port: 4173,
    strictPort: true,
    open: true
  }
});
