"use client"

import { useAuth } from "./auth-provider"

export function WelcomeMessage() {
  const { user, isAdmin, isUser } = useAuth()

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Buenos días"
    if (hour < 18) return "Buenas tardes"
    return "Buenas noches"
  }

  const getRoleDescription = () => {
    if (isAdmin()) {
      return "Tienes acceso completo al sistema de gestión de vuelos. Puedes administrar vuelos, pasajeros, reservas, aeronaves, personal y aeropuertos."
    } else if (isUser()) {
      return "Puedes consultar vuelos disponibles, realizar nuevas reservas y gestionar tus reservas existentes."
    }
    return "Bienvenido al sistema de gestión de vuelos."
  }

  const getAccessLevel = () => {
    if (isAdmin()) {
      return { level: "Administrador del Sistema", color: "text-blue-600", icon: "🛡️" }
    } else if (isUser()) {
      return { level: "Usuario del Sistema", color: "text-green-600", icon: "👤" }
    }
    return { level: "Usuario", color: "text-gray-600", icon: "👤" }
  }

  const accessInfo = getAccessLevel()

  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        {getGreeting()}, {user?.name}
      </h1>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">{accessInfo.icon}</span>
        <span className={`text-lg font-semibold ${accessInfo.color}`}>{accessInfo.level}</span>
      </div>
      <p className="text-gray-600 text-lg">{getRoleDescription()}</p>

      {isUser() && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">¿Qué puedes hacer?</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>✈️ Consultar vuelos disponibles y horarios</li>
            <li>🎫 Realizar nuevas reservas de vuelos</li>
            <li>📋 Ver y gestionar tus reservas existentes</li>
            <li>🏢 Consultar información de aeropuertos</li>
          </ul>
        </div>
      )}

      {isAdmin() && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Panel de Administración</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>✈️ Gestión completa de vuelos y horarios</li>
            <li>👥 Administración de pasajeros y personal</li>
            <li>🎫 Control total de reservas del sistema</li>
            <li>🛩️ Gestión de flota de aeronaves</li>
            <li>🏢 Administración de aeropuertos</li>
          </ul>
        </div>
      )}
    </div>
  )
}
