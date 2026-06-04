import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { ThemeProvider } from './libs/providers/ThemeProvider';
import { ErrorPage } from './ui/pages/ErrorPage';
import './styles/main.css';

const App = () => {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider defaultThemeMode='system' useLS>
          <Outlet />
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};
export default App;

export const ErrorBoundary = () => {
  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <ErrorPage />
        <Scripts />
      </body>
    </html>
  );
};
