import { ThemeModes, Themes, type Theme, type ThemeMode } from '../types/theme';

export const resolveTheme = (mode: ThemeMode): Theme => {
  if (mode === ThemeModes.SYSTEM) {
    const darkThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    return darkThemeQuery.matches ? Themes.DARK : Themes.LIGHT;
  }
  return mode;
};
