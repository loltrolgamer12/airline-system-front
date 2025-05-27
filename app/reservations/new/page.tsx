"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Plane, ArrowLeft } from "lucide-react"
import { apiClient } from "@/lib/api"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "@/hooks/use-toast"
import { Navbar } from "@/components/layout/Navbar"
import Link from "next/link"

function NewReservationContent() {
  const [formData, setFormData] = useState({
    passenger_identification: "",
    flight_number: "",
    seat_number: "",
  })
  const [flights, setFlights] = useState([])
  const [passengers, setPassengers] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const { hasAnyRole } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    loadInitialData()

    // Pre-fill flight if provided in URL
    const flightParam = searchParams.get("flight")
    if (flightParam) {
      setFormData((prev) => ({ ...prev, flight_number: flightParam }))
    }
  }, [searchParams])

  const loadInitialData = async () => {
    try {
      setLoadingData(true)
      const [flightsData, passengersData] = await Promise.all([
        apiClient.getFlights({ available_only: true, limit: 50 }),
        hasAnyRole(["admin", "agent"]) ? apiClient.getPassengers(0, 100) : Promise.resolve([]),
      ])

      setFlights(flightsData)
      setPassengers(passengersData)
    } catch (error) {
      console.error("Error loading data:", error)
      toast({
        title: "Error",
        description: "Failed to load initial data",
        variant: "destructive",
      })
    } finally {
      setLoadingData(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.passenger_identification || !formData.flight_number) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    try {
      setLoading(true)
      const reservation = await apiClient.createReservation({
        passenger_identification: formData.passenger_identification,
        flight_number: formData.flight_number,
        seat_number: formData.seat_number || undefined,
      })

      toast({
        title: "Success",
        description: `Reservation created with code: ${reservation.reservation_code}`,
      })

      router.push(`/reservations/${reservation.reservation_code}`)
    } catch (error: any) {
      console.error("Error creating reservation:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to create reservation",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (!hasAnyRole(["admin", "agent"])) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-12 text-center">
              <h3 className="text-lg font-semibold mb-2">Access Denied</h3>
              <p className="text-muted-foreground">You don't have permission to create reservations</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (loadingData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Card className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/reservations">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Reservations
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Create New Reservation</h1>
          <p className="text-muted-foreground">Book a flight for a passenger</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Reservation Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Passenger Selection */}
                <div className="space-y-2">
                  <Label htmlFor="passenger">Passenger *</Label>
                  {passengers.length > 0 ? (
                    <Select
                      value={formData.passenger_identification}
                      onValueChange={(value) => handleChange("passenger_identification", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a passenger" />
                      </SelectTrigger>
                      <SelectContent>
                        {passengers.map((passenger: any) => (
                          <SelectItem key={passenger.id} value={passenger.identification_number}>
                            {passenger.first_name} {passenger.last_name} ({passenger.identification_number})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id="passenger"
                      placeholder="Enter passenger identification number"
                      value={formData.passenger_identification}
                      onChange={(e) => handleChange("passenger_identification", e.target.value)}
                      required
                    />
                  )}
                </div>

                {/* Flight Selection */}
                <div className="space-y-2">
                  <Label htmlFor="flight">Flight *</Label>
                  <Select
                    value={formData.flight_number}
                    onValueChange={(value) => handleChange("flight_number", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a flight" />
                    </SelectTrigger>
                    <SelectContent>
                      {flights.map((flight: any) => (
                        <SelectItem key={flight.id} value={flight.flight_number}>
                          <div className="flex items-center justify-between w-full">
                            <span>
                              {flight.flight_number} - {flight.origin_airport} → {flight.destination_airport}
                            </span>
                            <span className="ml-4 text-sm text-muted-foreground">
                              ${flight.price} ({flight.available_seats} seats)
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Seat Selection (Optional) */}
                <div className="space-y-2">
                  <Label htmlFor="seat">Preferred Seat (Optional)</Label>
                  <Input
                    id="seat"
                    placeholder="e.g., 12A (leave empty for auto-assignment)"
                    value={formData.seat_number}
                    onChange={(e) => handleChange("seat_number", e.target.value.toUpperCase())}
                    maxLength={4}
                  />
                  <p className="text-sm text-muted-foreground">
                    If not specified, a seat will be automatically assigned
                  </p>
                </div>

                {/* Selected Flight Info */}
                {formData.flight_number && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Plane className="mr-2 h-4 w-4" />
                      Selected Flight Details
                    </h4>
                    {(() => {
                      const selectedFlight = flights.find((f: any) => f.flight_number === formData.flight_number)
                      if (!selectedFlight) return null

                      return (
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Route:</span>
                            <p>
                              {(selectedFlight as any).origin_airport} → {(selectedFlight as any).destination_airport}
                            </p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Price:</span>
                            <p className="font-semibold text-green-600">${(selectedFlight as any).price}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Available Seats:</span>
                            <p>{(selectedFlight as any).available_seats}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Status:</span>
                            <p className="capitalize">{(selectedFlight as any).status}</p>
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                )}

                <div className="flex space-x-4">
                  <Button type="submit" className="flex-1" disabled={loading}>
                    {loading ? "Creating..." : "Create Reservation"}
                  </Button>
                  <Link href="/reservations">
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function NewReservationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewReservationContent />
    </Suspense>
  )
}
