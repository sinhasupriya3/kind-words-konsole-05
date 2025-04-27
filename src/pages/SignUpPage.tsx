
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import AuthForm from "@/components/auth/AuthForm";

const SignUpPage = () => {
  const navigate = useNavigate();
  
  const handleSignUp = async (email: string, password: string, name?: string) => {
    navigate("/signin");
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
