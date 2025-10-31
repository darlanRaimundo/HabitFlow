import React from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Card from '../app/components/Card';
import Input from '../app/components/Input';
import Button from '../app/components/Button';

const schema = z.object({
  title: z.string().min(1),
  note: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function Habit() {
  const { id } = useParams();
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  function onSubmit(data: FormValues) {
    alert(`Saved habit ${id}: ${JSON.stringify(data)}`);
  }

  return (
    <Card title={`Habit ${id}`}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Input label="Title" {...register('title')} />
        <label>
          <div className="text-sm mb-1">Note</div>
          <textarea
            {...register('note')}
            className="w-full rounded-md p-2 bg-[var(--color-surface)] text-[var(--color-text)]"
          />
        </label>
        <div>
          <Button type="submit">Save</Button>
        </div>
      </form>
      {formState.errors && (
        <pre className="mt-3 text-sm text-red-500">{JSON.stringify(formState.errors, null, 2)}</pre>
      )}
    </Card>
  );
}
