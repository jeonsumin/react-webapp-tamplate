import { type ComponentPropsWithoutRef } from 'react';

// -- Types ------------------------------------------------------------------

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
type BadgeSize = 'sm' | 'md';

interface BadgeProps extends ComponentPropsWithoutRef<'span'> {
  /** Color variant */
  variant?: BadgeVariant;
  /** Size preset */
  size?: BadgeSize;
}

// -- Style maps --------------------------------------------------------------

const VARIANT_MAP: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
};

const SIZE_MAP: Record<BadgeSize, string> = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-0.5',
};

// -- Component ---------------------------------------------------------------

export function Badge({
  variant = 'default',
  size = 'sm',
  className = '',
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${VARIANT_MAP[variant]} ${SIZE_MAP[size]} ${className}`.trim()}
      {...rest}
    >
      {children}
    </span>
  );
}
