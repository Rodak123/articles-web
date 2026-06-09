import { Links, Meta, Outlet, Scripts } from 'react-router';
import { ThemeProvider } from './libs/providers/ThemeProvider';
import { ErrorPage } from './ui/pages/ErrorPage';
import './styles/main.css';
import { CommandPalette } from './ui/components/cmdk/CommandPalette';
import { KeyHubProvider } from 'react-keyhub';
import { shortcuts } from './shortcuts';

const App = () => {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body className='relative'>
        <KeyHubProvider shortcuts={shortcuts}>
          <ThemeProvider defaultThemeMode='system' useLS>
            <CommandPalette />
            <Outlet />
          </ThemeProvider>
        </KeyHubProvider>
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
