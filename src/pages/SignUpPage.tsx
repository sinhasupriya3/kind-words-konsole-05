
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import AuthForm from "@/components/auth/AuthForm";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSignUp = async (email: string, password: string, name?: string) => {
    if (!name) {
      toast({
        title: "Registration Error",
        description: "Please provide your full name",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      await signUp(email, password, name);
      
      toast({
        title: "Account Created",
        description: "Your account has been created successfully. You can now sign in.",
      });
      
      navigate("/signin");
    } catch (error: any) {
      console.error("SignUp error:", error);
      
      const errorMessage = error.message || "An error occurred during registration.";
      toast({
        title: "Registration Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <MainLayout>
      <div className="max-w-md mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Create Account</h1>
        <AuthForm 
          type="signup" 
          onSubmit={handleSignUp} 
          isProcessing={isLoading}
        />
      </div>
    </MainLayout>
  );
};

export default SignUpPage;
