export const ROUTES = {
  HOME: () => '/' as const,
  ARTICLE: (slug: string) => `/article/${slug}` as const,
} as const;
