"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane, ArrowRight } from "lucide-react"
import { apiClient } from "@/lib/api"
import { format } from "date-fns"

// Demo data for when backend is not available
const demoFlights = [
  {
    id: "demo-1",
    flight_number: "AA101",
    origin_airport: "BOG",
    destination_airport: "MDE",
    departure_time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    price: 250000,
    available_seats: 45,
    status: "scheduled",
  },
  {
    id: "demo-2",
    flight_number: "AA202",
    origin_airport: "MDE",
    destination_airport: "CLO",
    departure_time: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
    price: 180000,
    available_seats: 32,
    status: "boarding",
  },
  {
    id: "demo-3",
    flight_number: "AA303",
    origin_airport: "CLO",
    destination_airport: "BOG",
    departure_time: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
    price: 275000,
    available_seats: 28,
    status: "scheduled",
  },
  {
    id: "demo-4",
    flight_number: "AA404",
    origin_airport: "BOG",
    destination_airport: "BAQ",
    departure_time: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    price: 320000,
    available_seats: 15,
    status: "delayed",
  },
  {
    id: "demo-5",
    flight_number: "AA505",
    origin_airport: "BAQ",
    destination_airport: "MDE",
    departure_time: new Date(Date.now() + 10 * 60 * 60 * 1000).toISOString(),
    price: 195000,
    available_seats: 52,
    status: "scheduled",
  },
  {
    id: "demo-6",
    flight_number: "AA606",
    origin_airport: "MDE",
    destination_airport: "BOG",
    departure_time: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
    price: 260000,
    available_seats: 38,
    status: "departed",
  },
]

export function RecentFlights() {
  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(true)
  const [usingDemo, setUsingDemo] = useState(false)

  useEffect(() => {
    loadRecentFlights()
  }, [])

  const loadRecentFlights = async () => {
    try {
      const data = await apiClient.getFlights({ limit: 6 })
      setFlights(data)
      setUsingDemo(false)
    } catch (error) {
      console.log("Using demo flight data - backend not available")
      setFlights(demoFlights)
      setUsingDemo(true)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {usingDemo && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            📋 Showing demo flight data - Connect your backend to see live flights
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {flights.map((flight: any) => (
          <Card key={flight.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Plane className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold">{flight.flight_number}</span>
                </div>
                <Badge className={`status-${flight.status}`}>{flight.status}</Badge>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span>{flight.origin_airport}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <span>{flight.destination_airport}</span>
              </div>

              <div className="mt-2 text-xs text-muted-foreground">
                Departure: {format(new Date(flight.departure_time), "MMM dd, HH:mm")}
              </div>

              <div className="mt-2 text-sm">
                <span className="text-green-600 font-semibold">
                  ${typeof flight.price === "number" ? flight.price.toLocaleString() : flight.price}
                </span>
                <span className="text-muted-foreground ml-2">{flight.available_seats} seats</span>
              </div>
            </CardContent>
          </Card>
        ))}

        {flights.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="p-8 text-center">
              <Plane className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No flights available</h3>
              <p className="text-muted-foreground">Check back later for flight updates</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
