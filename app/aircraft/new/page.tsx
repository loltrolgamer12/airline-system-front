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

export default function NewAircraftPage() {
  const [formData, setFormData] = useState({
    registration: "",
    manufacturer: "",
    model: "",
    capacity: "",
    yearManufactured: "",
    engineType: "",
    maxRange: "",
    cruiseSpeed: "",
    fuelCapacity: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Nuevo avión:", formData)
    // Aquí iría la lógica para guardar el avión
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/aircraft" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver a Aviones
        </Link>
        <h1 className="text-3xl font-bold">Registrar Nuevo Avión</h1>
        <p className="text-gray-600 mt-2">Ingresa la información técnica del avión</p>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="h-5 w-5" />
            Información del Avión
          </CardTitle>
          <CardDescription>Completa todos los campos requeridos para registrar el avión</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="registration">Matrícula *</Label>
                <Input
                  id="registration"
                  placeholder="ej. N123AA"
                  value={formData.registration}
                  onChange={(e) => handleChange("registration", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="manufacturer">Fabricante *</Label>
                <Select onValueChange={(value) => handleChange("manufacturer", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar fabricante" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="boeing">Boeing</SelectItem>
                    <SelectItem value="airbus">Airbus</SelectItem>
                    <SelectItem value="embraer">Embraer</SelectItem>
                    <SelectItem value="bombardier">Bombardier</SelectItem>
                    <SelectItem value="cessna">Cessna</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="model">Modelo *</Label>
                <Input
                  id="model"
                  placeholder="ej. 737-800"
                  value={formData.model}
                  onChange={(e) => handleChange("model", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearManufactured">Año de Fabricación *</Label>
                <Input
                  id="yearManufactured"
                  type="number"
                  placeholder="ej. 2020"
                  min="1950"
                  max="2024"
                  value={formData.yearManufactured}
                  onChange={(e) => handleChange("yearManufactured", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Capacity and Performance */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Capacidad y Rendimiento</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacidad de Pasajeros *</Label>
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
                  <Label htmlFor="maxRange">Alcance Máximo (km)</Label>
                  <Input
                    id="maxRange"
                    type="number"
                    placeholder="ej. 5000"
                    value={formData.maxRange}
                    onChange={(e) => handleChange("maxRange", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cruiseSpeed">Velocidad de Crucero (km/h)</Label>
                  <Input
                    id="cruiseSpeed"
                    type="number"
                    placeholder="ej. 850"
                    value={formData.cruiseSpeed}
                    onChange={(e) => handleChange("cruiseSpeed", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Engine and Fuel */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Motor y Combustible</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="engineType">Tipo de Motor</Label>
                  <Select onValueChange={(value) => handleChange("engineType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo de motor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="turbofan">Turbofan</SelectItem>
                      <SelectItem value="turbojet">Turbojet</SelectItem>
                      <SelectItem value="turboprop">Turboprop</SelectItem>
                      <SelectItem value="piston">Pistón</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fuelCapacity">Capacidad de Combustible (L)</Label>
                  <Input
                    id="fuelCapacity"
                    type="number"
                    placeholder="ej. 26000"
                    value={formData.fuelCapacity}
                    onChange={(e) => handleChange("fuelCapacity", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notas Adicionales</Label>
              <Textarea
                id="notes"
                placeholder="Información adicional sobre el avión..."
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex gap-4 pt-6">
              <Button type="submit" className="flex-1">
                Registrar Avión
              </Button>
              <Link href="/aircraft">
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
