
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import RequireAuth from "@/components/auth/RequireAuth";

// Import all page components
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import TicketsPage from "./pages/TicketsPage";
import VenuesPage from "./pages/VenuesPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import CollegeEventsPage from "./pages/CollegeEventsPage";
import MyTicketsPage from "./pages/MyTicketsPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/signin" element={<SignInPage />} />
    <Route path="/signup" element={<SignUpPage />} />
    <Route path="/events" element={<EventsPage />} />
    <Route path="/events/:id" element={<EventDetailPage />} />
    <Route path="/venues" element={<VenuesPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/privacy" element={<PrivacyPage />} />
    <Route path="/terms" element={<TermsPage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route 
      path="/dashboard" 
      element={
        <RequireAuth>
          <DashboardPage />
        </RequireAuth>
      } 
    />
    <Route 
      path="/tickets" 
      element={
        <RequireAuth>
          <TicketsPage />
        </RequireAuth>
      } 
    />
    <Route 
      path="/college-events" 
      element={
        <RequireAuth>
          <CollegeEventsPage />
        </RequireAuth>
      } 
    />
    <Route 
      path="/my-tickets" 
      element={
        <RequireAuth>
          <MyTicketsPage />
        </RequireAuth>
      } 
    />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
