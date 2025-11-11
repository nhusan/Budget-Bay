import axios from 'axios';
import { BASE_URL } from './api';

/**
 * Checks if the backend server is responsive with retries and a timeout.
 * @param {function(number): void} [onAttempt] - Optional callback that receives the current attempt number.
 * @returns {Promise<boolean>} - True if the backend is online, false otherwise.
 */
export const checkBackendStatus = async (onAttempt = () => {}) => {
  const retries = 3;
  const timeout = 10000; // 10 seconds

  for (let i = 0; i < retries; i++) {
    onAttempt(i + 1); // <-- Report the current attempt number
    try {
      // Use a dedicated '/health' endpoint if available, otherwise any fast endpoint works.
      await axios.get(`${BASE_URL}/health`, { timeout });
      console.log('Backend health check successful. Server is online.');
      return true; // Success
    } catch (error) {
      console.warn(`Backend check attempt ${i + 1} of ${retries} failed.`);
      if (i < retries - 1) {
        // Wait 1 second before retrying
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  console.error('Backend is offline after all attempts.');
  return false; // All retries failed
};