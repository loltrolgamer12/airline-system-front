"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarIcon, Search, ArrowRightLeft } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export function FlightSearchForm() {
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [departureDate, setDepartureDate] = useState<Date>()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const searchParams = new URLSearchParams()
    if (origin) searchParams.append("origin", origin)
    if (destination) searchParams.append("destination", destination)
    if (departureDate) {
      searchParams.append("departure_date", format(departureDate, "yyyy-MM-dd"))
    }

    router.push(`/flights?${searchParams.toString()}`)
    setLoading(false)
  }

  const swapAirports = () => {
    const temp = origin
    setOrigin(destination)
    setDestination(temp)
  }

  return (
    <form onSubmit={handleSearch} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Origin */}
        <div className="space-y-2">
          <Label htmlFor="origin">From</Label>
          <div className="relative">
            <Input
              id="origin"
              placeholder="Origin airport (e.g., BOG)"
              value={origin}
              onChange={(e) => setOrigin(e.target.value.toUpperCase())}
              className="uppercase"
              maxLength={3}
            />
          </div>
        </div>

        {/* Swap button */}
        <div className="flex items-end justify-center">
          <Button type="button" variant="outline" size="icon" onClick={swapAirports} className="mb-0.5">
            <ArrowRightLeft className="h-4 w-4" />
          </Button>
        </div>

        {/* Destination */}
        <div className="space-y-2">
          <Label htmlFor="destination">To</Label>
          <Input
            id="destination"
            placeholder="Destination airport (e.g., MDE)"
            value={destination}
            onChange={(e) => setDestination(e.target.value.toUpperCase())}
            className="uppercase"
            maxLength={3}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Departure Date */}
        <div className="space-y-2">
          <Label>Departure Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !departureDate && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {departureDate ? format(departureDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={departureDate}
                onSelect={setDepartureDate}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <Button type="submit" className="w-full" disabled={loading}>
            <Search className="mr-2 h-4 w-4" />
            {loading ? "Searching..." : "Search Flights"}
          </Button>
        </div>
      </div>

      {/* Quick Search Options */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground">Popular routes:</span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            setOrigin("BOG")
            setDestination("MDE")
          }}
        >
          BOG → MDE
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            setOrigin("BOG")
            setDestination("CLO")
          }}
        >
          BOG → CLO
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            setOrigin("MDE")
            setDestination("BOG")
          }}
        >
          MDE → BOG
        </Button>
      </div>
    </form>
  )
}
