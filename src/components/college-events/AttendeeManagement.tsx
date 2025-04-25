import { useState } from "react";
import { 
  Users, 
  UserPlus, 
  FileText, 
  Mail, 
  Download, 
  ChevronDown,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  Search
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

// Sample data - would be replaced with API calls in a real application
const myEvents = [
  {
    id: "1",
    title: "Tech Symposium 2025",
    date: "2025-09-15",
    time: "10:00 AM - 04:00 PM",
    registrations: 145,
    capacity: 200,
    status: "Upcoming"
  },
  {
    id: "2",
    title: "Annual Cultural Fest",
    date: "2025-10-20",
    time: "05:00 PM - 10:00 PM",
    registrations: 320,
    capacity: 500,
    status: "Upcoming"
  },
  {
    id: "3",
    title: "Engineering Workshop",
    date: "2025-08-05",
    time: "09:00 AM - 01:00 PM",
    registrations: 78,
    capacity: 80,
    status: "Full"
  },
  {
    id: "4",
    title: "Alumni Meet 2024",
    date: "2024-12-10",
    time: "06:00 PM - 09:00 PM",
    registrations: 210,
    capacity: 300,
    status: "Completed"
  }
];

// Sample attendee data for a selected event
const attendees = [
  {
    id: "1",
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "9876543210",
    registrationDate: "2025-08-01",
    status: "Confirmed",
    attendance: null,
    college: "Delhi Technical University",
    course: "B.Tech Computer Science"
  },
  {
    id: "2",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "8765432109",
    registrationDate: "2025-08-02",
    status: "Confirmed",
    attendance: null,
    college: "St. Xavier's College",
    course: "BBA Marketing"
  },
  {
    id: "3",
    name: "Amit Kumar",
    email: "amit.kumar@example.com",
    phone: "7654321098",
    registrationDate: "2025-08-03",
    status: "Waitlist",
    attendance: null,
    college: "IIT Mumbai",
    course: "M.Tech Electronics"
  },
  {
    id: "4",
    name: "Sneha Gupta",
    email: "sneha.gupta@example.com",
    phone: "6543210987",
    registrationDate: "2025-08-04",
    status: "Confirmed",
    attendance: null,
    college: "Symbiosis Institute",
    course: "MBA Finance"
  },
  {
    id: "5",
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    phone: "9876543211",
    registrationDate: "2025-08-05",
    status: "Cancelled",
    attendance: null,
    college: "Delhi University",
    course: "B.Com Economics"
  }
];

// Status badge color mapping
const statusColors = {
  Confirmed: "bg-green-500 hover:bg-green-600",
  Waitlist: "bg-amber-500 hover:bg-amber-600",
  Cancelled: "bg-red-500 hover:bg-red-600",
  Attended: "bg-blue-500 hover:bg-blue-600",
  "No-show": "bg-slate-500 hover:bg-slate-600"
};

const AttendeeManagement = () => {
  const [selectedEvent, setSelectedEvent] = useState(myEvents[0]);
  const [filteredAttendees, setFilteredAttendees] = useState(attendees);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query && statusFilter === "all") {
      setFilteredAttendees(attendees);
      return;
    }
    
    const filtered = attendees.filter(attendee => {
      const matchesQuery = !query || 
        attendee.name.toLowerCase().includes(query.toLowerCase()) || 
        attendee.email.toLowerCase().includes(query.toLowerCase()) ||
        attendee.phone.includes(query);
      
      const matchesStatus = statusFilter === "all" || attendee.status === statusFilter;
      
      return matchesQuery && matchesStatus;
    });
    
    setFilteredAttendees(filtered);
  };
  
  const handleFilterByStatus = (status: string) => {
    setStatusFilter(status);
    
    if (status === "all" && !searchQuery) {
      setFilteredAttendees(attendees);
      return;
    }
    
    const filtered = attendees.filter(attendee => {
      const matchesQuery = !searchQuery || 
        attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        attendee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attendee.phone.includes(searchQuery);
      
      const matchesStatus = status === "all" || attendee.status === status;
      
      return matchesQuery && matchesStatus;
    });
    
    setFilteredAttendees(filtered);
  };
  
  const handleSendReminder = (attendeeIds: string[]) => {
    console.log("Sending reminder to:", attendeeIds);
    // In a real app, this would call an API to send reminders
  };
  
  const handleUpdateStatus = (attendeeId: string, newStatus: string) => {
    console.log(`Updating status for ${attendeeId} to ${newStatus}`);
    // In a real app, this would update the status in the database
  };
  
  const handleBulkAction = (action: string) => {
    console.log(`Performing bulk action: ${action}`);
    // In a real app, this would perform the selected action on all attendees
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 text-[#fe5f55]" />
            Attendee Management
          </CardTitle>
          <CardDescription>
            Track and manage attendees for your events. Send communications, update statuses, and more.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Registration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myEvents.map((event) => (
                <TableRow 
                  key={event.id}
                  className={selectedEvent.id === event.id ? "bg-muted/40" : ""}
                  onClick={() => setSelectedEvent(event)}
                >
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4 text-[#fe5f55]" />
                      {formatDate(event.date)}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center mt-1">
                      <Clock className="mr-1 h-3 w-3" />
                      {event.time}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      {event.registrations}/{event.capacity}
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                      <div 
                        className="h-2 rounded-full bg-[#a9def9]" 
                        style={{ width: `${(event.registrations / event.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        event.status === "Upcoming" ? "border-green-500 text-green-600" :
                        event.status === "Full" ? "border-amber-500 text-amber-600" :
                        "border-slate-500 text-slate-600"
                      }
                    >
                      {event.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setSelectedEvent(event)}
                    >
                      Manage
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {selectedEvent && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h3 className="text-xl font-semibold">{selectedEvent.title} - Attendees</h3>
              <p className="text-muted-foreground">
                <Calendar className="inline mr-1 h-4 w-4" /> 
                {formatDate(selectedEvent.date)} • 
                <Clock className="inline mx-1 h-4 w-4" /> 
                {selectedEvent.time}
              </p>
            </div>
            
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    <span className="hidden md:inline">Add Attendees</span>
                    <span className="inline md:hidden">Add</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Attendees</DialogTitle>
                    <DialogDescription>
                      Add new attendees to {selectedEvent.title}
                    </DialogDescription>
                  </DialogHeader>
                  <Tabs defaultValue="manual">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                      <TabsTrigger value="bulk">Bulk Upload</TabsTrigger>
                    </TabsList>
                    <TabsContent value="manual" className="space-y-4 mt-4">
                      <div>
                        <label className="text-sm font-medium">Name</label>
                        <Input placeholder="Full name" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <Input type="email" placeholder="Email address" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Phone</label>
                        <Input placeholder="Phone number" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">College/Institution</label>
                        <Input placeholder="College name" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Course/Department</label>
                        <Input placeholder="Course details" />
                      </div>
                    </TabsContent>
                    <TabsContent value="bulk" className="space-y-4 mt-4">
                      <div className="text-center p-8 border-2 border-dashed border-muted-foreground/25 rounded-md">
                        <FileText className="mx-auto h-10 w-10 text-muted-foreground" />
                        <p className="mt-2 text-sm font-medium">
                          Upload CSV or Excel file
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          File should contain name, email, phone, and other details
                        </p>
                        <Button variant="outline" className="mt-4">
                          Select File
                        </Button>
                      </div>
                      <div>
                        <Button variant="outline" className="w-full">
                          <Download className="mr-2 h-4 w-4" />
                          Download Template
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button>Add Attendee</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Bulk Actions <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleBulkAction("email")}>
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Send Email to All</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleBulkAction("export")}>
                    <Download className="mr-2 h-4 w-4" />
                    <span>Export Attendee List</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleBulkAction("checkin")}>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    <span>Mark All as Attended</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <Card className="card-gradient">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input
                    type="text"
                    placeholder="Search by name, email, or phone..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <div>
                  <Select value={statusFilter} onValueChange={handleFilterByStatus}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Confirmed">Confirmed</SelectItem>
                      <SelectItem value="Waitlist">Waitlist</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                      <SelectItem value="Attended">Attended</SelectItem>
                      <SelectItem value="No-show">No-show</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Attendee</TableHead>
                      <TableHead>Registration</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>College</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAttendees.map((attendee) => (
                      <TableRow key={attendee.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{attendee.name}</p>
                            <p className="text-sm text-muted-foreground">{attendee.email}</p>
                            <p className="text-xs text-muted-foreground">{attendee.phone}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          {formatDate(attendee.registrationDate)}
                        </TableCell>
                        <TableCell>
                          <Badge className={statusColors[attendee.status as keyof typeof statusColors] || "bg-gray-500"}>
                            {attendee.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">{attendee.college}</p>
                          <p className="text-xs text-muted-foreground">{attendee.course}</p>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                Actions <ChevronDown className="ml-2 h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleSendReminder([attendee.id])}>
                                <Mail className="mr-2 h-4 w-4" />
                                <span>Send Reminder</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleUpdateStatus(attendee.id, "Confirmed")}>
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                <span>Mark as Confirmed</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(attendee.id, "Attended")}>
                                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                                <span>Mark as Attended</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(attendee.id, "No-show")}>
                                <XCircle className="mr-2 h-4 w-4 text-red-500" />
                                <span>Mark as No-show</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(attendee.id, "Cancelled")}>
                                <XCircle className="mr-2 h-4 w-4" />
                                <span>Cancel Registration</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-4 text-center text-sm text-muted-foreground">
                Showing {filteredAttendees.length} out of {attendees.length} attendees
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AttendeeManagement;
