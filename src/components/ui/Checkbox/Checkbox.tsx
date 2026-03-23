import { forwardRef, useId, useEffect, useRef, type InputHTMLAttributes } from 'react';

// -- Types ------------------------------------------------------------------

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Label displayed next to the checkbox */
  label?: string;
  /** Indeterminate (partial) state – overrides checked visually */
  indeterminate?: boolean;
  /** Error message */
  error?: string;
}

// -- Component ---------------------------------------------------------------

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      label,
      indeterminate = false,
      error,
      disabled,
      className = '',
      id: externalId,
      ...rest
    },
    forwardedRef,
  ) {
    const autoId = useId();
    const id = externalId ?? autoId;
    const errorId = `${id}-error`;
    const hasError = Boolean(error);

    // Handle indeterminate state via imperative API
    const internalRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        <div className="inline-flex items-center gap-2">
          <input
            ref={(node) => {
              internalRef.current = node;
              // Forward ref
              if (typeof forwardedRef === 'function') {
                forwardedRef(node);
              } else if (forwardedRef) {
                forwardedRef.current = node;
              }
            }}
            id={id}
            type="checkbox"
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
            className={`
              h-4 w-4 shrink-0 rounded border transition-colors cursor-pointer
              text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
              disabled:opacity-50 disabled:cursor-not-allowed
              ${hasError ? 'border-red-500' : 'border-gray-300'}
            `}
            {...rest}
          />
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

        {hasError && (
          <p id={errorId} className="text-xs text-red-600 ml-6" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);
