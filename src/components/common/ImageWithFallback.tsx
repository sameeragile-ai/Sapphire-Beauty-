import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackText?: string;
  className?: string;
  aspectRatioClass?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackText,
  className = '',
  aspectRatioClass = 'aspect-[4/3]',
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`w-full ${aspectRatioClass} bg-gradient-to-br from-[#FCE4EC] via-[#F8C8DC] to-[#F3D5E4] flex flex-col items-center justify-center p-6 text-center select-none relative overflow-hidden ${className}`}
        aria-label={alt}
      >
        {/* Soft background glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#D6336C]/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#1E2A5A]/10 rounded-full blur-xl pointer-events-none" />

        {/* Monogram emblem */}
        <div className="relative z-10 w-12 h-12 rounded-full border border-[#D6336C]/30 flex items-center justify-center bg-white/70 shadow-sm mb-2 backdrop-blur-xs">
          <span className="font-serif font-bold text-lg text-[#1E2A5A]">
            S<span className="text-[#D6336C]">B</span>
          </span>
        </div>
        <p className="relative z-10 font-serif text-sm font-medium text-[#1E2A5A] line-clamp-2 max-w-[200px]">
          {fallbackText || alt || 'Sapphire Beauty'}
        </p>
        <span className="relative z-10 text-[10px] tracking-widest uppercase text-[#D6336C] font-semibold mt-1">
          Kingswood · Bristol
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${aspectRatioClass} ${className}`}>
      {/* Skeleton / blurred placeholder while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#FCE4EC]/50 to-[#F8C8DC]/30 animate-pulse flex items-center justify-center">
          <span className="font-serif text-xs text-[#1E2A5A]/40 tracking-wider">Loading...</span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-all duration-700 ${
          isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-sm'
        }`}
        {...rest}
      />
    </div>
  );
};
