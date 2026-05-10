"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

export type ToastType = "success" | "error" | "info"

export interface ToastParams {
  title: string
  message?: string
  type?: ToastType
}

interface Toast extends ToastParams {
  id: string
}

interface ToastContextType {
  toast: (params: ToastParams) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback((params: ToastParams) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { ...params, id, type: params.type || "info" }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 5000)
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "flex w-80 items-start gap-3 rounded-xl border border-white/10 bg-zinc-900/90 p-4 text-white shadow-2xl backdrop-blur-md transition-all animate-in slide-in-from-right-full",
              t.type === "success" && "border-green-500/20 bg-green-950/80",
              t.type === "error" && "border-red-500/20 bg-red-950/80"
            )}
          >
            <div className="flex-1">
              <h4 className="text-sm font-semibold">{t.title}</h4>
              {t.message && <p className="mt-1 text-xs text-zinc-300">{t.message}</p>}
            </div>
            <button
              onClick={() => setToasts((prev) => prev.filter((toast) => toast.id !== t.id))}
              className="text-zinc-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within ToastProvider")
  }
  return context.toast
}
