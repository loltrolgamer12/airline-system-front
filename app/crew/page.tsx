import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, User, Award, Calendar, Phone } from "lucide-react"
import Link from "next/link"

const crewMembers = [
  {
    employeeNumber: "EMP001",
    firstName: "Carlos",
    lastName: "Mendoza",
    position: "Piloto",
    certifications: ["ATPL", "B737", "A320"],
    licenseExpiry: "2025-06-15",
    totalFlightHours: 8500,
    phone: "+57 300 111 2222",
    email: "carlos.mendoza@airline.com",
    status: "Activo",
    currentAssignment: "Vuelo AA123",
  },
  {
    employeeNumber: "EMP002",
    firstName: "Ana",
    lastName: "García",
    position: "Copiloto",
    certifications: ["CPL", "B737", "IR"],
    licenseExpiry: "2024-12-20",
    totalFlightHours: 3200,
    phone: "+57 301 333 4444",
    email: "ana.garcia@airline.com",
    status: "Activo",
    currentAssignment: "Vuelo AA123",
  },
  {
    employeeNumber: "EMP003",
    firstName: "María",
    lastName: "Rodríguez",
    position: "Asistente de Vuelo",
    certifications: ["Seguridad", "Primeros Auxilios", "Servicio"],
    licenseExpiry: "2024-08-30",
    totalFlightHours: 2100,
    phone: "+57 302 555 6666",
    email: "maria.rodriguez@airline.com",
    status: "Activo",
    currentAssignment: "Disponible",
  },
  {
    employeeNumber: "EMP004",
    firstName: "Luis",
    lastName: "Fernández",
    position: "Piloto",
    certifications: ["ATPL", "B757", "B777"],
    licenseExpiry: "2025-03-10",
    totalFlightHours: 12000,
    phone: "+57 303 777 8888",
    email: "luis.fernandez@airline.com",
    status: "Descanso",
    currentAssignment: "Descanso obligatorio",
  },
]

function getPositionColor(position: string) {
  switch (position) {
    case "Piloto":
      return "bg-blue-100 text-blue-800"
    case "Copiloto":
      return "bg-green-100 text-green-800"
    case "Asistente de Vuelo":
      return "bg-purple-100 text-purple-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "Activo":
      return "bg-green-100 text-green-800"
    case "Descanso":
      return "bg-yellow-100 text-yellow-800"
    case "Licencia":
      return "bg-orange-100 text-orange-800"
    case "Inactivo":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function CrewPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Personal de Vuelo</h1>
          <p className="text-gray-600 mt-2">Gestiona pilotos, copilotos y asistentes de vuelo</p>
        </div>
        <Link href="/crew/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Registrar Personal
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Buscar por nombre, número de empleado o certificación..." className="pl-10" />
            </div>
            <Button variant="outline">Filtros</Button>
            <Button variant="outline">Horarios</Button>
          </div>
        </CardContent>
      </Card>

      {/* Crew Members List */}
      <div className="grid gap-6">
        {crewMembers.map((member) => (
          <Card key={member.employeeNumber} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    {member.firstName} {member.lastName}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {member.employeeNumber} • {member.totalFlightHours.toLocaleString()} horas de vuelo
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge className={getPositionColor(member.position)}>{member.position}</Badge>
                  <Badge className={getStatusColor(member.status)}>{member.status}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Personal Info */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Información Personal
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Empleado:</span> {member.employeeNumber}
                    </p>
                    <p>
                      <span className="font-medium">Posición:</span> {member.position}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span> {member.email}
                    </p>
                    <p className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {member.phone}
                    </p>
                  </div>
                </div>

                {/* Certifications */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    Certificaciones
                  </h4>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {member.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm">
                      <span className="font-medium">Vence:</span> {member.licenseExpiry}
                    </p>
                  </div>
                </div>

                {/* Flight Info */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Información de Vuelo
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Horas totales:</span> {member.totalFlightHours.toLocaleString()}
                    </p>
                    <p>
                      <span className="font-medium">Estado:</span> {member.status}
                    </p>
                    <p>
                      <span className="font-medium">Asignación:</span> {member.currentAssignment}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Acciones</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full">
                      Ver Perfil
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      Horarios
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      Asignar Vuelo
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
            <p className="text-xs text-muted-foreground">Total Personal</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Pilotos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Activos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">25,800</div>
            <p className="text-xs text-muted-foreground">Horas Totales</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
