
import { useState } from "react";
import { 
  Search, 
  Calendar, 
  Tag, 
  Filter,
  Users,
  Clock,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";

// Sample data for college events
const collegeEvents = [
  {
    id: "1",
    title: "Annual Tech Symposium",
    description: "A gathering of tech enthusiasts to showcase latest innovations and research works.",
    date: "2025-08-15",
    time: "09:00 AM - 05:00 PM",
    location: "Main Auditorium, Engineering Block",
    category: "Technical",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94",
    organizer: "Computer Science Department",
    totalSeats: 200,
    enrolledSeats: 150,
    isRegistered: false
  },
  {
    id: "2",
    title: "Cultural Fest 'Rhythms'",
    description: "Annual cultural festival featuring music, dance, drama and art exhibitions.",
    date: "2025-09-20",
    time: "04:00 PM - 10:00 PM",
    location: "College Grounds",
    category: "Cultural",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
    organizer: "Cultural Committee",
    totalSeats: 500,
    enrolledSeats: 320,
    isRegistered: true
  },
  {
    id: "3",
    title: "Business Plan Competition",
    description: "Present your startup ideas and win funding support from industry experts.",
    date: "2025-07-05",
    time: "10:00 AM - 04:00 PM",
    location: "Management Block, Conference Hall",
    category: "Business",
    image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd",
    organizer: "E-Cell",
    totalSeats: 100,
    enrolledSeats: 75,
    isRegistered: false
  },
  {
    id: "4",
    title: "Scientific Research Symposium",
    description: "Platform for science researchers to present their findings and innovations.",
    date: "2025-07-25",
    time: "09:30 AM - 03:30 PM",
    location: "Science Block Auditorium",
    category: "Academic",
    image: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5",
    organizer: "Research Committee",
    totalSeats: 150,
    enrolledSeats: 90,
    isRegistered: false
  },
  {
    id: "5",
    title: "Alumni Meet 2025",
    description: "Annual gathering of college alumni to reconnect and network.",
    date: "2025-10-10",
    time: "05:00 PM - 09:00 PM",
    location: "College Banquet Hall",
    category: "Networking",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
    organizer: "Alumni Association",
    totalSeats: 300,
    enrolledSeats: 210,
    isRegistered: false
  },
  {
    id: "6",
    title: "Sports Tournament",
    description: "Inter-college sports competition featuring cricket, football, and basketball.",
    date: "2025-08-05",
    time: "08:00 AM - 06:00 PM",
    location: "College Sports Ground",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
    organizer: "Sports Committee",
    totalSeats: 400,
    enrolledSeats: 280,
    isRegistered: true
  }
];

const EventCard = ({ event }: { event: typeof collegeEvents[0] }) => {
  const [isRegistered, setIsRegistered] = useState(event.isRegistered);
  const remainingSeats = event.totalSeats - event.enrolledSeats;
  
  const handleRegister = () => {
    setIsRegistered(true);
    console.log(`Registered for ${event.title}`);
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };
  
  return (
    <Card className="card-gradient h-full flex flex-col">
      <CardHeader className="p-0">
        <div 
          className="h-48 w-full bg-cover bg-center rounded-t-lg" 
          style={{ backgroundImage: `url(${event.image})` }}
        >
          <div className="w-full h-full bg-black bg-opacity-30 rounded-t-lg p-4 flex flex-col justify-between">
            <Badge className="self-start bg-[#f0b67f] hover:bg-[#f0b67f]">
              {event.category}
            </Badge>
            
            <div className="self-end">
              <Badge variant="outline" className="bg-black bg-opacity-50 text-white border-none">
                {remainingSeats} seats left
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="mb-2 text-xl">{event.title}</CardTitle>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {event.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar size={16} className="text-[#fe5f55]" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock size={16} className="text-[#fe5f55]" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin size={16} className="text-[#fe5f55]" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users size={16} className="text-[#fe5f55]" />
            <span>Organized by {event.organizer}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              className={isRegistered ? "bg-[#a9def9] text-foreground hover:bg-[#a9def9]/90 w-full" : "w-full"}
              variant={isRegistered ? "outline" : "default"}
              disabled={isRegistered}
            >
              {isRegistered ? "Registered" : "Register Now"}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Register for {event.title}</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="mb-4">Are you sure you want to register for this event?</p>
              <p className="text-sm text-muted-foreground">
                Date: {formatDate(event.date)}<br />
                Time: {event.time}<br />
                Location: {event.location}
              </p>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={handleRegister}>Confirm Registration</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

const CollegeEventsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  const filteredEvents = collegeEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                     event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || event.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  const uniqueCategories = Array.from(new Set(collegeEvents.map(event => event.category)));
  
  return (
    <div className="space-y-6">
      {/* Search and filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex space-x-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {uniqueCategories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => {
            setSearchQuery("");
            setCategoryFilter("all");
          }}>
            <Filter size={16} className="mr-2" />
            Clear
          </Button>
        </div>
      </div>
      
      {/* Events grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-border rounded-md">
          <Tag className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No events found</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Try adjusting your search or filter to find events.
          </p>
        </div>
      )}
    </div>
  );
};

export default CollegeEventsList;
