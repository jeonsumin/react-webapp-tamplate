import { create } from 'zustand';
import { VIEW_MODE, type ViewMode } from 'shared/config/app.config';

interface AppState {
  /** Current view mode determined at build time */
  viewMode: ViewMode;
  /** Whether the mobile sidebar / web sidebar is open */
  isSidebarOpen: boolean;
  /** Authentication token used by the API client */
  token: string | null;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setToken: (token: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  viewMode: VIEW_MODE,
  isSidebarOpen: false,
  token: null,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  setToken: (token) => set({ token }),
}));
