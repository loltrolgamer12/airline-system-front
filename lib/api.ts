// lib/api.ts - Configuración API actualizada para conectar con el backend real

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';
const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Tipos de datos para la API
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  status?: string;
  error?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    is_active: boolean;
    created_at: string;
    last_login?: string;
  };
}

export interface Flight {
  id: string;
  flight_number: string;
  departure_time: string;
  arrival_time: string;
  origin_airport: string;
  destination_airport: string;
  aircraft_id: string;
  status: string;
  price: number;
  total_seats: number;
  available_seats: number;
  occupancy_rate: number;
  created_at: string;
  updated_at: string;
}

export interface Passenger {
  id: string;
  identification_number: string;
  first_name: string;
  last_name: string;
  nationality: string;
  passport_number?: string;
  birth_date: string;
  email?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface Reservation {
  id: string;
  reservation_code: string;
  passenger_identification: string;
  flight_number: string;
  seat_number?: string;
  status: string;
  created_at: string;
  updated_at: string;
  checked_in_at?: string;
  passenger_info?: Passenger;
  flight_info?: Flight;
}

// Clase para manejar las llamadas a la API
class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    
    // Cargar token del localStorage si existe
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('access_token');
    }
  }

  // Configurar token de autenticación
  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('access_token', token);
      } else {
        localStorage.removeItem('access_token');
      }
    }
  }

  // Headers por defecto
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Método genérico para hacer peticiones
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    };

    console.log(`🔗 API Request: ${config.method || 'GET'} ${url}`);

    try {
      const response = await fetch(url, config);
      
      // Manejar respuestas no exitosas
      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText || 'Error desconocido' };
        }

        console.error(`❌ API Error: ${response.status}`, errorData);
        
        // Si es error de autenticación, limpiar token
        if (response.status === 401) {
          this.setToken(null);
        }
        
        throw new Error(errorData.detail || errorData.message || `Error ${response.status}`);
      }

      const data = await response.json();
      console.log(`✅ API Response:`, data);
      return data;
    } catch (error) {
      console.error(`❌ API Request failed:`, error);
      throw error;
    }
  }

  // Métodos de autenticación
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    // Guardar token automáticamente
    this.setToken(response.access_token);
    
    return response;
  }

  async logout(): Promise<void> {
    try {
      await this.request('/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.warn('Error durante logout:', error);
    } finally {
      // Limpiar token siempre
      this.setToken(null);
    }
  }

  async getCurrentUser(): Promise<LoginResponse['user']> {
    return this.request<LoginResponse['user']>('/auth/me');
  }

  // Métodos para vuelos
  async getFlights(params?: {
    origin?: string;
    destination?: string;
    departure_date?: string;
    min_price?: number;
    max_price?: number;
    status?: string;
    available_only?: boolean;
    skip?: number;
    limit?: number;
  }): Promise<Flight[]> {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const endpoint = `/flights${queryParams.toString() ? `?${queryParams}` : ''}`;
    return this.request<Flight[]>(endpoint);
  }

  async getFlight(flightNumber: string): Promise<Flight> {
    return this.request<Flight>(`/flights/${flightNumber}`);
  }

  async createFlight(flightData: Partial<Flight>): Promise<Flight> {
    return this.request<Flight>('/flights', {
      method: 'POST',
      body: JSON.stringify(flightData),
    });
  }

  async updateFlight(flightNumber: string, updates: Partial<Flight>): Promise<Flight> {
    return this.request<Flight>(`/flights/${flightNumber}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // Métodos para pasajeros
  async getPassengers(params?: { skip?: number; limit?: number }): Promise<Passenger[]> {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const endpoint = `/passengers${queryParams.toString() ? `?${queryParams}` : ''}`;
    return this.request<Passenger[]>(endpoint);
  }

  async getPassenger(identification: string): Promise<Passenger> {
    return this.request<Passenger>(`/passengers/${identification}`);
  }

  async createPassenger(passengerData: Omit<Passenger, 'id' | 'created_at' | 'updated_at'>): Promise<Passenger> {
    return this.request<Passenger>('/passengers', {
      method: 'POST',
      body: JSON.stringify(passengerData),
    });
  }

  async updatePassenger(identification: string, updates: Partial<Passenger>): Promise<Passenger> {
    return this.request<Passenger>(`/passengers/${identification}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // Métodos para reservas
  async getReservations(params?: { skip?: number; limit?: number }): Promise<Reservation[]> {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const endpoint = `/reservations${queryParams.toString() ? `?${queryParams}` : ''}`;
    return this.request<Reservation[]>(endpoint);
  }

  async getReservation(reservationCode: string): Promise<Reservation> {
    return this.request<Reservation>(`/reservations/${reservationCode}`);
  }

  async createReservation(reservationData: {
    passenger_identification: string;
    flight_number: string;
    seat_number?: string;
  }): Promise<Reservation> {
    return this.request<Reservation>('/reservations', {
      method: 'POST',
      body: JSON.stringify(reservationData),
    });
  }

  async updateReservationStatus(reservationCode: string, status: string): Promise<Reservation> {
    return this.request<Reservation>(`/reservations/${reservationCode}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Método para verificar salud del sistema
  async healthCheck(): Promise<{ status: string; services: Record<string, any> }> {
    return fetch(`${API_GATEWAY_URL}/health`)
      .then(res => res.json())
      .catch(() => ({ status: 'unhealthy', services: {} }));
  }
}

// Instancia global del cliente API
export const apiClient = new ApiClient(API_BASE_URL);

// Funciones de utilidad
export const isTokenValid = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const token = localStorage.getItem('access_token');
  if (!token) return false;

  try {
    // Decodificar JWT sin verificar la firma (solo para verificar expiración)
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Date.now() / 1000;
    
    return payload.exp > now;
  } catch {
    return false;
  }
};

export const clearAuthData = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  }
  apiClient.setToken(null);
};

// Hook para obtener datos con manejo de errores
export const useApiCall = () => {
  const handleApiCall = async <T>(
    apiCall: () => Promise<T>,
    onSuccess?: (data: T) => void,
    onError?: (error: Error) => void
  ): Promise<T | null> => {
    try {
      const data = await apiCall();
      onSuccess?.(data);
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      console.error('API call failed:', errorMessage);
      onError?.(error as Error);
      return null;
    }
  };

  return { handleApiCall };
};

export default apiClient;
