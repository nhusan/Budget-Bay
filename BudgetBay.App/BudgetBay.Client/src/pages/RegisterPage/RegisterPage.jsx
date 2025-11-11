import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRegister } from "../../hooks/auth.hooks";

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
            <div className="hidden lg:flex flex-1 bg-secondary"></div>
            <div className="flex-1 flex justify-center items-center bg-surface p-6">
                <div className="w-full max-w-sm text-center">
                    <h1 className="font-mono text-3xl font-bold tracking-widest text-text-base mb-2">
                        BUDGET BAY
                    </h1>
                    <p className="text-text-muted mb-8">Create your account to start bidding</p>
                    
                    <form className="w-full space-y-4" onSubmit={handleRegister}>
                        <input id="username" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required className="input-base" />
                        <input id="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-base" />
                        <input id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input-base" />
                        
                        {registerMutation.isError && <p className="text-error text-sm">{registerMutation.error.message || "Registration failed."}</p>}
                        {registerMutation.isSuccess && <p className="text-success text-sm">Registration successful! Redirecting to login...</p>}
                        
                        <button type="submit" className="btn-primary w-full" disabled={registerMutation.isPending || registerMutation.isSuccess}>
                            {registerMutation.isPending ? 'Registering...' : 'Sign Up'}
                        </button>
                    </form>

                    <p className="text-sm text-text-muted mt-6">
                        Already have an account? <Link to="/login" className="font-bold text-primary hover:underline">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;