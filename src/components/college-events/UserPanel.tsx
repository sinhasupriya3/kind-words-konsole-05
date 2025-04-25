
import { useState } from "react";
import { 
  Calendar, 
  Star, 
  MessageSquare, 
  PlusCircle, 
  FileText,
  Clock,
  MapPin,
  Users,
  Check,
  X,
  AlertCircle,
  Edit,
  BookOpen
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

// Sample data - would be replaced with API calls in a real application
const myEvents = [
  {
    id: "1",
    title: "Tech Conference 2025",
    date: "2025-08-15",
    time: "09:00 AM - 05:00 PM",
    location: "Main Auditorium",
    role: "Attendee",
    status: "Confirmed"
  },
  {
    id: "2",
    title: "Cultural Fest 'Rhythms'",
    date: "2025-09-20",
    time: "04:00 PM - 10:00 PM",
    location: "College Grounds",
    role: "Volunteer",
    status: "Confirmed"
  },
  {
    id: "3",
    title: "Business Plan Competition",
    date: "2025-07-05",
    time: "10:00 AM - 04:00 PM",
    location: "Management Block",
    role: "Participant",
    status: "Confirmed"
  },
  {
    id: "4",
    title: "Scientific Research Symposium",
    date: "2025-07-25",
    time: "09:30 AM - 03:30 PM",
    location: "Science Block",
    role: "Attendee",
    status: "Waitlist"
  }
];

const myProposals = [
  {
    id: "1",
    title: "Mobile App Development Workshop",
    description: "A hands-on workshop for students to learn mobile app development with Flutter.",
    proposedDate: "2025-10-15",
    venue: "Computer Science Lab",
    attendees: 50,
    status: "Pending",
    submittedDate: "2025-07-20",
    comments: [
      {
        author: "Prof. Sharma",
        text: "Please provide more details on the required equipment.",
        date: "2025-07-21"
      }
    ]
  },
  {
    id: "2",
    title: "Photography Exhibition",
    description: "An exhibition showcasing student photography works on the theme 'Urban Nature'.",
    proposedDate: "2025-09-10",
    venue: "Arts Building Gallery",
    attendees: 100,
    status: "Approved",
    submittedDate: "2025-07-05",
    comments: [
      {
        author: "Cultural Committee",
        text: "Approved. Please coordinate with the Arts Department for setup.",
        date: "2025-07-08"
      }
    ]
  },
  {
    id: "3",
    title: "Debate Competition",
    description: "An inter-department debate on current technological and social issues.",
    proposedDate: "2025-08-25",
    venue: "Main Auditorium",
    attendees: 150,
    status: "Rejected",
    submittedDate: "2025-06-30",
    comments: [
      {
        author: "Admin",
        text: "Venue unavailable on the requested date. Please propose alternate dates.",
        date: "2025-07-03"
      }
    ]
  }
];

const savedEvents = [
  {
    id: "1",
    title: "Web Development Workshop",
    description: "Learn the latest web development technologies and frameworks.",
    date: "2025-09-15",
    location: "Computer Science Department",
    saved: true
  },
  {
    id: "2",
    title: "Career Fair 2025",
    description: "Connect with potential employers and explore career opportunities.",
    date: "2025-10-20",
    location: "College Gymnasium",
    saved: true
  }
];

const UserPanel = () => {
  const [activeEventId, setActiveEventId] = useState("");
  const { toast } = useToast();
  
  const handleCreateProposal = (formData: any) => {
    // In a real app, this would call an API to create the proposal
    console.log("Creating proposal:", formData);
    toast({
      title: "Proposal Submitted",
      description: "Your event proposal has been submitted for review.",
    });
  };
  
  const handleCancelRegistration = (eventId: string) => {
    // In a real app, this would call an API to cancel registration
    console.log("Cancelling registration for:", eventId);
    toast({
      title: "Registration Cancelled",
      description: "Your registration has been cancelled.",
    });
  };
  
  const handleEditProposal = (proposalId: string) => {
    // In a real app, this would open the proposal in edit mode
    console.log("Editing proposal:", proposalId);
  };
  
  const handleDeleteProposal = (proposalId: string) => {
    // In a real app, this would call an API to delete the proposal
    console.log("Deleting proposal:", proposalId);
    toast({
      title: "Proposal Deleted",
      description: "Your event proposal has been deleted.",
    });
  };
  
  const handleReplyToComment = (proposalId: string, comment: string) => {
    // In a real app, this would call an API to add a reply to a comment
    console.log(`Replying to comment on proposal ${proposalId}:`, comment);
    toast({
      title: "Reply Added",
      description: "Your reply has been added to the proposal.",
    });
  };
  
  const handleToggleSave = (eventId: string, isSaved: boolean) => {
    // In a real app, this would call an API to save/unsave an event
    console.log(`${isSaved ? "Removing" : "Saving"} event ${eventId}`);
    toast({
      title: isSaved ? "Event Removed" : "Event Saved",
      description: isSaved ? "Event removed from your saved list." : "Event saved to your list.",
    });
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
      <Tabs defaultValue="registered">
        <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-2 md:grid-cols-none gap-2 md:gap-0">
          <TabsTrigger value="registered">My Registrations</TabsTrigger>
          <TabsTrigger value="proposals">My Proposals</TabsTrigger>
          <TabsTrigger value="saved">Saved Events</TabsTrigger>
          <TabsTrigger value="create">Create Proposal</TabsTrigger>
        </TabsList>
        
        <TabsContent value="registered" className="space-y-6 mt-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Your Registered Events</h3>
            
            {myEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myEvents.map((event) => (
                  <Card key={event.id} className={`card-gradient border-2 ${activeEventId === event.id ? 'border-[#a9def9]' : 'border-transparent'}`}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle>{event.title}</CardTitle>
                        <Badge
                          className={
                            event.status === "Confirmed" ? "bg-green-500 hover:bg-green-600" :
                            event.status === "Waitlist" ? "bg-amber-500 hover:bg-amber-600" :
                            "bg-slate-500 hover:bg-slate-600"
                          }
                        >
                          {event.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-2 h-4 w-4 text-[#fe5f55]" />
                          {formatDate(event.date)}
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="mr-2 h-4 w-4 text-[#fe5f55]" />
                          {event.time}
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="mr-2 h-4 w-4 text-[#fe5f55]" />
                          {event.location}
                        </div>
                        <div className="flex items-center text-sm">
                          <Users className="mr-2 h-4 w-4 text-[#fe5f55]" />
                          Role: <Badge variant="outline" className="ml-2 border-[#d6d1b1]">{event.role}</Badge>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex gap-2 w-full">
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => setActiveEventId(event.id !== activeEventId ? event.id : "")}
                        >
                          {activeEventId === event.id ? "Hide Details" : "View Details"}
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="flex-1 border-red-200 hover:bg-red-50">
                              Cancel
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Cancel Registration</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to cancel your registration for "{event.title}"?
                              </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                              <p className="text-sm text-muted-foreground">
                                This action cannot be undone. You may lose your spot if you try to register again later.
                              </p>
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Keep Registration</Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button 
                                  variant="destructive" 
                                  onClick={() => handleCancelRegistration(event.id)}
                                >
                                  Cancel Registration
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardFooter>
                    
                    {activeEventId === event.id && (
                      <div className="px-6 pb-6">
                        <div className="mt-4 p-4 bg-background rounded-md border">
                          <h4 className="font-medium mb-2">Event Details</h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            Additional details and information about the event will be displayed here.
                            This includes event schedule, speaker information, and any preparation materials.
                          </p>
                          
                          <div className="space-y-4">
                            <div>
                              <h5 className="text-sm font-medium">Download Resources</h5>
                              <div className="flex gap-2 mt-2">
                                <Button variant="outline" size="sm">
                                  <FileText className="mr-2 h-4 w-4" />
                                  Event Schedule
                                </Button>
                                <Button variant="outline" size="sm">
                                  <MapPin className="mr-2 h-4 w-4" />
                                  Venue Map
                                </Button>
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="text-sm font-medium">Event Contact</h5>
                              <p className="text-sm mt-1">
                                For any queries, contact: <span className="font-medium">events@college.edu</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center pt-6 pb-6">
                  <Calendar className="h-10 w-10 text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium">No Registered Events</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    You haven't registered for any events yet.
                  </p>
                  <Button className="mt-4">Browse Events</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="proposals" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Your Event Proposals</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Proposal
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create Event Proposal</DialogTitle>
                  <DialogDescription>
                    Submit your event idea for approval by the college administration.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Event Title</label>
                    <Input placeholder="Enter event title" />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Event Description</label>
                    <Textarea 
                      placeholder="Describe your event in detail..." 
                      className="min-h-[100px] resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Proposed Date</label>
                      <Input type="date" />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Expected Attendees</label>
                      <Input type="number" placeholder="Number of people" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Preferred Venue</label>
                    <Input placeholder="Where would you like to host the event?" />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Additional Requirements</label>
                    <Textarea 
                      placeholder="Any specific requirements for your event..." 
                      className="resize-none"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleCreateProposal}>Submit Proposal</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          {myProposals.length > 0 ? (
            <div className="space-y-4">
              {myProposals.map((proposal) => (
                <Card key={proposal.id} className="card-gradient overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{proposal.title}</CardTitle>
                        <CardDescription className="mt-1">
                          Submitted on {formatDate(proposal.submittedDate)}
                        </CardDescription>
                      </div>
                      <Badge
                        className={
                          proposal.status === "Approved" ? "bg-green-500 hover:bg-green-600" :
                          proposal.status === "Pending" ? "bg-amber-500 hover:bg-amber-600" :
                          "bg-red-500 hover:bg-red-600"
                        }
                      >
                        {proposal.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm">{proposal.description}</p>
                      
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <p className="font-medium">Proposed Date</p>
                          <p className="text-muted-foreground">{formatDate(proposal.proposedDate)}</p>
                        </div>
                        <div>
                          <p className="font-medium">Venue</p>
                          <p className="text-muted-foreground">{proposal.venue}</p>
                        </div>
                        <div>
                          <p className="font-medium">Attendees</p>
                          <p className="text-muted-foreground">{proposal.attendees} expected</p>
                        </div>
                      </div>
                      
                      {proposal.comments.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">Admin Comments</h4>
                          <div className="space-y-2">
                            {proposal.comments.map((comment, idx) => (
                              <div key={idx} className="bg-background p-3 rounded-md border">
                                <div className="flex justify-between items-start">
                                  <p className="font-medium text-sm">{comment.author}</p>
                                  <p className="text-xs text-muted-foreground">{formatDate(comment.date)}</p>
                                </div>
                                <p className="text-sm mt-1">{comment.text}</p>
                              </div>
                            ))}
                          </div>
                          
                          {proposal.status === "Pending" && (
                            <div className="mt-3">
                              <Textarea 
                                placeholder="Reply to the admin's comment..." 
                                className="text-sm resize-none"
                              />
                              <div className="flex justify-end mt-2">
                                <Button 
                                  size="sm" 
                                  onClick={() => handleReplyToComment(proposal.id, "Sample reply")}
                                >
                                  Send Reply
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div>
                      {proposal.status === "Rejected" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline">
                              <Edit className="mr-2 h-4 w-4" />
                              Revise & Resubmit
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>Revise Event Proposal</DialogTitle>
                              <DialogDescription>
                                Update your proposal based on the feedback and resubmit.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <label className="text-sm font-medium">Event Title</label>
                                <Input defaultValue={proposal.title} />
                              </div>
                              <div className="grid gap-2">
                                <label className="text-sm font-medium">Event Description</label>
                                <Textarea 
                                  defaultValue={proposal.description} 
                                  className="min-h-[100px] resize-none"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                  <label className="text-sm font-medium">Proposed Date</label>
                                  <Input type="date" defaultValue={proposal.proposedDate} />
                                </div>
                                <div className="grid gap-2">
                                  <label className="text-sm font-medium">Expected Attendees</label>
                                  <Input type="number" defaultValue={proposal.attendees.toString()} />
                                </div>
                              </div>
                              <div className="grid gap-2">
                                <label className="text-sm font-medium">Preferred Venue</label>
                                <Input defaultValue={proposal.venue} />
                              </div>
                              <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                                <div className="flex items-start gap-2">
                                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                                  <div>
                                    <p className="text-sm font-medium text-amber-800">Previous Rejection Reason</p>
                                    <p className="text-sm text-amber-700">
                                      {proposal.comments[proposal.comments.length - 1].text}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button onClick={() => handleEditProposal(proposal.id)}>Resubmit Proposal</Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                      
                      {proposal.status === "Pending" && (
                        <Button variant="outline" onClick={() => handleEditProposal(proposal.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Proposal
                        </Button>
                      )}
                    </div>
                    
                    {proposal.status !== "Approved" && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="border-red-200 hover:bg-red-50">
                            Delete
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete Proposal</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete this event proposal?
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <p className="text-sm text-muted-foreground">
                              This action cannot be undone. The proposal will be permanently removed from the system.
                            </p>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button 
                                variant="destructive" 
                                onClick={() => handleDeleteProposal(proposal.id)}
                              >
                                Delete Proposal
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center pt-6 pb-6">
                <BookOpen className="h-10 w-10 text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium">No Event Proposals</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  You haven't created any event proposals yet.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="mt-4">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create Your First Proposal
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Create Event Proposal</DialogTitle>
                      <DialogDescription>
                        Submit your event idea for approval by the college administration.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Event Title</label>
                        <Input placeholder="Enter event title" />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Event Description</label>
                        <Textarea 
                          placeholder="Describe your event in detail..." 
                          className="min-h-[100px] resize-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Proposed Date</label>
                          <Input type="date" />
                        </div>
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Expected Attendees</label>
                          <Input type="number" placeholder="Number of people" />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Preferred Venue</label>
                        <Input placeholder="Where would you like to host the event?" />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button onClick={handleCreateProposal}>Submit Proposal</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="saved" className="space-y-6 mt-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Events You've Saved</h3>
            
            {savedEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedEvents.map((event) => (
                  <Card key={event.id} className="card-gradient">
                    <CardHeader className="pb-2">
                      <CardTitle>{event.title}</CardTitle>
                      <CardDescription className="mt-1">{event.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-2 h-4 w-4 text-[#fe5f55]" />
                          {formatDate(event.date)}
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="mr-2 h-4 w-4 text-[#fe5f55]" />
                          {event.location}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">View Details</Button>
                      <Button 
                        variant="outline"
                        onClick={() => handleToggleSave(event.id, event.saved)}
                      >
                        {event.saved ? (
                          <>
                            <X className="mr-2 h-4 w-4" />
                            Remove
                          </>
                        ) : (
                          <>
                            <Star className="mr-2 h-4 w-4" />
                            Save
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center pt-6 pb-6">
                  <Star className="h-10 w-10 text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium">No Saved Events</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    You haven't saved any events for future reference.
                  </p>
                  <Button className="mt-4">Browse Events</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="create" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Event Proposal</CardTitle>
              <CardDescription>
                Submit your idea for a college event. All proposals will be reviewed by the administration.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-2">
                  <label htmlFor="event-title" className="text-sm font-medium">Event Title</label>
                  <Input id="event-title" placeholder="Enter a clear, descriptive title" />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="event-description" className="text-sm font-medium">Event Description</label>
                  <Textarea 
                    id="event-description" 
                    placeholder="Describe the purpose, activities, and benefits of your event"
                    className="min-h-[150px] resize-none" 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="event-date" className="text-sm font-medium">Proposed Date</label>
                    <Input id="event-date" type="date" />
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="event-time" className="text-sm font-medium">Proposed Time</label>
                    <div className="flex space-x-2">
                      <Input id="event-time-start" type="time" placeholder="Start Time" />
                      <span className="flex items-center">to</span>
                      <Input id="event-time-end" type="time" placeholder="End Time" />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="event-venue" className="text-sm font-medium">Preferred Venue</label>
                    <Input id="event-venue" placeholder="Where would you like to host the event?" />
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="event-attendees" className="text-sm font-medium">Expected Attendees</label>
                    <Input id="event-attendees" type="number" placeholder="Estimated number of participants" />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="event-requirements" className="text-sm font-medium">Special Requirements</label>
                  <Textarea 
                    id="event-requirements" 
                    placeholder="List any equipment, resources, or arrangements you'll need"
                    className="resize-none" 
                  />
                </div>
                
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Event Category</label>
                  <div className="flex flex-wrap gap-2">
                    {["Technical", "Cultural", "Sports", "Academic", "Workshop", "Social", "Other"].map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`category-${category.toLowerCase()}`}
                          name="event-category"
                          value={category}
                          className="rounded-full text-primary border-muted-foreground"
                        />
                        <label htmlFor={`category-${category.toLowerCase()}`} className="text-sm">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Budget Information</label>
                  <Table className="border rounded-md">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[60%]">Item</TableHead>
                        <TableHead>Estimated Cost (₹)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Input placeholder="e.g., Venue decoration" />
                        </TableCell>
                        <TableCell>
                          <Input type="number" placeholder="Amount" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Input placeholder="e.g., Refreshments" />
                        </TableCell>
                        <TableCell>
                          <Input type="number" placeholder="Amount" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Input placeholder="e.g., Equipment" />
                        </TableCell>
                        <TableCell>
                          <Input type="number" placeholder="Amount" />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Button variant="outline" type="button" className="w-full mt-2">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Budget Item
                  </Button>
                </div>
                
                <div className="bg-muted p-4 rounded-md">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-[#fe5f55] mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Important Information</p>
                      <ul className="text-xs text-muted-foreground mt-1 list-disc list-inside space-y-1">
                        <li>All event proposals are subject to review and approval.</li>
                        <li>Proposals must be submitted at least 3 weeks before the intended date.</li>
                        <li>Budget requirements must be justified and may be subject to modification.</li>
                        <li>Your department head's approval may be required for certain events.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Save as Draft</Button>
              <Button onClick={handleCreateProposal}>Submit Proposal</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserPanel;
