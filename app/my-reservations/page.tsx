"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar, Plane, User, FileText, X, Star, Clock, Printer } from "lucide-react"
import { useAuth } from "../components/auth-provider"

const userReservations = [
  {
    id: "R001",
    confirmationCode: "Z6NKLP",
    flight: {
      number: "AA123",
      airline: "American Airlines",
      origin: "JFK",
      destination: "LAX",
      originName: "Nueva York",
      destinationName: "Los Ángeles",
      date: "2024-01-15",
      departure: "08:30",
      arrival: "11:45",
      duration: "5h 15m",
      aircraft: "Boeing 777",
      gate: "A12",
      terminal: "Terminal 4",
    },
    seat: "2A",
    class: "first",
    className: "Primera Clase",
    status: "Confirmada",
    price: 944.0,
    bookingDate: "2024-01-10",
    amenities: ["Wifi Premium", "Comida Gourmet", "Asiento Cama", "Lounge Access"],
    baggage: "2 maletas incluidas",
    mealPreference: "Vegetariana",
  },
  {
    id: "R002",
    confirmationCode: "M8XQRT",
    flight: {
      number: "UA456",
      airline: "United Airlines",
      origin: "LAX",
      destination: "MIA",
      originName: "Los Ángeles",
      destinationName: "Miami",
      date: "2024-01-20",
      departure: "14:20",
      arrival: "22:15",
      duration: "4h 55m",
      aircraft: "Airbus A320",
      gate: "B8",
      terminal: "Terminal 2",
    },
    seat: "12C",
    class: "economy",
    className: "Clase Comercial",
    status: "Pendiente",
    price: 444.0,
    bookingDate: "2024-01-12",
    amenities: ["Wifi", "Entretenimiento", "Bebidas"],
    baggage: "1 maleta incluida",
    mealPreference: "Estándar",
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case "Confirmada":
      return "bg-green-100 text-green-800"
    case "Pendiente":
      return "bg-yellow-100 text-yellow-800"
    case "Cancelada":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function MyReservationsPage() {
  const { user, isUser } = useAuth()
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [reservationToCancel, setReservationToCancel] = useState(null)

  if (!isUser()) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-red-600">Acceso no autorizado. Solo usuarios pueden ver sus reservas.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handlePrintPDF = (reservation) => {
    alert(`Generando PDF para la reserva ${reservation.confirmationCode}...
    
📄 El documento incluye:
• Información del vuelo
• Detalles del pasajero
• Código QR para check-in
• Términos y condiciones
    
Se descargará automáticamente.`)
  }

  const handleCancelFlight = (reservation) => {
    setReservationToCancel(reservation)
    setShowCancelDialog(true)
  }

  const confirmCancelation = () => {
    alert(`✈️ Reserva ${reservationToCancel.confirmationCode} cancelada exitosamente.

💙 Esperamos verte pronto en tu próximo vuelo. 

🌟 ¡Gracias por elegir ${reservationToCancel.flight.airline}! Estamos aquí para hacer realidad tus próximos viajes.

💰 El reembolso se procesará en 3-5 días hábiles.`)

    setShowCancelDialog(false)
    setReservationToCancel(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Mis Reservas</h1>
        <p className="text-gray-600 mt-2">Gestiona tus reservas de vuelos</p>
      </div>

      {/* User Info */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Información del Pasajero
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-medium">Nombre:</span>
              <span className="ml-2">{user?.name}</span>
            </div>
            <div>
              <span className="font-medium">Email:</span>
              <span className="ml-2">{user?.email}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reservations List */}
      <div className="space-y-6">
        {userReservations.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes reservas</h3>
                <p className="text-gray-500 mb-4">¡Reserva tu primer vuelo para comenzar a viajar!</p>
                <Button>Buscar Vuelos</Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          userReservations.map((reservation) => (
            <Card key={reservation.id} className="hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Calendar className="h-6 w-6" />
                      Reserva {reservation.confirmationCode}
                    </CardTitle>
                    <CardDescription className="mt-1 text-base">
                      Reservada el {reservation.bookingDate} • Vuelo {reservation.flight.number}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={getStatusColor(reservation.status)} size="lg">
                      {reservation.status}
                    </Badge>
                    <Badge
                      className={
                        reservation.class === "first" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                      }
                    >
                      {reservation.className}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Flight Route */}
                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">{reservation.flight.origin}</div>
                      <div className="text-sm text-gray-600">{reservation.flight.originName}</div>
                      <div className="text-xl font-semibold text-blue-600">{reservation.flight.departure}</div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="border-t-2 border-dashed border-blue-300 w-20"></div>
                      <div className="text-center">
                        <Plane className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                        <div className="text-sm text-gray-500">{reservation.flight.duration}</div>
                      </div>
                      <div className="border-t-2 border-dashed border-blue-300 w-20"></div>
                    </div>

                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">{reservation.flight.destination}</div>
                      <div className="text-sm text-gray-600">{reservation.flight.destinationName}</div>
                      <div className="text-xl font-semibold text-blue-600">{reservation.flight.arrival}</div>
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="font-semibold text-lg">{reservation.seat}</div>
                      <div className="text-sm text-gray-500">Asiento</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="font-semibold text-lg">{reservation.flight.gate}</div>
                      <div className="text-sm text-gray-500">Puerta</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="font-semibold text-lg">{reservation.flight.terminal}</div>
                      <div className="text-sm text-gray-500">Terminal</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="font-semibold text-lg">${reservation.price}</div>
                      <div className="text-sm text-gray-500">Total</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t">
                    {/* Ver Detalles */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Ver Detalles
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <Plane className="h-5 w-5" />
                            Detalles Completos - {reservation.confirmationCode}
                          </DialogTitle>
                          <DialogDescription>Información completa de tu reserva de vuelo</DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6">
                          {/* Información del Vuelo */}
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                              <Plane className="h-5 w-5" />
                              Información del Vuelo
                            </h3>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <span className="font-medium">Vuelo:</span> {reservation.flight.number}
                              </div>
                              <div>
                                <span className="font-medium">Aerolínea:</span> {reservation.flight.airline}
                              </div>
                              <div>
                                <span className="font-medium">Aeronave:</span> {reservation.flight.aircraft}
                              </div>
                              <div>
                                <span className="font-medium">Fecha:</span> {reservation.flight.date}
                              </div>
                              <div>
                                <span className="font-medium">Salida:</span> {reservation.flight.departure}
                              </div>
                              <div>
                                <span className="font-medium">Llegada:</span> {reservation.flight.arrival}
                              </div>
                              <div>
                                <span className="font-medium">Duración:</span> {reservation.flight.duration}
                              </div>
                              <div>
                                <span className="font-medium">Terminal:</span> {reservation.flight.terminal}
                              </div>
                              <div>
                                <span className="font-medium">Puerta:</span> {reservation.flight.gate}
                              </div>
                            </div>
                          </div>

                          {/* Información del Pasajero */}
                          <div className="bg-green-50 p-4 rounded-lg">
                            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                              <User className="h-5 w-5" />
                              Información del Pasajero
                            </h3>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <span className="font-medium">Nombre:</span> {user?.name}
                              </div>
                              <div>
                                <span className="font-medium">Email:</span> {user?.email}
                              </div>
                              <div>
                                <span className="font-medium">Asiento:</span> {reservation.seat}
                              </div>
                              <div>
                                <span className="font-medium">Clase:</span> {reservation.className}
                              </div>
                              <div>
                                <span className="font-medium">Equipaje:</span> {reservation.baggage}
                              </div>
                              <div>
                                <span className="font-medium">Comida:</span> {reservation.mealPreference}
                              </div>
                            </div>
                          </div>

                          {/* Servicios Incluidos */}
                          <div className="bg-purple-50 p-4 rounded-lg">
                            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                              <Star className="h-5 w-5" />
                              Servicios Incluidos
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                              {reservation.amenities.map((amenity, index) => (
                                <div key={index} className="flex items-center space-x-2 text-sm">
                                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                  <span>{amenity}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Información de Pago */}
                          <div className="bg-yellow-50 p-4 rounded-lg">
                            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                              <Clock className="h-5 w-5" />
                              Información de Reserva
                            </h3>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <span className="font-medium">Código:</span> {reservation.confirmationCode}
                              </div>
                              <div>
                                <span className="font-medium">Estado:</span> {reservation.status}
                              </div>
                              <div>
                                <span className="font-medium">Reservado:</span> {reservation.bookingDate}
                              </div>
                              <div>
                                <span className="font-medium">Total Pagado:</span> ${reservation.price}
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* Imprimir PDF */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={() => handlePrintPDF(reservation)}
                    >
                      <Printer className="h-4 w-4" />
                      Imprimir PDF
                    </Button>

                    {/* Cancelar Vuelo */}
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={() => handleCancelFlight(reservation)}
                    >
                      <X className="h-4 w-4" />
                      Cancelar Vuelo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Dialog de Cancelación */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <X className="h-5 w-5" />
              Cancelar Vuelo
            </DialogTitle>
            <DialogDescription>¿Estás seguro de que deseas cancelar esta reserva?</DialogDescription>
          </DialogHeader>

          {reservationToCancel && (
            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="font-semibold text-red-800 mb-2">Detalles de la reserva a cancelar:</h3>
                <div className="text-sm space-y-1">
                  <p>
                    <span className="font-medium">Vuelo:</span> {reservationToCancel.flight.number}
                  </p>
                  <p>
                    <span className="font-medium">Ruta:</span> {reservationToCancel.flight.origin} →{" "}
                    {reservationToCancel.flight.destination}
                  </p>
                  <p>
                    <span className="font-medium">Fecha:</span> {reservationToCancel.flight.date}
                  </p>
                  <p>
                    <span className="font-medium">Código:</span> {reservationToCancel.confirmationCode}
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-yellow-800 mb-2">Política de cancelación:</h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Reembolso completo disponible</li>
                  <li>• Procesamiento en 3-5 días hábiles</li>
                  <li>• Sin penalizaciones por cancelación</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowCancelDialog(false)} className="flex-1">
                  Mantener Reserva
                </Button>
                <Button variant="destructive" onClick={confirmCancelation} className="flex-1">
                  Confirmar Cancelación
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{userReservations.length}</div>
            <p className="text-xs text-muted-foreground">Total Reservas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{userReservations.filter((r) => r.status === "Confirmada").length}</div>
            <p className="text-xs text-muted-foreground">Confirmadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              ${userReservations.reduce((total, r) => total + r.price, 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Total Gastado</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
