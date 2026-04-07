"use client";

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLang } from '@/components/i18n/LanguageProvider';
import { GlassCard } from '@/lib/components/ui/GlassCard';
import { Input } from '@/lib/components/ui/Input';
import { GlowButton } from '@/lib/components/ui/GlowButton';
import { useToast } from '@/components/ui/Toast';
import { Mail, Lock, User, CircuitBoard } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

function SignupForm() {
  const router = useRouter();
  const { t } = useLang();
  const { toast } = useToast();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
        emailRedirectTo: `${window.location.origin}/login?verified=true`,
      }
    });

    if (error) {
      toast(error.message, 'error');
      setIsLoading(false);
    } else {
      toast(t('signup.success'), 'success');
      router.push('/login');
    }
  };

  return (
    <GlassCard>
      <div className="flex flex-col items-center mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary via-accent-pink to-accent-warm shadow-[0_0_15px_rgba(124,58,237,0.4)] flex items-center justify-center mb-3">
          <CircuitBoard className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-gradient text-center">{t('signup.title')}</h1>
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input 
            type="text" 
            placeholder={t('first_name')} 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            icon={User} 
            required 
          />
          <Input 
            type="text" 
            placeholder={t('last_name')} 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required 
          />
        </div>
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
          minLength={6}
        />
        
        <div className="pt-2">
          <GlowButton type="submit" isLoading={isLoading}>
            {t('signup.button')}
          </GlowButton>
        </div>
      </form>

      <div className="mt-6 text-center border-t border-white/10 pt-6">
        <Link href="/login" className="text-sm text-base-content/80 hover:text-white transition-colors">
          {t('signup.login')}
        </Link>
      </div>
    </GlassCard>
  );
}

export default function SignupPage() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  )
}
