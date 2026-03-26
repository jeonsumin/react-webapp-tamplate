import type { ReactNode } from 'react';
import { create } from 'zustand';

export interface ModalOptions {
  title?: string;
  content: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  /** 백드롭 클릭 시 닫기 여부 (기본값: true) */
  closeOnBackdrop?: boolean;
}

interface ModalEntry extends ModalOptions {
  id: string;
}

interface ModalStore {
  stack: ModalEntry[];
  open: (options: ModalOptions) => string;
  close: (id?: string) => void;
  closeAll: () => void;
}

let seq = 0;

export const useModalStore = create<ModalStore>((set, get) => ({
  stack: [],
  open: (options) => {
    const id = `modal-${++seq}`;
    set((s) => ({ stack: [...s.stack, { ...options, id }] }));
    return id;
  },
  close: (id) => {
    const { stack } = get();
    const targetId = id ?? stack[stack.length - 1]?.id;
    if (!targetId) return;
    set((s) => ({ stack: s.stack.filter((m) => m.id !== targetId) }));
  },
  closeAll: () => set({ stack: [] }),
}));

/** 컴포넌트 외부에서 명령형으로 모달을 제어하는 헬퍼 */
export const modal = {
  open: (options: ModalOptions) => useModalStore.getState().open(options),
  close: (id?: string) => useModalStore.getState().close(id),
  closeAll: () => useModalStore.getState().closeAll(),
};
