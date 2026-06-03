import { MonitorIcon, MoonStarsIcon, SunIcon } from '@phosphor-icons/react';
import { Button } from './Button';
import { useTheme } from '../../libs/hooks/useTheme';
import { ThemeModes } from '../../libs/types/theme';

export const ThemeToggleButton: React.FC = () => {
  const { themeMode, cycleThemeMode } = useTheme();

  const handleOnClick = () => {
    cycleThemeMode();
  };

  return (
    <Button
      className='h-min w-auto aspect-square'
      variant='ghost'
      onClick={handleOnClick}
    >
      {themeMode === ThemeModes.DARK && <MoonStarsIcon size={32} />}
      {themeMode === ThemeModes.LIGHT && <SunIcon size={32} />}
      {themeMode === ThemeModes.SYSTEM && <MonitorIcon size={32} />}
    </Button>
  );
};
