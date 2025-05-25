"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plane, Users, Calendar, TrendingUp, Settings } from "lucide-react"
import Link from "next/link"
import { WelcomeMessage } from "../components/welcome-message"
import { useAuth } from "../components/auth-provider"

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Message */}
        <WelcomeMessage />

        {/* Stats Cards */}
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
              <CardTitle className="text-sm font-medium">Pasajeros</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+15% este mes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reservas Hoy</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">+12 desde ayer</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ocupación</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">+5% vs mes anterior</p>
            </CardContent>
          </Card>

          {/* Mostrar estadísticas de usuarios solo para administradores */}
          {user?.role === "admin" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Usuarios Admin</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">3 activos</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5 text-blue-600" />
                Gestión de Vuelos
              </CardTitle>
              <CardDescription>Administra horarios, rutas y disponibilidad de vuelos</CardDescription>
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
              <CardDescription>Registra y administra información de pasajeros</CardDescription>
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
              <CardDescription>Crea, modifica y cancela reservas de vuelos</CardDescription>
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

          {/* Mostrar gestión de usuarios solo para administradores */}
          {user?.role === "admin" && (
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-orange-600" />
                  Gestión de Usuarios
                </CardTitle>
                <CardDescription>Administra usuarios del sistema y permisos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link href="/admin/users">
                    <Button className="w-full">Ver Usuarios</Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="outline" className="w-full">
                      Registro Público
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Recent Activity */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas acciones realizadas en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Nueva reserva creada</p>
                  <p className="text-xs text-muted-foreground">Reserva #R001 para vuelo AA123 - hace 5 minutos</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Vuelo actualizado</p>
                  <p className="text-xs text-muted-foreground">Vuelo UA456 - horario modificado - hace 15 minutos</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Pasajero registrado</p>
                  <p className="text-xs text-muted-foreground">Juan Pérez - documento 12345678 - hace 30 minutos</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
