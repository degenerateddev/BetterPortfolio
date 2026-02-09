/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
interface Window {
    gsap: typeof import('gsap');
}

interface ImportMetaEnv {
  readonly STRAPI_URL: string;
}