import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { ToastProvider } from "@/lib/components/ui/ToastProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Micro-Apps Portal",
  description: "Portal for Micro-Apps",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white antialiased min-h-screen`}>

          <ToastProvider>
            {children}
          </ToastProvider>
        
      </body>
    </html>
  )
}
