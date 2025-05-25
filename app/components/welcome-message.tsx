"use client"

import { useAuth } from "./auth-provider"

export function WelcomeMessage() {
  const { user } = useAuth()

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Buenos días"
    if (hour < 18) return "Buenas tardes"
    return "Buenas noches"
  }

  const getRoleDescription = (role: string) => {
    switch (role) {
      case "admin":
        return "Tienes acceso completo a todas las funciones del sistema."
      case "operator":
        return "Puedes gestionar vuelos y ver información de pasajeros."
      case "agent":
        return "Puedes crear y gestionar reservas de pasajeros."
      default:
        return "Bienvenido al sistema de gestión de vuelos."
    }
  }

  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        {getGreeting()}, {user?.name}
      </h1>
      <p className="text-gray-600">{getRoleDescription(user?.role || "")}</p>
    </div>
  )
}
