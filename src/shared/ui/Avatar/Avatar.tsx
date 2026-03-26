import { useState, type ImgHTMLAttributes } from 'react';

// -- Types ------------------------------------------------------------------

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'size'> {
  /** Image source URL */
  src?: string;
  /** Alt text and fallback initials source */
  name?: string;
  /** Size preset */
  size?: AvatarSize;
  /** Show an online-status indicator dot */
  online?: boolean;
}

// -- Helpers -----------------------------------------------------------------

const SIZE_MAP: Record<AvatarSize, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
};

const DOT_SIZE_MAP: Record<AvatarSize, string> = {
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
  lg: 'h-3 w-3',
  xl: 'h-3.5 w-3.5',
};

/** Extract up to 2 initials from a name string */
function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => (part[0] ?? '').toUpperCase())
    .join('');
}

// Stable color palette for initials background
const BG_COLORS = [
  'bg-blue-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-amber-500',
  'bg-pink-500',
  'bg-teal-500',
  'bg-indigo-500',
  'bg-rose-500',
];

function pickColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return BG_COLORS[Math.abs(hash) % BG_COLORS.length] as string;
}

// -- Component ---------------------------------------------------------------

export function Avatar({
  src,
  name = '',
  size = 'md',
  online,
  className = '',
  ...rest
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const showImage = Boolean(src) && !imgError;
  const initials = getInitials(name);

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center rounded-full overflow-hidden ${SIZE_MAP[size]} ${className}`}
    >
      {showImage ? (
        <img
          src={src}
          alt={name || 'avatar'}
          onError={() => setImgError(true)}
          className="h-full w-full object-cover"
          {...rest}
        />
      ) : (
        <span
          className={`flex h-full w-full items-center justify-center font-medium text-white ${
            name ? pickColor(name) : 'bg-gray-400'
          }`}
          aria-label={name || 'avatar'}
        >
          {initials || '?'}
        </span>
      )}

      {online !== undefined && (
        <span
          className={`absolute bottom-0 right-0 block rounded-full ring-2 ring-white ${
            DOT_SIZE_MAP[size]
          } ${online ? 'bg-green-500' : 'bg-gray-400'}`}
          aria-label={online ? 'Online' : 'Offline'}
        />
      )}
    </span>
  );
}
