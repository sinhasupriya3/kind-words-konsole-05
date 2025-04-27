
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface AuthFormProps {
  type: "signin" | "signup";
  onSubmit: (email: string, password: string, name?: string) => void;
  isProcessing?: boolean;
}

const AuthForm = ({ type, onSubmit, isProcessing = false }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || (type === "signup" && !name)) {
      toast({
        title: "Error",
        description: "Please fill all the required fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await onSubmit(email, password, type === "signup" ? name : undefined);
    } catch (error: any) {
      console.error("Auth error:", error);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{type === "signin" ? "Sign In" : "Create Account"}</CardTitle>
        <CardDescription>
          {type === "signin" 
            ? "Enter your credentials to access your account" 
            : "Fill in the information below to create your account"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {type === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isProcessing}
                required
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isProcessing}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isProcessing}
              required
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isProcessing}>
            {isProcessing 
              ? (type === "signin" ? "Signing In..." : "Creating Account...") 
              : (type === "signin" ? "Sign In" : "Create Account")}
          </Button>
          
          <div className="text-center text-sm">
            {type === "signin" ? (
              <span>
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline">
                  Sign Up
                </Link>
              </span>
            ) : (
              <span>
                Already have an account?{" "}
                <Link to="/signin" className="text-primary hover:underline">
                  Sign In
                </Link>
              </span>
            )}
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AuthForm;
