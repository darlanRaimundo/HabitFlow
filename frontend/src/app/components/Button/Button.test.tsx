import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Button from './index';

describe('Button', () => {
  it('renders children and responds to click', () => {
    const handle = vi.fn();
    render(<Button onClick={handle}>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Click me'));
    expect(handle).toHaveBeenCalledTimes(1);
  });

  it('shows loading spinner and is disabled when loading', () => {
    render(<Button loading>Loading</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });
});
