"use client"

import { useEffect, useState } from "react"
import { Plane } from "lucide-react"

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center z-50">
      {/* Fondo con estrellas */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        {/* Logo y animación del avión */}
        <div className="relative mb-8">
          {/* Mundo (círculo) */}
          <div className="relative w-48 h-48 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 to-blue-500 shadow-2xl">
              {/* Continentes simulados */}
              <div className="absolute top-6 left-8 w-12 h-8 bg-green-600 rounded-lg opacity-80"></div>
              <div className="absolute top-12 right-6 w-16 h-6 bg-green-600 rounded-full opacity-80"></div>
              <div className="absolute bottom-8 left-12 w-10 h-12 bg-green-600 rounded-lg opacity-80"></div>
              <div className="absolute bottom-6 right-8 w-8 h-8 bg-green-600 rounded-full opacity-80"></div>

              {/* Nubes */}
              <div className="absolute top-4 right-12 w-6 h-3 bg-white rounded-full opacity-60"></div>
              <div className="absolute top-16 left-4 w-8 h-4 bg-white rounded-full opacity-60"></div>
              <div className="absolute bottom-12 right-4 w-5 h-3 bg-white rounded-full opacity-60"></div>
            </div>

            {/* Avión girando alrededor del mundo */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: "4s" }}>
              <div className="relative w-full h-full">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Plane className="h-8 w-8 text-white transform rotate-90" />
                </div>
              </div>
            </div>

            {/* Órbita del avión */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/30 animate-pulse"></div>
          </div>
        </div>

        {/* Nombre de la empresa */}
        <h1 className="text-4xl font-bold text-white mb-2">SkyWings Airlines</h1>
        <p className="text-blue-200 text-lg mb-8">Conectando el mundo, un vuelo a la vez</p>

        {/* Barra de progreso */}
        <div className="w-80 mx-auto">
          <div className="bg-white/20 rounded-full h-2 mb-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-400 to-white h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-white/80 text-sm">Preparando tu experiencia de vuelo... {progress}%</p>
        </div>

        {/* Mensajes de carga */}
        <div className="mt-6 text-blue-200 text-sm">
          {progress < 30 && "Iniciando sistemas de navegación..."}
          {progress >= 30 && progress < 60 && "Verificando rutas de vuelo..."}
          {progress >= 60 && progress < 90 && "Preparando cabina de pasajeros..."}
          {progress >= 90 && "¡Listo para despegar!"}
        </div>
      </div>
    </div>
  )
}
