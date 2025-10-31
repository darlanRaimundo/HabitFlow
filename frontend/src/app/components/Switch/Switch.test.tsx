import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Switch from './index';

describe('Switch', () => {
  it('toggles uncontrolled switch', async () => {
    render(<Switch defaultChecked={false} label="toggle" />);
    const input = screen.getByRole('checkbox') as HTMLInputElement;
    expect(input.checked).toBe(false);
    fireEvent.click(input);
    expect(input.checked).toBe(true);
  });

  it('reflects controlled checked prop', () => {
    const { rerender } = render(<Switch checked={false} label="c" />);
    const input = screen.getByRole('checkbox') as HTMLInputElement;
    expect(input.checked).toBe(false);
    rerender(<Switch checked={true} label="c" />);
    expect(input.checked).toBe(true);
  });
});
