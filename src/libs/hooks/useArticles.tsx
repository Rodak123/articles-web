import { useEffect, useState } from 'react';
import {
  ArticlesMetaSchema,
  type Article,
  type ArticleMeta,
} from '../types/article';
import articlesMetaJSON from '../../../articles/articlesMeta.json';

const articleLoaders = import.meta.glob('../../data/articles/*/index.html', {
  query: '?raw',
  import: 'default',
});

const loadArticlesMeta = (): ArticleMeta[] => {
  const articlesMeta = ArticlesMetaSchema.parse(articlesMetaJSON);

  return articlesMeta.articleOrder.map((articleSlug) => {
    const articleMeta = articlesMeta.articlesMeta[articleSlug];
    if (articleMeta === undefined) {
      throw new Error(
        `Slug: "${articleSlug}" does not exist in articles meta JSON!`,
      );
    }
    return {
      ...articleMeta,
      slug: articleSlug,
    };
  });
};

export const useArticles = () => {
  const articlesMeta: ArticleMeta[] = loadArticlesMeta();

  return {
    articlesMeta,
  };
};

type ArticleState =
  | {
      state: 'loading';
      article: null;
      isLoading: true;
      isSuccess: false;
      isFailed: false;
    }
  | {
      state: 'success';
      article: Article;
      isLoading: false;
      isSuccess: true;
      isFailed: false;
    }
  | {
      state: 'failed';
      article: null;
      isLoading: false;
      isSuccess: false;
      isFailed: true;
    };

const stateBools = {
  isLoading: false,
  isSuccess: false,
  isFailed: false,
} as const;

const articlesMeta = loadArticlesMeta();

export const useArticle = (articleSlug?: string): ArticleState => {
  const [data, setData] = useState<ArticleState>({
    state: 'loading',
    article: null,
    ...stateBools,
    isLoading: true,
  });

  useEffect(() => {
    setData({
      state: 'loading',
      article: null,
      ...stateBools,
      isLoading: true,
    });

    const articleIndex = articlesMeta.findIndex(
      (meta) => meta.slug === articleSlug,
    );

    if (articleSlug === undefined || articleIndex === -1) {
      setData(() => ({
        state: 'failed',
        article: null,
        ...stateBools,
        isFailed: true,
      }));
      return;
    }

    let isMounted = true;

    (async () => {
      try {
        const fileKey = Object.keys(articleLoaders).find((path) =>
          path.includes(`/${articleSlug}/index.html`),
        );

        if (!fileKey) throw new Error('Article not found');

        const loader = articleLoaders[fileKey] as () => Promise<string>;
        const htmlContent = await loader();

        if (isMounted) {
          const articleMeta = articlesMeta[articleIndex];

          const previous = articlesMeta[articleIndex + 1] ?? null;
          const next = articlesMeta[articleIndex - 1] ?? null;

          const article: Article = {
            ...articleMeta,
            previous,
            next,
            htmlContent,
          };

          setData({
            state: 'success',
            article: article,
            ...stateBools,
            isSuccess: true,
          });
        }
      } catch {
        if (isMounted) {
          setData({
            state: 'failed',
            article: null,
            ...stateBools,
            isFailed: true,
          });
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [articleSlug]);

  return data;
};
