"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLang } from '@/components/i18n/LanguageProvider';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { createClient } from '@/lib/supabase/client';

export default function WelcomePage() {
  const router = useRouter();
  const { t } = useLang();
  const [firstName, setFirstName] = useState('');
  const supabase = createClient();

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setFirstName(user.user_metadata?.first_name || '');
      }
    }
    loadUser();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden bg-base-100 mix-blend-screen isolate">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-primary/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-[20%] right-[20%] w-[30vw] h-[30vw] rounded-full bg-accent-warm/10 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-accent-blue/10 blur-[120px] pointer-events-none -z-10" />
      
      {/* Content wrapper */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        <GlassCard className="max-w-xl text-center flex flex-col items-center">
          {/* Visual Centerpiece */}
          <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
            {/* Pulsing ring */}
            <div className="absolute inset-0 rounded-full border border-primary/40 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <div className="absolute inset-2 rounded-full border border-accent-pink/50 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_1s]" />
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-primary via-accent-pink to-accent-warm shadow-[0_0_30px_rgba(236,72,153,0.5)] animate-pulse" />
          </div>

          <div className="inline-flex items-center justify-center px-3 py-1 mb-4 rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-accent-blue/90 uppercase tracking-widest animate-in slide-in-from-bottom-2">
            {t('dash.badge')}
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gradient mb-4 animate-in slide-in-from-bottom-3">
            {t('dash.welcome')}
          </h1>

          <h2 className="text-xl font-medium text-white/90 mb-2 animate-in slide-in-from-bottom-4">
            {t('dash.hello')}{firstName ? `, ${firstName}` : ''} 👋
          </h2>

          <p className="text-base-content/70 mb-8 max-w-sm mx-auto animate-in slide-in-from-bottom-5">
            {t('dash.sub')}
          </p>

          <div className="pt-8 border-t border-white/10 w-full mb-6">
            <p className="text-xs text-base-content/50 uppercase tracking-wide">
              {t('dash.footer')}
            </p>
          </div>

          <GlowButton variant="ghost" onClick={handleLogout} className="max-w-[200px] mt-2">
            {t('dash.logout')}
          </GlowButton>
        </GlassCard>
      </div>
    </div>
  );
}
