
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const SignInPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignIn = async (email: string, password: string) => {
    setIsProcessing(true);
    
    try {
      // Demo account notification
      if (email === "demo@eventory.in" && password === "demo123") {
        await login(email, password);
        
        toast({
          title: "Welcome to Eventory!",
          description: "You've successfully signed in to the demo account.",
        });
        
        navigate("/dashboard");
        return;
      }
      
      // For regular login
      await login(email, password);
      
      toast({
        title: "Sign In Successful",
        description: "Welcome back to your event dashboard.",
      });
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in:", error);
      toast({
        title: "Sign In Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#EEF2FF] via-white to-[#F9FAFB]">
      {/* Header */}
      <header className="py-6 px-4 sm:px-6 border-b bg-white">
        <div className="container flex justify-center">
          <h1 className="text-2xl font-bold text-eventory-primary">Eventory</h1>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fade-in">
        <div className="w-full max-w-md">
          <LoginForm onSubmit={handleSignIn} isProcessing={isProcessing} />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-6 px-4 sm:px-6 border-t bg-white">
        <div className="container flex flex-col items-center justify-center text-center">
          <p className="text-sm text-muted-foreground">
            Eventory - Cloud-Based Event Management Platform
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            © {new Date().getFullYear()} Eventory. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SignInPage;
