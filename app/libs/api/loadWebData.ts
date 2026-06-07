import {
  type Author,
  type ArticleMeta,
  type WebData,
  WebDataSchema,
  type Project,
} from '../types/webData';
import { findArticleFileKey, getRawWebDataJSON } from './articleLoaders';

export const loadWebData = (): WebData => {
  const json = getRawWebDataJSON();
  // prase and validate JSON using zod
  const webData = WebDataSchema.parse(json);

  // load all authors
  const authors: Author[] = Object.keys(webData.authors).map((authorSlug) => {
    return {
      ...webData.authors[authorSlug],
      slug: authorSlug,
    };
  });

  // load all projects
  const projects: Project[] = Object.keys(webData.projects).map(
    (projectSlug) => {
      return {
        ...webData.projects[projectSlug],
        slug: projectSlug,
      };
    },
  );

  // load all articles meta
  const articlesMeta: ArticleMeta[] = Object.keys(webData.articles)
    .map((articleSlug) => {
      // first load the data and construct the article meta
      const articleMeta = webData.articles[articleSlug];

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
        date: new Date(articleMeta.date),
        slug: articleSlug,
        authors: articleAuthors,
        projects: articleProjects,
      };
    })
    .reduce((prev: ArticleMeta[], curr) => {
      // then filter out all missing articles
      if (findArticleFileKey(curr.slug) === undefined) return prev;
      return [...prev, curr];
    }, [])
    .sort((articleA, articleB) => {
      // last sort by the published date
      return articleB.date.getTime() - articleA.date.getTime();
    });

  return {
    projects,
    authors,
    articlesMeta,
  };
};
