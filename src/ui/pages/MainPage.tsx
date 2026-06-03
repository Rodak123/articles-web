import { useArticles } from '../../libs/hooks/useArticles';
import { DefaultLayout } from './layouts/DefaultLayout';
import { Navbar } from '../components/Navbar';
import { ArticleLink } from '../components/ArticleLink';
import { Typography } from '../components/Typography';

export const MainPage: React.FC = () => {
  const { articles } = useArticles();

  return (
    <DefaultLayout>
      <Navbar title="Radek's Articles" />
      <Typography>
        Here are my articles about my projects and discoveries. Read more about
        me on my personal website at{' '}
        <a className='pretty-link' href='https://titera.dev'>
          titera.dev
        </a>
        . Keep in mind that this website is under development!
      </Typography>
      {articles.length > 0 ? (
        <div className='flex flex-col gap-4 my-4'>
          {articles.map((articleMeta) => (
            <ArticleLink key={articleMeta.slug} articleMeta={articleMeta} />
          ))}
        </div>
      ) : (
        <Typography className='mt-4'>There are no articles... YET!</Typography>
      )}
    </DefaultLayout>
  );
};
