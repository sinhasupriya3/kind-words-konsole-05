
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin, ExternalLink } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Eventory</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Eventory connects people through memorable events across India. We curate diverse experiences 
              from tech conferences to cultural festivals, simplifying event discovery and registration for everyone.
            </p>
            <Link to="/about" className="text-primary hover:text-primary/80 text-sm flex items-center transition-colors">
              Learn more <ExternalLink size={14} className="ml-1" />
            </Link>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/events" className="text-foreground hover:text-primary text-sm transition-colors">
                  Browse Events
                </Link>
              </li>
              <li>
                <Link to="/venues" className="text-foreground hover:text-primary text-sm transition-colors">
                  Venues
                </Link>
              </li>
              <li>
                <Link to="/college-events" className="text-foreground hover:text-primary text-sm transition-colors">
                  College Events
                </Link>
              </li>
              <li>
                <Link to="/tickets" className="text-foreground hover:text-primary text-sm transition-colors">
                  Tickets
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-foreground hover:text-primary text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-foreground hover:text-primary text-sm transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-foreground hover:text-primary text-sm transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1 text-primary" />
                <span className="text-sm text-muted-foreground">
                  123 Event Plaza, Koramangala<br />
                  Bengaluru, Karnataka 560034
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 text-primary" />
                <span className="text-sm text-muted-foreground">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-primary" />
                <span className="text-sm text-muted-foreground">support@eventory.in</span>
              </li>
            </ul>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" 
                className="bg-primary/10 p-2 rounded-full hover:bg-primary/20 transition-colors">
                <Facebook size={16} className="text-primary" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" 
                className="bg-primary/10 p-2 rounded-full hover:bg-primary/20 transition-colors">
                <Twitter size={16} className="text-primary" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" 
                className="bg-primary/10 p-2 rounded-full hover:bg-primary/20 transition-colors">
                <Instagram size={16} className="text-primary" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" 
                className="bg-primary/10 p-2 rounded-full hover:bg-primary/20 transition-colors">
                <Linkedin size={16} className="text-primary" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-6 border-t border-border mt-6 text-center md:flex md:justify-between md:items-center">
          <p className="text-muted-foreground text-sm">
            &copy; {currentYear} Eventory. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm mt-2 md:mt-0">
            Designed with ❤️ in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
