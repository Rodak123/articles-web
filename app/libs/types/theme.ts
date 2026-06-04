
export const Themes = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type Theme = typeof Themes[keyof typeof Themes];

export const ThemeModes = {
  ...Themes,
  SYSTEM: 'system',
} as const;

export type ThemeMode = typeof ThemeModes[keyof typeof ThemeModes];
