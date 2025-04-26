import { Navbar } from "@/components/navbar"
import { ItineraryHeader } from "@/components/itinerary-header"
import { ItineraryTabs } from "@/components/itinerary-tabs"
import { DayPlan } from "@/components/day-plan"
import { Button } from "@/components/ui/button"
import { Trash2, Printer } from "lucide-react"
import Link from "next/link"

export default function ItineraryView({ params }: { params: { id: string } }) {
  // In a real app, we would fetch the itinerary data from Supabase
  const mockItinerary = {
    id: params.id,
    destination: "Paris, France",
    startDate: new Date("2025-03-15"),
    endDate: new Date("2025-03-22"),
    travelersCount: 2,
    travelGroupType: "Couple",
    description: "The City of Light offers unparalleled culture, cuisine, and iconic landmarks.",
    image: "/placeholder.svg?height=400&width=800",
    days: [
      {
        dayNumber: 1,
        title: "ARRIVAL & CITY TOUR",
        date: new Date("2025-03-15"),
        activities: [
          {
            type: "Morning",
            title: "Visit the Louvre Museum",
            time: "10:30 AM - 12:30 PM",
            location: "Louvre Museum",
            mapLink: "https://maps.google.com",
            image: "/placeholder.svg?height=100&width=150",
            description: "Explore one of the world's largest art museums housing masterpieces like the Mona Lisa.",
          },
          {
            type: "Lunch",
            title: "Le Marais Café",
            time: "1:00 PM - 2:00 PM",
            location: "Le Marais Café",
            mapLink: "https://maps.google.com",
            image: "/placeholder.svg?height=100&width=150",
            description: "Enjoy authentic French cuisine in a charming historic district.",
          },
          {
            type: "Afternoon",
            title: "Seine River Cruise",
            time: "3:00 PM - 4:30 PM",
            location: "Seine River Cruise",
            mapLink: "https://maps.google.com",
            image: "/placeholder.svg?height=100&width=150",
            description: "Relax and take in Paris from the water with stunning views of iconic landmarks.",
          },
          {
            type: "Evening",
            title: "Eiffel Tower for Sunset",
            time: "6:00 PM - 7:30 PM",
            location: "Eiffel Tower",
            mapLink: "https://maps.google.com",
            image: "/placeholder.svg?height=100&width=150",
            description: "Experience the magic of Paris as the city lights up at dusk.",
          },
        ],
        accommodation: {
          name: "Hotel Le Marais",
          mapLink: "https://maps.google.com",
        },
      },
      {
        dayNumber: 2,
        title: "MONTMARTRE EXPLORATION",
        date: new Date("2025-03-16"),
        activities: [
          {
            type: "Morning",
            title: "Sacré-Cœur Basilica",
            time: "9:00 AM - 11:00 AM",
            location: "Sacré-Cœur",
            mapLink: "https://maps.google.com",
            image: "/placeholder.svg?height=100&width=150",
            description: "Visit this iconic white-domed basilica with panoramic views of Paris.",
          },
          {
            type: "Lunch",
            title: "Café de Flore",
            time: "12:00 PM - 1:30 PM",
            location: "Café de Flore",
            mapLink: "https://maps.google.com",
            image: "/placeholder.svg?height=100&width=150",
            description: "Dine at this historic café frequented by famous writers and philosophers.",
          },
          {
            type: "Afternoon",
            title: "Place du Tertre – Artists' Square",
            time: "2:00 PM - 4:00 PM",
            location: "Place du Tertre",
            mapLink: "https://maps.google.com",
            image: "/placeholder.svg?height=100&width=150",
            description: "Wander through this charming square filled with artists painting en plein air.",
          },
          {
            type: "Evening",
            title: "Dinner at Le Petit Montmartre",
            time: "6:00 PM - 8:00 PM",
            location: "Le Petit Montmartre",
            mapLink: "https://maps.google.com",
            image: "/placeholder.svg?height=100&width=150",
            description: "Enjoy a cozy dinner at this local favorite with authentic French cuisine.",
          },
        ],
        accommodation: {
          name: "Hotel Montmartre",
          mapLink: "https://maps.google.com",
        },
      },
    ],
    accommodations: [
      {
        name: "Hotel Le Marais",
        type: "3-Star Hotel",
        address: "Rue de la Marais, Paris, France",
        priceRange: "$120 - $180 per night",
        mapLink: "https://maps.google.com",
      },
      {
        name: "Paris BnB Stay",
        type: "Budget Guesthouse",
        address: "Rue Saint-Antoine, Paris, France",
        priceRange: "$80 - $120 per night",
        mapLink: "https://maps.google.com",
      },
      {
        name: "Hotel Ritz Paris",
        type: "Luxury 5-Star Hotel",
        address: "Place Vendôme, Paris, France",
        priceRange: "$400 - $600 per night",
        mapLink: "https://maps.google.com",
      },
    ],
    tips: [
      {
        category: "Contact",
        title: "Important Contact Information",
        content: [
          "Emergency Number: 112 (European Emergency Number)",
          "Paris Tourism Office: +33 1 49 52 42 63",
          "Embassy Contact: +33 1 43 12 22 22",
        ],
      },
      {
        category: "Packing",
        title: "Packing List",
        content: [
          "Comfortable walking shoes",
          "Light raincoat (March can be rainy in Paris)",
          "Camera",
          "Power adapter for European outlets",
        ],
      },
      {
        category: "Etiquette",
        title: "Local Etiquette Tips",
        content: [
          "Basic French phrases are appreciated",
          "Tipping is not mandatory but 5-10% is appreciated for good service",
          "Dress smartly for upscale restaurants",
        ],
      },
      {
        category: "Links",
        title: "Useful Links",
        content: [
          "Flight Check-in: www.airfrance.com",
          "Paris Metro Map: www.ratp.fr",
          "Weather Forecast: www.meteofrance.com",
        ],
      },
    ],
    travelDetails: {
      arrival: {
        mode: "Flight from New York",
        airline: "Air France",
        departureTime: "March 1st, 2025, 8:00 AM",
        arrivalTime: "March 1st, 2025, 10:00 AM",
        price: "$500 per person",
        airport: "Charles de Gaulle Airport",
        mapLink: "https://maps.google.com",
      },
      departure: {
        mode: "Flight to New York",
        airline: "Delta Airlines",
        departureTime: "March 7th, 2025, 6:00 PM",
        arrivalTime: "March 7th, 2025, 8:00 PM",
        price: "$500 per person",
        airport: "Charles de Gaulle Airport",
        mapLink: "https://maps.google.com",
      },
    },
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <ItineraryHeader itinerary={mockItinerary} />

        <ItineraryTabs itinerary={mockItinerary} />

        <div className="mt-8 space-y-8">
          {mockItinerary.days.map((day) => (
            <DayPlan key={day.dayNumber} day={day} />
          ))}
        </div>

        <div className="mt-12 flex justify-between">
          <Button variant="destructive" className="flex items-center gap-2">
            <Trash2 size={18} />
            Delete Itinerary
          </Button>

          <Link href="/itinerary/1/pdf">
            <Button className="flex items-center gap-2">
              <Printer size={18} />
              Print Itinerary
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
