"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plane, Eye, EyeOff, AlertCircle, Shield, User } from "lucide-react"

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<boolean>
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const success = await onLogin(email, password)

    if (!success) {
      setError("Credenciales incorrectas. Por favor, verifica tu email y contraseña.")
    }

    setIsLoading(false)
  }

  const quickLogin = (userEmail: string, userPassword: string) => {
    setEmail(userEmail)
    setPassword(userPassword)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <Plane className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">AeroAdmin</h1>
          <p className="text-gray-600 mt-2">Sistema de Gestión de Vuelos</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Iniciar Sesión</CardTitle>
            <CardDescription className="text-center">
              Accede como administrador o usuario para gestionar vuelos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Iniciando sesión...
                  </>
                ) : (
                  "Iniciar Sesión"
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 space-y-4">
              {/* Admin Access */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <h3 className="text-sm font-semibold text-blue-800">Acceso Administrativo</h3>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-700">Email:</span>
                    <span className="font-mono">admin@aeroadmin.com</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-700">Contraseña:</span>
                    <span className="font-mono">admin123</span>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full mt-2 text-blue-700 border-blue-300"
                    onClick={() => quickLogin("admin@aeroadmin.com", "admin123")}
                    disabled={isLoading}
                  >
                    Acceso Rápido Admin
                  </Button>
                </div>
              </div>

              {/* User Access */}
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-3">
                  <User className="h-5 w-5 text-green-600" />
                  <h3 className="text-sm font-semibold text-green-800">Acceso de Usuario</h3>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-green-700">Email:</span>
                    <span className="font-mono">usuario@aeroadmin.com</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-700">Contraseña:</span>
                    <span className="font-mono">usuario123</span>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full mt-2 text-green-700 border-green-300"
                    onClick={() => quickLogin("usuario@aeroadmin.com", "usuario123")}
                    disabled={isLoading}
                  >
                    Acceso Rápido Usuario
                  </Button>
                </div>
              </div>

              {/* Additional Users */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold text-gray-700 mb-2">Otros usuarios de prueba:</h4>
                <div className="space-y-1 text-xs text-gray-600">
                  <div>maria@email.com / maria123</div>
                  <div>carlos@email.com / carlos123</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>© 2024 AeroAdmin. Sistema simplificado de gestión de vuelos.</p>
        </div>
      </div>
    </div>
  )
}
