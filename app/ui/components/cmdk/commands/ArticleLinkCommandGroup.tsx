import type { ArticleMeta } from '../../../../libs/types/webData';
import { Typography } from '../../Typography';
import { stringifyDate } from '../../../../libs/utils/stringifyDate';
import { useNavigate } from 'react-router';
import { ROUTE_PATHS } from '../../../../config';
import { CustomCommandItem } from '../custom/CustomCommandItem';
import { CustomCommandGroup } from '../custom/CustomCommandGroup';
import { loadWebData } from '../../../../libs/api/loadWebData';

interface ArticleLinkCommandGroupProps {
  closeMenu: () => void;
}

export const ArticleLinkCommandGroup: React.FC<
  ArticleLinkCommandGroupProps
> = ({ closeMenu }) => {
  const { articlesMeta } = loadWebData();

  const navigate = useNavigate();

  const handleOpenArticle = (articleMeta: ArticleMeta) => {
    navigate(ROUTE_PATHS.ARTICLE(articleMeta.slug));
    closeMenu();
  };

  return (
    <CustomCommandGroup heading='Articles'>
      {articlesMeta.map((articleMeta) => {
        return (
          <CustomCommandItem
            key={articleMeta.slug}
            title={`Go to article ${articleMeta.title}`}
            handleOnSelected={() => handleOpenArticle(articleMeta)}
          >
            <Typography>{articleMeta.title}</Typography>
            <Typography>@ {stringifyDate(articleMeta.date)}</Typography>
          </CustomCommandItem>
        );
      })}
    </CustomCommandGroup>
  );
};
