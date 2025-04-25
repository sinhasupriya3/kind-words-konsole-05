
import { ReactNode, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Chatbot from "../chat/Chatbot";
import { Event } from "../events/EventCard";
import { useLocation } from "react-router-dom";
import { mockEvents } from "../../data/mockEvents";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [pageEvents, setPageEvents] = useState<Event[]>([]);
  const location = useLocation();

  useEffect(() => {
    // Determine what events to show to the chatbot based on the current page
    if (location.pathname === "/") {
      setPageEvents(mockEvents.slice(0, 3));
    } else if (location.pathname === "/events") {
      setPageEvents(mockEvents);
    } else if (location.pathname.startsWith("/events/")) {
      const eventId = location.pathname.split("/").pop();
      const event = mockEvents.find(e => e.id === eventId);
      setPageEvents(event ? [event] : []);
    } else if (location.pathname === "/college-events") {
      // Add college events to chatbot context
      setPageEvents(mockEvents.filter(e => e.category === "College"));
    } else {
      setPageEvents([]);
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
      <Footer />
      <Chatbot events={pageEvents} />
    </div>
  );
};

export default MainLayout;
