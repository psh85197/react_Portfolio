import {cn} from '@/lib/utils.ts'
import React, {forwardRef} from 'react'

interface SearchBoxWrapProps extends React.HTMLAttributes<React.ElementRef<'div'>> {
  children?: React.ReactNode
}

export const SearchBoxWrap = forwardRef<React.ElementRef<'div'>, SearchBoxWrapProps>(
  ({className, children, ...props}, ref) => {
    return (
      <div ref={ref}
           className={cn('m-4 p-4 border-2 border-zinc-200 bg-gray-50 rounded-lg component-searchbox', className)} {...props}>
        {children}
      </div>
    )
  }
)
SearchBoxWrap.displayName = 'SearchBoxWrap'


interface SearchBoxBodyProps {
  children: React.ReactNode
}

export const SearchBoxBody = forwardRef<React.ElementRef<'div'>, SearchBoxBodyProps>(
  ({children}, ref) => {
    return (
      <div ref={ref} className="grid grid-cols-3 gap-4 gap-x-4">
        {children}
      </div>
    )
  }
)

SearchBoxBody.displayName = 'SearchBoxBody'


interface SearchBoxFooterProps {
  children: React.ReactNode
}

export const SearchBoxFooter = forwardRef<React.ElementRef<'div'>, SearchBoxFooterProps>(
  ({children}, ref) => {
    return (
      <div ref={ref} className="mt-4 flex items-center gap-x-4 justify-end component-btns">
        <div className="flex items-end gap-x-2">
          {children}
        </div>
      </div>
    )
  }
)

SearchBoxFooter.displayName = 'SearchBoxFooter'
