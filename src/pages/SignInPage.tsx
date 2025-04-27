
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import AuthForm from "@/components/auth/AuthForm";

const SignInPage = () => {
  const navigate = useNavigate();
  
  const handleSignIn = async (email: string, password: string) => {
    navigate("/dashboard");
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
