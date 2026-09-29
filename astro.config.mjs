// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://intignisworld.com',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },

  // ---------------------------------------------------------------
  // The site is static except for one endpoint: /api/enquiry, which
  // sends the contact form via email. `output: 'server'` + per-page
  // `export const prerender = true` keeps every content page fully
  // static (same as before) while allowing that one route to run
  // on-demand. Swap the adapter below for @astrojs/vercel or
  // @astrojs/netlify if you deploy to those platforms instead of a
  // self-hosted Node server — see README.md "Deployment" section.
  // ---------------------------------------------------------------
  output: 'server',
  adapter: node({ mode: 'standalone' }),
});
