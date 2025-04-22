import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Event } from "@/components/events/EventCard";
import { useLocation } from "react-router-dom";

interface ChatbotProps {
  events?: Event[];
}

const Chatbot = ({ events = [] }: ChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: "user" | "bot", content: string}[]>([
    {
      role: "bot",
      content: "Hello! I'm your event assistant. How can I help you today? Ask me about events, venues, tickets, or anything else!"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const location = useLocation();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (isOpen) {
      let welcomeMessage = "";

      if (location.pathname === "/") {
        welcomeMessage = "Welcome to our event platform! I can help you discover exciting events across India. What are you interested in?";
      } else if (location.pathname === "/events") {
        welcomeMessage = `We have ${events.length} events available. You can ask me about any specific event or venue.`;
      } else if (location.pathname.startsWith("/events/")) {
        const eventId = location.pathname.split("/").pop();
        const currentEvent = events.find(event => event.id === eventId);
        if (currentEvent) {
          welcomeMessage = `You're viewing ${currentEvent.title}. It's happening on ${currentEvent.date} at ${currentEvent.location}. Ask me anything about this event!`;
        }
      } else if (location.pathname === "/dashboard") {
        welcomeMessage = "Welcome to your dashboard! I can help you manage your registered events and discover new ones.";
      }

      if (welcomeMessage && !messages.some(m => m.content === welcomeMessage)) {
        setMessages(prev => [...prev.slice(0, 1), { role: "bot", content: welcomeMessage }]);
      }
    }
  }, [isOpen, location.pathname, events]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { role: "user" as const, content: inputValue };
    setMessages([...messages, userMessage]);
    
    setTimeout(() => {
      let botResponse = "I'm sorry, I don't have specific information about that. Is there something else I can help you with?";
      
      const lowercaseInput = inputValue.toLowerCase();
      
      if (lowercaseInput.includes("festival")) {
        const festivals = events.filter(e => e.category.toLowerCase() === "festival");
        botResponse = festivals.length > 0 
          ? `We have ${festivals.length} festivals: ${festivals.map(e => e.title).join(", ")}. Would you like to know more about any specific festival?` 
          : "Currently we don't have any festivals listed, but check back soon for updates!";
      }
      else if (lowercaseInput.includes("concert")) {
        const concerts = events.filter(e => e.category.toLowerCase() === "concert");
        botResponse = concerts.length > 0 
          ? `We have ${concerts.length} concerts: ${concerts.map(e => e.title).join(", ")}. Would you like to know more about any specific concert?` 
          : "Currently we don't have any concerts listed, but check back soon for updates!";
      }
      else if (lowercaseInput.includes("workshop")) {
        const workshops = events.filter(e => e.category.toLowerCase() === "workshop");
        botResponse = workshops.length > 0 
          ? `We have ${workshops.length} workshops: ${workshops.map(e => e.title).join(", ")}. These are hands-on learning sessions with industry experts.` 
          : "Currently we don't have any workshops listed, but check back soon for updates!";
      }
      else if (lowercaseInput.includes("event") || lowercaseInput.includes("events")) {
        if (events.length > 0) {
          botResponse = `We have ${events.length} events across different cities in India. Some of them include: ${events.slice(0, 3).map(e => e.title).join(", ")}. Is there a specific event or city you're interested in?`;
        } else {
          botResponse = "We don't have any events listed at the moment. Please check back later!";
        }
      } 
      else if (lowercaseInput.includes("ticket") || lowercaseInput.includes("registration") || lowercaseInput.includes("pay") || lowercaseInput.includes("book")) {
        botResponse = "You can purchase tickets for any event by clicking the 'Buy Tickets' button. We accept payments through Razorpay, which supports credit/debit cards, UPI, and net banking. Your tickets and confirmation will be sent to your email and phone number.";
      }
      else if (lowercaseInput.includes("venue") || lowercaseInput.includes("location") || lowercaseInput.includes("place") || lowercaseInput.includes("where")) {
        botResponse = "Our events are hosted at premium venues across India including Bengaluru, Mumbai, Delhi, Hyderabad, and Kochi. Each venue offers different facilities. You can view detailed venue information on the specific event page.";
      }
      else if (lowercaseInput.includes("price") || lowercaseInput.includes("cost") || lowercaseInput.includes("fee") || lowercaseInput.includes("much")) {
        botResponse = "Ticket prices vary depending on the event. Our workshops range from ₹799 to ₹899, conferences from ₹1499 to ₹1999, and networking events from ₹499 to ₹599. You can see the specific price on each event card.";
      }
      else if (lowercaseInput.includes("bengaluru") || lowercaseInput.includes("bangalore")) {
        const bangaloreEvents = events.filter(e => e.location.toLowerCase().includes("bengaluru") || e.location.toLowerCase().includes("bangalore"));
        botResponse = bangaloreEvents.length > 0 
          ? `We have ${bangaloreEvents.length} events in Bengaluru: ${bangaloreEvents.map(e => e.title).join(", ")}. Would you like more details about any of these?` 
          : "We don't currently have events in Bengaluru, but we're adding new events regularly. Check back soon!";
      }
      else if (lowercaseInput.includes("mumbai") || lowercaseInput.includes("bombay")) {
        const mumbaiEvents = events.filter(e => e.location.toLowerCase().includes("mumbai"));
        botResponse = mumbaiEvents.length > 0 
          ? `We have ${mumbaiEvents.length} events in Mumbai: ${mumbaiEvents.map(e => e.title).join(", ")}. Would you like more details?` 
          : "We don't currently have events in Mumbai, but we're adding new events regularly. Check back soon!";
      }
      else if (lowercaseInput.includes("delhi") || lowercaseInput.includes("new delhi")) {
        const delhiEvents = events.filter(e => e.location.toLowerCase().includes("delhi"));
        botResponse = delhiEvents.length > 0 
          ? `We have ${delhiEvents.length} events in Delhi: ${delhiEvents.map(e => e.title).join(", ")}. Would you like more details?` 
          : "We don't currently have events in Delhi, but we're adding new events regularly. Check back soon!";
      }
      else if (lowercaseInput.includes("hyderabad")) {
        const hyderabadEvents = events.filter(e => e.location.toLowerCase().includes("hyderabad"));
        botResponse = hyderabadEvents.length > 0 
          ? `We have ${hyderabadEvents.length} events in Hyderabad: ${hyderabadEvents.map(e => e.title).join(", ")}. Would you like more details?` 
          : "We don't currently have events in Hyderabad, but we're adding new events regularly. Check back soon!";
      }
      else if (lowercaseInput.includes("tech") || lowercaseInput.includes("technology")) {
        const techEvents = events.filter(e => e.category.toLowerCase() === "technology");
        botResponse = techEvents.length > 0 
          ? `We have ${techEvents.length} technology events: ${techEvents.map(e => e.title).join(", ")}. These events cover topics like AI, data science, and more.` 
          : "We don't currently have technology events, but we're adding new events regularly.";
      }
      else if (lowercaseInput.includes("when") || lowercaseInput.includes("date") || lowercaseInput.includes("time")) {
        botResponse = "Each event has its own date and time. You can see this information on the event cards or on the detailed event page. We have events scheduled throughout 2025, with most concentrated between May and September.";
      }
      else {
        const mentionedEvent = events.find(event => 
          lowercaseInput.includes(event.title.toLowerCase())
        );
        
        if (mentionedEvent) {
          botResponse = `${mentionedEvent.title} is happening on ${mentionedEvent.date} at ${mentionedEvent.time}, located at ${mentionedEvent.location}. Tickets are priced at ₹${mentionedEvent.ticketPrice || 999}. ${mentionedEvent.totalSeats - mentionedEvent.enrolledSeats} seats are still available. Would you like to register for this event?`;
        }
      }
      
      setMessages(prev => [...prev, { role: "bot", content: botResponse }]);
    }, 600);
    
    setInputValue("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen && (
        <Card className="mb-2 w-80 sm:w-96 shadow-lg border-primary/20 card-gradient">
          <CardHeader className="bg-primary/10 pb-2 rounded-t-lg">
            <CardTitle className="text-lg flex items-center">
              <Bot className="mr-2 h-5 w-5" />
              Event Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 max-h-96 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs sm:max-w-md p-3 rounded-lg ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="p-3 pt-0">
            <form onSubmit={handleSubmit} className="flex w-full gap-2">
              <Input
                type="text"
                placeholder="Ask about events, venues, tickets..."
                value={inputValue}
                onChange={handleInputChange}
                className="flex-1"
              />
              <Button type="submit" size="sm">
                Send
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
      <Button
        onClick={toggleChat}
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg"
      >
        <Bot className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default Chatbot;
