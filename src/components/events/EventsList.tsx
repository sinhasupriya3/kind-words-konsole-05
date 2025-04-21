
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import EventCard, { Event } from "./EventCard";

interface EventsListProps {
  events: Event[];
  isLoading?: boolean;
  isUserDashboard?: boolean;
}

const EventsList = ({ events, isLoading = false, isUserDashboard = false }: EventsListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  
  // Get unique categories from events
  const categories = [...new Set(events.map((event) => event.category))];
  
  // Filter events based on search query and category
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "" || event.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            type="text"
            placeholder="Search events by name, description, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex-shrink-0 w-full sm:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        {categoryFilter && (
          <Button 
            variant="ghost" 
            onClick={() => setCategoryFilter("")}
            className="flex-shrink-0"
          >
            Clear
          </Button>
        )}
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div 
              key={n} 
              className="border border-border rounded-lg h-80 animate-pulse bg-muted"
            />
          ))}
        </div>
      ) : filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard 
              key={event.id} 
              event={event} 
              isUserDashboard={isUserDashboard} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No events found matching your criteria.</p>
          <Button 
            variant="link" 
            onClick={() => {
              setSearchQuery("");
              setCategoryFilter("");
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default EventsList;
