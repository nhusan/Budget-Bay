import { api } from '../lib/api';

/**
 * Fetches a user's public profile by their ID.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Object>} The user's data.
 */
export const getUserById = (userId) => api.get(`/Users/${userId}`).then(res => res.data);

/**
 * Fetches a user's address.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Object|null>} The user's address data, or null if not found.
 */
export const getUserAddress = async (userId) => {
    try {
        const response = await api.get(`/Users/${userId}/address`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return null; // Treat 404 as "no address" and return null
        }
        throw error; // Re-throw any other errors
    }
};

/**
 * Fetches all products listed by a specific user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array>} A list of the user's products.
 */
export const getUserProducts = (userId) => api.get(`/Users/${userId}/products`).then(res => res.data);

/**
 * Fetches all bids placed by a specific user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array>} A list of the user's bids.
 */
export const getUserBids = (userId) => api.get(`/Users/${userId}/bids`).then(res => res.data);

/**
 * Fetches all auctions won by a specific user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array>} A list of won auctions.
 */
export const getWonAuctions = (userId) => api.get(`/Users/${userId}/won-auctions`).then(res => res.data);

/**
 * Updates a user's address.
 * @param {string} userId - The ID of the user.
 * @param {Object} addressData - The new address data.
 * @returns {Promise<Object>} The server response.
 */
export const updateUserAddress = (userId, addressData) => api.put(`/Users/${userId}/address`, addressData);

/**
 * Creates an address for a user.
 * @param {string} userId - The ID of the user.
 * @param {Object} addressData - The address data.
 * @returns {Promise<Object>} The server response.
 */
export const createUserAddress = (userId, addressData) => api.post(`/Users/${userId}/address`, addressData);

/**
 * Uploads a profile picture for a user.
 * @param {string} userId - The ID of the user.
 * @param {File} file - The image file to upload.
 * @returns {Promise<Object>} The server response.
 */
export const uploadProfilePicture = (userId, file) => {
    const formData = new FormData();
    formData.append('File', file);
    formData.append('UserId', userId);
    // Override content-type for multipart form data
    return api.post('/Profile/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};