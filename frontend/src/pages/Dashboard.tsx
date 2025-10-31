import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../app/components/Card';
import Button from '../app/components/Button';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <p className="text-[var(--color-text)]">Simple dashboard view.</p>
      <Card>
        <div className="flex flex-col gap-2">
          <Button onClick={() => navigate('/habit/1')}>Go to habit 1</Button>
          <Button variant="secondary" onClick={() => navigate('/habit/2')}>
            Go to habit 2
          </Button>
        </div>
      </Card>
    </div>
  );
}
