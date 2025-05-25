"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Verificar si hay usuario en localStorage
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      // Si hay usuario, redirigir al dashboard protegido
      router.replace("/")
    } else {
      // Si no hay usuario, redirigir al login
      router.replace("/")
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  )
}
