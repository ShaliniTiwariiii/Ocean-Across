import React from 'react';
import { useAuthStore } from '../../stores/authStore';
import Header from '../Navigation/Header';
import BottomNavigation from '../Navigation/BottomNavigation';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  onCartToggle?: () => void;
  onAddressModalToggle?: () => void;
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  children,
  onCartToggle,
  onAddressModalToggle,
}) => {
  const { currentStep } = useAuthStore();
  const isOnboarding = ['splash', 'welcome', 'signin-selection', 'login', 'signup', 'otp', 'location'].includes(currentStep);

  if (isOnboarding) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        {/* On desktop, container mimics a modern mobile frame */}
        <div className="w-full max-w-md h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden border-8 border-slate-900 relative flex flex-col animate-fade-in md:h-[844px]">
          {/* Top notch detail for mobile mockup on desktop */}
          <div className="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-slate-900 rounded-b-2xl z-50"></div>
          
          <div className="flex-1 overflow-y-auto no-scrollbar bg-white flex flex-col">
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Header - Visible on desktop, hidden on mobile */}
      <Header onCartToggle={onCartToggle} onAddressModalToggle={onAddressModalToggle} />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 md:px-8 pb-24 md:pb-8">
        {children}
      </main>

      {/* Bottom Nav - Visible on mobile, hidden on desktop */}
      <BottomNavigation onCartToggle={onCartToggle} />
    </div>
  );
};

export default ResponsiveLayout;
