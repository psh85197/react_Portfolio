import * as React from "react"
import { cn } from "@/lib/utils"
import { ReactNode, useEffect } from "react"

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: 'large' | 'medium' | 'small' | 'fullscreen';
  title: ReactNode;
  children: ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  size = "medium",
  title,
  children,
  className,
}) => {

  const preventPageScroll = () => {
    if (typeof window !== 'undefined') {
      // Set CSS variable for scrollbar width to 0
      document.documentElement.style.setProperty('--scrollbar-offset', '0px');
      // Add class to html element
      document.documentElement.classList.add('modal-open');
    }
  };

  const allowPageScroll = () => {
    if (typeof window !== 'undefined') {
      // Remove class from html element
      document.documentElement.classList.remove('modal-open');
      // Remove CSS variable
      document.documentElement.style.removeProperty('--scrollbar-offset');
    }
  };

  useEffect(() => {
    if (isOpen) {
      preventPageScroll();
    } else {
      allowPageScroll();
    }

    return () => {
      allowPageScroll();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    large: 'w-[996px]',
    medium: 'w-[792px]',
    small: 'w-[588px]',
    fullscreen: 'w-full h-full max-w-none'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative z-50 bg-white shadow-lg max-h-[90vh] overflow-y-auto modal-content",
          size === 'fullscreen' ? 'h-full max-h-none' : '',
          sizeClasses[size],
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className={cn(
            "",
            size === 'fullscreen' ? 'sticky top-0 bg-white z-10 border-b' : ''
          )}>
            {title}
          </div>
        )}
        <div className={cn(
          "",
          size === 'fullscreen' ? 'h-[calc(100%-80px)] overflow-y-auto' : ''
        )}>
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.displayName = "Modal"; 