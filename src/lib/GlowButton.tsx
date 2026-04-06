import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'ghost';
}

export const GlowButton = React.forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, variant = 'primary', isLoading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={isLoading || props.disabled}
        className={cn(
          "relative flex items-center justify-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden",
          variant === 'primary' && "bg-gradient-to-r from-primary to-accent-pink text-primary-content hover:shadow-[0_0_20px_rgba(236,72,153,0.4)]",
          variant === 'ghost' && "bg-transparent text-base-content hover:bg-white/5 border border-white/10 hover:border-white/20",
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {children}
      </button>
    );
  }
);
GlowButton.displayName = 'GlowButton';
