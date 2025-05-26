"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { LoginForm } from "./login-form"
import { Navigation } from "./navigation"
import { apiClient, isTokenValid, clearAuthData } from "@/lib/api"

interface User {
  id: string
  email: string
  name: string
  role: string
  is_active: boolean
  created_at: string
  last_login?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: RegisterData) => Promise<{ success: boolean; message: string }>
  logout: () => void
  isLoading: boolean
  isAuthenticated: boolean
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Verificar sesión al cargar la aplicación
  useEffect(() => {
    const initializeAuth = async () => {
      console.log('🔍 Verificando sesión existente...')
      
      try {
        // Verificar si hay un token válido
        if (!isTokenValid()) {
          console.log('❌ No hay token válido')
          clearAuthData()
          setIsLoading(false)
          return
        }

        console.log('✅ Token válido encontrado, verificando con servidor...')
        
        // Verificar usuario actual con el servidor
        const currentUser = await apiClient.getCurrentUser()
        
        if (currentUser && currentUser.is_active) {
          console.log('✅ Usuario autenticado:', currentUser.name)
          setUser(currentUser)
          setIsAuthenticated(true)
          
          // Guardar en localStorage para persistencia
          localStorage.setItem('user', JSON.stringify(currentUser))
        } else {
          console.log('❌ Usuario no activo o no válido')
          clearAuthData()
        }
      } catch (error) {
        console.error('❌ Error verificando sesión:', error)
        clearAuthData()
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('🔐 Intentando login para:', email)
    setIsLoading(true)

    try {
      const response = await apiClient.login({ email, password })
      
      if (response.user && response.access_token) {
        console.log('✅ Login exitoso:', response.user.name)
        
        setUser(response.user)
        setIsAuthenticated(true)
        
        // Guardar datos en localStorage
        localStorage.setItem('user', JSON.stringify(response.user))
        localStorage.setItem('access_token', response.access_token)
        
        setIsLoading(false)
        return true
      } else {
        console.error('❌ Respuesta de login inválida')
        setIsLoading(false)
        return false
      }
    } catch (error) {
      console.error('❌ Error durante login:', error)
      setIsLoading(false)
      return false
    }
  }

  const register = async (userData: RegisterData): Promise<{ success: boolean; message: string }> => {
    console.log('📝 Intentando registro para:', userData.email)
    setIsLoading(true)

    try {
      // Nota: Este endpoint puede no existir en el backend actual
      // Verificar si está implementado en user-service
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          name: userData.name,
          role: 'passenger', // Los nuevos usuarios son pasajeros por defecto
        }),
      })

      if (response.ok) {
        console.log('✅ Registro exitoso')
        setIsLoading(false)
        return { success: true, message: "Usuario registrado exitosamente" }
      } else {
        const errorData = await response.json().catch(() => ({}))
        const errorMessage = errorData.detail || errorData.message || 'Error en el registro'
        console.error('❌ Error en registro:', errorMessage)
        setIsLoading(false)
        return { success: false, message: errorMessage }
      }
    } catch (error) {
      console.error('❌ Error durante registro:', error)
      setIsLoading(false)
      return { success: false, message: 'Error de conexión durante el registro' }
    }
  }

  const logout = async () => {
    console.log('🚪 Cerrando sesión...')
    setIsLoading(true)

    try {
      // Intentar logout en el servidor
      await apiClient.logout()
      console.log('✅ Logout del servidor exitoso')
    } catch (error) {
      console.warn('⚠️ Error durante logout del servidor:', error)
      // Continuar con logout local incluso si falla el servidor
    }

    // Limpiar estado local
    setUser(null)
    setIsAuthenticated(false)
    clearAuthData()
    
    console.log('✅ Sesión cerrada localmente')
    setIsLoading(false)
  }

  // Loading screen mientras verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando sesión...</p>
          <p className="text-sm text-gray-500">Conectando con el servidor...</p>
        </div>
      </div>
    )
  }

  // Mostrar login si no está autenticado
  if (!isAuthenticated || !user) {
    return <LoginForm onLogin={login} />
  }

  // Mostrar aplicación si está autenticado
  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      isLoading, 
      isAuthenticated 
    }}>
      <Navigation />
      {children}
    </AuthContext.Provider>
  )
}

// Hook para verificar permisos de rol
export const usePermissions = () => {
  const { user } = useAuth()

  const hasRole = (requiredRole: string): boolean => {
    if (!user) return false
    
    // Admin tiene acceso a todo
    if (user.role === 'admin') return true
    
    // Verificar rol específico
    return user.role === requiredRole
  }

  const hasAnyRole = (roles: string[]): boolean => {
    if (!user) return false
    
    // Admin tiene acceso a todo
    if (user.role === 'admin') return true
    
    // Verificar si tiene alguno de los roles
    return roles.includes(user.role)
  }

  const canAccessRoute = (route: string): boolean => {
    if (!user) return false

    // Rutas públicas (todos los usuarios autenticados)
    const publicRoutes = ['/', '/flights', '/passengers', '/reservations']
    if (publicRoutes.includes(route)) return true

    // Rutas solo para administradores
    const adminRoutes = ['/admin', '/admin/users']
    if (adminRoutes.some(adminRoute => route.startsWith(adminRoute))) {
      return user.role === 'admin'
    }

    return true
  }

  return {
    hasRole,
    hasAnyRole,
    canAccessRoute,
    isAdmin: user?.role === 'admin',
    isOperator: user?.role === 'operator',
    isAgent: user?.role === 'agent',
    isPassenger: user?.role === 'passenger',
  }
}

// Componente para proteger rutas
export const ProtectedRoute: React.FC<{
  children: React.ReactNode
  requiredRole?: string
  requiredRoles?: string[]
  fallback?: React.ReactNode
}> = ({ children, requiredRole, requiredRoles, fallback }) => {
  const { hasRole, hasAnyRole } = usePermissions()

  if (requiredRole && !hasRole(requiredRole)) {
    return fallback || (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Acceso Denegado</h1>
        <p className="text-gray-600">No tienes permisos para acceder a esta sección.</p>
      </div>
    )
  }

  if (requiredRoles && !hasAnyRole(requiredRoles)) {
    return fallback || (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Acceso Denegado</h1>
        <p className="text-gray-600">No tienes permisos para acceder a esta sección.</p>
      </div>
    )
  }

  return <>{children}</>
}