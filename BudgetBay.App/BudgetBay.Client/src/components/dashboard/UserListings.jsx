import { Link } from 'react-router-dom';

const UserListings = ({ listings }) => {
    return (
        <section className="card-base">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4 pb-3 border-b border-border">
                <h2 className="text-2xl font-semibold text-text-base">My Products For Sale</h2>
                <Link to="/products/create" className="btn-primary">Add New Product</Link>
            </div>
            {listings.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {listings.map(product => (
                            <div key={product.id} className="bg-slate-50 border border-border rounded-lg p-5 flex flex-col justify-between">
                                <div>
                                    <Link to={`/products/${product.id}`} className="hover:text-primary">
                                        <h3 className="font-semibold text-text-base mb-1 hover:underline truncate">{product.name}</h3>
                                    </Link>
                                    <p className="text-text-muted text-sm"><strong>Current Price:</strong> ${product.currentPrice?.toFixed(2) ?? 'N/A'}</p>
                                    <p className="text-text-muted text-sm"><strong>End Time:</strong> {new Date(product.endTime).toLocaleString()}</p>
                                </div>
                                <div className="mt-4 pt-4 border-t border-border flex justify-end">
                                    <Link to={`/products/edit/${product.id}`} className="bg-slate-200 text-slate-700 font-semibold py-1 px-3 rounded-md text-sm transition-colors hover:bg-slate-300">
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
            ) : (
                <p className="text-center text-text-muted py-8">You have not listed any products yet.</p>
            )}
        </section>
    );
};

export default UserListings;