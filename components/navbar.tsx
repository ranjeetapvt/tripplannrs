"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X, LogOut } from "lucide-react"
import { usePathname } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isLoggedIn =
    pathname.includes("/dashboard") || pathname.includes("/generate") || pathname.includes("/itinerary")

  // Mock user data - in a real app, this would come from your auth provider
  const user = isLoggedIn
    ? {
        name: "John Doe",
        email: "john.doe@example.com",
        initials: "JD",
      }
    : null

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSignOut = () => {
    // In a real app, this would handle sign out logic
    console.log("Sign out")
    // Redirect to home page
    window.location.href = "/"
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4">
        <Link href={isLoggedIn ? "/dashboard" : "/"} className="flex items-center space-x-2 font-bold">
          <span>TripPlannrs</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-6 md:flex">
          {isLoggedIn ? (
            <>
              <Link href="/generate" className="text-sm hover:text-primary">
                Generate Itinerary
              </Link>
              <Link href="/dashboard" className="text-sm hover:text-primary">
                My Trips
              </Link>
              <ModeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">{user?.initials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex flex-col items-start">
                    <span className="font-medium">{user?.name}</span>
                    <span className="text-xs text-muted-foreground">{user?.email}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="#features" className="text-sm hover:text-primary">
                Features
              </Link>
              <Link href="#testimonials" className="text-sm hover:text-primary">
                Testimonials
              </Link>
              <Link href="#about" className="text-sm hover:text-primary">
                About Us
              </Link>
              <Link href="#contact" className="text-sm hover:text-primary">
                Contact
              </Link>
              <ModeToggle />
              <Button size="sm" asChild>
                <Link href="/signin">Sign In</Link>
              </Button>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <ModeToggle />
          {isLoggedIn && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">{user?.initials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-col items-start">
                  <span className="font-medium">{user?.name}</span>
                  <span className="text-xs text-muted-foreground">{user?.email}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <button onClick={toggleMenu} className="text-foreground">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-b bg-background/95 px-4 py-4 backdrop-blur-sm md:hidden">
          <nav className="flex flex-col space-y-4">
            {isLoggedIn ? (
              <>
                <Link href="/generate" className="hover:text-primary" onClick={toggleMenu}>
                  Generate Itinerary
                </Link>
                <Link href="/dashboard" className="hover:text-primary" onClick={toggleMenu}>
                  My Trips
                </Link>
              </>
            ) : (
              <>
                <Link href="#features" className="hover:text-primary" onClick={toggleMenu}>
                  Features
                </Link>
                <Link href="#testimonials" className="hover:text-primary" onClick={toggleMenu}>
                  Testimonials
                </Link>
                <Link href="#about" className="hover:text-primary" onClick={toggleMenu}>
                  About Us
                </Link>
                <Link href="#contact" className="hover:text-primary" onClick={toggleMenu}>
                  Contact
                </Link>
                <Button className="w-full" onClick={toggleMenu} asChild>
                  <Link href="/signin">Sign In</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
