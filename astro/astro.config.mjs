import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import sitemap from "@astrojs/sitemap";

import vue from "@astrojs/vue";
import { templateCompilerOptions } from '@tresjs/core';

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  // render pages on request so Strapi changes show up without a rebuild
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [tailwind(), sitemap(), vue({
    ...templateCompilerOptions
  })],
});
