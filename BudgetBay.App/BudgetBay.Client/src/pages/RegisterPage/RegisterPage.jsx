import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRegister } from "../../hooks/auth.hooks";

// Import shadcn/ui components
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";


const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const registerMutation = useRegister();

    const handleRegister = (e) => {
        e.preventDefault();
        registerMutation.mutate({ username, email, password }, {
            onSuccess: () => setTimeout(() => navigate("/login"), 2000),
        });
    };

    return (
        <div className="flex min-h-screen">
            <div className="hidden lg:flex flex-1 bg-muted"></div>
            <div className="flex-1 flex justify-center items-center p-6">
                <Card className="w-full max-w-sm">
                    <CardHeader className="text-center">
                        <CardTitle className="font-mono text-3xl font-bold tracking-widest">BUDGET BAY</CardTitle>
                        <CardDescription>Create your account to start bidding</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleRegister}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2 text-left">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" type="text" placeholder="Your username" value={username} onChange={(e) => setUsername(e.target.value)} required disabled={registerMutation.isPending} />
                            </div>
                            <div className="space-y-2 text-left">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={registerMutation.isPending} />
                            </div>
                            <div className="space-y-2 text-left">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={registerMutation.isPending} />
                            </div>
                            
                            {registerMutation.isError && <p className="text-sm text-destructive">{registerMutation.error.message || "Registration failed."}</p>}
                            {registerMutation.isSuccess && <p className="text-sm text-success">Registration successful! Redirecting to login...</p>}
                        </CardContent>

                        <CardFooter className="flex flex-col gap-4">
                            <Button type="submit" className="w-full" disabled={registerMutation.isPending || registerMutation.isSuccess}>
                                {registerMutation.isPending ? 'Registering...' : 'Sign Up'}
                            </Button>
                            <p className="text-sm text-muted-foreground">
                                Already have an account? <Link to="/login" className="font-bold text-primary hover:underline">Login</Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default RegisterPage;