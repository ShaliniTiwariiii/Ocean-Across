import React, { useState } from 'react';
import { User, Mail, Phone, ArrowRight, Loader2, ShoppingBag } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const { signUp, isLoading, error, setStep } = useAuthStore();
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!name.trim()) {
      setLocalError('Please enter your name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLocalError('Please enter a valid email address.');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setLocalError('Please enter a valid 10-digit mobile number.');
      return;
    }

    const success = await signUp(name.trim(), email.trim(), cleanPhone);
    if (!success) {
      // Managed in authStore error
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-white h-full animate-fade-in p-6 overflow-y-auto no-scrollbar">
      
      {/* Brand Header */}
      <div className="flex flex-col items-center text-center pt-4">
        <div className="bg-brand-50 text-brand-600 p-3 rounded-[20px] mb-3">
          <ShoppingBag className="w-8 h-8 stroke-[2.5]" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-800">Create Account</h2>
        <p className="text-xs text-slate-400 mt-1 font-semibold">Join Ocean and get fresh groceries delivered fast</p>
      </div>

      {/* Sign Up Form */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-center gap-4 my-6">
        {/* Name input */}
        <div>
          <label htmlFor="name" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Full Name
          </label>
          <div className="relative">
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              disabled={isLoading}
              className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none text-sm font-semibold transition-all"
            />
            <User className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Email input */}
        <div>
          <label htmlFor="email" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Email Address
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              disabled={isLoading}
              className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none text-sm font-semibold transition-all"
            />
            <Mail className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Phone input */}
        <div>
          <label htmlFor="phone" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
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
              className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none text-sm font-semibold transition-all"
            />
            <Phone className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Error Alerts */}
        {(localError || error) && (
          <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-2.5 rounded-xl text-xs font-semibold animate-fade-in">
            {localError || error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading || !name || !email || !phone}
          className="w-full mt-2 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-200 disabled:shadow-none text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-100 transition-all active:scale-95"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Creating Account...</span>
            </>
          ) : (
            <>
              <span>Sign Up</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      {/* Switch Screen Link */}
      <div className="pb-2 text-center">
        <p className="text-sm text-slate-400 font-medium">
          Already have an account?{' '}
          <button
            onClick={() => setStep('login')}
            disabled={isLoading}
            className="text-brand-600 hover:text-brand-700 font-bold hover:underline transition-colors"
          >
            Login
          </button>
        </p>
      </div>

    </div>
  );
};

export default SignUp;
