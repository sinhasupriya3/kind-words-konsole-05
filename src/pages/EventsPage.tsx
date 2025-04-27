
import SystemStatus from "@/components/dashboard/SystemStatus";
import CollegeEventsList from "@/components/college-events/CollegeEventsList";

const EventsPage = () => {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Cloud-Based Event Management</h1>
        <p className="text-muted-foreground">
          Manage and monitor your events with real-time cloud synchronization
        </p>
      </div>
      
      <SystemStatus />
      
      <div className="mt-8">
        <CollegeEventsList />
      </div>
    </div>
  );
};

export default EventsPage;
