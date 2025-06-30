import * as TabsPrimitive from "@radix-ui/react-tabs"
import * as React from "react"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "tab-head",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (window.innerWidth <= 1023) {
      const tabList = e.currentTarget.closest('.tab-head');
      if (tabList) {
        const tabListRect = tabList.getBoundingClientRect();
        const tabRect = e.currentTarget.getBoundingClientRect();
        const scrollLeft = tabList.scrollLeft + (tabRect.left - tabListRect.left) - (tabListRect.width / 2) + (tabRect.width / 2);
        
        tabList.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
    props.onClick?.(e);
  };

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "tab-head-item",
        className
      )}
      {...props}
      onClick={handleClick}
    />
  );
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsContent, TabsList, TabsTrigger }

