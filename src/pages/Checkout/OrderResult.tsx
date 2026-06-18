import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, ArrowRight, RefreshCw, Home, ShoppingBag } from 'lucide-react';

export const OrderSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { orderId?: string; total?: number } | null;

  const orderId = state?.orderId || 'ORD-984310';
  const total = state?.total || 34.50;

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white border border-slate-100 rounded-[32px] p-8 md:p-12 shadow-sm text-center max-w-md w-full flex flex-col items-center gap-6">
        
        {/* Animated Check Container */}
        <div className="bg-emerald-50 text-emerald-600 p-6 rounded-full shadow-inner animate-pulse">
          <CheckCircle2 className="w-16 h-16 stroke-[2.5]" />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-extrabold text-slate-800">Order Placed Successfully!</h1>
          <p className="text-sm text-slate-450 font-semibold px-4">
            Thank you for shopping with Ocean! Your groceries are being packed.
          </p>
        </div>

        {/* Info panel */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 w-full flex flex-col gap-2 text-xs font-semibold">
          <div className="flex justify-between text-slate-500">
            <span>Order ID</span>
            <span className="text-slate-800 font-bold">{orderId}</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Amount Paid</span>
            <span className="text-brand-605 font-bold">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Estimated Delivery</span>
            <span className="text-slate-800 font-bold">Within 30 mins</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3.5 w-full mt-2">
          <button
            onClick={() => navigate('/')}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-100 transition-all hover:-translate-y-0.5"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

export const OrderFailure: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white border border-slate-100 rounded-[32px] p-8 md:p-12 shadow-sm text-center max-w-md w-full flex flex-col items-center gap-6">
        
        {/* Animated Error X Icon */}
        <div className="bg-rose-50 text-rose-500 p-6 rounded-full shadow-inner animate-pulse">
          <XCircle className="w-16 h-16 stroke-[2.5]" />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-extrabold text-slate-800">Order Placement Failed</h1>
          <p className="text-sm text-slate-450 font-semibold px-4">
            We encountered a security/payment error while verifying your transaction. No money was deducted.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
          <button
            onClick={() => navigate('/checkout')}
            className="flex-1 bg-slate-800 hover:bg-slate-900 text-white py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry Checkout</span>
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>

      </div>
    </div>
  );
};
