/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
interface Window {
    gsap: typeof import('gsap');
}

interface ImportMetaEnv {
  readonly STRAPI_URL: string;
  readonly STRAPI_TOKEN?: string;
  // browser-reachable Strapi URL (STRAPI_URL may be docker-internal)
  readonly PUBLIC_STRAPI_URL?: string;
}