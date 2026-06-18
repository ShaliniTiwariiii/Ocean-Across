import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, CreditCard, ShieldCheck, DollarSign, Calendar, Landmark, Loader2 } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import { useLocationStore } from '../../stores/locationStore';
import { useAuthStore } from '../../stores/authStore';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { items, getCartSubtotal, getCartDiscountAmount, getCartTaxAmount, getCartTotal, deliveryFee, clearCart } = useCartStore();
  const { addresses, currentAddress, selectAddress } = useLocationStore();

  const [selectedAddress, setSelectedAddress] = useState(currentAddress || addresses[0] || '');
  const [deliverySlot, setDeliverySlot] = useState('slot-1');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isPlacing, setIsPlacing] = useState(false);

  const subtotal = getCartSubtotal();
  const discount = getCartDiscountAmount();
  const tax = getCartTaxAmount();
  const total = getCartTotal();

  if (items.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-xl font-extrabold text-slate-800">Your basket is empty</h2>
        <button
          onClick={() => navigate('/')}
          className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all"
        >
          Go Shopping
        </button>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    setIsPlacing(true);
    // Simulate API call for placing order
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Simulate order placement: 85% success, 15% failure for testing order error screen
    const isSuccess = Math.random() > 0.15;
    
    setIsPlacing(false);
    if (isSuccess) {
      clearCart();
      // Generate a mock order ID
      const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
      navigate('/order-success', { state: { orderId, total } });
    } else {
      navigate('/order-failure');
    }
  };

  const DELIVER_SLOTS = [
    { id: 'slot-1', time: 'Morning (08:00 AM - 12:00 PM)', label: 'Standard Morning' },
    { id: 'slot-2', time: 'Afternoon (12:00 PM - 04:00 PM)', label: 'Standard Afternoon' },
    { id: 'slot-3', time: 'Evening (04:00 PM - 08:00 PM)', label: 'Evening Express' },
  ];

  return (
    <div className="flex flex-col gap-6 pb-6 animate-fade-in">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="text-slate-500 hover:text-slate-700 p-2 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-extrabold text-slate-800">Checkout</h1>
        <div className="w-10"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Column: Checkout details */}
        <div className="flex-1 w-full flex flex-col gap-6">
          
          {/* Address Section */}
          <section className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm flex flex-col gap-4">
            <h2 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-brand-600" />
              <span>Delivery Address</span>
            </h2>
            <div className="flex flex-col gap-3">
              {addresses.map((addr, idx) => (
                <label
                  key={idx}
                  className={`flex items-start gap-3 p-4 border rounded-2xl cursor-pointer transition-all ${
                    selectedAddress === addr
                      ? 'border-brand-500 bg-brand-50/30'
                      : 'border-slate-100 bg-white hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="address"
                    value={addr}
                    checked={selectedAddress === addr}
                    onChange={() => setSelectedAddress(addr)}
                    className="mt-1 text-brand-600 focus:ring-brand-500"
                  />
                  <div className="text-xs">
                    <span className="font-extrabold text-slate-700 block">Address Option {idx + 1}</span>
                    <span className="font-medium text-slate-500 mt-1 block leading-relaxed">{addr}</span>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* Delivery Slot Selection */}
          <section className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm flex flex-col gap-4">
            <h2 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-600" />
              <span>Select Delivery Slot</span>
            </h2>
            <div className="flex flex-col gap-3">
              {DELIVER_SLOTS.map((slot) => (
                <label
                  key={slot.id}
                  className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all ${
                    deliverySlot === slot.id
                      ? 'border-brand-500 bg-brand-50/30'
                      : 'border-slate-100 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="slot"
                      value={slot.id}
                      checked={deliverySlot === slot.id}
                      onChange={() => setDeliverySlot(slot.id)}
                      className="text-brand-600 focus:ring-brand-500"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-slate-700 block">{slot.label}</span>
                      <span className="text-slate-400 font-semibold mt-0.5 block">{slot.time}</span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* Payment Method Selection */}
          <section className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm flex flex-col gap-4">
            <h2 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-brand-600" />
              <span>Payment Method</span>
            </h2>
            <div className="flex flex-col gap-3">
              {[
                { id: 'card', label: 'Credit or Debit Card', desc: 'Secure online payment', icon: <CreditCard className="w-5 h-5 text-brand-650" /> },
                { id: 'upi', label: 'UPI Payment', desc: 'Pay instantly using GPAY / PhonePe', icon: <Landmark className="w-5 h-5 text-brand-650" /> },
                { id: 'cod', label: 'Cash On Delivery', desc: 'Pay with cash or card at delivery', icon: <DollarSign className="w-5 h-5 text-brand-650" /> },
              ].map((pm) => (
                <label
                  key={pm.id}
                  className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all ${
                    paymentMethod === pm.id
                      ? 'border-brand-500 bg-brand-50/30'
                      : 'border-slate-100 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value={pm.id}
                      checked={paymentMethod === pm.id}
                      onChange={() => setPaymentMethod(pm.id)}
                      className="text-brand-600 focus:ring-brand-500"
                    />
                    <div className="flex items-center gap-2">
                      <div className="bg-slate-100 p-1.5 rounded-lg shrink-0">{pm.icon}</div>
                      <div className="text-xs">
                        <span className="font-bold text-slate-700 block">{pm.label}</span>
                        <span className="text-slate-400 font-semibold mt-0.5 block">{pm.desc}</span>
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column: Sticky Summary Panel (Mandatory Desktop) */}
        <aside className="w-full lg:w-96 lg:sticky lg:top-24 bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm flex flex-col gap-4">
          <h2 className="text-base font-extrabold text-slate-800 pb-2 border-b border-slate-50">
            Order Review
          </h2>
          
          {/* Items Preview */}
          <div className="max-h-48 overflow-y-auto no-scrollbar flex flex-col gap-3 py-2">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between items-center gap-2 text-xs font-semibold">
                <span className="text-slate-500 line-clamp-1 flex-1">
                  {item.product.name} <span className="text-slate-400 font-bold">x{item.quantity}</span>
                </span>
                <span className="text-slate-850 font-bold shrink-0">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="h-[1px] bg-slate-100"></div>

          {/* Pricing calculations */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs font-semibold text-slate-500">
              <span>Items Subtotal</span>
              <span className="text-slate-800 font-bold">${subtotal.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-xs font-semibold text-emerald-600">
                <span>Coupon Applied</span>
                <span className="font-bold">-${discount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-xs font-semibold text-slate-500">
              <span>Delivery Charge</span>
              <span className="text-slate-800 font-bold">${deliveryFee.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-xs font-semibold text-slate-500">
              <span>Sales Tax (8%)</span>
              <span className="text-slate-800 font-bold">${tax.toFixed(2)}</span>
            </div>

            <div className="h-[1px] bg-slate-100 my-1"></div>

            <div className="flex justify-between text-sm font-extrabold text-slate-800">
              <span>Order Total</span>
              <span className="text-base text-brand-600 font-extrabold">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Secure details info banner */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 p-3 rounded-xl text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-[10px] font-semibold tracking-wide">
              SSL SECURED CHECKOUT. Your payment details are encrypted.
            </span>
          </div>

          {/* Place Order CTA */}
          <button
            onClick={handlePlaceOrder}
            disabled={isPlacing}
            className="w-full bg-brand-600 hover:bg-brand-700 disabled:bg-slate-200 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-100 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            {isPlacing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing Order...</span>
              </>
            ) : (
              <span>Place Order (${total.toFixed(2)})</span>
            )}
          </button>
        </aside>

      </div>

    </div>
  );
};

export default Checkout;
