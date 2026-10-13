import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig(({ mode }) => {
  // GitHub Pages supplies BASE_PATH through actions/configure-pages.
  const env = loadEnv(mode, '.', '');
  return {
    base: env.BASE_PATH || '/',
    plugins: [react()],
    build: { outDir: 'dist', emptyOutDir: true },
  };
});
