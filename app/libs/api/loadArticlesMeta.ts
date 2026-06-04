import {
  type ArticleAuthor,
  type ArticleMeta,
  type ArticlesMeta,
  ArticlesMetaSchema,
} from '../types/article';
import { getRawArticlesMetaJSON } from './articleLoaders';

export const loadArticlesMeta = (): ArticlesMeta => {
  const json = getRawArticlesMetaJSON();
  const articlesMeta = ArticlesMetaSchema.parse(json);

  const authors: ArticleAuthor[] = Object.keys(articlesMeta.authors).map(
    (authorSlug) => {
      return {
        ...articlesMeta.authors[authorSlug],
        slug: authorSlug,
      };
    },
  );

  const articles: ArticleMeta[] = articlesMeta.articleOrder.map(
    (articleSlug) => {
      const articleMeta = articlesMeta.articlesMeta[articleSlug];
      if (articleMeta === undefined) {
        throw new Error(
          `Article slug: "${articleSlug}" does not exist in articles meta JSON!`,
        );
      }

      const articleAuthors: ArticleAuthor[] = articleMeta.authors.map(
        (authorSlug) => {
          const author = authors.find((a) => a.slug === authorSlug);
          if (author === undefined) {
            throw new Error(
              `Author slug: "${authorSlug}" does not exist in articles meta JSON!`,
            );
          }
          return author;
        },
      );

      return {
        ...articleMeta,
        slug: articleSlug,
        authors: articleAuthors,
      };
    },
  );

  return {
    authors,
    articles,
  };
};
