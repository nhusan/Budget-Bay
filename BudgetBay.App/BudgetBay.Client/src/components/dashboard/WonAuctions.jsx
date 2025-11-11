import { Link } from 'react-router-dom';

const WonAuctions = ({ auctions }) => {
    return (
        <section className="card-base">
            <h2 className="text-2xl font-semibold text-text-base mb-4 pb-3 border-b border-border">Auctions Won</h2>
            {auctions.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {auctions.map((auction, index) => (
                        <Link to={`/products/${auction.productId}`} key={`${auction.productId}-${index}`} className="block bg-slate-50 border border-border rounded-lg p-5 transition-all hover:border-primary hover:shadow-md">
                            <h3 className="font-semibold text-text-base mb-1 truncate">Won Auction for Product ID: {auction.productId}</h3>
                            <p className="text-text-muted"><strong>Winning Bid:</strong> ${auction.amount.toFixed(2)}</p>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="text-center text-text-muted py-8">You have not won any auctions yet.</p>
            )}
        </section>
    );
};

export default WonAuctions;