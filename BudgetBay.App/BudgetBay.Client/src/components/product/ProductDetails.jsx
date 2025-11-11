const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
};

const ProductDetails = ({ product }) => {
    return (
        <section className="card-base">
            <div className="flex flex-col gap-10">
                <div className="flex justify-center items-center bg-slate-50 rounded-lg overflow-hidden border border-border aspect-[5/4]">
                    <img className="max-w-full max-h-[500px] object-cover" src={product.imageUrl || 'https://via.placeholder.com/500'} alt={product.name} />
                </div>

                <div>
                    <h1 className="text-4xl font-bold text-text-base mb-4">{product.name}</h1>
                    <p className="text-base text-text-muted leading-relaxed mb-6">{product.description}</p>

                    <div className="grid grid-cols-2 gap-5 border-t border-border pt-5">
                        <div>
                            <span className="block text-sm text-text-muted font-medium mb-1">Auction Start</span>
                            <p className="text-lg text-text-base">{formatDate(product.startTime)}</p>
                        </div>
                        <div>
                            <span className="block text-sm text-text-muted font-medium mb-1">Auction End</span>
                            <p className="text-lg text-text-base">{formatDate(product.endTime)}</p>
                        </div>
                        <div>
                            <span className="block text-sm text-text-muted font-medium mb-1">Starting Price</span>
                            <p className="text-lg text-text-base">${product.startingPrice.toFixed(2)}</p>
                        </div>
                        <div>
                            <span className="block text-sm text-text-muted font-medium mb-1">Seller</span>
                            <p className="text-lg text-text-base">{product.seller?.username || 'N/A'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;