import {
  forwardRef,
  useId,
  type SelectHTMLAttributes,
} from 'react';

// -- Types ------------------------------------------------------------------

/** A single option inside the Select dropdown */
interface SelectOption {
  /** The value submitted with the form */
  value: string;
  /** Human-readable label */
  label: string;
  /** Whether this option is disabled */
  disabled?: boolean;
}

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Available options */
  options: SelectOption[];
  /** Label displayed above the select */
  label?: string;
  /** Placeholder shown when no value is selected */
  placeholder?: string;
  /** Error message – also applies error styling */
  error?: string;
}

// -- Component ---------------------------------------------------------------

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      options,
      label,
      placeholder,
      error,
      disabled,
      className = '',
      id: externalId,
      ...rest
    },
    ref,
  ) {
    const autoId = useId();
    const id = externalId ?? autoId;
    const errorId = `${id}-error`;

    const hasError = Boolean(error);

    const ringColor = hasError
      ? 'border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:ring-blue-500';

    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}

        <select
          ref={ref}
          id={id}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={`
            w-full appearance-none rounded-lg border bg-white px-3 py-2 pr-8
            text-sm text-gray-900 transition-colors
            focus:outline-none focus:ring-2 focus:ring-offset-0
            disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50
            ${ringColor}
          `}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 0.5rem center',
            backgroundSize: '1rem',
          }}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>

        {hasError && (
          <p id={errorId} className="text-xs text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);
