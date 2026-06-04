import { z } from 'zod';

export const AuthorSchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
});

export const ArticleMetaSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  date: z.coerce.date(),
  authors: z.array(z.string().nonempty()),
  projects: z.array(z.string().nonempty()),
});

const ProjectLinkGroupSchema = z.array(z.string().nonempty());

export const ProjectSchema = z.object({
  title: z.string().nonempty(),
  links: z
    .object({
      github: ProjectLinkGroupSchema.optional(),
      itch: ProjectLinkGroupSchema.optional(),
      npm: ProjectLinkGroupSchema.optional(),
      unityAssetStore: ProjectLinkGroupSchema.optional(),
      other: ProjectLinkGroupSchema.optional(),
    })
    .optional(),
});

export const WebDataSchema = z.object({
  projects: z.record(z.string(), ProjectSchema),
  authors: z.record(z.string(), AuthorSchema),
  articlesMeta: z.record(z.string(), ArticleMetaSchema),
});

export interface Author extends z.infer<typeof AuthorSchema> {
  slug: string;
}

export interface ArticleMeta extends Omit<
  z.infer<typeof ArticleMetaSchema>,
  'authors' | 'projects'
> {
  slug: string;
  authors: Author[];
  projects: Project[];
}

export interface Article extends ArticleMeta {
  htmlContent: string;
  next: ArticleMeta | null;
  previous: ArticleMeta | null;
}

export interface Project extends z.infer<typeof ProjectSchema> {
  slug: string;
}

export interface WebData {
  projects: Project[];
  authors: Author[];
  articlesMeta: ArticleMeta[];
}
