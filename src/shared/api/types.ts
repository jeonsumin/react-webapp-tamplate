/**
 * Standard wrapper returned by the backend for single-resource endpoints.
 */
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

/**
 * Standard wrapper returned by the backend for paginated list endpoints.
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
