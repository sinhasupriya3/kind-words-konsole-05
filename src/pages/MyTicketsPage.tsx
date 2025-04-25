
import { useState } from "react";
import { Download, QrCode, Ticket, MapPin, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/layout/MainLayout";
import { toast } from "@/hooks/use-toast";

interface TicketData {
  id: string;
  eventName: string;
  date: string;
  time: string;
  venue: string;
  quantity: number;
  qrCode: string;
  isCancellable: boolean;
}

// Mock data - would come from backend in real app
const mockTickets: TicketData[] = [
  {
    id: "1",
    eventName: "Tech Conference 2025",
    date: "2025-06-15",
    time: "09:00 AM - 05:00 PM",
    venue: "Convention Center",
    quantity: 2,
    qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TICKET-001",
    isCancellable: true
  }
];

const MyTicketsPage = () => {
  const [tickets, setTickets] = useState<TicketData[]>(mockTickets);

  const handleDownload = (ticketId: string) => {
    toast({
      title: "Downloading Ticket",
      description: "Your ticket is being downloaded..."
    });
  };

  const handleCancel = (ticketId: string) => {
    toast({
      title: "Cancellation Request",
      description: "Your cancellation request has been submitted."
    });
    setTickets(tickets.filter(ticket => ticket.id !== ticketId));
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Tickets</h1>
          <p className="text-muted-foreground mt-2">
            View and manage your event tickets
          </p>
        </div>

        {tickets.length > 0 ? (
          <div className="grid gap-6">
            {tickets.map((ticket) => (
              <Card key={ticket.id} className="card-gradient">
                <CardHeader>
                  <CardTitle>{ticket.eventName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{ticket.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{ticket.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{ticket.venue}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Ticket className="h-4 w-4" />
                        <span>{ticket.quantity} tickets</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-4">
                      <img
                        src={ticket.qrCode}
                        alt="Ticket QR Code"
                        className="w-32 h-32"
                      />
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(ticket.id)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        {ticket.isCancellable && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleCancel(ticket.id)}
                          >
                            Cancel Ticket
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <QrCode className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-xl font-semibold mb-2">No tickets found</p>
              <p className="text-muted-foreground mb-4">
                You haven't purchased any tickets yet
              </p>
              <Button asChild>
                <Link to="/events">Browse Events</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default MyTicketsPage;
