'use client'

import { useSession } from 'next-auth/react'

export function useAuth() {
  const { data: session, status } = useSession()
  
  return {
    user: session?.user,
    accessToken: session?.accessToken,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
    isUnauthenticated: status === 'unauthenticated',
  }
}

export function useAuthToken() {
  const { data: session } = useSession()
  
  return {
    token: session?.accessToken,
    tokenType: session?.tokenType || 'Bearer',
    getAuthHeader: () => ({
      'Authorization': Bearer 
    })
  }
}
