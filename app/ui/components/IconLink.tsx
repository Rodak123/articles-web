import { useTheme } from '../../libs/hooks/useTheme';
import type { ProjectLinkType } from '../../libs/types/webData';
import { Themes } from '../../libs/types/theme';
import { cm } from '../../libs/utils/cm';

interface IconLinkProps {
  type: ProjectLinkType;
  link: string;
}

export const IconLink: React.FC<IconLinkProps> = ({ link, type }) => {
  const { theme } = useTheme();

  return (
    <a href={link} target='_blank'>
      <img
        src={`/icons/${type}.svg`}
        className={cm(
          'w-full h-8 grow px-4 object-contain',
          theme === Themes.DARK && 'invert',
        )}
      />
    </a>
  );
};
