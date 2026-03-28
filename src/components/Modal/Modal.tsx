import { useEffect, type ReactNode, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  // Контейнер для порталу
  const modalRoot = document.getElementById('modal-root');

  useEffect(() => {
    // 1. Блокуємо прокручування body при відкритті
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    // 2. Обробник натискання клавіші Escape
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    // Функція очищення (Cleanup function)
    return () => {
      // 3. Відновлюємо прокручування при закритті модалки
      document.body.style.overflow = originalStyle;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Перевірка наявності контейнера в DOM
  if (!modalRoot) return null;

  return createPortal(
    <div 
      className={css.backdrop} 
      onClick={handleBackdropClick} 
      role="dialog" 
      aria-modal="true"
    >
      <div className={css.modal}>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;