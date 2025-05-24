"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Calendar, Search } from "lucide-react"
import Link from "next/link"

const availableFlights = [
  {
    id: "AA123",
    airline: "American Airlines",
    route: "JFK → LAX",
    date: "2024-01-15",
    departure: "08:30",
    arrival: "11:45",
    price: 299.99,
    available: 38,
  },
  {
    id: "UA456",
    airline: "United Airlines",
    route: "LAX → MIA",
    date: "2024-01-15",
    departure: "14:20",
    arrival: "22:15",
    price: 599.99,
    available: 22,
  },
]

const passengers = [
  { id: "12345678", name: "Juan Pérez", email: "juan.perez@email.com" },
  { id: "87654321", name: "María García", email: "maria.garcia@email.com" },
  { id: "11223344", name: "Carlos Rodríguez", email: "carlos.rodriguez@email.com" },
]

export default function NewReservationPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    passenger: "",
    flight: "",
    class: "",
    seat: "",
    specialRequests: "",
    contactPhone: "",
    emergencyContact: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Nueva reserva:", formData)
    // Aquí iría la lógica para crear la reserva
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/reservations" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver a Reservas
        </Link>
        <h1 className="text-3xl font-bold">Crear Nueva Reserva</h1>
        <p className="text-gray-600 mt-2">Proceso de reserva en {step} de 3 pasos</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            1
          </div>
          <div className={`w-16 h-1 ${step >= 2 ? "bg-blue-600" : "bg-gray-200"}`}></div>
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            2
          </div>
          <div className={`w-16 h-1 ${step >= 3 ? "bg-blue-600" : "bg-gray-200"}`}></div>
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            3
          </div>
        </div>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {step === 1 && "Seleccionar Pasajero"}
            {step === 2 && "Seleccionar Vuelo"}
            {step === 3 && "Confirmar Reserva"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Busca y selecciona el pasajero para la reserva"}
            {step === 2 && "Elige el vuelo y la clase de servicio"}
            {step === 3 && "Revisa y confirma los detalles de la reserva"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {/* Step 1: Select Passenger */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input placeholder="Buscar pasajero por nombre o documento..." className="pl-10" />
                  </div>

                  <div className="space-y-3">
                    <Label>Seleccionar Pasajero</Label>
                    {passengers.map((passenger) => (
                      <div
                        key={passenger.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          formData.passenger === passenger.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handleChange("passenger", passenger.id)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold">{passenger.name}</h3>
                            <p className="text-sm text-gray-600">Documento: {passenger.id}</p>
                            <p className="text-sm text-gray-600">{passenger.email}</p>
                          </div>
                          <div
                            className={`w-4 h-4 rounded-full border-2 ${
                              formData.passenger === passenger.id ? "border-blue-500 bg-blue-500" : "border-gray-300"
                            }`}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Select Flight */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>Vuelos Disponibles</Label>
                  {availableFlights.map((flight) => (
                    <div
                      key={flight.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        formData.flight === flight.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => handleChange("flight", flight.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">
                            {flight.id} - {flight.airline}
                          </h3>
                          <p className="text-sm text-gray-600">{flight.route}</p>
                          <p className="text-sm text-gray-600">
                            {flight.date} • {flight.departure} - {flight.arrival}
                          </p>
                          <p className="text-sm text-green-600">{flight.available} asientos disponibles</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold">${flight.price}</p>
                          <div
                            className={`w-4 h-4 rounded-full border-2 ${
                              formData.flight === flight.id ? "border-blue-500 bg-blue-500" : "border-gray-300"
                            }`}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {formData.flight && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="class">Clase de Servicio</Label>
                      <Select onValueChange={(value) => handleChange("class", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar clase" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="economica">Económica (+$0)</SelectItem>
                          <SelectItem value="ejecutiva">Ejecutiva (+$300)</SelectItem>
                          <SelectItem value="primera">Primera Clase (+$600)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="seat">Preferencia de Asiento</Label>
                      <Select onValueChange={(value) => handleChange("seat", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar asiento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ventana">Ventana</SelectItem>
                          <SelectItem value="pasillo">Pasillo</SelectItem>
                          <SelectItem value="centro">Centro</SelectItem>
                          <SelectItem value="sin_preferencia">Sin preferencia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Confirm Reservation */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Resumen de la Reserva</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Pasajero</h4>
                      <p className="text-sm text-gray-600">
                        {passengers.find((p) => p.id === formData.passenger)?.name}
                      </p>
                      <p className="text-sm text-gray-600">Documento: {formData.passenger}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Vuelo</h4>
                      <p className="text-sm text-gray-600">
                        {availableFlights.find((f) => f.id === formData.flight)?.id} -
                        {availableFlights.find((f) => f.id === formData.flight)?.airline}
                      </p>
                      <p className="text-sm text-gray-600">
                        {availableFlights.find((f) => f.id === formData.flight)?.route}
                      </p>
                      <p className="text-sm text-gray-600">Clase: {formData.class}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Teléfono de Contacto</Label>
                    <Input
                      id="contactPhone"
                      placeholder="ej. +57 300 123 4567"
                      value={formData.contactPhone}
                      onChange={(e) => handleChange("contactPhone", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Contacto de Emergencia</Label>
                    <Input
                      id="emergencyContact"
                      placeholder="ej. María Pérez - +57 301 987 6543"
                      value={formData.emergencyContact}
                      onChange={(e) => handleChange("emergencyContact", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Solicitudes Especiales</Label>
                  <Textarea
                    id="specialRequests"
                    placeholder="Comida especial, asistencia, equipaje adicional, etc."
                    value={formData.specialRequests}
                    onChange={(e) => handleChange("specialRequests", e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1}>
                Anterior
              </Button>

              {step < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={
                    (step === 1 && !formData.passenger) || (step === 2 && (!formData.flight || !formData.class))
                  }
                >
                  Siguiente
                </Button>
              ) : (
                <Button type="submit">Confirmar Reserva</Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
