import { create } from 'zustand';
import { Product, CartItem } from '../types';

interface CartState {
  items: CartItem[];
  promoCode: string | null;
  promoDiscount: number; // percentage (e.g. 0.20 = 20%)
  deliveryFee: number;
  taxRate: number; // e.g. 0.08 = 8%

  // Actions
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  
  // Computations
  getCartSubtotal: () => number;
  getCartDiscountAmount: () => number;
  getCartTaxAmount: () => number;
  getCartTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => {
  // Load saved cart state from localStorage
  const savedCart = localStorage.getItem('ocean_cart');
  const initialItems = savedCart ? JSON.parse(savedCart) : [];

  const updateLocalStorage = (items: CartItem[]) => {
    localStorage.setItem('ocean_cart', JSON.stringify(items));
  };

  return {
    items: initialItems,
    promoCode: null,
    promoDiscount: 0,
    deliveryFee: 3.99, // default delivery fee
    taxRate: 0.08, // 8% sales tax

    addItem: (product, quantity = 1) => {
      set((state) => {
        const existingItemIndex = state.items.findIndex(item => item.product.id === product.id);
        let newItems: CartItem[];

        if (existingItemIndex > -1) {
          newItems = [...state.items];
          newItems[existingItemIndex].quantity += quantity;
        } else {
          newItems = [...state.items, { product, quantity }];
        }

        updateLocalStorage(newItems);
        return { items: newItems };
      });
    },

    removeItem: (productId) => {
      set((state) => {
        const newItems = state.items.filter(item => item.product.id !== productId);
        updateLocalStorage(newItems);
        return { items: newItems };
      });
    },

    updateQuantity: (productId, quantity) => {
      set((state) => {
        if (quantity <= 0) {
          const newItems = state.items.filter(item => item.product.id !== productId);
          updateLocalStorage(newItems);
          return { items: newItems };
        }

        const newItems = state.items.map(item => 
          item.product.id === productId ? { ...item, quantity } : item
        );
        updateLocalStorage(newItems);
        return { items: newItems };
      });
    },

    clearCart: () => {
      localStorage.removeItem('ocean_cart');
      set({ items: [], promoCode: null, promoDiscount: 0 });
    },

    applyPromoCode: (code) => {
      const formattedCode = code.trim().toUpperCase();
      let discount = 0;

      if (formattedCode === 'FRESH40') {
        discount = 0.40;
      } else if (formattedCode === 'BREAKFAST20') {
        discount = 0.20;
      } else if (formattedCode === 'WELCOME10') {
        discount = 0.10;
      } else {
        return false;
      }

      set({ promoCode: formattedCode, promoDiscount: discount });
      return true;
    },

    removePromoCode: () => set({ promoCode: null, promoDiscount: 0 }),

    // Computed Values
    getCartSubtotal: () => {
      return get().items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    },

    getCartDiscountAmount: () => {
      const subtotal = get().getCartSubtotal();
      return subtotal * get().promoDiscount;
    },

    getCartTaxAmount: () => {
      const subtotal = get().getCartSubtotal();
      const discount = get().getCartDiscountAmount();
      return (subtotal - discount) * get().taxRate;
    },

    getCartTotal: () => {
      const subtotal = get().getCartSubtotal();
      if (subtotal === 0) return 0;
      const discount = get().getCartDiscountAmount();
      const tax = get().getCartTaxAmount();
      const delivery = get().deliveryFee;
      return subtotal - discount + tax + delivery;
    }
  };
});
