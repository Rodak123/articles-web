import type { Article } from '../types/webData';
import { getRawArticleLoaders } from './articleLoaders';
import { loadWebData } from './loadWebData';

const { articlesMeta } = loadWebData();
const articleLoaders = getRawArticleLoaders();

export const loadArticle = async (articleSlug?: string) => {
  const articleIndex = articlesMeta.findIndex(
    (meta) => meta.slug === articleSlug,
  );

  try {
    const fileKey = Object.keys(articleLoaders).find((path) =>
      path.includes(`/${articleSlug}/index.html`),
    );

    if (
      fileKey === undefined ||
      articleIndex === -1 ||
      articleSlug === undefined
    ) {
      throw new Error(`Article "${articleSlug}" not found`);
    }

    const loader = articleLoaders[fileKey];
    const htmlContent = await loader();

    const articleMeta = articlesMeta[articleIndex];

    const previous = articlesMeta[articleIndex + 1] ?? null;
    const next = articlesMeta[articleIndex - 1] ?? null;

    const article: Article = {
      ...articleMeta,
      previous,
      next,
      htmlContent,
    };

    return article;
  } catch (err) {
    throw new Error(`Failed to load "${articleSlug}": ${err}`);
  }
};
