import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock } from "lucide-react"

interface Stopover {
  airport: string
  airportName?: string
  arrivalTime: string
  departureTime: string
  duration: string
  status: string
}

interface StopoverTimelineProps {
  origin: string
  destination: string
  departureTime: string
  arrivalTime: string
  stopovers: Stopover[]
}

function getStatusColor(status: string) {
  switch (status) {
    case "Programado":
      return "bg-blue-100 text-blue-800"
    case "En Progreso":
      return "bg-yellow-100 text-yellow-800"
    case "Completado":
      return "bg-green-100 text-green-800"
    case "Retrasado":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function StopoverTimeline({
  origin,
  destination,
  departureTime,
  arrivalTime,
  stopovers,
}: StopoverTimelineProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Origin */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{origin}</h3>
                  <p className="text-sm text-gray-500">Salida</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{departureTime}</p>
                  <Badge className="bg-green-100 text-green-800">Origen</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Stopovers */}
          {stopovers.map((stopover, index) => (
            <div key={index} className="relative">
              {/* Connecting Line */}
              <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-300"></div>

              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {stopover.airport}
                        </h3>
                        {stopover.airportName && <p className="text-sm text-gray-500">{stopover.airportName}</p>}
                      </div>
                      <Badge className={getStatusColor(stopover.status)}>{stopover.status}</Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="font-medium">Llegada:</span>
                        <span>{stopover.arrivalTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="font-medium">Salida:</span>
                        <span>{stopover.departureTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Duración:</span>
                        <span>{stopover.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Destination */}
          <div className="relative">
            {stopovers.length > 0 && <div className="absolute left-2 top-0 h-6 w-0.5 bg-gray-300"></div>}

            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 relative z-10">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{destination}</h3>
                    <p className="text-sm text-gray-500">Llegada</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{arrivalTime}</p>
                    <Badge className="bg-red-100 text-red-800">Destino</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
