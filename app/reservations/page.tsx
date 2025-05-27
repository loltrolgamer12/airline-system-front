"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Users, Search, Plus, Plane, Clock } from "lucide-react"
import { apiClient } from "@/lib/api"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "@/hooks/use-toast"
import { Navbar } from "@/components/layout/Navbar"
import Link from "next/link"
import { format } from "date-fns"

interface Reservation {
  id: string
  reservation_code: string
  passenger_identification: string
  flight_number: string
  seat_number: string
  status: string
  created_at: string
  updated_at: string
  checked_in_at?: string
  passenger_info?: any
  flight_info?: any
}

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [searchCode, setSearchCode] = useState("")
  const { hasAnyRole } = useAuth()

  useEffect(() => {
    loadReservations()
  }, [])

  const loadReservations = async () => {
    try {
      setLoading(true)
      const data = await apiClient.getReservations()
      setReservations(data)
    } catch (error) {
      console.error("Error loading reservations:", error)
      toast({
        title: "Error",
        description: "Failed to load reservations",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const searchReservation = async () => {
    if (!searchCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a reservation code",
        variant: "destructive",
      })
      return
    }

    try {
      const reservation = await apiClient.getReservation(searchCode.toUpperCase())
      setReservations([reservation])
    } catch (error) {
      toast({
        title: "Not found",
        description: "Reservation not found",
        variant: "destructive",
      })
    }
  }

  const updateReservationStatus = async (reservationCode: string, newStatus: string) => {
    try {
      await apiClient.updateReservationStatus(reservationCode, newStatus)
      toast({
        title: "Success",
        description: "Reservation status updated",
      })
      loadReservations()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update reservation status",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      confirmed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      checked_in: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      no_show: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    }
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Reservations</h1>
            <p className="text-muted-foreground">Manage flight reservations and bookings</p>
          </div>
          {hasAnyRole(["admin", "agent"]) && (
            <Link href="/reservations/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Reservation
              </Button>
            </Link>
          )}
        </div>

        {/* Search Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Search Reservation</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <div className="flex-1">
                <Label htmlFor="search">Reservation Code</Label>
                <Input
                  id="search"
                  placeholder="Enter reservation code (e.g., ABC123)"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
                  className="uppercase"
                />
              </div>
              <div className="flex items-end space-x-2">
                <Button onClick={searchReservation}>Search</Button>
                <Button variant="outline" onClick={loadReservations}>
                  Show All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reservations List */}
        {loading ? (
          <div className="grid gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : reservations.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No reservations found</h3>
              <p className="text-muted-foreground">Try searching with a different reservation code</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {reservations.map((reservation) => (
              <Card key={reservation.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{reservation.reservation_code}</h3>
                        <p className="text-muted-foreground">Passenger: {reservation.passenger_identification}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(reservation.status)}>
                      {reservation.status.replace("_", " ").toUpperCase()}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Plane className="h-4 w-4 text-muted-foreground" />
                      <span>Flight: {reservation.flight_number}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>Seat: {reservation.seat_number || "Not assigned"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Created: {format(new Date(reservation.created_at), "MMM dd, yyyy")}</span>
                    </div>
                  </div>

                  {reservation.checked_in_at && (
                    <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        ✅ Checked in on {format(new Date(reservation.checked_in_at), "MMM dd, yyyy 'at' HH:mm")}
                      </p>
                    </div>
                  )}

                  {/* Additional Info */}
                  {(reservation.passenger_info || reservation.flight_info) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      {reservation.passenger_info && (
                        <div>
                          <h4 className="font-semibold mb-2">Passenger Details</h4>
                          <p className="text-sm">
                            {reservation.passenger_info.first_name} {reservation.passenger_info.last_name}
                          </p>
                          <p className="text-sm text-muted-foreground">{reservation.passenger_info.email}</p>
                        </div>
                      )}
                      {reservation.flight_info && (
                        <div>
                          <h4 className="font-semibold mb-2">Flight Details</h4>
                          <p className="text-sm">
                            {reservation.flight_info.origin_airport} → {reservation.flight_info.destination_airport}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(reservation.flight_info.departure_time), "MMM dd, HH:mm")}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  {hasAnyRole(["admin", "agent"]) && (
                    <div className="flex space-x-2">
                      {reservation.status === "confirmed" && (
                        <Button
                          size="sm"
                          onClick={() => updateReservationStatus(reservation.reservation_code, "checked_in")}
                        >
                          Check In
                        </Button>
                      )}
                      {reservation.status !== "cancelled" && reservation.status !== "no_show" && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => updateReservationStatus(reservation.reservation_code, "cancelled")}
                        >
                          Cancel
                        </Button>
                      )}
                      <Link href={`/reservations/${reservation.reservation_code}`}>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
