import { useResponsive } from '../../libs/hooks/useResponsive';
import { cm } from '../../libs/utils/cm';
import { ThemeToggleButton } from './ThemeToggleButton';
import { Typography } from './Typography';

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  title,
  className,
  ...props
}) => {
  const { isMobile } = useResponsive();

  return (
    <nav
      {...props}
      className={cm(className, 'w-full flex flex-row items-start')}
    >
      <div className='grow'>
        <Typography
          variant='h1'
          size={isMobile ? '5xl' : '6xl'}
          className={cm(
            'tracking-widest text-start pointer-events-auto',
            !isMobile && 'whitespace-nowrap',
          )}
        >
          {title}
        </Typography>
      </div>
      <div>
        <ThemeToggleButton />
      </div>
    </nav>
  );
};
