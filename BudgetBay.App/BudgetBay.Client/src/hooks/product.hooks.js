import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    placeBid
} from '../services/product.service';
import { useAuth } from './useAuth'; // <-- 1. Import useAuth

const productKeys = {
    all: ['products'],
    detail: (id) => [...productKeys.all, 'detail', id],
};

/**
 * Hook to fetch all products.
 * @returns {QueryResult} The result of the query for all products.
 */
export const useProducts = () => {
    return useQuery({
        queryKey: productKeys.all,
        queryFn: getAllProducts,
    });
};

/**
 * Hook to fetch a single product by its ID.
 * @param {string} productId - The ID of the product to fetch.
 * @returns {QueryResult} The result of the query for a single product.
 */
export const useProduct = (productId) => {
    return useQuery({
        queryKey: productKeys.detail(productId),
        queryFn: () => getProductById(productId),
        enabled: !!productId, // The query will not run until the productId exists
    });
};

/**
 * Hook to create a new product.
 * Invalidates the main product list on success to refetch.
 * @returns {MutationResult} The result of the mutation for creating a product.
 */
export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            // Invalidate and refetch the 'products' query
            queryClient.invalidateQueries({ queryKey: productKeys.all });
        },
    });
};

/**
 * Hook to update an existing product.
 * Invalidates the specific product's detail query and the main list on success.
 * @returns {MutationResult} The result of the mutation for updating a product.
 */
export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ productId, data }) => updateProduct(productId, data),
        onSuccess: (data, variables) => {
            // Invalidate the specific product query
            queryClient.invalidateQueries({ queryKey: productKeys.detail(variables.productId) });
            // Optionally, invalidate the whole list if needed
            queryClient.invalidateQueries({ queryKey: productKeys.all });
        },
    });
};

/**
 * Hook to place a bid on a product.
 * Invalidates the product's detail query on success to show the new bid.
 * @returns {MutationResult} The result of the mutation for placing a bid.
 */
export const usePlaceBid = () => {
    const queryClient = useQueryClient();
    const { user } = useAuth(); // <-- 2. Get the current user from the auth context

    return useMutation({
        mutationFn: ({ productId, bidData }) => placeBid(productId, bidData),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: productKeys.detail(variables.productId) })
            if (user?.sub) {
                queryClient.invalidateQueries({ queryKey: ['users', 'detail', user.sub, 'bids'] });
            }
        },
    });
};