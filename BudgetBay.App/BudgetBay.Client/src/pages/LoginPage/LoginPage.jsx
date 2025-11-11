import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useLogin } from "../../hooks/auth.hooks";

// Import shadcn/ui components
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { token } = useAuth();
    const loginMutation = useLogin();

    if (token) {
        return <Navigate to="/" replace />;
    }

    const handleLogin = (e) => {
        e.preventDefault();
        loginMutation.mutate({ email, password });
    };

    return (
        <div className="flex w-screen h-screen">
            <div className="hidden lg:flex flex-1 bg-muted"></div>

            <div className="flex-1 flex justify-center items-center p-6">
                <Card className="w-full max-w-sm">
                    <CardHeader className="text-center">
                        <CardTitle className="font-mono text-3xl font-bold tracking-widest">BUDGET BAY</CardTitle>
                        <CardDescription>Login to start bidding</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleLogin}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2 text-left">
                                <Label htmlFor="email">Email</Label>
                                <Input 
                                    id="email" 
                                    type="email" 
                                    placeholder="your@email.com"
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={loginMutation.isPending}
                                />
                            </div>
                            <div className="space-y-2 text-left">
                                <Label htmlFor="password">Password</Label>
                                <Input 
                                    id="password" 
                                    type="password" 
                                    placeholder="********"
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={loginMutation.isPending}
                                />
                            </div>
                            {loginMutation.isError && (
                                <p className="text-sm text-destructive">
                                    {loginMutation.error.message || "Login failed. Please check your credentials."}
                                </p>
                            )}
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                             <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
                                {loginMutation.isPending ? 'Logging in...' : 'Login'}
                            </Button>
                            <p className="text-sm text-muted-foreground">
                                Click Here to <Link to="/signup" className="font-bold text-primary hover:underline">Sign Up</Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;