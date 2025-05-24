import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Plane, Users, Wrench } from "lucide-react"
import Link from "next/link"

const aircraft = [
  {
    registration: "N123AA",
    model: "Boeing 737-800",
    manufacturer: "Boeing",
    capacity: 180,
    yearManufactured: 2018,
    status: "Activo",
    currentLocation: "JFK",
    totalFlightHours: 12450,
    lastMaintenance: "2024-01-10",
    nextMaintenance: "2024-02-10",
  },
  {
    registration: "N456UA",
    model: "Airbus A320",
    manufacturer: "Airbus",
    capacity: 150,
    yearManufactured: 2020,
    status: "En Vuelo",
    currentLocation: "En ruta LAX-MIA",
    totalFlightHours: 8920,
    lastMaintenance: "2024-01-05",
    nextMaintenance: "2024-02-05",
  },
  {
    registration: "N789DL",
    model: "Boeing 757-200",
    manufacturer: "Boeing",
    capacity: 200,
    yearManufactured: 2015,
    status: "Mantenimiento",
    currentLocation: "Hangar 3",
    totalFlightHours: 18750,
    lastMaintenance: "2024-01-12",
    nextMaintenance: "2024-01-20",
  },
  {
    registration: "N321SW",
    model: "Boeing 737 MAX 8",
    manufacturer: "Boeing",
    capacity: 175,
    yearManufactured: 2022,
    status: "Activo",
    currentLocation: "LAX",
    totalFlightHours: 3200,
    lastMaintenance: "2024-01-08",
    nextMaintenance: "2024-02-08",
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case "Activo":
      return "bg-green-100 text-green-800"
    case "En Vuelo":
      return "bg-blue-100 text-blue-800"
    case "Mantenimiento":
      return "bg-yellow-100 text-yellow-800"
    case "Fuera de Servicio":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function AircraftPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Aviones</h1>
          <p className="text-gray-600 mt-2">Administra la flota de aeronaves</p>
        </div>
        <Link href="/aircraft/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Registrar Avión
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Buscar por matrícula, modelo o ubicación..." className="pl-10" />
            </div>
            <Button variant="outline">Filtros</Button>
            <Button variant="outline">Exportar</Button>
          </div>
        </CardContent>
      </Card>

      {/* Aircraft Grid */}
      <div className="grid gap-6">
        {aircraft.map((plane) => (
          <Card key={plane.registration} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Plane className="h-5 w-5" />
                    {plane.registration} - {plane.model}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {plane.manufacturer} • Año {plane.yearManufactured} • {plane.totalFlightHours.toLocaleString()}{" "}
                    horas de vuelo
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(plane.status)}>{plane.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Basic Info */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Plane className="h-4 w-4" />
                    Información Básica
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Matrícula:</span> {plane.registration}
                    </p>
                    <p>
                      <span className="font-medium">Modelo:</span> {plane.model}
                    </p>
                    <p>
                      <span className="font-medium">Fabricante:</span> {plane.manufacturer}
                    </p>
                    <p>
                      <span className="font-medium">Año:</span> {plane.yearManufactured}
                    </p>
                  </div>
                </div>

                {/* Capacity */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Capacidad
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Pasajeros:</span> {plane.capacity}
                    </p>
                    <p>
                      <span className="font-medium">Ubicación:</span> {plane.currentLocation}
                    </p>
                    <p>
                      <span className="font-medium">Estado:</span> {plane.status}
                    </p>
                  </div>
                </div>

                {/* Maintenance */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Wrench className="h-4 w-4" />
                    Mantenimiento
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Último:</span> {plane.lastMaintenance}
                    </p>
                    <p>
                      <span className="font-medium">Próximo:</span> {plane.nextMaintenance}
                    </p>
                    <p>
                      <span className="font-medium">Horas:</span> {plane.totalFlightHours.toLocaleString()}
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
                      Historial
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      Programar Vuelo
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
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Total Aviones</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">705</div>
            <p className="text-xs text-muted-foreground">Capacidad Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Activos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">En Mantenimiento</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
