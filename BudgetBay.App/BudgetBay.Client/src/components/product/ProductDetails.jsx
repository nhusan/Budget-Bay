import { Card, CardContent } from '@/components/ui/Card';

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
};

const ProductDetails = ({ product }) => {
    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex flex-col gap-10">
                    <div className="flex justify-center items-center bg-muted rounded-lg overflow-hidden border aspect-[5/4]">
                        <img className="max-w-full max-h-[500px] object-contain" src={product.imageUrl || 'https://via.placeholder.com/500'} alt={product.name} />
                    </div>

                    <div>
                        <h1 className="text-4xl font-bold text-foreground mb-4">{product.name}</h1>
                        <p className="text-base text-muted-foreground leading-relaxed mb-6">{product.description}</p>

                        <div className="grid grid-cols-2 gap-5 border-t pt-5">
                            <div>
                                <span className="block text-sm text-muted-foreground font-medium mb-1">Auction Start</span>
                                <p className="text-lg text-foreground">{formatDate(product.startTime)}</p>
                            </div>
                            <div>
                                <span className="block text-sm text-muted-foreground font-medium mb-1">Auction End</span>
                                <p className="text-lg text-foreground">{formatDate(product.endTime)}</p>
                            </div>
                            <div>
                                <span className="block text-sm text-muted-foreground font-medium mb-1">Starting Price</span>
                                <p className="text-lg text-foreground">${product.startingPrice.toFixed(2)}</p>
                            </div>
                            <div>
                                <span className="block text-sm text-muted-foreground font-medium mb-1">Seller</span>
                                <p className="text-lg text-foreground">{product.seller?.username || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductDetails;