"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users, Search, MapPin, Activity, UserCheck } from "lucide-react"
import { apiClient } from "@/lib/api"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "@/hooks/use-toast"
import { Navbar } from "@/components/layout/Navbar"

interface CrewMember {
  id: string
  employee_id: string
  first_name: string
  last_name: string
  position: string
  status: string
  base_airport: string
}

export default function CrewPage() {
  const [crew, setCrew] = useState<CrewMember[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [availableByPosition, setAvailableByPosition] = useState<any>({})
  const { hasAnyRole } = useAuth()

  useEffect(() => {
    if (hasAnyRole(["admin"])) {
      loadCrew()
      loadAvailableByPosition()
    } else {
      setLoading(false)
    }
  }, [hasAnyRole])

  const loadCrew = async () => {
    try {
      setLoading(true)
      const data = await apiClient.getCrew()
      setCrew(data)
    } catch (error) {
      console.error("Error loading crew:", error)
      toast({
        title: "Error",
        description: "Failed to load crew members",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const loadAvailableByPosition = async () => {
    try {
      const data = await apiClient.getAvailableCrewByPosition()
      setAvailableByPosition(data.available_crew_by_position || {})
    } catch (error) {
      console.error("Error loading available crew by position:", error)
    }
  }

  const filteredCrew = crew.filter(
    (member) =>
      member.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.employee_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.base_airport.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    const colors = {
      available: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      on_duty: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      off_duty: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      sick_leave: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    }
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getPositionColor = (position: string) => {
    const colors = {
      captain: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      first_officer: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      flight_attendant: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      purser: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    }
    return colors[position as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  if (!hasAnyRole(["admin"])) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Access Denied</h3>
              <p className="text-muted-foreground">You don't have permission to view crew information</p>
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
          <h1 className="text-3xl font-bold mb-2">Crew Management</h1>
          <p className="text-muted-foreground">Manage flight crew members and assignments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Crew</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{crew.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
              <UserCheck className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {crew.filter((c) => c.status === "available").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">On Duty</CardTitle>
              <Activity className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {crew.filter((c) => c.status === "on_duty").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Positions</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Set(crew.map((c) => c.position)).size}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Search Crew</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <div className="flex-1">
                <Label htmlFor="search">Search by name, employee ID, position, or base airport</Label>
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

        {/* Crew Grid */}
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
        ) : filteredCrew.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No crew members found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? "Try a different search term" : "No crew members available"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCrew.map((member) => (
              <Card key={member.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">
                          {member.first_name} {member.last_name}
                        </h3>
                        <p className="text-sm text-muted-foreground">ID: {member.employee_id}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(member.status)}>
                      {member.status.replace("_", " ").toUpperCase()}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Position:</span>
                      <Badge className={getPositionColor(member.position)}>
                        {member.position.replace("_", " ").toUpperCase()}
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Base Airport:</span>
                      <span className="text-sm font-medium flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {member.base_airport}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Employee ID</span>
                      <span className="font-mono font-bold">{member.employee_id}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Available Crew by Position */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Available Crew by Position</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(availableByPosition).map(([position, members]: [string, any]) => (
                <div key={position} className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2 capitalize">{position.replace("_", " ")}</h4>
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    {Array.isArray(members) ? members.length : 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Available</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Crew Summary */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Crew Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">By Position</h4>
                <div className="space-y-2">
                  {Object.entries(
                    crew.reduce(
                      (acc, member) => {
                        acc[member.position] = (acc[member.position] || 0) + 1
                        return acc
                      },
                      {} as Record<string, number>,
                    ),
                  ).map(([position, count]) => (
                    <div key={position} className="flex justify-between">
                      <span className="capitalize">{position.replace("_", " ")}</span>
                      <Badge variant="outline">{count}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">By Base Airport</h4>
                <div className="space-y-2">
                  {Object.entries(
                    crew.reduce(
                      (acc, member) => {
                        acc[member.base_airport] = (acc[member.base_airport] || 0) + 1
                        return acc
                      },
                      {} as Record<string, number>,
                    ),
                  ).map(([airport, count]) => (
                    <div key={airport} className="flex justify-between">
                      <span>{airport}</span>
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
