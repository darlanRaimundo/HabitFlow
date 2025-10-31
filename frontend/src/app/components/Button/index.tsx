import React from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: React.ReactNode;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    'bg-[var(--color-primary)] hover:opacity-90 text-[var(--color-on-primary)] border-transparent focus:ring-2 focus:ring-[color:var(--color-primary)]',
  secondary:
    'bg-[var(--color-surface)] hover:brightness-95 text-[var(--color-text)] border border-[color:var(--color-muted)] focus:ring-2 focus:ring-[color:var(--color-muted)]',
  ghost:
    'bg-transparent hover:bg-[color:var(--color-surface)/0.04] text-[var(--color-text)] border-transparent',
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-3 text-lg',
};

const base =
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', loading = false, icon, children, className, ...rest },
    ref,
  ) => {
    const variantClass = VARIANT_CLASSES[variant];
    const sizeClass = SIZE_CLASSES[size];

    return (
      <button
        ref={ref}
        className={[base, variantClass, sizeClass, className].filter(Boolean).join(' ')}
        disabled={loading || rest.disabled}
        {...rest}
      >
        {loading ? (
          <svg
            className="animate-spin -ml-1 mr-2 h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        ) : null}

        {icon && !loading ? <span className="mr-2 inline-flex items-center">{icon}</span> : null}

        <span className={'inline-flex items-center'}>{children}</span>
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
