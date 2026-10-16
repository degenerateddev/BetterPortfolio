import type { Home, Page, ProjectOverview, StrapiListResponse, StrapiSingleResponse } from './types/pages';
import { env } from './env';

interface Props {
  endpoint: string;
  query?: Record<string, string>;
  wrappedByKey?: string;
  wrappedByList?: boolean;
}

/**
 * Fetches data from the Strapi API
 * @param endpoint - The endpoint to fetch from
 * @param query - The query parameters to add to the url
 * @param wrappedByKey - The key to unwrap the response from
 * @param wrappedByList - If the response is a list, unwrap it
 * @returns
 */
export default async function fetchApi<T>({
  endpoint,
  query,
  wrappedByKey,
  wrappedByList,
}: Props): Promise<T> {
  if (endpoint.startsWith('/')) {
    endpoint = endpoint.slice(1);
  }

  const url = new URL(`${env('STRAPI_URL')}/api/${endpoint}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  const headers: Record<string, string> = {};
  const token = env('STRAPI_TOKEN');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url.toString(), { headers });
  if (!res.ok) {
    throw new Error(`Strapi request failed: ${res.status} ${res.statusText} (${url.pathname})`);
  }
  let data = await res.json();

  if (wrappedByKey) {
    data = data[wrappedByKey];
  }

  if (wrappedByList) {
    data = data[0];
  }

  return data as T;
}

function buildPopulateQuery(fields: Record<string, string>): Record<string, string> {
  return fields;
}

export async function fetchHome(): Promise<Home> {
  return fetchApi<Home>({
    endpoint: 'home',
    query: {
      'populate[aboutImage][fields][0]': 'url',
      'populate[aboutImage][fields][1]': 'name',
      'populate[aboutImage][fields][2]': 'alternativeText',
      'populate[portfolio][fields][0]': 'url',
      'populate[portfolio][fields][1]': 'name',
      'populate[resume][fields][0]': 'url',
      'populate[resume][fields][1]': 'name',
      'populate[characterSheet][populate][stats][populate][customIcon][fields][0]': 'url',
      'populate[characterSheet][populate][stats][populate][customIcon][fields][1]': 'alternativeText',
      'populate[characterSheet][populate][skills][populate][customIcon][fields][0]': 'url',
      'populate[characterSheet][populate][skills][populate][customIcon][fields][1]': 'alternativeText',
      'populate[gameShowcase][populate][heading]': 'true',
      'populate[gameShowcase][populate][featured][populate][image][fields][0]': 'url',
      'populate[gameShowcase][populate][featured][populate][image][fields][1]': 'alternativeText',
      'populate[gameShowcase][populate][featured][populate][page][fields][0]': 'slug',
      'populate[gameShowcase][populate][featured][populate][page][fields][1]': 'documentId',
      'populate[gameShowcase][populate][featured][populate][page][populate][header]': 'true',
      'populate[gameShowcase][populate][featured][populate][page][populate][thumbnail][fields][0]': 'url',
      'populate[gameShowcase][populate][featured][populate][page][populate][thumbnail][fields][1]': 'alternativeText',
      'populate[gameShowcase][populate][games][populate][image][fields][0]': 'url',
      'populate[gameShowcase][populate][games][populate][image][fields][1]': 'alternativeText',
      'populate[gameShowcase][populate][games][populate][page][fields][0]': 'slug',
      'populate[gameShowcase][populate][games][populate][page][fields][1]': 'documentId',
      'populate[gameShowcase][populate][games][populate][page][populate][header]': 'true',
      'populate[gameShowcase][populate][games][populate][page][populate][thumbnail][fields][0]': 'url',
      'populate[gameShowcase][populate][games][populate][page][populate][thumbnail][fields][1]': 'alternativeText',
      'populate[sections][on][container.bento][populate][cubes][populate][image][fields][0]': 'url',
      'populate[sections][on][container.bento][populate][cubes][populate][image][fields][1]': 'name',
      'populate[sections][on][container.bento][populate][cubes][populate][image][fields][2]': 'alternativeText',
      'populate[sections][on][container.bento][populate][cubes][populate][page][fields][0]': 'slug',
      'populate[sections][on][container.bento][populate][cubes][populate][page][fields][1]': 'documentId',
      'populate[sections][on][container.2x2][populate][cubes][populate][image][fields][0]': 'url',
      'populate[sections][on][container.2x2][populate][cubes][populate][image][fields][1]': 'name',
      'populate[sections][on][container.2x2][populate][cubes][populate][image][fields][2]': 'alternativeText',
      'populate[sections][on][container.2x2][populate][cubes][populate][page][fields][0]': 'slug',
      'populate[sections][on][container.2x2][populate][cubes][populate][page][fields][1]': 'documentId',
    },
    wrappedByKey: 'data',
  });
}

export async function fetchAllPages(): Promise<Page[]> {
  return fetchApi<Page[]>({
    endpoint: 'pages',
    query: {
      'populate[header]': 'true',
      'populate[thumbnail][fields][0]': 'url',
      'populate[thumbnail][fields][1]': 'name',
      'populate[thumbnail][fields][2]': 'alternativeText',
      'populate[keywords]': 'true',
      'populate[icons]': 'true',
      'sort': 'createdAt:desc',
      'pagination[pageSize]': '100',
    },
    wrappedByKey: 'data',
  });
}

export async function fetchProjectOverview(): Promise<ProjectOverview> {
  return fetchApi<ProjectOverview>({
    endpoint: 'project-overview',
    query: {
      'populate[heading]': 'true',
    },
    wrappedByKey: 'data',
  });
}

export async function fetchGamePages(): Promise<Page[]> {
  return fetchApi<Page[]>({
    endpoint: 'pages',
    query: {
      'filters[category][$eq]': 'games',
      'populate[header]': 'true',
      'populate[thumbnail][fields][0]': 'url',
      'populate[thumbnail][fields][1]': 'name',
      'populate[thumbnail][fields][2]': 'alternativeText',
      'sort': 'createdAt:desc',
      'pagination[pageSize]': '100',
    },
    wrappedByKey: 'data',
  });
}

export async function fetchPageBySlug(slug: string): Promise<Page | null> {
  const pages = await fetchApi<Page[]>({
    endpoint: 'pages',
    query: {
      'filters[slug][$eq]': slug,
      'populate[header]': 'true',
      'populate[thumbnail][fields][0]': 'url',
      'populate[thumbnail][fields][1]': 'name',
      'populate[thumbnail][fields][2]': 'alternativeText',
      'populate[keywords]': 'true',
      'populate[icons]': 'true',
      'populate[content][on][container.bento][populate][cubes][populate][image][fields][0]': 'url',
      'populate[content][on][container.bento][populate][cubes][populate][image][fields][1]': 'name',
      'populate[content][on][container.bento][populate][cubes][populate][page][fields][0]': 'slug',
      'populate[content][on][container.2x2][populate][cubes][populate][image][fields][0]': 'url',
      'populate[content][on][container.2x2][populate][cubes][populate][image][fields][1]': 'name',
      'populate[content][on][container.2x2][populate][cubes][populate][page][fields][0]': 'slug',
      'populate[content][on][content.image-block][populate][image][fields][0]': 'url',
      'populate[content][on][content.image-block][populate][image][fields][1]': 'name',
      'populate[content][on][content.image-block][populate][image][fields][2]': 'alternativeText',
      'populate[content][on][content.image-block][populate][image][fields][3]': 'caption',
      'populate[content][on][content.image][populate][image][fields][0]': 'url',
      'populate[content][on][content.image][populate][image][fields][1]': 'name',
      'populate[content][on][content.image][populate][image][fields][2]': 'alternativeText',
      'populate[content][on][content.image][populate][image][fields][3]': 'caption',
      'populate[content][on][content.cube][populate][image][fields][0]': 'url',
      'populate[content][on][content.cube][populate][image][fields][1]': 'name',
      'populate[content][on][content.cube][populate][page][fields][0]': 'slug',
      'populate[content][on][content.text-block][populate]': 'true',
      'populate[content][on][content.video-embed][populate]': 'true',
      'populate[content][on][content.icon][populate]': 'true',
      'populate[content][on][content.title][populate]': 'true',
    },
    wrappedByKey: 'data',
  });

  return pages.length > 0 ? pages[0] : null;
}