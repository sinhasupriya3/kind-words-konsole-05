
import { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Calendar, MapPin, Clock, Users, Ticket } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PaymentModal from "./PaymentModal";
import { toast } from "@/hooks/use-toast";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
  totalSeats: number;
  enrolledSeats: number;
  isRegistered?: boolean;
}

interface EventCardProps {
  event: Event;
  isUserDashboard?: boolean;
}

const EventCard = ({ event, isUserDashboard = false }: EventCardProps) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const formattedDate = format(new Date(event.date), "MMM dd, yyyy");
  const availableSeats = event.totalSeats - event.enrolledSeats;
  
  const handleBuyTickets = () => {
    setIsPaymentModalOpen(true);
  };
  
  const handlePaymentSuccess = () => {
    // In a real app, you would update the backend here
    toast({
      title: "Registration Complete",
      description: `You have successfully registered for ${event.title}`,
    });
  };
  
  return (
    <>
      <Card className="h-full flex flex-col hover:shadow-md transition-shadow bg-gradient-to-br from-card to-card/95 border-accent/20">
        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          <img 
            src={event.image || "https://images.unsplash.com/photo-1501854140801-50d01698950b"} 
            alt={event.title}
            className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
            {event.category}
          </div>
        </div>
        
        <CardHeader className="pb-2">
          <h3 className="text-lg font-semibold line-clamp-1 text-foreground">{event.title}</h3>
        </CardHeader>
        
        <CardContent className="flex-grow space-y-4">
          <p className="text-muted-foreground text-sm line-clamp-2">
            {event.description}
          </p>
          
          <div className="flex flex-col space-y-2 text-sm">
            <div className="flex items-center text-muted-foreground">
              <Calendar size={16} className="mr-2" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Clock size={16} className="mr-2" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <MapPin size={16} className="mr-2" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Users size={16} className="mr-2" />
              <span>
                {availableSeats} seats available
                <span className="text-xs ml-1">
                  ({event.enrolledSeats}/{event.totalSeats})
                </span>
              </span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="pt-4">
          {isUserDashboard ? (
            <div className="w-full space-y-2">
              {event.isRegistered && (
                <div className="text-sm bg-primary/20 text-primary p-2 rounded-lg">
                  You are registered for this event
                </div>
              )}
              <div className="flex justify-between w-full">
                <Link to={`/events/${event.id}`} className="w-full">
                  <Button variant="outline" className="w-full hover:bg-primary/20">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 w-full">
              <Link to={`/events/${event.id}`}>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </Link>
              <Button 
                className="w-full flex items-center"
                onClick={handleBuyTickets}
              >
                <Ticket className="mr-1 h-4 w-4" />
                Buy Tickets
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
      
      <PaymentModal 
        event={event}
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSuccess={handlePaymentSuccess}
      />
    </>
  );
};

export default EventCard;
