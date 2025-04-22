
import { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { 
  Ticket, 
  Filter, 
  Calendar, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  TicketX 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MainLayout from "@/components/layout/MainLayout";
import { mockEvents } from "@/data/mockEvents";
import { Event } from "@/components/events/EventCard";
import { toast } from "@/hooks/use-toast";

const TicketsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPrice, setSelectedPrice] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const categories = [...new Set(mockEvents.map(event => event.category))];
  
  // Filter events based on search query and filters
  const filteredEvents = mockEvents.filter(event => {
    // Search filter
    const matchesSearch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    
    // Price filter
    let matchesPrice = true;
    if (selectedPrice === "below-500") {
      matchesPrice = (event.ticketPrice || 0) < 500;
    } else if (selectedPrice === "500-1000") {
      matchesPrice = (event.ticketPrice || 0) >= 500 && (event.ticketPrice || 0) <= 1000;
    } else if (selectedPrice === "above-1000") {
      matchesPrice = (event.ticketPrice || 0) > 1000;
    }
    
    return matchesSearch && matchesCategory && matchesPrice;
  });
  
  // Sort filtered events
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === "price-low") {
      return (a.ticketPrice || 0) - (b.ticketPrice || 0);
    } else if (sortBy === "price-high") {
      return (b.ticketPrice || 0) - (a.ticketPrice || 0);
    } else if (sortBy === "availability") {
      const aAvailable = a.totalSeats - a.enrolledSeats;
      const bAvailable = b.totalSeats - b.enrolledSeats;
      return bAvailable - aAvailable;
    }
    return 0;
  });
  
  const handleAddToCart = (event: Event) => {
    toast({
      title: "Added to cart",
      description: `${event.title} ticket has been added to your cart.`,
    });
  };
  
  const handleBuyNow = (event: Event) => {
    // Navigate to event detail page
    window.location.href = `/events/${event.id}`;
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tickets on Sale</h1>
          <p className="text-muted-foreground mt-2">
            Browse and purchase tickets for upcoming events
          </p>
        </div>
        
        {/* Search and filters */}
        <Card className="card-gradient">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Input
                  type="text"
                  placeholder="Search events, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  className="flex items-center"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <Filter className="mr-1 h-4 w-4" />
                  Filters
                  {isFilterOpen ? (
                    <ChevronUp className="ml-1 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </Button>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="min-w-[160px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Sort by Date</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="availability">Availability</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {isFilterOpen && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price Range</label>
                  <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select price range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="below-500">Below ₹500</SelectItem>
                      <SelectItem value="500-1000">₹500 - ₹1000</SelectItem>
                      <SelectItem value="above-1000">Above ₹1000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Tickets list */}
        {sortedEvents.length > 0 ? (
          <div className="space-y-4">
            {sortedEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden card-gradient">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-56 h-48">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-grow p-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-lg">{event.title}</h3>
                        <span className="text-sm bg-accent/60 text-accent-foreground px-2 py-1 rounded font-medium">
                          ₹{event.ticketPrice || 999}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-y-1">
                        <div className="flex items-center mr-4 text-sm text-muted-foreground">
                          <Calendar className="mr-1 h-4 w-4" />
                          {format(new Date(event.date), "MMM dd, yyyy")}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-1 h-4 w-4" />
                          {event.location}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {event.description}
                      </p>
                    </div>
                    
                    <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <div className="text-sm">
                        <span className="font-medium">
                          {event.totalSeats - event.enrolledSeats} tickets available
                        </span>
                        <div className="w-full bg-muted h-1.5 rounded-full mt-1">
                          <div
                            className="bg-primary h-1.5 rounded-full"
                            style={{
                              width: `${(event.enrolledSeats / event.totalSeats) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-3 sm:mt-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddToCart(event)}
                        >
                          <Ticket className="mr-1 h-4 w-4" />
                          Add to Cart
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleBuyNow(event)}
                        >
                          Buy Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="py-12">
            <CardContent className="flex flex-col items-center justify-center text-center">
              <TicketX className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No tickets found</h3>
              <p className="text-muted-foreground mb-4">
                We couldn't find any tickets matching your search criteria.
              </p>
              <Button onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedPrice("all");
              }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default TicketsPage;
