import React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: React.ReactNode;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_CLASSES: Record<NonNullable<InputProps['size']>, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
};

const Input: React.FC<InputProps> = ({ label, error, size = 'md', className, ...rest }) => {
  const sizeCls = SIZE_CLASSES[size];

  return (
    <div className={[className, 'w-full'].filter(Boolean).join(' ')}>
      {label ? (
        <label className="block text-sm font-medium mb-1 text-[var(--color-text)]">{label}</label>
      ) : null}
      <input
        {...rest}
        className={`block w-full rounded-md bg-[var(--color-surface)] text-[var(--color-text)] border border-[color:var(--color-muted)/0.16] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)/0.12] ${sizeCls}`}
      />
      {error ? <p className="mt-1 text-sm text-red-500">{error}</p> : null}
    </div>
  );
};

export default Input;
