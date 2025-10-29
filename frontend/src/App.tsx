import React, { useEffect, useState } from 'react';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark' || stored === 'light') return stored;
      return typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      /* ignore write errors */
    }
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors">
      <main className="max-w-2xl w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">HabitFlow</h1>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Welcome to your Vite + React + TypeScript app. Tailwind is configured.
        </p>
      </main>
    </div>
  );
}
