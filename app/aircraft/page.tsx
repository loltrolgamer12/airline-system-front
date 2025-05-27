"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plane, Search, Users, Settings, Activity } from "lucide-react"
import { apiClient } from "@/lib/api"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "@/hooks/use-toast"
import { Navbar } from "@/components/layout/Navbar"

interface Aircraft {
  id: string
  registration: string
  model: string
  manufacturer: string
  total_seats: number
  status: string
}

export default function AircraftPage() {
  const [aircraft, setAircraft] = useState<Aircraft[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [availableCount, setAvailableCount] = useState(0)
  const { hasAnyRole } = useAuth()

  useEffect(() => {
    if (hasAnyRole(["admin", "operator"])) {
      loadAircraft()
      loadAvailableCount()
    } else {
      setLoading(false)
    }
  }, [hasAnyRole])

  const loadAircraft = async () => {
    try {
      setLoading(true)
      const data = await apiClient.getAircraft()
      setAircraft(data)
    } catch (error) {
      console.error("Error loading aircraft:", error)
      toast({
        title: "Error",
        description: "Failed to load aircraft",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const loadAvailableCount = async () => {
    try {
      const data = await apiClient.getAvailableAircraftCount()
      setAvailableCount(data.available_aircraft)
    } catch (error) {
      console.error("Error loading available aircraft count:", error)
    }
  }

  const filteredAircraft = aircraft.filter(
    (plane) =>
      plane.registration.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plane.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plane.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    const colors = {
      available: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      in_flight: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      maintenance: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      out_of_service: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    }
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  if (!hasAnyRole(["admin", "operator"])) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-12 text-center">
              <Plane className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Access Denied</h3>
              <p className="text-muted-foreground">You don't have permission to view aircraft information</p>
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
          <h1 className="text-3xl font-bold mb-2">Aircraft Fleet</h1>
          <p className="text-muted-foreground">Manage aircraft fleet and operational status</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Aircraft</CardTitle>
              <Plane className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{aircraft.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
              <Activity className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{availableCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Maintenance</CardTitle>
              <Settings className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {aircraft.filter((a) => a.status === "maintenance").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{aircraft.reduce((sum, a) => sum + a.total_seats, 0)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Search Aircraft</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <div className="flex-1">
                <Label htmlFor="search">Search by registration, model, or manufacturer</Label>
                <Input
                  id="search"
                  placeholder="Enter search term..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Aircraft Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredAircraft.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Plane className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No aircraft found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? "Try a different search term" : "No aircraft available"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAircraft.map((plane) => (
              <Card key={plane.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <Plane className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{plane.registration}</h3>
                        <p className="text-sm text-muted-foreground">{plane.model}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(plane.status)}>
                      {plane.status.replace("_", " ").toUpperCase()}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Manufacturer:</span>
                      <span className="text-sm font-medium">{plane.manufacturer}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Model:</span>
                      <span className="text-sm font-medium">{plane.model}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Capacity:</span>
                      <span className="text-sm font-medium flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {plane.total_seats} seats
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Registration</span>
                      <span className="font-mono font-bold">{plane.registration}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Fleet Summary */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Fleet Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">By Manufacturer</h4>
                <div className="space-y-2">
                  {Object.entries(
                    aircraft.reduce(
                      (acc, plane) => {
                        acc[plane.manufacturer] = (acc[plane.manufacturer] || 0) + 1
                        return acc
                      },
                      {} as Record<string, number>,
                    ),
                  ).map(([manufacturer, count]) => (
                    <div key={manufacturer} className="flex justify-between">
                      <span>{manufacturer}</span>
                      <Badge variant="outline">{count}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">By Status</h4>
                <div className="space-y-2">
                  {Object.entries(
                    aircraft.reduce(
                      (acc, plane) => {
                        acc[plane.status] = (acc[plane.status] || 0) + 1
                        return acc
                      },
                      {} as Record<string, number>,
                    ),
                  ).map(([status, count]) => (
                    <div key={status} className="flex justify-between">
                      <span className="capitalize">{status.replace("_", " ")}</span>
                      <Badge variant="outline">{count}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
