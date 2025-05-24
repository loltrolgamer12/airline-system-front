"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Plane, Users, Calendar, Home, Menu, LogOut, UserCheck, Building2, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "./auth-provider"

// Navegación para administradores (acceso completo)
const adminNavigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Vuelos", href: "/flights", icon: Plane },
  { name: "Pasajeros", href: "/passengers", icon: Users },
  { name: "Reservas", href: "/reservations", icon: Calendar },
  { name: "Aviones", href: "/aircraft", icon: Plane },
  { name: "Personal", href: "/crew", icon: UserCheck },
  { name: "Aeropuertos", href: "/airports", icon: Building2 },
]

// Navegación para usuarios normales (solo reservas y consultas)
const userNavigation = [
  { name: "Inicio", href: "/", icon: Home },
  { name: "Comprar Vuelos", href: "/book-flight", icon: Search },
  { name: "Mis Reservas", href: "/my-reservations", icon: Calendar },
]

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout, isAdmin, isUser } = useAuth()

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-blue-100 text-blue-800"
      case "user":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleName = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrador"
      case "user":
        return "Usuario"
      default:
        return "Usuario"
    }
  }

  // Seleccionar navegación según el rol
  const navigation = isAdmin() ? adminNavigation : userNavigation

  // Nombre de la empresa según el rol
  const companyName = isAdmin() ? "AeroAdmin" : "SkyWings Airlines"

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Plane className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">{companyName}</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === item.href ? "text-foreground" : "text-foreground/60",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
              <Plane className="h-6 w-6" />
              <span className="font-bold">{companyName}</span>
            </Link>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-foreground/80",
                      pathname === item.href ? "text-foreground" : "text-foreground/60",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link href="/" className="flex items-center space-x-2 md:hidden">
              <Plane className="h-6 w-6" />
              <span className="font-bold">{companyName}</span>
            </Link>
          </div>

          {/* User Menu Simplificado */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className={isAdmin() ? "bg-blue-600 text-white" : "bg-green-600 text-white"}>
                    {getUserInitials(user?.name || "")}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  <div className="mt-2">
                    <Badge className={getRoleColor(user?.role || "")}>{getRoleName(user?.role || "")}</Badge>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
