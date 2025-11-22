import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../app/components/Card';
import Button from '../app/components/Button';
import { api } from '../services/api';

interface Habit {
  id: string;
  title: string;
  createdAt: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadHabits();
  }, []);

  async function loadHabits() {
    try {
      const data = await api.getHabits();
      setHabits(data.habits);
    } catch (err) {
      setError('Failed to load habits');
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <Button onClick={() => navigate('/habit/new')} size="sm">
          + New Habit
        </Button>
      </div>

      {error && <div className="text-red-500">{error}</div>}

      {habits.length === 0 ? (
        <Card>
          <p className="text-center text-[var(--color-text)] opacity-60 py-4">
            You don't have any habits yet.
          </p>
        </Card>
      ) : (
        <div className="grid gap-3">
          {habits.map((habit) => (
            <Card key={habit.id}>
              <div className="flex justify-between items-center">
                <span className="font-medium">{habit.title}</span>
                <Button variant="ghost" size="sm" onClick={() => navigate(`/habit/${habit.id}`)}>
                  View
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
