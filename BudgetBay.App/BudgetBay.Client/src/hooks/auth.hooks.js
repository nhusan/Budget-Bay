import { useMutation } from '@tanstack/react-query';
import { registerRequest, loginRequest } from '../services/auth.service'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

/**
 * Hook for handling user login.
 */
export const useLogin = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); // Get the login function from our context

    return useMutation({
        mutationFn: ({ email, password }) => loginRequest(email, password),
        onSuccess: (token) => {
            // On successful API call, update the global state via the context
            login(token);
            // And navigate the user away
            navigate('/');
        },
        onError: (error) => {
            console.error("Login failed:", error);
            // The component will have access to this error object
        }
    });
};

/**
 * A hook for handling user registration.
 * Provides `mutate` function to trigger registration.
 * Handles success (with navigation) and error states.
 */
export const useRegister = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ username, email, password }) => registerRequest(username, email, password),
        onSuccess: () => {
            // You can add logic here, e.g., showing a success toast.
            // The component itself will handle the redirect.
            console.log("Registration successful!");
        },
        onError: (error) => {
            // The component's `onError` callback will receive this error.
            console.error("Registration failed:", error);
        }
    });
};