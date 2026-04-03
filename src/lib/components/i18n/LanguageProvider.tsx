"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en';

export const dictionaries = {
  es: {
    // Auth generic
    "app.name": "Micro-Apps Portal",
    "app.tagline": "Tu portal de micro aplicaciones",
    "email": "Correo electrónico",
    "password": "Contraseña",
    "first_name": "Nombre",
    "last_name": "Apellido",
    
    // Login
    "login.title": "Iniciar Sesión",
    "login.button": "Iniciar Sesión",
    "login.forgot": "¿Olvidaste tu contraseña?",
    "login.signup": "¿No tienes cuenta? Regístrate",
    "login.success": "¡Email Confirmado! Tu cuenta ha sido verificada.",
    
    // Signup
    "signup.title": "Crear Cuenta",
    "signup.button": "Crear Cuenta",
    "signup.login": "¿Ya tienes cuenta? Inicia sesión",
    "signup.success": "¡Revisa tu correo para verificar tu cuenta!",
    
    // Forgot Password
    "forgot.title": "Recuperar Contraseña",
    "forgot.button": "Enviar enlace de recuperación",
    "forgot.back": "← Volver a iniciar sesión",
    "forgot.success": "Enlace de recuperación enviado. Revisa tu correo.",
    
    // Dashboard
    "dash.welcome": "¡Bienvenido al Portal de Micro-Apps!",
    "dash.sub": "Estamos preparando algo increíble para ti.",
    "dash.badge": "Próximamente",
    "dash.hello": "Hola",
    "dash.footer": "Te notificaremos cuando todo esté listo.",
    "dash.logout": "Cerrar Sesión",
  },
  en: {
    // Auth generic
    "app.name": "Micro-Apps Portal",
    "app.tagline": "Your micro applications portal",
    "email": "Email address",
    "password": "Password",
    "first_name": "First Name",
    "last_name": "Last Name",
    
    // Login
    "login.title": "Log In",
    "login.button": "Log In",
    "login.forgot": "Forgot your password?",
    "login.signup": "Don't have an account? Sign up",
    "login.success": "Email Confirmed! Your account has been verified.",
    
    // Signup
    "signup.title": "Create Account",
    "signup.button": "Create Account",
    "signup.login": "Already have an account? Log in",
    "signup.success": "Check your email to verify your account!",
    
    // Forgot password
    "forgot.title": "Recover Password",
    "forgot.button": "Send recovery link",
    "forgot.back": "← Back to log in",
    "forgot.success": "Recovery link sent. Check your email.",
    
    // Dashboard
    "dash.welcome": "Welcome to the Micro-Apps Portal!",
    "dash.sub": "We are preparing something amazing for you.",
    "dash.badge": "Coming Soon",
    "dash.hello": "Hello",
    "dash.footer": "We will notify you when everything is ready.",
    "dash.logout": "Log Out",
  }
};

export type DictionaryKey = keyof typeof dictionaries['es'];

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: DictionaryKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLang() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLang must be used within LanguageProvider");
  return context;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('es');

  const t = (key: DictionaryKey) => {
    return dictionaries[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  return (
    <button
      onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
      className="fixed top-4 right-4 z-50 flex items-center justify-center w-10 h-10 rounded-full glass-panel text-xs font-bold uppercase transition-colors hover:bg-white/10 hover:shadow-lg focus:outline-none"
    >
      {lang}
    </button>
  );
}
