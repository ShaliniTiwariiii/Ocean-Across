import React, { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import NectarLogo from '../../components/UI/NectarLogo';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { verifyOtp, isLoading, error, setStep } = useAuthStore();
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLocalError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters long.');
      return;
    }

    // Authenticate: Since it's a frontend mock, we verify by advancing to OTP verification step
    // using the phone number associated or mock phone number
    const success = await verifyOtp('123456');
    if (success) {
      // Step advanced to next (main or location) inside authStore
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-white h-full animate-fade-in p-6">
      
      {/* Top Carrot Logo */}
      <div className="flex justify-center pt-8">
        <NectarLogo onlyCarrot={true} size="md" />
      </div>

      {/* Main Form Area */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-center gap-5 my-6">
        {/* Title Block */}
        <div className="text-left mb-2">
          <h2 className="text-2xl font-black text-slate-800">Login</h2>
          <p className="text-xs text-slate-400 font-bold mt-1.5">Enter your emails and password</p>
        </div>

        {/* Email input field */}
        <div className="flex flex-col gap-1.5 border-b border-slate-100 pb-2">
          <label htmlFor="email" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            disabled={isLoading}
            className="w-full bg-transparent outline-none text-sm font-semibold text-slate-800 focus:border-brand-500 py-1.5"
          />
        </div>

        {/* Password input field */}
        <div className="flex flex-col gap-1.5 border-b border-slate-100 pb-2 relative">
          <label htmlFor="password" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Password
          </label>
          <div className="flex items-center justify-between gap-2">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading}
              className="flex-1 bg-transparent outline-none text-sm font-semibold text-slate-855 focus:border-brand-500 py-1.5 pr-8"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
              className="text-slate-400 hover:text-slate-600 focus:outline-none absolute right-1"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Forgot Password action */}
        <div className="flex justify-end -mt-2">
          <button
            type="button"
            className="text-xs font-bold text-slate-700 hover:text-brand-600 transition-colors"
          >
            Forgot Password?
          </button>
        </div>

        {/* Local/Global error banner */}
        {(localError || error) && (
          <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-2.5 rounded-xl text-xs font-semibold animate-fade-in text-center">
            {localError || error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading || !email || !password}
          className="w-full bg-brand-500 hover:bg-brand-600 disabled:bg-slate-200 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-100 transition-all active:scale-95 mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Logging In...</span>
            </>
          ) : (
            <span>Log In</span>
          )}
        </button>
      </form>

      {/* Signup link footer */}
      <div className="pb-4 text-center">
        <p className="text-sm text-slate-400 font-medium">
          Don't have an account?{' '}
          <button
            onClick={() => setStep('signup')}
            disabled={isLoading}
            className="text-brand-500 hover:text-brand-600 font-extrabold transition-colors hover:underline"
          >
            Signup
          </button>
        </p>
      </div>

    </div>
  );
};

export default Login;
