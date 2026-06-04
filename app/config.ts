import type { PageMeta } from './libs/types/pageMeta';

export const ROUTE_PATHS = {
  HOME: () => '/' as const,
  ARTICLE: (slug?: string) =>
    slug ? `/article/${slug}` : '/article/:articleSlug',
} as const;

export const DEFAULT_PAGE_META: PageMeta = {
  title: 'Radek Titěra Articles',
  author: 'Radek Titěra',
  description: 'Radek Titěra - game and full stack web developer',
};
