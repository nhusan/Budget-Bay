import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

const UserBids = ({ bids }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>My Bids</CardTitle>
            </CardHeader>
            <CardContent>
                {bids.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bids.map((bid, index) => (
                            <Link key={`${bid.productId}-${index}`} to={`/products/${bid.productId}`}>
                                <Card className="transition-all hover:border-primary">
                                    <CardHeader>
                                        <CardTitle className="text-base">Product ID: {bid.productId}</CardTitle>
                                        <CardDescription>
                                            <strong>Amount:</strong> ${bid.amount.toFixed(2)}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-muted-foreground py-8">You have not placed any bids.</p>
                )}
            </CardContent>
        </Card>
    );
};

export default UserBids;