
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Lock } from "lucide-react";

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
  if (!isLoggedIn) {
    return (
      <Card className="max-w-md mx-auto my-12 card-gradient">
        <CardContent className="pt-6 text-center">
          <div className="bg-primary/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Authentication Required</h3>
          <p className="text-muted-foreground mb-6">
            You need to sign in to view tickets on sale and access exclusive content.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Link to="/signin">
            <Button>Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button variant="outline">Create Account</Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }
  
  return <>{children}</>;
};

export default RequireAuth;
