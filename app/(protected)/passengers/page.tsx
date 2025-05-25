"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, User, Phone, Mail } from "lucide-react"
import Link from "next/link"

const passengers = [
  {
    id: "12345678",
    firstName: "Juan",
    lastName: "Pérez",
    email: "juan.perez@email.com",
    phone: "+57 300 123 4567",
    nationality: "Colombiana",
    documentType: "Cédula",
    birthDate: "1985-03-15",
    status: "Activo",
    totalFlights: 12,
  },
  {
    id: "87654321",
    firstName: "María",
    lastName: "García",
    email: "maria.garcia@email.com",
    phone: "+57 301 987 6543",
    nationality: "Colombiana",
    documentType: "Cédula",
    birthDate: "1990-07-22",
    status: "Activo",
    totalFlights: 8,
  },
  {
    id: "11223344",
    firstName: "Carlos",
    lastName: "Rodríguez",
    email: "carlos.rodriguez@email.com",
    phone: "+57 302 456 7890",
    nationality: "Colombiana",
    documentType: "Cédula",
    birthDate: "1978-11-08",
    status: "VIP",
    totalFlights: 25,
  },
  {
    id: "55667788",
    firstName: "Ana",
    lastName: "Martínez",
    email: "ana.martinez@email.com",
    phone: "+57 303 789 0123",
    nationality: "Colombiana",
    documentType: "Pasaporte",
    birthDate: "1992-05-30",
    status: "Activo",
    totalFlights: 5,
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case "Activo":
      return "bg-green-100 text-green-800"
    case "VIP":
      return "bg-purple-100 text-purple-800"
    case "Inactivo":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function PassengersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const handleViewProfile = (passengerId: string) => {
    alert(`Ver perfil del pasajero ${passengerId}`)
  }

  const handleEditPassenger = (passengerId: string) => {
    alert(`Editar pasajero ${passengerId}`)
  }

  const handleViewHistory = (passengerId: string) => {
    alert(`Ver historial del pasajero ${passengerId}`)
  }

  const handleNewReservation = (passengerId: string) => {
    alert(`Nueva reserva para pasajero ${passengerId}`)
  }

  const filteredPassengers = passengers.filter(
    (passenger) =>
      passenger.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      passenger.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      passenger.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      passenger.id.includes(searchTerm),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Pasajeros</h1>
          <p className="text-gray-600 mt-2">Administra la información de todos los pasajeros</p>
        </div>
        <Link href="/passengers/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Pasajero
          </Button>
        </Link>
      </div>

      {/* Search Bar */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por nombre, documento o email..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">Filtros</Button>
          </div>
        </CardContent>
      </Card>

      {/* Passengers List */}
      <div className="grid gap-4">
        {filteredPassengers.map((passenger) => (
          <Card key={passenger.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">
                      {passenger.firstName} {passenger.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {passenger.documentType}: {passenger.id}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-4 w-4" />
                        <span>{passenger.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="h-4 w-4" />
                        <span>{passenger.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <Badge className={getStatusColor(passenger.status)}>{passenger.status}</Badge>
                  <p className="text-sm text-gray-500">{passenger.totalFlights} vuelos</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Nacionalidad:</span>
                    <span className="ml-2 text-gray-600">{passenger.nationality}</span>
                  </div>
                  <div>
                    <span className="font-medium">Fecha de Nacimiento:</span>
                    <span className="ml-2 text-gray-600">{passenger.birthDate}</span>
                  </div>
                  <div>
                    <span className="font-medium">Total de Vuelos:</span>
                    <span className="ml-2 text-gray-600">{passenger.totalFlights}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={() => handleViewProfile(passenger.id)}>
                    Ver Perfil
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEditPassenger(passenger.id)}>
                    Editar
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleViewHistory(passenger.id)}>
                    Historial
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleNewReservation(passenger.id)}>
                    Nueva Reserva
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" disabled>
            Anterior
          </Button>
          <Button variant="outline" size="sm" className="bg-blue-50">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}
