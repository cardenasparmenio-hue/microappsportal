import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon: Icon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          className={cn(
            "flex h-12 w-full rounded-xl border border-white/10 bg-base-300/50 px-3 py-2 text-sm text-base-content placeholder:text-base-content/40 transition-all duration-300 glow-border focus:outline-none focus:ring-0",
            Icon && "pl-10",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";
