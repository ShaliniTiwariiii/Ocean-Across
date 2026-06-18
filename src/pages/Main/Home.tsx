import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ChevronRight, Tag, Percent } from 'lucide-react';
import { CATEGORIES, PROMOTIONS } from '../../data/mockData';
import { useProductStore } from '../../stores/productStore';
import { useLocationStore } from '../../stores/locationStore';
import ProductCard from '../../components/Product/ProductCard';

interface HomeProps {
  onAddressModalToggle?: () => void;
}

const Home: React.FC<HomeProps> = ({ onAddressModalToggle }) => {
  const navigate = useNavigate();
  const products = useProductStore((state) => state.products);
  const { currentAddress } = useLocationStore();
  const [activePromo, setActivePromo] = useState(0);

  // Auto scroll promotions carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePromo((prev) => (prev + 1) % PROMOTIONS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const popularProducts = products.filter(p => p.isPopular).slice(0, 8);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search')?.toString() || '';
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-6 animate-fade-in">
      
      {/* Mobile Only: Top Address Selector & Search Bar */}
      <div className="md:hidden flex flex-col gap-3">
        <button
          onClick={onAddressModalToggle}
          className="flex items-center gap-1.5 text-left w-fit"
        >
          <MapPin className="w-5 h-5 text-brand-600 shrink-0" />
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold text-slate-850 truncate max-w-[200px]">
              {currentAddress || 'Select Delivery Location'}
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        </button>

        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            name="search"
            placeholder="Search groceries..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm focus:border-brand-500 outline-none text-sm font-medium transition-all"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
        </form>
      </div>

      {/* Promotions Carousel Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-md h-44 md:h-64 bg-slate-900">
        {PROMOTIONS.map((promo, index) => (
          <div
            key={promo.id}
            className={`absolute inset-0 flex items-center justify-between transition-opacity duration-700 p-6 md:p-12 text-white ${
              index === activePromo ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            } ${promo.bgColor}`}
          >
            {/* Promo text */}
            <div className="flex-1 max-w-[60%] flex flex-col justify-center gap-1 md:gap-3 z-10">
              <div className="bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[9px] md:text-xs font-bold w-fit flex items-center gap-1">
                <Percent className="w-3.5 h-3.5" />
                <span>CODE: {promo.code}</span>
              </div>
              <h2 className="text-xl md:text-4xl font-extrabold leading-tight tracking-tight">
                {promo.title}
              </h2>
              <p className="text-[10px] md:text-sm font-medium text-white/80 line-clamp-2">
                {promo.subtitle}
              </p>
            </div>
            
            {/* Promo image background overlay */}
            <div className="absolute right-0 top-0 bottom-0 w-[45%] h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 z-10"></div>
              <img
                src={promo.image}
                alt={promo.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}

        {/* Carousel indicators */}
        <div className="absolute bottom-4 left-6 md:left-12 flex gap-1.5 z-20">
          {PROMOTIONS.map((_, index) => (
            <button
              key={index}
              onClick={() => setActivePromo(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activePromo ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Categories Grid Section */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-extrabold text-slate-800">Shop by Category</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 md:grid md:grid-cols-7 md:gap-4">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => navigate(`/category/${category.id}`)}
              className="flex flex-col items-center gap-2 text-center min-w-[76px] shrink-0 md:min-w-0"
            >
              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center p-3 border shadow-sm transition-all hover:scale-105 active:scale-95 ${category.color}`}>
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <span className="text-[11px] md:text-xs font-bold text-slate-600 max-w-[76px] md:max-w-none truncate">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Popular Items section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-extrabold text-slate-800">Popular Products</h2>
          <button
            onClick={() => navigate('/search')}
            className="text-xs md:text-sm font-bold text-brand-600 hover:text-brand-700 flex items-center gap-0.5"
          >
            <span>See All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic grids (2-col mobile, 4-col desktop) */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;
