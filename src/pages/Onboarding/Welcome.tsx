import React, { useState } from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

interface Slide {
  title: string;
  description: string;
  image: string;
  accentText: string;
}

const SLIDES: Slide[] = [
  {
    title: 'Fresh Groceries Daily',
    accentText: 'Premium Quality',
    description: 'We source fresh organic fruits, vegetables, and dairy directly from local farms to your home daily.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80',
  },
  {
    title: 'Lightning Fast Delivery',
    accentText: '30 Min Guarantee',
    description: 'Our hyper-local riders ensure your groceries reach your doorstep in under 30 minutes, fresh and crisp.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80',
  },
  {
    title: 'Hassle-Free Checkout',
    accentText: 'Secure Payments',
    description: 'Pay securely using UPI, Credit Cards, or select Cash on Delivery for absolute peace of mind.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&auto=format&fit=crop&q=80',
  },
];

const Welcome: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { setStep } = useAuthStore();

  const handleNext = () => {
    if (activeSlide < SLIDES.length - 1) {
      setActiveSlide(activeSlide + 1);
    } else {
      setStep('login');
    }
  };

  const handleSkip = () => {
    setStep('login');
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-white h-full animate-fade-in p-6">
      
      {/* Top action row */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleSkip}
          className="text-slate-400 hover:text-slate-600 text-sm font-semibold transition-colors uppercase tracking-wider"
        >
          Skip
        </button>
      </div>

      {/* Slide Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center my-6">
        <div className="w-64 h-64 rounded-[40px] overflow-hidden shadow-lg mb-8 relative border-4 border-slate-50 transition-all duration-500 transform scale-100 hover:scale-105">
          <img
            src={SLIDES[activeSlide].image}
            alt={SLIDES[activeSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-brand-700 shadow-sm uppercase tracking-wider">
            {SLIDES[activeSlide].accentText}
          </div>
        </div>

        <h2 className="text-2xl font-extrabold text-slate-800 px-4 transition-all duration-300">
          {SLIDES[activeSlide].title}
        </h2>
        
        <p className="text-sm text-slate-500 mt-4 px-6 leading-relaxed font-medium transition-all duration-300">
          {SLIDES[activeSlide].description}
        </p>
      </div>

      {/* Bottom controls */}
      <div className="flex flex-col items-center gap-6 pb-6">
        {/* Slide Indicators */}
        <div className="flex gap-2">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === activeSlide ? 'w-8 bg-brand-600' : 'w-2.5 bg-slate-200'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={handleNext}
          className="w-full bg-brand-600 hover:bg-brand-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-100 transition-all hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>{activeSlide === SLIDES.length - 1 ? 'Get Started' : 'Next'}</span>
          {activeSlide === SLIDES.length - 1 ? (
            <ArrowRight className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
      </div>

    </div>
  );
};

export default Welcome;
