
import { useState } from "react";
import { Lightbulb, ChevronRight, Check, Star, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

// Sample recommendation data - in a real app, this would come from an AI system
const recommendations = [
  {
    id: "1",
    title: "Tech Innovation Workshop Series",
    description: "A series of workshops focusing on emerging technologies like AI, blockchain, and IoT, with industry experts as speakers.",
    reasons: [
      "Similar events have had 85% attendance rates",
      "Aligns with current tech industry trends",
      "Appeals to multiple departments",
      "Can attract industry sponsorships"
    ],
    difficulty: "Medium",
    estimatedAttendees: 150,
    suggestedDate: "Late September",
    suggestedVenue: "Engineering Block Seminar Hall",
    category: "Workshop"
  },
  {
    id: "2",
    title: "Inter-College Hackathon",
    description: "A 48-hour coding competition where participants develop solutions for real-world problems provided by industry partners.",
    reasons: [
      "Previous hackathons had 90% positive feedback",
      "Builds practical coding skills",
      "Opportunity for recruitment partnerships",
      "Can generate media coverage"
    ],
    difficulty: "High",
    estimatedAttendees: 200,
    suggestedDate: "Early October",
    suggestedVenue: "Computer Science Lab Complex",
    category: "Competition"
  },
  {
    id: "3",
    title: "Cultural Diversity Festival",
    description: "A week-long celebration showcasing diverse cultures through food, music, art, and performances.",
    reasons: [
      "Promotes inclusivity on campus",
      "Similar events saw high student engagement",
      "Opportunity for community involvement",
      "Aligns with university diversity initiatives"
    ],
    difficulty: "Medium",
    estimatedAttendees: 400,
    suggestedDate: "Mid-November",
    suggestedVenue: "College Quadrangle",
    category: "Cultural"
  },
  {
    id: "4",
    title: "Graduate Career Expo",
    description: "A job fair connecting final-year students with potential employers across various industries.",
    reasons: [
      "Directly addresses student employment needs",
      "High demand based on student surveys",
      "Potential for alumni involvement",
      "Strengthens industry-college relationships"
    ],
    difficulty: "Medium",
    estimatedAttendees: 300,
    suggestedDate: "February",
    suggestedVenue: "College Auditorium",
    category: "Career"
  },
  {
    id: "5",
    title: "Environmental Sustainability Drive",
    description: "A series of activities including campus clean-up, tree planting, and workshops on sustainable practices.",
    reasons: [
      "Aligns with growing climate awareness",
      "Opportunity for community service credits",
      "Low budget, high impact event",
      "Potential for local partnerships"
    ],
    difficulty: "Low",
    estimatedAttendees: 150,
    suggestedDate: "World Environment Day (June 5)",
    suggestedVenue: "Campus Grounds",
    category: "Social"
  }
];

const EventRecommendations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [interests, setInterests] = useState("");
  const [savedEvents, setSavedEvents] = useState<string[]>([]);
  const { toast } = useToast();
  
  const handleGenerateRecommendations = () => {
    setIsLoading(true);
    // Simulate API call to AI system
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Recommendations updated",
        description: "We've generated new event recommendations based on your preferences.",
      });
    }, 2000);
  };
  
  const handleSaveRecommendation = (id: string) => {
    if (savedEvents.includes(id)) {
      setSavedEvents(savedEvents.filter(eventId => eventId !== id));
    } else {
      setSavedEvents([...savedEvents, id]);
      toast({
        title: "Event idea saved",
        description: "This event has been saved to your ideas collection.",
      });
    }
  };
  
  const handleCreateFromRecommendation = (recommendation: typeof recommendations[0]) => {
    // In a real application, this would open a form pre-filled with the recommendation data
    console.log("Creating event from recommendation:", recommendation);
    toast({
      title: "Event creation started",
      description: "We've started creating an event based on this recommendation.",
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="mr-2 text-[#f0b67f]" />
            AI Event Recommendations
          </CardTitle>
          <CardDescription>
            Our system analyzes trends, past events, and student interests to suggest optimal event ideas for your college.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="interests" className="block text-sm font-medium mb-1">
                What are your specific interests or goals?
              </label>
              <Textarea
                id="interests"
                placeholder="E.g., Technology workshops, cultural festivals, sports tournaments, etc."
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                className="resize-none"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleGenerateRecommendations} 
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? "Generating..." : "Generate Personalized Recommendations"}
          </Button>
        </CardFooter>
      </Card>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Recommended Events</h3>
        
        {isLoading ? (
          // Skeleton for loading state
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2 mt-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full sm:w-1/4" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {recommendations.map((recommendation) => (
              <Card key={recommendation.id} className="card-gradient overflow-hidden">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{recommendation.title}</CardTitle>
                      <CardDescription className="mt-1">{recommendation.description}</CardDescription>
                    </div>
                    <Badge className="bg-[#a9def9] text-foreground hover:bg-[#a9def9]/90">{recommendation.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1 flex items-center">
                        <Star className="mr-1 h-4 w-4 text-[#f0b67f]" /> 
                        Why we recommend this
                      </h4>
                      <ul className="text-sm space-y-1 pl-5 list-disc">
                        {recommendation.reasons.map((reason, idx) => (
                          <li key={idx}>{reason}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Difficulty Level</p>
                        <p className="text-muted-foreground">{recommendation.difficulty}</p>
                      </div>
                      <div>
                        <p className="font-medium">Expected Attendance</p>
                        <p className="text-muted-foreground">~{recommendation.estimatedAttendees} attendees</p>
                      </div>
                      <div>
                        <p className="font-medium">Suggested Date</p>
                        <p className="text-muted-foreground">{recommendation.suggestedDate}</p>
                      </div>
                      <div>
                        <p className="font-medium">Suggested Venue</p>
                        <p className="text-muted-foreground">{recommendation.suggestedVenue}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Create Event <ChevronRight className="ml-1 h-4 w-4" /></Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create Event from Recommendation</DialogTitle>
                        <DialogDescription>
                          Use this recommendation as a template for your new event. You'll be able to customize all details.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <h3 className="font-semibold">{recommendation.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1 mb-4">{recommendation.description}</p>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Event Name</label>
                            <Input defaultValue={recommendation.title} />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Event Description</label>
                            <Textarea defaultValue={recommendation.description} />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button onClick={() => handleCreateFromRecommendation(recommendation)}>
                            Continue to Event Creation
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => handleSaveRecommendation(recommendation.id)}
                    className={savedEvents.includes(recommendation.id) ? "bg-muted" : ""}
                  >
                    {savedEvents.includes(recommendation.id) ? (
                      <>
                        <Check className="mr-1 h-4 w-4" /> Saved
                      </>
                    ) : (
                      "Save Idea"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        
        {!isLoading && recommendations.length === 0 && (
          <div className="text-center py-12 border border-dashed border-border rounded-md">
            <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No recommendations available</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Try providing more details about your interests to get personalized event recommendations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventRecommendations;
