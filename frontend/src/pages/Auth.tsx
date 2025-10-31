import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import Card from '../app/components/Card';
import Input from '../app/components/Input';
import Button from '../app/components/Button';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormValues = z.infer<typeof schema>;

export default function Auth() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  function onSubmit(data: FormValues) {
    console.log('login', data);
    // demo: navigate to dashboard
    navigate('/dashboard');
  }

  return (
    <Card title="Sign in">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Input label="Email" {...register('email')} type="email" />
        <Input label="Password" {...register('password')} type="password" />

        <div>
          <Button type="submit">Sign in</Button>
        </div>
      </form>
      {formState.errors && (
        <pre className="mt-3 text-sm text-red-500">{JSON.stringify(formState.errors, null, 2)}</pre>
      )}
    </Card>
  );
}
