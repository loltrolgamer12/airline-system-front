"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Calendar, Plane, User } from "lucide-react"
import Link from "next/link"

const reservations = [
  {
    id: "R001",
    confirmationCode: "Z6NKLP",
    passenger: {
      name: "Juan Pérez",
      document: "12345678",
      email: "juan.perez@email.com",
    },
    flight: {
      number: "AA123",
      route: "JFK → LAX",
      date: "2024-01-15",
      time: "08:30",
    },
    seat: "12A",
    class: "Económica",
    status: "Confirmada",
    price: 299.99,
    bookingDate: "2024-01-10",
  },
  {
    id: "R002",
    confirmationCode: "M8XQRT",
    passenger: {
      name: "María García",
      document: "87654321",
      email: "maria.garcia@email.com",
    },
    flight: {
      number: "UA456",
      route: "LAX → MIA",
      date: "2024-01-15",
      time: "14:20",
    },
    seat: "8C",
    class: "Ejecutiva",
    status: "Check-in",
    price: 599.99,
    bookingDate: "2024-01-08",
  },
  {
    id: "R003",
    confirmationCode: "P4WLMN",
    passenger: {
      name: "Carlos Rodríguez",
      document: "11223344",
      email: "carlos.rodriguez@email.com",
    },
    flight: {
      number: "DL789",
      route: "MIA → JFK",
      date: "2024-01-16",
      time: "16:45",
    },
    seat: "3F",
    class: "Primera",
    status: "Pendiente",
    price: 899.99,
    bookingDate: "2024-01-12",
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case "Confirmada":
      return "bg-green-100 text-green-800"
    case "Check-in":
      return "bg-blue-100 text-blue-800"
    case "Pendiente":
      return "bg-yellow-100 text-yellow-800"
    case "Cancelada":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

function getClassColor(flightClass: string) {
  switch (flightClass) {
    case "Primera":
      return "bg-purple-100 text-purple-800"
    case "Ejecutiva":
      return "bg-blue-100 text-blue-800"
    case "Económica":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function ReservationsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const handleViewDetails = (reservationId: string) => {
    alert(`Ver detalles de la reserva ${reservationId}`)
  }

  const handleEditReservation = (reservationId: string) => {
    alert(`Editar reserva ${reservationId}`)
  }

  const handleCheckIn = (reservationId: string) => {
    alert(`Check-in para reserva ${reservationId}`)
  }

  const handlePrint = (reservationId: string) => {
    alert(`Imprimir reserva ${reservationId}`)
  }

  const handleCancel = (reservationId: string) => {
    if (confirm(`¿Estás seguro de que quieres cancelar la reserva ${reservationId}?`)) {
      alert(`Reserva ${reservationId} cancelada`)
    }
  }

  const filteredReservations = reservations.filter(
    (reservation) =>
      reservation.confirmationCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.passenger.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.flight.number.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Reservas</h1>
          <p className="text-gray-600 mt-2">Administra todas las reservas de vuelos</p>
        </div>
        <Link href="/reservations/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Reserva
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por código de confirmación, pasajero o vuelo..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">Filtros</Button>
            <Button variant="outline">Exportar</Button>
          </div>
        </CardContent>
      </Card>

      {/* Reservations List */}
      <div className="grid gap-6">
        {filteredReservations.map((reservation) => (
          <Card key={reservation.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Reserva {reservation.confirmationCode}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Reserva #{reservation.id} • Creada el {reservation.bookingDate}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge className={getStatusColor(reservation.status)}>{reservation.status}</Badge>
                  <Badge className={getClassColor(reservation.class)}>{reservation.class}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Passenger Info */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Información del Pasajero
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Nombre:</span> {reservation.passenger.name}
                    </p>
                    <p>
                      <span className="font-medium">Documento:</span> {reservation.passenger.document}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span> {reservation.passenger.email}
                    </p>
                  </div>
                </div>

                {/* Flight Info */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Plane className="h-4 w-4" />
                    Información del Vuelo
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Vuelo:</span> {reservation.flight.number}
                    </p>
                    <p>
                      <span className="font-medium">Ruta:</span> {reservation.flight.route}
                    </p>
                    <p>
                      <span className="font-medium">Fecha:</span> {reservation.flight.date}
                    </p>
                    <p>
                      <span className="font-medium">Hora:</span> {reservation.flight.time}
                    </p>
                    <p>
                      <span className="font-medium">Asiento:</span> {reservation.seat}
                    </p>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Detalles de la Reserva</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Clase:</span> {reservation.class}
                    </p>
                    <p>
                      <span className="font-medium">Precio:</span> ${reservation.price}
                    </p>
                    <p>
                      <span className="font-medium">Estado:</span> {reservation.status}
                    </p>
                    <p>
                      <span className="font-medium">Código:</span> {reservation.confirmationCode}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-6 pt-4 border-t">
                <Button variant="outline" size="sm" onClick={() => handleViewDetails(reservation.id)}>
                  Ver Detalles
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleEditReservation(reservation.id)}>
                  Editar
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleCheckIn(reservation.id)}>
                  Check-in
                </Button>
                <Button variant="outline" size="sm" onClick={() => handlePrint(reservation.id)}>
                  Imprimir
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleCancel(reservation.id)}>
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Total Reservas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">$1,799.97</div>
            <p className="text-xs text-muted-foreground">Valor Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Confirmadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Pendientes</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
