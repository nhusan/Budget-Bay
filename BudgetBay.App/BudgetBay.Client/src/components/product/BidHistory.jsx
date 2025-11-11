import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const BidHistory = ({ bidsList }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Bid History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-60 overflow-y-auto border rounded-lg p-2">
          {(!bidsList || bidsList.length === 0) ? (
            <p className="text-center text-muted-foreground py-4">No bids yet.</p>
          ) : (
            <ul className="list-none m-0 p-0">
              {bidsList.map((bid, index) => (
                <li key={index} className="flex justify-between items-center py-2 px-1 border-b last:border-b-0">
                  <span className="font-medium text-foreground">{bid.username}</span>
                  <span className="text-muted-foreground">${bid.amount.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BidHistory;