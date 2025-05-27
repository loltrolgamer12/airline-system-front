"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Users, Search, Plus, Mail, Phone, Globe, Calendar } from "lucide-react"
import { apiClient } from "@/lib/api"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "@/hooks/use-toast"
import { Navbar } from "@/components/layout/Navbar"
import Link from "next/link"
import { format } from "date-fns"

interface Passenger {
  id: string
  identification_number: string
  first_name: string
  last_name: string
  nationality: string
  passport_number?: string
  birth_date: string
  email?: string
  phone?: string
  created_at: string
  updated_at: string
}

export default function PassengersPage() {
  const [passengers, setPassengers] = useState<Passenger[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const { hasAnyRole } = useAuth()

  useEffect(() => {
    if (hasAnyRole(["admin", "agent"])) {
      loadPassengers()
    } else {
      setLoading(false)
    }
  }, [hasAnyRole])

  const loadPassengers = async () => {
    try {
      setLoading(true)
      const data = await apiClient.getPassengers()
      setPassengers(data)
    } catch (error) {
      console.error("Error loading passengers:", error)
      toast({
        title: "Error",
        description: "Failed to load passengers",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const searchPassenger = async () => {
    if (!searchTerm.trim()) {
      loadPassengers()
      return
    }

    try {
      const passenger = await apiClient.getPassenger(searchTerm)
      setPassengers([passenger])
    } catch (error) {
      toast({
        title: "Not found",
        description: "Passenger not found",
        variant: "destructive",
      })
    }
  }

  const filteredPassengers = passengers.filter(
    (passenger) =>
      passenger.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      passenger.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      passenger.identification_number.includes(searchTerm) ||
      passenger.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (!hasAnyRole(["admin", "agent"])) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Access Denied</h3>
              <p className="text-muted-foreground">You don't have permission to view passenger information</p>
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Passengers</h1>
            <p className="text-muted-foreground">Manage passenger information and profiles</p>
          </div>
          <Link href="/passengers/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Passenger
            </Button>
          </Link>
        </div>

        {/* Search Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Search Passengers</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <div className="flex-1">
                <Label htmlFor="search">Search by name, ID, or email</Label>
                <Input
                  id="search"
                  placeholder="Enter search term..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-end space-x-2">
                <Button onClick={searchPassenger}>Search</Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    loadPassengers()
                  }}
                >
                  Clear
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Passengers List */}
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
        ) : filteredPassengers.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No passengers found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? "Try a different search term" : "Start by adding a new passenger"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredPassengers.map((passenger) => (
              <Card key={passenger.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">
                          {passenger.first_name} {passenger.last_name}
                        </h3>
                        <p className="text-muted-foreground">ID: {passenger.identification_number}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-blue-600">
                      {passenger.nationality}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    {passenger.email && (
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{passenger.email}</span>
                      </div>
                    )}

                    {passenger.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{passenger.phone}</span>
                      </div>
                    )}

                    {passenger.passport_number && (
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Passport: {passenger.passport_number}</span>
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Born: {format(new Date(passenger.birth_date), "MMM dd, yyyy")}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                    <span>Registered: {format(new Date(passenger.created_at), "MMM dd, yyyy")}</span>
                    <span>Updated: {format(new Date(passenger.updated_at), "MMM dd, yyyy")}</span>
                  </div>

                  <div className="flex space-x-2">
                    <Link href={`/passengers/${passenger.identification_number}`}>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </Link>
                    <Link href={`/passengers/${passenger.identification_number}/edit`}>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </Link>
                    <Link href={`/reservations/new?passenger=${passenger.identification_number}`}>
                      <Button size="sm">Book Flight</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
