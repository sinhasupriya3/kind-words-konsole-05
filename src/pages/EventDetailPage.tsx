
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Calendar, Clock, MapPin, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";
import MainLayout from "@/components/layout/MainLayout";
import EventRegistrationForm, { AttendeeDetails } from "@/components/events/EventRegistrationForm";
import { Event } from "@/components/events/EventCard";

// Sample data - will be replaced with API call
const mockEvents: Event[] = [
  {
    id: "1",
    title: "Tech Conference 2025",
    description: "Join us for the biggest tech conference of the year featuring the latest innovations and industry leaders. This comprehensive conference covers a wide range of technology topics including AI, blockchain, cloud computing, and more. Network with industry professionals and gain insights from expert speakers.\n\nThis event includes keynote presentations, panel discussions, workshops, and networking sessions. Lunch and refreshments will be provided.",
    date: "2025-06-15",
    time: "09:00 AM - 05:00 PM",
    location: "Convention Center, San Francisco",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  },
  {
    id: "2",
    title: "Web Development Workshop",
    description: "A hands-on workshop for learning modern web development techniques and tools. This intensive workshop will cover HTML5, CSS3, JavaScript, React, and responsive design principles. Suitable for beginners and intermediate developers looking to enhance their skills.\n\nParticipants should bring their own laptops. The workshop will include practical exercises and projects to reinforce learning. Limited spots available, so register early to secure your place.",
    date: "2025-07-10",
    time: "10:00 AM - 03:00 PM",
    location: "Digital Academy, New York",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  },
  {
    id: "3",
    title: "Startup Networking Event",
    description: "Connect with founders, investors, and tech enthusiasts in this networking event. This is an excellent opportunity to meet potential partners, investors, and collaborators in the startup ecosystem. The event will feature lightning pitches, roundtable discussions, and structured networking sessions.\n\nLight refreshments and drinks will be served. Business casual attire recommended. Don't forget to bring your business cards!",
    date: "2025-05-20",
    time: "06:00 PM - 09:00 PM",
    location: "Innovation Hub, Seattle",
    category: "Networking",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  },
  {
    id: "4",
    title: "Data Science Symposium",
    description: "Explore the latest advances in data science, machine learning, and AI. This symposium brings together researchers, practitioners, and enthusiasts to discuss cutting-edge developments in the field. Topics include machine learning algorithms, big data processing, natural language processing, and ethical AI.\n\nThe symposium includes research presentations, poster sessions, and interactive demonstrations. Registration includes access to all sessions, conference materials, and lunch.",
    date: "2025-08-05",
    time: "09:00 AM - 06:00 PM",
    location: "Research Center, Boston",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
  },
  {
    id: "5",
    title: "UX/UI Design Masterclass",
    description: "Learn the principles of effective UX/UI design from industry experts. This masterclass covers user research, wireframing, prototyping, visual design, and usability testing. Participants will work on real-world design challenges and receive feedback from experienced designers.\n\nThe masterclass is suitable for designers at all levels, from beginners to experienced professionals looking to refine their skills. All necessary software and tools will be provided during the session.",
    date: "2025-06-25",
    time: "10:00 AM - 04:00 PM",
    location: "Design Studio, San Diego",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  },
  {
    id: "6",
    title: "Startup Pitch Competition",
    description: "Watch innovative startups pitch their ideas to investors and win funding. This high-energy event features promising startups competing for investment and recognition. Each team will have 5 minutes to pitch, followed by Q&A from our panel of experienced investors and entrepreneurs.\n\nAttendees will also have the opportunity to vote for the Audience Choice Award. Networking reception follows the pitch competition, allowing attendees to connect with participating startups and investors.",
    date: "2025-09-10",
    time: "02:00 PM - 08:00 PM",
    location: "Venture Capital Hub, Austin",
    category: "Business",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  },
];

const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  
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
          
          <div className="bg-primary/5 text-muted-foreground text-sm px-3 py-1 rounded-full inline-block">
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
            <div className="prose prose-sm max-w-none prose-p:text-muted-foreground">
              {event.description.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="border border-border rounded-lg p-6 sticky top-24">
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
            </div>
            
            {isRegistered ? (
              <Alert className="mb-6 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800">
                <AlertDescription>
                  You are registered for this event. We'll send you a confirmation email with more details.
                </AlertDescription>
              </Alert>
            ) : (
              <EventRegistrationForm 
                event={event} 
                onRegister={handleRegister} 
              />
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
    </MainLayout>
  );
};

export default EventDetailPage;
