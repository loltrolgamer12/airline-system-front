"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plane, Eye, EyeOff, AlertCircle, CheckCircle, User, UserPlus } from "lucide-react"

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<boolean>
  onRegister: (userData: RegisterData) => Promise<{ success: boolean; message: string }>
}

interface RegisterData {
  email: string
  password: string
  name: string
  phone?: string
  documentType?: string
  documentNumber?: string
}

export function LoginForm({ onLogin, onRegister }: LoginFormProps) {
  // Estados para Login
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Estados para Registro
  const [registerData, setRegisterData] = useState<RegisterData>({
    email: "",
    password: "",
    name: "",
    phone: "",
    documentType: "",
    documentNumber: "",
  })
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showRegisterPassword, setShowRegisterPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [registerMessage, setRegisterMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isRegisterLoading, setIsRegisterLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const success = await onLogin(email, password)

    if (!success) {
      setError("Credenciales incorrectas. Por favor, verifica tu email y contraseña.")
    }

    setIsLoading(false)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setRegisterMessage(null)
    setIsRegisterLoading(true)

    // Validaciones
    if (registerData.password !== confirmPassword) {
      setRegisterMessage({ type: "error", text: "Las contraseñas no coinciden" })
      setIsRegisterLoading(false)
      return
    }

    if (registerData.password.length < 6) {
      setRegisterMessage({ type: "error", text: "La contraseña debe tener al menos 6 caracteres" })
      setIsRegisterLoading(false)
      return
    }

    const result = await onRegister(registerData)

    if (result.success) {
      setRegisterMessage({ type: "success", text: result.message })
      // Limpiar formulario
      setRegisterData({
        email: "",
        password: "",
        name: "",
        phone: "",
        documentType: "",
        documentNumber: "",
      })
      setConfirmPassword("")
    } else {
      setRegisterMessage({ type: "error", text: result.message })
    }

    setIsRegisterLoading(false)
  }

  const handleRegisterChange = (field: keyof RegisterData, value: string) => {
    setRegisterData(prev => ({ ...prev, [field]: value }))
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
          <CardContent className="p-0">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 rounded-none rounded-t-lg">
                <TabsTrigger value="login" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Iniciar Sesión
                </TabsTrigger>
                <TabsTrigger value="register" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Registrarse
                </TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login" className="p-6 space-y-4">
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-bold">Bienvenido</h2>
                  <p className="text-gray-600">Ingresa tus credenciales para acceder</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
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
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Credenciales de Prueba:</h3>
                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span className="font-medium">Administrador:</span>
                      <span>admin@aeroadmin.com / admin123</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Operador:</span>
                      <span>operador@aeroadmin.com / operador123</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Agente:</span>
                      <span>agente@aeroadmin.com / agente123</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register" className="p-6 space-y-4">
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-bold">Crear Cuenta</h2>
                  <p className="text-gray-600">Regístrate como pasajero</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                  {registerMessage && (
                    <Alert variant={registerMessage.type === "error" ? "destructive" : "default"}>
                      {registerMessage.type === "error" ? 
                        <AlertCircle className="h-4 w-4" /> : 
                        <CheckCircle className="h-4 w-4" />
                      }
                      <AlertDescription>{registerMessage.text}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="register-name">Nombre Completo</Label>
                    <Input
                      id="register-name"
                      placeholder="Juan Pérez"
                      value={registerData.name}
                      onChange={(e) => handleRegisterChange("name", e.target.value)}
                      required
                      disabled={isRegisterLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="tu@email.com"
                      value={registerData.email}
                      onChange={(e) => handleRegisterChange("email", e.target.value)}
                      required
                      disabled={isRegisterLoading}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="document-type">Tipo Documento</Label>
                      <Select 
                        onValueChange={(value) => handleRegisterChange("documentType", value)} 
                        disabled={isRegisterLoading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cedula">Cédula</SelectItem>
                          <SelectItem value="pasaporte">Pasaporte</SelectItem>
                          <SelectItem value="cedula_extranjeria">C.E.</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="document-number">Número</Label>
                      <Input
                        id="document-number"
                        placeholder="12345678"
                        value={registerData.documentNumber}
                        onChange={(e) => handleRegisterChange("documentNumber", e.target.value)}
                        disabled={isRegisterLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-phone">Teléfono (Opcional)</Label>
                    <Input
                      id="register-phone"
                      placeholder="+57 300 123 4567"
                      value={registerData.phone}
                      onChange={(e) => handleRegisterChange("phone", e.target.value)}
                      disabled={isRegisterLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Contraseña</Label>
                    <div className="relative">
                      <Input
                        id="register-password"
                        type={showRegisterPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={registerData.password}
                        onChange={(e) => handleRegisterChange("password", e.target.value)}
                        required
                        disabled={isRegisterLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                        disabled={isRegisterLoading}
                      >
                        {showRegisterPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        disabled={isRegisterLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={isRegisterLoading}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isRegisterLoading}>
                    {isRegisterLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                        Creando cuenta...
                      </>
                    ) : (
                      "Crear Cuenta"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>© 2024 AeroAdmin. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  )
}