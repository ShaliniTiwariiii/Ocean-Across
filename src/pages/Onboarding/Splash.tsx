import React, { useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

const Splash: React.FC = () => {
  const { setStep } = useAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep('welcome');
    }, 2500);

    return () => clearTimeout(timer);
  }, [setStep]);

  return (
    <div className="flex-1 bg-brand-600 flex flex-col items-center justify-center p-6 text-white animate-fade-in h-full">
      <div className="flex flex-col items-center gap-4">
        {/* Animated brand icon container */}
        <div className="bg-white text-brand-600 p-6 rounded-[32px] shadow-xl animate-bounce">
          <ShoppingCart className="w-16 h-16 stroke-[2.5]" />
        </div>
        
        {/* App Title */}
        <div className="text-center mt-4">
          <h1 className="text-4xl font-extrabold tracking-tight">Ocean</h1>
          <p className="text-xs font-bold tracking-[0.3em] text-brand-200 uppercase mt-1">Across</p>
        </div>
      </div>
      
      {/* Loading indicator */}
      <div className="absolute bottom-16 flex flex-col items-center gap-3">
        <div className="flex space-x-2">
          <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce"></div>
        </div>
        <span className="text-xs font-semibold text-brand-100 uppercase tracking-widest">Fresh Grocery Delivery</span>
      </div>
    </div>
  );
};

export default Splash;
