import { ArrowRightIcon, LineVerticalIcon } from '@phosphor-icons/react';
import { Link } from 'react-router';
import type { ArticleMeta } from '../../libs/types/webData';
import { cm } from '../../libs/utils/cm';
import { ROUTE_PATHS } from '../../config';
import { Typography } from './Typography';
import { useResponsive } from '../../libs/hooks/useResponsive';
import { DateVisual } from './DateVisual';

interface ArticleLinkProps {
  articleMeta: ArticleMeta;
}

export const ArticleLink: React.FC<ArticleLinkProps> = ({ articleMeta }) => {
  const { isMobile } = useResponsive();

  return (
    <Link
      to={ROUTE_PATHS.ARTICLE(articleMeta.slug)}
      className='group'
      title={`Go to article ${articleMeta.title}`}
      viewTransition
    >
      <div className='p-2 flex flex-row gap-4 items-center'>
        <div className='h-8 w-auto aspect-square relative'>
          <ArrowRightIcon
            size={32}
            className={cm(
              'absolute transition duration-300 opacity-0 -rotate-90',
              'group-focus:opacity-100 group-focus:rotate-0',
              'group-hover:opacity-100 group-hover:rotate-0',
            )}
          />
          <LineVerticalIcon
            size={32}
            className={cm(
              'absolute transition duration-300 opacity-100 rotate-0',
              'group-focus:opacity-0 group-focus:rotate-90',
              'group-hover:opacity-0 group-hover:rotate-90',
            )}
          />
        </div>
        <div className='flex flex-col grow gap-2'>
          <div
            className={cm(
              'flex flex-col justify-between gap-2',
              !isMobile && 'flex-row items-center',
            )}
          >
            <Typography size='2xl' variant='h2' className='grow'>
              {articleMeta.title}
            </Typography>
            <Typography>
              @ <DateVisual date={articleMeta.date} />
            </Typography>
          </div>
          <Typography size='md'>{articleMeta.description}</Typography>
        </div>
      </div>
    </Link>
  );
};
