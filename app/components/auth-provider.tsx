"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { LoginForm } from "./login-form"
import { Navigation } from "./navigation"
import { apiClient, isTokenValid, clearAuthData, setAuthToken } from "@/lib/api"

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
  phone?: string
  documentType?: string
  documentNumber?: string
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
        
        // Guardar token y datos del usuario
        setAuthToken(response.access_token)
        setUser(response.user)
        setIsAuthenticated(true)
        
        // Guardar datos en localStorage para persistencia
        localStorage.setItem('user', JSON.stringify(response.user))
        
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
      await apiClient.register({
        email: userData.email,
        password: userData.password,
        name: userData.name,
        role: 'passenger', // Los nuevos usuarios son pasajeros por defecto
      })

      console.log('✅ Registro exitoso')
      setIsLoading(false)
      return { success: true, message: "Usuario registrado exitosamente" }
    } catch (error) {
      console.error('❌ Error durante registro:', error)
      const errorMessage = error instanceof Error ? error.message : 'Error de conexión durante el registro'
      setIsLoading(false)
      return { success: false, message: errorMessage }
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
    return <LoginForm onLogin={login} onRegister={register} />
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