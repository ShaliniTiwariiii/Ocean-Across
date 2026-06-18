import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Search, Heart, ShoppingBag, User } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import { useProductStore } from '../../stores/productStore';
import { useAuthStore } from '../../stores/authStore';

interface BottomNavigationProps {
  onCartToggle?: () => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ onCartToggle }) => {
  const location = useLocation();
  const cartItems = useCartStore((state) => state.items);
  const favorites = useProductStore((state) => state.favorites);
  const { setStep } = useAuthStore();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const favCount = favorites.length;

  const handleProfileClick = (e: React.MouseEvent) => {
    // If we click user tab, we can show a profile modal or navigate.
    // For this prototype, we'll route to a custom profile modal or profile path if desired,
    // or just toggle a simple menu. Let's let the router handle it or keep it simple.
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 py-2 px-6 flex justify-between items-center z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      {/* Home Tab */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 transition-all ${
            isActive ? 'text-brand-600 scale-105' : 'text-slate-400 hover:text-slate-600'
          }`
        }
      >
        <Home className="w-6 h-6 stroke-[2]" />
        <span className="text-[10px] font-medium">Home</span>
      </NavLink>

      {/* Search Tab */}
      <NavLink
        to="/search"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 transition-all ${
            isActive ? 'text-brand-600 scale-105' : 'text-slate-400 hover:text-slate-600'
          }`
        }
      >
        <Search className="w-6 h-6 stroke-[2]" />
        <span className="text-[10px] font-medium">Search</span>
      </NavLink>

      {/* Cart Tab (Floating Center Highlight) */}
      <button
        onClick={onCartToggle}
        className="flex flex-col items-center gap-1 relative -top-4 bg-brand-600 text-white p-3 rounded-full shadow-lg shadow-brand-200 border-4 border-white active:scale-95 transition-all hover:bg-brand-700"
      >
        <ShoppingBag className="w-6 h-6 stroke-[2.5]" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-brand-600">
            {cartCount}
          </span>
        )}
      </button>

      {/* Favorites Tab */}
      <NavLink
        to="/favorites"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 relative transition-all ${
            isActive ? 'text-brand-600 scale-105' : 'text-slate-400 hover:text-slate-600'
          }`
        }
      >
        <Heart className="w-6 h-6 stroke-[2]" />
        {favCount > 0 && (
          <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
            {favCount}
          </span>
        )}
        <span className="text-[10px] font-medium">Favorites</span>
      </NavLink>

      {/* Account Tab */}
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 transition-all ${
            isActive ? 'text-brand-600 scale-105' : 'text-slate-400 hover:text-slate-600'
          }`
        }
      >
        <User className="w-6 h-6 stroke-[2]" />
        <span className="text-[10px] font-medium">Account</span>
      </NavLink>
    </div>
  );
};

export default BottomNavigation;
