"use client"

import type React from "react"

import { useAuth } from "./auth-provider"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield } from "lucide-react"

interface RoleGuardProps {
  roles: string[]
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function RoleGuard({ roles, children, fallback }: RoleGuardProps) {
  const { user } = useAuth()

  if (!user || !roles.includes(user.role)) {
    if (fallback) {
      return <>{fallback}</>
    }

    return (
      <Alert className="border-red-200 bg-red-50">
        <Shield className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          No tienes el rol necesario para acceder a esta funcionalidad.
        </AlertDescription>
      </Alert>
    )
  }

  return <>{children}</>
}
