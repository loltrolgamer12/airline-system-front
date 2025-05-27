"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plane, Users, Calendar, MapPin, Clock, AlertTriangle, CheckCircle, Activity } from "lucide-react"
import { apiClient } from "@/lib/api"
import { toast } from "@/hooks/use-toast"
import { Navbar } from "@/components/layout/Navbar"
import Link from "next/link"
import { format } from "date-fns"

interface DashboardStats {
  totalFlights: number
  activeFlights: number
  totalPassengers: number
  totalReservations: number
  availableAircraft: number
  systemHealth: any
}

export default function DashboardPage() {
  const { user, hasAnyRole } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    totalFlights: 0,
    activeFlights: 0,
    totalPassengers: 0,
    totalReservations: 0,
    availableAircraft: 0,
    systemHealth: null,
  })
  const [recentFlights, setRecentFlights] = useState([])
  const [loading, setLoading] = useState(true)
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "demo">("demo")

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)

      // Try to load real data first
      try {
        const [flightsData, passengersData, reservationsData, aircraftCount] = await Promise.all([
          apiClient.getFlights({ limit: 10 }),
          hasAnyRole(["admin", "agent"]) ? apiClient.getPassengers(0, 1) : Promise.resolve([]),
          apiClient.getReservations(0, 1),
          hasAnyRole(["admin", "operator"])
            ? apiClient.getAvailableAircraftCount()
            : Promise.resolve({ available_aircraft: 0 }),
        ])

        setStats({
          totalFlights: flightsData.length,
          activeFlights: flightsData.filter((f: any) => ["scheduled", "boarding", "departed"].includes(f.status))
            .length,
          totalPassengers: Array.isArray(passengersData) ? passengersData.length : 0,
          totalReservations: Array.isArray(reservationsData) ? reservationsData.length : 0,
          availableAircraft: aircraftCount.available_aircraft || 0,
          systemHealth: { status: "connected" },
        })

        setRecentFlights(flightsData.slice(0, 5))
        setConnectionStatus("connected")
      } catch (error) {
        // Use demo data if backend is not available
        console.log("Using demo data - backend not available")
        setStats({
          totalFlights: 25,
          activeFlights: 18,
          totalPassengers: 1250,
          totalReservations: 89,
          availableAircraft: 12,
          systemHealth: { status: "demo" },
        })

        // Demo recent flights
        setRecentFlights([
          {
            id: "demo-1",
            flight_number: "AA101",
            origin_airport: "BOG",
            destination_airport: "MDE",
            departure_time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
            status: "scheduled",
          },
          {
            id: "demo-2",
            flight_number: "AA202",
            origin_airport: "MDE",
            destination_airport: "CLO",
            departure_time: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
            status: "boarding",
          },
          {
            id: "demo-3",
            flight_number: "AA303",
            origin_airport: "CLO",
            destination_airport: "BOG",
            departure_time: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
            status: "scheduled",
          },
        ])
        setConnectionStatus("demo")
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error)
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  const getRoleDisplayName = (role: string) => {
    const roleNames = {
      admin: "Administrator",
      operator: "Flight Operator",
      agent: "Booking Agent",
      passenger: "Passenger",
    }
    return roleNames[role as keyof typeof roleNames] || role
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {getGreeting()}, {user?.name}!
          </h1>
          <p className="text-muted-foreground">Welcome to your {getRoleDisplayName(user?.role || "")} dashboard</p>

          {connectionStatus === "demo" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                📋 Demo Mode: Showing sample data - Connect your backend to see live information
              </p>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Flights</CardTitle>
              <Plane className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalFlights}</div>
              <p className="text-xs text-muted-foreground">{stats.activeFlights} currently active</p>
            </CardContent>
          </Card>

          {hasAnyRole(["admin", "agent"]) && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Passengers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalPassengers}</div>
                <p className="text-xs text-muted-foreground">Registered in system</p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reservations</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalReservations}</div>
              <p className="text-xs text-muted-foreground">Active bookings</p>
            </CardContent>
          </Card>

          {hasAnyRole(["admin", "operator"]) && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available Aircraft</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.availableAircraft}</div>
                <p className="text-xs text-muted-foreground">Ready for service</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Flights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Recent Flights</span>
              </CardTitle>
              <CardDescription>Latest flight information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentFlights.map((flight: any) => (
                  <div key={flight.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Plane className="h-4 w-4 text-blue-600" />
                      <div>
                        <div className="font-medium">{flight.flight_number}</div>
                        <div className="text-sm text-muted-foreground">
                          {flight.origin_airport} → {flight.destination_airport}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={`status-${flight.status}`}>{flight.status}</Badge>
                      <div className="text-sm text-muted-foreground mt-1">
                        {format(new Date(flight.departure_time), "HH:mm")}
                      </div>
                    </div>
                  </div>
                ))}
                {recentFlights.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">No recent flights found</div>
                )}
              </div>
              <div className="mt-4">
                <Link href="/flights">
                  <Button variant="outline" className="w-full">
                    View All Flights
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>System Status</span>
              </CardTitle>
              <CardDescription>Current system information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Frontend</span>
                  </span>
                  <Badge variant="outline" className="text-green-600">
                    Online
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    {connectionStatus === "connected" ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    )}
                    <span>Backend</span>
                  </span>
                  <Badge
                    variant="outline"
                    className={connectionStatus === "connected" ? "text-green-600" : "text-yellow-600"}
                  >
                    {connectionStatus === "connected" ? "Connected" : "Demo Mode"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-blue-500" />
                    <span>Data Source</span>
                  </span>
                  <Badge variant="outline" className="text-blue-600">
                    {connectionStatus === "connected" ? "Live" : "Demo"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks for your role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/flights">
                <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                  <Plane className="h-6 w-6" />
                  <span>View Flights</span>
                </Button>
              </Link>

              <Link href="/reservations">
                <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                  <Calendar className="h-6 w-6" />
                  <span>Reservations</span>
                </Button>
              </Link>

              {hasAnyRole(["admin", "agent"]) && (
                <Link href="/passengers">
                  <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                    <Users className="h-6 w-6" />
                    <span>Passengers</span>
                  </Button>
                </Link>
              )}

              {hasAnyRole(["admin", "operator"]) && (
                <Link href="/aircraft">
                  <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                    <MapPin className="h-6 w-6" />
                    <span>Aircraft</span>
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
