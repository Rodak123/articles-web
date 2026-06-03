import { z } from 'zod';

export const ArticleMetaSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  date: z.coerce.date(),
});

export const ArticlesMetaSchema = z.object({
  articlesMeta: z.record(z.string(), ArticleMetaSchema),
  articleOrder: z.array(z.string()),
});

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: Date;
}

export interface Article extends ArticleMeta {
  htmlContent: string;
  next: ArticleMeta | null;
  previous: ArticleMeta | null;
}
