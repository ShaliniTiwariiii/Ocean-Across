import React, { useState } from 'react';
import { MapPin, Navigation, Search, Loader2, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useLocationStore } from '../../stores/locationStore';

const Location: React.FC = () => {
  const { updateAddress } = useAuthStore();
  const { addresses, currentAddress, selectAddress, detectCurrentLocation, isLoading: locationLoading } = useLocationStore();
  const [typedAddress, setTypedAddress] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleDetectLocation = async () => {
    const detected = await detectCurrentLocation();
    // Auto-update auth store and proceed
    updateAddress(detected);
  };

  const handleSelectPredefined = (address: string) => {
    selectAddress(address);
    updateAddress(address);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typedAddress.trim()) {
      selectAddress(typedAddress.trim());
      updateAddress(typedAddress.trim());
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-white h-full animate-fade-in p-6 overflow-y-auto no-scrollbar">
      
      {/* Header Info */}
      <div className="pt-4 text-center">
        <div className="bg-brand-50 text-brand-600 p-3 rounded-[20px] inline-block mb-3">
          <MapPin className="w-8 h-8 stroke-[2.5]" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-800">Select Location</h2>
        <p className="text-xs text-slate-400 mt-1 font-semibold">
          Tell us where you want your fresh groceries delivered
        </p>
      </div>

      {/* Main Options Column */}
      <div className="flex-1 flex flex-col justify-center gap-6 my-6">
        
        {/* GPS Detection Button */}
        <button
          onClick={handleDetectLocation}
          disabled={locationLoading}
          className="w-full border-2 border-brand-600/10 bg-brand-50/50 hover:bg-brand-50 text-brand-700 py-4 px-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-98 disabled:opacity-75"
        >
          {locationLoading ? (
            <Loader2 className="w-5 h-5 animate-spin text-brand-600" />
          ) : (
            <Navigation className="w-5 h-5 text-brand-600 fill-brand-600/10" />
          )}
          <span>{locationLoading ? 'Accessing GPS...' : 'Use Current Location'}</span>
        </button>

        {/* Separator Divider */}
        <div className="flex items-center gap-3 my-2">
          <div className="h-[1px] bg-slate-100 flex-1"></div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">or search manually</span>
          <div className="h-[1px] bg-slate-100 flex-1"></div>
        </div>

        {/* Custom Address Form */}
        <form onSubmit={handleCustomSubmit} className="flex flex-col gap-2">
          <div className="relative">
            <input
              type="text"
              value={typedAddress}
              onChange={(e) => {
                setTypedAddress(e.target.value);
                setIsSearching(e.target.value.length > 0);
              }}
              placeholder="Enter street address, zip, city..."
              disabled={locationLoading}
              className="w-full pl-4 pr-10 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none text-sm font-semibold transition-all"
            />
            <Search className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>

          {typedAddress.trim() && (
            <button
              type="submit"
              disabled={locationLoading}
              className="w-full mt-2 bg-brand-600 hover:bg-brand-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <span>Confirm Address</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </form>

        {/* Predefined recent addresses */}
        {!isSearching && (
          <div className="flex flex-col gap-3">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Saved Addresses
            </h3>
            <div className="flex flex-col gap-2">
              {addresses.map((address, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectPredefined(address)}
                  disabled={locationLoading}
                  className="flex items-start gap-3 p-3.5 border border-slate-100 rounded-xl text-left bg-slate-50/50 hover:bg-slate-50 transition-all group"
                >
                  <MapPin className="w-5 h-5 text-slate-400 group-hover:text-brand-600 shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-800 line-clamp-2">
                    {address}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      <div className="h-6"></div>
    </div>
  );
};

export default Location;
