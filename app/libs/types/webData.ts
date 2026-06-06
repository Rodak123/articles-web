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

const ProjectLinkGroupSchema = z.string().nonempty();

export const ProjectSchema = z.object({
  title: z.string().nonempty(),
  links: z.object({
    github: ProjectLinkGroupSchema.optional(),
    itchio: ProjectLinkGroupSchema.optional(),
    npm: ProjectLinkGroupSchema.optional(),
    unityAssetStore: ProjectLinkGroupSchema.optional(),
    steam: ProjectLinkGroupSchema.optional(),
  }),
});

export type ProjectLinkType = keyof Required<
  z.infer<typeof ProjectSchema>
>['links'];

export const WebDataSchema = z.object({
  projects: z.record(z.string(), ProjectSchema),
  authors: z.record(z.string(), AuthorSchema),
  articles: z.record(z.string(), ArticleMetaSchema),
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

const validLinkTypes = Object.keys(ProjectSchema.shape.links.shape);

export function isProjectLinkType(key: string): key is ProjectLinkType {
  return validLinkTypes.includes(key);
}
