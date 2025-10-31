import React from 'react';

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  footer?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, footer, children, className, ...rest }) => {
  return (
    <div
      {...rest}
      className={[
        'rounded-lg shadow-sm bg-[var(--color-surface)] text-[var(--color-text)] border border-[color:var(--color-muted)/0.08] p-4',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {title ? <div className="mb-3 text-lg font-semibold">{title}</div> : null}
      <div className="mb-3">{children}</div>
      {footer ? <div className="mt-2">{footer}</div> : null}
    </div>
  );
};

export default Card;
