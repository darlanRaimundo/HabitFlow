import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useTheme } from './app/theme/ThemeProvider';
import Switch from './app/components/Switch';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Habit from './pages/Habit';
import { api } from './services/api';

export default function App() {
  const { resolved, setTheme } = useTheme();
  const navigate = useNavigate();
  const isAuthenticated = !!api.getToken();

  function handleLogout() {
    api.clearTokens();
    navigate('/login');
  }

  return (
    <div>
      <header className="p-4 border-b border-[color:var(--color-muted)/0.08] mb-4">
        <nav className="container mx-auto flex items-center justify-between">
          <Link to="/" className="font-semibold text-[var(--color-primary)]">
            HabitFlow
          </Link>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-sm hover:text-[var(--color-primary)]">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="text-sm hover:text-[var(--color-primary)]">
                Login
              </Link>
            )}
            <Switch
              checked={resolved === 'dark'}
              onChange={(v) => setTheme(v ? 'dark' : 'light')}
              label={resolved === 'dark' ? '🌙' : '☀️'}
              aria-label="Toggle theme"
            />
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/habit/:id" element={<Habit />} />
        </Routes>
      </main>
    </div>
  );
}
