// lib/api.ts - Cliente API completo
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1'

// Tipos de datos
interface User {
  id: string
  email: string
  name: string
  role: string
  is_active: boolean
  created_at: string
  last_login?: string
}

interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  user: User
  access_token: string
  token_type: string
  expires_in: number
}

interface RegisterRequest {
  email: string
  password: string
  name: string
  role?: string
}

interface Flight {
  id: string
  flight_number: string
  airline: string
  origin_airport: string
  destination_airport: string
  departure_time: string
  arrival_time: string
  price: number
  available_seats: number
  total_seats: number
  status: string
  aircraft_type?: string
  occupancy_rate?: number
}

interface Passenger {
  id: string
  identification_number: string
  first_name: string
  last_name: string
  nationality: string
  birth_date: string
  email?: string
  phone?: string
  document_type?: string
}

interface Reservation {
  id: string
  reservation_code: string
  passenger_identification: string
  flight_number: string
  seat_number?: string
  status: string
  created_at: string
  passenger_name?: string
  flight_route?: string
}

// Utilidades para manejo de tokens
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('access_token')
}

export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', token)
  }
}

export const clearAuthData = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
  }
}

export const isTokenValid = (): boolean => {
  const token = getAuthToken()
  if (!token) return false
  
  try {
    const userData = localStorage.getItem('user')
    return !!userData
  } catch {
    return false
  }
}

// Cliente API principal
class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const token = getAuthToken()

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      console.log(`🌐 API Request: ${options.method || 'GET'} ${url}`)
      
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error(`❌ API Error (${response.status}):`, errorText)
        
        if (response.status === 401) {
          clearAuthData()
          if (typeof window !== 'undefined') {
            window.location.href = '/'
          }
        }
        
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const data = await response.json()
      console.log(`✅ API Response:`, data)
      return data
    } catch (error) {
      console.error(`❌ Network Error for ${url}:`, error)
      throw error
    }
  }

  // Autenticación
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  }

  async register(userData: RegisterRequest): Promise<{ message: string }> {
    return this.request<{ message: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  async logout(): Promise<void> {
    try {
      await this.request('/auth/logout', { method: 'POST' })
    } catch (error) {
      console.warn('Logout error (continuing with local cleanup):', error)
    }
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>('/auth/me')
  }

  // Vuelos
  async getFlights(params?: {
    origin?: string
    destination?: string
    date?: string
    available_only?: boolean
    max_price?: number
  }): Promise<Flight[]> {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString())
        }
      })
    }
    
    const query = queryParams.toString()
    return this.request<Flight[]>(`/flights${query ? `?${query}` : ''}`)
  }

  async getFlight(id: string): Promise<Flight> {
    return this.request<Flight>(`/flights/${id}`)
  }

  async createFlight(flightData: Partial<Flight>): Promise<Flight> {
    return this.request<Flight>('/flights', {
      method: 'POST',
      body: JSON.stringify(flightData),
    })
  }

  // Pasajeros
  async getPassengers(): Promise<Passenger[]> {
    return this.request<Passenger[]>('/passengers')
  }

  async getPassenger(id: string): Promise<Passenger> {
    return this.request<Passenger>(`/passengers/${id}`)
  }

  async createPassenger(passengerData: Partial<Passenger>): Promise<Passenger> {
    return this.request<Passenger>('/passengers', {
      method: 'POST',
      body: JSON.stringify(passengerData),
    })
  }

  // Reservas
  async getReservations(): Promise<Reservation[]> {
    return this.request<Reservation[]>('/reservations')
  }

  async getReservation(id: string): Promise<Reservation> {
    return this.request<Reservation>(`/reservations/${id}`)
  }

  async createReservation(reservationData: {
    passenger_identification: string
    flight_number: string
    seat_preference?: string
  }): Promise<Reservation> {
    return this.request<Reservation>('/reservations', {
      method: 'POST',
      body: JSON.stringify(reservationData),
    })
  }

  // Usuarios (solo para administradores)
  async getUsers(): Promise<User[]> {
    return this.request<User[]>('/users')
  }

  async createUser(userData: RegisterRequest): Promise<User> {
    return this.request<User>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  // Health check
  async healthCheck(): Promise<{ status: string; services: Record<string, string> }> {
    return this.request<{ status: string; services: Record<string, string> }>('/health')
  }
}

// Instancia singleton del cliente API
export const apiClient = new ApiClient()

// Exportar tipos
export type {
  User,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  Flight,
  Passenger,
  Reservation,
}