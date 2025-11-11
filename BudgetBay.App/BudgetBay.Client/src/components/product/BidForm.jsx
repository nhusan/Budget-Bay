const BidForm = ({ 
    product, 
    isAuctionActive, 
    error, 
    onSubmit,
    bidAmount,
    onBidChange,
    isBidding,
    isLoggedIn
}) => {

    return (
        <section className="card-base">
            {isAuctionActive ? (
                <form onSubmit={onSubmit}>
                    <div className="flex gap-4 items-stretch">
                        <div className="relative flex-grow">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-text-muted">$</span>
                            <input
                                type="number"
                                className="input-base h-full text-lg font-semibold pl-8"
                                value={bidAmount}
                                onChange={onBidChange}
                                placeholder={`Min bid $${(product.currentPrice + 0.01).toFixed(2)}`}
                                step="0.01"
                                min={product.currentPrice + 0.01}
                                required
                                disabled={!isLoggedIn || isBidding}
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="btn-primary px-8 text-base"
                            disabled={isBidding || !isLoggedIn || !bidAmount}
                        >
                            {isBidding 
                                ? 'Placing Bid...' 
                                : isLoggedIn ? 'Place Bid' : 'Login to Bid'
                            }
                        </button>
                    </div>
                </form>
            ) : (
                <div className="bg-error/10 text-error rounded-lg p-4 text-center font-medium">
                    This auction has ended.
                </div>
            )}
            {error && <p className="text-error mt-2 text-center w-full">{error}</p>}
        </section>
    );
}

export default BidForm;