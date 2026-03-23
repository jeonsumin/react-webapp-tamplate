/**
 * Application configuration.
 * VIEW_MODE is determined by the VITE_VIEW_MODE environment variable.
 *
 * Usage:
 *   - Auto (device detect): npm run dev           (VITE_VIEW_MODE=auto)
 *   - Force web:            npm run dev:web        (VITE_VIEW_MODE=web)
 *   - Force mobile:         npm run dev:mobile     (VITE_VIEW_MODE=mobile)
 */
export type ViewMode = 'web' | 'mobile' | 'auto';

export const VIEW_MODE: ViewMode =
  (import.meta.env.VITE_VIEW_MODE as ViewMode) || 'auto';

export const isAutoMode = (): boolean => VIEW_MODE === 'auto';
export const isWebMode = (): boolean => VIEW_MODE === 'web';
export const isMobileMode = (): boolean => VIEW_MODE === 'mobile';
