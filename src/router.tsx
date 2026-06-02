import { createBrowserRouter } from 'react-router';

import { MainPage } from './ui/pages/MainPage';
import { ErrorPage } from './ui/pages/ErrorPage';
import { ROUTES } from './routes';
import { ArticlePage } from './ui/pages/ArticlePage';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME(),
    ErrorBoundary: ErrorPage,
    element: <MainPage />,
  },
  {
    path: ROUTES.ARTICLE(':articleSlug'),
    ErrorBoundary: ErrorPage,
    element: <ArticlePage />,
  },
]);
