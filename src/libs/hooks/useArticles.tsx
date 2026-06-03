import { useEffect, useState } from 'react';
import type { Article, ArticleMeta } from '../types/article';

const articleList = import.meta.glob('../../data/articles/*/index.html');

const articleLoaders = import.meta.glob('../../data/articles/*/index.html', {
  query: '?raw',
  import: 'default',
});

export const useArticles = () => {
  const articlesMeta: ArticleMeta[] = Object.keys(articleList).map((path) => {
    const parts = path.split('/');
    const foldername = path.split('/')[parts.length - 2];

    return {
      slug: foldername,
      title: foldername,
      description: 'Random description text.',
      date: new Date(),
    };
  });

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

    if (articleSlug === undefined) {
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
          setData({
            state: 'success',
            article: {
              slug: articleSlug,
              title: articleSlug,
              description: 'desc',
              date: new Date(),
              htmlContent,
            },
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
