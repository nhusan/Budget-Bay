import { Link } from 'react-router-dom';

const UserBids = ({ bids }) => {
    return (
        <section className="card-base">
            <h2 className="text-2xl font-semibold text-text-base mb-4 pb-3 border-b border-border">My Bids</h2>
            {bids.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bids.map((bid, index) => (
                        <Link key={`${bid.productId}-${index}`} to={`/products/${bid.productId}`} className="block bg-slate-50 border border-border rounded-lg p-5 transition-all hover:border-primary hover:shadow-md">
                            <h3 className="font-semibold text-text-base mb-1 truncate">Bid on Product ID: {bid.productId}</h3>
                            <p className="text-text-muted"><strong>Amount:</strong> ${bid.amount.toFixed(2)}</p>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="text-center text-text-muted py-8">You have not placed any bids.</p>
            )}
        </section>
    );
};

export default UserBids;