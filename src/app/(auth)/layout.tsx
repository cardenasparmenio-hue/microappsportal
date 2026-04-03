import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden bg-base-100">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary/20 blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[35vw] h-[35vw] rounded-full bg-accent-pink/15 blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute top-[40%] left-[60%] w-[25vw] h-[25vw] rounded-full bg-accent-blue/15 blur-[100px] pointer-events-none mix-blend-screen" />
      
      {/* Content wrapper */}
      <div className="relative z-10 w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
