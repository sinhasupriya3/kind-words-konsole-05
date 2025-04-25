
import { useState } from "react";
import { 
  Settings, 
  Bell, 
  Check, 
  X, 
  Users,
  Calendar,
  FileText,
  Search,
  PlusCircle,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  MessageSquare,
  Clock,
  MapPin,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { useToast } from "@/components/ui/use-toast";

// Sample event proposals data
const eventProposals = [
  {
    id: "1",
    title: "AI & Machine Learning Workshop",
    proposer: "Dr. Arun Kumar",
    department: "Computer Science",
    date: "2025-09-15",
    description: "A hands-on workshop on AI and ML techniques with industry experts.",
    status: "Pending",
    createdAt: "2025-07-20",
    attendees: 100
  },
  {
    id: "2",
    title: "Cultural Club Annual Show",
    proposer: "Neha Sharma",
    department: "Cultural Committee",
    date: "2025-10-25",
    description: "Annual cultural show featuring performances from various college clubs.",
    status: "Approved",
    createdAt: "2025-07-15",
    attendees: 300
  },
  {
    id: "3",
    title: "Inter-College Debate Competition",
    proposer: "Literary Club",
    department: "Student Activities",
    date: "2025-09-05",
    description: "A debate competition inviting participants from colleges across the region.",
    status: "Pending",
    createdAt: "2025-07-18",
    attendees: 150
  },
  {
    id: "4",
    title: "Entrepreneurship Summit",
    proposer: "E-Cell",
    department: "Business Administration",
    date: "2025-11-10",
    description: "Summit focusing on student startups and entrepreneurial opportunities.",
    status: "Rejected",
    createdAt: "2025-07-10",
    attendees: 200,
    rejectionReason: "Date conflicts with mid-semester examinations."
  },
  {
    id: "5",
    title: "Environmental Awareness Drive",
    proposer: "Green Society",
    department: "Environmental Science",
    date: "2025-08-20",
    description: "Campus-wide activities to promote environmental consciousness.",
    status: "Approved",
    createdAt: "2025-07-05",
    attendees: 120
  }
];

// Sample users data
const users = [
  {
    id: "1",
    name: "Dr. Rajesh Verma",
    email: "rajesh.verma@college.edu",
    role: "Faculty Admin",
    department: "Computer Science",
    dateJoined: "2024-06-10",
    status: "Active",
    permissions: ["create_events", "approve_events", "manage_users", "send_notifications"]
  },
  {
    id: "2",
    name: "Ananya Desai",
    email: "ananya.d@college.edu",
    role: "Student Coordinator",
    department: "Cultural Committee",
    dateJoined: "2024-07-05",
    status: "Active",
    permissions: ["create_events", "manage_attendees"]
  },
  {
    id: "3",
    name: "Prof. Sunita Rao",
    email: "s.rao@college.edu",
    role: "Department Head",
    department: "Electronics",
    dateJoined: "2023-12-15",
    status: "Active",
    permissions: ["create_events", "approve_events", "manage_department_events"]
  },
  {
    id: "4",
    name: "Karan Mehra",
    email: "karan.m@college.edu",
    role: "Student Coordinator",
    department: "Sports Committee",
    dateJoined: "2025-01-20",
    status: "Inactive",
    permissions: ["create_events", "manage_attendees"]
  },
  {
    id: "5",
    name: "Dr. Priya Malhotra",
    email: "priya.m@college.edu",
    role: "Faculty Admin",
    department: "Management Studies",
    dateJoined: "2024-05-08",
    status: "Active",
    permissions: ["create_events", "approve_events", "manage_users"]
  }
];

// Sample notifications data
const notifications = [
  {
    id: "1",
    title: "New Event Proposal",
    description: "AI & Machine Learning Workshop requires approval",
    type: "approval",
    createdAt: "2025-07-20T10:30:00",
    read: false
  },
  {
    id: "2",
    title: "Event Approved",
    description: "Cultural Club Annual Show has been approved",
    type: "info",
    createdAt: "2025-07-15T14:45:00",
    read: true
  },
  {
    id: "3",
    title: "User Permission Updated",
    description: "Ananya Desai granted additional permissions",
    type: "user",
    createdAt: "2025-07-18T09:15:00",
    read: false
  },
  {
    id: "4",
    title: "Event Capacity Alert",
    description: "Engineering Workshop is at 95% capacity",
    type: "alert",
    createdAt: "2025-07-19T16:20:00",
    read: false
  },
  {
    id: "5",
    title: "Venue Change Request",
    description: "Environmental Awareness Drive requested venue change",
    type: "request",
    createdAt: "2025-07-17T11:05:00",
    read: true
  }
];

const AdminPanel = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const { toast } = useToast();
  
  const handleApproveEvent = (eventId: string) => {
    // In a real app, this would call an API to approve the event
    console.log(`Approving event ${eventId}`);
    toast({
      title: "Event Approved",
      description: "The event has been approved and organizers notified."
    });
  };
  
  const handleRejectEvent = (eventId: string) => {
    // In a real app, this would call an API to reject the event
    console.log(`Rejecting event ${eventId}`);
    toast({
      title: "Event Rejected",
      description: "The event has been rejected and organizers notified."
    });
  };
  
  const handleDeleteEvent = (eventId: string) => {
    // In a real app, this would call an API to delete the event
    console.log(`Deleting event ${eventId}`);
    toast({
      title: "Event Deleted",
      description: "The event has been permanently deleted."
    });
  };
  
  const handleUpdateUserStatus = (userId: string, status: string) => {
    // In a real app, this would call an API to update user status
    console.log(`Updating user ${userId} status to ${status}`);
    toast({
      title: "User Updated",
      description: `User status has been updated to ${status}.`
    });
  };
  
  const handleSendNotification = (type: string) => {
    // In a real app, this would call an API to send notifications
    console.log(`Sending ${type} notification`);
    toast({
      title: "Notification Sent",
      description: "Your notification has been sent to the selected recipients."
    });
  };
  
  const handleMarkAllRead = () => {
    // In a real app, this would mark all notifications as read
    console.log("Marking all notifications as read");
    toast({
      title: "Notifications Cleared",
      description: "All notifications have been marked as read."
    });
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const formatDateTime = (dateTimeString: string) => {
    return new Date(dateTimeString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Filter event proposals based on search query and status filter
  const filteredProposals = eventProposals.filter(proposal => {
    const matchesSearch = !searchQuery || 
      proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      proposal.proposer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = !statusFilter || proposal.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Admin Control Panel</h2>
          <p className="text-muted-foreground">
            Manage college event approvals, users, and settings
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="relative">
                <Bell size={18} className="mr-2" />
                <span>Notifications</span>
                <Badge className="absolute -top-2 -right-2 bg-[#fe5f55] hover:bg-[#fe5f55]">
                  {notifications.filter(notification => !notification.read).length}
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[350px]">
              <div className="flex justify-between items-center p-2">
                <h4 className="font-medium">Recent Notifications</h4>
                <Button variant="ghost" size="sm" onClick={handleMarkAllRead}>
                  Mark all read
                </Button>
              </div>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-y-auto">
                {notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`p-3 flex items-start gap-3 hover:bg-muted ${!notification.read ? 'bg-muted/50' : ''}`}
                  >
                    <div className={`mt-0.5 p-1.5 rounded-full
                      ${notification.type === 'approval' ? 'bg-amber-100 text-amber-500' : 
                        notification.type === 'info' ? 'bg-blue-100 text-blue-500' : 
                        notification.type === 'user' ? 'bg-green-100 text-green-500' : 
                        notification.type === 'alert' ? 'bg-red-100 text-red-500' : 
                        'bg-purple-100 text-purple-500'}`}>
                      {notification.type === 'approval' ? <FileText size={16} /> : 
                        notification.type === 'info' ? <Bell size={16} /> : 
                        notification.type === 'user' ? <Users size={16} /> : 
                        notification.type === 'alert' ? <AlertCircle size={16} /> : 
                        <MessageSquare size={16} />}
                    </div>
                    <div className="flex-1">
                      <h5 className="text-sm font-medium">{notification.title}</h5>
                      <p className="text-xs text-muted-foreground">{notification.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{formatDateTime(notification.createdAt)}</p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full bg-[#fe5f55] self-center" />
                    )}
                  </div>
                ))}
              </div>
              <DropdownMenuSeparator />
              <div className="p-2">
                <Button variant="outline" size="sm" className="w-full">
                  View All Notifications
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button size="sm">
            <Settings size={18} className="mr-2" />
            Settings
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="events">
        <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex gap-2 md:gap-0">
          <TabsTrigger value="events">Events & Approvals</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="notifications">Send Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="events" className="space-y-4 mt-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Event Proposals & Management</CardTitle>
              <CardDescription>
                Review and manage event proposals from various departments and student bodies.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input
                    type="text"
                    placeholder="Search events by title or proposer..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <div className="flex space-x-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm h-10"
                  >
                    <option value="">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <Button variant="outline" onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("");
                  }}>
                    <Filter size={16} className="mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
              
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event Details</TableHead>
                      <TableHead>Proposer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProposals.length > 0 ? (
                      filteredProposals.map((proposal) => (
                        <TableRow key={proposal.id}>
                          <TableCell>
                            <div className="font-medium">{proposal.title}</div>
                            <div className="text-sm text-muted-foreground line-clamp-1">
                              {proposal.description}
                            </div>
                            <div className="text-xs text-muted-foreground flex items-center mt-1">
                              <Clock className="mr-1 h-3 w-3" />
                              Submitted on {formatDate(proposal.createdAt)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>{proposal.proposer}</div>
                            <div className="text-xs text-muted-foreground">
                              {proposal.department}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-4 w-4 text-[#f0b67f]" />
                              {formatDate(proposal.date)}
                            </div>
                            <div className="text-xs text-muted-foreground flex items-center mt-1">
                              <Users className="mr-1 h-3 w-3" />
                              {proposal.attendees} expected
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                proposal.status === "Approved" ? "bg-green-500 hover:bg-green-600" :
                                proposal.status === "Pending" ? "bg-amber-500 hover:bg-amber-600" :
                                "bg-red-500 hover:bg-red-600"
                              }
                            >
                              {proposal.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical size={16} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => console.log("View details")}>
                                  <FileText className="mr-2 h-4 w-4" />
                                  <span>View Details</span>
                                </DropdownMenuItem>
                                {proposal.status === "Pending" && (
                                  <>
                                    <DropdownMenuItem onClick={() => handleApproveEvent(proposal.id)}>
                                      <Check className="mr-2 h-4 w-4 text-green-500" />
                                      <span>Approve Event</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleRejectEvent(proposal.id)}>
                                      <X className="mr-2 h-4 w-4 text-red-500" />
                                      <span>Reject Event</span>
                                    </DropdownMenuItem>
                                  </>
                                )}
                                <DropdownMenuItem onClick={() => console.log("Edit event")}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  <span>Edit Event</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => handleDeleteEvent(proposal.id)}
                                  className="text-red-500"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  <span>Delete Event</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-lg font-medium">No events found</p>
                            <p className="text-sm text-muted-foreground">
                              Try adjusting your search or filter criteria
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredProposals.length} of {eventProposals.length} events
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create New Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Create New Event</DialogTitle>
                      <DialogDescription>
                        Create a new event or activity for the college.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Event Title</label>
                        <Input placeholder="Enter event title" />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Description</label>
                        <textarea 
                          className="resize-none min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder="Describe the event in detail..."
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Event Date</label>
                          <Input type="date" />
                        </div>
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Expected Attendees</label>
                          <Input type="number" placeholder="Number of attendees" />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Venue</label>
                        <Input placeholder="Event location or venue" />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Department/Organizer</label>
                        <Input placeholder="Name of organizing department" />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit">Create Event</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4 mt-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage users, roles, and permissions for the college events system.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input
                    type="text"
                    placeholder="Search users by name or email..."
                    className="pl-9"
                  />
                </div>
                <Button onClick={() => console.log("Add new user")}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New User
                </Button>
              </div>
              
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                          <div className="text-xs text-muted-foreground">
                            Joined: {formatDate(user.dateJoined)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-[#d6d1b1]">
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              user.status === "Active" ? "bg-green-500 hover:bg-green-600" :
                              "bg-slate-500 hover:bg-slate-600"
                            }
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => console.log("Edit user")}>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Edit User</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => console.log("Manage permissions")}>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Manage Permissions</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {user.status === "Active" ? (
                                <DropdownMenuItem onClick={() => handleUpdateUserStatus(user.id, "Inactive")}>
                                  <X className="mr-2 h-4 w-4" />
                                  <span>Deactivate User</span>
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem onClick={() => handleUpdateUserStatus(user.id, "Active")}>
                                  <Check className="mr-2 h-4 w-4" />
                                  <span>Activate User</span>
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem 
                                onClick={() => console.log("Delete user")}
                                className="text-red-500"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete User</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4 mt-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Send Notifications</CardTitle>
              <CardDescription>
                Create and send notifications to users about events, updates, and important information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Notification Type</label>
                  <select className="rounded-md border border-input bg-background px-3 py-2 text-sm h-10">
                    <option value="event">Event Update</option>
                    <option value="announcement">General Announcement</option>
                    <option value="reminder">Event Reminder</option>
                    <option value="alert">Urgent Alert</option>
                  </select>
                </div>
                
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Notification Title</label>
                  <Input placeholder="Enter a clear, concise title" />
                </div>
                
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Message</label>
                  <textarea 
                    className="resize-none min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Enter the notification message..."
                  />
                </div>
                
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Recipients</label>
                  <select className="rounded-md border border-input bg-background px-3 py-2 text-sm h-10">
                    <option value="all">All Users</option>
                    <option value="faculty">Faculty Only</option>
                    <option value="students">Students Only</option>
                    <option value="event_attendees">Event Attendees</option>
                    <option value="specific">Specific Departments</option>
                  </select>
                </div>
                
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Notification Methods</label>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="app" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="app" className="text-sm">In-App</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="email" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="email" className="text-sm">Email</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="sms" className="rounded border-gray-300" />
                      <label htmlFor="sms" className="text-sm">SMS</label>
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Send Time</label>
                  <select className="rounded-md border border-input bg-background px-3 py-2 text-sm h-10">
                    <option value="now">Send Immediately</option>
                    <option value="scheduled">Schedule for Later</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Preview</Button>
                <Button onClick={() => handleSendNotification("event")}>Send Notification</Button>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Notification Templates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Card className="overflow-hidden" onClick={() => handleSendNotification("reminder")}>
                    <CardHeader className="p-3 pb-2">
                      <CardTitle className="text-sm">Event Reminder Template</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <p className="text-xs text-muted-foreground">
                        Reminds attendees about upcoming events with event details and important instructions.
                      </p>
                    </CardContent>
                    <CardFooter className="p-3 pt-0">
                      <Button variant="outline" size="sm">Use Template</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="overflow-hidden" onClick={() => handleSendNotification("announcement")}>
                    <CardHeader className="p-3 pb-2">
                      <CardTitle className="text-sm">Event Cancellation Template</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <p className="text-xs text-muted-foreground">
                        Notifies users about event cancellation with explanation and alternative options.
                      </p>
                    </CardContent>
                    <CardFooter className="p-3 pt-0">
                      <Button variant="outline" size="sm">Use Template</Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
