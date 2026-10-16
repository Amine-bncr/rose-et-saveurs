import { writeStorage } from './storage';

export type Theme = 'light' | 'dark';
export const THEME_KEY = 'rs-theme-v2';

export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  writeStorage(THEME_KEY, theme);
}
