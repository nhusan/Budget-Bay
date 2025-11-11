import { useNavigate } from 'react-router-dom';

const CatalogItem = ({ Product }) => {
    const navigate = useNavigate();

    return (
        <article 
            onClick={() => navigate(`/products/${Product.id}`)}
            className="flex w-full bg-surface p-4 rounded-lg shadow-md h-40 gap-6 items-center border border-transparent hover:border-primary hover:shadow-lg transition-all duration-200 cursor-pointer"
        >
            <div className="w-36 h-full flex-shrink-0 bg-white rounded-md p-1">
                <img className="w-full h-full object-contain" src={Product.imageUrl} alt={Product.name} />
            </div>
            <div className="flex-grow flex flex-col text-left self-start py-2">
                <h3 className="text-xl font-bold text-text-base hover:underline">
                    {Product.name}
                </h3>
                <p className="mt-1 text-lg font-semibold text-primary">Current Bid: ${Product.currentPrice.toFixed(2)}</p>
                <div className="mt-2 text-sm">
                    <p className="text-text-muted line-clamp-2">
                        {Product.description}
                    </p>
                </div>
            </div>
        </article>
    );
};

export default CatalogItem;