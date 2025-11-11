import axios from 'axios';
import { BASE_URL } from '../lib/api';

// --- Auth Functions (Don't need the interceptor, use axios directly) ---

/**
 * Sends a login request to the API.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<string>} The JWT token.
 */
export const loginRequest = async (email, password) => {
    // We use axios directly here because the api instance is for authenticated requests
    const response = await axios.post(`${BASE_URL}/Auth/login`, { email, password });
    // For login, the API returns the token directly in the body (as text)
    return response.data;
};

/**
 * Sends a registration request to the API.
 * @param {string} username - The desired username.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<boolean>} True on success.
 */
export const registerRequest = async (username, email, password) => {
    await axios.post(`${BASE_URL}/Auth/register`, { username, email, password });
    return true;
};