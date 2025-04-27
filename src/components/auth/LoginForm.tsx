
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  isProcessing?: boolean;
}

const LoginForm = ({ onSubmit, isProcessing = false }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill all the required fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await onSubmit(email, password);
      navigate('/dashboard');
    } catch (error: any) {
      console.error("Login error:", error);
    }
  };

  const useDemoAccount = () => {
    const demoEmail = "demo@eventory.in";
    const demoPassword = "demo123";
    
    setEmail(demoEmail);
    setPassword(demoPassword);
    
    toast({
      title: "Demo Credentials Applied",
      description: "You can now sign in with the demo account credentials.",
    });
  };
  
  return (
    <Card className="w-full max-w-md mx-auto card-gradient">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Welcome to Eventory</CardTitle>
        <CardDescription className="text-center">
          Sign in to access your event management dashboard
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <Alert className="bg-[#EEF2FF] border-eventory-primary/30">
            <Info className="h-4 w-4 text-eventory-primary" />
            <AlertDescription className="text-sm">
              <span className="font-medium">Demo Account</span>: Click the "Use Demo Account" button below to try Eventory with sample data.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isProcessing}
              required
              className="bg-white"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link to="/forgot-password" className="text-xs text-eventory-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isProcessing}
              required
              className="bg-white"
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isProcessing}>
            {isProcessing ? "Signing In..." : "Sign In"}
          </Button>
          
          <Button 
            type="button" 
            variant="outline" 
            className="w-full" 
            onClick={useDemoAccount}
            disabled={isProcessing}
          >
            Use Demo Account
          </Button>
          
          <div className="text-center text-sm">
            <span>
              Don't have an account?{" "}
              <Link to="/signup" className="text-eventory-primary hover:underline">
                Sign Up
              </Link>
            </span>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
