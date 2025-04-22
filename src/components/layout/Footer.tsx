
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t border-border py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-foreground text-sm">
              &copy; {currentYear} Eventory. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <Link to="/about" className="text-foreground hover:text-primary text-sm">
              About
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary text-sm">
              Contact
            </Link>
            <Link to="/privacy" className="text-foreground hover:text-primary text-sm">
              Privacy
            </Link>
            <Link to="/terms" className="text-foreground hover:text-primary text-sm">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
