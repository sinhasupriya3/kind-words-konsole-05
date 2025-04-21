
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Type for the event object
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
  isRegistered?: boolean;
}

interface EventCardProps {
  event: Event;
  isUserDashboard?: boolean;
}

const EventCard = ({ event, isUserDashboard = false }: EventCardProps) => {
  const formattedDate = format(new Date(event.date), "MMM dd, yyyy");
  
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={event.image || "https://images.unsplash.com/photo-1501854140801-50d01698950b"} 
          alt={event.title}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
          {event.category}
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold line-clamp-1">{event.title}</h3>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {event.description}
        </p>
        
        <div className="flex flex-col space-y-2 text-sm">
          <div className="flex items-center">
            <Calendar size={16} className="mr-2 text-muted-foreground" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center">
            <Clock size={16} className="mr-2 text-muted-foreground" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center">
            <MapPin size={16} className="mr-2 text-muted-foreground" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        {isUserDashboard ? (
          <div className="w-full space-y-2">
            {event.isRegistered && (
              <div className="text-sm bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 p-2 rounded">
                You are registered for this event
              </div>
            )}
            <div className="flex justify-between w-full">
              <Link to={`/events/${event.id}`} className="w-full">
                <Button variant="outline" className="w-full">View Details</Button>
              </Link>
            </div>
          </div>
        ) : (
          <Link to={`/events/${event.id}`} className="w-full">
            <Button className="w-full">View Details</Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventCard;
