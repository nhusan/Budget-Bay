import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

const WonAuctions = ({ auctions }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Auctions I've Won</CardTitle>
            </CardHeader>
            <CardContent>
                {auctions.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {auctions.map((auction, index) => (
                            <Link key={`${auction.productId}-${index}`} to={`/products/${auction.productId}`}>
                                <Card className="transition-all hover:border-primary">
                                    <CardHeader>
                                        <CardTitle className="text-base">Product: {auction.productName}</CardTitle>
                                        <CardDescription>
                                            <strong>Winning Bid:</strong> ${auction.amount.toFixed(2)}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-muted-foreground py-8">You have not won any auctions yet.</p>
                )}
            </CardContent>
        </Card>
    );
};

export default WonAuctions;