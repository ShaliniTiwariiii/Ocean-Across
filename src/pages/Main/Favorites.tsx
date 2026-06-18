import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, ChevronRight, ShoppingBag } from 'lucide-react';
import { useProductStore } from '../../stores/productStore';
import ProductCard from '../../components/Product/ProductCard';

const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const products = useProductStore((state) => state.products);
  const favorites = useProductStore((state) => state.favorites);

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="flex flex-col gap-6 pb-6 animate-fade-in">
      
      {/* Header title */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-extrabold text-slate-800">My Favorites</h1>
      </div>

      {/* Favorites Listing Grid */}
      {favoriteProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white border border-slate-100 rounded-[32px] p-16 text-center shadow-sm flex flex-col items-center gap-4">
          <div className="bg-rose-50 text-rose-500 p-6 rounded-full">
            <Heart className="w-10 h-10 fill-rose-100 text-rose-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Your Wishlist is Empty</h3>
          <p className="text-sm text-slate-400 max-w-xs font-medium">
            Save items that you like to your favorites so you can easily add them to your cart later!
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-brand-50 hover:bg-brand-100 text-brand-700 px-6 py-2.5 rounded-xl font-bold transition-all"
          >
            Explore Groceries
          </button>
        </div>
      )}

    </div>
  );
};

export default Favorites;
