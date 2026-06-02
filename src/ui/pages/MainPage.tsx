import { ROUTES } from '../../routes';
import { Typography } from '../components/Typography';
import { DefaultLayout } from './layouts/DefaultLayout';

const articleList = import.meta.glob('../../data/articles/*/index.html');

export const MainPage: React.FC = () => {
  const folderNames = Object.keys(articleList).map((path) => {
    const parts = path.split('/');
    return parts[parts.length - 2];
  });

  return (
    <DefaultLayout>
      <Typography size='5xl'>Articles</Typography>
      <ul>
        {folderNames.map((folder) => (
          <li key={folder} className='py-2'>
            <a href={ROUTES.ARTICLE(folder)} className='hover:underline'>
              {folder.replace(/-/g, ' ')}
            </a>
          </li>
        ))}
      </ul>
    </DefaultLayout>
  );
};
