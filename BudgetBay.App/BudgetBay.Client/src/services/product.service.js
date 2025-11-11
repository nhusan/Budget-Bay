import { api } from '../lib/api';

// The `.then(res => res.data)` is to extract the data payload from the axios response.
// React Query will handle catching errors automatically if you use it,
// otherwise, use try/catch blocks where you call these functions.

/**
 * Fetches all products.
 * @returns {Promise<Array>} A list of all products.
 */
export const getAllProducts = () => api.get('/Products').then(res => res.data);

/**
 * Fetches a single product by its ID.
 * @param {string} productId - The ID of the product.
 * @returns {Promise<Object>} The product data.
 */
export const getProductById = (productId) => api.get(`/Products/${productId}`).then(res => res.data);

/**
 * Creates a new product. The auth token is sent via interceptor.
 * @param {Object} productData - The data for the new product.
 * @returns {Promise<Object>} The server response.
 */
export const createProduct = (productData) => api.post('/Products', productData);

/**
 * Updates an existing product. The auth token is sent via interceptor.
 * @param {string} productId - The ID of the product to update.
 * @param {Object} productData - The updated product data.
 * @returns {Promise<Object>} The server response.
 */
export const updateProduct = (productId, productData) => api.put(`/Products/${productId}`, productData);

/**
 * Places a bid on a product. The auth token is sent via interceptor.
 * @param {string} productId - The ID of the product to bid on.
 * @param {Object} bidData - The bid data (e.g., { amount, bidderId }).
 * @returns {Promise<Object>} The server response.
 */
export const placeBid = (productId, bidData) => api.post(`/Products/${productId}/bids`, bidData);