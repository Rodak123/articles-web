import { createContext } from 'react';
import type { Theme, ThemeMode } from '../types/theme';

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  changeThemeMode: (theme: ThemeMode) => void;
  getNextThemeMode: () => ThemeMode;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);
