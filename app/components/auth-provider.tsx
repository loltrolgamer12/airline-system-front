"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { LoginForm } from "./login-form"
import { Navigation } from "./navigation"

interface User {
  id: string
  email: string
  name: string
  role: string
  permissions: string[]
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  hasPermission: (permission: string) => boolean
  isAdmin: () => boolean
  isUser: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Definición de permisos por rol
const rolePermissions = {
  admin: [
    // Gestión completa de vuelos
    "flights.view",
    "flights.create",
    "flights.edit",
    "flights.delete",
    // Gestión completa de pasajeros
    "passengers.view",
    "passengers.create",
    "passengers.edit",
    "passengers.delete",
    // Gestión completa de reservas
    "reservations.view",
    "reservations.create",
    "reservations.edit",
    "reservations.delete",
    // Gestión de aeronaves
    "aircraft.view",
    "aircraft.create",
    "aircraft.edit",
    "aircraft.delete",
    // Gestión de personal
    "crew.view",
    "crew.create",
    "crew.edit",
    "crew.delete",
    // Gestión de aeropuertos
    "airports.view",
    "airports.create",
    "airports.edit",
    "airports.delete",
    // Reportes y estadísticas
    "reports.view",
    "reports.create",
    // Dashboard administrativo
    "dashboard.admin",
  ],
  user: [
    // Solo consulta de vuelos disponibles
    "flights.view",
    // Solo consulta de aeropuertos para reservas
    "airports.view",
    // Gestión de sus propias reservas
    "reservations.view_own",
    "reservations.create_own",
    "reservations.edit_own",
    // Gestión de su propio perfil de pasajero
    "passengers.view_own",
    "passengers.edit_own",
    // Dashboard de usuario
    "dashboard.user",
  ],
}

// Usuarios de prueba simplificados
const mockUsers = [
  {
    id: "1",
    email: "admin@aeroadmin.com",
    password: "admin123",
    name: "Administrador del Sistema",
    role: "admin",
    permissions: rolePermissions.admin,
  },
  {
    id: "2",
    email: "usuario@aeroadmin.com",
    password: "usuario123",
    name: "Juan Pérez",
    role: "user",
    permissions: rolePermissions.user,
  },
  {
    id: "3",
    email: "maria@email.com",
    password: "maria123",
    name: "María García",
    role: "user",
    permissions: rolePermissions.user,
  },
  {
    id: "4",
    email: "carlos@email.com",
    password: "carlos123",
    name: "Carlos Rodríguez",
    role: "user",
    permissions: rolePermissions.user,
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar si hay una sesión guardada
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simular delay de autenticación
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = mockUsers.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      const userWithoutPassword = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
        permissions: foundUser.permissions,
      }
      setUser(userWithoutPassword)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const hasPermission = (permission: string): boolean => {
    if (!user) return false
    return user.permissions.includes(permission)
  }

  const isAdmin = (): boolean => {
    return user?.role === "admin"
  }

  const isUser = (): boolean => {
    return user?.role === "user"
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm onLogin={login} />
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, hasPermission, isAdmin, isUser }}>
      <Navigation />
      {children}
    </AuthContext.Provider>
  )
}
