import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingCart, MapPin, LogOut, User as UserIcon } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import { useProductStore } from '../../stores/productStore';
import { useLocationStore } from '../../stores/locationStore';
import { useAuthStore } from '../../stores/authStore';
import NectarLogo from '../UI/NectarLogo';

interface HeaderProps {
  onCartToggle?: () => void;
  onAddressModalToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartToggle, onAddressModalToggle }) => {
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.items);
  const favorites = useProductStore((state) => state.favorites);
  const { currentAddress } = useLocationStore();
  const { logout, user } = useAuthStore();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const favCount = favorites.length;

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search')?.toString() || '';
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="hidden md:block sticky top-0 bg-white border-b border-slate-100 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
        
        {/* Brand Logo */}
        <Link to="/" className="hover:opacity-90 active:scale-98 transition-all">
          <NectarLogo size="sm" />
        </Link>

        {/* Location Selector */}
        <button
          onClick={onAddressModalToggle}
          className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors max-w-xs text-left group"
        >
          <MapPin className="w-5 h-5 text-brand-600 shrink-0" />
          <div className="text-xs truncate">
            <span className="block font-bold text-slate-400 uppercase text-[9px] tracking-wider">Deliver to</span>
            <span className="font-semibold text-slate-700 block truncate">
              {currentAddress || 'Select Delivery Location'}
            </span>
          </div>
        </button>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-lg relative">
          <input
            type="text"
            name="search"
            placeholder="Search fresh vegetables, fruits, dairy..."
            className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none text-sm transition-all font-medium"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        </form>

        {/* Nav Items */}
        <div className="flex items-center gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-semibold text-sm px-3 py-2 rounded-xl transition-all ${
                isActive ? 'text-brand-600 bg-brand-50' : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50'
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `font-semibold text-sm px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
                isActive ? 'text-brand-600 bg-brand-50' : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50'
              }`
            }
          >
            <Heart className="w-4 h-4" />
            <span>Favorites</span>
            {favCount > 0 && (
              <span className="bg-rose-500 text-white text-[10px] font-bold h-4 px-1.5 rounded-full flex items-center justify-center">
                {favCount}
              </span>
            )}
          </NavLink>
          
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `font-semibold text-sm px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
                isActive ? 'text-brand-600 bg-brand-50' : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50'
              }`
            }
          >
            <UserIcon className="w-4 h-4" />
            <span>Profile</span>
          </NavLink>

          {/* Cart Trigger */}
          <button
            onClick={onCartToggle}
            className="relative bg-brand-50 hover:bg-brand-100 text-brand-700 p-2.5 rounded-xl transition-colors flex items-center gap-2 font-bold text-sm"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="bg-accent-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Signout */}
          {user && (
            <button
              onClick={logout}
              className="text-slate-400 hover:text-rose-600 p-2.5 rounded-xl hover:bg-rose-50 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;
