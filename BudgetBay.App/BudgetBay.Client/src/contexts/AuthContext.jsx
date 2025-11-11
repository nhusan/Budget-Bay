import { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
// No longer importing loginRequest here as it's handled by useLogin hook
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Loading state is now managed by the useLogin hook via React Query
    const [token, setToken] = useLocalStorage('authToken', null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                
                // Check if token is expired
                const currentTime = Date.now() / 1000; // Convert to seconds
                if (decodedUser.exp && decodedUser.exp < currentTime) {
                    console.warn("Token is expired, clearing authentication");
                    setToken(null);
                    setUser(null);
                    return;
                }
                
                setUser(decodedUser);
            } catch (error) {
                console.error("Failed to decode token:", error);
                setToken(null); 
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }, [token, setToken]);


    // The login function now simply accepts the token from the useLogin hook
    // and sets it in the state. It is no longer responsible for the API call.
    const login = useCallback((receivedToken) => {
        setToken(receivedToken);
    }, [setToken]);

    const logout = useCallback(() => {
        setToken(null); // This will also trigger the useEffect
    }, [setToken]); // Dependency: setToken

    // Utility function to check if token is expired
    const isTokenExpired = useCallback((token) => {
        if (!token) return true;
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decodedToken.exp && decodedToken.exp < currentTime;
        } catch (error) {
            return true;
        }
    }, []);

    // The context value no longer needs to provide a loading state.
    const value = useMemo(() => ({
        token,
        user,
        login,
        logout,
        isTokenExpired
    }), [token, user, login, logout, isTokenExpired]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};