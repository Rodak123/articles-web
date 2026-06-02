import { useEffect, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { type ThemeMode, Themes, type Theme, ThemeModes } from '../types/theme';
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
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const storedKey = useLS ? localStorage.getItem(themeLSKey) : null;
    return storedKey && storedKey in ThemeModes
      ? ThemeModes[storedKey as keyof typeof ThemeModes]
      : defaultThemeMode;
  });

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

  const changeTheme = (theme: Theme) => setThemeMode(theme);
  const cycleTheme = () => {
    const themes = Object.values(Themes);
    const current = themes.findIndex((t) => t === themeMode);
    setThemeMode(themes[(current + 1) % themes.length]);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: resolveTheme(themeMode),
        changeTheme,
        cycleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
