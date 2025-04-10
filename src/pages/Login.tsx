
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { login, isLoading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Demo login functions
  const loginAsAdmin = async () => {
    try {
      await login("admin@livo.com", "password");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Could not log in as Admin. Please try again.",
        variant: "destructive",
      });
    }
  };

  const loginAsManager = async () => {
    try {
      await login("manager@livo.com", "password");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Could not log in as Manager. Please try again.",
        variant: "destructive",
      });
    }
  };

  const loginAsMember = async () => {
    try {
      await login("member@livo.com", "password");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Could not log in as Member. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-4 p-6 rounded-xl border bg-card shadow-sm">
        <div className="flex items-center justify-center gap-2 pb-2 pt-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-livo-600">
            <span className="text-xl font-bold text-white">L</span>
          </div>
          <span className="text-2xl font-bold">Livo</span>
        </div>
        
        <h1 className="text-center text-2xl font-semibold">Sign in to your account</h1>
        <p className="text-center text-sm text-muted-foreground">
          Enter your email below to sign in to your account
        </p>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="demo">Demo Accounts</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button variant="link" className="h-auto p-0 text-xs">
                    Forgot password?
                  </Button>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-livo-600 hover:bg-livo-700"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="demo">
            <div className="space-y-4 py-2">
              <div className="text-sm text-muted-foreground">
                Click a role to try a demo account:
              </div>
              <Button
                onClick={loginAsAdmin}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Login as Admin"}
              </Button>
              <Button
                onClick={loginAsManager}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Login as Manager"}
              </Button>
              <Button
                onClick={loginAsMember}
                className="w-full bg-amber-600 hover:bg-amber-700"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Login as Member"}
              </Button>
              <div className="text-xs text-center text-muted-foreground mt-4">
                Demo accounts use password: "password"
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
