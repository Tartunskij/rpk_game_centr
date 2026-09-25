import { useEffect, useState } from 'react';

const STORAGE_KEY = 'game-store-theme';

function getInitialTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'dark' || saved === 'light') return saved;
  // если пользователь ещё не выбирал — смотрим на системную тему
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
}