import type { StrapiImage } from './types/components';

/**
 * Resolves a Strapi image URL to an absolute URL.
 * Strapi may return relative paths (e.g. /uploads/...) or absolute URLs.
 */
export function strapiImageUrl(image: StrapiImage | null | undefined): string {
  if (!image?.url) return '/img/placeholder.webp';

  // Already absolute
  if (image.url.startsWith('http')) return image.url;

  // Relative path from Strapi
  const base = import.meta.env.STRAPI_URL || 'http://127.0.0.1:1337';
  return `${base}${image.url}`;
}

/**
 * Resolves the link for a cube: either page slug or external link.
 */
export function cubeLink(cube: { page?: { slug: string } | null; externalLink?: string }): string | undefined {
  if (cube.page?.slug) return `/project/${cube.page.slug}`;
  if (cube.externalLink) return cube.externalLink;
  return undefined;
}
