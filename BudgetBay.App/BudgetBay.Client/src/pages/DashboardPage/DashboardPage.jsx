import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { 
    useUser, 
    useUserAddress, 
    useUserProducts, 
    useUserBids, 
    useWonAuctions, 
    useCreateUserAddress,
    useUpdateUserAddress,
    useUploadProfilePicture
} from '../../hooks/user.hooks';
import styles from './DashboardPage.module.css';

import UserProfile from '../../components/dashboard/UserProfile';
import UserAddress from '../../components/dashboard/UserAddress';
import UserListings from '../../components/dashboard/UserListings';
import UserBids from '../../components/dashboard/UserBids';
import WonAuctions from '../../components/dashboard/WonAuctions';


const initialAddressState = {
    streetNumber: '',
    streetName: '',
    aptNumber: '',
    city: '',
    state: '',
    zipCode: '',
};

const DashboardPage = () => {
    const { user } = useAuth(); // <-- CORRECTED: Call the hook with ()
    const userId = user?.sub;

    // --- React Query Hooks for Data Fetching ---
    const { data: userInfo, isLoading: isUserLoading, error: userError } = useUser(userId);
    const { data: userAddress, isLoading: isAddressLoading, error: addressFetchError } = useUserAddress(userId);
    const { data: products, isLoading: isProductsLoading, error: productsError } = useUserProducts(userId);
    const { data: bids, isLoading: isBidsLoading, error: bidsError } = useUserBids(userId);
    const { data: wonAuctions, isLoading: isWonAuctionsLoading, error: wonAuctionsError } = useWonAuctions(userId);

    // --- React Query Hooks for Mutations ---
    const createAddressMutation = useCreateUserAddress();
    const updateAddressMutation = useUpdateUserAddress();
    const uploadPictureMutation = useUploadProfilePicture();

    // --- Local State for UI Control ---
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [addressForm, setAddressForm] = useState(initialAddressState);

    // Effect to populate the address form when data is fetched
    useEffect(() => {
        if (userAddress) {
            setAddressForm(userAddress);
        } else {
            // If there's no address, reset to initial state
            setAddressForm(initialAddressState);
        }
    }, [userAddress]);

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddressForm(prev => ({ ...prev, [name]: value }));
    };

    const handleAddressSubmit = async (e) => {
        e.preventDefault();
        const mutation = userAddress ? updateAddressMutation : createAddressMutation;
        mutation.mutate({ userId, addressData: addressForm }, {
            onSuccess: () => {
                setIsEditingAddress(false);
            },
        });
    };

    const handleEditAddress = () => {
        setAddressForm(userAddress || initialAddressState);
        setIsEditingAddress(true);
    };

    const handleCancelEdit = () => {
        setIsEditingAddress(false);
        createAddressMutation.reset();
        updateAddressMutation.reset();
    };

    const handleProfilePictureChange = async (e) => {
        const file = e.target.files[0];
        if (!file || !userId) return;
        uploadPictureMutation.mutate({ userId, file });
    };
    
    // --- Aggregated Loading and Error States ---
    const isLoading = isUserLoading || isAddressLoading || isProductsLoading || isBidsLoading || isWonAuctionsLoading;
    // Simplified error check, as 404s are no longer treated as errors for the address hook.
    const queryError = userError || addressFetchError || productsError || bidsError || wonAuctionsError;

    if (isLoading && !userInfo) { // Show loading skeleton only on initial load
        return <main><div className={styles.messageContainer}>Loading Dashboard...</div></main>
    } 

    if (queryError) {
        return <main><div className={styles.messageContainer}>Error: {queryError.message}</div></main>;
    }
    
    const combinedUserInfo = userInfo ? { ...userInfo, address: userAddress } : null;
    const addressMutationError = createAddressMutation.error?.message || updateAddressMutation.error?.message;

    return (
        <main>
        <div className={styles.dashboardContainer}>
            <header className={styles.dashboardHeader}>
                <h1 className={styles.welcomeMessage}>Welcome, {userInfo?.username || 'User'}!</h1>
                <p>Manage your account, listings, and bids all in one place.</p>
            </header>

            <div className={styles.topGrid}>
                <UserProfile 
                    userInfo={combinedUserInfo}
                    onFileChange={handleProfilePictureChange}
                    isUploading={uploadPictureMutation.isPending}
                    uploadError={uploadPictureMutation.error?.message}
                />
                <UserAddress 
                    userInfo={combinedUserInfo}
                    isEditing={isEditingAddress}
                    addressForm={addressForm}
                    error={addressMutationError}
                    onEdit={handleEditAddress}
                    onCancel={handleCancelEdit}
                    onChange={handleAddressChange}
                    onSubmit={handleAddressSubmit}
                />
            </div>

            <UserListings listings={products || []} />
            <UserBids bids={bids || []} />
            <WonAuctions auctions={wonAuctions || []} />
        </div>
        </main>
    );
}

export default DashboardPage;