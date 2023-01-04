import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      imports: [
        'react',
        {
          '@emotion/styled': [['default', 'styled']],
        },
        {
          '@emotion/react': ['keyframes'],
        },
        {
          '@iconify/react': ['Icon'],
        },
      ],
      dirs: ['components', 'templates', 'hooks', 'utils'],
      dts: true,
    }),
  ],
  root: 'src',
  build: { outDir: '../dist' },
  publicDir: 'src/public',
});
