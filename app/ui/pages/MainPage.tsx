import { DefaultLayout } from './layouts/DefaultLayout';
import { Navbar } from '../components/Navbar';
import { ArticleLink } from '../components/ArticleLink';
import { Typography } from '../components/Typography';
import { useLoaderData } from 'react-router';
import { loadWebData } from '../../libs/api/loadWebData';
import { Href } from '../components/Href';

export const loader = async () => {
  const webData = loadWebData();

  return { webData };
};

const MainPage: React.FC = () => {
  const { webData } = useLoaderData<typeof loader>();

  return (
    <DefaultLayout>
      <Navbar title="Radek's Articles" />
      <Typography>
        Here are articles about my projects and discoveries. Read more about me
        on my personal website at{' '}
        <Href href='https://titera.dev'>titera.dev</Href>. Keep in mind that
        this website is under development!
      </Typography>
      <Typography>
        Feel free to use the shortcut <kbd>Ctrl + K</kbd> to open the Command
        Palette!
      </Typography>
      {webData.articlesMeta.length > 0 ? (
        <div className='flex flex-col gap-4 my-4'>
          {webData.articlesMeta.map((articleMeta) => (
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
