
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Bot, X } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Event } from "@/components/events/EventCard";
import { useLocation } from "react-router-dom";

interface ChatbotProps {
  events?: Event[];
}

interface Message {
  role: "user" | "bot";
  content: string;
}

const Chatbot = ({ events = [] }: ChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "Hello! I'm your event assistant. How can I help you today? Ask me about events, venues, tickets, or anything else!"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const location = useLocation();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      let welcomeMessage = "";

      if (location.pathname === "/") {
        welcomeMessage = "Welcome to Eventory! I can help you discover exciting events across India. What are you interested in?";
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
      } else if (location.pathname === "/tickets") {
        welcomeMessage = "Looking for tickets? I can help you find the best events and answer any questions about ticket purchases.";
      } else if (location.pathname === "/about") {
        welcomeMessage = "You're exploring our About page! Let me know if you'd like to learn more about Eventory's mission and values.";
      }

      if (welcomeMessage && !messages.some(m => m.content === welcomeMessage)) {
        setMessages(prev => [...prev.slice(0, 1), { role: "bot", content: welcomeMessage }]);
      }
    }
  }, [isOpen, location.pathname, events, messages]);

  const getFallbackResponse = (): string => {
    const fallbacks = [
      "I'm here to help! Could you rephrase your question?",
      "I don't have specific information about that. How else can I assist you with our events?",
      "I'm still learning! Could you try asking about our events, tickets, or venues?",
      "I'm not sure I understood. Feel free to ask about event dates, ticket prices, registration process, or venue information.",
      "That's a great question! While I don't have that specific information, I'd be happy to help with questions about our events or ticket purchases."
    ];
    
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { role: "user" as const, content: inputValue };
    setMessages([...messages, userMessage]);
    
    setTimeout(() => {
      let botResponse = getFallbackResponse();
      
      const lowercaseInput = inputValue.toLowerCase();
      
      // Event type responses
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
      
      // General event questions
      else if (lowercaseInput.includes("event") || lowercaseInput.includes("events")) {
        if (events.length > 0) {
          botResponse = `We have ${events.length} events across different cities in India. Some of them include: ${events.slice(0, 3).map(e => e.title).join(", ")}. Is there a specific event or city you're interested in?`;
        } else {
          botResponse = "We don't have any events listed at the moment. Please check back later!";
        }
      } 
      
      // Ticket related questions
      else if (lowercaseInput.includes("ticket") || lowercaseInput.includes("registration") || lowercaseInput.includes("pay") || lowercaseInput.includes("book")) {
        botResponse = "You can purchase tickets for any event by clicking the 'Buy Tickets' button. We accept payments through Razorpay, which supports credit/debit cards, UPI, and net banking. Your tickets and confirmation will be sent to your email and phone number.";
      }
      else if (lowercaseInput.includes("refund") || lowercaseInput.includes("cancel")) {
        botResponse = "Our refund policy allows for full refunds up to 7 days before the event. Within 7 days, a 50% refund is available. No refunds are given within 24 hours of the event. For cancellations, please contact our support team at support@eventory.in with your booking reference.";
      }
      
      // Venue questions
      else if (lowercaseInput.includes("venue") || lowercaseInput.includes("location") || lowercaseInput.includes("place") || lowercaseInput.includes("where")) {
        botResponse = "Our events are hosted at premium venues across India including Bengaluru, Mumbai, Delhi, Hyderabad, and Kochi. Each venue offers different facilities. You can view detailed venue information on the specific event page.";
      }
      
      // Price questions
      else if (lowercaseInput.includes("price") || lowercaseInput.includes("cost") || lowercaseInput.includes("fee") || lowercaseInput.includes("much")) {
        botResponse = "Ticket prices vary depending on the event. Our workshops range from ₹799 to ₹899, conferences from ₹1499 to ₹1999, and networking events from ₹499 to ₹599. You can see the specific price on each event card.";
      }
      
      // City specific questions
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
      
      // Category questions
      else if (lowercaseInput.includes("tech") || lowercaseInput.includes("technology")) {
        const techEvents = events.filter(e => e.category.toLowerCase() === "technology");
        botResponse = techEvents.length > 0 
          ? `We have ${techEvents.length} technology events: ${techEvents.map(e => e.title).join(", ")}. These events cover topics like AI, data science, and more.` 
          : "We don't currently have technology events, but we're adding new events regularly.";
      }
      
      // Timing questions
      else if (lowercaseInput.includes("when") || lowercaseInput.includes("date") || lowercaseInput.includes("time")) {
        botResponse = "Each event has its own date and time. You can see this information on the event cards or on the detailed event page. We have events scheduled throughout 2025, with most concentrated between May and September.";
      }
      
      // FAQ questions
      else if (lowercaseInput.includes("faq") || lowercaseInput.includes("frequently asked")) {
        botResponse = "Our FAQ covers topics like ticket purchases, refunds, event schedules, venue accessibility, parking, and more. You can find the complete FAQ section on our website or ask me specific questions.";
      }
      else if (lowercaseInput.includes("parking") || lowercaseInput.includes("transport")) {
        botResponse = "Most of our venues offer parking facilities. For specific venues, you can check the venue details on the event page. We also recommend using public transportation where possible, as many of our venues are well-connected.";
      }
      else if (lowercaseInput.includes("wifi") || lowercaseInput.includes("internet")) {
        botResponse = "Most of our venues provide complimentary Wi-Fi for attendees. The connection details will be shared at the venue during the event.";
      }
      else if (lowercaseInput.includes("food") || lowercaseInput.includes("refreshments") || lowercaseInput.includes("drinks")) {
        botResponse = "Food and refreshment availability varies by event. Most full-day events include lunch and refreshments. For specific events, please check the event details page or contact our support team.";
      }
      else if (lowercaseInput.includes("dress code") || lowercaseInput.includes("attire")) {
        botResponse = "The dress code varies by event type. For professional conferences and networking events, business casual is recommended. For workshops and cultural events, casual attire is usually appropriate. Specific events may have dress code information in their details.";
      }
      else if (lowercaseInput.includes("accessibility") || lowercaseInput.includes("disabled")) {
        botResponse = "All our venues are accessible to people with disabilities. They include ramps, elevators, and accessible restrooms. If you have specific accessibility requirements, please contact us in advance at accessibility@eventory.in.";
      }
      
      // About the event platform
      else if (lowercaseInput.includes("about") || lowercaseInput.includes("company") || lowercaseInput.includes("eventory")) {
        botResponse = "Eventory is a comprehensive event platform connecting people through curated events across India. Our mission is to simplify event discovery and registration while providing exceptional experiences. You can learn more on our About page.";
      }
      else if (lowercaseInput.includes("contact") || lowercaseInput.includes("support") || lowercaseInput.includes("help")) {
        botResponse = "For support, you can contact us at support@eventory.in or call us at +91 98765 43210. Our support team is available Monday to Friday, 9 AM to 6 PM IST.";
      }
      
      // Event schedule questions
      else if (lowercaseInput.includes("schedule") || lowercaseInput.includes("agenda") || lowercaseInput.includes("program")) {
        botResponse = "Event schedules are available on each event's detail page. For multi-day conferences, you'll find a day-wise breakdown of sessions and activities. Schedules are typically finalized 2 weeks before the event.";
      }
      
      // Specific event mention
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
          <CardHeader className="bg-primary/10 pb-2 rounded-t-lg flex flex-row justify-between items-center">
            <CardTitle className="text-lg flex items-center">
              <Bot className="mr-2 h-5 w-5" />
              Event Assistant
            </CardTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8" 
              onClick={toggleChat}
            >
              <X className="h-4 w-4" />
            </Button>
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
              <div ref={messagesEndRef} />
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
