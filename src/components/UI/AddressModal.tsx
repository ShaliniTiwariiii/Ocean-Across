import React, { useState } from 'react';
import { X, MapPin, Navigation, Loader2, Plus } from 'lucide-react';
import { useLocationStore } from '../../stores/locationStore';
import { useAuthStore } from '../../stores/authStore';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddressModal: React.FC<AddressModalProps> = ({ isOpen, onClose }) => {
  const { addresses, currentAddress, selectAddress, addAddress, detectCurrentLocation, isLoading } = useLocationStore();
  const { updateAddress } = useAuthStore();
  const [newAddr, setNewAddr] = useState('');

  if (!isOpen) return null;

  const handleSelect = (addr: string) => {
    selectAddress(addr);
    updateAddress(addr); // Sync to authStore
    onClose();
  };

  const handleDetect = async () => {
    const detected = await detectCurrentLocation();
    updateAddress(detected);
    onClose();
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAddr.trim()) {
      addAddress(newAddr.trim());
      selectAddress(newAddr.trim());
      updateAddress(newAddr.trim());
      setNewAddr('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      {/* Tap outside backdrop to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal Card container */}
      <div className="bg-white rounded-[32px] w-full max-w-md p-6 relative z-10 shadow-2xl animate-fade-in flex flex-col gap-5 border border-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-50">
          <h2 className="text-base font-extrabold text-slate-800">Delivery Location</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-50 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* GPS Detect trigger */}
        <button
          onClick={handleDetect}
          disabled={isLoading}
          className="w-full bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 border border-brand-100/10 transition-colors"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin text-brand-650" />
          ) : (
            <Navigation className="w-4 h-4 text-brand-600 fill-brand-600/10" />
          )}
          <span>{isLoading ? 'Detecting Location...' : 'Use Current Location'}</span>
        </button>

        {/* Add Address Form */}
        <form onSubmit={handleAddSubmit} className="flex gap-2">
          <input
            type="text"
            value={newAddr}
            onChange={(e) => setNewAddr(e.target.value)}
            placeholder="Add new delivery address..."
            disabled={isLoading}
            className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:bg-white outline-none"
          />
          <button
            type="submit"
            disabled={isLoading || !newAddr.trim()}
            className="bg-slate-800 hover:bg-slate-900 disabled:bg-slate-200 text-white p-2.5 rounded-xl transition-colors shrink-0"
          >
            <Plus className="w-5 h-5" />
          </button>
        </form>

        {/* List of Saved Addresses */}
        <div className="flex flex-col gap-3">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Saved Addresses</h3>
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto no-scrollbar">
            {addresses.map((addr, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(addr)}
                disabled={isLoading}
                className={`flex items-start gap-3 p-3.5 border rounded-xl text-left transition-all group ${
                  currentAddress === addr
                    ? 'border-brand-500 bg-brand-50/10'
                    : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50'
                }`}
              >
                <MapPin className={`w-5 h-5 shrink-0 mt-0.5 ${
                  currentAddress === addr ? 'text-brand-600' : 'text-slate-400 group-hover:text-brand-600'
                }`} />
                <span className={`text-xs font-semibold line-clamp-2 ${
                  currentAddress === addr ? 'text-brand-850 font-bold' : 'text-slate-600 group-hover:text-slate-800'
                }`}>
                  {addr}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AddressModal;
