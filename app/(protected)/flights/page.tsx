"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Plane, Clock, MapPin } from "lucide-react"
import Link from "next/link"

const flights = [
  {
    id: "AA123",
    airline: "American Airlines",
    origin: "JFK",
    destination: "LAX",
    departure: "08:30",
    arrival: "11:45",
    date: "2024-01-15",
    status: "Programado",
    aircraft: "Boeing 737",
    capacity: 180,
    occupied: 142,
  },
  {
    id: "UA456",
    airline: "United Airlines",
    origin: "LAX",
    destination: "MIA",
    departure: "14:20",
    arrival: "22:15",
    date: "2024-01-15",
    status: "En Vuelo",
    aircraft: "Airbus A320",
    capacity: 150,
    occupied: 128,
  },
  {
    id: "DL789",
    airline: "Delta Airlines",
    origin: "MIA",
    destination: "JFK",
    departure: "16:45",
    arrival: "19:30",
    date: "2024-01-15",
    status: "Retrasado",
    aircraft: "Boeing 757",
    capacity: 200,
    occupied: 165,
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case "Programado":
      return "bg-blue-100 text-blue-800"
    case "En Vuelo":
      return "bg-green-100 text-green-800"
    case "Retrasado":
      return "bg-red-100 text-red-800"
    case "Completado":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function FlightsPage() {
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null)

  const handleViewDetails = (flightId: string) => {
    alert(`Ver detalles del vuelo ${flightId}`)
  }

  const handleEditFlight = (flightId: string) => {
    alert(`Editar vuelo ${flightId}`)
  }

  const handleViewPassengers = (flightId: string) => {
    alert(`Ver pasajeros del vuelo ${flightId}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Vuelos</h1>
          <p className="text-gray-600 mt-2">Administra todos los vuelos programados</p>
        </div>
        <Link href="/flights/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Vuelo
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {flights.map((flight) => (
          <Card key={flight.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Plane className="h-5 w-5" />
                    {flight.id} - {flight.airline}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {flight.aircraft} • Capacidad: {flight.capacity} pasajeros
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(flight.status)}>{flight.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Route Info */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{flight.origin}</div>
                      <div className="text-sm text-gray-500">Salida</div>
                      <div className="text-lg font-semibold">{flight.departure}</div>
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="border-t-2 border-dashed border-gray-300 relative">
                        <Plane className="h-4 w-4 absolute top-[-8px] left-1/2 transform -translate-x-1/2 text-gray-400" />
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{flight.destination}</div>
                      <div className="text-sm text-gray-500">Llegada</div>
                      <div className="text-lg font-semibold">{flight.arrival}</div>
                    </div>
                  </div>
                </div>

                {/* Flight Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Fecha: {flight.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      Ruta: {flight.origin} → {flight.destination}
                    </span>
                  </div>
                </div>

                {/* Occupancy */}
                <div className="space-y-2">
                  <div className="text-sm font-medium">
                    Ocupación: {flight.occupied}/{flight.capacity}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(flight.occupied / flight.capacity) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {Math.round((flight.occupied / flight.capacity) * 100)}% ocupado
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <Button variant="outline" size="sm" onClick={() => handleViewDetails(flight.id)}>
                  Ver Detalles
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleEditFlight(flight.id)}>
                  Editar
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleViewPassengers(flight.id)}>
                  Pasajeros
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
