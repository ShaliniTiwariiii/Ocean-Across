import React from 'react';

interface NectarLogoProps {
  color?: 'white' | 'brand';
  size?: 'sm' | 'md' | 'lg';
  onlyCarrot?: boolean;
  className?: string;
}

const NectarLogo: React.FC<NectarLogoProps> = ({
  color = 'brand',
  size = 'md',
  onlyCarrot = false,
  className = '',
}) => {
  const carrotSize = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  }[size];

  const textSize = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  }[size];

  const isWhite = color === 'white';

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {/* Carrot Icon SVG */}
      <svg
        className={carrotSize}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Leaf 1 */}
        <path
          d="M23.1 8.2C21.8 7.3 20 8.1 19.8 9.7C19.7 10.8 20.3 11.8 21.3 12.1C22.6 12.5 24 11.6 24.1 10.1C24.2 9.3 23.8 8.6 23.1 8.2Z"
          fill={isWhite ? '#FFFFFF' : '#53B175'}
        />
        {/* Leaf 2 */}
        <path
          d="M17.5 5.8C16.1 5.3 14.6 6.5 14.8 8.1C14.9 9.2 15.8 10 16.9 9.9C18.2 9.8 19.1 8.3 18.5 7.1C18.3 6.5 17.9 6 17.5 5.8Z"
          fill={isWhite ? '#FFFFFF' : '#489E67'}
        />
        {/* Carrot Body */}
        <path
          d="M28.4 12.2C27.1 10.9 25.1 10.9 23.8 12.2L12.3 23.7C10.1 25.9 10.1 29.5 12.3 31.7C14.5 33.9 18.1 33.9 20.3 31.7L31.8 20.2C33.1 18.9 33.1 16.9 31.8 15.6L28.4 12.2Z"
          fill={isWhite ? '#FFFFFF' : '#F3603F'}
        />
        {/* Accent lines on carrot */}
        <path
          d="M26.2 17.2L20.2 23.2"
          stroke={isWhite ? '#53B175' : '#FFFFFF'}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M22.2 14.2L18.2 18.2"
          stroke={isWhite ? '#53B175' : '#FFFFFF'}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M17.2 24.2L13.2 28.2"
          stroke={isWhite ? '#53B175' : '#FFFFFF'}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      {!onlyCarrot && (
        <div className="flex flex-col">
          <span
            className={`font-black tracking-tighter leading-none ${textSize} ${
              isWhite ? 'text-white' : 'text-slate-805'
            }`}
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            nectar
          </span>
          <span
            className={`text-[9px] font-bold tracking-[0.25em] leading-none uppercase mt-0.5 ${
              isWhite ? 'text-white/80' : 'text-slate-400'
            }`}
          >
            online groceriet
          </span>
        </div>
      )}
    </div>
  );
};

export default NectarLogo;
