import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// A relative base lets the build run from any GitHub Pages sub-path
// (https://<user>.github.io/<repo>/) without extra configuration.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), tsconfigPaths()],
});
