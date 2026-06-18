import React, { useState } from 'react';
import { Phone, ArrowRight, Loader2, ShoppingBag } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

const Login: React.FC = () => {
  const [phone, setPhone] = useState('');
  const { sendOtp, isLoading, error, setStep } = useAuthStore();
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    // Basic Validation
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setLocalError('Please enter a valid 10-digit mobile number.');
      return;
    }

    const success = await sendOtp(cleanPhone);
    if (!success) {
      // Errors will be managed globally in store, but we can log
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-white h-full animate-fade-in p-6">
      
      {/* Top Brand Block */}
      <div className="flex flex-col items-center text-center pt-8">
        <div className="bg-brand-50 text-brand-600 p-4 rounded-[24px] mb-4">
          <ShoppingBag className="w-10 h-10 stroke-[2.5]" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-800">Welcome Back</h2>
        <p className="text-sm text-slate-400 mt-1 font-semibold">Sign in to order your daily fresh groceries</p>
      </div>

      {/* Main Login Form */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-center gap-6 my-6">
        <div>
          <label htmlFor="phone" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Mobile Number
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 font-bold text-sm">
              +1
            </span>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder=" (555) 000-0000"
              disabled={isLoading}
              className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none text-sm font-semibold transition-all"
            />
            <Phone className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Error Message display */}
        {(localError || error) && (
          <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-xl text-xs font-semibold animate-fade-in">
            {localError || error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !phone}
          className="w-full bg-brand-600 hover:bg-brand-700 disabled:bg-slate-200 disabled:shadow-none text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-100 transition-all active:scale-95"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Sending OTP...</span>
            </>
          ) : (
            <>
              <span>Send Verification Code</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      {/* Bottom Switch screen block */}
      <div className="pb-4 text-center">
        <p className="text-sm text-slate-400 font-medium">
          Don't have an account?{' '}
          <button
            onClick={() => setStep('signup')}
            disabled={isLoading}
            className="text-brand-600 hover:text-brand-700 font-bold hover:underline transition-colors"
          >
            Create Account
          </button>
        </p>
      </div>

    </div>
  );
};

export default Login;
