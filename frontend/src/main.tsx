import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './style.css';
import { ThemeProvider } from './app/theme/ThemeProvider';

const el = document.getElementById('root')!;
createRoot(el).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
