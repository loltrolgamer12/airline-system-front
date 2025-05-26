import { getSession } from 'next-auth/react'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1'

interface ApiOptions extends RequestInit {
  requiresAuth?: boolean
}

export async function apiCall(endpoint: string, options: ApiOptions = {}) {
  const { requiresAuth = false, ...fetchOptions } = options
  
  const url = ${API_BASE_URL}
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  }

  // Agregar token de autorización si es requerido
  if (requiresAuth) {
    const session = await getSession()
    if (session?.accessToken) {
      headers.Authorization = Bearer 
    }
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  })

  if (!response.ok) {
    throw new Error(API Error:  )
  }

  return response.json()
}

// Funciones específicas para diferentes métodos HTTP
export const api = {
  get: (endpoint: string, requiresAuth = false) =>
    apiCall(endpoint, { method: 'GET', requiresAuth }),
    
  post: (endpoint: string, data: any, requiresAuth = false) =>
    apiCall(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      requiresAuth,
    }),
    
  put: (endpoint: string, data: any, requiresAuth = false) =>
    apiCall(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      requiresAuth,
    }),
    
  delete: (endpoint: string, requiresAuth = false) =>
    apiCall(endpoint, { method: 'DELETE', requiresAuth }),
}
