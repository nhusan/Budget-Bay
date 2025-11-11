import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { 
    useUser, useUserAddress, useUserProducts, useUserBids, useWonAuctions, 
    useCreateUserAddress, useUpdateUserAddress, useUploadProfilePicture
} from '../../hooks/user.hooks';
import UserProfile from '../../components/dashboard/UserProfile';
import UserAddress from '../../components/dashboard/UserAddress';
import UserListings from '../../components/dashboard/UserListings';
import UserBids from '../../components/dashboard/UserBids';
import WonAuctions from '../../components/dashboard/WonAuctions';

const initialAddressState = {
    streetNumber: '', streetName: '', aptNumber: '', city: '', state: '', zipCode: '',
};

const DashboardPage = () => {
    const { user } = useAuth();
    const userId = user?.sub;

    const { data: userInfo, isLoading: isUserLoading, error: userError } = useUser(userId);
    const { data: userAddress, isLoading: isAddressLoading, error: addressFetchError } = useUserAddress(userId);
    const { data: products, isLoading: isProductsLoading, error: productsError } = useUserProducts(userId);
    const { data: bids, isLoading: isBidsLoading, error: bidsError } = useUserBids(userId);
    const { data: wonAuctions, isLoading: isWonAuctionsLoading, error: wonAuctionsError } = useWonAuctions(userId);

    const createAddressMutation = useCreateUserAddress();
    const updateAddressMutation = useUpdateUserAddress();
    const uploadPictureMutation = useUploadProfilePicture();

    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [addressForm, setAddressForm] = useState(initialAddressState);

    useEffect(() => {
        if (userAddress) setAddressForm(userAddress);
        else setAddressForm(initialAddressState);
    }, [userAddress]);

    const handleAddressChange = (e) => setAddressForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleAddressSubmit = (e) => {
        e.preventDefault();
        const mutation = userAddress ? updateAddressMutation : createAddressMutation;
        mutation.mutate({ userId, addressData: addressForm }, {
            onSuccess: () => setIsEditingAddress(false),
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

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (!file || !userId) return;
        uploadPictureMutation.mutate({ userId, file });
    };
    
    const isLoading = isUserLoading || isAddressLoading || isProductsLoading || isBidsLoading || isWonAuctionsLoading;
    const queryError = userError || addressFetchError || productsError || bidsError || wonAuctionsError;

    if (isLoading && !userInfo) return <main><div className="text-center p-10">Loading Dashboard...</div></main>
    if (queryError) return <main><div className="text-center p-10 text-destructive">Error: {queryError.message}</div></main>;
    
    const combinedUserInfo = userInfo ? { ...userInfo, address: userAddress } : null;
    const addressMutationError = createAddressMutation.error?.message || updateAddressMutation.error?.message;

    return (
        <main className="bg-background">
            <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
                <header className="text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-2">Welcome, {userInfo?.username || 'User'}!</h1>
                    <p className="text-lg text-muted-foreground">Manage your account, listings, and bids all in one place.</p>
                </header>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-1">
                        <UserProfile 
                            userInfo={combinedUserInfo}
                            onFileChange={handleProfilePictureChange}
                            isUploading={uploadPictureMutation.isPending}
                            uploadError={uploadPictureMutation.error?.message}
                        />
                    </div>
                    <div className="lg:col-span-2">
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
                </div>
                
                <UserListings listings={products || []} />
                <UserBids bids={bids || []} />
                <WonAuctions auctions={wonAuctions || []} />
            </div>
        </main>
    );
}

export default DashboardPage;