import { QueryClient, type DefaultOptions } from '@tanstack/react-query';
import { toast } from 'shared/store/toastStore';

const DEFAULT_STALE_TIME = 60 * 1000; // 1 minute
const DEFAULT_RETRY_COUNT = 1;

const defaultOptions: DefaultOptions = {
  queries: {
    staleTime: DEFAULT_STALE_TIME,
    retry: DEFAULT_RETRY_COUNT,
    refetchOnWindowFocus: false,
  },
  mutations: {
    retry: false,
    onError: (error: Error) => {
      toast.error(error.message || 'An error occurred while processing your request.');
    },
  },
};

export const queryClient = new QueryClient({ defaultOptions });
