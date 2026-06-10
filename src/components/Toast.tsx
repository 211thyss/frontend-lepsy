import { useEffect } from 'react';
import { CheckCircle, XmarkCircle, InfoCircle, WarningCircle, Xmark } from 'iconoir-react';
import './Toast.css';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  type: ToastType;
  message: string;
  description?: string;
  onClose: () => void;
  duration?: number;
}

export function Toast({ type, message, description, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: CheckCircle,
    error: XmarkCircle,
    info: InfoCircle,
    warning: WarningCircle,
  };

  const Icon = icons[type];

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-icon">
        <Icon strokeWidth={2} />
      </div>
      <div className="toast-content">
        <div className="toast-message">{message}</div>
        {description && <div className="toast-description">{description}</div>}
      </div>
      <button className="toast-close" onClick={onClose}>
        <Xmark strokeWidth={2} />
      </button>
    </div>
  );
}
