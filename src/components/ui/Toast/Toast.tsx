import { useEffect, useState } from 'react';

// -- Types ------------------------------------------------------------------

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastItemProps {
  id: string;
  type: ToastType;
  message: string;
  duration: number;
  onClose: (id: string) => void;
}

// -- Style maps --------------------------------------------------------------

const TYPE_STYLES: Record<ToastType, string> = {
  success: 'bg-green-50 border-green-400 text-green-800',
  error: 'bg-red-50 border-red-400 text-red-800',
  warning: 'bg-yellow-50 border-yellow-400 text-yellow-800',
  info: 'bg-blue-50 border-blue-400 text-blue-800',
};

const TYPE_ICONS: Record<ToastType, string> = {
  success: '\u2713',
  error: '\u2717',
  warning: '\u26A0',
  info: '\u2139',
};

// -- Component ---------------------------------------------------------------

export function ToastItem({
  id,
  type,
  message,
  duration,
  onClose,
}: ToastItemProps) {
  const [visible, setVisible] = useState(false);

  // Animate in
  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Auto-dismiss
  useEffect(() => {
    if (duration <= 0) return;

    const timer = setTimeout(() => {
      setVisible(false);
      // Wait for exit animation before removing from store
      setTimeout(() => onClose(id), 200);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onClose(id), 200);
  };

  return (
    <div
      role="alert"
      className={`
        flex items-start gap-3 rounded-lg border-l-4 p-4 shadow-md
        transition-all duration-200 ease-in-out
        ${TYPE_STYLES[type]}
        ${visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
    >
      <span className="mt-0.5 text-base font-bold leading-none" aria-hidden="true">
        {TYPE_ICONS[type]}
      </span>

      <p className="flex-1 text-sm">{message}</p>

      <button
        onClick={handleClose}
        className="shrink-0 text-current opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Close notification"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
