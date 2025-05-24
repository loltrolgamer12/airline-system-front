"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, User, Shield, Mail, Building } from "lucide-react"
import Link from "next/link"
import { PermissionGuard } from "../components/permission-guard"

const users = [
  {
    id: "1",
    name: "Super Administrador",
    email: "superadmin@aeroadmin.com",
    role: "super_admin",
    department: "Sistemas",
    status: "Activo",
    lastLogin: "2024-01-15 09:30",
    permissions: 18,
  },
  {
    id: "2",
    name: "Administrador General",
    email: "admin@aeroadmin.com",
    role: "admin",
    department: "Administración",
    status: "Activo",
    lastLogin: "2024-01-15 08:45",
    permissions: 14,
  },
  {
    id: "3",
    name: "Operador de Vuelos",
    email: "operador@aeroadmin.com",
    role: "flight_operator",
    department: "Operaciones",
    status: "Activo",
    lastLogin: "2024-01-15 07:20",
    permissions: 8,
  },
  {
    id: "4",
    name: "Agente de Reservas",
    email: "agente@aeroadmin.com",
    role: "reservation_agent",
    department: "Ventas",
    status: "Activo",
    lastLogin: "2024-01-15 10:15",
    permissions: 6,
  },
  {
    id: "5",
    name: "Servicio al Cliente",
    email: "servicio@aeroadmin.com",
    role: "customer_service",
    department: "Atención al Cliente",
    status: "Activo",
    lastLogin: "2024-01-15 09:00",
    permissions: 3,
  },
  {
    id: "6",
    name: "Usuario Final",
    email: "usuario@aeroadmin.com",
    role: "user",
    department: "Cliente",
    status: "Activo",
    lastLogin: "2024-01-14 16:30",
    permissions: 3,
  },
]

function getRoleColor(role: string) {
  switch (role) {
    case "super_admin":
      return "bg-red-100 text-red-800"
    case "admin":
      return "bg-blue-100 text-blue-800"
    case "flight_operator":
      return "bg-green-100 text-green-800"
    case "reservation_agent":
      return "bg-purple-100 text-purple-800"
    case "customer_service":
      return "bg-orange-100 text-orange-800"
    case "user":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

function getRoleName(role: string) {
  switch (role) {
    case "super_admin":
      return "Super Administrador"
    case "admin":
      return "Administrador"
    case "flight_operator":
      return "Operador de Vuelos"
    case "reservation_agent":
      return "Agente de Reservas"
    case "customer_service":
      return "Servicio al Cliente"
    case "user":
      return "Usuario Final"
    default:
      return "Usuario"
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "Activo":
      return "bg-green-100 text-green-800"
    case "Inactivo":
      return "bg-red-100 text-red-800"
    case "Suspendido":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function UsersPage() {
  return (
    <PermissionGuard permission="users.view">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
            <p className="text-gray-600 mt-2">Administra usuarios y permisos del sistema</p>
          </div>
          <PermissionGuard permission="users.create">
            <Link href="/users/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Usuario
              </Button>
            </Link>
          </PermissionGuard>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Buscar por nombre, email o rol..." className="pl-10" />
              </div>
              <Button variant="outline">Filtros</Button>
              <Button variant="outline">Exportar</Button>
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <div className="grid gap-6">
          {users.map((user) => (
            <Card key={user.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      {user.name}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {user.email} • Último acceso: {user.lastLogin}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getRoleColor(user.role)}>{getRoleName(user.role)}</Badge>
                    <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* User Info */}
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Información Personal
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">ID:</span> {user.id}
                      </p>
                      <p>
                        <span className="font-medium">Nombre:</span> {user.name}
                      </p>
                      <p className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* Role & Department */}
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Rol y Departamento
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Rol:</span> {getRoleName(user.role)}
                      </p>
                      <p>
                        <span className="font-medium">Departamento:</span> {user.department}
                      </p>
                      <p>
                        <span className="font-medium">Estado:</span> {user.status}
                      </p>
                    </div>
                  </div>

                  {/* Permissions */}
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Permisos
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Total:</span> {user.permissions} permisos
                      </p>
                      <p>
                        <span className="font-medium">Último acceso:</span> {user.lastLogin}
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
                      <PermissionGuard permission="users.edit">
                        <Button variant="outline" size="sm" className="w-full">
                          Editar
                        </Button>
                      </PermissionGuard>
                      <Button variant="outline" size="sm" className="w-full">
                        Permisos
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
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">Total Usuarios</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{users.filter((u) => u.status === "Activo").length}</div>
              <p className="text-xs text-muted-foreground">Usuarios Activos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{users.filter((u) => u.role.includes("admin")).length}</div>
              <p className="text-xs text-muted-foreground">Administradores</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{users.filter((u) => u.role === "user").length}</div>
              <p className="text-xs text-muted-foreground">Usuarios Finales</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PermissionGuard>
  )
}
