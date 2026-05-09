"use client"

import { useState } from "react"

import { GlassCard } from "@/lib/components/ui/GlassCard"
import { GlowButton } from "@/lib/components/ui/GlowButton"
import { Input } from "@/lib/components/ui/Input"
import { useTranslation } from "@/hooks/useTranslation"
import { useToast } from "@/lib/components/ui/ToastProvider"
import { Mail, Lock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { language } = useTranslation()
  const toast = useToast()
  const router = useRouter()
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)



    await new Promise(resolve => setTimeout(resolve, 800))

    if (email && password.length >= 6) {
      localStorage.setItem("mock_user", JSON.stringify({ email }))
      router.push("/dashboard")
      router.refresh()
    } else {
      toast({
        title: language === "es" ? "Error al iniciar sesión" : "Login error",
        message: language === "es" ? "Credenciales inválidas (la contraseña debe tener al menos 6 caracteres)" : "Invalid credentials",
        type: "error",
      })
    }

    setLoading(false)
  }

  return (
    <GlassCard>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          {language === "es" ? "Bienvenido" : "Welcome Back"}
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          {language === "es"
            ? "Inicia sesión para acceder al portal"
            : "Sign in to access the portal"}
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
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

        <div className="flex items-center justify-end">
          <Link
            href="/forgot-password"
            className="text-xs font-medium text-blue-400 hover:text-blue-300"
          >
            {language === "es" ? "¿Olvidaste tu contraseña?" : "Forgot password?"}
          </Link>
        </div>

        <GlowButton type="submit" className="w-full" isLoading={loading}>
          {language === "es" ? "Iniciar sesión" : "Sign in"}
        </GlowButton>
      </form>

      <div className="mt-6 text-center text-sm text-zinc-400">
        {language === "es" ? "¿No tienes cuenta? " : "Don't have an account? "}
        <Link href="/signup" className="font-semibold text-white hover:underline">
          {language === "es" ? "Regístrate" : "Sign up"}
        </Link>
      </div>
    </GlassCard>
  )
}
