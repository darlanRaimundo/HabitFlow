import React from 'react';
import Switch from './app/components/Switch';
import { useTheme } from './app/theme/ThemeProvider';
import Card from './app/components/Card';
import Input from './app/components/Input';
import Modal from './app/components/Modal';
import Button from './app/components/Button';
import { useState } from 'react';

export default function App() {
  const { resolved, setTheme } = useTheme();

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors">
      <main className="max-w-2xl w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">HabitFlow</h1>
          <Switch
            checked={resolved === 'dark'}
            onChange={(v) => setTheme(v ? 'dark' : 'light')}
            label={resolved === 'dark' ? '🌙 Dark' : '☀️ Light'}
            aria-label="Toggle theme"
          />
        </div>
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            Welcome to your Vite + React + TypeScript app. Tailwind is configured.
          </p>

          <Card title="Form demo">
            <div className="space-y-3">
              <Input
                label="Name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="flex gap-2">
                <Button onClick={() => setModalOpen(true)}>Open modal</Button>
                <Button variant="secondary" onClick={() => alert(`Hello ${name || 'stranger'}`)}>
                  Say hi
                </Button>
              </div>
            </div>
          </Card>

          <Card title="Standalone input">
            <Input label="Email" placeholder="you@example.com" />
          </Card>

          <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Example modal">
            <p className="mb-4">
              This is a demo modal. Your name is: <strong>{name || '—'}</strong>
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setModalOpen(false)}>
                Close
              </Button>
              <Button
                onClick={() => {
                  setModalOpen(false);
                  alert('Saved');
                }}
              >
                Save
              </Button>
            </div>
          </Modal>
        </div>
      </main>
    </div>
  );
}
