
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import EventsList from "@/components/events/EventsList";
import { mockEvents } from "@/data/mockEvents";

const EventsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call with a delay
    const fetchEvents = async () => {
      try {
        // This will be replaced with actual API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
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
          events={mockEvents} 
          isLoading={isLoading} 
        />
      </div>
    </MainLayout>
  );
};

export default EventsPage;
