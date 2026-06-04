import articlesMetaJSON from '../../../articles/articlesMeta.json';

const articleLoaders = import.meta.glob('../../data/articles/*/index.html', {
  query: '?raw',
  import: 'default',
});

export const getRawArticlesMetaJSON = () => {
  return articlesMetaJSON;
};

export const getRawArticleLoaders = () => {
  return articleLoaders as Record<string, () => Promise<string>>;
};
