import type {
  ContentHeader,
  ContentIcon,
  ContentKeyword,
  StrapiImage,
  DynamicZoneItem,
  ContainerBento,
  Container2x2,
} from '../components';

// ── Base Strapi response fields ────────────────────────────
export interface BaseStrapiResponse {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// ── Page (project) ─────────────────────────────────────────
export interface Page extends BaseStrapiResponse {
  slug: string;
  category: 'programming' | 'design' | 'writing';
  header: ContentHeader;
  thumbnail?: StrapiImage | null;
  keywords?: ContentKeyword[];
  icons?: ContentIcon[];
  content?: DynamicZoneItem[];
}

// ── Home single type ───────────────────────────────────────
export interface Home extends BaseStrapiResponse {
  headline: string;
  subheadline?: string;
  aboutText?: string;
  aboutImage?: StrapiImage | null;  portfolio?: StrapiImage | null;
  resume?: StrapiImage | null;  sections?: (ContainerBento | Container2x2)[];
}

// ── Strapi list response wrapper ───────────────────────────
export interface StrapiListResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: {};
}