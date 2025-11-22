import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import Card from '../app/components/Card';
import Input from '../app/components/Input';
import Button from '../app/components/Button';
import { api } from '../services/api';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (api.getToken()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormValues) {
    setError(null);
    try {
      let response;
      if (isLogin) {
        response = await api.login(data.email, data.password);
      } else {
        response = await api.register(data.email, data.password, data.name);
      }

      api.setTokens(response.token, response.refreshToken);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <Card title={isLogin ? "Sign in" : "Create account"}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {!isLogin && (
          <div className="flex flex-col gap-1">
            <Input label="Name" {...register('name')} type="text" />
            {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <Input label="Email" {...register('email')} type="email" />
          {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <Input label="Password" {...register('password')} type="password" />
          {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
        </div>

        {error && (
          <div className="text-red-500 text-sm bg-red-50 p-2 rounded border border-red-100">
            {error}
          </div>
        )}

        <div className="pt-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Loading...' : (isLogin ? 'Sign in' : 'Sign up')}
          </Button>
        </div>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
            }}
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </form>
    </Card>
  );
}
