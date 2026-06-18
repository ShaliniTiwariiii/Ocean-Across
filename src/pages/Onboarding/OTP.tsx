import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

const OTP: React.FC = () => {
  const [code, setCode] = useState<string[]>(new Array(6).fill(''));
  const { verifyOtp, isLoading, error, verificationPhone, sendOtp, setStep } = useAuthStore();
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value.replace(/\D/g, '');
    if (!value) return;

    const newCode = [...code];
    newCode[index] = value.substring(value.length - 1);
    setCode(newCode);

    if (index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      const newCode = [...code];
      if (code[index] !== '') {
        newCode[index] = '';
        setCode(newCode);
      } else if (index > 0) {
        newCode[index - 1] = '';
        setCode(newCode);
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = code.join('');
    if (otpString.length === 6) {
      await verifyOtp(otpString);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setCode(new Array(6).fill(''));
    setTimer(30);
    setCanResend(false);
    await sendOtp(verificationPhone || '1712345678');
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-white h-full animate-fade-in p-6 relative">
      
      {/* Top Navigation Chevron back */}
      <div className="pt-2">
        <button
          onClick={() => setStep('signin-selection')}
          disabled={isLoading}
          className="text-slate-700 hover:text-slate-900 p-1 hover:bg-slate-50 rounded-xl transition-colors -ml-2"
        >
          <ChevronLeft className="w-8 h-8 stroke-[2]" />
        </button>
      </div>

      {/* Main Verification Code inputs area */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-center gap-6 my-6 relative">
        <div className="text-left">
          <h2 className="text-2xl font-black text-slate-800 leading-tight">Enter your 6-digit code</h2>
          <p className="text-xs text-slate-400 font-bold mt-1">
            We sent a verification code to +880 {verificationPhone || '1712345678'}
          </p>
        </div>

        {/* Labels and boxes */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider text-left">
            Code
          </label>
          <div className="flex justify-start gap-2">
            {code.map((num, index) => (
              <input
                key={index}
                type="text"
                pattern="[0-9]*"
                inputMode="numeric"
                maxLength={1}
                ref={(el) => {
                  if (el) inputRefs.current[index] = el;
                }}
                value={num}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                disabled={isLoading}
                className="w-10 h-12 text-center text-lg font-bold bg-slate-50 border border-slate-100 rounded-xl focus:border-brand-500 focus:bg-white focus:ring-1 focus:ring-brand-100 outline-none transition-all"
              />
            ))}
          </div>
        </div>

        {/* Code helper text */}
        <div className="text-left">
          <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block">
            Test Code: <span className="text-brand-500 font-black">123456</span>
          </span>
        </div>

        {/* Errors display */}
        {error && (
          <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-2.5 rounded-xl text-xs font-semibold animate-fade-in text-left">
            {error}
          </div>
        )}

        {/* Resend actions block */}
        <div className="text-left mt-2">
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              disabled={isLoading}
              className="text-brand-500 hover:text-brand-600 font-bold text-sm hover:underline"
            >
              Resend Code
            </button>
          ) : (
            <span className="text-xs text-slate-400 font-semibold">
              Resend code in <span className="text-slate-650 font-bold">{timer}s</span>
            </span>
          )}
        </div>

        {/* Floating Button Bottom Right (Signature Nectar UI Kit style) */}
        <button
          type="submit"
          disabled={isLoading || code.some(num => num === '')}
          className="absolute bottom-6 right-0 bg-brand-500 hover:bg-brand-600 disabled:bg-slate-200 text-white p-4 rounded-full shadow-lg shadow-brand-100/50 active:scale-90 transition-all flex items-center justify-center"
          aria-label="Verify OTP"
        >
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <ChevronRight className="w-6 h-6 stroke-[3]" />
          )}
        </button>
      </form>

      <div className="h-12"></div>
    </div>
  );
};

export default OTP;
