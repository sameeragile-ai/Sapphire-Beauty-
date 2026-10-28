import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { brandImages } from '../../data/images';

export const BeforeAfterSlider: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0-100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const currentPair = brandImages.beforeAfter[activeTab];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Tab Switcher */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {brandImages.beforeAfter.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(idx);
              setSliderPosition(50);
            }}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
              activeTab === idx
                ? 'bg-sapphire-glow text-white shadow-md'
                : 'bg-white text-[#1E2A5A]/70 hover:text-[#1E2A5A] border border-[#FCE4EC]'
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* Interactive Comparison Container */}
      <div
        ref={containerRef}
        onMouseDown={() => (isDragging.current = true)}
        onMouseUp={() => (isDragging.current = false)}
        onMouseLeave={() => (isDragging.current = false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl select-none cursor-ew-resize border border-[#FCE4EC] bg-[#121a3d]"
      >
        {/* AFTER IMAGE (Underneath, Full Width) */}
        <img
          src={currentPair.after}
          alt={`After ${currentPair.title}`}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-[#121a3d]/80 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider border border-[#F06A9B]/30 flex items-center gap-1.5 shadow-sm">
          <Sparkles className="w-3 h-3 text-[#F06A9B]" />
          <span>After Treatment</span>
        </div>

        {/* BEFORE IMAGE (Clipped on top based on sliderPosition) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={currentPair.before}
            alt={`Before ${currentPair.title}`}
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
            draggable={false}
          />
          <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-[#121a3d]/80 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider border border-white/20 shadow-sm">
            Before
          </div>
        </div>

        {/* DRAG HANDLE LINE */}
        <div
          className="absolute top-0 bottom-0 z-30 w-1 bg-white shadow-[0_0_12px_rgba(214,51,108,0.6)] cursor-ew-resize"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Centered circular grip */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-sapphire-glow text-white shadow-xl flex items-center justify-center border-2 border-white">
            <div className="flex items-center -space-x-1">
              <span className="text-[10px] font-bold">◀</span>
              <span className="text-[10px] font-bold">▶</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Instruction */}
      <div className="text-center mt-4 space-y-1">
        <p className="font-serif italic text-base sm:text-lg text-[#1E2A5A]">
          {currentPair.description}
        </p>
        <span className="text-xs text-[#1E2A5A]/50 block">
          Drag slider or touch across image to compare real results
        </span>
      </div>
    </div>
  );
};
