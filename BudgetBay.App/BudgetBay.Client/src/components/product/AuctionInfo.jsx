import { Card, CardContent } from '@/components/ui/Card';

const AuctionInfo = ({ product, isAuctionActive }) => {
    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex items-center gap-8 bg-muted rounded-lg p-5">
                    <div className="flex-1">
                        <span className="block text-sm text-muted-foreground font-medium mb-1">Current Bid</span>
                        <p className="text-3xl font-bold text-primary">${product.currentPrice.toFixed(2)}</p>
                    </div>
                    {isAuctionActive && (
                        <div className="flex-1">
                            <span className="block text-sm text-muted-foreground font-medium mb-1">Time Left</span>
                            {/* A real timer component would go here */}
                            <p className="text-2xl font-semibold text-foreground tabular-nums">--:--:--</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export default AuctionInfo;