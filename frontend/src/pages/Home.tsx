import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../app/components/Button';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Home</h2>
      <p className="text-[var(--color-text)]">This is the public home page.</p>
      <div className="flex gap-2">
        <Button variant="ghost" onClick={() => navigate('/auth')}>
          Sign in
        </Button>
        <Button onClick={() => navigate('/dashboard')}>Dashboard</Button>
      </div>
    </div>
  );
}
