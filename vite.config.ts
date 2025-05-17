import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/<NOME_DO_REPO>/',              // substituir <NOME_DO_REPO>
  plugins: [react()],
  server: { port: 5173 }
});
