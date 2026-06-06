import { useEffect, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { type ThemeMode, Themes, ThemeModes } from '../types/theme';
import { resolveTheme } from '../utils/resolveTheme';

interface ThemeProviderProps {
  defaultThemeMode: ThemeMode;
  children: React.ReactNode;
  themeLSKey?: string;
  useLS?: boolean;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultThemeMode,
  themeLSKey = 'stored-theme',
  useLS = false,
}) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(defaultThemeMode);

  useEffect(() => {
    if (!useLS) return;

    const storedKey = localStorage.getItem(themeLSKey);
    if (storedKey && storedKey in ThemeModes) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setThemeMode(ThemeModes[storedKey as keyof typeof ThemeModes]);
    }
  }, [themeLSKey, useLS]);

  useEffect(() => {
    const theme = resolveTheme(themeMode);
    const body = document.body;
    Object.values(Themes).forEach((val) => body.classList.remove(val));
    body.classList.add(theme);

    const themeKey = Object.entries(Themes).find(
      ([, val]) => val === themeMode,
    )?.[0];
    if (useLS && themeKey) localStorage.setItem(themeLSKey, themeKey);
  }, [themeMode, themeLSKey, useLS]);

  const changeThemeMode = (theme: ThemeMode) => setThemeMode(theme);

  const getNextThemeMode = () => {
    const themeModes = Object.values(ThemeModes);
    const current = themeModes.findIndex((t) => t === themeMode);
    return themeModes[(current + 1) % themeModes.length];
  };

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        theme: resolveTheme(themeMode),
        changeThemeMode,
        getNextThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
