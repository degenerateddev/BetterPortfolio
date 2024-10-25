import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import sitemap from "@astrojs/sitemap";

import vue from "@astrojs/vue";
import { templateCompilerOptions } from '@tresjs/core';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap(), vue({
    ...templateCompilerOptions
  })],
});