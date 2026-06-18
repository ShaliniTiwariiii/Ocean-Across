import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Heart, ShoppingBag, LogOut, ChevronRight } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useProductStore } from '../../stores/productStore';
import { useCartStore } from '../../stores/cartStore';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, setStep } = useAuthStore();
  const favorites = useProductStore((state) => state.favorites);
  const cartItems = useCartStore((state) => state.items);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    logout();
    // Redirect back to onboarding splash
    setStep('splash');
  };

  const handleAddressChange = () => {
    setStep('location');
  };

  return (
    <div className="flex flex-col gap-6 pb-6 animate-fade-in max-w-2xl mx-auto">
      
      {/* Page Title */}
      <h1 className="text-xl md:text-2xl font-extrabold text-slate-800">My Account</h1>

      {/* Profile Card Header */}
      <div className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm flex items-center gap-4">
        <div className="h-16 w-16 bg-brand-50 border border-brand-100 text-brand-600 rounded-2xl flex items-center justify-center font-extrabold text-2xl uppercase shadow-inner">
          {user?.name.charAt(0) || 'G'}
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-extrabold text-slate-800">{user?.name || 'Grocery Shopper'}</h2>
          <span className="text-xs font-semibold text-slate-400">Premium Member</span>
        </div>
      </div>

      {/* Account Info list */}
      <div className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm flex flex-col gap-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Personal Details</h3>
        
        {/* Email */}
        <div className="flex items-center gap-4 py-2 border-b border-slate-50">
          <Mail className="w-5 h-5 text-slate-400" />
          <div className="text-xs">
            <span className="block font-bold text-slate-400 uppercase text-[9px] tracking-wider">Email</span>
            <span className="font-semibold text-slate-700 block mt-0.5">{user?.email || 'not provided'}</span>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-4 py-2 border-b border-slate-50">
          <Phone className="w-5 h-5 text-slate-400" />
          <div className="text-xs">
            <span className="block font-bold text-slate-400 uppercase text-[9px] tracking-wider">Phone</span>
            <span className="font-semibold text-slate-700 block mt-0.5">
              +1 {user?.phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') || 'not provided'}
            </span>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="flex items-start gap-4 py-2">
          <MapPin className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
          <div className="text-xs flex-1">
            <span className="block font-bold text-slate-400 uppercase text-[9px] tracking-wider">Primary Address</span>
            <span className="font-semibold text-slate-700 block mt-0.5 leading-relaxed">
              {user?.address || 'No address set'}
            </span>
          </div>
          <button
            onClick={handleAddressChange}
            className="text-xs font-bold text-brand-600 hover:text-brand-700 hover:underline"
          >
            Change
          </button>
        </div>
      </div>

      {/* Application Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => navigate('/favorites')}
          className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm text-left flex items-center justify-between hover:border-brand-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="bg-rose-50 text-rose-500 p-2 rounded-xl">
              <Heart className="w-5 h-5 fill-rose-100" />
            </div>
            <div className="text-xs">
              <span className="block text-[10px] font-bold text-slate-400 uppercase">Favorites</span>
              <span className="font-extrabold text-slate-700 text-sm mt-0.5">{favorites.length} Saved</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={() => navigate('/')} // Cart is usually toggled, we show products here
          className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm text-left flex items-center justify-between hover:border-brand-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="bg-brand-50 text-brand-600 p-2 rounded-xl">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <span className="block text-[10px] font-bold text-slate-400 uppercase">Cart Items</span>
              <span className="font-extrabold text-slate-700 text-sm mt-0.5">{cartCount} Products</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <button
          onClick={handleLogout}
          className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 py-4 rounded-3xl font-bold flex items-center justify-center gap-2 border border-rose-100 transition-all active:scale-98"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>

    </div>
  );
};

export default Profile;
