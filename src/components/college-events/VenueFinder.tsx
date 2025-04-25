
import { useState } from "react";
import { MapPin, Calendar, Clock, Users, Wifi, Utensils, CircleParking, Accessibility, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Sample venue data - would be replaced with API call in a real application
const venues = [
  {
    id: "1",
    name: "Main Auditorium",
    location: "Administrative Block, Ground Floor",
    capacity: 500,
    facilities: ["Audio System", "Projector", "Air Conditioning", "Stage", "Wifi"],
    availableDates: ["2025-08-10", "2025-08-15", "2025-08-20", "2025-09-05"],
    pricePerHour: 5000,
    images: ["https://images.unsplash.com/photo-1571624436279-b272aff752b5"],
    nearbyAmenities: ["Parking", "Food Court", "Restrooms"],
    ratings: 4.8,
    reviews: 45
  },
  {
    id: "2",
    name: "Conference Hall",
    location: "Management Building, 2nd Floor",
    capacity: 150,
    facilities: ["Video Conferencing", "Projector", "Air Conditioning", "Wifi"],
    availableDates: ["2025-08-05", "2025-08-12", "2025-08-18", "2025-08-25"],
    pricePerHour: 2500,
    images: ["https://images.unsplash.com/photo-1517457373958-b7bdd4587205"],
    nearbyAmenities: ["Parking", "Cafeteria", "Restrooms"],
    ratings: 4.5,
    reviews: 32
  },
  {
    id: "3",
    name: "Open Amphitheater",
    location: "College Campus, Central Area",
    capacity: 300,
    facilities: ["Audio System", "Evening Lighting", "Open Air"],
    availableDates: ["2025-08-08", "2025-08-16", "2025-08-22", "2025-08-28"],
    pricePerHour: 3500,
    images: ["https://images.unsplash.com/photo-1584812345219-d731118157c0"],
    nearbyAmenities: ["Parking", "Food Stalls", "Restrooms"],
    ratings: 4.3,
    reviews: 28
  },
  {
    id: "4",
    name: "Sports Complex Hall",
    location: "Sports Building, Ground Floor",
    capacity: 200,
    facilities: ["Audio System", "Air Conditioning", "Seating Arrangements"],
    availableDates: ["2025-08-06", "2025-08-13", "2025-08-19", "2025-08-26"],
    pricePerHour: 3000,
    images: ["https://images.unsplash.com/photo-1594914701145-1606747e76d7"],
    nearbyAmenities: ["Parking", "Food Court", "Changing Rooms", "Restrooms"],
    ratings: 4.2,
    reviews: 19
  },
  {
    id: "5",
    name: "Smart Classroom",
    location: "Academic Block B, 3rd Floor",
    capacity: 80,
    facilities: ["Interactive Whiteboard", "Projector", "Air Conditioning", "Wifi"],
    availableDates: ["2025-08-04", "2025-08-11", "2025-08-18", "2025-08-25"],
    pricePerHour: 1500,
    images: ["https://images.unsplash.com/photo-1517164850305-99a3e65bb47e"],
    nearbyAmenities: ["Elevator", "Cafeteria", "Restrooms"],
    ratings: 4.6,
    reviews: 25
  }
];

const FacilityIcon = ({ name }: { name: string }) => {
  switch (name) {
    case "Wifi":
      return <Wifi size={16} />;
    case "Food Court":
    case "Cafeteria":
    case "Food Stalls":
      return <Utensils size={16} />;
    case "Parking":
      return <CircleParking size={16} />;
    case "Accessibility":
      return <Accessibility size={16} />;
    default:
      return <Check size={16} />;
  }
};

const VenueCard = ({ venue }: { venue: typeof venues[0] }) => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  
  return (
    <Card className="card-gradient overflow-hidden">
      <div 
        className="h-48 w-full bg-cover bg-center" 
        style={{ backgroundImage: `url(${venue.images[0]})` }}
      >
        <div className="w-full h-full bg-black bg-opacity-20 p-4 flex flex-col justify-end">
          <Badge className="self-start mb-2 bg-[#f0b67f] hover:bg-[#f0b67f]/90">
            {venue.capacity} Capacity
          </Badge>
        </div>
      </div>
      <CardHeader>
        <CardTitle>{venue.name}</CardTitle>
        <CardDescription className="flex items-center">
          <MapPin size={16} className="mr-1 text-[#fe5f55]" />
          {venue.location}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-1">Facilities</p>
            <div className="flex flex-wrap gap-2">
              {venue.facilities.map((facility, idx) => (
                <Badge key={idx} variant="outline" className="flex items-center gap-1">
                  <FacilityIcon name={facility} />
                  {facility}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium mb-1">Nearby Amenities</p>
            <div className="flex flex-wrap gap-2">
              {venue.nearbyAmenities.map((amenity, idx) => (
                <Badge key={idx} variant="outline" className="flex items-center gap-1">
                  <FacilityIcon name={amenity} />
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">Price</p>
              <p className="text-lg font-bold">₹{venue.pricePerHour.toLocaleString()} <span className="text-xs font-normal">per hour</span></p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Rating</p>
              <p className="flex items-center">
                {venue.ratings}
                <span className="text-[#f0b67f] ml-1">★</span>
                <span className="text-xs text-muted-foreground ml-1">({venue.reviews})</span>
              </p>
            </div>
          </div>
          
          <Accordion type="single" collapsible>
            <AccordionItem value="availability">
              <AccordionTrigger>Available Dates</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2">
                  {venue.availableDates.map((date, idx) => (
                    <div key={idx} className="flex items-center gap-1 text-sm">
                      <Calendar size={14} className="text-[#fe5f55]" />
                      {new Date(date).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setShowBookingForm(!showBookingForm)}>
          {showBookingForm ? "Cancel" : "Book Venue"}
        </Button>
        <Button>View Details</Button>
      </CardFooter>
      
      {showBookingForm && (
        <div className="px-6 pb-6">
          <div className="p-4 border rounded-md space-y-4">
            <h4 className="font-medium">Book {venue.name}</h4>
            
            <div>
              <label className="text-sm font-medium">Select Date</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a date" />
                </SelectTrigger>
                <SelectContent>
                  {venue.availableDates.map((date) => (
                    <SelectItem key={date} value={date}>
                      {new Date(date).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Start Time</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Start" />
                  </SelectTrigger>
                  <SelectContent>
                    {["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"].map((time) => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">End Time</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="End" />
                  </SelectTrigger>
                  <SelectContent>
                    {["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"].map((time) => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Event Purpose</label>
              <Input placeholder="Brief description of your event" />
            </div>
            
            <Button className="w-full">Submit Booking Request</Button>
          </div>
        </div>
      )}
    </Card>
  );
};

const VenueFinder = () => {
  const [capacity, setCapacity] = useState("all");
  const [facilities, setFacilities] = useState<string[]>([]);
  const allFacilities = Array.from(new Set(venues.flatMap(venue => venue.facilities)));
  
  const filteredVenues = venues.filter(venue => {
    const meetsCapacity = capacity === "all" || venue.capacity >= parseInt(capacity);
    const meetsFacilities = facilities.length === 0 || 
                            facilities.every(facility => venue.facilities.includes(facility));
    
    return meetsCapacity && meetsFacilities;
  });
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Find the Perfect Venue</CardTitle>
          <CardDescription>
            Search through available venues on and near campus for your event
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Minimum Capacity</label>
              <Select value={capacity} onValueChange={setCapacity}>
                <SelectTrigger>
                  <SelectValue placeholder="Any capacity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any capacity</SelectItem>
                  <SelectItem value="50">50+</SelectItem>
                  <SelectItem value="100">100+</SelectItem>
                  <SelectItem value="200">200+</SelectItem>
                  <SelectItem value="300">300+</SelectItem>
                  <SelectItem value="400">400+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Required Facilities</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select facilities" />
                </SelectTrigger>
                <SelectContent>
                  {allFacilities.map((facility) => (
                    <SelectItem key={facility} value={facility}>{facility}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Date</label>
              <Input type="date" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full sm:w-auto">Search Venues</Button>
        </CardFooter>
      </Card>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Available Venues</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredVenues.map(venue => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VenueFinder;
