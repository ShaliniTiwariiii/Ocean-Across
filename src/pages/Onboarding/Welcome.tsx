import React from 'react';
import NectarLogo from '../../components/UI/NectarLogo';
import { useAuthStore } from '../../stores/authStore';

const Welcome: React.FC = () => {
  const { setStep } = useAuthStore();

  const handleGetStarted = () => {
    setStep('signin-selection');
  };

  return (
    <div
      className="flex-1 flex flex-col justify-end h-full animate-fade-in relative bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80')`,
      }}
    >
      {/* Dark overlay to ensure text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/30"></div>

      {/* Main Content Card (positioned at the bottom) */}
      <div className="relative z-10 p-6 pb-12 flex flex-col items-center text-center gap-6 text-white">
        
        {/* White Carrot Icon */}
        <NectarLogo color="white" onlyCarrot={true} size="lg" />

        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight">
            Welcome<br />to our store
          </h2>
          <p className="text-xs font-semibold text-white/70">
            Get your groceries in as fast as one hour
          </p>
        </div>

        {/* Get Started Button */}
        <button
          onClick={handleGetStarted}
          className="w-full bg-brand-500 hover:bg-brand-600 active:scale-98 text-white py-4.5 rounded-2xl font-bold text-sm shadow-lg shadow-black/20 transition-all mt-4"
        >
          Get Started
        </button>

      </div>
    </div>
  );
};

export default Welcome;
