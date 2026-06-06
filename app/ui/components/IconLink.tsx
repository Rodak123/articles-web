import { useTheme } from '../../libs/hooks/useTheme';
import type { ProjectLinkType } from '../../libs/types/webData';
import { Themes } from '../../libs/types/theme';
import { cm } from '../../libs/utils/cm';

interface IconLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  type: ProjectLinkType;
}

export const IconLink: React.FC<IconLinkProps> = ({ type, href, ...props }) => {
  const { theme } = useTheme();

  return (
    <a href={href} target='_blank' {...props}>
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
