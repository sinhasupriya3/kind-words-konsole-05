
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Calendar, Clock, MapPin, ArrowLeft, Share2, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";
import MainLayout from "@/components/layout/MainLayout";
import EventRegistrationForm, { AttendeeDetails } from "@/components/events/EventRegistrationForm";
import PaymentModal from "@/components/events/PaymentModal";
import { mockEvents } from "@/data/mockEvents";

const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  
  useEffect(() => {
    // Simulate API call with a delay
    const fetchEvent = async () => {
      try {
        // This will be replaced with actual API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const foundEvent = mockEvents.find((e) => e.id === id);
        
        if (foundEvent) {
          setEvent(foundEvent);
        } else {
          navigate("/events", { replace: true });
        }
      } catch (error) {
        console.error("Error fetching event:", error);
        // Handle error appropriately
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEvent();
  }, [id, navigate]);
  
  const handleRegister = async (eventId: string, attendeeDetails: AttendeeDetails) => {
    // This will be replaced with actual registration API call
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsRegistered(true);
      
      // Log the registration details (will be replaced with API call)
      console.log("Registration details:", { eventId, attendeeDetails });
      
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };
  
  const handleBuyTickets = () => {
    setIsPaymentModalOpen(true);
  };
  
  const handlePaymentSuccess = () => {
    setIsRegistered(true);
    toast({
      title: "Payment Successful",
      description: `You have successfully purchased tickets for ${event.title}`,
    });
  };
  
  const handleShare = () => {
    if (navigator.share && event) {
      navigator.share({
        title: event.title,
        text: `Check out this event: ${event.title}`,
        url: window.location.href,
      })
        .then(() => console.log("Shared successfully"))
        .catch((error) => {
          console.error("Error sharing:", error);
          // Fallback for browsers that don't support navigator.share
          navigator.clipboard.writeText(window.location.href);
          toast({
            title: "Link Copied",
            description: "Event link copied to clipboard",
          });
        });
    } else if (event) {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Event link copied to clipboard",
      });
    }
  };
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex flex-col gap-4">
          <div className="h-[300px] bg-muted animate-pulse rounded-lg"></div>
          <div className="h-8 w-1/2 bg-muted animate-pulse rounded"></div>
          <div className="h-4 w-1/3 bg-muted animate-pulse rounded"></div>
          <div className="h-4 w-full bg-muted animate-pulse rounded"></div>
          <div className="h-4 w-full bg-muted animate-pulse rounded"></div>
        </div>
      </MainLayout>
    );
  }
  
  if (!event) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
          <p className="mb-6 text-muted-foreground">
            The event you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/events")}>Browse Events</Button>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 mb-2" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </Button>
          
          <div className="overflow-hidden rounded-lg">
            <img
              src={event.image || "https://images.unsplash.com/photo-1501854140801-50d01698950b"}
              alt={event.title}
              className="w-full h-[300px] md:h-[400px] object-cover"
            />
          </div>
          
          <div className="bg-primary/5 text-primary px-3 py-1 rounded-full inline-block">
            {event.category}
          </div>
          
          <h1 className="text-3xl font-bold">{event.title}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start">
              <Calendar className="w-5 h-5 mr-3 text-muted-foreground flex-shrink-0" />
              <div>
                <div className="text-sm font-medium">Date</div>
                <div className="text-muted-foreground">
                  {format(new Date(event.date), "MMMM dd, yyyy")}
                </div>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock className="w-5 h-5 mr-3 text-muted-foreground flex-shrink-0" />
              <div>
                <div className="text-sm font-medium">Time</div>
                <div className="text-muted-foreground">{event.time}</div>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin className="w-5 h-5 mr-3 text-muted-foreground flex-shrink-0" />
              <div>
                <div className="text-sm font-medium">Location</div>
                <div className="text-muted-foreground">{event.location}</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border pt-6">
            <h2 className="text-xl font-semibold mb-4">About this event</h2>
            <div className="prose prose-sm max-w-none text-muted-foreground">
              {event.description.split('\n\n').map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="border border-border rounded-lg p-6 sticky top-24 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Event Details</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-3 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Date</div>
                  <div className="text-muted-foreground">
                    {format(new Date(event.date), "MMMM dd, yyyy")}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-3 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Time</div>
                  <div className="text-muted-foreground">{event.time}</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Location</div>
                  <div className="text-muted-foreground">{event.location}</div>
                </div>
              </div>
              
              <div className="py-2 px-3 bg-accent/10 rounded-md mt-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Ticket Price:</span>
                  <span className="font-bold">$49.99</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {event.totalSeats - event.enrolledSeats} seats remaining
                </div>
              </div>
            </div>
            
            {isRegistered ? (
              <Alert className="mb-6 bg-green-100 text-green-800 border-green-300">
                <AlertDescription>
                  You are registered for this event. We'll send you a confirmation email with more details.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-3">
                <Button 
                  className="w-full flex items-center justify-center"
                  onClick={handleBuyTickets}
                >
                  <Ticket className="mr-2 h-4 w-4" />
                  Buy Tickets Now
                </Button>
                
                <p className="text-xs text-center text-muted-foreground">
                  or
                </p>
                
                <EventRegistrationForm 
                  event={event} 
                  onRegister={handleRegister} 
                />
              </div>
            )}
            
            <Button 
              variant="outline" 
              onClick={handleShare} 
              className="mt-4 w-full flex items-center gap-2 justify-center"
            >
              <Share2 size={16} />
              <span>Share Event</span>
            </Button>
          </div>
        </div>
      </div>
      
      <PaymentModal
        event={event}
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSuccess={handlePaymentSuccess}
      />
    </MainLayout>
  );
};

export default EventDetailPage;
