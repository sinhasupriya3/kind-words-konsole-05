
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import AuthForm from "@/components/auth/AuthForm";
import { toast } from "@/hooks/use-toast";

const SignUpPage = () => {
  const navigate = useNavigate();
  
  const handleSignUp = async (email: string, password: string, name?: string) => {
    // This will be replaced with actual registration logic
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Log the sign-up attempt (will be replaced with API call)
      console.log("Sign up attempt:", { email, password, name });
      
      // Show success message
      toast({
        title: "Account Created",
        description: "Your account has been created successfully. Please sign in.",
      });
      
      // Redirect to sign in
      navigate("/signin");
      
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };
  
  return (
    <MainLayout>
      <div className="max-w-md mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Create Account</h1>
        <AuthForm type="signup" onSubmit={handleSignUp} />
      </div>
    </MainLayout>
  );
};

export default SignUpPage;
