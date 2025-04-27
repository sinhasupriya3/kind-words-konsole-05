
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface User {
  name?: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (isLoggedIn) {
        const userStr = localStorage.getItem("user");
        if (userStr) {
          try {
            const userData = JSON.parse(userStr);
            setUser(userData);
          } catch (e) {
            console.error("Error parsing user data:", e);
            setUser(null);
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("user");
          }
        }
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // For demo, just store in localStorage
      localStorage.setItem("isLoggedIn", "true");
      
      const userData = {
        name: email === "demo@eventory.in" ? "Demo User" : email.split('@')[0],
        email: email,
        role: "Event Manager"
      };
      
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      
      toast({
        title: "Logged in successfully",
        description: `Welcome back, ${userData.name}!`,
      });
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setIsLoading(true);
    
    // In a real app, this would call an API to invalidate session
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    setUser(null);
    
    toast({
      title: "Logged out successfully",
    });
    
    navigate("/signin");
    setIsLoading(false);
  };
  
  const authContext = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading
  };
  
  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
