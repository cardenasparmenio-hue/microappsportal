"use client";

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLang } from '@/components/i18n/LanguageProvider';
import { GlassCard } from '@/components/ui/GlassCard';
import { Input } from '@/components/ui/Input';
import { GlowButton } from '@/components/ui/GlowButton';
import { useToast } from '@/components/ui/Toast';
import { Mail, CircuitBoard } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

function ForgotPasswordForm() {
  const router = useRouter();
  const { t } = useLang();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    });

    if (error) {
      toast(error.message, 'error');
      setIsLoading(false);
    } else {
      toast(t('forgot.success'), 'success');
      router.push('/login');
    }
  };

  return (
    <GlassCard>
      <div className="flex flex-col items-center mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary via-accent-pink to-accent-warm shadow-[0_0_15px_rgba(124,58,237,0.4)] flex items-center justify-center mb-3">
          <CircuitBoard className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-gradient text-center">{t('forgot.title')}</h1>
      </div>

      <form onSubmit={handleReset} className="space-y-4">
        <Input 
          type="email" 
          placeholder={t('email')} 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={Mail} 
          required 
        />
        
        <div className="pt-2">
          <GlowButton type="submit" isLoading={isLoading}>
            {t('forgot.button')}
          </GlowButton>
        </div>
      </form>

      <div className="mt-6 text-center border-t border-white/10 pt-6">
        <Link href="/login" className="text-sm text-base-content/80 hover:text-white transition-colors">
          {t('forgot.back')}
        </Link>
      </div>
    </GlassCard>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense>
      <ForgotPasswordForm />
    </Suspense>
  )
}
