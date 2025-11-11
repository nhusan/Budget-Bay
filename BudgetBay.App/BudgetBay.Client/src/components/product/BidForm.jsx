import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const BidForm = ({ 
    product, isAuctionActive, error, onSubmit,
    bidAmount, onBidChange, isBidding, isLoggedIn
}) => {
    return (
        <Card>
            <CardContent className="pt-6"> {/* Add padding top since there's no header */}
                {isAuctionActive ? (
                    <form onSubmit={onSubmit}>
                        <div className="flex gap-4 items-stretch">
                            <div className="relative flex-grow">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-muted-foreground">$</span>
                                <Input
                                    type="number"
                                    className="h-full text-lg font-semibold pl-8"
                                    value={bidAmount}
                                    onChange={onBidChange}
                                    placeholder={`Min bid $${(product.currentPrice + 0.01).toFixed(2)}`}
                                    step="0.01"
                                    min={product.currentPrice + 0.01}
                                    required
                                    disabled={!isLoggedIn || isBidding}
                                />
                            </div>
                            <Button 
                                type="submit" 
                                size="lg"
                                disabled={isBidding || !isLoggedIn || !bidAmount}
                            >
                                {isBidding ? 'Placing Bid...' : isLoggedIn ? 'Place Bid' : 'Login to Bid'}
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div className="bg-destructive/10 text-destructive rounded-lg p-4 text-center font-medium">
                        This auction has ended.
                    </div>
                )}
                {error && <p className="text-destructive mt-2 text-center w-full">{error}</p>}
            </CardContent>
        </Card>
    );
}

export default BidForm;