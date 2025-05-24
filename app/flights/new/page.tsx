"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plane, Plus, X } from "lucide-react"
import Link from "next/link"

export default function NewFlightPage() {
  const [formData, setFormData] = useState({
    flightNumber: "",
    airline: "",
    aircraft: "",
    origin: "",
    destination: "",
    departureDate: "",
    departureTime: "",
    arrivalDate: "",
    arrivalTime: "",
    capacity: "",
    price: "",
    pilot: "",
    copilot: "",
    flightAttendants: "",
    notes: "",
  })

  const [stopovers, setStopovers] = useState([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Nuevo vuelo:", { ...formData, stopovers })
    // Aquí iría la lógica para guardar el vuelo
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addStopover = () => {
    setStopovers([
      ...stopovers,
      {
        airport: "",
        arrivalTime: "",
        departureTime: "",
        duration: "",
      },
    ])
  }

  const removeStopover = (index) => {
    setStopovers(stopovers.filter((_, i) => i !== index))
  }

  const updateStopover = (index, field, value) => {
    const updated = stopovers.map((stopover, i) => (i === index ? { ...stopover, [field]: value } : stopover))
    setStopovers(updated)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/flights" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver a Vuelos
        </Link>
        <h1 className="text-3xl font-bold">Crear Nuevo Vuelo</h1>
        <p className="text-gray-600 mt-2">Ingresa la información del nuevo vuelo</p>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="h-5 w-5" />
            Información del Vuelo
          </CardTitle>
          <CardDescription>Completa todos los campos requeridos para crear el vuelo</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="flightNumber">Número de Vuelo *</Label>
                <Input
                  id="flightNumber"
                  placeholder="ej. AA123"
                  value={formData.flightNumber}
                  onChange={(e) => handleChange("flightNumber", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="airline">Aerolínea *</Label>
                <Select onValueChange={(value) => handleChange("airline", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar aerolínea" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="american">American Airlines</SelectItem>
                    <SelectItem value="united">United Airlines</SelectItem>
                    <SelectItem value="delta">Delta Airlines</SelectItem>
                    <SelectItem value="southwest">Southwest Airlines</SelectItem>
                    <SelectItem value="jetblue">JetBlue Airways</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="aircraft">Aeronave *</Label>
                <Select onValueChange={(value) => handleChange("aircraft", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar aeronave" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="boeing737">Boeing 737</SelectItem>
                    <SelectItem value="boeing757">Boeing 757</SelectItem>
                    <SelectItem value="boeing777">Boeing 777</SelectItem>
                    <SelectItem value="airbus320">Airbus A320</SelectItem>
                    <SelectItem value="airbus330">Airbus A330</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Route Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="origin">Origen *</Label>
                <Select onValueChange={(value) => handleChange("origin", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Aeropuerto de origen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="JFK">JFK - Nueva York</SelectItem>
                    <SelectItem value="LAX">LAX - Los Ángeles</SelectItem>
                    <SelectItem value="MIA">MIA - Miami</SelectItem>
                    <SelectItem value="ORD">ORD - Chicago</SelectItem>
                    <SelectItem value="DFW">DFW - Dallas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Destino *</Label>
                <Select onValueChange={(value) => handleChange("destination", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Aeropuerto de destino" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="JFK">JFK - Nueva York</SelectItem>
                    <SelectItem value="LAX">LAX - Los Ángeles</SelectItem>
                    <SelectItem value="MIA">MIA - Miami</SelectItem>
                    <SelectItem value="ORD">ORD - Chicago</SelectItem>
                    <SelectItem value="DFW">DFW - Dallas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Schedule */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Salida</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="departureDate">Fecha *</Label>
                    <Input
                      id="departureDate"
                      type="date"
                      value={formData.departureDate}
                      onChange={(e) => handleChange("departureDate", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="departureTime">Hora *</Label>
                    <Input
                      id="departureTime"
                      type="time"
                      value={formData.departureTime}
                      onChange={(e) => handleChange("departureTime", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Llegada</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="arrivalDate">Fecha *</Label>
                    <Input
                      id="arrivalDate"
                      type="date"
                      value={formData.arrivalDate}
                      onChange={(e) => handleChange("arrivalDate", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="arrivalTime">Hora *</Label>
                    <Input
                      id="arrivalTime"
                      type="time"
                      value={formData.arrivalTime}
                      onChange={(e) => handleChange("arrivalTime", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacidad *</Label>
                <Input
                  id="capacity"
                  type="number"
                  placeholder="ej. 180"
                  value={formData.capacity}
                  onChange={(e) => handleChange("capacity", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Precio Base ($) *</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="ej. 299.99"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notas Adicionales</Label>
              <Textarea
                id="notes"
                placeholder="Información adicional sobre el vuelo..."
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                rows={3}
              />
            </div>

            {/* Aircraft and Crew Assignment */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Asignación de Aeronave y Tripulación</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="aircraft">Aeronave Asignada *</Label>
                  <Select onValueChange={(value) => handleChange("aircraft", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar aeronave" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="N123AA">N123AA - Boeing 737-800</SelectItem>
                      <SelectItem value="N456UA">N456UA - Airbus A320</SelectItem>
                      <SelectItem value="N789DL">N789DL - Boeing 757-200</SelectItem>
                      <SelectItem value="N321SW">N321SW - Boeing 737 MAX 8</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pilot">Piloto *</Label>
                  <Select onValueChange={(value) => handleChange("pilot", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar piloto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EMP001">Carlos Mendoza - EMP001</SelectItem>
                      <SelectItem value="EMP004">Luis Fernández - EMP004</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="copilot">Copiloto *</Label>
                  <Select onValueChange={(value) => handleChange("copilot", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar copiloto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EMP002">Ana García - EMP002</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="flightAttendants">Asistentes de Vuelo</Label>
                  <Select onValueChange={(value) => handleChange("flightAttendants", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar asistentes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EMP003">María Rodríguez - EMP003</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Stopovers Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Escalas Intermedias</h3>
                <Button type="button" variant="outline" onClick={addStopover}>
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Escala
                </Button>
              </div>

              {stopovers.length === 0 ? (
                <p className="text-gray-500 text-sm">No hay escalas programadas. Este es un vuelo directo.</p>
              ) : (
                <div className="space-y-4">
                  {stopovers.map((stopover, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium">Escala {index + 1}</h4>
                        <Button type="button" variant="destructive" size="sm" onClick={() => removeStopover(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Aeropuerto de Escala *</Label>
                          <Select onValueChange={(value) => updateStopover(index, "airport", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar aeropuerto" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ATL">ATL - Atlanta</SelectItem>
                              <SelectItem value="ORD">ORD - Chicago</SelectItem>
                              <SelectItem value="DFW">DFW - Dallas</SelectItem>
                              <SelectItem value="CLT">CLT - Charlotte</SelectItem>
                              <SelectItem value="PHX">PHX - Phoenix</SelectItem>
                              <SelectItem value="DEN">DEN - Denver</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Duración de Escala</Label>
                          <Input
                            placeholder="ej. 30 min"
                            value={stopover.duration}
                            onChange={(e) => updateStopover(index, "duration", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="space-y-2">
                          <Label>Hora de Llegada *</Label>
                          <Input
                            type="time"
                            value={stopover.arrivalTime}
                            onChange={(e) => updateStopover(index, "arrivalTime", e.target.value)}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Hora de Salida *</Label>
                          <Input
                            type="time"
                            value={stopover.departureTime}
                            onChange={(e) => updateStopover(index, "departureTime", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-4 pt-6">
              <Button type="submit" className="flex-1">
                Crear Vuelo
              </Button>
              <Link href="/flights">
                <Button type="button" variant="outline" className="px-8">
                  Cancelar
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
