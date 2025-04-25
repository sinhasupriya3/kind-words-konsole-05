
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t border-border py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div>
            <p className="text-foreground text-sm">
              &copy; {currentYear} Eventory. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/about" className="text-foreground hover:text-primary text-sm">
              About
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary text-sm">
              Contact
            </Link>
            <Link to="/privacy" className="text-foreground hover:text-primary text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-foreground hover:text-primary text-sm">
              Terms & Conditions
            </Link>
            <Link to="/my-tickets" className="text-foreground hover:text-primary text-sm">
              My Tickets
            </Link>
            <Link to="/college-events" className="text-foreground hover:text-primary text-sm">
              College Events
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
