import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from './components/auth-provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AeroAdmin - Sistema de Gestión de Aerolíneas',
  description: 'Sistema completo de gestión de aerolíneas con vuelos, pasajeros y reservas',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}