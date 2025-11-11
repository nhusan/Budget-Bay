import { Routes, Route } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';
import ProductCreatePage from './pages/ProductCreatePage/ProductCreatePage';
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage';
import ProductEditPage from './pages/ProductEditPage/ProductEditPage';

// Components
import ProtectedRoute from './components/auth/ProtectedRoute';
import MainLayout from './components/layout/MainLayout'; // <-- Import the new layout

function App() {
  return (
    <Routes>
      {/* Routes WITHOUT the main layout (e.g., full-screen login/register) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      
      {/* Routes WITH the main layout (Header, Footer, padded content) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/products/:productId" element={<ProductDetailsPage />} />
        
        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/products/create" 
          element={
            <ProtectedRoute>
              <ProductCreatePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/products/edit/:productId" 
          element={
            <ProtectedRoute>
              <ProductEditPage />
            </ProtectedRoute>
          } 
        />
      </Route>
    </Routes>
  );
}

export default App;