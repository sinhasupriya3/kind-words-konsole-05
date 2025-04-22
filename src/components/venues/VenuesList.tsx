
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Wifi, ParkingCircle, Coffee, Accessibility } from "lucide-react";
import { Event, VenueDetails } from "@/components/events/EventCard";
import { mockEvents } from "@/data/mockEvents";

const VenuesList = () => {
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null);

  // Extract unique venues from events
  const venues = mockEvents.reduce<{[key: string]: VenueDetails & {events: Event[]}}>((acc, event) => {
    if (event.venueDetails) {
      const venueName = event.venueDetails.name;
      
      if (!acc[venueName]) {
        acc[venueName] = {
          ...event.venueDetails,
          events: [event]
        };
      } else {
        acc[venueName].events.push(event);
      }
    }
    return acc;
  }, {});

  const getIconForFacility = (facility: string) => {
    if (facility.toLowerCase().includes('wi-fi') || facility.toLowerCase().includes('internet')) {
      return <Wifi className="h-4 w-4" />;
    } else if (facility.toLowerCase().includes('parking')) {
      return <ParkingCircle className="h-4 w-4" />;
    } else if (facility.toLowerCase().includes('food') || facility.toLowerCase().includes('catering') || facility.toLowerCase().includes('refreshment')) {
      return <Coffee className="h-4 w-4" />;
    } else if (facility.toLowerCase().includes('accessibility')) {
      return <Accessibility className="h-4 w-4" />;
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="section-title mb-6">Popular Venues</h2>
        <p className="text-muted-foreground mt-4 mb-6">
          Explore our premium event venues across India. Click on a venue to see upcoming events.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(venues).map((venue) => (
          <Card key={venue.name} className={`card-gradient overflow-hidden transition-all ${selectedVenue === venue.name ? 'ring-2 ring-primary' : ''}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{venue.name}</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{venue.address}</p>
              </div>
              
              <div className="mt-3">
                <p className="text-sm font-medium mb-2">Facilities:</p>
                <div className="flex flex-wrap gap-2">
                  {venue.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center bg-background/80 px-2 py-1 rounded-md text-xs">
                      {getIconForFacility(facility) && (
                        <span className="mr-1 text-primary">{getIconForFacility(facility)}</span>
                      )}
                      {facility}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-3">
                <p className="text-sm font-medium mb-2">Upcoming Events: {venue.events.length}</p>
                {selectedVenue === venue.name && (
                  <div className="space-y-2 bg-muted/50 p-2 rounded-md">
                    {venue.events.map(event => (
                      <div key={event.id} className="text-sm">
                        <p className="font-medium">{event.title}</p>
                        <p className="text-xs text-muted-foreground">{event.date}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                variant={selectedVenue === venue.name ? "default" : "outline"} 
                className="w-full"
                onClick={() => setSelectedVenue(selectedVenue === venue.name ? null : venue.name)}
              >
                {selectedVenue === venue.name ? "Hide Events" : "Show Events"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VenuesList;
