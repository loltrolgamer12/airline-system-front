"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plane } from "lucide-react"
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
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Nuevo vuelo:", formData)
    // Aquí iría la lógica para guardar el vuelo
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
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
