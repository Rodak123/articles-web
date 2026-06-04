import type { ArticleAuthor } from '../types/article';

export const stringifyAuthors = (authors: ArticleAuthor[]) => {
  return authors
    .map((author) => `${author.firstName} ${author.lastName}`)
    .join(', ');
};
