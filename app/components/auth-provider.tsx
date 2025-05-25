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
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: RegisterData) => Promise<{ success: boolean; message: string }>
  logout: () => void
  isLoading: boolean
}

interface RegisterData {
  email: string
  password: string
  name: string
  phone: string
  documentType: string
  documentNumber: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Usuarios de prueba actualizados
const mockUsers = [
  {
    id: "1",
    email: "admin@aeroadmin.com",
    password: "admin123",
    name: "Administrador",
    role: "admin",
  },
  {
    id: "2",
    email: "operador@aeroadmin.com",
    password: "operador123",
    name: "Operador de Vuelos",
    role: "operator",
  },
  {
    id: "3",
    email: "agente@aeroadmin.com",
    password: "agente123",
    name: "Agente de Reservas",
    role: "agent",
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar si hay una sesión guardada
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Error parsing saved user:", error)
        localStorage.removeItem("user")
      }
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
      }
      setUser(userWithoutPassword)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const register = async (userData: RegisterData): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true)

    // Simular delay de registro
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Verificar si el email ya existe
    const existingUser = mockUsers.find((u) => u.email === userData.email)
    if (existingUser) {
      setIsLoading(false)
      return { success: false, message: "El email ya está registrado" }
    }

    // Crear nuevo usuario (en una app real, esto se enviaría al backend)
    const newUser = {
      id: Date.now().toString(),
      email: userData.email,
      password: userData.password,
      name: userData.name,
      role: "passenger", // Los usuarios normales son pasajeros
    }

    // En una app real, esto se guardaría en la base de datos
    mockUsers.push(newUser)

    setIsLoading(false)
    return { success: true, message: "Usuario registrado exitosamente" }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
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
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      <Navigation />
      {children}
    </AuthContext.Provider>
  )
}
