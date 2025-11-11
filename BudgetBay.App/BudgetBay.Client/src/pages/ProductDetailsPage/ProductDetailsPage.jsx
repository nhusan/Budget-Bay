import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useProduct, usePlaceBid } from '../../hooks/product.hooks';
import { useAuth } from '../../hooks/useAuth';
import ProductDetails from '../../components/product/ProductDetails';
import BidForm from '../../components/product/BidForm';
import AuctionInfo from '../../components/product/AuctionInfo';
import BidHistory from '../../components/product/BidHistory';

const ProductDetailsPage = () => {
    const { productId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    const [bidAmount, setBidAmount] = useState('');

    const { data: product, isLoading, error } = useProduct(productId);
    const placeBidMutation = usePlaceBid();

    const handleBidSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            navigate('/login', { state: { from: location } });
            return;
        }

        const bidValue = parseFloat(bidAmount);
        if (isNaN(bidValue) || bidValue <= product.currentPrice) {
            placeBidMutation.reset(); // Clear previous errors if any
            // Manually set an error for frontend validation
            placeBidMutation.mutate(null, { 
                onError: () => {} // Suppress console error for this specific case
            });
             // A bit of a hack to set error state on the mutation without sending a request
            placeBidMutation.error = new Error(`Your bid must be higher than $${product.currentPrice.toFixed(2)}.`);
            return;
        }

        const bidData = {
            amount: bidValue,
            bidderId: user.sub,
        };
        
        placeBidMutation.mutate({ productId, bidData }, {
            onSuccess: () => {
                setBidAmount(''); // Clear input on success
            },
        });
    };

    const sortedBids = useMemo(() => {
        if (!product?.bids) return [];
        // Create a new array to avoid mutating the cached data
        return [...product.bids].sort((a, b) => b.amount - a.amount);
    }, [product?.bids]);


    if (isLoading) {
        return <main className="text-center text-lg text-muted-foreground py-16">Loading product details...</main>;
    }

    if (error) {
        return <main className="text-center text-lg text-destructive py-16">Error: {error.message}</main>;
    }

    if (!product) {
        return <main className="text-center text-lg text-muted-foreground py-16">Product not found.</main>;
    }

    const isAuctionActive = new Date(product.endTime) > new Date();

    return (
        <main className="py-8">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div className="flex flex-col gap-8">
                        <ProductDetails product={product} />
                    </div>
                    <div className="flex flex-col gap-8">
                        <AuctionInfo product={product} isAuctionActive={isAuctionActive} />
                        <BidForm 
                            product={product} 
                            isAuctionActive={isAuctionActive} 
                            onSubmit={handleBidSubmit} 
                            error={placeBidMutation.error?.message}
                            bidAmount={bidAmount}
                            onBidChange={(e) => setBidAmount(e.target.value)}
                            isBidding={placeBidMutation.isPending}
                            isLoggedIn={!!user}
                        />
                        <BidHistory bidsList={sortedBids} />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductDetailsPage;