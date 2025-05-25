"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Search, User, Shield, AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react"
import { useAuth } from "../../components/auth-provider"

// Mock de usuarios administrativos
const adminUsers = [
  {
    id: "1",
    email: "admin@aeroadmin.com",
    name: "Administrador Principal",
    role: "admin",
    status: "active",
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    email: "operador@aeroadmin.com",
    name: "Operador de Vuelos",
    role: "operator",
    status: "active",
    createdAt: "2024-01-05",
  },
  {
    id: "3",
    email: "agente@aeroadmin.com",
    name: "Agente de Reservas",
    role: "agent",
    status: "active",
    createdAt: "2024-01-10",
  },
]

export default function AdminUsersPage() {
  const { user } = useAuth()
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [users, setUsers] = useState(adminUsers)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  })

  // Verificar que el usuario sea administrador
  useEffect(() => {
    if (user?.role !== "admin") {
      // En una app real, esto redirigiría o mostraría un error 403
      console.log("Acceso denegado: Solo administradores pueden acceder")
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    // Validaciones
    if (formData.password.length < 6) {
      setMessage({ type: "error", text: "La contraseña debe tener al menos 6 caracteres" })
      return
    }

    // Verificar si el email ya existe
    const existingUser = users.find((u) => u.email === formData.email)
    if (existingUser) {
      setMessage({ type: "error", text: "El email ya está registrado" })
      return
    }

    // Simular creación de usuario
    const newUser = {
      id: Date.now().toString(),
      email: formData.email,
      name: formData.name,
      role: formData.role,
      status: "active" as const,
      createdAt: new Date().toISOString().split("T")[0],
    }

    setUsers([...users, newUser])
    setMessage({ type: "success", text: "Usuario administrativo creado exitosamente" })

    // Limpiar formulario
    setFormData({ name: "", email: "", password: "", role: "" })
    setShowCreateForm(false)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "operator":
        return "bg-blue-100 text-blue-800"
      case "agent":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleName = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrador"
      case "operator":
        return "Operador"
      case "agent":
        return "Agente"
      default:
        return "Usuario"
    }
  }

  const handleViewDetails = (userId: string) => {
    alert(`Ver detalles del usuario ${userId}`)
  }

  const handleEditUser = (userId: string) => {
    alert(`Editar usuario ${userId}`)
  }

  const handleChangePassword = (userId: string) => {
    alert(`Cambiar contraseña del usuario ${userId}`)
  }

  const handleDeactivateUser = (userId: string) => {
    if (confirm(`¿Estás seguro de que quieres desactivar este usuario?`)) {
      alert(`Usuario ${userId} desactivado`)
    }
  }

  if (user?.role !== "admin") {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Acceso denegado. Solo los administradores pueden gestionar usuarios.</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Usuarios Administrativos</h1>
          <p className="text-gray-600 mt-2">Administra usuarios del sistema con permisos especiales</p>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Usuario
        </Button>
      </div>

      {message && (
        <Alert variant={message.type === "error" ? "destructive" : "default"} className="mb-6">
          {message.type === "error" ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      {/* Create User Form */}
      {showCreateForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Crear Nuevo Usuario Administrativo
            </CardTitle>
            <CardDescription>Crea un nuevo usuario con permisos administrativos en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input
                    id="name"
                    placeholder="Juan Pérez"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="usuario@aeroadmin.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Rol</Label>
                  <Select onValueChange={(value) => handleChange("role", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="operator">Operador de Vuelos</SelectItem>
                      <SelectItem value="agent">Agente de Reservas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit">Crear Usuario</Button>
                <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Search Bar */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Buscar por nombre o email..." className="pl-10" />
            </div>
            <Button variant="outline">Filtros</Button>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <div className="grid gap-4">
        {users.map((adminUser) => (
          <Card key={adminUser.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">{adminUser.name}</h3>
                    <p className="text-sm text-gray-500">{adminUser.email}</p>
                    <p className="text-sm text-gray-500">Creado: {adminUser.createdAt}</p>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <Badge className={getRoleColor(adminUser.role)}>{getRoleName(adminUser.role)}</Badge>
                  <p className="text-sm text-green-600">Activo</p>
                </div>
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t">
                <Button variant="outline" size="sm" onClick={() => handleViewDetails(adminUser.id)}>
                  Ver Detalles
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleEditUser(adminUser.id)}>
                  Editar
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleChangePassword(adminUser.id)}>
                  Cambiar Contraseña
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDeactivateUser(adminUser.id)}>
                  Desactivar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
