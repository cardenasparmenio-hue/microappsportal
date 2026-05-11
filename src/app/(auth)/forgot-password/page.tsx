"use client"

import { useState } from "react"

import  GlassCard  from "@/lib/components/ui/GlassCard"
import  GlowButton  from "@/lib/components/ui/GlowButton"
import { Input } from "@/lib/components/ui/Input"
import { useTranslation } from "@/hooks/useTranslation"
import { useToast } from "@/lib/components/ui/ToastProvider"
import { Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const { language } = useTranslation()
  const toast = useToast()

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    
    await new Promise(resolve => setTimeout(resolve, 800))

    if (email) {
      toast({
        title: language === "es" ? "Correo enviado" : "Email sent",
        message: language === "es" ? "Revisa tu bandeja de entrada (Simulado)" : "Check your inbox (Mocked)",
        type: "success",
      })
    } else {
      toast({
        title: language === "es" ? "Error" : "Error",
        message: language === "es" ? "Ingresa un correo válido" : "Enter a valid email",
        type: "error",
      })
    }

    setLoading(false)
  }

  return (
    <GlassCard>
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          {language === "es" ? "Recuperar Contraseña" : "Reset Password"}
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          {language === "es"
            ? "Ingresa tu correo para recibir un enlace de recuperación"
            : "Enter your email to receive a reset link"}
        </p>
      </div>

      <form onSubmit={handleReset} className="space-y-4">
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

        <GlowButton type="submit" className="w-full" isLoading={loading}>
          {language === "es" ? "Enviar enlace" : "Send link"}
        </GlowButton>
      </form>

      <div className="mt-6 text-center text-sm">
        <Link href="/login" className="inline-flex items-center text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {language === "es" ? "Volver al login" : "Back to login"}
        </Link>
      </div>
    </GlassCard>
  )
}
