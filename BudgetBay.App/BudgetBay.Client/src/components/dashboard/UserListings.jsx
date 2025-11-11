import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/Card';

const UserListings = ({ listings }) => {
    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between">
                <CardTitle>My Products For Sale</CardTitle>
                <Button asChild>
                    <Link to="/products/create">Add New Product</Link>
                </Button>
            </CardHeader>
            <CardContent>
                {listings.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {listings.map(product => (
                            <Card key={product.id}>
                                <CardHeader>
                                    <Link to={`/products/${product.id}`} className="hover:text-primary">
                                        <CardTitle className="text-lg hover:underline truncate">{product.name}</CardTitle>
                                    </Link>
                                </CardHeader>
                                <CardContent className="text-sm space-y-1">
                                    <p className="text-muted-foreground"><strong>Current Price:</strong> ${product.currentPrice?.toFixed(2) ?? 'N/A'}</p>
                                    <p className="text-muted-foreground"><strong>End Time:</strong> {new Date(product.endTime).toLocaleString()}</p>
                                </CardContent>
                                <CardFooter className="justify-end">
                                    <Button asChild variant="secondary" size="sm">
                                        <Link to={`/products/edit/${product.id}`}>Edit</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-muted-foreground py-8">You have not listed any products yet.</p>
                )}
            </CardContent>
        </Card>
    );
};

export default UserListings;