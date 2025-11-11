import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useLogin } from "../../hooks/auth.hooks"; // <-- Import the new hook
import styles from './LoginPage.module.css';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { token } = useAuth(); // We still need the token to check if user is already logged in

    // Initialize the useLogin mutation hook
    const loginMutation = useLogin();

    // If a user with a token lands here, redirect them
    if (token) {
        return <Navigate to="/" replace />;
    }

    // The handler now triggers the mutation
    const handleLogin = (e) => {
        e.preventDefault();
        loginMutation.mutate({ email, password });
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.leftPanel}></div>

            <div className={styles.rightPanel}>
                <div className={styles.loginContent}>
                    <h1>BUDGET BAY</h1>
                    <p className={styles.subtitle}>Login to start bidding</p>
                    
                    <form className={styles.loginForm} onSubmit={handleLogin}>
                        <div className={styles.formGroup}>
                            <input 
                                id="email" 
                                type="email" 
                                placeholder="Email"
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <input 
                                id="password" 
                                type="password" 
                                placeholder="Password"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        
                        {/* Display error message from the mutation hook */}
                        {loginMutation.isError && (
                            <p className={styles.errorMessage}>
                                {loginMutation.error.message || "Login failed. Please check your credentials."}
                            </p>
                        )}
                        
                        {/* Use the mutation's pending state for the button */}
                        <button type="submit" className={styles.loginButton} disabled={loginMutation.isPending}>
                            {loginMutation.isPending ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <p className={styles.signupLink}>
                        Click Here to <Link to="/signup">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;