import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 max-w-lg w-full mx-4">
        <div className="bg-[var(--color-surface)] text-[var(--color-text)] rounded-lg shadow-lg overflow-hidden">
          {title ? (
            <div className="px-4 py-3 border-b border-[color:var(--color-muted)/0.08] font-semibold">
              {title}
            </div>
          ) : null}
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

export default Modal;
