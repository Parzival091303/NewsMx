// @ts-check
import { defineConfig } from 'astro/config';
//import cloudflare from '@astrojs/cloudflare';

import tailwindcss from '@tailwindcss/vite';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output:'server',
  adapter:node({
    mode: 'standalone'
  }),
  server: {
    port: Number(process.env.PORT) || 3000
  },

  vite: {
    plugins: [tailwindcss()]
  }
});