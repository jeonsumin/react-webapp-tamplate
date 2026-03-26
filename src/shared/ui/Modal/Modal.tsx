import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

// -- Types ------------------------------------------------------------------

type ModalSize = 'sm' | 'md' | 'lg';

interface ModalProps {
  /** Whether the modal is visible */
  open: boolean;
  /** Called when the user requests closing (X button, Escape, backdrop click) */
  onClose: () => void;
  /** Modal title displayed in the header */
  title?: string;
  /** Footer content (typically action buttons) */
  footer?: ReactNode;
  /** Width preset */
  size?: ModalSize;
  /** 백드롭 클릭 시 닫기 여부 (기본값: true) */
  closeOnBackdrop?: boolean;
  /** 중첩 시 z-index 기준값 (기본값: 50) */
  zIndex?: number;
  /** Main content */
  children: ReactNode;
}

// -- Constants ---------------------------------------------------------------

const SIZE_MAP: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

// -- Component ---------------------------------------------------------------

export function Modal({
  open,
  onClose,
  title,
  footer,
  size = 'md',
  closeOnBackdrop = true,
  zIndex = 50,
  children,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Trap focus & handle Escape
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Prevent body scroll while modal is open
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  // Auto-focus the dialog container when opened
  useEffect(() => {
    if (open) {
      dialogRef.current?.focus();
    }
  }, [open]);

  if (!open) return null;

  const handleBackdropClick = () => {
    if (closeOnBackdrop) onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center p-4 bg-black/50"
      style={{ zIndex }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={handleBackdropClick}
    >
      {/* Dialog panel — 클릭이 백드롭까지 전파되지 않도록 stopPropagation */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className={`
          w-full ${SIZE_MAP[size]}
          rounded-xl bg-white shadow-xl
          flex flex-col max-h-[90vh]
          focus:outline-none
          animate-[modal-enter_200ms_ease-out]
        `}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              aria-label="Close dialog"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-2 border-t border-gray-200 px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
