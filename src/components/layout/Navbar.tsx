
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, LogOut, School } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleMockLogin = () => {
    setIsLoggedIn(true);
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
              {isLoggedIn && (
                <>
                  <Link to="/college-events" className="text-foreground hover:text-primary px-3 py-2 rounded-md flex items-center">
                    <School size={16} className="mr-1" />
                    College Events
                  </Link>
                </>
              )}
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard" className="text-foreground hover:text-primary px-3 py-2 rounded-md">
                    Dashboard
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
                  <Button variant="outline" size="sm" onClick={handleMockLogin} className="hidden">
                    Demo Login
                  </Button>
                </>
              )}
            </div>
          </div>

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
                <Link 
                  to="/college-events" 
                  className="text-foreground hover:text-primary px-3 py-2 rounded-md flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <School size={16} className="mr-1" />
                  College Events
                </Link>
              )}
              {isLoggedIn ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-foreground hover:text-primary px-3 py-2 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
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
                </>
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
