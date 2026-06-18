import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';

// Onboarding Pages
import Splash from './pages/Onboarding/Splash';
import Welcome from './pages/Onboarding/Welcome';
import SignInSelection from './pages/Onboarding/SignInSelection';
import Login from './pages/Onboarding/Login';
import SignUp from './pages/Onboarding/SignUp';
import OTP from './pages/Onboarding/OTP';
import Location from './pages/Onboarding/Location';

// Main Application Pages
import Home from './pages/Main/Home';
import CategoryListing from './pages/Main/CategoryListing';
import ProductDetails from './pages/Main/ProductDetails';
import SearchResults from './pages/Main/SearchResults';
import Favorites from './pages/Main/Favorites';
import Profile from './pages/Main/Profile';

// Checkout / Result Pages
import Checkout from './pages/Checkout/Checkout';
import { OrderSuccess, OrderFailure } from './pages/Checkout/OrderResult';

// Layout / Shared components
import ResponsiveLayout from './components/Layout/ResponsiveLayout';
import CartDrawer from './components/Cart/CartDrawer';
import AddressModal from './components/UI/AddressModal';

function App() {
  const { currentStep } = useAuthStore();
  const [cartOpen, setCartOpen] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);

  const renderOnboarding = () => {
    switch (currentStep) {
      case 'splash':
        return <Splash />;
      case 'welcome':
        return <Welcome />;
      case 'signin-selection':
        return <SignInSelection />;
      case 'login':
        return <Login />;
      case 'signup':
        return <SignUp />;
      case 'otp':
        return <OTP />;
      case 'location':
        return <Location />;
      default:
        return null;
    }
  };

  const isOnboarding = currentStep !== 'main';

  return (
    <BrowserRouter>
      <ResponsiveLayout
        onCartToggle={() => setCartOpen(true)}
        onAddressModalToggle={() => setAddressOpen(true)}
      >
        {isOnboarding ? (
          renderOnboarding()
        ) : (
          <Routes>
            <Route path="/" element={<Home onAddressModalToggle={() => setAddressOpen(true)} />} />
            <Route path="/category/:categoryId" element={<CategoryListing />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/order-failure" element={<OrderFailure />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </ResponsiveLayout>

      {/* Slide-over Shopping Cart Panel */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Modal Address Selector */}
      <AddressModal isOpen={addressOpen} onClose={() => setAddressOpen(false)} />
    </BrowserRouter>
  );
}

export default App;
