import { type RouteConfig, index, route } from '@react-router/dev/routes';
import { ROUTE_PATHS } from './config';

export default [
  index('ui/pages/MainPage.tsx'),
  route(ROUTE_PATHS.ARTICLE(), 'ui/pages/ArticlePage.tsx'),
] satisfies RouteConfig;
