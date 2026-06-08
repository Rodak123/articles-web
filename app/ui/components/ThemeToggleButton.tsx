import { MonitorIcon, MoonStarsIcon, SunIcon } from '@phosphor-icons/react';
import { Button } from './Button';
import { useTheme } from '../../libs/hooks/useTheme';
import { ThemeModes } from '../../libs/types/theme';

export const ThemeToggleButton: React.FC = () => {
  const { themeMode, changeThemeMode, getNextThemeMode } = useTheme();

  const handleOnClick = () => {
    changeThemeMode(getNextThemeMode());
  };

  return (
    <Button
      className='h-min w-auto aspect-square noscript:hidden'
      variant='ghost'
      title={`Change color theme to ${getNextThemeMode()}`}
      onClick={handleOnClick}
    >
      {themeMode === ThemeModes.DARK && <MoonStarsIcon size={32} />}
      {themeMode === ThemeModes.LIGHT && <SunIcon size={32} />}
      {themeMode === ThemeModes.SYSTEM && <MonitorIcon size={32} />}
    </Button>
  );
};
