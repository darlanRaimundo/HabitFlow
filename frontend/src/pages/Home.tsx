import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../app/components/Button';
import Card from '../app/components/Card';
import Input from '../app/components/Input';
import Modal from '../app/components/Modal';

export default function Home() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Home</h2>
      <p className="text-[var(--color-text)]">This is the public home page.</p>
      <div className="flex gap-2">
        <Button variant="ghost" onClick={() => navigate('/login')}>
          Sign in
        </Button>
        <Button onClick={() => navigate('/dashboard')}>Dashboard</Button>
      </div>

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
  );
}
