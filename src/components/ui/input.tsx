"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import "@/assets/scss/style.scss";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  clearable?: boolean;
  onClear?: () => void;
  search?: boolean;
  onSearch?: (value: string) => void;
  filterType?: "english" | "number" | "passport" | "email" | null; // 필터링 타입
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, clearable = false, onClear, search = false, onSearch, filterType = null, value, onChange, ...props }, ref) => {
    const isClearable = search || clearable;

    // 입력값 필터링 함수
    const filterValue = (input: string): string => {
      if (filterType === "english") {
        return input.replace(/[^A-Za-z]/g, ""); // 영문만 허용
      }
      if (filterType === "number") {
        return input.replace(/\D/g, ""); // 숫자만 허용
      }
      if (filterType === "passport") {
        return input.replace(/[^A-Za-z0-9]/g, ""); // 영문+숫자만 허용
      }
      if (filterType === "email") {
        return input.replace(/[^a-zA-Z0-9._-]/g, '');
      }
      return input; // 필터링 없음
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const filteredValue = filterValue(e.target.value);

      // 합성 이벤트로 onChange 호출
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: filteredValue,
        },
      } as React.ChangeEvent<HTMLInputElement>;

      if (onChange) {
        onChange(syntheticEvent);
      }
    };

    const handleClear = () => {
      if (onClear) {
        onClear();
      }

      // 입력값 초기화
      const input = document.getElementById(props.id || "") as HTMLInputElement;
      if (input) {
        const event = new Event("input", { bubbles: true });
        input.value = "";
        input.dispatchEvent(event);
      }

      // react-hook-form의 onChange 호출
      if (onChange) {
        const syntheticEvent = {
          target: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
    };

    const handleSearch = () => {
      if (onSearch && value !== undefined) {
        onSearch(value.toString());
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && search) {
        e.preventDefault();
        handleSearch();
      }
      if (props.onKeyDown) {
        props.onKeyDown(e);
      }
    };

    return (
      <div className="input-wrap">
        <input
          type={type}
          data-slot="input"
          className={cn(
            "appearance-none",
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className
          )}
          ref={ref}
          value={value} // react-hook-form의 value 사용
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          {...props}
        />
        <div className="clear-btn">
          {isClearable && value && (
            <button
              type="button"
              onClick={handleClear}
              className="clear-btn p-1 rounded-full hover:bg-muted text-muted-foreground transition-colors"
              aria-label="Clear input"
            ></button>
          )}
        </div>
        {search && (
          <div className="search-btn-wrap">
            <button
              type="button"
              onClick={handleSearch}
              className="search-btn"
              aria-label="Search"
            ></button>
          </div>
        )}
      </div>
    );
  }
);

export { Input };