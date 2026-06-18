import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Star, ShoppingBag, Plus, Minus, ChevronRight } from 'lucide-react';
import { useProductStore } from '../../stores/productStore';
import { useCartStore } from '../../stores/cartStore';
import ProductCard from '../../components/Product/ProductCard';

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const products = useProductStore((state) => state.products);
  const { favorites, toggleFavorite } = useProductStore();
  const { addItem, updateQuantity, items } = useCartStore();

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-xl font-extrabold text-slate-800">Product Not Found</h2>
        <button
          onClick={() => navigate('/')}
          className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const isFavorite = favorites.includes(product.id);
  const cartItem = items.find((item) => item.product.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  // Find related products in the same category (excluding current product)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleFavoriteToggle = () => {
    toggleFavorite(product.id);
  };

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <div className="flex flex-col gap-8 pb-8 animate-fade-in">
      
      {/* Back Button / Breadcrumbs */}
      <div className="flex items-center justify-between md:hidden">
        <button
          onClick={() => navigate(-1)}
          className="text-slate-500 hover:text-slate-700 p-2 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <span className="text-sm font-extrabold text-slate-800">Details</span>
        <button
          onClick={handleFavoriteToggle}
          className={`p-2 rounded-xl border transition-colors ${
            isFavorite ? 'bg-rose-50 border-rose-100 text-rose-500' : 'bg-slate-50 border-slate-100 text-slate-400'
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500' : ''}`} />
        </button>
      </div>

      {/* Desktop Breadcrumbs */}
      <div className="hidden md:flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
        <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link
          to={`/category/${product.category.toLowerCase().replace(/[^a-z]/g, '')}`}
          className="hover:text-brand-600 transition-colors"
        >
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-600">{product.name}</span>
      </div>

      {/* Product Display Details Wrapper */}
      <div className="flex flex-col md:flex-row gap-8 items-start bg-white border border-slate-100 rounded-[32px] p-6 md:p-10 shadow-sm w-full">
        
        {/* Left Side: Product Image */}
        <div className="w-full md:w-1/2 aspect-square rounded-2xl overflow-hidden bg-slate-50 relative border border-slate-100 shadow-inner">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {discountPercent > 0 && (
            <span className="absolute top-4 left-4 bg-accent-500 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Right Side: Product Details Content */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <div>
            {/* Category Link */}
            <Link
              to={`/category/${product.category.toLowerCase().replace(/[^a-z]/g, '')}`}
              className="text-xs font-bold text-brand-600 hover:text-brand-700 bg-brand-50 px-3 py-1 rounded-full w-fit block mb-3 uppercase tracking-wider"
            >
              {product.category}
            </Link>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 leading-tight">
              {product.name}
            </h1>

            {/* Rating / Review count */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-lg">
                <Star className="w-3.5 h-3.5 fill-accent-500 text-accent-500" />
                <span className="text-xs font-bold text-slate-700">{product.rating}</span>
              </div>
              <span className="text-xs text-slate-400 font-bold">({product.reviewCount} customer reviews)</span>
            </div>
          </div>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-3 p-4 bg-slate-50 rounded-2xl">
            <span className="text-3xl font-extrabold text-slate-800">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-slate-400 line-through font-semibold">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-xs text-slate-500 font-bold ml-auto bg-white border border-slate-100 px-2.5 py-1 rounded-lg">
              Weight: {product.weight}
            </span>
          </div>

          {/* Cart Quantity modifier buttons */}
          {product.inStock ? (
            <div className="flex items-center gap-4">
              {quantity === 0 ? (
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-brand-600 hover:bg-brand-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2.5 shadow-lg shadow-brand-100 transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
              ) : (
                <div className="flex items-center bg-slate-50 border border-slate-100 rounded-2xl p-1.5 w-fit">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="text-brand-700 bg-white hover:bg-slate-100 p-2.5 rounded-xl border border-slate-100 shadow-sm transition-colors"
                  >
                    <Minus className="w-4 h-4 stroke-[3]" />
                  </button>
                  <span className="text-base font-extrabold text-slate-800 w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="text-brand-700 bg-white hover:bg-slate-100 p-2.5 rounded-xl border border-slate-100 shadow-sm transition-colors"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              )}

              {/* Desktop Favorite Toggle */}
              <button
                onClick={handleFavoriteToggle}
                className={`hidden md:block p-3.5 rounded-2xl border transition-all active:scale-95 ${
                  isFavorite
                    ? 'bg-rose-50 border-rose-100 text-rose-500 shadow-sm'
                    : 'bg-white border-slate-100 text-slate-400 hover:text-rose-500'
                }`}
                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart className={`w-6 h-6 ${isFavorite ? 'fill-rose-500' : ''}`} />
              </button>
            </div>
          ) : (
            <div className="bg-slate-100 text-slate-500 p-4 rounded-2xl text-center font-bold text-sm">
              Temporarily Out of Stock
            </div>
          )}

          {/* Description */}
          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-sm font-bold text-slate-700 mb-2">Description</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              {product.description}
            </p>
          </div>
        </div>

      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <div className="flex flex-col gap-4 mt-4">
          <h2 className="text-lg md:text-xl font-extrabold text-slate-800">You Might Also Like</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductDetails;
