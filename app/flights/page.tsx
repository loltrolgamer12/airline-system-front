"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Plane, Users, Filter, ArrowRight } from "lucide-react"
import { apiClient } from "@/lib/api"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { Navbar } from "@/components/layout/Navbar"
import { FlightSearchForm } from "@/components/flights/FlightSearchForm"
import Link from "next/link"

interface Flight {
  id: string
  flight_number: string
  departure_time: string
  arrival_time: string
  origin_airport: string
  destination_airport: string
  aircraft_id: string
  status: string
  price: number
  total_seats: number
  available_seats: number
  occupancy_rate: number
  created_at: string
  updated_at: string
}

function FlightCard({ flight }: { flight: Flight }) {
  const { hasAnyRole } = useAuth()
  const canManage = hasAnyRole(["admin", "operator"])

  const getStatusColor = (status: string) => {
    const colors = {
      scheduled: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      boarding: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      departed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      arrived: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
      delayed: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    }
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const formatTime = (dateString: string) => {
    return format(new Date(dateString), "HH:mm")
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy")
  }

  return (
    <Card className="flight-card hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-2">
            <Plane className="h-5 w-5 text-blue-600" />
            <span className="font-bold text-lg">{flight.flight_number}</span>
            <Badge className={getStatusColor(flight.status)}>
              {flight.status.charAt(0).toUpperCase() + flight.status.slice(1)}
            </Badge>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">${flight.price.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">per person</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{formatTime(flight.departure_time)}</div>
            <div className="text-sm text-muted-foreground">{flight.origin_airport}</div>
            <div className="text-xs text-muted-foreground">{formatDate(flight.departure_time)}</div>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <div className="w-8 h-px bg-border"></div>
              <ArrowRight className="h-4 w-4" />
              <div className="w-8 h-px bg-border"></div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold">{formatTime(flight.arrival_time)}</div>
            <div className="text-sm text-muted-foreground">{flight.destination_airport}</div>
            <div className="text-xs text-muted-foreground">{formatDate(flight.arrival_time)}</div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{flight.available_seats} seats available</span>
            </div>
            <div className="flex items-center space-x-1">
              <Plane className="h-4 w-4" />
              <span>{flight.aircraft_id}</span>
            </div>
          </div>
          <div className="text-right">
            <div>Occupancy: {flight.occupancy_rate}%</div>
          </div>
        </div>

        <div className="flex space-x-2">
          {flight.available_seats > 0 && (
            <Link href={`/reservations/new?flight=${flight.flight_number}`} className="flex-1">
              <Button className="w-full">Book Flight</Button>
            </Link>
          )}

          <Link href={`/flights/${flight.flight_number}`}>
            <Button variant="outline">View Details</Button>
          </Link>

          {canManage && (
            <Link href={`/flights/${flight.flight_number}/edit`}>
              <Button variant="outline">Manage</Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function FlightsContent() {
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    origin: "",
    destination: "",
    departure_date: "",
    min_price: "",
    max_price: "",
    status: "",
    available_only: true,
  })
  const searchParams = useSearchParams()

  useEffect(() => {
    // Initialize filters from URL params
    const newFilters = { ...filters }
    searchParams.forEach((value, key) => {
      if (key in newFilters) {
        newFilters[key as keyof typeof filters] = value as any
      }
    })
    setFilters(newFilters)
  }, [searchParams])

  useEffect(() => {
    loadFlights()
  }, [filters])

  const loadFlights = async () => {
    try {
      setLoading(true)
      const params = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== "" && value !== null))
      const data = await apiClient.getFlights(params)
      setFlights(data)
    } catch (error) {
      console.error("Error loading flights:", error)
      toast({
        title: "Error",
        description: "Failed to load flights",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Flight Search</h1>
          <Card>
            <CardContent className="p-6">
              <FlightSearchForm />
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  className="w-full mt-1 p-2 border rounded-md"
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                >
                  <option value="">All statuses</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="boarding">Boarding</option>
                  <option value="departed">Departed</option>
                  <option value="arrived">Arrived</option>
                  <option value="delayed">Delayed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <Label htmlFor="min_price">Min Price</Label>
                <Input
                  id="min_price"
                  type="number"
                  placeholder="0"
                  value={filters.min_price}
                  onChange={(e) => handleFilterChange("min_price", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="max_price">Max Price</Label>
                <Input
                  id="max_price"
                  type="number"
                  placeholder="1000"
                  value={filters.max_price}
                  onChange={(e) => handleFilterChange("max_price", e.target.value)}
                />
              </div>

              <div className="flex items-end">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.available_only}
                    onChange={(e) => handleFilterChange("available_only", e.target.checked)}
                  />
                  <span>Available seats only</span>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">{loading ? "Loading..." : `${flights.length} flights found`}</h2>
        </div>

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
        ) : flights.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Plane className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No flights found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {flights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function FlightsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FlightsContent />
    </Suspense>
  )
}
