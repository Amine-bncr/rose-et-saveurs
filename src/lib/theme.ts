import { readStorage, writeStorage } from './storage';

export type Theme = 'light' | 'dark';
export const THEME_KEY = 'rs-theme';

export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  writeStorage(THEME_KEY, theme);
}

export function initialTheme(): Theme {
  const stored = readStorage(THEME_KEY);
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
