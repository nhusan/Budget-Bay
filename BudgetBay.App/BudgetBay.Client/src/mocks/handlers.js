import { http, HttpResponse, delay } from 'msw';
import { BASE_URL } from '../lib/api';

// --- Our In-Memory Mock Database ---

let mockProducts = [
  {
    id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    name: 'Vintage Mechanical Keyboard',
    description: 'A classic keyboard with satisfying clicks. Great for developers and writers.',
    imageUrl: 'https://i.ytimg.com/vi/1_rPk4t03_w/maxresdefault.jpg',
    condition: 'Used',
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    startingPrice: 50.00,
    currentPrice: 75.50,
    sellerId: 'mock-user-123', // Corresponds to our fake logged-in user
    seller: { username: 'DemoSeller' },
    bids: [
        { username: 'BidderA', amount: 60.00 },
        { username: 'BidderB', amount: 75.50 },
    ]
  },
  {
    id: 'f0e9d8c7-b6a5-4321-fedc-ba9876543210',
    name: 'Ergonomic Office Chair',
    description: 'Barely used office chair with lumbar support. Perfect for your home office setup.',
    imageUrl: 'https://m.media-amazon.com/images/I/71q9u-bV3jL._AC_UF894,1000_QL80_.jpg',
    condition: 'Used',
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    startingPrice: 120.00,
    currentPrice: 125.00, // <-- UPDATED
    sellerId: 'another-user-456',
    seller: { username: 'AnotherSeller' },
    bids: [{ username: 'DemoUser', amount: 125.00 }] // <-- UPDATED
  },
];

// In-memory store for the demo user's data
let mockUserBids = [
    {
        productId: 'f0e9d8c7-b6a5-4321-fedc-ba9876543210',
        amount: 125.00
    }
]; // <-- UPDATED from []
let mockUserAddress = null; // Start with no address to test creation
let mockUserInfo = { 
  username: 'DemoUser',
  email: 'demo@test.com',
  profilePictureUrl: 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg',
};


// --- A Fake JWT for our Demo User ---
// Payload decodes to: { "sub": "mock-user-123", "username": "DemoUser", "exp": <future_timestamp> }
const MOCK_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtb2NrLXVzZXItMTIzIiwidXNlcm5hbWUiOiJEZW1vVXNlciIsImVtYWlsIjoiZGVtb0B0ZXN0LmNvbSIsImV4cCI6MTk0NTk5MzIyM30.fake_signature_string";


export const handlers = [
  // Health check handler
  // When MSW is active, it means our mock server is "healthy".
  // This allows the AppInitializer to confirm MSW is ready before rendering the app.
  http.get(`${BASE_URL}/health`, () => {
    return new HttpResponse(null, { status: 200 });
  }),

  /**************************************
   * AUTHENTICATION HANDLERS
   **************************************/
  http.post(`${BASE_URL}/Auth/login`, async () => {
    await delay(500);
    return HttpResponse.text(MOCK_JWT);
  }),

  http.post(`${BASE_URL}/Auth/register`, async () => {
    await delay(1000);
    return new HttpResponse(null, { status: 200 });
  }),


  /**************************************
   * PRODUCT HANDLERS
   **************************************/

  // GET all products
  http.get(`${BASE_URL}/Products`, async () => {
    await delay(200);
    return HttpResponse.json(mockProducts);
  }),

  // GET a single product
  http.get(`${BASE_URL}/Products/:productId`, async ({ params }) => {
    await delay(100);
    const product = mockProducts.find(p => p.id === params.productId);
    if (!product) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(product);
  }),

  // POST to create a new product
  http.post(`${BASE_URL}/Products`, async ({ request }) => {
    await delay(800);
    const newProductData = await request.json();
    const newProduct = {
      ...newProductData,
      id: `mock-product-${Date.now()}`,
      sellerId: 'mock-user-123', // The logged-in user is the seller
      seller: { username: 'DemoUser' },
      bids: [],
    };
    mockProducts.unshift(newProduct);
    return HttpResponse.json(newProduct, { status: 201 });
  }),
  
  // PUT to update an existing product
  http.put(`${BASE_URL}/Products/:productId`, async ({ params, request }) => {
    await delay(600);
    const { productId } = params;
    const updateData = await request.json();
    
    const productIndex = mockProducts.findIndex(p => p.id === productId);
    if (productIndex === -1) {
        return new HttpResponse(null, { status: 404 });
    }
    
    // Convert condition from number string back to text if needed
    if (updateData.condition !== undefined) {
        updateData.condition = parseInt(updateData.condition) === 0 ? 'New' : 'Used';
    }
    
    mockProducts[productIndex] = { ...mockProducts[productIndex], ...updateData };
    return HttpResponse.json(mockProducts[productIndex]);
  }),

  // POST to place a bid on a product
  http.post(`${BASE_URL}/Products/:productId/bids`, async ({ params, request }) => {
    await delay(600);
    const { productId } = params;
    const bidData = await request.json();

    const productIndex = mockProducts.findIndex(p => p.id === productId);
    if (productIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    const newBid = {
      username: 'DemoUser',
      amount: bidData.amount,
    };
    
    mockProducts[productIndex].bids.push(newBid);
    mockProducts[productIndex].currentPrice = bidData.amount;
    
    mockUserBids.push({
        productId: productId,
        amount: bidData.amount,
    });
    
    return new HttpResponse(null, { status: 200 });
  }),


  /**************************************
   * USER-SPECIFIC HANDLERS
   **************************************/

  // GET the demo user's profile info
  http.get(`${BASE_URL}/Users/:userId`, () => {
    return HttpResponse.json(mockUserInfo)
  }),

  // GET the demo user's address
  http.get(`${BASE_URL}/Users/:userId/address`, async () => {
    await delay(150);
    if (!mockUserAddress) {
      return new HttpResponse(null, { status: 404 }); // Simulate no address found
    }
    return HttpResponse.json(mockUserAddress);
  }),

  // POST to create the demo user's address
  http.post(`${BASE_URL}/Users/:userId/address`, async ({ request }) => {
    await delay(500);
    const newAddress = await request.json();
    mockUserAddress = { ...newAddress };
    return HttpResponse.json(mockUserAddress, { status: 201 });
  }),

  // PUT to update the demo user's address
  http.put(`${BASE_URL}/Users/:userId/address`, async ({ request }) => {
    await delay(500);
    const updatedAddress = await request.json();
    mockUserAddress = { ...mockUserAddress, ...updatedAddress };
    return HttpResponse.json(mockUserAddress);
  }),

  // POST to "upload" a profile picture
  http.post(`${BASE_URL}/Profile/upload`, async () => {
    await delay(1200); // Simulate upload delay
    // To show a change, we'll just point to a new random avatar
    mockUserInfo.profilePictureUrl = `https://i.pravatar.cc/150?u=demo${Date.now()}`;
    return HttpResponse.json({ url: mockUserInfo.profilePictureUrl }, { status: 200 });
  }),

  // GET a user's listed products for the dashboard
  http.get(`${BASE_URL}/Users/:userId/products`, async ({ params }) => {
    await delay(300);
    const { userId } = params;
    const userProducts = mockProducts.filter(p => p.sellerId === userId);
    return HttpResponse.json(userProducts);
  }),

  // GET the demo user's bids
  http.get(`${BASE_URL}/Users/:userId/bids`, () => {
    return HttpResponse.json(mockUserBids)
  }),
  
  // Return an empty array for won auctions for now
  http.get(`${BASE_URL}/Users/:userId/won-auctions`, () => HttpResponse.json([])),

];