import { create } from 'zustand';

export type LogLevel = 'log' | 'warn' | 'error' | 'info';

export interface LogEntry {
  id: number;
  level: LogLevel;
  message: string;
  timestamp: Date;
}

interface DevStore {
  logs: LogEntry[];
  isOpen: boolean;
  activeTab: 'logs' | 'query' | 'store';
  addLog: (level: LogLevel, message: string) => void;
  clearLogs: () => void;
  setOpen: (open: boolean) => void;
  setActiveTab: (tab: DevStore['activeTab']) => void;
}

let logId = 0;

export const useDevStore = create<DevStore>((set) => ({
  logs: [],
  isOpen: false,
  activeTab: 'logs',
  addLog: (level, message) =>
    set((state) => ({
      logs: [{ id: logId++, level, message, timestamp: new Date() }, ...state.logs].slice(0, 200),
    })),
  clearLogs: () => set({ logs: [] }),
  setOpen: (open) => set({ isOpen: open }),
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
