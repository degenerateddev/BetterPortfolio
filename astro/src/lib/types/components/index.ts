// ── Strapi media ────────────────────────────────────────────
export interface StrapiImage {
  id: number;
  url: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: Record<string, { url: string; width: number; height: number }>;
}

// ── Icon enum values (mirrors Strapi enum) ─────────────────
export type IconKey =
  | 'arduino'
  | 'aseprite'
  | 'astro'
  | 'audacity'
  | 'aws'
  | 'blender'
  | 'django'
  | 'figma'
  | 'flutter'
  | 'godot'
  | 'maya'
  | 'next'
  | 'pocketbase'
  | 'postgres'
  | 'redis'
  | 'sveltekit'
  | 'tailwind'
  | 'unreal'
  | 'strapi'
  | 'nuxt';

// ── Content components ─────────────────────────────────────
export interface ContentHeader {
  id: number;
  title: string;
  description?: string;
  projectLink?: string;
}

export interface ContentCube {
  id: number;
  image: StrapiImage;
  externalLink?: string;
  page?: {
    id: number;
    documentId: string;
    slug: string;
    header?: ContentHeader;
  } | null;
}

export interface ContentIcon {
  id: number;
  __component: 'content.icon';
  key: IconKey;
}

export interface ContentKeyword {
  id: number;
  keyword: string;
}

export interface ContentTextBlock {
  id: number;
  __component: 'content.text-block';
  body: any; // Strapi Blocks JSON
}

export interface ContentImageBlock {
  id: number;
  __component: 'content.image-block';
  image: StrapiImage;
  caption?: string;
}

export interface ContentImage {
  id: number;
  __component: 'content.image';
  image: StrapiImage;
}

export interface ContentVideoEmbed {
  id: number;
  __component: 'content.video-embed';
  url: string;
  caption?: string;
}

// ── Container components ───────────────────────────────────
export interface ContainerBento {
  id: number;
  __component: 'container.bento';
  title?: string;
  cubes: ContentCube[];
}

export interface Container2x2 {
  id: number;
  __component: 'container.2x2';
  title?: string;
  cubes: ContentCube[];
}

// ── Dynamic zone union type ────────────────────────────────
export type DynamicZoneItem =
  | ContainerBento
  | Container2x2
  | ContentIcon
  | ContentTextBlock
  | ContentImageBlock
  | ContentImage
  | ContentVideoEmbed
  | (ContentCube & { __component: 'content.cube' });