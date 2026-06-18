import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Loader2, RefreshCw } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

const OTP: React.FC = () => {
  const [code, setCode] = useState<string[]>(new Array(6).fill(''));
  const { verifyOtp, isLoading, error, verificationPhone, sendOtp, setStep } = useAuthStore();
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Count down resend timer
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

  // Handle typing inside single cell
  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value.replace(/\D/g, ''); // digit only
    if (!value) return;

    const newCode = [...code];
    newCode[index] = value.substring(value.length - 1); // keep last char
    setCode(newCode);

    // Shift focus to next input
    if (index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }

    // Auto submit if complete
    if (newCode.every(num => num !== '')) {
      handleOtpSubmit(newCode.join(''));
    }
  };

  // Handle backspaces
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

  const handleOtpSubmit = async (otpString: string) => {
    await verifyOtp(otpString);
  };

  const handleResend = async () => {
    if (!canResend) return;
    setCode(new Array(6).fill(''));
    setTimer(30);
    setCanResend(false);
    await sendOtp(verificationPhone);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-white h-full animate-fade-in p-6">
      
      {/* Top Header & Back Button */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setStep('login')}
          disabled={isLoading}
          className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-50 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Verification</span>
        <div className="w-10"></div> {/* Spacer to balance layout */}
      </div>

      {/* Verification Instructions */}
      <div className="flex-1 flex flex-col justify-center gap-8 my-6">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-slate-800">Enter Code</h2>
          <p className="text-sm text-slate-400 mt-2 font-medium px-4">
            We sent a 6-digit verification code to
            <span className="block font-bold text-slate-700 mt-1">
              +1 {verificationPhone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}
            </span>
          </p>
        </div>

        {/* 6 Digit Input Blocks */}
        <div className="flex justify-center gap-2.5">
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
              className="w-12 h-14 text-center text-xl font-extrabold bg-slate-50 border border-slate-100 rounded-2xl otp-input transition-all"
            />
          ))}
        </div>

        <div className="text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Test Code: <span className="text-brand-600 font-extrabold">123456</span>
          </span>
        </div>

        {/* Error Alerts */}
        {error && (
          <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-xl text-xs font-semibold animate-fade-in text-center">
            {error}
          </div>
        )}
      </div>

      {/* Footer Timer and Resend Actions */}
      <div className="pb-6 flex flex-col items-center gap-4">
        {canResend ? (
          <button
            onClick={handleResend}
            disabled={isLoading}
            className="flex items-center gap-2 text-brand-600 hover:text-brand-700 font-bold text-sm transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Resend Verification Code</span>
          </button>
        ) : (
          <p className="text-sm text-slate-400 font-medium">
            Resend code in{' '}
            <span className="text-slate-700 font-bold">
              {timer}s
            </span>
          </p>
        )}

        {isLoading && (
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold animate-pulse">
            <Loader2 className="w-4 h-4 animate-spin text-brand-600" />
            <span>Verifying code...</span>
          </div>
        )}
      </div>

    </div>
  );
};

export default OTP;
