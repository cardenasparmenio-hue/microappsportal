"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLang } from '@/components/i18n/LanguageProvider';
import { GlassCard } from '@/components/ui/GlassCard';
import { Input } from '@/components/ui/Input';
import { GlowButton } from '@/components/ui/GlowButton';
import { useToast } from '@/components/ui/Toast';
import { Mail, Lock, CircuitBoard } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLang();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    if (searchParams.get('verified')) {
      toast(t('login.success'), 'success');
    }
    if (searchParams.get('error')) {
      toast("Error: " + searchParams.get('error'), 'error');
    }
  }, [searchParams, t, toast]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast(error.message, 'error');
      setIsLoading(false);
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <GlassCard>
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary via-accent-pink to-accent-warm shadow-[0_0_20px_rgba(124,58,237,0.5)] flex items-center justify-center mb-4">
          <CircuitBoard className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gradient text-center">{t('app.name')}</h1>
        <p className="text-sm text-base-content/70 mt-1">{t('app.tagline')}</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <Input 
          type="email" 
          placeholder={t('email')} 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={Mail} 
          required 
        />
        <Input 
          type="password" 
          placeholder={t('password')} 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={Lock} 
          required 
        />
        
        <div className="flex justify-end pt-2 pb-4">
          <Link href="/forgot-password" className="text-xs text-accent-blue hover:text-white transition-colors">
            {t('login.forgot')}
          </Link>
        </div>

        <GlowButton type="submit" isLoading={isLoading}>
          {t('login.button')}
        </GlowButton>
      </form>

      <div className="mt-8 text-center border-t border-white/10 pt-6">
        <Link href="/signup" className="text-sm text-base-content/80 hover:text-white transition-colors">
          {t('login.signup')}
        </Link>
      </div>
    </GlassCard>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
