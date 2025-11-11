import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRegister } from "../../hooks/auth.hooks";
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const registerMutation = useRegister();

    const handleRegister = async (e) => {
        e.preventDefault();
        registerMutation.mutate({ username, email, password }, {
            onSuccess: () => {
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }
        });
    };

    return (
        <div className={styles.registerContainer}>
            <div className={styles.leftPanel}></div>

            <div className={styles.rightPanel}>
                <div className={styles.registerContent}>
                    <h1>BUDGET BAY</h1>
                    <p className={styles.subtitle}>Create your account to start bidding</p>
                    
                    <form className={styles.registerForm} onSubmit={handleRegister}>
                        <div className={styles.formGroup}>
                            <input 
                                id="username" 
                                type="text" 
                                placeholder="Username"
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
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
                        
                        {registerMutation.isError && <p className={styles.errorMessage}>{registerMutation.error.message || "Registration failed."}</p>}
                        {registerMutation.isSuccess && <p className={styles.successMessage}>Registration successful! Redirecting to login...</p>}
                        
                        <button type="submit" className={styles.registerButton} disabled={registerMutation.isPending || registerMutation.isSuccess}>
                            {registerMutation.isPending ? 'Registering...' : 'Sign Up'}
                        </button>
                    </form>

                    <p className={styles.loginLink}>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;