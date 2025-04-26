
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut, School, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check authentication state from localStorage on component mount and route change
    const checkAuthStatus = () => {
      const authStatus = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(authStatus);
    };
    
    checkAuthStatus();
    
    // Setup a listener for storage events to handle login state changes
    window.addEventListener('storage', checkAuthStatus);
    
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Clear authentication state
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    
    // Show logout success message
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    });
    
    // Navigate to home page
    navigate("/");
  };

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="font-bold text-xl">Eventory</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link to="/events" className="text-foreground hover:text-primary px-3 py-2 rounded-md">
                Events
              </Link>
              {isLoggedIn ? (
                <>
                  <Link to="/college-events" className="text-foreground hover:text-primary px-3 py-2 rounded-md flex items-center">
                    <School size={16} className="mr-1" />
                    College Events
                  </Link>
                  <Link to="/dashboard" className="text-foreground hover:text-primary px-3 py-2 rounded-md">
                    Dashboard
                  </Link>
                  <Link to="/my-tickets" className="text-foreground hover:text-primary px-3 py-2 rounded-md flex items-center">
                    <Ticket size={16} className="mr-1" />
                    My Tickets
                  </Link>
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center gap-2">
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/signin">
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <User size={16} />
                      <span>Sign In</span>
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-foreground hover:text-primary"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/events" 
                className="text-foreground hover:text-primary px-3 py-2 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Events
              </Link>
              {isLoggedIn && (
                <>
                  <Link 
                    to="/college-events" 
                    className="text-foreground hover:text-primary px-3 py-2 rounded-md flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <School size={16} className="mr-1" />
                    College Events
                  </Link>
                  <Link 
                    to="/dashboard" 
                    className="text-foreground hover:text-primary px-3 py-2 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/my-tickets" 
                    className="text-foreground hover:text-primary px-3 py-2 rounded-md flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <Ticket size={16} className="mr-1" />
                    My Tickets
                  </Link>
                </>
              )}
              {isLoggedIn ? (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }} 
                  className="flex items-center gap-2 justify-start"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </Button>
              ) : (
                <>
                  <Link 
                    to="/signin" 
                    className="text-foreground hover:text-primary px-3 py-2 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/signup" 
                    className="text-foreground hover:text-primary px-3 py-2 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
