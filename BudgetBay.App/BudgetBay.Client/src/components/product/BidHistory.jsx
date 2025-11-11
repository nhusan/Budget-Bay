const BidHistory = ({ bidsList }) => {
  return (
    <div className="card-base">
      <h3 className="text-xl font-semibold mb-3 text-text-base">Bid History</h3>

      <div className="max-h-60 overflow-y-auto border border-border rounded-lg p-2">
        {(!bidsList || bidsList.length === 0) ? (
          <p className="text-center text-text-muted py-4">No bids yet.</p>
        ) : (
          <ul className="list-none m-0 p-0">
            {bidsList.map((bid, index) => (
              <li key={index} className="flex justify-between items-center py-2 px-1 border-b border-border last:border-b-0">
                <span className="font-medium text-text-base">{bid.username}</span>
                <span className="text-text-muted">${bid.amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BidHistory;