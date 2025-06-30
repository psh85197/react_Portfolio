"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

interface DatePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  className?: string
  placeholder?: string
  clearable?: boolean
  disabled?: boolean
  readonly?: boolean
}

export function DatePicker({
  date,
  setDate,
  className,
  placeholder = "Pick a date",
  clearable = false,
  disabled = false,
  readonly = false,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setDate(undefined)
  }

  // Determine if the component should be disabled
  const isDisabled = disabled || readonly;
  
  return (
    <div className={cn("relative", className)}>
      <Popover 
        open={isDisabled ? false : open} 
        onOpenChange={(newOpen) => !isDisabled && setOpen(newOpen)}>
        <PopoverTrigger asChild>
          <div className="relative w-full">
            <Input
              value={date ? `${format(date, "yyyy.MM.dd")}${readonly ? " (수정불가)" : ""}` : ""}
              placeholder={placeholder}
              className={cn("w-full", isDisabled && "opacity-70 cursor-not-allowed")}
              readOnly
              disabled={isDisabled}
            />
            <Button
              variant="ghost"
              size="icon"
              className={cn("absolute right-0 top-0 h-full aspect-square", isDisabled && "opacity-70 cursor-not-allowed")}
              onClick={() => !isDisabled && setOpen(true)}
              disabled={isDisabled}
            >
              <CalendarIcon className="h-4 w-4" />
            </Button>
            {clearable && date && !readonly && (
              <Button
                variant="ghost"
                size="icon"
                className={cn("absolute right-9 top-0 h-full aspect-square", disabled && "opacity-70 cursor-not-allowed")}
                onClick={handleClear}
                disabled={disabled}
              >
                <span className="sr-only">Clear date</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </Button>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            className="test"
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date)
              setOpen(false)
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
