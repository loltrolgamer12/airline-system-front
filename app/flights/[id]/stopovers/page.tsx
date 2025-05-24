"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Plus, Clock, Plane, X, Edit } from "lucide-react"
import Link from "next/link"

// Datos de ejemplo para el vuelo
const flightData = {
  id: "AA123",
  airline: "American Airlines",
  origin: "JFK",
  destination: "LAX",
  departure: "08:30",
  arrival: "11:45",
  date: "2024-01-15",
  aircraft: "Boeing 737-800",
}

const initialStopovers = [
  {
    id: 1,
    airport: "ORD",
    airportName: "Chicago O'Hare International",
    arrivalTime: "10:15",
    departureTime: "10:45",
    duration: "30 min",
    status: "Programado",
    gate: "B12",
    services: ["Combustible", "Limpieza", "Catering"],
  },
  {
    id: 2,
    airport: "DEN",
    airportName: "Denver International Airport",
    arrivalTime: "12:30",
    departureTime: "13:15",
    duration: "45 min",
    status: "Programado",
    gate: "A8",
    services: ["Combustible", "Mantenimiento Menor"],
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case "Programado":
      return "bg-blue-100 text-blue-800"
    case "En Progreso":
      return "bg-yellow-100 text-yellow-800"
    case "Completado":
      return "bg-green-100 text-green-800"
    case "Retrasado":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function FlightStopoversPage() {
  const [stopovers, setStopovers] = useState(initialStopovers)
  const [isEditing, setIsEditing] = useState(false)
  const [editingStopover, setEditingStopover] = useState(null)
  const [newStopover, setNewStopover] = useState({
    airport: "",
    arrivalTime: "",
    departureTime: "",
    duration: "",
    gate: "",
    services: [],
  })

  const addStopover = () => {
    if (newStopover.airport && newStopover.arrivalTime && newStopover.departureTime) {
      const stopover = {
        id: Date.now(),
        ...newStopover,
        airportName: getAirportName(newStopover.airport),
        status: "Programado",
      }
      setStopovers([...stopovers, stopover])
      setNewStopover({
        airport: "",
        arrivalTime: "",
        departureTime: "",
        duration: "",
        gate: "",
        services: [],
      })
    }
  }

  const removeStopover = (id: number) => {
    setStopovers(stopovers.filter((s) => s.id !== id))
  }

  const getAirportName = (code: string) => {
    const airports = {
      ATL: "Hartsfield-Jackson Atlanta International",
      ORD: "Chicago O'Hare International",
      DFW: "Dallas/Fort Worth International",
      CLT: "Charlotte Douglas International",
      PHX: "Phoenix Sky Harbor International",
      DEN: "Denver International Airport",
      LAS: "McCarran International Airport",
      SEA: "Seattle-Tacoma International",
    }
    return airports[code] || code
  }

  const calculateTotalDuration = () => {
    return stopovers.reduce((total, stopover) => {
      const duration = Number.parseInt(stopover.duration) || 0
      return total + duration
    }, 0)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/flights" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver a Vuelos
        </Link>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Escalas del Vuelo {flightData.id}</h1>
            <p className="text-gray-600 mt-2">
              {flightData.origin} → {flightData.destination} • {flightData.date} • {flightData.aircraft}
            </p>
          </div>
          <Button onClick={() => setIsEditing(!isEditing)}>
            <Edit className="h-4 w-4 mr-2" />
            {isEditing ? "Guardar Cambios" : "Editar Escalas"}
          </Button>
        </div>
      </div>

      {/* Flight Route Overview */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="h-5 w-5" />
            Ruta del Vuelo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="text-2xl font-bold">{flightData.origin}</div>
              <div className="text-sm text-gray-500">Salida</div>
              <div className="text-lg font-semibold">{flightData.departure}</div>
            </div>

            <div className="flex-1 mx-4">
              <div className="relative">
                <div className="border-t-2 border-dashed border-gray-300"></div>
                {stopovers.map((stopover, index) => (
                  <div
                    key={stopover.id}
                    className="absolute top-[-8px] bg-white px-2"
                    style={{ left: `${((index + 1) / (stopovers.length + 1)) * 100}%`, transform: "translateX(-50%)" }}
                  >
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <div className="text-xs text-center mt-1 font-medium">{stopover.airport}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold">{flightData.destination}</div>
              <div className="text-sm text-gray-500">Llegada</div>
              <div className="text-lg font-semibold">{flightData.arrival}</div>
            </div>
          </div>

          <div className="mt-4 text-center text-sm text-gray-600">
            {stopovers.length} escalas • Tiempo total de escalas: {calculateTotalDuration()} minutos
          </div>
        </CardContent>
      </Card>

      {/* Add New Stopover */}
      {isEditing && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Agregar Nueva Escala
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Aeropuerto</Label>
                <Select onValueChange={(value) => setNewStopover({ ...newStopover, airport: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ATL">ATL - Atlanta</SelectItem>
                    <SelectItem value="ORD">ORD - Chicago</SelectItem>
                    <SelectItem value="DFW">DFW - Dallas</SelectItem>
                    <SelectItem value="CLT">CLT - Charlotte</SelectItem>
                    <SelectItem value="PHX">PHX - Phoenix</SelectItem>
                    <SelectItem value="DEN">DEN - Denver</SelectItem>
                    <SelectItem value="LAS">LAS - Las Vegas</SelectItem>
                    <SelectItem value="SEA">SEA - Seattle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Llegada</Label>
                <Input
                  type="time"
                  value={newStopover.arrivalTime}
                  onChange={(e) => setNewStopover({ ...newStopover, arrivalTime: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Salida</Label>
                <Input
                  type="time"
                  value={newStopover.departureTime}
                  onChange={(e) => setNewStopover({ ...newStopover, departureTime: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Duración</Label>
                <Input
                  placeholder="ej. 30 min"
                  value={newStopover.duration}
                  onChange={(e) => setNewStopover({ ...newStopover, duration: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label>Puerta</Label>
                <Input
                  placeholder="ej. B12"
                  value={newStopover.gate}
                  onChange={(e) => setNewStopover({ ...newStopover, gate: e.target.value })}
                />
              </div>
            </div>

            <Button onClick={addStopover} className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Agregar Escala
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Stopovers List */}
      <div className="space-y-4">
        {stopovers.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay escalas programadas</h3>
                <p className="text-gray-500">Este es un vuelo directo sin escalas intermedias.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          stopovers.map((stopover, index) => (
            <Card key={stopover.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Escala {index + 1}: {stopover.airport}
                    </CardTitle>
                    <CardDescription className="mt-1">{stopover.airportName}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(stopover.status)}>{stopover.status}</Badge>
                    {isEditing && (
                      <Button variant="destructive" size="sm" onClick={() => removeStopover(stopover.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Timing */}
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Horarios
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Llegada:</span> {stopover.arrivalTime}
                      </p>
                      <p>
                        <span className="font-medium">Salida:</span> {stopover.departureTime}
                      </p>
                      <p>
                        <span className="font-medium">Duración:</span> {stopover.duration}
                      </p>
                    </div>
                  </div>

                  {/* Gate Info */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">Información de Puerta</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Puerta:</span> {stopover.gate || "Por asignar"}
                      </p>
                      <p>
                        <span className="font-medium">Estado:</span> {stopover.status}
                      </p>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">Servicios</h4>
                    <div className="flex flex-wrap gap-1">
                      {stopover.services.map((service, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">Acciones</h4>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full">
                        Ver Detalles
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        Actualizar Estado
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stopovers.length}</div>
            <p className="text-xs text-muted-foreground">Total Escalas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{calculateTotalDuration()}</div>
            <p className="text-xs text-muted-foreground">Minutos de Escala</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stopovers.filter((s) => s.status === "Programado").length}</div>
            <p className="text-xs text-muted-foreground">Programadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stopovers.filter((s) => s.status === "Completado").length}</div>
            <p className="text-xs text-muted-foreground">Completadas</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
