export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export enum ProductCategory {
  VEGETABLES = 'Vegetables',
  FRUITS = 'Fruits',
  DAIRY = 'Dairy & Eggs',
  BAKERY = 'Bakery & Bread',
  BEVERAGES = 'Beverages',
  SNACKS = 'Snacks & Sweets',
  MEAT = 'Meat & Seafood',
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  weight: string; // e.g., "500g", "1L", "6 pcs"
  rating: number; // e.g., 4.8
  reviewCount: number;
  category: ProductCategory;
  inStock: boolean;
  isPopular?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  name: string;
  email: string;
  phone: string;
  address?: string;
  onboardingCompleted: boolean;
}
