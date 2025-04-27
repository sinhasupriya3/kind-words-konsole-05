
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import AuthForm from "@/components/auth/AuthForm";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const SignInPage = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSignIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await signIn(email, password);
      
      // Store login status in localStorage for app-wide access
      localStorage.setItem("isLoggedIn", "true");
      
      // Trigger a storage event for other components to detect the change
      window.dispatchEvent(new Event('storage'));
      
      navigate("/dashboard");
    } catch (error: any) {
      console.error("SignIn error:", error);
      
      // Provide more specific error messages based on error codes
      const errorMessage = error.code === 'invalid_credentials' 
        ? "Invalid email or password. Please check your credentials and try again."
        : error.code === 'email_not_confirmed'
        ? "Please confirm your email address before signing in."
        : error.message || "An error occurred during sign in.";
      
      toast({
        title: "Authentication Error",
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
        <h1 className="text-3xl font-bold text-center mb-8">Sign In</h1>
        <AuthForm 
          type="signin" 
          onSubmit={handleSignIn}
          isProcessing={isLoading} 
        />
      </div>
    </MainLayout>
  );
};

export default SignInPage;
