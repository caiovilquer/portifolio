import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';

export default defineConfig({
  base: '/',              
  plugins: [react(), {
    name: 'portfolio-theme-bootstrap',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const bootstrap = readFileSync(new URL('./src/theme-bootstrap.js', import.meta.url), 'utf8');
        return html.replace('<!--theme-bootstrap-->', `<script data-theme-bootstrap>${bootstrap}</script>`);
      },
    },
  }],
  server: { port: 5173 }
});
