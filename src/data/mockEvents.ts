
import { Event } from "../components/events/EventCard";

// Sample data to be shared across components - in a real app this would come from an API
export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Tech Conference 2025",
    description: "Join us for the biggest tech conference of the year featuring the latest innovations and industry leaders from across India and beyond.",
    date: "2025-06-15",
    time: "09:00 AM - 05:00 PM",
    location: "Bangalore International Exhibition Centre, Bengaluru",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    totalSeats: 500,
    enrolledSeats: 380,
    ticketPrice: 1999,
    venueDetails: {
      name: "Bangalore International Exhibition Centre",
      address: "10th Mile, Tumkur Road, Madavara, Bengaluru, Karnataka 562123",
      facilities: ["Wi-Fi", "Parking", "Food Court", "Accessibility Features"]
    }
  },
  {
    id: "2",
    title: "Web Development Workshop",
    description: "A hands-on workshop for learning modern web development techniques and tools. Perfect for beginners and intermediate developers looking to upskill.",
    date: "2025-07-10",
    time: "10:00 AM - 03:00 PM",
    location: "T-Hub, Hyderabad",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    totalSeats: 100,
    enrolledSeats: 85,
    ticketPrice: 799,
    venueDetails: {
      name: "T-Hub",
      address: "TSIIC Phase 2, Raidurgam, Hyderabad, Telangana 500081",
      facilities: ["High-speed Internet", "Developer Workstations", "Refreshments"]
    }
  },
  {
    id: "3",
    title: "Startup Networking Event",
    description: "Connect with founders, investors, and tech enthusiasts in this networking event focused on the Indian startup ecosystem.",
    date: "2025-05-20",
    time: "06:00 PM - 09:00 PM",
    location: "Bombay Stock Exchange, Mumbai",
    category: "Networking",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    totalSeats: 200,
    enrolledSeats: 150,
    ticketPrice: 499,
    venueDetails: {
      name: "Bombay Stock Exchange",
      address: "Phiroze Jeejeebhoy Towers, Dalal Street, Mumbai, Maharashtra 400001",
      facilities: ["Rooftop Terrace", "Conference Rooms", "Catering"]
    }
  },
  {
    id: "4",
    title: "Data Science Symposium",
    description: "Explore the latest advances in data science, machine learning, and AI with India's leading data scientists and researchers.",
    date: "2025-08-05",
    time: "09:00 AM - 06:00 PM",
    location: "IIT Delhi Campus, New Delhi",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    totalSeats: 300,
    enrolledSeats: 275,
    ticketPrice: 1499,
    venueDetails: {
      name: "IIT Delhi Campus",
      address: "Hauz Khas, New Delhi, Delhi 110016",
      facilities: ["Auditorium", "Research Labs", "Campus Tour"]
    }
  },
  {
    id: "5",
    title: "UX/UI Design Masterclass",
    description: "Learn the principles of effective UX/UI design from industry experts. Special focus on designing for the diverse Indian market.",
    date: "2025-06-25",
    time: "10:00 AM - 04:00 PM",
    location: "Infopark, Kochi",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    totalSeats: 150,
    enrolledSeats: 120,
    ticketPrice: 899,
    venueDetails: {
      name: "Infopark",
      address: "Infopark Kochi Campus, Kakkanad, Kochi, Kerala 682042",
      facilities: ["Design Studios", "Discussion Areas", "Creative Spaces"]
    }
  },
  {
    id: "6",
    title: "Startup Pitch Competition",
    description: "Watch innovative Indian startups pitch their ideas to investors and win funding up to ₹50 Lakhs.",
    date: "2025-09-10",
    time: "02:00 PM - 08:00 PM",
    location: "HITEC City, Hyderabad",
    category: "Business",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    totalSeats: 250,
    enrolledSeats: 200,
    ticketPrice: 599,
    venueDetails: {
      name: "HITEC City Convention Centre",
      address: "Madhapur, Hyderabad, Telangana 500081",
      facilities: ["Presentation Stage", "Investor Lounge", "Networking Area"]
    }
  },
];
