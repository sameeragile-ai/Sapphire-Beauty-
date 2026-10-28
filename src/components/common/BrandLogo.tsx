import React from 'react';

interface BrandLogoProps {
  className?: string;
  showWordmark?: boolean;
  inverted?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  showWordmark = true,
  inverted = false,
  size = 'md',
}) => {
  const iconDimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  }[size];

  const textSize = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  }[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Monogram Badge */}
      <div
        className={`${iconDimensions} rounded-full bg-gradient-to-br from-[#FFF5F8] to-[#FCE4EC] border border-[#F06A9B]/30 flex items-center justify-center shadow-xs relative overflow-hidden shrink-0 group`}
      >
        {/* Faceted pink gemstone on top */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 bg-[#D6336C] rounded-xs shadow-[0_0_4px_#F06A9B]" />

        {/* SB Monogram */}
        <div className="flex items-center justify-center -space-x-0.5 mt-0.5">
          <span className="font-serif font-black text-sm tracking-tighter text-[#1E2A5A] leading-none">
            S
          </span>
          <span className="font-serif font-black text-sm tracking-tighter text-[#D6336C] leading-none">
            B
          </span>
        </div>
      </div>

      {/* Wordmark */}
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-serif tracking-tight font-bold ${textSize} transition-colors ${
              inverted ? 'text-white' : 'text-[#1E2A5A]'
            }`}
          >
            SAPPHIRE
          </span>
          <span
            className={`font-serif italic text-xs tracking-wider -mt-0.5 font-normal ${
              inverted ? 'text-[#F06A9B]' : 'text-[#D6336C]'
            }`}
          >
            beauty
          </span>
        </div>
      )}
    </div>
  );
};
