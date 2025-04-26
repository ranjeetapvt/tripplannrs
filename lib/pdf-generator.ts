import jsPDF from "jspdf"

export function generatePDF(itinerary: any) {
  // Create a new PDF document
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  // Set default font
  doc.setFont("helvetica")

  // Helper functions
  const addHeader = () => {
    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.text("TRIPPLANNRS", 105, 20, { align: "center" })
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text("www.tripplannrs.com", 105, 25, { align: "center" })
    doc.line(20, 30, 190, 30)
  }

  const addSection = (title: string, y: number) => {
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text(title, 20, y)
    doc.line(20, y + 2, 190, y + 2)
    return y + 8
  }

  const addField = (label: string, value: string, x: number, y: number) => {
    doc.setFont("helvetica", "bold")
    doc.text(`${label}:`, x, y)
    doc.setFont("helvetica", "normal")
    doc.text(value, x + 30, y)
    return y + 6
  }

  // Add header
  addHeader()

  // Travel Overview Section
  let y = addSection("TRAVEL OVERVIEW", 40)
  y = addField("Destination", itinerary.destination, 20, y)

  const formatDateRange = (start: Date, end: Date) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    return `${startDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} – ${endDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`
  }

  y = addField("Travel Dates", formatDateRange(itinerary.startDate, itinerary.endDate), 20, y)
  y = addField("Number of People", `${itinerary.travelersCount} Travelers`, 20, y)
  y = addField("Group Info", itinerary.travelGroupType, 20, y)

  // Travel Mode Section
  y = addSection("TRAVEL MODE", y + 5)

  doc.setFont("helvetica", "bold")
  doc.text("ARRIVAL:", 20, y)
  doc.setFont("helvetica", "normal")
  y += 6

  y = addField("Mode", itinerary.travelDetails.arrival.mode, 25, y)
  y = addField("Airline", itinerary.travelDetails.arrival.airline, 25, y)
  y = addField("Departure Time", itinerary.travelDetails.arrival.departureTime, 25, y)
  y = addField("Arrival Time", itinerary.travelDetails.arrival.arrivalTime, 25, y)
  y = addField("Price", itinerary.travelDetails.arrival.price, 25, y)
  y = addField("Airport", `${itinerary.travelDetails.arrival.airport} [Google Maps Link]`, 25, y)

  y += 2
  doc.setFont("helvetica", "bold")
  doc.text("DEPARTURE:", 20, y)
  doc.setFont("helvetica", "normal")
  y += 6

  y = addField("Mode", itinerary.travelDetails.departure.mode, 25, y)
  y = addField("Airline", itinerary.travelDetails.departure.airline, 25, y)
  y = addField("Departure Time", itinerary.travelDetails.departure.departureTime, 25, y)
  y = addField("Arrival Time", itinerary.travelDetails.departure.arrivalTime, 25, y)
  y = addField("Price", itinerary.travelDetails.departure.price, 25, y)
  y = addField("Airport", `${itinerary.travelDetails.departure.airport} [Google Maps Link]`, 25, y)

  // Add a new page for accommodations
  doc.addPage()
  addHeader()

  // Accommodation Options Section
  y = addSection("ACCOMMODATION OPTIONS", 40)

  itinerary.accommodations.forEach((accommodation: any, index: number) => {
    doc.setFont("helvetica", "bold")
    doc.text(`OPTION ${index + 1}: ${accommodation.name}`, 20, y)
    doc.setFont("helvetica", "normal")
    y += 6

    y = addField("Type", accommodation.type, 25, y)
    y = addField("Address", accommodation.address, 25, y)
    y = addField("Price Range", accommodation.priceRange, 25, y)
    y = addField("Maps", "[Google Maps Link]", 25, y)

    y += 4
  })

  // Add a new page for day-wise plan
  doc.addPage()
  addHeader()

  // Day-wise Plan Section
  y = addSection("DAY-WISE PLAN", 40)

  itinerary.days.forEach((day: any) => {
    if (y > 240) {
      doc.addPage()
      addHeader()
      y = 40
    }

    doc.setFont("helvetica", "bold")
    doc.text(`DAY ${day.dayNumber}: ${day.title}`, 20, y)
    doc.setFont("helvetica", "normal")
    y += 6

    day.activities.forEach((activity: any) => {
      doc.setFont("helvetica", "bold")
      doc.text(`${activity.type}:`, 20, y)
      doc.setFont("helvetica", "normal")
      y += 6

      y = addField("Activity", activity.title, 25, y)
      y = addField("Location", `${activity.location} [Google Maps Link]`, 25, y)
      y = addField("Time", activity.time, 25, y)

      y += 2
    })

    doc.setFont("helvetica", "bold")
    doc.text("Accommodation for the Night:", 20, y)
    doc.setFont("helvetica", "normal")
    y += 6

    y = addField("Hotel Name", day.accommodation.name, 25, y)
    y = addField("Location", `${day.accommodation.name} [Google Maps Link]`, 25, y)

    y += 8
  })

  // Add a new page for notes
  doc.addPage()
  addHeader()

  // Notes Section
  y = addSection("NOTES", 40)

  itinerary.tips.forEach((tip: any) => {
    doc.setFont("helvetica", "bold")
    doc.text(`${tip.title}:`, 20, y)
    doc.setFont("helvetica", "normal")
    y += 6

    tip.content.forEach((item: string) => {
      doc.text(`• ${item}`, 25, y)
      y += 6
    })

    y += 4
  })

  // Add footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(10)
    doc.text("Generated by TripPlannrs • www.tripplannrs.com", 105, 285, { align: "center" })
  }

  // Return the PDF as a blob
  return doc.output("blob")
}
