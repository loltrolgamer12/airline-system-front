"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, User } from "lucide-react"
import Link from "next/link"

const availableCertifications = [
  { id: "atpl", label: "ATPL - Airline Transport Pilot License" },
  { id: "cpl", label: "CPL - Commercial Pilot License" },
  { id: "ir", label: "IR - Instrument Rating" },
  { id: "b737", label: "Boeing 737 Type Rating" },
  { id: "b757", label: "Boeing 757 Type Rating" },
  { id: "b777", label: "Boeing 777 Type Rating" },
  { id: "a320", label: "Airbus A320 Type Rating" },
  { id: "a330", label: "Airbus A330 Type Rating" },
  { id: "safety", label: "Certificación de Seguridad" },
  { id: "firstaid", label: "Primeros Auxilios" },
  { id: "service", label: "Servicio al Cliente" },
]

export default function NewCrewPage() {
  const [formData, setFormData] = useState({
    employeeNumber: "",
    firstName: "",
    lastName: "",
    position: "",
    birthDate: "",
    nationality: "",
    phone: "",
    email: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
    licenseNumber: "",
    licenseExpiry: "",
    totalFlightHours: "",
    medicalExpiry: "",
    notes: "",
  })

  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Nuevo personal:", { ...formData, certifications: selectedCertifications })
    // Aquí iría la lógica para guardar el personal
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCertificationChange = (certId: string, checked: boolean) => {
    if (checked) {
      setSelectedCertifications((prev) => [...prev, certId])
    } else {
      setSelectedCertifications((prev) => prev.filter((id) => id !== certId))
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/crew" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver a Personal
        </Link>
        <h1 className="text-3xl font-bold">Registrar Personal de Vuelo</h1>
        <p className="text-gray-600 mt-2">Ingresa la información del nuevo miembro de la tripulación</p>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Información del Personal
          </CardTitle>
          <CardDescription>Completa todos los campos requeridos para registrar al personal</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employeeNumber">Número de Empleado *</Label>
                <Input
                  id="employeeNumber"
                  placeholder="ej. EMP001"
                  value={formData.employeeNumber}
                  onChange={(e) => handleChange("employeeNumber", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombres *</Label>
                <Input
                  id="firstName"
                  placeholder="ej. Carlos"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Apellidos *</Label>
                <Input
                  id="lastName"
                  placeholder="ej. Mendoza"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="position">Posición *</Label>
                <Select onValueChange={(value) => handleChange("position", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar posición" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="piloto">Piloto</SelectItem>
                    <SelectItem value="copiloto">Copiloto</SelectItem>
                    <SelectItem value="asistente">Asistente de Vuelo</SelectItem>
                    <SelectItem value="ingeniero">Ingeniero de Vuelo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthDate">Fecha de Nacimiento *</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleChange("birthDate", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nationality">Nacionalidad *</Label>
                <Select onValueChange={(value) => handleChange("nationality", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar nacionalidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="colombiana">Colombiana</SelectItem>
                    <SelectItem value="estadounidense">Estadounidense</SelectItem>
                    <SelectItem value="mexicana">Mexicana</SelectItem>
                    <SelectItem value="argentina">Argentina</SelectItem>
                    <SelectItem value="brasileña">Brasileña</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Información de Contacto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input
                    id="phone"
                    placeholder="ej. +57 300 123 4567"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ej. carlos.mendoza@airline.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  placeholder="ej. Calle 123 #45-67"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contacto de Emergencia</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Nombre del Contacto</Label>
                  <Input
                    id="emergencyContact"
                    placeholder="ej. María Mendoza"
                    value={formData.emergencyContact}
                    onChange={(e) => handleChange("emergencyContact", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Teléfono de Emergencia</Label>
                  <Input
                    id="emergencyPhone"
                    placeholder="ej. +57 301 987 6543"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleChange("emergencyPhone", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Professional Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Información Profesional</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">Número de Licencia</Label>
                  <Input
                    id="licenseNumber"
                    placeholder="ej. ATPL123456"
                    value={formData.licenseNumber}
                    onChange={(e) => handleChange("licenseNumber", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licenseExpiry">Vencimiento de Licencia</Label>
                  <Input
                    id="licenseExpiry"
                    type="date"
                    value={formData.licenseExpiry}
                    onChange={(e) => handleChange("licenseExpiry", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalFlightHours">Horas de Vuelo Totales</Label>
                  <Input
                    id="totalFlightHours"
                    type="number"
                    placeholder="ej. 5000"
                    value={formData.totalFlightHours}
                    onChange={(e) => handleChange("totalFlightHours", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medicalExpiry">Vencimiento Médico</Label>
                  <Input
                    id="medicalExpiry"
                    type="date"
                    value={formData.medicalExpiry}
                    onChange={(e) => handleChange("medicalExpiry", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Certificaciones</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableCertifications.map((cert) => (
                  <div key={cert.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={cert.id}
                      checked={selectedCertifications.includes(cert.id)}
                      onCheckedChange={(checked) => handleCertificationChange(cert.id, checked as boolean)}
                    />
                    <Label htmlFor={cert.id} className="text-sm">
                      {cert.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notas Adicionales</Label>
              <Textarea
                id="notes"
                placeholder="Información adicional sobre el personal..."
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex gap-4 pt-6">
              <Button type="submit" className="flex-1">
                Registrar Personal
              </Button>
              <Link href="/crew">
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
