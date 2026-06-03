import { z } from 'zod';

export const ArticleAuthorSchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
});

export const ArticleMetaSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  date: z.coerce.date(),
  authors: z.array(z.string().nonempty()),
});

export const ArticlesMetaSchema = z.object({
  authors: z.record(z.string(), ArticleAuthorSchema),
  articlesMeta: z.record(z.string(), ArticleMetaSchema),
  articleOrder: z.array(z.string()),
});

export interface ArticleAuthor {
  slug: string;
  firstName: string;
  lastName: string;
}

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: Date;
  authors: ArticleAuthor[];
}

export interface Article extends ArticleMeta {
  htmlContent: string;
  next: ArticleMeta | null;
  previous: ArticleMeta | null;
}

export interface ArticlesMeta {
  authors: ArticleAuthor[];
  articles: ArticleMeta[];
}
