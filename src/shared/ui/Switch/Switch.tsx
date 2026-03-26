import { useId, type ComponentPropsWithoutRef } from 'react';

// -- Types ------------------------------------------------------------------

interface SwitchProps
  extends Omit<ComponentPropsWithoutRef<'button'>, 'onChange' | 'role'> {
  /** Label displayed next to the switch */
  label?: string;
  /** Controlled checked state */
  checked: boolean;
  /** Change handler */
  onChange: (checked: boolean) => void;
  /** Disable interaction */
  disabled?: boolean;
}

// -- Component ---------------------------------------------------------------

export function Switch({
  label,
  checked,
  onChange,
  disabled = false,
  className = '',
  id: externalId,
  ...rest
}: SwitchProps) {
  const autoId = useId();
  const id = externalId ?? autoId;

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`
          relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full
          transition-colors duration-200 ease-in-out
          focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
          ${checked ? 'bg-blue-600' : 'bg-gray-300'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        {...rest}
      >
        <span
          aria-hidden="true"
          className={`
            pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm
            ring-0 transition-transform duration-200 ease-in-out
            ${checked ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
      {label && (
        <label
          htmlFor={id}
          className={`text-sm text-gray-700 select-none ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
}
