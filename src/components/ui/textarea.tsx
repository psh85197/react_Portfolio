"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface TextareaProps extends Omit<React.ComponentProps<"textarea">, 'value'> {
  maxlength?: number
  showCount?: boolean
  value?: string | number | readonly string[]
}

function Textarea({ 
  className, 
  maxlength, 
  showCount = true,
  value,
  defaultValue,
  onChange,
  ...props 
}: TextareaProps) {
  // Create internal state to handle the value when a static value is provided
  const [internalValue, setInternalValue] = React.useState<string>(
    value !== undefined ? String(value) : 
    defaultValue !== undefined ? String(defaultValue) : ""
  )
  
  // For character count display only
  const [charCount, setCharCount] = React.useState<number>(internalValue.length)

  // Update internal state when external value changes
  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(String(value))
      setCharCount(String(value).length)
    }
  }, [value])

  // Handle textarea changes
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    
    // If maxlength is set, enforce it
    if (maxlength !== undefined && newValue.length > maxlength) {
      e.target.value = newValue.slice(0, maxlength)
    }
    
    // Update internal state and character count
    setInternalValue(e.target.value)
    setCharCount(e.target.value.length)
    
    // Call the original onChange handler if provided
    if (onChange) {
      onChange(e)
    }
  }

  return (
    <div className="textarea-wrap">
      <textarea
        data-slot="textarea"
        className={cn(
          "border-input placeholder:text-muted-foreground dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          maxlength !== undefined && "pb-6",
          className
        )}
        value={internalValue}
        defaultValue={defaultValue}
        onChange={handleChange}
        maxLength={maxlength}
        {...props}
      />
      {maxlength !== undefined && showCount && (
        <div className="textarea-count">
          <span className="textarea-count-txt">{charCount}</span> / <span>{maxlength}</span>
        </div>
      )}
    </div>
  )
}

export { Textarea }

