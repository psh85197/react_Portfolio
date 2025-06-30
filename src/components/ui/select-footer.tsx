import { FC, useState, useEffect, useRef } from "react";
import "@/assets/scss/style.scss";

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

export const Select: FC<SelectProps> = ({
  options,
  value,
  placeholder = "선택해주세요",
  title = "선택",
  id = `select-${Math.random().toString(36).substr(2, 9)}`,
  disabled = false,
  scrollToValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>(value || "");
  const [isMobile, setIsMobile] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

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
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        openSelectId = null;
        if (isMobile) {
          document.body.style.overflow = "";
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile]);

  // 드롭다운이 열릴 때 scrollToValue로 스크롤 (비활성화 상태에서는 스크롤하지 않음)
  useEffect(() => {
    if (isOpen && !disabled && scrollToValue && listRef.current) {
      const targetOption = listRef.current.querySelector(
        `[data-value="${scrollToValue}"]`
      );
      if (targetOption) {
        targetOption.scrollIntoView({ block: "center" });
      }
    }
  }, [isOpen, scrollToValue, disabled]);

  const toggleSelect = () => {
    if (disabled) return;
    if (isOpen) {
      setIsOpen(false);
      openSelectId = null;
      if (isMobile) {
        document.body.style.overflow = "";
      }
    } else {
      if (openSelectId && openSelectId !== id) {
        const otherSelect = document.getElementById(openSelectId);
        if (otherSelect) {
          const event = new MouseEvent("mousedown", {
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
        document.body.style.overflow = "hidden";
      }
    }
  };

  const selectedLabel = selectedValue
    ? options.find((opt) => opt.value === selectedValue)?.label || placeholder
    : placeholder;

  return (
    <div
      className={`component-select ${disabled ? "disabled" : ""}`}
      ref={selectRef}
      id={id}
    >
      <button
        type="button"
        className={`select-display ${isOpen ? "open" : ""} ${
          disabled ? "disabled" : ""
        }`}
        onClick={toggleSelect}
        disabled={disabled}
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
                document.body.style.overflow = "";
              }}
            />
          )}
          <div
            className={`select-list-area ${
              isMobile ? "mobile-bottom-sheet" : ""
            } ${isOpen ? "open" : ""}`}
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
                    document.body.style.overflow = "";
                  }
                }}
              />
            </div>
            <ul className="select-list fooer-type">
              {options.map((option) => (
                <li key={option.value}>
                  <a
                    href={option.value}
                    className="select-item"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (disabled) {
                        e.preventDefault();
                        return;
                      }
                      setIsOpen(false);
                      openSelectId = null;
                      if (isMobile) {
                        document.body.style.overflow = "";
                      }
                    }}
                  >
                    {option.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export const SelectLink: FC<SelectProps> = ({
  options,
  title = "Family Site",
  id = `select-${Math.random().toString(36).substr(2, 9)}`,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1023);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        openSelectId = null;
        if (isMobile) {
          document.body.style.overflow = "";
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile]);

  const handleSelect = (value: string) => {
    if (disabled) return;
    if (value) {
      window.open(value, "_blank");
    }
    setIsOpen(false);
    openSelectId = null;
    if (isMobile) {
      document.body.style.overflow = "";
    }
  };

  const toggleSelect = () => {
    if (disabled) return;
    if (isOpen) {
      setIsOpen(false);
      openSelectId = null;
      if (isMobile) {
        document.body.style.overflow = "";
      }
    } else {
      if (openSelectId && openSelectId !== id) {
        const otherSelect = document.getElementById(openSelectId);
        if (otherSelect) {
          const event = new MouseEvent("mousedown", {
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
        document.body.style.overflow = "hidden";
      }
    }
  };

  return (
    <div
      className={`component-select ${disabled ? "disabled" : ""}`}
      ref={selectRef}
      id={id}
    >
      <button
        type="button"
        className={`select-display ${isOpen ? "open" : ""} ${
          disabled ? "disabled" : ""
        }`}
        onClick={toggleSelect}
        disabled={disabled}
      >
        <span>{title}</span>
      </button>
      {isOpen && !disabled && (
        <>
          {isMobile && (
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => {
                setIsOpen(false);
                openSelectId = null;
                document.body.style.overflow = "";
              }}
            />
          )}
          <div
            className={`select-list-area ${
              isMobile ? "mobile-bottom-sheet" : ""
            } ${isOpen ? "open" : ""}`}
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
                    document.body.style.overflow = "";
                  }
                }}
              />
            </div>
            <ul className="select-list">
              {options.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    className="select-item"
                    data-value={option.value}
                    onClick={() => handleSelect(option.value)}
                    disabled={disabled}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Select;
