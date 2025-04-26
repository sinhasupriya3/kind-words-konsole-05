
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import AuthForm from "@/components/auth/AuthForm";
import { toast } from "@/hooks/use-toast";

const SignInPage = () => {
  const navigate = useNavigate();
  
  const handleSignIn = async (email: string, password: string) => {
    // This will be replaced with actual authentication logic
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Log the sign-in attempt (will be replaced with API call)
      console.log("Sign in attempt:", { email, password });
      
      // Set authentication state in localStorage
      localStorage.setItem("isLoggedIn", "true");
      
      // Show success message
      toast({
        title: "Sign In Successful",
        description: "Welcome back! You have successfully signed in.",
      });
      
      // Redirect to dashboard
      navigate("/dashboard");
      
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };
  
  return (
    <MainLayout>
      <div className="max-w-md mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Sign In</h1>
        <AuthForm type="signin" onSubmit={handleSignIn} />
      </div>
    </MainLayout>
  );
};

export default SignInPage;
