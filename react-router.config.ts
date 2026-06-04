import type { Config } from '@react-router/dev/config';
import { loadArticlesMeta } from './app/libs/api/loadArticlesMeta';
import { ROUTE_PATHS } from './app/config';

export default {
  ssr: true,

  async prerender({ getStaticPaths }) {
    const staticPaths = getStaticPaths();

    const { articles } = loadArticlesMeta();
    const articlePaths = articles.map((article) =>
      ROUTE_PATHS.ARTICLE(article.slug),
    );

    return [...staticPaths, ...articlePaths];
  },

  future: {
    v8_middleware: true,
    v8_splitRouteModules: true,
    v8_viteEnvironmentApi: true,
    v8_passThroughRequests: true,
    v8_trailingSlashAwareDataRequests: true,
  },
} satisfies Config;
