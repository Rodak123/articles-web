import type { Author } from '../types/webData';

export const stringifyAuthors = (authors: Author[]) => {
  return authors
    .map((author) => `${author.firstName} ${author.lastName}`)
    .join(', ');
};
