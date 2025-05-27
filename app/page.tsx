import { Suspense } from "react"
import { Plane, Users, Calendar, MapPin, TrendingUp, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FlightSearchForm } from "@/components/flights/FlightSearchForm"
import { RecentFlights } from "@/components/dashboard/RecentFlights"
import { SystemStats } from "@/components/dashboard/SystemStats"
import { ErrorBoundary } from "@/components/ErrorBoundary"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="airline-gradient text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">✈️ Airline Management System</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Complete microservices-based airline management platform
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/flights">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  <Plane className="mr-2 h-5 w-5" />
                  Explore Flights
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 text-white border-white hover:bg-white hover:text-blue-600"
                >
                  Staff Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Flight Search Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Search Flights</h2>
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <Suspense fallback={<div>Loading search form...</div>}>
                  <FlightSearchForm />
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">System Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Plane className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <CardTitle>Flight Management</CardTitle>
                <CardDescription>Complete flight scheduling, status tracking, and route management</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 mx-auto text-green-600 mb-4" />
                <CardTitle>Passenger Services</CardTitle>
                <CardDescription>Passenger registration, profile management, and travel history</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calendar className="h-12 w-12 mx-auto text-purple-600 mb-4" />
                <CardTitle>Reservation System</CardTitle>
                <CardDescription>Advanced booking system with seat selection and check-in</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <MapPin className="h-12 w-12 mx-auto text-red-600 mb-4" />
                <CardTitle>Airport Network</CardTitle>
                <CardDescription>Comprehensive airport and route management system</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="h-12 w-12 mx-auto text-orange-600 mb-4" />
                <CardTitle>Analytics & Reports</CardTitle>
                <CardDescription>Real-time analytics and comprehensive reporting tools</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 mx-auto text-indigo-600 mb-4" />
                <CardTitle>Real-time Updates</CardTitle>
                <CardDescription>Live flight status updates and notifications</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* System Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">System Overview</h2>
          <ErrorBoundary>
            <Suspense
              fallback={
                <Card className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </CardContent>
                </Card>
              }
            >
              <SystemStats />
            </Suspense>
          </ErrorBoundary>
        </div>
      </section>

      {/* Recent Flights */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Recent Flights</h2>
          <ErrorBoundary>
            <Suspense
              fallback={
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <CardContent className="p-4">
                        <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              }
            >
              <RecentFlights />
            </Suspense>
          </ErrorBoundary>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Airline System</h3>
              <p className="text-gray-300">Modern microservices-based airline management platform</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Flight Management</li>
                <li>Passenger Services</li>
                <li>Reservations</li>
                <li>Airport Operations</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Technology</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Microservices Architecture</li>
                <li>Load Balancing</li>
                <li>Circuit Breakers</li>
                <li>Real-time Updates</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-300">Enterprise-grade airline management solution</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 Airline Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
