import React from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { DefaultLayout } from './layouts/DefaultLayout';
import { useArticle } from '../../libs/hooks/useArticles';
import { Typography } from '../components/Typography';
import { ROUTES } from '../../routes';
import { Navbar } from '../components/Navbar';
import { ArrowLeftIcon } from '@phosphor-icons/react';

export const ArticlePage: React.FC = () => {
  const { articleSlug } = useParams();
  const navigate = useNavigate();
  const { article, isLoading, isFailed, isSuccess } = useArticle(articleSlug);

  if (isFailed) {
    navigate(ROUTES.HOME());
    return;
  }

  return (
    <DefaultLayout>
      <Navbar title={article !== null ? article.title : ''} />
      <div className='flex flex-col gap-4 my-4'>
        <Link to={ROUTES.HOME()} className='group'>
          <div className='flex flex-row items-center gap-2'>
            <div className='relative w-4 h-auto aspect-square'>
              <ArrowLeftIcon className='w-full h-full absolute transition-all duration-300 left-0 group-hover:-left-2 group-focus:-left-2' />
            </div>
            <Typography>Return back</Typography>
          </div>
        </Link>
        {isLoading && <Typography>Loading...</Typography>}
        {isSuccess && (
          <div
            className='article-content'
            dangerouslySetInnerHTML={{ __html: article.htmlContent }}
          />
        )}
      </div>
    </DefaultLayout>
  );
};
