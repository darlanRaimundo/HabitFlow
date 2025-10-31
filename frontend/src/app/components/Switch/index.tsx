import React, { useState } from 'react';

interface SwitchProps {
  /** controlled */
  checked?: boolean;
  /** uncontrolled initial value */
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  'aria-label'?: string;
  disabled?: boolean;
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  defaultChecked,
  onChange,
  label,
  'aria-label': ariaLabel,
  disabled = false,
}) => {
  const [internalChecked, setInternalChecked] = useState(!!defaultChecked);

  const isControlled = typeof checked === 'boolean';
  const isChecked = isControlled ? (checked as boolean) : internalChecked;

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.checked;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
  };

  return (
    <label className="flex cursor-pointer select-none items-center gap-3">
      <div className="relative">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="sr-only"
          aria-label={ariaLabel}
          disabled={disabled}
        />

        {/* track */}
        <div
          className={
            'block h-8 w-14 rounded-full transition-colors ' +
            (isChecked
              ? 'bg-[var(--color-primary)]'
              : 'bg-[#E5E7EB] dark:bg-[color:var(--color-muted)/0.16]')
          }
        />

        {/* knob */}
        <div
          className={
            'dot absolute left-1 top-1 h-6 w-6 rounded-full bg-white dark:bg-[var(--color-surface)] shadow transition-transform ' +
            (isChecked ? 'translate-x-6' : 'translate-x-0')
          }
        />
      </div>

      {label && (
        <span className="ml-1 text-sm font-medium text-[var(--color-text)]" aria-hidden>
          {label}
        </span>
      )}
    </label>
  );
};

export default Switch;
