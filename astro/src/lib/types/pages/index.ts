import type {
  ContentHeader,
  ContentIcon,
  ContentKeyword,
  StrapiImage,
  DynamicZoneItem,
  ContainerBento,
  Container2x2,
  ContentCharacterSheet,
  ContentGameShowcase,
  ContentTitle,
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
  category: 'games' | 'programming' | 'design' | 'writing';
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
  aboutImage?: StrapiImage | null;
  portfolio?: StrapiImage | null;
  resume?: StrapiImage | null;
  characterSheet?: ContentCharacterSheet | null;
  gameShowcase?: ContentGameShowcase | null;
  sections?: (ContainerBento | Container2x2)[];
}

// ── Projects overview single type ──────────────────────────
export interface ProjectOverview extends BaseStrapiResponse {
  metaTitle?: string | null;
  heading?: ContentTitle | null;
  intro?: string | null;
  showFilters?: boolean | null;
  emptyLabel?: string | null;
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