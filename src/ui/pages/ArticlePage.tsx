import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { DefaultLayout } from './layouts/DefaultLayout';
import { useArticle } from '../../libs/hooks/useArticles';
import { Typography } from '../components/Typography';
import { ROUTES } from '../../routes';

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
      {isLoading && <Typography>Loading...</Typography>}
      {isSuccess && (
        <div
          className='article-content'
          dangerouslySetInnerHTML={{ __html: article.htmlContent }}
        />
      )}
    </DefaultLayout>
  );
};
