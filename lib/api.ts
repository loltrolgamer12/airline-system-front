const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private getAuthHeaders(): HeadersInit {
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Network error" }))
      throw new Error(error.detail || `HTTP ${response.status}`)
    }
    return response.json()
  }

  // Flights API
  async getFlights(params?: {
    origin?: string
    destination?: string
    departure_date?: string
    min_price?: number
    max_price?: number
    status?: string
    available_only?: boolean
    skip?: number
    limit?: number
  }) {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString())
        }
      })
    }

    const response = await fetch(`${this.baseURL}/api/v1/flights?${searchParams}`, {
      headers: this.getAuthHeaders(),
      signal: AbortSignal.timeout(5000), // 5 second timeout
    })
    return this.handleResponse(response)
  }

  async getFlight(flightNumber: string) {
    const response = await fetch(`${this.baseURL}/api/v1/flights/${flightNumber}`, {
      headers: this.getAuthHeaders(),
      signal: AbortSignal.timeout(5000),
    })
    return this.handleResponse(response)
  }

  async createFlight(flightData: any) {
    const response = await fetch(`${this.baseURL}/api/v1/flights`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(flightData),
      signal: AbortSignal.timeout(10000),
    })
    return this.handleResponse(response)
  }

  async updateFlight(flightNumber: string, updateData: any) {
    const response = await fetch(`${this.baseURL}/api/v1/flights/${flightNumber}`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(updateData),
      signal: AbortSignal.timeout(10000),
    })
    return this.handleResponse(response)
  }

  // Passengers API
  async getPassengers(skip = 0, limit = 100) {
    const response = await fetch(`${this.baseURL}/api/v1/passengers?skip=${skip}&limit=${limit}`, {
      headers: this.getAuthHeaders(),
      signal: AbortSignal.timeout(5000),
    })
    return this.handleResponse(response)
  }

  async getPassenger(identification: string) {
    const response = await fetch(`${this.baseURL}/api/v1/passengers/${identification}`, {
      headers: this.getAuthHeaders(),
      signal: AbortSignal.timeout(5000),
    })
    return this.handleResponse(response)
  }

  async createPassenger(passengerData: any) {
    const response = await fetch(`${this.baseURL}/api/v1/passengers`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(passengerData),
      signal: AbortSignal.timeout(10000),
    })
    return this.handleResponse(response)
  }

  async updatePassenger(identification: string, updateData: any) {
    const response = await fetch(`${this.baseURL}/api/v1/passengers/${identification}`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(updateData),
      signal: AbortSignal.timeout(10000),
    })
    return this.handleResponse(response)
  }

  // Reservations API
  async getReservations(skip = 0, limit = 100) {
    const response = await fetch(`${this.baseURL}/api/v1/reservations?skip=${skip}&limit=${limit}`, {
      headers: this.getAuthHeaders(),
      signal: AbortSignal.timeout(5000),
    })
    return this.handleResponse(response)
  }

  async getReservation(reservationCode: string) {
    const response = await fetch(`${this.baseURL}/api/v1/reservations/${reservationCode}`, {
      headers: this.getAuthHeaders(),
      signal: AbortSignal.timeout(5000),
    })
    return this.handleResponse(response)
  }

  async createReservation(reservationData: any) {
    const response = await fetch(`${this.baseURL}/api/v1/reservations`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(reservationData),
      signal: AbortSignal.timeout(10000),
    })
    return this.handleResponse(response)
  }

  async updateReservationStatus(reservationCode: string, status: string) {
    const response = await fetch(`${this.baseURL}/api/v1/reservations/${reservationCode}/status?new_status=${status}`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      signal: AbortSignal.timeout(10000),
    })
    return this.handleResponse(response)
  }

  // Airports API
  async getAirports(skip = 0, limit = 100) {
    const response = await fetch(`${this.baseURL}/api/v1/airports?skip=${skip}&limit=${limit}`, {
      headers: this.getAuthHeaders(),
      signal: AbortSignal.timeout(5000),
    })
    return this.handleResponse(response)
  }

  // Aircraft API
  async getAircraft(skip = 0, limit = 100) {
    const response = await fetch(`${this.baseURL}/api/v1/aircraft?skip=${skip}&limit=${limit}`, {
      headers: this.getAuthHeaders(),
      signal: AbortSignal.timeout(5000),
    })
    return this.handleResponse(response)
  }

  async getAvailableAircraftCount() {
    const response = await fetch(`${this.baseURL}/api/v1/aircraft/available/count`, {
      headers: this.getAuthHeaders(),
      signal: AbortSignal.timeout(5000),
    })
    return this.handleResponse(response)
  }

  // Crew API
  async getCrew(skip = 0, limit = 100) {
    const response = await fetch(`${this.baseURL}/api/v1/crew?skip=${skip}&limit=${limit}`, {
      headers: this.getAuthHeaders(),
      signal: AbortSignal.timeout(5000),
    })
    return this.handleResponse(response)
  }

  async getAvailableCrewByPosition() {
    const response = await fetch(`${this.baseURL}/api/v1/crew/available/by-position`, {
      headers: this.getAuthHeaders(),
      signal: AbortSignal.timeout(5000),
    })
    return this.handleResponse(response)
  }

  // Users API
  async getUsers(skip = 0, limit = 100) {
    const response = await fetch(`${this.baseURL}/api/v1/users?skip=${skip}&limit=${limit}`, {
      headers: this.getAuthHeaders(),
      signal: AbortSignal.timeout(5000),
    })
    return this.handleResponse(response)
  }

  async createUser(userData: any) {
    const response = await fetch(`${this.baseURL}/api/v1/users`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(userData),
      signal: AbortSignal.timeout(10000),
    })
    return this.handleResponse(response)
  }

  async updateUser(userId: string, updateData: any) {
    const response = await fetch(`${this.baseURL}/api/v1/users/${userId}`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(updateData),
      signal: AbortSignal.timeout(10000),
    })
    return this.handleResponse(response)
  }

  async deleteUser(userId: string) {
    const response = await fetch(`${this.baseURL}/api/v1/users/${userId}`, {
      method: "DELETE",
      headers: this.getAuthHeaders(),
      signal: AbortSignal.timeout(10000),
    })
    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Delete failed" }))
      throw new Error(error.detail || `HTTP ${response.status}`)
    }
  }

  // Health check - simplified and more resilient
  async getHealth() {
    try {
      const response = await fetch(`${this.baseURL}/health`, {
        signal: AbortSignal.timeout(3000), // Short timeout for health check
      })
      return this.handleResponse(response)
    } catch (error) {
      throw new Error("Health service unavailable")
    }
  }

  // Circuit breaker stats
  async getCircuitBreakerStats() {
    const response = await fetch(`${this.baseURL}/api/v1/circuit-breaker/stats`, {
      headers: this.getAuthHeaders(),
      signal: AbortSignal.timeout(5000),
    })
    return this.handleResponse(response)
  }
}

export const apiClient = new ApiClient(API_BASE_URL)
