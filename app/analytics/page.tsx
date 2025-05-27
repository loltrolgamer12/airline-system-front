"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Plane, Calendar, DollarSign, Activity, AlertTriangle } from "lucide-react"
import { apiClient } from "@/lib/api"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "@/hooks/use-toast"
import { Navbar } from "@/components/layout/Navbar"

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [systemHealth, setSystemHealth] = useState<any>(null)
  const [circuitBreakerStats, setCircuitBreakerStats] = useState<any>(null)
  const { hasAnyRole } = useAuth()

  useEffect(() => {
    if (hasAnyRole(["admin", "operator"])) {
      loadAnalytics()
      loadSystemHealth()
      loadCircuitBreakerStats()
    } else {
      setLoading(false)
    }
  }, [hasAnyRole])

  const loadAnalytics = async () => {
    try {
      setLoading(true)

      // Load data from multiple endpoints
      const [flights, reservations, passengers, aircraft] = await Promise.all([
        apiClient.getFlights({ limit: 1000 }),
        apiClient.getReservations(0, 1000),
        hasAnyRole(["admin"]) ? apiClient.getPassengers(0, 1000) : Promise.resolve([]),
        apiClient.getAircraft(),
      ])

      // Calculate analytics
      const flightsByStatus = flights.reduce((acc: any, flight: any) => {
        acc[flight.status] = (acc[flight.status] || 0) + 1
        return acc
      }, {})

      const reservationsByStatus = reservations.reduce((acc: any, reservation: any) => {
        acc[reservation.status] = (acc[reservation.status] || 0) + 1
        return acc
      }, {})

      const totalRevenue = reservations
        .filter((r: any) => r.status === "confirmed" || r.status === "checked_in")
        .reduce((sum: number, r: any) => {
          const flight = flights.find((f: any) => f.flight_number === r.flight_number)
          return sum + (flight?.price || 0)
        }, 0)

      const occupancyRate =
        flights.length > 0 ? flights.reduce((sum: number, f: any) => sum + f.occupancy_rate, 0) / flights.length : 0

      setAnalytics({
        flights: {
          total: flights.length,
          byStatus: flightsByStatus,
          averageOccupancy: occupancyRate,
        },
        reservations: {
          total: reservations.length,
          byStatus: reservationsByStatus,
          totalRevenue,
        },
        passengers: {
          total: passengers.length,
        },
        aircraft: {
          total: aircraft.length,
          available: aircraft.filter((a: any) => a.status === "available").length,
        },
      })
    } catch (error) {
      console.error("Error loading analytics:", error)
      toast({
        title: "Error",
        description: "Failed to load analytics data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const loadSystemHealth = async () => {
    try {
      const health = await apiClient.getHealth()
      setSystemHealth(health)
    } catch (error) {
      console.error("Error loading system health:", error)
    }
  }

  const loadCircuitBreakerStats = async () => {
    try {
      const stats = await apiClient.getCircuitBreakerStats()
      setCircuitBreakerStats(stats)
    } catch (error) {
      console.error("Error loading circuit breaker stats:", error)
    }
  }

  if (!hasAnyRole(["admin", "operator"])) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-12 text-center">
              <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Access Denied</h3>
              <p className="text-muted-foreground">You don't have permission to view analytics</p>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">System performance metrics and business intelligence</p>
        </div>

        {loading ? (
          <div className="grid gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Flights</CardTitle>
                  <Plane className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.flights?.total || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    Avg. occupancy: {(analytics.flights?.averageOccupancy || 0).toFixed(1)}%
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    ${(analytics.reservations?.totalRevenue || 0).toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    From {analytics.reservations?.total || 0} reservations
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Reservations</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {(analytics.reservations?.byStatus?.confirmed || 0) +
                      (analytics.reservations?.byStatus?.checked_in || 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">Confirmed + Checked In</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Fleet Utilization</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {analytics.aircraft?.total > 0
                      ? Math.round((analytics.aircraft.available / analytics.aircraft.total) * 100)
                      : 0}
                    %
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {analytics.aircraft?.available || 0} of {analytics.aircraft?.total || 0} available
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Flight Status Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plane className="h-5 w-5" />
                  <span>Flight Status Distribution</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {Object.entries(analytics.flights?.byStatus || {}).map(([status, count]: [string, any]) => (
                    <div key={status} className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold">{count}</div>
                      <div className="text-sm text-muted-foreground capitalize">{status.replace("_", " ")}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reservation Status Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Reservation Status Distribution</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {Object.entries(analytics.reservations?.byStatus || {}).map(([status, count]: [string, any]) => (
                    <div key={status} className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold">{count}</div>
                      <div className="text-sm text-muted-foreground capitalize">{status.replace("_", " ")}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Health */}
            {systemHealth && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <span>System Health</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Gateway Status</h4>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-green-600">
                          {systemHealth.gateway}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Last updated: {new Date(systemHealth.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Microservices</h4>
                      <div className="space-y-2">
                        {systemHealth.services &&
                          Object.entries(systemHealth.services).map(([service, info]: [string, any]) => (
                            <div key={service} className="flex items-center justify-between">
                              <span className="text-sm capitalize">{service.replace("-", " ")}</span>
                              <Badge
                                variant="outline"
                                className={info.status === "healthy" ? "text-green-600" : "text-red-600"}
                              >
                                {info.status}
                              </Badge>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Circuit Breaker Stats */}
            {circuitBreakerStats && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Circuit Breaker Statistics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(circuitBreakerStats).map(([breaker, stats]: [string, any]) => {
                      if (typeof stats !== "object" || !stats.state) return null

                      return (
                        <div key={breaker} className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-3 capitalize">{breaker.replace("_", " ")} Circuit Breaker</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">State:</span>
                              <Badge
                                variant="outline"
                                className={stats.state === "closed" ? "text-green-600" : "text-red-600"}
                              >
                                {stats.state.toUpperCase()}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Success Rate:</span>
                              <span className="text-sm font-medium">{stats.uptime_percentage || 0}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Total Requests:</span>
                              <span className="text-sm font-medium">{stats.total_requests || 0}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Failures:</span>
                              <span className="text-sm font-medium">{stats.failure_count || 0}</span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Performance Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {analytics.flights?.averageOccupancy?.toFixed(1) || 0}%
                    </div>
                    <div className="text-sm text-muted-foreground">Average Flight Occupancy</div>
                  </div>

                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {analytics.reservations?.total > 0
                        ? (
                            ((analytics.reservations.byStatus?.confirmed || 0) / analytics.reservations.total) *
                            100
                          ).toFixed(1)
                        : 0}
                      %
                    </div>
                    <div className="text-sm text-muted-foreground">Reservation Confirmation Rate</div>
                  </div>

                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {analytics.aircraft?.total > 0
                        ? ((analytics.aircraft.available / analytics.aircraft.total) * 100).toFixed(1)
                        : 0}
                      %
                    </div>
                    <div className="text-sm text-muted-foreground">Fleet Availability</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
