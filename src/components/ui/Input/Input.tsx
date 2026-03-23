import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';

// -- Types ------------------------------------------------------------------

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label displayed above the input */
  label?: string;
  /** Error message – also applies error styling */
  error?: string;
  /** Helper text displayed below the input */
  helperText?: string;
  /** Icon rendered inside the input on the left */
  leftIcon?: ReactNode;
  /** Icon rendered inside the input on the right */
  rightIcon?: ReactNode;
}

// -- Component ---------------------------------------------------------------

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      disabled,
      className = '',
      id: externalId,
      ...rest
    },
    ref,
  ) {
    const autoId = useId();
    const id = externalId ?? autoId;
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;

    const hasError = Boolean(error);

    const ringColor = hasError
      ? 'border-red-500 focus-within:ring-red-500'
      : 'border-gray-300 focus-within:ring-blue-500';

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

        <div
          className={`flex items-center rounded-lg border bg-white px-3 transition-colors focus-within:ring-2 focus-within:ring-offset-0 ${ringColor} ${
            disabled ? 'opacity-50 bg-gray-50 cursor-not-allowed' : ''
          }`}
        >
          {leftIcon && (
            <span className="mr-2 flex shrink-0 text-gray-400">{leftIcon}</span>
          )}

          <input
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? errorId : helperText ? helperId : undefined
            }
            className="w-full bg-transparent py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed"
            {...rest}
          />

          {rightIcon && (
            <span className="ml-2 flex shrink-0 text-gray-400">
              {rightIcon}
            </span>
          )}
        </div>

        {hasError && (
          <p id={errorId} className="text-xs text-red-600" role="alert">
            {error}
          </p>
        )}

        {!hasError && helperText && (
          <p id={helperId} className="text-xs text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);
