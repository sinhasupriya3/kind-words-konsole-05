
import MainLayout from "@/components/layout/MainLayout";
import VenuesList from "@/components/venues/VenuesList";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const VenuesPage = () => {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Event Venues</h1>
          <p className="text-muted-foreground mt-2">
            Explore our premium venues across India
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {["Bengaluru", "Mumbai", "Delhi", "Hyderabad", "Chennai", "Pune", "Kolkata", "Kochi"].map((city) => (
            <Button 
              key={city}
              variant="outline"
              className="h-auto py-3 justify-start card-gradient"
            >
              <MapPin className="mr-2 h-4 w-4" />
              {city}
            </Button>
          ))}
        </div>
        
        <VenuesList />
        
        <div className="mt-10 text-center p-8 border border-dashed border-primary/30 rounded-lg card-gradient">
          <h2 className="text-xl font-semibold mb-4">Own a venue?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            List your venue on our platform and reach thousands of event organizers across India. 
            Our platform makes it easy to showcase your venue's features and availability.
          </p>
          <Button>
            <Link to="/venue-signup">Register Your Venue</Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default VenuesPage;
