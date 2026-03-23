import { type UseQueryResult, type UseMutationResult } from '@tanstack/react-query';

// -- Derived state helpers ---------------------------------------------------

/**
 * Extract a uniform status object from any `useQuery` result.
 * Useful when multiple queries need to be combined into a single
 * loading / error state in the UI.
 */
export function getQueryStatus<TData, TError>(
  query: UseQueryResult<TData, TError>,
) {
  return {
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    isSuccess: query.isSuccess,
  } as const;
}

/**
 * Extract a uniform status object from any `useMutation` result.
 */
export function getMutationStatus<TData, TError, TVariables, TContext>(
  mutation: UseMutationResult<TData, TError, TVariables, TContext>,
) {
  return {
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  } as const;
}
