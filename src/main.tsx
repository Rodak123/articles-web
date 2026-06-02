import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { RouterProvider } from 'react-router';
import { router } from './router';
import { ThemeProvider } from './libs/providers/ThemeProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultThemeMode='system'>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
