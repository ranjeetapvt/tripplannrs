"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { generatePDF } from "@/lib/pdf-generator"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Printer } from "lucide-react"
import Link from "next/link"

export default function PrintItinerary({ params }: { params: { id: string } }) {
  const router = useRouter()

  // In a real app, we would fetch the itinerary data from Supabase
  const mockItinerary = {
    id: params.id,
    destination: "Paris, France",
    startDate: new Date("2025-03-15"),
    endDate: new Date("2025-03-22"),
    travelersCount: 2,
    travelGroupType: "Couple",
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
          },
          {
            type: "Lunch",
            title: "Le Marais Café",
            time: "1:00 PM - 2:00 PM",
            location: "Le Marais Café",
            mapLink: "https://maps.google.com",
          },
          {
            type: "Afternoon",
            title: "Seine River Cruise",
            time: "3:00 PM - 4:30 PM",
            location: "Seine River Cruise",
            mapLink: "https://maps.google.com",
          },
          {
            type: "Evening",
            title: "Eiffel Tower for Sunset",
            time: "6:00 PM - 7:30 PM",
            location: "Eiffel Tower",
            mapLink: "https://maps.google.com",
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
          },
          {
            type: "Lunch",
            title: "Café de Flore",
            time: "12:00 PM - 1:30 PM",
            location: "Café de Flore",
            mapLink: "https://maps.google.com",
          },
          {
            type: "Afternoon",
            title: "Place du Tertre – Artists' Square",
            time: "2:00 PM - 4:00 PM",
            location: "Place du Tertre",
            mapLink: "https://maps.google.com",
          },
          {
            type: "Evening",
            title: "Dinner at Le Petit Montmartre",
            time: "6:00 PM - 8:00 PM",
            location: "Le Petit Montmartre",
            mapLink: "https://maps.google.com",
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

  useEffect(() => {
    // Generate PDF preview when component mounts
    const pdfBlob = generatePDF(mockItinerary)

    // In a real app, we would display the PDF in an iframe or embed
    console.log("PDF generated")
  }, [])

  const handleDownload = () => {
    const pdfBlob = generatePDF(mockItinerary)
    const url = URL.createObjectURL(pdfBlob)
    const a = document.createElement("a")
    a.href = url
    a.download = `TripPlannrs-${mockItinerary.destination.replace(/\s+/g, "-")}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handlePrint = () => {
    const pdfBlob = generatePDF(mockItinerary)
    const url = URL.createObjectURL(pdfBlob)
    const iframe = document.createElement("iframe")
    iframe.style.display = "none"
    iframe.src = url
    document.body.appendChild(iframe)
    iframe.onload = () => {
      iframe.contentWindow?.print()
      document.body.removeChild(iframe)
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <Link href={`/itinerary/${params.id}`}>
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft size={18} />
            Back to Itinerary
          </Button>
        </Link>

        <div className="flex gap-4">
          <Button onClick={handleDownload} className="flex items-center gap-2">
            <Download size={18} />
            Download PDF
          </Button>

          <Button onClick={handlePrint} className="flex items-center gap-2">
            <Printer size={18} />
            Print
          </Button>
        </div>
      </div>

      <div className="rounded-lg border shadow-sm">
        <div className="p-4">
          <h2 className="text-2xl font-bold">PDF Preview</h2>
          <p className="text-muted-foreground">Your itinerary is ready to download or print.</p>
        </div>

        {/* PDF Preview - In a real app, this would be an iframe or embed */}
        <div className="h-[800px] overflow-auto border-t p-4">
          <div className="mx-auto max-w-4xl border border-gray-300 p-8">
            {/* Header */}
            <div className="mb-8 border-b pb-4 text-center">
              <h1 className="text-3xl font-bold uppercase">TRIPPLANNRS</h1>
              <p className="text-sm text-muted-foreground">www.tripplannrs.com</p>
            </div>

            {/* Travel Overview */}
            <div className="mb-8 rounded border p-4">
              <h2 className="mb-4 font-bold uppercase">TRAVEL OVERVIEW</h2>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <div>
                  <span className="font-semibold">Destination:</span> {mockItinerary.destination}
                </div>
                <div>
                  <span className="font-semibold">Travel Dates:</span>{" "}
                  {new Date(mockItinerary.startDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  –{" "}
                  {new Date(mockItinerary.endDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div>
                  <span className="font-semibold">Number of People:</span> {mockItinerary.travelersCount} Travelers
                </div>
                <div>
                  <span className="font-semibold">Group Info:</span> {mockItinerary.travelGroupType}
                </div>
              </div>
            </div>

            {/* Travel Mode */}
            <div className="mb-8 rounded border p-4">
              <h2 className="mb-4 font-bold uppercase">TRAVEL MODE</h2>

              <h3 className="mb-2 font-semibold uppercase">ARRIVAL:</h3>
              <div className="mb-4 ml-4 space-y-1">
                <div>
                  <span className="font-semibold">Mode:</span> {mockItinerary.travelDetails.arrival.mode}
                </div>
                <div>
                  <span className="font-semibold">Airline:</span> {mockItinerary.travelDetails.arrival.airline}
                </div>
                <div>
                  <span className="font-semibold">Departure Time:</span>{" "}
                  {mockItinerary.travelDetails.arrival.departureTime}
                </div>
                <div>
                  <span className="font-semibold">Arrival Time:</span> {mockItinerary.travelDetails.arrival.arrivalTime}
                </div>
                <div>
                  <span className="font-semibold">Price:</span> {mockItinerary.travelDetails.arrival.price}
                </div>
                <div>
                  <span className="font-semibold">Airport:</span> {mockItinerary.travelDetails.arrival.airport} [Google
                  Maps Link]
                </div>
              </div>

              <h3 className="mb-2 font-semibold uppercase">DEPARTURE:</h3>
              <div className="ml-4 space-y-1">
                <div>
                  <span className="font-semibold">Mode:</span> {mockItinerary.travelDetails.departure.mode}
                </div>
                <div>
                  <span className="font-semibold">Airline:</span> {mockItinerary.travelDetails.departure.airline}
                </div>
                <div>
                  <span className="font-semibold">Departure Time:</span>{" "}
                  {mockItinerary.travelDetails.departure.departureTime}
                </div>
                <div>
                  <span className="font-semibold">Arrival Time:</span>{" "}
                  {mockItinerary.travelDetails.departure.arrivalTime}
                </div>
                <div>
                  <span className="font-semibold">Price:</span> {mockItinerary.travelDetails.departure.price}
                </div>
                <div>
                  <span className="font-semibold">Airport:</span> {mockItinerary.travelDetails.departure.airport}{" "}
                  [Google Maps Link]
                </div>
              </div>
            </div>

            {/* Accommodation Options */}
            <div className="mb-8 rounded border p-4">
              <h2 className="mb-4 font-bold uppercase">ACCOMMODATION OPTIONS</h2>

              {mockItinerary.accommodations.map((accommodation, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold">
                    OPTION {index + 1}: {accommodation.name}
                  </h3>
                  <div className="ml-4 space-y-1">
                    <div>
                      <span className="font-semibold">Type:</span> {accommodation.type}
                    </div>
                    <div>
                      <span className="font-semibold">Address:</span> {accommodation.address}
                    </div>
                    <div>
                      <span className="font-semibold">Price Range:</span> {accommodation.priceRange}
                    </div>
                    <div>
                      <span className="font-semibold">Maps:</span> [Google Maps Link]
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Day-wise Plan */}
            <div className="mb-8 rounded border p-4">
              <h2 className="mb-4 font-bold uppercase">DAY-WISE PLAN</h2>

              {mockItinerary.days.map((day) => (
                <div key={day.dayNumber} className="mb-6">
                  <h3 className="font-semibold uppercase">
                    DAY {day.dayNumber}: {day.title}
                  </h3>
                  <p className="mb-2 text-sm">
                    {new Date(day.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </p>

                  {day.activities.map((activity, index) => (
                    <div key={index} className="mb-4">
                      <h4 className="font-semibold">{activity.type}:</h4>
                      <div className="ml-4 space-y-1">
                        <div>
                          <span className="font-semibold">Activity:</span> {activity.title}
                        </div>
                        <div>
                          <span className="font-semibold">Location:</span> {activity.location} [Google Maps Link]
                        </div>
                        <div>
                          <span className="font-semibold">Time:</span> {activity.time}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="mt-2">
                    <span className="font-semibold">Accommodation for the Night:</span>
                    <div className="ml-4">
                      <div>
                        <span className="font-semibold">Hotel Name:</span> {day.accommodation.name}
                      </div>
                      <div>
                        <span className="font-semibold">Location:</span> {day.accommodation.name} [Google Maps Link]
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Notes */}
            <div className="mb-8 rounded border p-4">
              <h2 className="mb-4 font-bold uppercase">NOTES</h2>

              {mockItinerary.tips.map((tip, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold">{tip.title}:</h3>
                  <ul className="ml-4 list-disc space-y-1 pl-4">
                    {tip.content.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-8 border-t pt-4 text-center">
              <p className="text-sm text-muted-foreground">Generated by TripPlannrs • www.tripplannrs.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
