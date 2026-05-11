"use client"

import { useState } from "react"

import  GlassCard  from "@/lib/components/ui/GlassCard"
import  GlowButton  from "@/lib/components/ui/GlowButton"
import { Input } from "@/lib/components/ui/Input"
import { useTranslation } from "@/hooks/useTranslation"
import { useToast } from "@/lib/components/ui/ToastProvider"
import { Mail, Lock, User } from "lucide-react"
import Link from "next/link"

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  
  const { language } = useTranslation()
  const toast = useToast()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    
    await new Promise(resolve => setTimeout(resolve, 800))
    
    if (email && password.length >= 6) {
      localStorage.setItem("mock_user", JSON.stringify({ email, first_name: firstName, last_name: lastName }))
      toast({
        title: language === "es" ? "Registro exitoso" : "Registration successful",
        message: language === "es" ? "Revisa tu correo para verificar tu cuenta (Simulado)" : "Check your email to verify your account (Mocked)",
        type: "success",
      })
    } else {
      toast({
        title: language === "es" ? "Error en el registro" : "Registration error",
        message: language === "es" ? "La contraseña debe tener al menos 6 caracteres" : "Password must be at least 6 characters",
        type: "error",
      })
    }
    
    setLoading(false)
  }

  return (
    <GlassCard>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          {language === "es" ? "Crear Cuenta" : "Create Account"}
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          {language === "es"
            ? "Únete al portal de micro-apps"
            : "Join the micro-apps portal"}
        </p>
      </div>

      <form onSubmit={handleSignUp} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="text"
            placeholder={language === "es" ? "Nombre" : "First Name"}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            icon={<User className="h-5 w-5" />}
          />
          <Input
            type="text"
            placeholder={language === "es" ? "Apellido" : "Last Name"}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            icon={<User className="h-5 w-5" />}
          />
        </div>
        <div>
          <Input
            type="email"
            placeholder={language === "es" ? "Correo electrónico" : "Email address"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            icon={<Mail className="h-5 w-5" />}
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder={language === "es" ? "Contraseña" : "Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            icon={<Lock className="h-5 w-5" />}
          />
        </div>

        <GlowButton type="submit" className="w-full mt-2" isLoading={loading}>
          {language === "es" ? "Registrarse" : "Sign up"}
        </GlowButton>
      </form>

      <div className="mt-6 text-center text-sm text-zinc-400">
        {language === "es" ? "¿Ya tienes cuenta? " : "Already have an account? "}
        <Link href="/login" className="font-semibold text-white hover:underline">
          {language === "es" ? "Inicia sesión" : "Sign in"}
        </Link>
      </div>
    </GlassCard>
  )
}
