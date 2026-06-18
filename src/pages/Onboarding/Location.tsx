import React, { useState } from 'react';
import { ChevronLeft, MapPin, Loader2, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useLocationStore } from '../../stores/locationStore';

const Location: React.FC = () => {
  const { updateAddress, setStep } = useAuthStore();
  const { selectAddress } = useLocationStore();
  const [selectedZone, setSelectedZone] = useState('Banasree');
  const [selectedArea, setSelectedArea] = useState('Block A');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ZONES = ['Banasree', 'Dhanmondi', 'Gulshan', 'Uttara', 'Mirpur'];
  const AREAS = {
    Banasree: ['Block A', 'Block B', 'Block C', 'Block D'],
    Dhanmondi: ['Road 4A', 'Road 8A', 'Road 15', 'Road 27'],
    Gulshan: ['Gulshan 1', 'Gulshan 2', 'Niketan'],
    Uttara: ['Sector 3', 'Sector 4', 'Sector 7', 'Sector 11'],
    Mirpur: ['Mirpur 1', 'Mirpur 10', 'Mirpur 12', 'Pallabi'],
  };

  const activeAreas = AREAS[selectedZone as keyof typeof AREAS] || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate brief load delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const formattedAddress = `${selectedArea}, ${selectedZone}, Dhaka, Bangladesh`;
    selectAddress(formattedAddress);
    updateAddress(formattedAddress);
    setIsSubmitting(false);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-white h-full animate-fade-in p-6 overflow-y-auto no-scrollbar">
      
      {/* Top back chevron */}
      <div className="pt-2 shrink-0">
        <button
          onClick={() => setStep('otp')}
          className="text-slate-700 hover:text-slate-900 p-1 hover:bg-slate-50 rounded-xl transition-colors -ml-2"
        >
          <ChevronLeft className="w-8 h-8 stroke-[2]" />
        </button>
      </div>

      {/* Main Form Area */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-center gap-6 my-4">
        
        {/* Map Pin Illustration */}
        <div className="flex justify-center mb-2">
          <div className="relative">
            <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center border-4 border-slate-100/50">
              <MapPin className="w-16 h-16 text-brand-500 fill-brand-50/50 stroke-[1.5]" />
            </div>
            {/* Pulsing ring background detail */}
            <div className="absolute inset-0 bg-brand-500/5 rounded-full scale-110 animate-pulse -z-10"></div>
          </div>
        </div>

        {/* Header Titles */}
        <div className="text-center">
          <h2 className="text-2xl font-black text-slate-800">Select Your Location</h2>
          <p className="text-xs text-slate-400 font-bold mt-2 leading-relaxed px-4">
            Select your location and zone to continue
          </p>
        </div>

        {/* Dropdown 1: Zone */}
        <div className="flex flex-col gap-1.5 text-left">
          <label htmlFor="zone" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Your Zone
          </label>
          <select
            id="zone"
            value={selectedZone}
            onChange={(e) => {
              setSelectedZone(e.target.value);
              setSelectedArea(AREAS[e.target.value as keyof typeof AREAS][0]);
            }}
            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-650 focus:bg-white outline-none cursor-pointer"
          >
            {ZONES.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown 2: Area */}
        <div className="flex flex-col gap-1.5 text-left">
          <label htmlFor="area" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Your Area
          </label>
          <select
            id="area"
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-650 focus:bg-white outline-none cursor-pointer"
          >
            {activeAreas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-500 hover:bg-brand-600 disabled:bg-slate-200 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-100 transition-all active:scale-95 mt-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Submitting Location...</span>
            </>
          ) : (
            <>
              <span>Submit</span>
            </>
          )}
        </button>
      </form>

      <div className="h-6 shrink-0"></div>
    </div>
  );
};

export default Location;
