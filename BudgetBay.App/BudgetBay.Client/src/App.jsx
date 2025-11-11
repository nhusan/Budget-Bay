import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';
import ProductCreatePage from './pages/ProductCreatePage/ProductCreatePage';
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage';
import ProductEditPage from './pages/ProductEditPage/ProductEditPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import DemoModeBanner from './components/common/DemoModeBanner'; // <-- Import the new banner

function App() {
  // Check session storage to see if we are in demo mode
  const isDemoMode = sessionStorage.getItem('demoMode') === 'true';

  return (
    <>
      <Header />
      {/* Conditionally render the banner if in demo mode */}
      {isDemoMode && <DemoModeBanner />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
       
        
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
        <Route path="/products/:productId" element={<ProductDetailsPage />} />
      </Routes>
      <Footer />
    </>

  )
}

export default App;