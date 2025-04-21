
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/layout/MainLayout";
import EventCard, { Event } from "@/components/events/EventCard";
import EventCountdown from "@/components/events/EventCountdown";

// Sample data - will be replaced with API calls
const registeredEvents: Event[] = [
  {
    id: "1",
    title: "Tech Conference 2025",
    description: "Join us for the biggest tech conference of the year featuring the latest innovations and industry leaders.",
    date: "2025-06-15",
    time: "09:00 AM - 05:00 PM",
    location: "Convention Center, San Francisco",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    isRegistered: true,
  },
  {
    id: "3",
    title: "Startup Networking Event",
    description: "Connect with founders, investors, and tech enthusiasts in this networking event.",
    date: "2025-05-20",
    time: "06:00 PM - 09:00 PM",
    location: "Innovation Hub, Seattle",
    category: "Networking",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    isRegistered: true,
  },
];

const searchedEvents: Event[] = [
  {
    id: "2",
    title: "Web Development Workshop",
    description: "A hands-on workshop for learning modern web development techniques and tools.",
    date: "2025-07-10",
    time: "10:00 AM - 03:00 PM",
    location: "Digital Academy, New York",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  },
  {
    id: "5",
    title: "UX/UI Design Masterclass",
    description: "Learn the principles of effective UX/UI design from industry experts.",
    date: "2025-06-25",
    time: "10:00 AM - 04:00 PM",
    location: "Design Studio, San Diego",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  },
];

const DashboardPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userName, setUserName] = useState("John"); // Will be replaced with actual user info
  
  // Simulate fetching user information
  useEffect(() => {
    // This will be replaced with actual API call
    const fetchUserInfo = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setUserName("John");
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
        
        {/* Upcoming events with countdown */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
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
        
        {/* Registered Events */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Registered Events</h2>
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
        
        {/* Recently Viewed/Searched Events */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recently Viewed Events</h2>
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
        
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
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
          
          <Card>
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
          
          <Card>
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
