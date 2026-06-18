import React, { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import NectarLogo from '../../components/UI/NectarLogo';
import { ArrowRight, ChevronRight, Mail, Phone } from 'lucide-react';

const SignInSelection: React.FC = () => {
  const { setStep, sendOtp, isLoading } = useAuthStore();
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length >= 10) {
      await sendOtp(cleanPhone);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-white h-full animate-fade-in p-6 overflow-y-auto no-scrollbar">
      
      {/* Top Banner Image */}
      <div className="-mx-6 -mt-6 h-56 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80"
          alt="Grocery Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent"></div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-6 pt-4">
        
        {/* Logo and Title */}
        <div className="text-left flex flex-col gap-2">
          <NectarLogo onlyCarrot={true} size="lg" className="w-fit" />
          <h2 className="text-2xl font-black text-slate-800 leading-tight">
            Get your groceries<br />with nectar
          </h2>
        </div>

        {/* Mock Country Code & Phone Input Trigger */}
        <form onSubmit={handlePhoneSubmit} className="flex flex-col gap-2">
          <div className="flex items-center gap-3 border-b border-slate-200 py-3 focus-within:border-brand-500 transition-colors">
            {/* Bangladesh Flag representation (+880 is standard in Nectar UI Kit template) */}
            <div className="flex items-center gap-1.5 shrink-0 select-none">
              <span className="text-xl" role="img" aria-label="Bangladesh Flag">🇧🇩</span>
              <span className="text-sm font-bold text-slate-700">+880</span>
            </div>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="1712345678"
              className="flex-1 outline-none text-sm font-bold text-slate-800 bg-transparent"
            />
            {phoneNumber.length >= 9 && (
              <button
                type="submit"
                disabled={isLoading}
                className="bg-brand-500 hover:bg-brand-600 text-white p-1.5 rounded-full shadow-md active:scale-90 transition-all shrink-0"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>

        {/* Divider */}
        <div className="text-center my-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            or connect with social media
          </span>
        </div>

        {/* Social Authentication Buttons */}
        <div className="flex flex-col gap-3">
          {/* Google Button */}
          <button
            onClick={() => setStep('login')}
            className="w-full bg-[#5383EC] text-white py-4 px-6 rounded-2xl font-bold flex items-center justify-between shadow-md active:scale-98 transition-all hover:bg-[#4273DF]"
          >
            {/* Google icon */}
            <div className="bg-white p-1.5 rounded-lg shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.7 12.3c0-.8-.1-1.7-.2-2.5H12v4.8h6.6c-.3 1.5-1.1 2.8-2.4 3.7v3.1h3.9c2.3-2.1 3.6-5.2 3.6-9.1z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3.1c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.2C3.3 21.3 7.4 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.3 14.2c-.2-.7-.4-1.4-.4-2.2s.2-1.5.4-2.2V6.6H1.3C.5 8.2 0 10 0 12s.5 3.8 1.3 5.4l4-3.2z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C18 1.2 15.2 0 12 0 7.4 0 3.3 2.7 1.3 6.6l4 3.2c.9-2.9 3.6-5 6.7-5z"
                />
              </svg>
            </div>
            <span className="flex-1 text-center text-sm font-bold tracking-wide">Continue with Google</span>
            <div className="w-7"></div>
          </button>

          {/* Facebook Button */}
          <button
            onClick={() => setStep('login')}
            className="w-full bg-[#4A66AC] text-white py-4 px-6 rounded-2xl font-bold flex items-center justify-between shadow-md active:scale-98 transition-all hover:bg-[#3B5598]"
          >
            <div className="bg-white p-1.5 rounded-lg shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#4A66AC">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </div>
            <span className="flex-1 text-center text-sm font-bold tracking-wide">Continue with Facebook</span>
            <div className="w-7"></div>
          </button>
        </div>

        {/* Email Fallbacks */}
        <div className="flex flex-col gap-2 mt-2">
          <button
            onClick={() => setStep('login')}
            className="w-full border border-slate-200 text-slate-650 hover:bg-slate-50 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <Mail className="w-4 h-4 text-slate-400" />
            <span>Login with Email</span>
          </button>
          
          <button
            onClick={() => setStep('signup')}
            className="w-full border border-slate-200 text-slate-650 hover:bg-slate-50 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <Mail className="w-4 h-4 text-slate-400" />
            <span>Sign Up with Email</span>
          </button>
        </div>

      </div>

      <div className="h-4"></div>
    </div>
  );
};

export default SignInSelection;
