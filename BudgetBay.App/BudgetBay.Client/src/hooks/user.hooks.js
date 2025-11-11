import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getUserById,
    getUserAddress,
    getUserProducts,
    getUserBids,
    getWonAuctions,
    updateUserAddress,
    createUserAddress,
    uploadProfilePicture,
} from '../services/user.service';

// Define query keys in a structured way for better management
const userKeys = {
    all: ['users'],
    detail: (userId) => [...userKeys.all, 'detail', userId],
    address: (userId) => [...userKeys.detail(userId), 'address'],
    products: (userId) => [...userKeys.detail(userId), 'products'],
    bids: (userId) => [...userKeys.detail(userId), 'bids'],
    wonAuctions: (userId) => [...userKeys.detail(userId), 'wonAuctions'],
};


export const useUser = (userId) => {
    return useQuery({
        queryKey: userKeys.detail(userId),
        queryFn: () => getUserById(userId),
        enabled: !!userId,
    });
};

export const useUserAddress = (userId) => {
    return useQuery({
        queryKey: userKeys.address(userId),
        queryFn: () => getUserAddress(userId),
        enabled: !!userId,
        // The special retry logic is no longer needed because our service
        // function now handles the 404 case gracefully.
    });
};

export const useUserProducts = (userId) => {
    return useQuery({
        queryKey: userKeys.products(userId),
        queryFn: () => getUserProducts(userId),
        enabled: !!userId,
    });
};

export const useUserBids = (userId) => {
    return useQuery({
        queryKey: userKeys.bids(userId),
        queryFn: () => getUserBids(userId),
        enabled: !!userId,
    });
};

export const useWonAuctions = (userId) => {
    return useQuery({
        queryKey: userKeys.wonAuctions(userId),
        queryFn: () => getWonAuctions(userId),
        enabled: !!userId,
    });
};

export const useUpdateUserAddress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ userId, addressData }) => updateUserAddress(userId, addressData),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: userKeys.address(variables.userId) });
            queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.userId) }); // Also refetch user if address is nested
        },
    });
};

export const useCreateUserAddress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ userId, addressData }) => createUserAddress(userId, addressData),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: userKeys.address(variables.userId) });
            queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.userId) });
        },
    });
};

export const useUploadProfilePicture = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ userId, file }) => uploadProfilePicture(userId, file),
        onSuccess: (data, variables) => {
            // Refetch the main user data to get the new profile picture URL
            queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.userId) });
        },
    });
};