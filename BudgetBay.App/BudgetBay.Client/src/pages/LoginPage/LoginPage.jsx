import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useLogin } from "../../hooks/auth.hooks";
// No need to import LoginPage.module.css anymore!

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
            <div className="hidden lg:flex flex-1 bg-secondary"></div>

            <div className="flex-1 flex justify-center items-center bg-surface p-6">
                <div className="w-full max-w-sm text-center">
                    <h1 className="font-mono text-3xl font-bold tracking-widest text-text-base mb-2">
                        BUDGET BAY
                    </h1>
                    <p className="text-text-muted mb-8">Login to start bidding</p>
                    
                    <form className="w-full" onSubmit={handleLogin}>
                        <div className="mb-4">
                            <input 
                                id="email" 
                                type="email" 
                                placeholder="Email"
                                className="input-base"
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <input 
                                id="password" 
                                type="password" 
                                placeholder="Password"
                                className="input-base"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        
                        {loginMutation.isError && (
                            <p className="text-error text-sm mb-4">
                                {loginMutation.error.message || "Login failed. Please check your credentials."}
                            </p>
                        )}
                        
                        <button type="submit" className="btn-primary w-full" disabled={loginMutation.isPending}>
                            {loginMutation.isPending ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <p className="text-sm text-text-muted mt-6">
                        Click Here to <Link to="/signup" className="font-bold text-primary hover:underline">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;