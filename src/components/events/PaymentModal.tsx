
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
import { CreditCard, CalendarDays, Lock } from "lucide-react";
import { Event } from "./EventCard";

interface PaymentModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface PaymentDetails {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
  quantity: number;
}

const PaymentModal = ({ event, isOpen, onClose, onSuccess }: PaymentModalProps) => {
  const baseTicketPrice = 49.99;
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
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
    return (baseTicketPrice * paymentDetails.quantity).toFixed(2);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paymentDetails.cardNumber || 
        !paymentDetails.cardholderName || 
        !paymentDetails.expiryDate || 
        !paymentDetails.cvv) {
      toast({
        title: "Missing Information",
        description: "Please fill all the required payment fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    // Simulate payment processing
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast({
        title: "Payment Successful",
        description: `You have successfully purchased ${paymentDetails.quantity} ticket(s) for ${event.title}`,
      });
      setIsProcessing(false);
      onSuccess();
      onClose();
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Purchase Tickets - {event.title}</DialogTitle>
            <DialogDescription>
              Fill in your payment details to complete your ticket purchase.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label>Event Information</Label>
              <div className="bg-muted p-3 rounded-md">
                <div className="font-medium">{event.title}</div>
                <div className="text-sm text-muted-foreground">{event.date} at {event.time}</div>
                <div className="text-sm text-muted-foreground">{event.location}</div>
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
                  ${calculateTotal()}
                </div>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="cardholderName">Cardholder Name</Label>
              <Input
                id="cardholderName"
                name="cardholderName"
                value={paymentDetails.cardholderName}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  value={paymentDetails.cardNumber}
                  onChange={handleChange}
                  placeholder="4242 4242 4242 4242"
                  className="pr-10"
                  maxLength={19}
                  required
                />
                <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <div className="relative">
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    value={paymentDetails.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                  <CalendarDays className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="cvv">CVV</Label>
                <div className="relative">
                  <Input
                    id="cvv"
                    name="cvv"
                    value={paymentDetails.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    maxLength={3}
                    required
                  />
                  <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isProcessing}>
              {isProcessing ? "Processing..." : `Pay $${calculateTotal()}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
