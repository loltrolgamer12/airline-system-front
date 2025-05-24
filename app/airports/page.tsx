import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Building2, MapPin, Plane } from "lucide-react"
import Link from "next/link"

const airports = [
  {
    iataCode: "JFK",
    name: "John F. Kennedy International Airport",
    city: "Nueva York",
    country: "Estados Unidos",
    timezone: "EST",
    runways: 4,
    terminals: 6,
    status: "Activo",
    dailyFlights: 1200,
    coordinates: "40.6413° N, 73.7781° W",
  },
  {
    iataCode: "LAX",
    name: "Los Angeles International Airport",
    city: "Los Ángeles",
    country: "Estados Unidos",
    timezone: "PST",
    runways: 4,
    terminals: 9,
    status: "Activo",
    dailyFlights: 1800,
    coordinates: "33.9425° N, 118.4081° W",
  },
  {
    iataCode: "MIA",
    name: "Miami International Airport",
    city: "Miami",
    country: "Estados Unidos",
    timezone: "EST",
    runways: 3,
    terminals: 3,
    status: "Activo",
    dailyFlights: 900,
    coordinates: "25.7617° N, 80.1918° W",
  },
  {
    iataCode: "BOG",
    name: "Aeropuerto Internacional El Dorado",
    city: "Bogotá",
    country: "Colombia",
    timezone: "COT",
    runways: 2,
    terminals: 2,
    status: "Activo",
    dailyFlights: 600,
    coordinates: "4.7016° N, 74.1469° W",
  },
  {
    iataCode: "MEX",
    name: "Aeropuerto Internacional de la Ciudad de México",
    city: "Ciudad de México",
    country: "México",
    timezone: "CST",
    runways: 2,
    terminals: 2,
    status: "Mantenimiento",
    dailyFlights: 800,
    coordinates: "19.4363° N, 99.0721° W",
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case "Activo":
      return "bg-green-100 text-green-800"
    case "Mantenimiento":
      return "bg-yellow-100 text-yellow-800"
    case "Cerrado":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function AirportsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Aeropuertos</h1>
          <p className="text-gray-600 mt-2">Administra aeropuertos con códigos IATA</p>
        </div>
        <Link href="/airports/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Registrar Aeropuerto
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Buscar por código IATA, nombre o ciudad..." className="pl-10" />
            </div>
            <Button variant="outline">Filtros</Button>
            <Button variant="outline">Mapa</Button>
          </div>
        </CardContent>
      </Card>

      {/* Airports Grid */}
      <div className="grid gap-6">
        {airports.map((airport) => (
          <Card key={airport.iataCode} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    {airport.iataCode} - {airport.name}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {airport.city}, {airport.country} • {airport.dailyFlights} vuelos diarios
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(airport.status)}>{airport.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Location Info */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Ubicación
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Código:</span> {airport.iataCode}
                    </p>
                    <p>
                      <span className="font-medium">Ciudad:</span> {airport.city}
                    </p>
                    <p>
                      <span className="font-medium">País:</span> {airport.country}
                    </p>
                    <p>
                      <span className="font-medium">Zona:</span> {airport.timezone}
                    </p>
                  </div>
                </div>

                {/* Infrastructure */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Infraestructura
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Pistas:</span> {airport.runways}
                    </p>
                    <p>
                      <span className="font-medium">Terminales:</span> {airport.terminals}
                    </p>
                    <p>
                      <span className="font-medium">Estado:</span> {airport.status}
                    </p>
                  </div>
                </div>

                {/* Operations */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Plane className="h-4 w-4" />
                    Operaciones
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Vuelos/día:</span> {airport.dailyFlights.toLocaleString()}
                    </p>
                    <p>
                      <span className="font-medium">Coordenadas:</span> {airport.coordinates}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Acciones</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full">
                      Ver Detalles
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      Vuelos
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      Estadísticas
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Total Aeropuertos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Activos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">5,300</div>
            <p className="text-xs text-muted-foreground">Vuelos Diarios</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">Pistas Totales</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
