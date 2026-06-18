import React, { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import NectarLogo from '../../components/UI/NectarLogo';

const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, isLoading, error, setStep } = useAuthStore();
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!username.trim()) {
      setLocalError('Please enter a username.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLocalError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters long.');
      return;
    }

    // Mock Signup: advance to OTP Verification
    const success = await signUp(username.trim(), email.trim(), '1712345678');
    if (success) {
      // Step advanced to otp inside authStore
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-white h-full animate-fade-in p-6 overflow-y-auto no-scrollbar">
      
      {/* Top Carrot Logo */}
      <div className="flex justify-center pt-4 shrink-0">
        <NectarLogo onlyCarrot={true} size="md" />
      </div>

      {/* Form Area */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-center gap-4 my-4">
        {/* Title Block */}
        <div className="text-left mb-1">
          <h2 className="text-2xl font-black text-slate-800">Sign Up</h2>
          <p className="text-xs text-slate-400 font-bold mt-1">Enter your credentials to continue</p>
        </div>

        {/* Username */}
        <div className="flex flex-col gap-1 border-b border-slate-100 pb-1.5">
          <label htmlFor="username" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ahad"
            disabled={isLoading}
            className="w-full bg-transparent outline-none text-sm font-semibold text-slate-800 py-1"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1 border-b border-slate-100 pb-1.5">
          <label htmlFor="email" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            disabled={isLoading}
            className="w-full bg-transparent outline-none text-sm font-semibold text-slate-800 py-1"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1 border-b border-slate-100 pb-1.5 relative">
          <label htmlFor="password" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
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
              className="flex-1 bg-transparent outline-none text-sm font-semibold text-slate-800 py-1 pr-8"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
              className="text-slate-400 hover:text-slate-650 absolute right-1"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Terms of Service agreement */}
        <div className="text-left mt-1 text-[11px] leading-relaxed font-semibold text-slate-400">
          By continuing you agree to our{' '}
          <button type="button" className="text-brand-500 hover:underline">Terms of Service</button>
          {' '}and{' '}
          <button type="button" className="text-brand-500 hover:underline">Privacy Policy</button>.
        </div>

        {/* Local/Global errors */}
        {(localError || error) && (
          <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-2.5 rounded-xl text-xs font-semibold animate-fade-in text-center">
            {localError || error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading || !username || !email || !password}
          className="w-full bg-brand-500 hover:bg-brand-600 disabled:bg-slate-200 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-100 transition-all active:scale-95 mt-1"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Signing Up...</span>
            </>
          ) : (
            <span>Sign Up</span>
          )}
        </button>
      </form>

      {/* Login link footer */}
      <div className="pb-2 text-center shrink-0">
        <p className="text-sm text-slate-400 font-medium">
          Already have an account?{' '}
          <button
            onClick={() => setStep('login')}
            disabled={isLoading}
            className="text-brand-500 hover:text-brand-600 font-extrabold transition-colors hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>

    </div>
  );
};

export default SignUp;
