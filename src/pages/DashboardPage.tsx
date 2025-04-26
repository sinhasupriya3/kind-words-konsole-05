import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Ticket, CalendarClock, MapPin, School } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/layout/MainLayout";
import EventCard, { Event } from "@/components/events/EventCard";
import EventCountdown from "@/components/events/EventCountdown";

const registeredEvents: Event[] = [
  {
    id: "1",
    title: "Tech Conference 2025",
    description: "Join us for the biggest tech conference of the year featuring the latest innovations and industry leaders.",
    date: "2025-06-15",
    time: "09:00 AM - 05:00 PM",
    location: "Bangalore International Exhibition Centre, Bengaluru",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    totalSeats: 500,
    enrolledSeats: 380,
    isRegistered: true,
    ticketPrice: 1999,
    venueDetails: {
      name: "Bangalore International Exhibition Centre",
      address: "10th Mile, Tumkur Road, Madavara, Bengaluru, Karnataka 562123",
      facilities: ["Wi-Fi", "Parking", "Food Court", "Accessibility Features"]
    }
  },
  {
    id: "3",
    title: "Startup Networking Event",
    description: "Connect with founders, investors, and tech enthusiasts in this networking event.",
    date: "2025-05-20",
    time: "06:00 PM - 09:00 PM",
    location: "Bombay Stock Exchange, Mumbai",
    category: "Networking",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    totalSeats: 200,
    enrolledSeats: 150,
    isRegistered: true,
    ticketPrice: 499,
    venueDetails: {
      name: "Bombay Stock Exchange",
      address: "Phiroze Jeejeebhoy Towers, Dalal Street, Mumbai, Maharashtra 400001",
      facilities: ["Rooftop Terrace", "Conference Rooms", "Catering"]
    }
  },
];

const searchedEvents: Event[] = [
  {
    id: "2",
    title: "Web Development Workshop",
    description: "A hands-on workshop for learning modern web development techniques and tools.",
    date: "2025-07-10",
    time: "10:00 AM - 03:00 PM",
    location: "T-Hub, Hyderabad",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    totalSeats: 100,
    enrolledSeats: 85,
    ticketPrice: 799,
    venueDetails: {
      name: "T-Hub",
      address: "TSIIC Phase 2, Raidurgam, Hyderabad, Telangana 500081",
      facilities: ["High-speed Internet", "Developer Workstations", "Refreshments"]
    }
  },
  {
    id: "5",
    title: "UX/UI Design Masterclass",
    description: "Learn the principles of effective UX/UI design from industry experts.",
    date: "2025-06-25",
    time: "10:00 AM - 04:00 PM",
    location: "Infopark, Kochi",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    totalSeats: 150,
    enrolledSeats: 120,
    ticketPrice: 899,
    venueDetails: {
      name: "Infopark",
      address: "Infopark Kochi Campus, Kakkanad, Kochi, Kerala 682042",
      facilities: ["Design Studios", "Discussion Areas", "Creative Spaces"]
    }
  },
];

const DashboardPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userName, setUserName] = useState("Rahul");
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setUserName("Rahul");
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    
    fetchUserInfo();
  }, []);
  
  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome, {userName}</h1>
            <p className="text-muted-foreground mt-2">
              Manage your registered events and discover new ones
            </p>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full min-w-[200px] sm:min-w-[300px]"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link to="/events">
            <Button variant="outline" className="w-full h-auto py-3 justify-start card-gradient">
              <CalendarClock className="mr-2 h-5 w-5" />
              Browse Events
            </Button>
          </Link>
          <Link to="/my-tickets">
            <Button variant="outline" className="w-full h-auto py-3 justify-start card-gradient">
              <Ticket className="mr-2 h-5 w-5" />
              My Tickets
            </Button>
          </Link>
          <Link to="/venues">
            <Button variant="outline" className="w-full h-auto py-3 justify-start card-gradient">
              <MapPin className="mr-2 h-5 w-5" />
              Explore Venues
            </Button>
          </Link>
          <Link to="/college-events">
            <Button variant="outline" className="w-full h-auto py-3 justify-start card-gradient">
              <School className="mr-2 h-5 w-5" />
              College Events
            </Button>
          </Link>
        </div>
        
        <div>
          <h2 className="section-title mb-6">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {registeredEvents.map((event) => (
              <EventCountdown 
                key={event.id} 
                targetDate={event.date} 
                eventTitle={event.title}
              />
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title">Your Registered Events</h2>
            <Link to="/events">
              <Button variant="outline" size="sm">
                Browse More Events
              </Button>
            </Link>
          </div>
          
          {registeredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {registeredEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  isUserDashboard={true}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground mb-4">
                  You haven't registered for any events yet.
                </p>
                <Link to="/events">
                  <Button>Browse Events</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title">Recently Viewed Events</h2>
          </div>
          
          {searchedEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchedEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event}
                  isUserDashboard={true} 
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">
                  No recently viewed events.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="card-gradient">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Registered Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {registeredEvents.length}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {registeredEvents.length === 0 ? 
                  "No events registered" : 
                  registeredEvents.length === 1 ? 
                    "1 event registered" : 
                    `${registeredEvents.length} events registered`}
              </p>
            </CardContent>
          </Card>
          
          <Card className="card-gradient">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {registeredEvents.filter(e => new Date(e.date) > new Date()).length}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                In the next 30 days
              </p>
            </CardContent>
          </Card>
          
          <Card className="card-gradient">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Past Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {registeredEvents.filter(e => new Date(e.date) < new Date()).length}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Events you've attended
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
