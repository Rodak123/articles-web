import { DefaultLayout } from './layouts/DefaultLayout';
import { Navbar } from '../components/Navbar';
import { ArticleLink } from '../components/ArticleLink';
import { Typography } from '../components/Typography';
import { loadArticlesMeta } from '../../libs/api/loadArticlesMeta';
import { useLoaderData } from 'react-router';

export const loader = async () => {
  const articlesMeta = loadArticlesMeta();

  return { articlesMeta };
};

const MainPage: React.FC = () => {
  const { articlesMeta } = useLoaderData<typeof loader>();

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
      {articlesMeta.articles.length > 0 ? (
        <div className='flex flex-col gap-4 my-4'>
          {articlesMeta.articles.map((articleMeta) => (
            <ArticleLink key={articleMeta.slug} articleMeta={articleMeta} />
          ))}
        </div>
      ) : (
        <Typography className='mt-4'>There are no articles... YET!</Typography>
      )}
    </DefaultLayout>
  );
};

export default MainPage;
