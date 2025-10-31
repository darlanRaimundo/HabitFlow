import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useTheme } from './app/theme/ThemeProvider';
import Switch from './app/components/Switch';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Habit from './pages/Habit';

export default function App() {
  const { resolved, setTheme } = useTheme();

  return (
    <div>
      <header className="p-4 border-b border-[color:var(--color-muted)/0.08] mb-4">
        <nav className="container mx-auto flex items-center justify-between">
          <Link to="/" className="font-semibold text-[var(--color-primary)]">
            HabitFlow
          </Link>
          <div className="space-x-3">
            <Link to="/auth" className="text-sm">
              Auth
            </Link>
            <Link to="/dashboard" className="text-sm">
              Dashboard
            </Link>
          </div>
          <Switch
            checked={resolved === 'dark'}
            onChange={(v) => setTheme(v ? 'dark' : 'light')}
            label={resolved === 'dark' ? '🌙 Dark' : '☀️ Light'}
            aria-label="Toggle theme"
          />
        </nav>
      </header>

      <main className="container mx-auto px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/habit/:id" element={<Habit />} />
        </Routes>
      </main>
    </div>
  );
}
