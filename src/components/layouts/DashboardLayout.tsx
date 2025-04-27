
import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Calendar, 
  Users, 
  Settings, 
  Bell, 
  LogOut,
  LayoutDashboard,
  Ticket,
  Map,
  MessageSquare,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const navigation = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "My Events", path: "/events", icon: Calendar },
    { name: "My Tickets", path: "/my-tickets", icon: Ticket },
    { name: "College Events", path: "/college-events", icon: Users },
    { name: "Venues", path: "/venues", icon: Map },
    { name: "Chat Support", path: "/contact", icon: MessageSquare },
    { name: "Settings", path: "/settings", icon: Settings }
  ];
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const isActive = (path: string) => {
    return location.pathname === path ? "active" : "";
  };
  
  return (
    <div className={`min-h-screen flex flex-col ${isSidebarOpen ? 'md:grid' : ''}`} 
      style={isSidebarOpen ? {
        gridTemplateColumns: 'auto 1fr',
        gridTemplateRows: 'auto 1fr'
      } : {}}>
      {/* Mobile header */}
      <div className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b bg-background px-4 md:hidden">
        <Button variant="outline" size="icon" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex-1 flex items-center justify-center md:justify-start">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-eventory-primary">Eventory</span>
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatar.png" alt={user?.name || "User"} />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Sidebar */}
      <aside 
        className={`${isSidebarOpen ? 'block' : 'hidden md:block'} 
          fixed top-0 bottom-0 z-40 w-64 border-r bg-white transition-all duration-300 ease-in-out md:sticky md:z-0`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header with logo */}
          <div className="flex items-center justify-between h-16 border-b px-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl text-eventory-primary">Eventory</span>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="md:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Nav items */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`nav-link ${isActive(item.path)}`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
          
          {/* User profile in sidebar */}
          <div className="border-t p-4">
            <div className="flex items-center">
              <Avatar>
                <AvatarImage src="/avatar.png" alt={user?.name || "User"} />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium">{user?.name || "Demo User"}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email || "demo@eventory.in"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main content area */}
      <div className="flex flex-col flex-1">
        {/* Desktop header */}
        <header className="hidden md:flex sticky top-0 z-30 h-16 items-center justify-between gap-4 border-b bg-background px-6">
          <Button variant="outline" size="icon" onClick={toggleSidebar} className="shrink-0">
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-6">
            <div className="ml-auto flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-eventory-secondary">
                      3
                    </Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-[300px] overflow-auto">
                    <div className="flex items-start gap-4 p-4 hover:bg-muted">
                      <Calendar className="mt-1 h-5 w-5 text-eventory-secondary" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">New event announced</p>
                        <p className="text-xs text-muted-foreground">Tech Conference 2025 has been announced.</p>
                        <p className="text-xs text-muted-foreground">5 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 hover:bg-muted">
                      <Ticket className="mt-1 h-5 w-5 text-eventory-primary" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Ticket confirmed</p>
                        <p className="text-xs text-muted-foreground">Your ticket for Design Workshop has been confirmed.</p>
                        <p className="text-xs text-muted-foreground">1 hour ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 hover:bg-muted">
                      <Map className="mt-1 h-5 w-5 text-eventory-accent" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Venue update</p>
                        <p className="text-xs text-muted-foreground">Cultural Fest venue has been changed.</p>
                        <p className="text-xs text-muted-foreground">Yesterday</p>
                      </div>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <div className="p-2">
                    <Button variant="outline" size="sm" className="w-full">
                      View all notifications
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="sm" className="gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatar.png" alt={user?.name || "User"} />
                      <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <span>{user?.name?.split(' ')[0] || "Demo"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Users className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-[#f9faff]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
