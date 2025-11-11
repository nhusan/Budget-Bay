import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card'; // <-- Import Card

const CatalogItem = ({ Product }) => {
    const navigate = useNavigate();

    return (
        <Card 
            onClick={() => navigate(`/products/${Product.id}`)}
            className="flex w-full p-4 h-40 gap-6 items-center transition-all duration-200 cursor-pointer hover:border-primary"
        >
            <div className="w-36 h-full flex-shrink-0 bg-white rounded-md p-1 border">
                <img className="w-full h-full object-contain" src={Product.imageUrl} alt={Product.name} />
            </div>
            <div className="flex-grow flex flex-col text-left self-start py-2">
                <h3 className="text-lg font-bold text-card-foreground hover:underline">
                    {Product.name}
                </h3>
                <p className="mt-1 text-lg font-semibold text-primary">Current Bid: ${Product.currentPrice.toFixed(2)}</p>
                <div className="mt-2 text-sm">
                    <p className="text-muted-foreground line-clamp-2">
                        {Product.description}
                    </p>
                </div>
            </div>
        </Card>
    );
};

export default CatalogItem;