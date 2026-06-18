import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  otpSent: boolean;
  verificationPhone: string;
  onboardingCompleted: boolean;
  currentStep: 'splash' | 'welcome' | 'signin-selection' | 'login' | 'signup' | 'otp' | 'location' | 'main';
  
  // Actions
  setStep: (step: 'splash' | 'welcome' | 'signin-selection' | 'login' | 'signup' | 'otp' | 'location' | 'main') => void;
  sendOtp: (phone: string) => Promise<boolean>;
  verifyOtp: (otp: string) => Promise<boolean>;
  signUp: (name: string, email: string, phone: string) => Promise<boolean>;
  logout: () => void;
  updateAddress: (address: string) => void;
  completeOnboarding: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => {
  // Try to load auth state from localStorage
  const savedUser = localStorage.getItem('ocean_user');
  const userObj = savedUser ? JSON.parse(savedUser) : null;
  
  return {
    user: userObj,
    isAuthenticated: !!userObj && userObj.onboardingCompleted,
    isLoading: false,
    error: null,
    otpSent: false,
    verificationPhone: '',
    onboardingCompleted: !!userObj && userObj.onboardingCompleted,
    currentStep: userObj && userObj.onboardingCompleted ? 'main' : 'splash',

    setStep: (step) => set({ currentStep: step }),

    sendOtp: async (phone) => {
      set({ isLoading: true, error: null });
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      if (!phone || phone.length < 10) {
        set({ isLoading: false, error: 'Please enter a valid phone number.' });
        return false;
      }
      
      set({
        isLoading: false,
        otpSent: true,
        verificationPhone: phone,
        currentStep: 'otp',
      });
      return true;
    },

    verifyOtp: async (otp) => {
      set({ isLoading: true, error: null });
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (otp !== '123456' && otp.length !== 6) {
        set({ isLoading: false, error: 'Invalid verification code. Use 123456 or any 6-digit code for testing.' });
        return false;
      }

      const phone = get().verificationPhone;
      // Mock finding or creating a user
      const existingUserStr = localStorage.getItem(`ocean_user_${phone}`);
      let user: User;
      
      if (existingUserStr) {
        user = JSON.parse(existingUserStr);
      } else {
        // Create new user skeleton if logging in for first time without signup
        user = {
          name: 'Grocery Shopper',
          email: '',
          phone: phone,
          address: '',
          onboardingCompleted: false,
        };
      }

      set({
        isLoading: false,
        user,
        currentStep: user.address ? 'main' : 'location',
      });
      
      localStorage.setItem('ocean_user', JSON.stringify(user));
      return true;
    },

    signUp: async (name, email, phone) => {
      set({ isLoading: true, error: null });
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (!name || !email || !phone) {
        set({ isLoading: false, error: 'All fields are required.' });
        return false;
      }

      const newUser: User = {
        name,
        email,
        phone,
        address: '',
        onboardingCompleted: false,
      };

      // Store in phone lookup
      localStorage.setItem(`ocean_user_${phone}`, JSON.stringify(newUser));
      
      set({
        isLoading: false,
        verificationPhone: phone,
        otpSent: true,
        currentStep: 'otp',
      });
      return true;
    },

    logout: () => {
      localStorage.removeItem('ocean_user');
      set({
        user: null,
        isAuthenticated: false,
        otpSent: false,
        verificationPhone: '',
        currentStep: 'login',
      });
    },

    updateAddress: (address) => {
      const user = get().user;
      if (!user) return;

      const updatedUser = { ...user, address, onboardingCompleted: true };
      localStorage.setItem('ocean_user', JSON.stringify(updatedUser));
      localStorage.setItem(`ocean_user_${user.phone}`, JSON.stringify(updatedUser));

      set({
        user: updatedUser,
        isAuthenticated: true,
        onboardingCompleted: true,
        currentStep: 'main',
      });
    },

    completeOnboarding: () => {
      set({ onboardingCompleted: true });
    }
  };
});
