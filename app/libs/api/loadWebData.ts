import {
  type Author,
  type ArticleMeta,
  type WebData,
  WebDataSchema,
  type Project,
} from '../types/article';
import { getRawWebDataJSON } from './articleLoaders';

export const loadWebData = (): WebData => {
  const json = getRawWebDataJSON();
  const webData = WebDataSchema.parse(json);

  const authors: Author[] = Object.keys(webData.authors).map((authorSlug) => {
    return {
      ...webData.authors[authorSlug],
      slug: authorSlug,
    };
  });

  const projects: Project[] = Object.keys(webData.projects).map(
    (projectSlug) => {
      return {
        ...webData.projects[projectSlug],
        slug: projectSlug,
      };
    },
  );

  const articlesMeta: ArticleMeta[] = Object.keys(webData.articlesMeta).map(
    (articleSlug) => {
      const articleMeta = webData.articlesMeta[articleSlug];

      const articleAuthors: Author[] = articleMeta.authors.map((authorSlug) => {
        const author = authors.find((a) => a.slug === authorSlug);
        if (author === undefined) {
          throw new Error(
            `Author slug: "${authorSlug}" does not exist in webData JSON! Available: [${authors.map((a) => a.slug).join(', ')}]`,
          );
        }
        return author;
      });

      const articleProjects: Project[] = articleMeta.projects.map(
        (projectSlug) => {
          const project = projects.find((p) => p.slug === projectSlug);
          if (project === undefined) {
            throw new Error(
              `Project slug: "${projectSlug}" does not exist in webData JSON! Available: [${projects.map((p) => p.slug).join(', ')}]`,
            );
          }
          return project;
        },
      );

      return {
        ...articleMeta,
        slug: articleSlug,
        authors: articleAuthors,
        projects: articleProjects,
      };
    },
  );

  return {
    projects,
    authors,
    articlesMeta,
  };
};
