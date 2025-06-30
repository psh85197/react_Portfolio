import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import React from 'react';

const spinnerVariants = cva(
  'flex flex-col items-center justify-center text-main h-40 w-40 font-semibold mx-auto bg-zinc-100 rounded-lg p-4', 
  {
    variants: {
      show: {
        true: 'flex',
        false: 'hidden',
      },
      position: {
        fixed: 'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
        absolute: 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
        relative: 'relative mx-auto',
        none: ''
      }
    },
    defaultVariants: {
      show: true,
      position: 'relative'
    },
  }
 );

const loaderVariants = cva('animate-spin text-main', {
  variants: {
    size: {
      small: 'size-6',
      medium: 'size-8',
      large: 'size-12',
      xlarge: 'size-16',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

interface SpinnerContentProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
  className?: string;
  children?: React.ReactNode;
}

export function Spinner({ size, show, position , children, className }: SpinnerContentProps) {
  return (
    <span className={spinnerVariants({ show, position  })}>
      <Loader2 className={cn(loaderVariants({ size }), className)} />
      {children}
    </span>
  );
}
