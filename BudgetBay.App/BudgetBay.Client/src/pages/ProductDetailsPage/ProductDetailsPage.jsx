import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useProduct, usePlaceBid } from '../../hooks/product.hooks';
import { useAuth } from '../../hooks/useAuth';
import ProductDetails from '../../components/product/ProductDetails';
import BidForm from '../../components/product/BidForm';
import AuctionInfo from '../../components/product/AuctionInfo';
import BidHistory from '../../components/product/BidHistory';
import styles from './ProductDetailsPage.module.css';

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
        return <div className={styles.centeredMessage}>Loading product details...</div>;
    }

    if (error) {
        return <div className={styles.centeredMessage}>Error: {error.message}</div>;
    }

    if (!product) {
        return <div className={styles.centeredMessage}>Product not found.</div>;
    }

    const isAuctionActive = new Date(product.endTime) > new Date();

    return (
        <main>
        <div className={styles.productDetailsContainer}>
            <div className={styles.layoutGrid}>
                <div className={styles.mainContent}>
                    <ProductDetails product={product} />
                </div>
                <div className={styles.sidebarContent}>
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