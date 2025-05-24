"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Search, Plane, Star, Wifi, Coffee, Utensils, ArrowLeft } from "lucide-react"
import { useAuth } from "../components/auth-provider"

const availableFlights = [
  {
    id: "AA123",
    airline: "American Airlines",
    origin: "JFK",
    destination: "LAX",
    originName: "Nueva York",
    destinationName: "Los Ángeles",
    departure: "08:30",
    arrival: "11:45",
    date: "2024-01-15",
    duration: "5h 15m",
    aircraft: "Boeing 777",
    prices: {
      economy: 299,
      first: 899,
    },
    available: {
      economy: 38,
      first: 8,
    },
    amenities: {
      economy: ["Wifi", "Entretenimiento", "Snacks"],
      first: ["Wifi Premium", "Comida Gourmet", "Asiento Cama", "Lounge Access"],
    },
  },
  {
    id: "UA456",
    airline: "United Airlines",
    origin: "LAX",
    destination: "MIA",
    originName: "Los Ángeles",
    destinationName: "Miami",
    departure: "14:20",
    arrival: "22:15",
    date: "2024-01-15",
    duration: "4h 55m",
    aircraft: "Airbus A320",
    prices: {
      economy: 399,
      first: 1199,
    },
    available: {
      economy: 22,
      first: 4,
    },
    amenities: {
      economy: ["Wifi", "Entretenimiento", "Bebidas"],
      first: ["Wifi Premium", "Comida Premium", "Asiento Reclinable", "Servicio Personalizado"],
    },
  },
  {
    id: "DL789",
    airline: "Delta Airlines",
    origin: "MIA",
    destination: "JFK",
    originName: "Miami",
    destinationName: "Nueva York",
    departure: "16:45",
    arrival: "19:30",
    date: "2024-01-16",
    duration: "2h 45m",
    aircraft: "Boeing 737",
    prices: {
      economy: 249,
      first: 749,
    },
    available: {
      economy: 45,
      first: 12,
    },
    amenities: {
      economy: ["Wifi", "Snacks", "Entretenimiento"],
      first: ["Wifi Premium", "Comida Premium", "Asiento Premium", "Embarque Prioritario"],
    },
  },
]

export default function BookFlightPage() {
  const { user, isUser } = useAuth()
  const [searchParams, setSearchParams] = useState({
    origin: "",
    destination: "",
    date: "",
    passengers: "1",
  })
  const [selectedFlight, setSelectedFlight] = useState(null)
  const [selectedClass, setSelectedClass] = useState("economy")
  const [step, setStep] = useState(1) // 1: Buscar, 2: Seleccionar, 3: Clase, 4: Confirmar

  // Redirigir si no es usuario
  if (!isUser()) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-red-600">Acceso no autorizado. Solo usuarios pueden comprar vuelos.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleSearch = () => {
    if (searchParams.origin && searchParams.destination && searchParams.date) {
      setStep(2)
    }
  }

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight)
    setStep(3)
  }

  const handleSelectClass = () => {
    setStep(4)
  }

  const handleConfirmPurchase = () => {
    const totalPrice = selectedFlight.prices[selectedClass] + 45 // Incluir tasas
    alert(`¡Compra confirmada! 
    
Vuelo: ${selectedFlight.id}
Clase: ${selectedClass === "economy" ? "Comercial" : "Primera Clase"}
Total: $${totalPrice}
    
Se ha enviado la confirmación a ${user?.email}`)

    // Resetear formulario
    setStep(1)
    setSelectedFlight(null)
    setSelectedClass("economy")
    setSearchParams({ origin: "", destination: "", date: "", passengers: "1" })
  }

  const getClassIcon = (amenity) => {
    switch (amenity) {
      case "Wifi":
      case "Wifi Premium":
        return <Wifi className="h-4 w-4" />
      case "Comida Gourmet":
      case "Comida Premium":
        return <Utensils className="h-4 w-4" />
      case "Entretenimiento":
        return <Star className="h-4 w-4" />
      default:
        return <Coffee className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Comprar Vuelo</h1>
          <p className="text-gray-600 mt-2 text-lg">Encuentra y compra tu vuelo ideal</p>
        </div>

        {/* Paso 1: Búsqueda */}
        {step === 1 && (
          <Card className="max-w-4xl mx-auto shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Search className="h-6 w-6" />
                Buscar Vuelos
              </CardTitle>
              <CardDescription className="text-blue-100">
                Ingresa los detalles de tu viaje para encontrar los mejores vuelos
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="origin" className="text-lg font-medium">
                    Origen
                  </Label>
                  <Select onValueChange={(value) => setSearchParams({ ...searchParams, origin: value })}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="¿Desde dónde viajas?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="JFK">🗽 JFK - Nueva York</SelectItem>
                      <SelectItem value="LAX">🌴 LAX - Los Ángeles</SelectItem>
                      <SelectItem value="MIA">🏖️ MIA - Miami</SelectItem>
                      <SelectItem value="ORD">🏙️ ORD - Chicago</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination" className="text-lg font-medium">
                    Destino
                  </Label>
                  <Select onValueChange={(value) => setSearchParams({ ...searchParams, destination: value })}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="¿A dónde vas?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="JFK">🗽 JFK - Nueva York</SelectItem>
                      <SelectItem value="LAX">🌴 LAX - Los Ángeles</SelectItem>
                      <SelectItem value="MIA">🏖️ MIA - Miami</SelectItem>
                      <SelectItem value="ORD">🏙️ ORD - Chicago</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date" className="text-lg font-medium">
                    Fecha
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    className="h-12"
                    value={searchParams.date}
                    onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passengers" className="text-lg font-medium">
                    Pasajeros
                  </Label>
                  <Select onValueChange={(value) => setSearchParams({ ...searchParams, passengers: value })}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="1" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Pasajero</SelectItem>
                      <SelectItem value="2">2 Pasajeros</SelectItem>
                      <SelectItem value="3">3 Pasajeros</SelectItem>
                      <SelectItem value="4">4 Pasajeros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={handleSearch}
                className="w-full mt-8 h-14 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                disabled={!searchParams.origin || !searchParams.destination || !searchParams.date}
              >
                <Search className="h-5 w-5 mr-2" />
                Buscar Vuelos Disponibles
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Paso 2: Selección de Vuelo */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">Vuelos Disponibles</h2>
              <Button variant="outline" onClick={() => setStep(1)} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Modificar Búsqueda
              </Button>
            </div>

            <div className="grid gap-6">
              {availableFlights
                .filter(
                  (flight) =>
                    flight.origin === searchParams.origin &&
                    flight.destination === searchParams.destination &&
                    flight.date === searchParams.date,
                )
                .map((flight) => (
                  <Card
                    key={flight.id}
                    className="hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-300"
                  >
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-8">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900">{flight.origin}</div>
                            <div className="text-sm text-gray-500">{flight.originName}</div>
                            <div className="text-xl font-semibold text-blue-600">{flight.departure}</div>
                          </div>

                          <div className="flex items-center space-x-4">
                            <div className="border-t-2 border-dashed border-gray-300 w-20"></div>
                            <div className="text-center">
                              <Plane className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                              <div className="text-sm text-gray-500">{flight.duration}</div>
                            </div>
                            <div className="border-t-2 border-dashed border-gray-300 w-20"></div>
                          </div>

                          <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900">{flight.destination}</div>
                            <div className="text-sm text-gray-500">{flight.destinationName}</div>
                            <div className="text-xl font-semibold text-blue-600">{flight.arrival}</div>
                          </div>
                        </div>

                        <div className="text-right space-y-3">
                          <div>
                            <div className="text-sm text-gray-500">Desde</div>
                            <div className="text-3xl font-bold text-green-600">${flight.prices.economy}</div>
                          </div>
                          <Button
                            onClick={() => handleSelectFlight(flight)}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                          >
                            Seleccionar Vuelo
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
                        <div>
                          <span className="font-medium text-gray-700">Aerolínea:</span>
                          <span className="ml-2">{flight.airline}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Aeronave:</span>
                          <span className="ml-2">{flight.aircraft}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Vuelo:</span>
                          <span className="ml-2">{flight.id}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* Paso 3: Selección de Clase */}
        {step === 3 && selectedFlight && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">Seleccionar Clase</h2>
              <Button variant="outline" onClick={() => setStep(2)} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Cambiar Vuelo
              </Button>
            </div>

            {/* Información del vuelo seleccionado */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {selectedFlight.origin} → {selectedFlight.destination}
                    </h3>
                    <p className="text-gray-600">
                      {selectedFlight.originName} → {selectedFlight.destinationName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedFlight.date} • {selectedFlight.departure} - {selectedFlight.arrival} •{" "}
                      {selectedFlight.duration}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">{selectedFlight.airline}</div>
                    <div className="text-sm text-gray-500">Vuelo {selectedFlight.id}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selección de clase */}
            <RadioGroup value={selectedClass} onValueChange={setSelectedClass} className="space-y-4">
              {/* Clase Comercial */}
              <Card
                className={`cursor-pointer transition-all duration-300 ${selectedClass === "economy" ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-lg"}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <RadioGroupItem value="economy" id="economy" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <Label htmlFor="economy" className="text-xl font-bold cursor-pointer">
                            Clase Comercial
                          </Label>
                          <p className="text-gray-600">Comodidad esencial para tu viaje</p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-blue-600">${selectedFlight.prices.economy}</div>
                          <div className="text-sm text-gray-500">
                            {selectedFlight.available.economy} asientos disponibles
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {selectedFlight.amenities.economy.map((amenity, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            {getClassIcon(amenity)}
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Primera Clase */}
              <Card
                className={`cursor-pointer transition-all duration-300 ${selectedClass === "first" ? "ring-2 ring-purple-500 bg-purple-50" : "hover:shadow-lg"}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <RadioGroupItem value="first" id="first" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <Label htmlFor="first" className="text-xl font-bold cursor-pointer flex items-center gap-2">
                            Primera Clase
                            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">Premium</Badge>
                          </Label>
                          <p className="text-gray-600">Experiencia de lujo y máximo confort</p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-purple-600">${selectedFlight.prices.first}</div>
                          <div className="text-sm text-gray-500">
                            {selectedFlight.available.first} asientos disponibles
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {selectedFlight.amenities.first.map((amenity, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            {getClassIcon(amenity)}
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </RadioGroup>

            <Button
              onClick={handleSelectClass}
              className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Continuar con {selectedClass === "economy" ? "Clase Comercial" : "Primera Clase"}
            </Button>
          </div>
        )}

        {/* Paso 4: Confirmación y Pago */}
        {step === 4 && selectedFlight && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">Confirmar Compra</h2>
              <Button variant="outline" onClick={() => setStep(3)} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Cambiar Clase
              </Button>
            </div>

            {/* Resumen del vuelo */}
            <Card className="border-2 border-green-200">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="text-xl">Resumen de tu Vuelo</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-bold text-lg">
                        {selectedFlight.origin} → {selectedFlight.destination}
                      </h3>
                      <p className="text-gray-600">
                        {selectedFlight.originName} → {selectedFlight.destinationName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {selectedFlight.date} • {selectedFlight.departure} - {selectedFlight.arrival}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={
                          selectedClass === "economy" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                        }
                      >
                        {selectedClass === "economy" ? "Clase Comercial" : "Primera Clase"}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Pasajero:</span>
                      <span className="ml-2">{user?.name}</span>
                    </div>
                    <div>
                      <span className="font-medium">Email:</span>
                      <span className="ml-2">{user?.email}</span>
                    </div>
                    <div>
                      <span className="font-medium">Vuelo:</span>
                      <span className="ml-2">{selectedFlight.id}</span>
                    </div>
                    <div>
                      <span className="font-medium">Aerolínea:</span>
                      <span className="ml-2">{selectedFlight.airline}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resumen de pago */}
            <Card className="border-2 border-blue-200">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl">Resumen de Pago</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-lg">
                    <span>Precio del vuelo ({selectedClass === "economy" ? "Comercial" : "Primera Clase"})</span>
                    <span>${selectedFlight.prices[selectedClass]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tasas e impuestos</span>
                    <span>$45</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold text-2xl text-green-600">
                    <span>Total a Pagar</span>
                    <span>${selectedFlight.prices[selectedClass] + 45}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleConfirmPurchase}
              className="w-full h-16 text-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              💳 Confirmar Compra - ${selectedFlight.prices[selectedClass] + 45}
            </Button>

            <p className="text-center text-sm text-gray-500">
              Al confirmar la compra, aceptas nuestros términos y condiciones. Recibirás la confirmación por email.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
