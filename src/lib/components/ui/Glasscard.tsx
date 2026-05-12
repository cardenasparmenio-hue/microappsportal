import React from "react"

export default function GlassCard({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        backdropFilter: "blur(10px)",
        background: "rgba(255,255,255,0.1)",
        borderRadius: "16px",
        padding: "20px",
        border: "1px solid rgba(255,255,255,0.2)",
      }}
    >
      {children}
    </div>
  )
}
