import React, { useEffect } from 'react';
import NectarLogo from '../../components/UI/NectarLogo';
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
    <div className="flex-1 bg-brand-500 flex flex-col items-center justify-center p-6 text-white animate-fade-in h-full relative">
      <div className="flex flex-col items-center gap-4">
        {/* White Carrot and Nectar text brand logo */}
        <NectarLogo color="white" size="lg" />
      </div>
      
      {/* Loading spacer */}
      <div className="absolute bottom-16 flex flex-col items-center gap-3">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default Splash;
