import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import { ThemeProvider } from './app/theme/ThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const el = document.getElementById('root')!;

createRoot(el).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
