import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <div 
      className={cn("glass-panel p-8 w-full max-w-md animate-in fade-in zoom-in-95 duration-500", className)} 
      {...props}
    >
      {children}
    </div>
  );
}
