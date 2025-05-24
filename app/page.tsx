"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plane, Users, Calendar, TrendingUp, Building2, UserCheck, Search } from "lucide-react"
import Link from "next/link"
import { WelcomeMessage } from "./components/welcome-message"
import { useAuth } from "./components/auth-provider"
import { Badge } from "@/components/ui/badge"

export default function Dashboard() {
  const { isAdmin, isUser, user } = useAuth()

  // Dashboard para Administradores
  if (isAdmin()) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <WelcomeMessage />

          {/* Stats Cards para Admin */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vuelos Activos</CardTitle>
                <Plane className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+2 desde ayer</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reservas Hoy</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">+12% vs ayer</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pasajeros</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground">Total registrados</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ocupación</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89%</div>
                <p className="text-xs text-muted-foreground">Promedio mensual</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions para Admin */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="h-5 w-5 text-blue-600" />
                  Gestión de Vuelos
                </CardTitle>
                <CardDescription>Administra horarios, rutas y tripulación</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link href="/flights">
                    <Button className="w-full">Ver Todos los Vuelos</Button>
                  </Link>
                  <Link href="/flights/new">
                    <Button variant="outline" className="w-full">
                      Crear Nuevo Vuelo
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  Gestión de Pasajeros
                </CardTitle>
                <CardDescription>Registra y administra pasajeros</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link href="/passengers">
                    <Button className="w-full">Ver Pasajeros</Button>
                  </Link>
                  <Link href="/passengers/new">
                    <Button variant="outline" className="w-full">
                      Registrar Pasajero
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  Gestión de Reservas
                </CardTitle>
                <CardDescription>Administra todas las reservas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link href="/reservations">
                    <Button className="w-full">Ver Reservas</Button>
                  </Link>
                  <Link href="/reservations/new">
                    <Button variant="outline" className="w-full">
                      Nueva Reserva
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="h-5 w-5 text-orange-600" />
                  Gestión de Aviones
                </CardTitle>
                <CardDescription>Administra la flota de aeronaves</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link href="/aircraft">
                    <Button className="w-full">Ver Flota</Button>
                  </Link>
                  <Link href="/aircraft/new">
                    <Button variant="outline" className="w-full">
                      Registrar Avión
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-indigo-600" />
                  Personal de Vuelo
                </CardTitle>
                <CardDescription>Gestiona pilotos y tripulación</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link href="/crew">
                    <Button className="w-full">Ver Personal</Button>
                  </Link>
                  <Link href="/crew/new">
                    <Button variant="outline" className="w-full">
                      Registrar Personal
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-teal-600" />
                  Aeropuertos
                </CardTitle>
                <CardDescription>Administra aeropuertos y destinos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link href="/airports">
                    <Button className="w-full">Ver Aeropuertos</Button>
                  </Link>
                  <Link href="/airports/new">
                    <Button variant="outline" className="w-full">
                      Registrar Aeropuerto
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Reemplazar todo el contenido del dashboard de usuario con una vista específica para compra de vuelos

  // Dashboard para Usuarios Normales
  if (isUser()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section para Usuario */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">¡Bienvenido, {user?.name}!</h1>
            <p className="text-xl text-gray-600 mb-8">Encuentra y reserva tu próximo vuelo de manera fácil y rápida</p>
          </div>

          {/* Acciones Principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
            <Card className="hover:shadow-xl transition-all duration-300 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-blue-800">Buscar Vuelos</CardTitle>
                <CardDescription className="text-blue-600">
                  Explora destinos y encuentra las mejores ofertas
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link href="/book-flight">
                  <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6">
                    Buscar y Reservar
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-green-800">Mis Reservas</CardTitle>
                <CardDescription className="text-green-600">Gestiona tus vuelos reservados</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link href="/my-reservations">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-green-600 text-green-700 hover:bg-green-50 text-lg py-6"
                  >
                    Ver Mis Vuelos
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Próximos Vuelos */}
          <Card className="mb-8 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Plane className="h-6 w-6 text-blue-600" />
                Mis Próximos Vuelos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <Plane className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Vuelo AA123</h3>
                      <p className="text-gray-600">JFK → LAX • 15 Enero 2024 • 08:30</p>
                      <p className="text-sm text-blue-600 font-medium">Primera Clase • Asiento 2A</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800 mb-2">Confirmado</Badge>
                    <p className="text-sm text-gray-500">Z6NKLP</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                      <Plane className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Vuelo UA456</h3>
                      <p className="text-gray-600">LAX → MIA • 20 Enero 2024 • 14:20</p>
                      <p className="text-sm text-orange-600 font-medium">Clase Comercial • Asiento 12C</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-yellow-100 text-yellow-800 mb-2">Pendiente</Badge>
                    <p className="text-sm text-gray-500">M8XQRT</p>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <Link href="/my-reservations">
                    <Button variant="outline" className="border-blue-600 text-blue-700 hover:bg-blue-50">
                      Ver Todas Mis Reservas
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Destinos Populares */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  Destinos Populares
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium">Nueva York (JFK)</span>
                      <p className="text-sm text-gray-500">Vuelos diarios disponibles</p>
                    </div>
                    <span className="text-green-600 font-bold">desde $299</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium">Los Ángeles (LAX)</span>
                      <p className="text-sm text-gray-500">Costa oeste</p>
                    </div>
                    <span className="text-green-600 font-bold">desde $399</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium">Miami (MIA)</span>
                      <p className="text-sm text-gray-500">Playas y sol</p>
                    </div>
                    <span className="text-green-600 font-bold">desde $249</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Soporte al Cliente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium text-blue-800">📞 Atención 24/7</p>
                    <p className="text-blue-600">+1 800 123 4567</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="font-medium text-green-800">✉️ Email</p>
                    <p className="text-green-600">soporte@aeroadmin.com</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="font-medium text-purple-800">💬 Chat en vivo</p>
                    <p className="text-purple-600">Disponible en la app</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return null
}
