
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Event } from "./EventCard";
import PaymentModal from "./PaymentModal";
import { Ticket } from "lucide-react";

interface EventRegistrationFormProps {
  event: Event;
  onRegister: (eventId: string, attendeeDetails: AttendeeDetails) => Promise<void>;
}

export interface AttendeeDetails {
  name: string;
  email: string;
  phone: string;
}

const EventRegistrationForm = ({ event, onRegister }: EventRegistrationFormProps) => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [attendeeDetails, setAttendeeDetails] = useState<AttendeeDetails>({
    name: "",
    email: "",
    phone: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAttendeeDetails((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!attendeeDetails.name || !attendeeDetails.email) {
      toast({
        title: "Missing Information",
        description: "Please fill all the required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      setIsRegistrationOpen(false);
      setIsPaymentOpen(true);
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: "There was an error processing your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePaymentSuccess = async () => {
    try {
      await onRegister(event.id, attendeeDetails);
      toast({
        title: "Registration Successful",
        description: `You have successfully registered for ${event.title}`,
      });
    } catch (error) {
      console.error("Error finalizing registration:", error);
    }
  };
  
  return (
    <>
      <Button onClick={() => setIsRegistrationOpen(true)} className="w-full">
        <Ticket className="mr-2 h-4 w-4" />
        Register for Event
      </Button>
      
      <Dialog open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Register for {event.title}</DialogTitle>
              <DialogDescription>
                Please fill in your details to register for this event.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={attendeeDetails.name}
                  onChange={handleChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={attendeeDetails.email}
                  onChange={handleChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={attendeeDetails.phone}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Processing..." : "Continue to Payment"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <PaymentModal
        event={event}
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onSuccess={handlePaymentSuccess}
      />
    </>
  );
};

export default EventRegistrationForm;
