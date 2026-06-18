import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ArrowRight, Star, Loader2 } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../../data/mockData';
import { useProductStore } from '../../stores/productStore';
import { ProductCategory, Product } from '../../types';
import ProductCard from '../../components/Product/ProductCard';
import SkeletonLoader from '../../components/Product/SkeletonLoader';
import useDebounce from '../../hooks/useDebounce';

const SearchResults: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  // Local UI filters states
  const [searchInput, setSearchInput] = useState(initialQuery);
  const debouncedSearch = useDebounce(searchInput, 500);
  const [selectedCats, setSelectedCats] = useState<ProductCategory[]>([]);
  const [pricePreset, setPricePreset] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'rating'>('popular');
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Mobile Drawer toggle
  const [isSearching, setIsSearching] = useState(false);

  // Sync address bar search parameter
  useEffect(() => {
    setSearchParams(searchInput ? { q: searchInput } : {});
  }, [debouncedSearch]);

  // Simulate network query load on input change
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => setIsSearching(false), 600);
    return () => clearTimeout(timer);
  }, [debouncedSearch, selectedCats, pricePreset, sortBy]);

  // Handle category toggle
  const handleCatToggle = (cat: ProductCategory) => {
    setSelectedCats(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  // Clear all filters
  const handleClearAll = () => {
    setSearchInput('');
    setSelectedCats([]);
    setPricePreset('all');
    setSortBy('popular');
  };

  // Filter & Sort logic
  let results = PRODUCTS.filter((product) => {
    // 1. Search Query Match
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchCat = product.category.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCat) return false;
    }

    // 2. Category Checkbox match
    if (selectedCats.length > 0) {
      if (!selectedCats.includes(product.category)) return false;
    }

    // 3. Price Preset match
    if (pricePreset !== 'all') {
      const p = product.price;
      if (pricePreset === 'under-3' && p >= 3) return false;
      if (pricePreset === '3-6' && (p < 3 || p > 6)) return false;
      if (pricePreset === '6-10' && (p < 6 || p > 10)) return false;
      if (pricePreset === 'over-10' && p <= 10) return false;
    }

    return true;
  });

  // 4. Apply Sorting
  if (sortBy === 'price-low') {
    results = [...results].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    results = [...results].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    results = [...results].sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'popular') {
    results = [...results].sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
  }

  // Preset Price Options
  const PRICE_PRESETS = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under $3.00', value: 'under-3' },
    { label: '$3.00 - $6.00', value: '3-6' },
    { label: '$6.00 - $10.00', value: '6-10' },
    { label: 'Over $10.00', value: 'over-10' },
  ];

  const FiltersContent = () => (
    <div className="flex flex-col gap-6">
      {/* Search Header inside drawer/sidebar */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Filters</h3>
        <button
          onClick={handleClearAll}
          className="text-xs font-bold text-brand-600 hover:text-brand-700 hover:underline"
        >
          Reset All
        </button>
      </div>

      {/* Sorting */}
      <div className="flex flex-col gap-2">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sort By</h4>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Popularity', value: 'popular' },
            { label: 'Rating', value: 'rating' },
            { label: 'Price: Low-High', value: 'price-low' },
            { label: 'Price: High-Low', value: 'price-high' },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setSortBy(opt.value as any)}
              className={`px-3 py-2 border rounded-xl font-semibold text-xs transition-all ${
                sortBy === opt.value
                  ? 'border-brand-600 bg-brand-50 text-brand-700'
                  : 'border-slate-100 text-slate-650 hover:bg-slate-50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Categories checkboxes */}
      <div className="flex flex-col gap-2">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Categories</h4>
        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto no-scrollbar pr-1">
          {CATEGORIES.map((cat) => {
            const isChecked = selectedCats.includes(cat.id);
            return (
              <label
                key={cat.id}
                className="flex items-center gap-3 px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCatToggle(cat.id)}
                  className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 h-4 w-4"
                />
                <span className="text-xs font-bold text-slate-700">{cat.name}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Presets */}
      <div className="flex flex-col gap-2">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Price Range</h4>
        <div className="flex flex-col gap-1.5">
          {PRICE_PRESETS.map((preset) => (
            <button
              key={preset.value}
              type="button"
              onClick={() => setPricePreset(preset.value)}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold text-xs border transition-all ${
                pricePreset === preset.value
                  ? 'border-brand-500 bg-brand-50 text-brand-750 font-bold'
                  : 'border-transparent text-slate-600 hover:bg-slate-50'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 pb-6 animate-fade-in">
      
      {/* Search Input Bar + Filter Toggle */}
      <div className="flex items-center gap-3 w-full">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search groceries..."
            className="w-full pl-12 pr-10 py-3.5 bg-white border border-slate-150 rounded-2xl shadow-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none text-sm font-medium transition-all"
          />
          {isSearching ? (
            <Loader2 className="w-5 h-5 text-brand-600 absolute left-4 top-1/2 transform -translate-y-1/2 animate-spin" />
          ) : (
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          )}
          {searchInput && (
            <button
              onClick={() => setSearchInput('')}
              className="text-slate-400 hover:text-slate-650 p-1 absolute right-3 top-1/2 transform -translate-y-1/2"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        
        <button
          onClick={() => setIsFilterOpen(true)}
          className="md:hidden bg-white border border-slate-100 p-3.5 rounded-2xl text-slate-500 hover:text-brand-650 hover:border-brand-100 shadow-sm active:scale-95 transition-all shrink-0"
          title="Toggle filters drawer"
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Main Grid & Desktop Layout */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        
        {/* Desktop Left Filter Sidebar */}
        <aside className="hidden md:block w-64 shrink-0 bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm">
          <FiltersContent />
        </aside>

        {/* Right Section: Results Header + Grid */}
        <div className="flex-1 w-full flex flex-col gap-4">
          
          {/* Results Summary header */}
          <div className="bg-white border border-slate-100 rounded-2xl px-5 py-4 flex items-center justify-between shadow-sm">
            <span className="text-xs font-bold text-slate-500">
              Found <span className="text-slate-800 font-extrabold">{results.length}</span> items
              {debouncedSearch && (
                <> for <span className="text-brand-600 font-bold">"{debouncedSearch}"</span></>
              )}
            </span>
          </div>

          {/* Dynamic product card layout */}
          {isSearching ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
              <SkeletonLoader count={6} />
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-100 rounded-[32px] p-16 text-center shadow-sm flex flex-col items-center gap-4">
              <div className="bg-slate-50 text-slate-400 p-6 rounded-full">
                <Search className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">No Results Found</h3>
              <p className="text-sm text-slate-400 max-w-xs font-medium">
                We couldn't find anything matching your filters. Try updating your keyword or clearing filters.
              </p>
              <button
                onClick={handleClearAll}
                className="bg-brand-50 hover:bg-brand-100 text-brand-700 px-6 py-2.5 rounded-xl font-bold transition-all"
              >
                Clear All Filters
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Mobile Filters Drawer Overlay */}
      {isFilterOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="w-[85%] max-w-sm h-full bg-white flex flex-col justify-between shadow-2xl animate-slide-in-right p-6 relative">
            <button
              onClick={() => setIsFilterOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 p-2 hover:bg-slate-50 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex-1 overflow-y-auto no-scrollbar pr-1 mt-6">
              <FiltersContent />
            </div>

            <button
              onClick={() => setIsFilterOpen(false)}
              className="w-full mt-6 bg-brand-600 hover:bg-brand-700 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-100 transition-all"
            >
              <span>Apply Filters</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default SearchResults;
