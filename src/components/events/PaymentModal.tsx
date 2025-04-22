import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { CreditCard, CalendarDays, Lock, Phone, Mail, Ticket } from "lucide-react";
import { Event } from "./EventCard";

interface PaymentModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface PaymentDetails {
  name: string;
  email: string;
  phone: string;
  quantity: number;
}

const PaymentModal = ({ event, isOpen, onClose, onSuccess }: PaymentModalProps) => {
  const [step, setStep] = useState<"details" | "payment">("details");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    name: "",
    email: "",
    phone: "",
    quantity: 1,
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleQuantityChange = (amount: number) => {
    setPaymentDetails((prev) => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + amount)
    }));
  };
  
  const calculateTotal = () => {
    const basePrice = event.ticketPrice || 49.99;
    return (basePrice * paymentDetails.quantity).toFixed(2);
  };
  
  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paymentDetails.name || !paymentDetails.email || !paymentDetails.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill all the required fields",
        variant: "destructive",
      });
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(paymentDetails.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(paymentDetails.phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit Indian phone number",
        variant: "destructive",
      });
      return;
    }
    
    setStep("payment");
  };
  
  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const orderId = 'order_' + Math.random().toString(36).substring(2, 15);
      const totalAmount = parseFloat(calculateTotal()) * 100;
      
      const options = {
        key: "rzp_test_yourkeyhere",
        amount: totalAmount,
        currency: "INR",
        name: "Event Ticket",
        description: `Tickets for ${event.title}`,
        order_id: orderId,
        handler: function() {
          onPaymentSuccess();
        },
        prefill: {
          name: paymentDetails.name,
          email: paymentDetails.email,
          contact: paymentDetails.phone
        },
        notes: {
          event_id: event.id,
          quantity: paymentDetails.quantity
        },
        theme: {
          color: "#fe5f55"
        }
      };
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log(`Sending confirmation email to ${paymentDetails.email}`);
      console.log(`Sending confirmation SMS to ${paymentDetails.phone}`);
      
      onPaymentSuccess();
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const onPaymentSuccess = () => {
    toast({
      title: "Payment Successful",
      description: `You have successfully purchased ${paymentDetails.quantity} ticket(s) for ${event.title}. Confirmation details have been sent to your email and phone.`,
    });
    onSuccess();
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        {step === "details" ? (
          <form onSubmit={handleSubmitDetails}>
            <DialogHeader>
              <DialogTitle>Purchase Tickets - {event.title}</DialogTitle>
              <DialogDescription>
                Enter your details to proceed with ticket purchase.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label>Event Information</Label>
                <div className="bg-muted p-3 rounded-md">
                  <div className="font-medium">{event.title}</div>
                  <div className="text-sm text-muted-foreground">{event.date} at {event.time}</div>
                  <div className="text-sm text-muted-foreground">{event.location}</div>
                  <div className="mt-1 font-medium text-primary">
                    ₹{event.ticketPrice || "49.99"} per ticket
                  </div>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="quantity">Number of Tickets</Label>
                <div className="flex items-center">
                  <Button 
                    type="button"
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={paymentDetails.quantity <= 1}
                  >
                    -
                  </Button>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    value={paymentDetails.quantity}
                    onChange={handleChange}
                    className="h-8 w-16 mx-2 text-center"
                  />
                  <Button 
                    type="button"
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(1)}
                  >
                    +
                  </Button>
                  <div className="ml-auto font-medium">
                    Total: ₹{calculateTotal()}
                  </div>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={paymentDetails.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={paymentDetails.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="pl-10"
                    required
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Input
                    id="phone"
                    name="phone"
                    value={paymentDetails.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className="pl-10"
                    required
                  />
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                Continue to Payment
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Secure Payment</DialogTitle>
              <DialogDescription>
                Complete your payment to finalize your ticket purchase.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="bg-muted p-3 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {paymentDetails.quantity} ticket(s) x ₹{event.ticketPrice || "49.99"}
                    </div>
                  </div>
                  <div className="text-lg font-bold">
                    ₹{calculateTotal()}
                  </div>
                </div>
              </div>
              
              <div className="border border-muted p-4 rounded-lg">
                <div className="flex items-center mb-4">
                  <img src="https://razorpay.com/assets/razorpay-glyph.svg" alt="Razorpay" className="h-8 mr-2" />
                  <div>
                    <div className="font-medium">Razorpay Secure Checkout</div>
                    <div className="text-xs text-muted-foreground">Safe and secure payments</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="grid grid-cols-4 gap-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6 object-contain" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 object-contain" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d1/RuPay.svg" alt="RuPay" className="h-6 object-contain" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/UPI-Logo-vector.svg" alt="UPI" className="h-6 object-contain" />
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setStep("details")}>
                Back
              </Button>
              <Button onClick={handlePayment} disabled={isProcessing}>
                {isProcessing ? "Processing..." : `Pay ₹${calculateTotal()}`}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
