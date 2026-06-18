import { create } from 'zustand';
import { Product, ProductCategory } from '../types';
import { PRODUCTS } from '../data/mockData';

interface ProductState {
  products: Product[];
  favorites: string[]; // List of product IDs
  searchQuery: string;
  selectedCategory: ProductCategory | null;
  priceRange: [number, number];
  sortBy: 'popular' | 'price-low' | 'price-high' | 'rating';
  isLoading: boolean;

  // Actions
  toggleFavorite: (productId: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: ProductCategory | null) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortBy: (sort: ProductState['sortBy']) => void;
  resetFilters: () => void;
  searchProducts: (query: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => {
  // Load saved favorites from localStorage
  const savedFavorites = localStorage.getItem('ocean_favorites');
  const initialFavorites = savedFavorites ? JSON.parse(savedFavorites) : [];

  return {
    products: PRODUCTS,
    favorites: initialFavorites,
    searchQuery: '',
    selectedCategory: null,
    priceRange: [0, 20],
    sortBy: 'popular',
    isLoading: false,

    toggleFavorite: (productId) => {
      set((state) => {
        const isFav = state.favorites.includes(productId);
        const newFavorites = isFav 
          ? state.favorites.filter(id => id !== productId)
          : [...state.favorites, productId];
        localStorage.setItem('ocean_favorites', JSON.stringify(newFavorites));
        return { favorites: newFavorites };
      });
    },

    setSearchQuery: (query) => set({ searchQuery: query }),
    setSelectedCategory: (category) => set({ selectedCategory: category }),
    setPriceRange: (range) => set({ priceRange: range }),
    setSortBy: (sort) => set({ sortBy: sort }),

    resetFilters: () => set({
      searchQuery: '',
      selectedCategory: null,
      priceRange: [0, 20],
      sortBy: 'popular',
    }),

    searchProducts: async (query) => {
      set({ isLoading: true });
      // Simulate API search debounce delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      set({ searchQuery: query, isLoading: false });
    }
  };
});
