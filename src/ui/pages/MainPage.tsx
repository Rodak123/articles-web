import { useArticles } from '../../libs/hooks/useArticles';
import { DefaultLayout } from './layouts/DefaultLayout';
import { Navbar } from '../components/Navbar';
import { ArticleLink } from '../components/ArticleLink';

export const MainPage: React.FC = () => {
  const { articlesMeta } = useArticles();

  return (
    <DefaultLayout>
      <Navbar title="Radek's Articles" />
      <div className='flex flex-col gap-4 my-4'>
        {articlesMeta.map((articleMeta) => (
          <ArticleLink key={articleMeta.slug} articleMeta={articleMeta} />
        ))}
      </div>
    </DefaultLayout>
  );
};
