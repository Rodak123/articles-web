import webDataJSON from '../../../articles/webData.json';

const articleLoaders = import.meta.glob('../../data/articles/*/index.html', {
  query: '?raw',
  import: 'default',
});

export const getRawWebDataJSON = () => {
  return webDataJSON;
};

export const getRawArticleLoaders = () => {
  return articleLoaders as Record<string, () => Promise<string>>;
};

export const findArticleFileKey = (articleSlug?: string) => {
  if (articleSlug === undefined) return undefined;
  return Object.keys(articleLoaders).find((path) =>
    path.includes(`/${articleSlug}/index.html`),
  );
};
