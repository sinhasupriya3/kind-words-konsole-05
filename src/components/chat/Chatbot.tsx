
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Event } from "@/components/events/EventCard";

interface ChatbotProps {
  events?: Event[];
}

const Chatbot = ({ events = [] }: ChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: "user" | "bot", content: string}[]>([
    {
      role: "bot",
      content: "Hello! I'm your event assistant. How can I help you today? Ask me about any event!"
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = { role: "user" as const, content: inputValue };
    setMessages([...messages, userMessage]);
    
    // Generate bot response about events
    setTimeout(() => {
      let botResponse = "I'm sorry, I don't have information about that specific question.";
      
      // Simple keyword matching for events
      const lowercaseInput = inputValue.toLowerCase();
      
      if (lowercaseInput.includes("event") || lowercaseInput.includes("events")) {
        if (events.length > 0) {
          botResponse = `We have ${events.length} events available. Some of them include: ${events.slice(0, 3).map(e => e.title).join(", ")}. Is there a specific event you're interested in?`;
        } else {
          botResponse = "We don't have any events listed at the moment. Please check back later!";
        }
      } else if (lowercaseInput.includes("ticket") || lowercaseInput.includes("registration") || lowercaseInput.includes("pay")) {
        botResponse = "You can register for an event by clicking the 'Register for Event' button on any event page. Payment is secured through our payment gateway.";
      } else {
        // Check if the user is asking about a specific event
        const mentionedEvent = events.find(event => 
          lowercaseInput.includes(event.title.toLowerCase()) || 
          lowercaseInput.includes(event.category.toLowerCase())
        );
        
        if (mentionedEvent) {
          botResponse = `${mentionedEvent.title} is happening on ${mentionedEvent.date} at ${mentionedEvent.time}, located at ${mentionedEvent.location}. It's a ${mentionedEvent.category} event. Would you like to register for this event?`;
        }
      }
      
      setMessages(prev => [...prev, { role: "bot", content: botResponse }]);
    }, 600);
    
    setInputValue("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen && (
        <Card className="mb-2 w-80 sm:w-96 shadow-lg border-primary/20">
          <CardHeader className="bg-primary/10 pb-2">
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
                placeholder="Ask about events..."
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
