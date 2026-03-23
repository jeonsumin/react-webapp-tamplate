import { type ComponentPropsWithoutRef } from 'react';

// -- Types ------------------------------------------------------------------

type SpinnerSize = 'sm' | 'md' | 'lg';

interface SpinnerProps extends Omit<ComponentPropsWithoutRef<'svg'>, 'children'> {
  /** Visual size of the spinner */
  size?: SpinnerSize;
  /** Tailwind color class applied to the spinner stroke (e.g. "text-white") */
  color?: string;
  /** Accessible label for screen readers */
  label?: string;
}

// -- Constants ---------------------------------------------------------------

const SIZE_MAP: Record<SpinnerSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
} as const;

// -- Component ---------------------------------------------------------------

export function Spinner({
  size = 'md',
  color = 'text-current',
  label = 'Loading',
  className = '',
  ...rest
}: SpinnerProps) {
  return (
    <svg
      className={`animate-spin ${SIZE_MAP[size]} ${color} ${className}`.trim()}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      role="status"
      aria-label={label}
      {...rest}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
