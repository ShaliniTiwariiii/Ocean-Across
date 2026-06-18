import { create } from 'zustand';

interface LocationState {
  addresses: string[];
  currentAddress: string | null;
  isLoading: boolean;
  
  // Actions
  addAddress: (address: string) => void;
  selectAddress: (address: string) => void;
  detectCurrentLocation: () => Promise<string>;
}

export const useLocationStore = create<LocationState>((set) => {
  // Load saved addresses from localStorage
  const savedAddresses = localStorage.getItem('ocean_addresses');
  const initialAddresses = savedAddresses 
    ? JSON.parse(savedAddresses) 
    : ['123 Green Valley, Sector 4, Metro City', '456 Sunny Hills, Park Avenue, Metro City'];
    
  const savedCurrent = localStorage.getItem('ocean_current_address');

  return {
    addresses: initialAddresses,
    currentAddress: savedCurrent || null,
    isLoading: false,

    addAddress: (address) => {
      set((state) => {
        const newAddresses = [address, ...state.addresses.filter(a => a !== address)];
        localStorage.setItem('ocean_addresses', JSON.stringify(newAddresses));
        return { addresses: newAddresses };
      });
    },

    selectAddress: (address) => {
      localStorage.setItem('ocean_current_address', address);
      set({ currentAddress: address });
    },

    detectCurrentLocation: async () => {
      set({ isLoading: true });
      // Simulate GPS API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const detectedAddress = '789 Emerald Towers, Ocean Drive, Metro City';
      
      set((state) => {
        const newAddresses = [detectedAddress, ...state.addresses.filter(a => a !== detectedAddress)];
        localStorage.setItem('ocean_addresses', JSON.stringify(newAddresses));
        localStorage.setItem('ocean_current_address', detectedAddress);
        return { 
          addresses: newAddresses,
          currentAddress: detectedAddress,
          isLoading: false 
        };
      });
      
      return detectedAddress;
    }
  };
});
