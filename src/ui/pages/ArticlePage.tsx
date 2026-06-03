import React from 'react';
import { Link, useParams } from 'react-router';
import { DefaultLayout } from './layouts/DefaultLayout';
import { useArticle } from '../../libs/hooks/useArticles';
import { Typography } from '../components/Typography';
import { Navbar } from '../components/Navbar';
import { ReturnLink } from '../components/ReturnLink';
import { Loader } from '../components/Loader';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  LineVerticalIcon,
} from '@phosphor-icons/react';
import { ROUTES } from '../../routes';
import { stringifyDate } from '../../libs/utils/stringifyDate';

export const ArticlePage: React.FC = () => {
  const { articleSlug } = useParams();
  const { article, isLoading, isFailed } = useArticle(articleSlug);

  if (isFailed) {
    return (
      <DefaultLayout>
        <Typography>No article here O-O</Typography>
        <ReturnLink />
      </DefaultLayout>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <DefaultLayout>
      <Navbar title={article !== null ? article.title : ''} />
      <div className='flex flex-col gap-2 grow'>
        <div className='flex flex-row items-center gap-2 mt-1'>
          <ReturnLink />
          <LineVerticalIcon />
          <Typography>{stringifyDate(article.date)}</Typography>
          <LineVerticalIcon />
          <div>
            {article.authors.map((author, i) => {
              const hasPrevious = i > 0;
              return (
                <div key={author.slug}>
                  {hasPrevious && <Typography>, </Typography>}
                  <Typography>
                    {author.firstName} {author.lastName}
                  </Typography>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className='article-content'
          dangerouslySetInnerHTML={{ __html: article.htmlContent }}
        />
      </div>
      {(article.next !== null || article.previous !== null) && (
        <div className='flex flex-col gap-2 mt-4'>
          <Typography variant='h2'>Read more:</Typography>
          <div className='flex flex-row gap-0 md:gap-4 items-center'>
            {article.next !== null && (
              <Link
                to={ROUTES.ARTICLE(article.next?.slug)}
                className='grow md:grow-0'
              >
                <div className='flex flex-row items-center gap-2'>
                  <ArrowUpIcon />
                  <Typography className='font-bold'>
                    {article.next.title}
                  </Typography>
                </div>
              </Link>
            )}
            {article.previous !== null && (
              <Link
                to={ROUTES.ARTICLE(article.previous.slug)}
                className='grow md:grow-0'
              >
                <div className='flex flex-row items-center gap-2'>
                  <ArrowDownIcon />
                  <Typography className='font-bold'>
                    {article.previous.title}
                  </Typography>
                </div>
              </Link>
            )}
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};
