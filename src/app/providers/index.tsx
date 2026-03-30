import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from 'shared/lib/queryClient';

interface AppProvidersProps {
  children: React.ReactNode;
}

/**
 * Centralized provider wrapper for the application.
 * Wraps the app with all necessary context providers.
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
