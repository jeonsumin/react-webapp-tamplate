import { useToastStore } from 'shared/store/toastStore';
import { ToastItem } from './Toast';

// -- Component ---------------------------------------------------------------

/**
 * Renders all active toasts. Should be placed once in the app root.
 */
export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm"
    >
      {toasts.map((t) => (
        <ToastItem
          key={t.id}
          id={t.id}
          type={t.type}
          message={t.message}
          duration={t.duration}
          onClose={removeToast}
        />
      ))}
    </div>
  );
}
