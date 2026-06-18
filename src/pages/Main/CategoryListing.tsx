import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, SlidersHorizontal, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '../../data/mockData';
import { useProductStore } from '../../stores/productStore';
import { ProductCategory } from '../../types';
import ProductCard from '../../components/Product/ProductCard';
import SkeletonLoader from '../../components/Product/SkeletonLoader';

const CategoryListing: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const products = useProductStore((state) => state.products);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>(ProductCategory.VEGETABLES);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high'>('popular');

  // Sync route param with active category
  useEffect(() => {
    if (categoryId) {
      // Find category enum key
      const cat = CATEGORIES.find(c => c.id.toLowerCase().replace(/[^a-z]/g, '') === categoryId.toLowerCase().replace(/[^a-z]/g, ''));
      if (cat) {
        setIsLoading(true);
        setActiveCategory(cat.id);
        const timer = setTimeout(() => setIsLoading(false), 500); // Simulate network load
        return () => clearTimeout(timer);
      }
    }
  }, [categoryId]);

  const categoryData = CATEGORIES.find(c => c.id === activeCategory);

  // Filter products by category
  let filteredProducts = products.filter(p => p.category === activeCategory);

  // Apply sorting
  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'popular') {
    filteredProducts = [...filteredProducts].sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
  }

  const handleCategoryChange = (catId: ProductCategory) => {
    const slug = catId.toLowerCase().replace(/[^a-z]/g, '');
    navigate(`/category/${slug}`);
  };

  return (
    <div className="flex flex-col gap-6 pb-6 animate-fade-in">
      
      {/* Mobile Header: Back Button & Title */}
      <div className="md:hidden flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="text-slate-500 hover:text-slate-700 p-2 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-extrabold text-slate-800">{categoryData?.name || 'Category'}</h1>
        <button
          onClick={() => navigate('/search')}
          className="text-slate-500 hover:text-slate-700 p-2 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Desktop Breadcrumbs navigation */}
      <div className="hidden md:flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
        <button onClick={() => navigate('/')} className="hover:text-brand-600 transition-colors">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-600">{categoryData?.name}</span>
      </div>

      {/* Main Content Layout (Desktop splits into Sidebar + Grid) */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        
        {/* Left Sidebar (Desktop Only) */}
        <aside className="hidden md:block w-64 shrink-0 bg-white border border-slate-100 rounded-3xl p-5 shadow-sm">
          <h2 className="text-base font-extrabold text-slate-800 mb-4 px-1">Categories</h2>
          <div className="flex flex-col gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-left font-bold text-xs transition-all ${
                  cat.id === activeCategory
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-100'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-brand-600'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  cat.id === activeCategory ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {products.filter(p => p.category === cat.id).length}
                </span>
              </button>
            ))}
          </div>
        </aside>

        {/* Right Section: Mobile tags + Sort filters + Product Grid */}
        <div className="flex-1 w-full flex flex-col gap-4">
          
          {/* Mobile Only Category Swiper */}
          <div className="md:hidden flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2.5 rounded-2xl font-bold text-xs whitespace-nowrap shrink-0 transition-all ${
                  cat.id === activeCategory
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-white border border-slate-100 text-slate-500 hover:bg-slate-50'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort Filters bar */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center justify-between shadow-sm">
            <span className="text-xs font-bold text-slate-500">
              Showing <span className="text-slate-800 font-extrabold">{filteredProducts.length}</span> items
            </span>
            
            {/* Sorting selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-bold hidden sm:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-100 text-xs font-bold text-slate-600 rounded-xl px-3 py-1.5 focus:border-brand-500 outline-none cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <option value="popular">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
              <SkeletonLoader count={6} />
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-sm">
              <p className="text-slate-400 font-bold">No products found in this category.</p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default CategoryListing;
