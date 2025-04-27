import { Navbar } from "@/components/navbar"
import { DashboardHeader } from "@/components/dashboard-header"
import { ItineraryGrid } from "@/components/itinerary-grid"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

export default function Dashboard() {
  // In a real app, we would fetch the user's itineraries from Supabase
  const mockItineraries = [
    {
      id: "1",
      destination: "Paris, France",
      startDate: new Date("2025-03-15"),
      endDate: new Date("2025-03-22"),
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "2",
      destination: "Tokyo, Japan",
      startDate: new Date("2025-04-05"),
      endDate: new Date("2025-04-12"),
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "3",
      destination: "Barcelona, Spain",
      startDate: new Date("2025-05-10"),
      endDate: new Date("2025-05-17"),
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader title="My Trips" />

        <div className="mb-6">
          <Link href="/generate">
            <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
              <PlusCircle size={18} />
              Create New Itinerary
            </Button>
          </Link>
        </div>

        <ItineraryGrid itineraries={mockItineraries} />
      </div>
    </div>
  )
}
