
import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Ticket,
  Users,
  BarChart3,
  TrendingUp,
  ArrowUpRight,
  Download,
  Clock,
  MapPin,
  CalendarPlus
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample data for upcoming events
const upcomingEvents = [
  {
    id: "1",
    title: "Tech Conference 2025",
    date: "2025-08-15",
    time: "09:00 AM - 05:00 PM",
    location: "Convention Center, Mumbai",
    ticketPrice: 999,
    attendees: 250,
    maxCapacity: 350,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87"
  },
  {
    id: "2",
    title: "Design Workshop",
    date: "2025-07-12",
    time: "10:00 AM - 02:00 PM",
    location: "Creative Hub, Bengaluru",
    ticketPrice: 499,
    attendees: 45,
    maxCapacity: 50,
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b"
  },
  {
    id: "3",
    title: "Marketing Summit",
    date: "2025-09-08",
    time: "09:30 AM - 04:30 PM",
    location: "Business Center, Delhi",
    ticketPrice: 1299,
    attendees: 180,
    maxCapacity: 300,
    image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a"
  }
];

// Chart data (would be dynamic in a real app)
const monthlyStats = {
  events: [45, 52, 38, 60, 56, 65, 70],
  attendees: [1200, 1350, 900, 1700, 1500, 1800, 2100],
  revenue: [350000, 420000, 280000, 510000, 460000, 550000, 620000]
};

const DashboardPage = () => {
  const [timeframe, setTimeframe] = useState("weekly");
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  const getCompletionPercentage = (attendees: number, capacity: number) => {
    return Math.round((attendees / capacity) * 100);
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your events, track performance, and analyze data.
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button>
              <CalendarPlus className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </div>
        </div>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="stats-card">
            <CardContent className="p-6">
              <div className="stats-icon bg-[#EEF2FF] text-eventory-primary">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="stats-value">28</div>
              <div className="stats-label">Total Events</div>
            </CardContent>
          </Card>
          
          <Card className="stats-card">
            <CardContent className="p-6">
              <div className="stats-icon bg-[#FFF4ED] text-eventory-accent">
                <Ticket className="h-5 w-5" />
              </div>
              <div className="stats-value">864</div>
              <div className="stats-label">Tickets Sold</div>
            </CardContent>
          </Card>
          
          <Card className="stats-card">
            <CardContent className="p-6">
              <div className="stats-icon bg-[#F0F9FF] text-eventory-tertiary">
                <Users className="h-5 w-5" />
              </div>
              <div className="stats-value">5.2k</div>
              <div className="stats-label">Total Attendees</div>
            </CardContent>
          </Card>
          
          <Card className="stats-card">
            <CardContent className="p-6">
              <div className="stats-icon bg-[#FFF1F0] text-eventory-secondary">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div className="stats-value">₹2.4M</div>
              <div className="stats-label">Revenue</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Analytics Section */}
        <Card className="app-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>
                Track event performance and metrics over time
              </CardDescription>
            </div>
            <Select
              value={timeframe}
              onValueChange={setTimeframe}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Last 7 days</SelectItem>
                <SelectItem value="monthly">Last 30 days</SelectItem>
                <SelectItem value="quarterly">Last 90 days</SelectItem>
                <SelectItem value="yearly">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="events">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="events">Events</TabsTrigger>
                  <TabsTrigger value="attendees">Attendees</TabsTrigger>
                  <TabsTrigger value="revenue">Revenue</TabsTrigger>
                </TabsList>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>

              <TabsContent value="events" className="space-y-4">
                {/* In a real app, this would be a chart component */}
                <div className="h-[300px] flex flex-col justify-center items-center bg-muted/20 rounded-lg border border-dashed">
                  <BarChart3 className="h-16 w-16 text-muted-foreground mb-2" />
                  <p className="text-center text-muted-foreground">
                    Event growth chart would display here
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm text-muted-foreground">Events This Month</div>
                      <div className="text-2xl font-bold flex items-center gap-2">
                        12
                        <span className="text-sm text-green-500 font-normal flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +18%
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm text-muted-foreground">Avg. Attendance Rate</div>
                      <div className="text-2xl font-bold">78%</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm text-muted-foreground">Most Popular Type</div>
                      <div className="text-2xl font-bold">Workshop</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm text-muted-foreground">Completion Rate</div>
                      <div className="text-2xl font-bold flex items-center gap-2">
                        92%
                        <span className="text-sm text-green-500 font-normal flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          +5%
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="attendees" className="space-y-4">
                {/* Attendee charts would go here */}
                <div className="h-[300px] flex flex-col justify-center items-center bg-muted/20 rounded-lg border border-dashed">
                  <Users className="h-16 w-16 text-muted-foreground mb-2" />
                  <p className="text-center text-muted-foreground">
                    Attendee growth chart would display here
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="revenue" className="space-y-4">
                {/* Revenue charts would go here */}
                <div className="h-[300px] flex flex-col justify-center items-center bg-muted/20 rounded-lg border border-dashed">
                  <TrendingUp className="h-16 w-16 text-muted-foreground mb-2" />
                  <p className="text-center text-muted-foreground">
                    Revenue growth chart would display here
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Upcoming Events */}
        <Card className="app-card overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Events scheduled for the coming weeks</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {upcomingEvents.map(event => (
                <Card key={event.id} className="overflow-hidden">
                  <div 
                    className="h-32 bg-cover bg-center" 
                    style={{ backgroundImage: `url(${event.image})` }}
                  ></div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg line-clamp-1">{event.title}</h3>
                    <div className="grid grid-cols-[16px_1fr] gap-x-2 gap-y-1 mt-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(event.date)}</span>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{event.time}</span>
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Attendance</span>
                        <span>{event.attendees}/{event.maxCapacity}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full">
                        <div 
                          className="h-2 bg-eventory-primary rounded-full" 
                          style={{ width: `${getCompletionPercentage(event.attendees, event.maxCapacity)}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Features Box */}
        <Card>
          <CardHeader>
            <CardTitle>Advanced Cloud Features</CardTitle>
            <CardDescription>
              Scale your events with our enterprise-grade cloud infrastructure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-eventory-primary" />
                    Hybrid Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Seamlessly manage in-person and virtual attendees with our hybrid event tools. 
                    Includes live streaming integration and virtual networking rooms.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-eventory-accent" />
                    Auto-scaling Storage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our cloud infrastructure automatically scales as your event grows. 
                    Never worry about storage limits for event materials, recordings, or attendee data.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ArrowUpRight className="h-5 w-5 text-eventory-secondary" />
                    Live Updates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Push real-time updates to all attendees instantly. Keep everyone informed about schedule
                    changes, venue updates, or important announcements.
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
