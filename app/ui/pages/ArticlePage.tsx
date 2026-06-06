import { Link, useLoaderData } from 'react-router';
import { DefaultLayout } from './layouts/DefaultLayout';
import { Typography } from '../components/Typography';
import { Navbar } from '../components/Navbar';
import { ReturnLink } from '../components/ReturnLink';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  LineVerticalIcon,
} from '@phosphor-icons/react';
import { ROUTE_PATHS } from '../../config';
import { stringifyDate } from '../../libs/utils/stringifyDate';
import { loadArticle } from '../../libs/api/loadArticle';
import type { Route } from './+types/ArticlePage';
import { stringifyAuthors } from '../../libs/utils/stringifyAuthors';
import { ProjectDisplay } from '../components/ProjectDisplay';

export const loader = async ({ params }: Route.LoaderArgs) => {
  const article = await loadArticle(params.articleSlug);

  if (!article) {
    throw new Response('Not Found', { status: 404 });
  }

  return { article };
};

const ArticlePage = () => {
  const { article } = useLoaderData<typeof loader>();

  return (
    <DefaultLayout
      customPageMeta={{
        title: `${article.title} by ${stringifyAuthors(article.authors)}`,
        description: article.description,
        author: stringifyAuthors(article.authors),
      }}
    >
      <Navbar title={article.title} />
      <div className='flex flex-col gap-2 grow'>
        <div className='flex flex-row items-center gap-2 mt-1'>
          <ReturnLink />
          <LineVerticalIcon />
          <Typography>{stringifyDate(article.date)}</Typography>
          <LineVerticalIcon />
          <Typography>{stringifyAuthors(article.authors)}</Typography>
        </div>
        {article.projects.length > 0 && (
          <>
            <Typography variant='h2'>Projects:</Typography>
            <div className='flex flex-row gap-4 h-60 overflow-x-auto'>
              {article.projects.map((project) => {
                return <ProjectDisplay key={project.slug} project={project} />;
              })}
            </div>
          </>
        )}
        <div
          className='article-content'
          dangerouslySetInnerHTML={{ __html: article.htmlContent }}
        />
      </div>
      {(article.next || article.previous) && (
        <div className='flex flex-col gap-2 mt-4'>
          <Typography variant='h2'>Read more:</Typography>
          <div className='flex flex-row gap-0 md:gap-4 items-center'>
            {article.next && (
              <Link
                to={ROUTE_PATHS.ARTICLE(article.next.slug)}
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
            {article.previous && (
              <Link
                to={ROUTE_PATHS.ARTICLE(article.previous.slug)}
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

export default ArticlePage;

export const ErrorBoundary = () => {
  return (
    <DefaultLayout>
      <Typography>No article here O-O</Typography>
      <ReturnLink />
    </DefaultLayout>
  );
};
