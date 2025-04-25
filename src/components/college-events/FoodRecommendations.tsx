
import { useState } from "react";
import { Utensils, Coffee, Clock, AlertCircle, Check, Plus, FileDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

// Sample food recommendation data
const recommendedMenus = [
  {
    id: "1",
    name: "Tech Conference Package",
    description: "Ideal for day-long technical events with multiple breaks",
    suitableFor: "Technical Symposium, Workshops, Conferences",
    attendeeRange: "50-200",
    items: [
      { 
        category: "Breakfast", 
        options: [
          "Masala Dosa with Coconut Chutney and Sambar", 
          "Poha with Mixed Vegetables", 
          "Paneer Paratha with Yogurt"
        ] 
      },
      { 
        category: "Mid-Morning Snack & Beverages", 
        options: [
          "Assorted Tea and Coffee Station", 
          "Veg Puffs and Cookies", 
          "Fresh Fruit Platter"
        ] 
      },
      { 
        category: "Lunch", 
        options: [
          "Pulao Rice with Dal Tadka",
          "Mixed Vegetable Curry and Paneer Butter Masala",
          "Assorted Indian Breads (Roti/Naan)",
          "Raita and Pickle",
          "Gulab Jamun"
        ] 
      },
      { 
        category: "Evening Snack", 
        options: [
          "Samosas with Mint Chutney", 
          "Kachori with Aloo Sabji", 
          "Tea and Coffee"
        ] 
      }
    ],
    specialDietary: ["Vegetarian options available", "Jain options on request"],
    estimatedCost: "₹450-600 per person",
    rating: 4.7
  },
  {
    id: "2",
    name: "Cultural Festival Menu",
    description: "Diverse food options perfect for cultural events and festivals",
    suitableFor: "Cultural Fests, College Day, Alumni Meets",
    attendeeRange: "100-500",
    items: [
      { 
        category: "Welcome Drinks", 
        options: [
          "Fresh Fruit Juices (Orange, Pineapple, Watermelon)", 
          "Masala Chaas", 
          "Rose Milk"
        ] 
      },
      { 
        category: "Food Stalls", 
        options: [
          "Chaat Counter (Pani Puri, Bhel Puri, Dahi Puri)", 
          "South Indian Counter (Idli, Dosa, Vada)",
          "North Indian Snacks (Chole Bhature, Pav Bhaji)",
          "Chinese Food Stall (Noodles, Manchurian)",
          "Live Tandoor Counter"
        ] 
      },
      { 
        category: "Desserts", 
        options: [
          "Ice Cream Station with Toppings",
          "Traditional Sweets (Jalebi, Rasgulla)",
          "Fresh Fruit Platter"
        ] 
      }
    ],
    specialDietary: ["Vegetarian and Non-vegetarian options", "Jain options available"],
    estimatedCost: "₹550-800 per person",
    rating: 4.8
  },
  {
    id: "3",
    name: "Half-Day Workshop Package",
    description: "Lite refreshments suitable for shorter academic events",
    suitableFor: "Seminars, Guest Lectures, Short Workshops",
    attendeeRange: "30-100",
    items: [
      { 
        category: "Welcome Kit", 
        options: [
          "Bottled Water", 
          "Packaged Snacks (Cookies/Nuts)", 
          "Mint Candies"
        ] 
      },
      { 
        category: "Refreshment Break", 
        options: [
          "Tea and Coffee Station",
          "Assorted Sandwich Platter",
          "Samosas and Pakoras with Chutney"
        ] 
      },
      { 
        category: "Lunch Box (Optional)", 
        options: [
          "Pulao or Biryani",
          "Dal or Curry",
          "Pickle and Papad",
          "Sweet (Ladoo or Barfi)"
        ] 
      }
    ],
    specialDietary: ["Vegetarian options", "Packaged items for easy distribution"],
    estimatedCost: "₹250-350 per person",
    rating: 4.5
  },
  {
    id: "4",
    name: "Sports Event Refreshments",
    description: "Energizing food and drinks for sporting events",
    suitableFor: "Sports Tournaments, Athletic Meets, Outdoor Events",
    attendeeRange: "50-300",
    items: [
      { 
        category: "Hydration Stations", 
        options: [
          "Water Dispensers", 
          "Electrolyte Drinks", 
          "Fresh Lemonade or Fruit Juices"
        ] 
      },
      { 
        category: "Snack Counters", 
        options: [
          "Energy Bars and Fruits",
          "Sandwiches and Wraps",
          "Sprouts and Chaat"
        ] 
      },
      { 
        category: "Main Meals", 
        options: [
          "Biryani or Pulao",
          "Chole or Rajma",
          "Rotis or Parathas",
          "Curd and Salad"
        ] 
      }
    ],
    specialDietary: ["High-energy foods", "Quick-serve items", "Hydration-focused"],
    estimatedCost: "₹300-450 per person",
    rating: 4.3
  }
];

// Sample catering vendors
const cateringVendors = [
  {
    id: "1",
    name: "Campus Delights Catering",
    specialties: ["College Events", "Bulk Orders", "Vegetarian"],
    rating: 4.8,
    contact: "9876543210",
    minOrderSize: 30
  },
  {
    id: "2",
    name: "Royal Indian Cuisine",
    specialties: ["Traditional Food", "Formal Events", "Multi-cuisine"],
    rating: 4.9,
    contact: "8765432109",
    minOrderSize: 50
  },
  {
    id: "3",
    name: "Express Food Services",
    specialties: ["Quick Service", "Budget Friendly", "Packed Meals"],
    rating: 4.2,
    contact: "7654321098",
    minOrderSize: 20
  },
  {
    id: "4",
    name: "Green Leaf Catering",
    specialties: ["Organic Food", "Health Focused", "Eco-friendly Packaging"],
    rating: 4.6,
    contact: "6543210987",
    minOrderSize: 25
  }
];

const DietaryRequirementCard = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="bg-white rounded-md p-4 shadow">
      <h4 className="font-medium text-sm mb-1">{title}</h4>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
};

const FoodRecommendations = () => {
  const [eventType, setEventType] = useState("");
  const [attendees, setAttendees] = useState("");
  const [duration, setDuration] = useState("");
  const [budget, setBudget] = useState("");
  const [dietaryNeeds, setDietaryNeeds] = useState<string[]>([]);
  const [customRequirements, setCustomRequirements] = useState("");
  const [generatingRecommendations, setGeneratingRecommendations] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<typeof recommendedMenus[0] | null>(null);
  
  const { toast } = useToast();
  
  const handleGenerateRecommendations = () => {
    setGeneratingRecommendations(true);
    
    // Simulate API call to get recommendations
    setTimeout(() => {
      setGeneratingRecommendations(false);
      
      toast({
        title: "Recommendations Ready",
        description: "We've generated food recommendations based on your event details.",
      });
    }, 1500);
  };
  
  const handleSelectMenu = (menu: typeof recommendedMenus[0]) => {
    setSelectedMenu(menu);
    
    toast({
      title: "Menu Selected",
      description: `You've selected the ${menu.name} package for your event.`,
    });
  };
  
  const handleCopyMenu = () => {
    if (!selectedMenu) return;
    
    // In a real app, this would copy the menu to the clipboard
    toast({
      title: "Menu Copied",
      description: "Menu details have been copied to your clipboard.",
    });
  };
  
  const handleSaveMenu = () => {
    if (!selectedMenu) return;
    
    // In a real app, this would save the menu to the user's event
    toast({
      title: "Menu Saved",
      description: "This menu has been saved to your event planning.",
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Utensils className="mr-2 text-[#f0b67f]" />
            Food Planner
          </CardTitle>
          <CardDescription>
            Get food recommendations for your event based on event type, attendees, and dietary requirements.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Event Type</label>
              <Select value={eventType} onValueChange={setEventType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conference">Conference/Symposium</SelectItem>
                  <SelectItem value="workshop">Workshop/Training</SelectItem>
                  <SelectItem value="cultural">Cultural Festival</SelectItem>
                  <SelectItem value="sports">Sports Event</SelectItem>
                  <SelectItem value="seminar">Seminar/Guest Lecture</SelectItem>
                  <SelectItem value="networking">Networking Event</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Expected Attendees</label>
              <Select value={attendees} onValueChange={setAttendees}>
                <SelectTrigger>
                  <SelectValue placeholder="Select attendee count" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (30-50)</SelectItem>
                  <SelectItem value="medium">Medium (50-100)</SelectItem>
                  <SelectItem value="large">Large (100-200)</SelectItem>
                  <SelectItem value="xlarge">Extra Large (200+)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Event Duration</label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="half-day">Half Day (2-4 hours)</SelectItem>
                  <SelectItem value="full-day">Full Day (4-8 hours)</SelectItem>
                  <SelectItem value="multi-day">Multi-day Event</SelectItem>
                  <SelectItem value="evening">Evening Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Budget Per Person</label>
              <Select value={budget} onValueChange={setBudget}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="economy">Economy (₹100-250)</SelectItem>
                  <SelectItem value="standard">Standard (₹250-400)</SelectItem>
                  <SelectItem value="premium">Premium (₹400-600)</SelectItem>
                  <SelectItem value="luxury">Luxury (₹600+)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-2 block">Dietary Requirements</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="vegetarian" 
                    checked={dietaryNeeds.includes("vegetarian")}
                    onCheckedChange={(checked) => {
                      checked 
                        ? setDietaryNeeds([...dietaryNeeds, "vegetarian"])
                        : setDietaryNeeds(dietaryNeeds.filter(item => item !== "vegetarian"))
                    }}
                  />
                  <label htmlFor="vegetarian" className="text-sm">Vegetarian</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="non-vegetarian" 
                    checked={dietaryNeeds.includes("non-vegetarian")}
                    onCheckedChange={(checked) => {
                      checked 
                        ? setDietaryNeeds([...dietaryNeeds, "non-vegetarian"])
                        : setDietaryNeeds(dietaryNeeds.filter(item => item !== "non-vegetarian"))
                    }}
                  />
                  <label htmlFor="non-vegetarian" className="text-sm">Non-Vegetarian</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="vegan" 
                    checked={dietaryNeeds.includes("vegan")}
                    onCheckedChange={(checked) => {
                      checked 
                        ? setDietaryNeeds([...dietaryNeeds, "vegan"])
                        : setDietaryNeeds(dietaryNeeds.filter(item => item !== "vegan"))
                    }}
                  />
                  <label htmlFor="vegan" className="text-sm">Vegan</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="jain" 
                    checked={dietaryNeeds.includes("jain")}
                    onCheckedChange={(checked) => {
                      checked 
                        ? setDietaryNeeds([...dietaryNeeds, "jain"])
                        : setDietaryNeeds(dietaryNeeds.filter(item => item !== "jain"))
                    }}
                  />
                  <label htmlFor="jain" className="text-sm">Jain</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="gluten-free" 
                    checked={dietaryNeeds.includes("gluten-free")}
                    onCheckedChange={(checked) => {
                      checked 
                        ? setDietaryNeeds([...dietaryNeeds, "gluten-free"])
                        : setDietaryNeeds(dietaryNeeds.filter(item => item !== "gluten-free"))
                    }}
                  />
                  <label htmlFor="gluten-free" className="text-sm">Gluten-Free</label>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-1 block">Additional Requirements</label>
              <Textarea 
                placeholder="Any specific food preferences or requirements..."
                value={customRequirements}
                onChange={(e) => setCustomRequirements(e.target.value)}
                className="resize-none"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleGenerateRecommendations} 
            disabled={generatingRecommendations}
            className="w-full md:w-auto"
          >
            {generatingRecommendations ? "Generating Recommendations..." : "Generate Recommendations"}
          </Button>
        </CardFooter>
      </Card>
      
      <Tabs defaultValue="recommended" className="space-y-4">
        <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-2 md:grid-cols-none gap-2 md:gap-0">
          <TabsTrigger value="recommended">Recommended Menus</TabsTrigger>
          <TabsTrigger value="vendors">Catering Vendors</TabsTrigger>
          <TabsTrigger value="dietary">Dietary Information</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recommended" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recommendedMenus.map((menu) => (
              <Card 
                key={menu.id} 
                className={`card-gradient overflow-hidden border-2 transition-colors ${selectedMenu?.id === menu.id ? 'border-[#f0b67f]' : 'border-transparent'}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        {menu.name}
                        {selectedMenu?.id === menu.id && (
                          <Check className="ml-2 h-5 w-5 text-[#f0b67f]" />
                        )}
                      </CardTitle>
                      <CardDescription className="mt-1">{menu.description}</CardDescription>
                    </div>
                    <Badge className="bg-[#a9def9] text-foreground hover:bg-[#a9def9]/90 whitespace-nowrap">
                      {menu.attendeeRange} attendees
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Suggested For</h4>
                      <div className="flex flex-wrap gap-2">
                        {menu.suitableFor.split(', ').map((item, i) => (
                          <Badge key={i} variant="outline" className="border-[#d6d1b1]">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="menu-details">
                        <AccordionTrigger className="text-sm font-medium">
                          <div className="flex items-center">
                            <Coffee className="mr-2 h-4 w-4 text-[#f0b67f]" />
                            Menu Details
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4">
                            {menu.items.map((item, idx) => (
                              <div key={idx} className="space-y-1">
                                <h5 className="text-sm font-medium">{item.category}</h5>
                                <ul className="list-disc list-inside text-xs text-muted-foreground space-y-0.5">
                                  {item.options.map((option, i) => (
                                    <li key={i}>{option}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <h4 className="text-sm font-medium">Special Dietary Options</h4>
                        <AlertCircle className="ml-1 h-4 w-4 text-[#fe5f55]" />
                      </div>
                      <ul className="list-disc list-inside text-xs text-muted-foreground space-y-0.5">
                        {menu.specialDietary.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Estimated Cost</h4>
                        <p className="text-muted-foreground text-sm">{menu.estimatedCost}</p>
                      </div>
                      <div className="text-right">
                        <h4 className="text-sm font-medium">Rating</h4>
                        <p className="flex items-center justify-end text-sm">
                          {menu.rating}
                          <span className="text-[#f0b67f] ml-1">★</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-wrap gap-2">
                  <Button 
                    variant={selectedMenu?.id === menu.id ? "default" : "outline"} 
                    onClick={() => handleSelectMenu(menu)}
                    className={selectedMenu?.id === menu.id ? "bg-[#f0b67f] hover:bg-[#f0b67f]/90" : ""}
                  >
                    {selectedMenu?.id === menu.id ? "Selected" : "Select This Menu"}
                  </Button>
                  
                  <Button variant="outline" onClick={handleCopyMenu} disabled={selectedMenu?.id !== menu.id}>
                    <FileDown className="mr-2 h-4 w-4" />
                    Export Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {selectedMenu && (
            <div className="flex justify-center mt-6">
              <Button onClick={handleSaveMenu}>
                Save Menu to Event
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="vendors" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cateringVendors.map((vendor) => (
              <Card key={vendor.id} className="card-gradient overflow-hidden">
                <CardHeader>
                  <CardTitle>{vendor.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {vendor.specialties.map((specialty, idx) => (
                          <Badge key={idx} variant="outline" className="border-[#d6d1b1]">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium">Rating</h4>
                        <p className="flex items-center text-sm">
                          {vendor.rating}
                          <span className="text-[#f0b67f] ml-1">★</span>
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Minimum Order</h4>
                        <p className="text-sm">{vendor.minOrderSize} people</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-1">Contact</h4>
                      <p className="text-sm">{vendor.contact}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Contact Vendor
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center mt-4">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Vendor
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="dietary" className="space-y-4">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Dietary Information</CardTitle>
              <CardDescription>
                Important considerations for planning food at college events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <DietaryRequirementCard 
                  title="Vegetarian Options" 
                  description="Ensure at least 50% of all food options are vegetarian to accommodate dietary preferences common in India." 
                />
                <DietaryRequirementCard 
                  title="Jain Requirements" 
                  description="For Jain students, provide options without root vegetables, onion, garlic, and strictly vegetarian." 
                />
                <DietaryRequirementCard 
                  title="Religious Considerations" 
                  description="Be mindful of religious dietary restrictions, particularly during festival seasons and fasting periods." 
                />
                <DietaryRequirementCard 
                  title="Food Allergies" 
                  description="Always label dishes that contain common allergens like nuts, dairy, and gluten." 
                />
                <DietaryRequirementCard 
                  title="Balanced Meals" 
                  description="Include protein sources appropriate for all dietary restrictions, particularly for day-long events." 
                />
                <DietaryRequirementCard 
                  title="Hydration" 
                  description="Provide water stations and beverages suitable for the weather conditions and event duration." 
                />
              </div>
              
              <div className="mt-6 p-4 border border-dashed border-[#fe5f55] rounded-md bg-[#fe5f55]/10">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-[#fe5f55] mr-2 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium mb-1">Important Health & Safety Note</h4>
                    <p className="text-xs text-muted-foreground">
                      Always ensure food safety standards are maintained, particularly for outdoor events. 
                      In warm weather, avoid serving items that spoil easily. Ensure all catering vendors 
                      have proper certifications and follow safety protocols.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FoodRecommendations;
