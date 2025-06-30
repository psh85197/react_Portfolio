import { useState, useEffect, useRef, forwardRef } from 'react';
import '@/assets/scss/style.scss';

interface SelectOption {
  value: string;
  label: string;
  ko?: string;
  en?: string;
  zh?: string;
  ja?: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  title?: string;
  onConfirm?: () => void;
  id?: string;
  disabled?: boolean;
  scrollToValue?: string;
  lang?: string;
}

let openSelectId: string | null = null;

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = '선택해주세요',
      title = '선택',
      id = `select-${Math.random().toString(36).substr(2, 9)}`,
      disabled = false,
      scrollToValue,
      lang,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string>(value || '');
    const [isMobile, setIsMobile] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    // MutableRefObject로 변경하여 current 쓰기 가능
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const currentLang = lang && ['ko', 'en', 'zh', 'ja'].includes(lang) ? lang : null;

    useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);

    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth <= 1023);
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          openSelectId = null;
          if (isMobile) {
            document.body.style.overflow = '';
          }
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobile]);

    useEffect(() => {
      if (isOpen && !disabled && scrollToValue && listRef.current) {
        const targetOption = listRef.current.querySelector(`[data-value="${scrollToValue}"]`);
        if (targetOption) {
          targetOption.scrollIntoView({ block: 'center' });
        }
      }
    }, [isOpen, scrollToValue, disabled]);

    const handleSelect = (value: string) => {
      if (disabled) return;
      setSelectedValue(value);
      onChange?.(value);
      setIsOpen(false);
      openSelectId = null;
      if (isMobile) {
        document.body.style.overflow = '';
      }
    };

    const toggleSelect = () => {
      if (disabled) return;
      if (isOpen) {
        setIsOpen(false);
        openSelectId = null;
        if (isMobile) {
          document.body.style.overflow = '';
        }
      } else {
        if (openSelectId && openSelectId !== id) {
          const otherSelect = document.getElementById(openSelectId);
          if (otherSelect) {
            const event = new MouseEvent('mousedown', {
              bubbles: true,
              cancelable: true,
              view: window,
            });
            otherSelect.dispatchEvent(event);
          }
        }
        setIsOpen(true);
        openSelectId = id;
        if (isMobile) {
          document.body.style.overflow = 'hidden';
        }
        // 버튼에 포커스 설정
        if (buttonRef.current) {
          buttonRef.current.focus();
        }
      }
    };

    const selectedLabel = selectedValue
      ? options.find((opt) => opt.value === selectedValue)?.label || placeholder
      : placeholder;

    return (
      <div className={`component-select ${disabled ? 'disabled' : ''}`} ref={selectRef} id={id}>
        <button
          type="button"
          className={`select-display ${isOpen ? 'open' : ''} ${disabled ? 'disabled' : ''}`}
          onClick={toggleSelect}
          disabled={disabled}
          ref={(node) => {
            // buttonRef에 노드 할당 (MutableRefObject로 안전)
            buttonRef.current = node;
            // forwardRef로 전달된 ref 처리
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
            }
          }}
          tabIndex={0}
          aria-label={selectedLabel}
          aria-expanded={isOpen}
          aria-controls={`${id}-list`}
        >
          <span>{selectedLabel}</span>
        </button>
        {isOpen && !disabled && (
          <>
            {isMobile && (
              <div
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => {
                  setIsOpen(false);
                  openSelectId = null;
                  document.body.style.overflow = '';
                }}
              />
            )}
            <div
              className={`select-list-area ${isMobile ? 'mobile-bottom-sheet' : ''} ${isOpen ? 'open' : ''}`}
              id={`${id}-list`}
            >
              <div className="select-head hgroup-coponent">
                <h3 className="hgroup-sub-tit">{title}</h3>
                <button
                  type="button"
                  className="close-btn"
                  onClick={() => {
                    setIsOpen(false);
                    openSelectId = null;
                    if (isMobile) {
                      document.body.style.overflow = '';
                    }
                  }}
                />
              </div>
              <ul className="select-list" ref={listRef}>
                {options.map((option) => (
                  <li key={option.value}>
                    <button
                      type="button"
                      className="select-item"
                      data-value={option.value}
                      onClick={() => handleSelect(option.value)}
                      disabled={disabled}
                    >
                      {currentLang!= null?[currentLang]:option.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    );
  }
);

export default Select;