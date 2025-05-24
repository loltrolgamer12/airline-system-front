"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Download, Calendar, TrendingUp, Users, Plane } from "lucide-react"
import { PermissionGuard } from "../components/permission-guard"

const reports = [
  {
    id: "flights-monthly",
    name: "Reporte Mensual de Vuelos",
    description: "Estadísticas de vuelos por mes",
    category: "Operaciones",
    lastGenerated: "2024-01-15",
    size: "2.3 MB",
    format: "PDF",
  },
  {
    id: "passengers-stats",
    name: "Estadísticas de Pasajeros",
    description: "Análisis de pasajeros y reservas",
    category: "Ventas",
    lastGenerated: "2024-01-14",
    size: "1.8 MB",
    format: "Excel",
  },
  {
    id: "aircraft-utilization",
    name: "Utilización de Aeronaves",
    description: "Reporte de uso y mantenimiento",
    category: "Flota",
    lastGenerated: "2024-01-13",
    size: "3.1 MB",
    format: "PDF",
  },
  {
    id: "revenue-analysis",
    name: "Análisis de Ingresos",
    description: "Ingresos por rutas y servicios",
    category: "Financiero",
    lastGenerated: "2024-01-12",
    size: "4.2 MB",
    format: "Excel",
  },
]

function getCategoryColor(category: string) {
  switch (category) {
    case "Operaciones":
      return "bg-blue-100 text-blue-800"
    case "Ventas":
      return "bg-green-100 text-green-800"
    case "Flota":
      return "bg-purple-100 text-purple-800"
    case "Financiero":
      return "bg-orange-100 text-orange-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function ReportsPage() {
  return (
    <PermissionGuard permission="reports.view">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Centro de Reportes</h1>
            <p className="text-gray-600 mt-2">Genera y descarga reportes del sistema</p>
          </div>
          <PermissionGuard permission="reports.create">
            <Button>
              <BarChart3 className="h-4 w-4 mr-2" />
              Nuevo Reporte
            </Button>
          </PermissionGuard>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Plane className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">Vuelos Hoy</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-xs text-muted-foreground">Pasajeros</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold">89%</div>
                  <p className="text-xs text-muted-foreground">Ocupación</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-8 w-8 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">Reservas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports List */}
        <div className="grid gap-6">
          {reports.map((report) => (
            <Card key={report.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      {report.name}
                    </CardTitle>
                    <CardDescription className="mt-1">{report.description}</CardDescription>
                  </div>
                  <Badge className={getCategoryColor(report.category)}>{report.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Report Info */}
                  <div className="space-y-2">
                    <h4 className="font-semibold">Información</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Formato:</span> {report.format}
                      </p>
                      <p>
                        <span className="font-medium">Tamaño:</span> {report.size}
                      </p>
                      <p>
                        <span className="font-medium">Categoría:</span> {report.category}
                      </p>
                    </div>
                  </div>

                  {/* Last Generated */}
                  <div className="space-y-2">
                    <h4 className="font-semibold">Última Generación</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Fecha:</span> {report.lastGenerated}
                      </p>
                      <p>
                        <span className="font-medium">Estado:</span> Disponible
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 md:col-span-2">
                    <h4 className="font-semibold">Acciones</h4>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Descargar
                      </Button>
                      <PermissionGuard permission="reports.create">
                        <Button variant="outline" size="sm">
                          Regenerar
                        </Button>
                      </PermissionGuard>
                      <Button variant="outline" size="sm">
                        Programar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PermissionGuard>
  )
}
