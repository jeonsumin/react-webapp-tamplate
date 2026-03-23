import { create } from 'zustand';

// -- Types ------------------------------------------------------------------

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  /** Auto-dismiss duration in ms (0 = manual close only) */
  duration: number;
}

interface ToastState {
  toasts: Toast[];
  /** Add a toast and return its id */
  addToast: (
    toast: Omit<Toast, 'id' | 'duration'> & { duration?: number },
  ) => string;
  /** Remove a specific toast by id */
  removeToast: (id: string) => void;
  /** Remove all toasts */
  clearToasts: () => void;
}

// -- Helpers -----------------------------------------------------------------

let counter = 0;
function generateId(): string {
  return `toast-${++counter}-${Date.now()}`;
}

const DEFAULT_DURATION = 4000;

// -- Store -------------------------------------------------------------------

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  addToast: (toast) => {
    const id = generateId();
    const newToast: Toast = {
      id,
      type: toast.type,
      message: toast.message,
      duration: toast.duration ?? DEFAULT_DURATION,
    };

    set((state) => ({ toasts: [...state.toasts, newToast] }));
    return id;
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),

  clearToasts: () => set({ toasts: [] }),
}));

// -- Convenience helpers (can be called outside React) -----------------------

export const toast = {
  success: (message: string, duration?: number) =>
    useToastStore.getState().addToast({ type: 'success', message, duration }),
  error: (message: string, duration?: number) =>
    useToastStore.getState().addToast({ type: 'error', message, duration }),
  warning: (message: string, duration?: number) =>
    useToastStore.getState().addToast({ type: 'warning', message, duration }),
  info: (message: string, duration?: number) =>
    useToastStore.getState().addToast({ type: 'info', message, duration }),
};
