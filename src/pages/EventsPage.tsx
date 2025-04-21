
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import EventsList from "@/components/events/EventsList";
import { Event } from "@/components/events/EventCard";

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Tech Conference 2025",
    description: "Join us for the biggest tech conference of the year featuring the latest innovations and industry leaders.",
    date: "2025-06-15",
    time: "09:00 AM - 05:00 PM",
    location: "Taj Lands End, Mumbai",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    totalSeats: 500,
    enrolledSeats: 380,
  },
  {
    id: "2",
    title: "Web Development Workshop",
    description: "A hands-on workshop for learning modern web development techniques and tools.",
    date: "2025-07-10",
    time: "10:00 AM - 03:00 PM",
    location: "The Leela Palace, Bengaluru",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    totalSeats: 100,
    enrolledSeats: 85,
  },
  {
    id: "3",
    title: "Startup Networking Event",
    description: "Connect with founders, investors, and tech enthusiasts in this networking event.",
    date: "2025-05-20",
    time: "06:00 PM - 09:00 PM",
    location: "The Oberoi, New Delhi",
    category: "Networking",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    totalSeats: 200,
    enrolledSeats: 150,
  },
  {
    id: "4",
    title: "Data Science Symposium",
    description: "Explore the latest advances in data science, machine learning, and AI.",
    date: "2025-08-05",
    time: "09:00 AM - 06:00 PM",
    location: "ITC Grand Chola, Chennai",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    totalSeats: 300,
    enrolledSeats: 275,
  },
  {
    id: "5",
    title: "UX/UI Design Masterclass",
    description: "Learn the principles of effective UX/UI design from industry experts.",
    date: "2025-06-25",
    time: "10:00 AM - 04:00 PM",
    location: "Hyatt Regency, Hyderabad",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    totalSeats: 150,
    enrolledSeats: 120,
  },
  {
    id: "6",
    title: "Startup Pitch Competition",
    description: "Watch innovative startups pitch their ideas to investors and win funding.",
    date: "2025-09-10",
    time: "02:00 PM - 08:00 PM",
    location: "Grand Hyatt, Goa",
    category: "Business",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    totalSeats: 250,
    enrolledSeats: 200,
  },
];

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call with a delay
    const fetchEvents = async () => {
      try {
        // This will be replaced with actual API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setEvents(mockEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
        // Handle error appropriately
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEvents();
  }, []);
  
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Browse Events</h1>
          <p className="text-muted-foreground mt-2">
            Discover and register for exciting events in your area
          </p>
        </div>
        
        <EventsList 
          events={events} 
          isLoading={isLoading} 
        />
      </div>
    </MainLayout>
  );
};

export default EventsPage;
