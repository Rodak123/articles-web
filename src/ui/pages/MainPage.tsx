import { useArticles } from '../../libs/hooks/useArticles';
import { ROUTES } from '../../routes';
import { Typography } from '../components/Typography';
import { DefaultLayout } from './layouts/DefaultLayout';

export const MainPage: React.FC = () => {
  const { articlesMeta } = useArticles();

  return (
    <DefaultLayout>
      <Typography size='5xl'>Articles</Typography>
      <ul>
        {articlesMeta.map((meta) => (
          <li key={meta.slug} className='py-2'>
            <a href={ROUTES.ARTICLE(meta.slug)} className='hover:underline'>
              {meta.slug} {meta.date.toDateString()}
            </a>
          </li>
        ))}
      </ul>
    </DefaultLayout>
  );
};
