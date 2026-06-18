import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus, Minus, Star } from 'lucide-react';
import { Product } from '../../types';
import { useCartStore } from '../../stores/cartStore';
import { useProductStore } from '../../stores/productStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem, updateQuantity, items } = useCartStore();
  const { favorites, toggleFavorite } = useProductStore();

  const isFavorite = favorites.includes(product.id);
  const cartItem = items.find((item) => item.product.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, quantity - 1);
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-4 relative group flex flex-col justify-between hover:shadow-xl hover:shadow-slate-100/50 transition-all duration-300 transform hover:-translate-y-1">
      {/* Favorite Button */}
      <button
        onClick={handleFavoriteToggle}
        className={`absolute top-4 right-4 z-10 p-2 rounded-full shadow-md backdrop-blur-sm border transition-all active:scale-90 ${
          isFavorite
            ? 'bg-rose-50 border-rose-100 text-rose-500'
            : 'bg-white/90 border-slate-100 text-slate-400 hover:text-rose-500'
        }`}
      >
        <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
      </button>

      {/* Product Image Clickable Link */}
      <Link to={`/product/${product.id}`} className="block overflow-hidden rounded-2xl mb-4 relative aspect-square bg-slate-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center">
            <span className="bg-white text-slate-800 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Product Details info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 mb-1.5">
            <Star className="w-3.5 h-3.5 fill-accent-500 text-accent-500" />
            <span className="text-xs font-bold text-slate-700">{product.rating}</span>
            <span className="text-[10px] text-slate-400 font-semibold">({product.reviewCount})</span>
          </div>

          {/* Name */}
          <Link
            to={`/product/${product.id}`}
            className="block text-sm font-bold text-slate-800 hover:text-brand-600 transition-colors line-clamp-2 h-10 mb-1"
          >
            {product.name}
          </Link>

          {/* Weight */}
          <span className="text-xs font-semibold text-slate-400 block mb-3">{product.weight}</span>
        </div>

        {/* Price & Cart Actions footer */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-50">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-[10px] text-slate-400 line-through font-semibold leading-none mb-0.5">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-base font-extrabold text-slate-800 leading-none">
              ${product.price.toFixed(2)}
            </span>
          </div>

          {/* Cart Quantity Action Controls */}
          {product.inStock && (
            <div className="h-9 min-w-[36px] flex items-center justify-end">
              {quantity === 0 ? (
                <button
                  onClick={handleAddClick}
                  className="bg-brand-50 hover:bg-brand-100 text-brand-700 p-2 rounded-xl transition-all active:scale-90"
                  aria-label="Add to cart"
                >
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                </button>
              ) : (
                <div className="flex items-center bg-brand-50 border border-brand-100 rounded-xl px-1.5 py-1">
                  <button
                    onClick={handleDecrement}
                    className="text-brand-700 hover:bg-brand-100 p-1 rounded-lg transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                  <span className="text-xs font-extrabold text-brand-800 w-6 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    className="text-brand-700 hover:bg-brand-100 p-1 rounded-lg transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
