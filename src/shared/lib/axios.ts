import axios from 'axios';
import { useAppStore } from 'shared/store/appStore';
import { toast } from 'shared/store/toastStore';

/**
 * Pre-configured axios instance.
 *
 * - baseURL is read from the VITE_API_BASE_URL env variable.
 * - Request interceptor: attaches the Bearer token stored in appStore.
 * - Response interceptor: handles 401 (clears token) and surfaces generic
 *   error messages via the toast store.
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string || "http://localhost:8080",
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15_000,
});

// -- Request interceptor: attach Authorization header --------------------

apiClient.interceptors.request.use((config) => {
  const token = useAppStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// -- Response interceptor: global error handling -------------------------

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      toast.error('An unexpected error occurred.');
      return Promise.reject(error);
    }

    const status = error.response?.status;

    if (status === 401) {
      // Clear the stored token so the app can redirect to login
      useAppStore.getState().setToken(null);
      toast.error('Session expired. Please log in again.');
    } else if (status === 403) {
      toast.error('You do not have permission to perform this action.');
    } else if (status !== undefined && status >= 500) {
      toast.error('A server error occurred. Please try again later.');
    }

    return Promise.reject(error);
  },
);
