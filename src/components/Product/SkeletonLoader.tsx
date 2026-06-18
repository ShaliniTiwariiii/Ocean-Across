import React from 'react';

interface SkeletonLoaderProps {
  count?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ count = 4 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-3xl border border-slate-100 p-4 flex flex-col justify-between h-[320px] animate-pulse"
        >
          <div>
            {/* Image placeholder */}
            <div className="w-full aspect-square bg-slate-200 rounded-2xl mb-4"></div>
            
            {/* Rating placeholder */}
            <div className="h-3 bg-slate-200 rounded-md w-16 mb-2"></div>
            
            {/* Title placeholders */}
            <div className="h-4 bg-slate-200 rounded-md w-full mb-2"></div>
            <div className="h-4 bg-slate-200 rounded-md w-3/4 mb-4"></div>
          </div>
          
          {/* Footer placeholders */}
          <div className="flex justify-between items-center pt-2">
            <div className="h-6 bg-slate-200 rounded-md w-14"></div>
            <div className="h-9 w-9 bg-slate-200 rounded-xl"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;
