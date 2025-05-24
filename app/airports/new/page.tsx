"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Building2 } from "lucide-react"
import Link from "next/link"

export default function NewAirportPage() {
  const [formData, setFormData] = useState({
    iataCode: "",
    icaoCode: "",
    name: "",
    city: "",
    country: "",
    timezone: "",
    latitude: "",
    longitude: "",
    elevation: "",
    runways: "",
    terminals: "",
    parkingSpaces: "",
    operatingHours: "",
    contactPhone: "",
    contactEmail: "",
    website: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Nuevo aeropuerto:", formData)
    // Aquí iría la lógica para guardar el aeropuerto
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/airports" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver a Aeropuertos
        </Link>
        <h1 className="text-3xl font-bold">Registrar Nuevo Aeropuerto</h1>
        <p className="text-gray-600 mt-2">Ingresa la información del aeropuerto con código IATA</p>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Información del Aeropuerto
          </CardTitle>
          <CardDescription>Completa todos los campos requeridos para registrar el aeropuerto</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="iataCode">Código IATA *</Label>
                <Input
                  id="iataCode"
                  placeholder="ej. JFK"
                  maxLength={3}
                  value={formData.iataCode}
                  onChange={(e) => handleChange("iataCode", e.target.value.toUpperCase())}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icaoCode">Código ICAO</Label>
                <Input
                  id="icaoCode"
                  placeholder="ej. KJFK"
                  maxLength={4}
                  value={formData.icaoCode}
                  onChange={(e) => handleChange("icaoCode", e.target.value.toUpperCase())}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Zona Horaria *</Label>
                <Select onValueChange={(value) => handleChange("timezone", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar zona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EST">EST - Eastern Standard Time</SelectItem>
                    <SelectItem value="CST">CST - Central Standard Time</SelectItem>
                    <SelectItem value="MST">MST - Mountain Standard Time</SelectItem>
                    <SelectItem value="PST">PST - Pacific Standard Time</SelectItem>
                    <SelectItem value="COT">COT - Colombia Time</SelectItem>
                    <SelectItem value="GMT">GMT - Greenwich Mean Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Aeropuerto *</Label>
              <Input
                id="name"
                placeholder="ej. John F. Kennedy International Airport"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>

            {/* Location */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Ubicación</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Ciudad *</Label>
                  <Input
                    id="city"
                    placeholder="ej. Nueva York"
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">País *</Label>
                  <Select onValueChange={(value) => handleChange("country", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar país" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="colombia">Colombia</SelectItem>
                      <SelectItem value="usa">Estados Unidos</SelectItem>
                      <SelectItem value="mexico">México</SelectItem>
                      <SelectItem value="argentina">Argentina</SelectItem>
                      <SelectItem value="brasil">Brasil</SelectItem>
                      <SelectItem value="chile">Chile</SelectItem>
                      <SelectItem value="peru">Perú</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Coordinates */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Coordenadas</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitud</Label>
                  <Input
                    id="latitude"
                    placeholder="ej. 40.6413"
                    value={formData.latitude}
                    onChange={(e) => handleChange("latitude", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitud</Label>
                  <Input
                    id="longitude"
                    placeholder="ej. -73.7781"
                    value={formData.longitude}
                    onChange={(e) => handleChange("longitude", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="elevation">Elevación (m)</Label>
                  <Input
                    id="elevation"
                    type="number"
                    placeholder="ej. 4"
                    value={formData.elevation}
                    onChange={(e) => handleChange("elevation", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Infrastructure */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Infraestructura</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="runways">Número de Pistas *</Label>
                  <Input
                    id="runways"
                    type="number"
                    placeholder="ej. 4"
                    min="1"
                    value={formData.runways}
                    onChange={(e) => handleChange("runways", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="terminals">Número de Terminales *</Label>
                  <Input
                    id="terminals"
                    type="number"
                    placeholder="ej. 6"
                    min="1"
                    value={formData.terminals}
                    onChange={(e) => handleChange("terminals", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parkingSpaces">Posiciones de Estacionamiento</Label>
                  <Input
                    id="parkingSpaces"
                    type="number"
                    placeholder="ej. 150"
                    value={formData.parkingSpaces}
                    onChange={(e) => handleChange("parkingSpaces", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Operations */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Operaciones</h3>
              <div className="space-y-2">
                <Label htmlFor="operatingHours">Horario de Operación</Label>
                <Input
                  id="operatingHours"
                  placeholder="ej. 24/7 o 06:00 - 22:00"
                  value={formData.operatingHours}
                  onChange={(e) => handleChange("operatingHours", e.target.value)}
                />
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Información de Contacto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Teléfono</Label>
                  <Input
                    id="contactPhone"
                    placeholder="ej. +1 718 244 4444"
                    value={formData.contactPhone}
                    onChange={(e) => handleChange("contactPhone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    placeholder="ej. info@jfkairport.com"
                    value={formData.contactEmail}
                    onChange={(e) => handleChange("contactEmail", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Sitio Web</Label>
                <Input
                  id="website"
                  placeholder="ej. https://www.jfkairport.com"
                  value={formData.website}
                  onChange={(e) => handleChange("website", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notas Adicionales</Label>
              <Textarea
                id="notes"
                placeholder="Información adicional sobre el aeropuerto..."
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex gap-4 pt-6">
              <Button type="submit" className="flex-1">
                Registrar Aeropuerto
              </Button>
              <Link href="/airports">
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
