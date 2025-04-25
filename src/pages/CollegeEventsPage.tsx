
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CollegeEventsList from "@/components/college-events/CollegeEventsList";
import EventRecommendations from "@/components/college-events/EventRecommendations";
import VenueFinder from "@/components/college-events/VenueFinder";
import AttendeeManagement from "@/components/college-events/AttendeeManagement";
import FoodRecommendations from "@/components/college-events/FoodRecommendations";
import AdminPanel from "@/components/college-events/AdminPanel";
import UserPanel from "@/components/college-events/UserPanel";

const CollegeEventsPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user role
    const checkUserRole = async () => {
      try {
        // This would be replaced with actual API call to check user role
        await new Promise((resolve) => setTimeout(resolve, 500));
        // For demo purposes, randomly assign admin role
        setIsAdmin(Math.random() > 0.5);
      } catch (error) {
        console.error("Error checking user role:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserRole();
  }, []);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">College Events</h1>
          <p className="text-muted-foreground mt-2">
            Organize, manage and attend college events in one place
          </p>
        </div>

        <Tabs defaultValue="browse">
          <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-2 md:grid-cols-none gap-2 md:gap-0">
            <TabsTrigger value="browse">Browse Events</TabsTrigger>
            <TabsTrigger value="recommend">AI Recommendations</TabsTrigger>
            <TabsTrigger value="venues">Venue Finder</TabsTrigger>
            <TabsTrigger value="food">Food Planner</TabsTrigger>
            {isAdmin && <TabsTrigger value="admin">Admin</TabsTrigger>}
            <TabsTrigger value="user">My Panel</TabsTrigger>
          </TabsList>
          <TabsContent value="browse" className="mt-6">
            <CollegeEventsList />
          </TabsContent>
          <TabsContent value="recommend" className="mt-6">
            <EventRecommendations />
          </TabsContent>
          <TabsContent value="venues" className="mt-6">
            <VenueFinder />
          </TabsContent>
          <TabsContent value="food" className="mt-6">
            <FoodRecommendations />
          </TabsContent>
          {isAdmin && (
            <TabsContent value="admin" className="mt-6">
              <AdminPanel />
            </TabsContent>
          )}
          <TabsContent value="user" className="mt-6">
            <UserPanel />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default CollegeEventsPage;
