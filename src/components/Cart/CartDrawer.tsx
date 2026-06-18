import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, Tag, ArrowRight, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const {
    items,
    updateQuantity,
    removeItem,
    promoCode,
    applyPromoCode,
    removePromoCode,
    getCartSubtotal,
    getCartDiscountAmount,
    getCartTaxAmount,
    getCartTotal,
    deliveryFee
  } = useCartStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);

  const subtotal = getCartSubtotal();
  const discount = getCartDiscountAmount();
  const tax = getCartTaxAmount();
  const total = getCartTotal();

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    if (!promoInput.trim()) return;

    const success = applyPromoCode(promoInput.trim());
    if (success) {
      setPromoInput('');
    } else {
      setPromoError('Invalid promo code. Try FRESH40 or BREAKFAST20.');
    }
  };

  const handleCheckoutClick = () => {
    onClose();
    navigate('/checkout');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
      {/* Backdrop tap to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Cart Panel Drawer container */}
      <div className="w-full max-w-md h-full bg-white flex flex-col justify-between shadow-2xl relative z-10 animate-slide-in-right p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-brand-600" />
            <h2 className="text-base font-extrabold text-slate-800">My Basket</h2>
            <span className="bg-brand-50 text-brand-700 text-xs font-bold px-2 py-0.5 rounded-full">
              {items.reduce((sum, i) => sum + i.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-650 p-2 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Items list */}
        <div className="flex-1 overflow-y-auto no-scrollbar py-4 flex flex-col gap-3">
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-3 p-3 border border-slate-150 rounded-2xl bg-white hover:border-slate-200 transition-all"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-50 border shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <span className="block text-xs font-extrabold text-slate-800 truncate">{item.product.name}</span>
                  <span className="block text-[10px] text-slate-400 font-semibold mb-1">{item.product.weight}</span>
                  <span className="text-xs font-extrabold text-slate-850">${item.product.price.toFixed(2)}</span>
                </div>

                {/* Counter control & Trash */}
                <div className="flex flex-col items-end gap-2.5">
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-slate-350 hover:text-rose-500 p-1 rounded-lg transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  
                  <div className="flex items-center bg-slate-50 border border-slate-100 rounded-lg p-0.5">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="text-brand-700 hover:bg-slate-100 p-1 rounded-md transition-colors"
                    >
                      <Minus className="w-3 h-3 stroke-[3]" />
                    </button>
                    <span className="text-xs font-bold text-slate-700 w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="text-brand-700 hover:bg-slate-100 p-1 rounded-md transition-colors"
                    >
                      <Plus className="w-3 h-3 stroke-[3]" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* Empty State */
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-12">
              <div className="bg-slate-50 p-6 rounded-full text-slate-400">
                <ShoppingCart className="w-12 h-12" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">Your Basket is Empty</h3>
              <p className="text-xs text-slate-400 max-w-[200px] font-semibold leading-relaxed">
                Add fresh grocery items to your basket to begin checkout.
              </p>
              <button
                onClick={onClose}
                className="bg-brand-50 hover:bg-brand-100 text-brand-700 px-6 py-2.5 rounded-xl font-bold text-xs transition-all"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {/* Pricing Summary Footer */}
        {items.length > 0 && (
          <div className="border-t border-slate-100 pt-4 flex flex-col gap-4 bg-white">
            {/* Promo Code Form */}
            {promoCode ? (
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 px-3.5 py-2.5 rounded-xl text-emerald-800">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold">Code applied: <span className="underline">{promoCode}</span></span>
                </div>
                <button
                  onClick={removePromoCode}
                  className="text-xs text-emerald-600 hover:text-emerald-800 font-extrabold uppercase"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="flex flex-col gap-1.5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Enter Coupon (e.g. FRESH40)"
                    className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:bg-white outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-4 rounded-xl transition-all"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <span className="text-[10px] text-rose-500 font-bold px-1">{promoError}</span>
                )}
              </form>
            )}

            {/* Calculations List */}
            <div className="flex flex-col gap-2 bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50">
              <div className="flex justify-between text-xs font-semibold text-slate-500">
                <span>Subtotal</span>
                <span className="text-slate-800 font-bold">${subtotal.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-xs font-semibold text-emerald-600">
                  <span>Coupon Discount</span>
                  <span className="font-bold">-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-xs font-semibold text-slate-500">
                <span>Delivery Fee</span>
                <span className="text-slate-800 font-bold">${deliveryFee.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-xs font-semibold text-slate-500">
                <span>Sales Tax (8%)</span>
                <span className="text-slate-800 font-bold">${tax.toFixed(2)}</span>
              </div>

              <div className="h-[1px] bg-slate-150 my-1"></div>

              <div className="flex justify-between text-sm font-extrabold text-slate-800">
                <span>Estimated Total</span>
                <span className="text-base text-brand-600 font-extrabold">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={handleCheckoutClick}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-100 transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default CartDrawer;
