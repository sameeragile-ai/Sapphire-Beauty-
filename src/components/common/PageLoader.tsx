import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const SESSION_LOADER_KEY = 'sapphire_beauty_intro_seen_v1';

export const PageLoader: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [shouldShow, setShouldShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion or sessionStorage
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let hasSeenIntro = false;
    try {
      hasSeenIntro = sessionStorage.getItem(SESSION_LOADER_KEY) === 'true';
    } catch {
      // storage unavailable
    }

    if (hasSeenIntro || prefersReducedMotion) {
      if (onComplete) onComplete();
      return;
    }

    setShouldShow(true);

    // Progress timer up to 100% over ~1.8s
    const startTime = Date.now();
    const duration = 1800;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          setIsExiting(true);
          try {
            sessionStorage.setItem(SESSION_LOADER_KEY, 'true');
          } catch {
            // ignore
          }
          setTimeout(() => {
            setShouldShow(false);
            if (onComplete) onComplete();
          }, 600);
        }, 200);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          key="loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#121a3d] text-white overflow-hidden"
        >
          {/* Subtle background ambient glow */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#D6336C]/20 via-[#6B2E6E]/15 to-transparent blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
            {/* Animated SVG Monogram */}
            <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full drop-shadow-[0_0_15px_rgba(240,106,155,0.4)]"
              >
                {/* Circular halo */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#FCE4EC"
                  strokeOpacity="0.2"
                  strokeWidth="1.5"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#sapphireGlow)"
                  strokeWidth="2"
                  strokeDasharray="283"
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
                  transition={{ ease: 'easeOut', duration: 0.2 }}
                />

                {/* S Path */}
                <motion.path
                  d="M 42 32 C 34 32 30 38 30 43 C 30 50 42 53 42 60 C 42 66 36 68 30 68"
                  fill="none"
                  stroke="#4E71BA"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                />

                {/* B Path */}
                <motion.path
                  d="M 52 32 L 52 68 M 52 32 C 64 32 66 48 52 50 C 66 52 66 68 52 68"
                  fill="none"
                  stroke="#D6336C"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.4, delay: 0.2, ease: 'easeInOut' }}
                />

                <defs>
                  <linearGradient id="sapphireGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1E2A5A" />
                    <stop offset="50%" stopColor="#6B2E6E" />
                    <stop offset="100%" stopColor="#D6336C" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Sparkling Gem Top */}
              <motion.div
                initial={{ scale: 0, rotate: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.4, 1],
                  rotate: [0, 45, 90],
                  opacity: 1,
                }}
                transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
                className="absolute top-2 w-3.5 h-3.5 bg-gradient-to-tr from-[#D6336C] to-[#F06A9B] rounded-xs shadow-[0_0_12px_#F06A9B]"
              />
            </div>

            {/* Letter-by-letter brand reveal */}
            <div className="overflow-hidden mb-1 flex items-center justify-center space-x-1">
              {'SAPPHIRE BEAUTY'.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.04, duration: 0.4 }}
                  className="font-serif tracking-[0.2em] font-semibold text-lg text-white"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="text-[11px] tracking-[0.25em] uppercase text-[#F06A9B] font-medium mb-6"
            >
              Kings Chase · Bristol · Est. 15+ Years
            </motion.p>

            {/* Sapphire Glow Progress Bar */}
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden p-[1px]">
              <div
                className="h-full bg-gradient-to-r from-[#1E2A5A] via-[#6B2E6E] to-[#D6336C] rounded-full transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] text-white/50 tracking-widest mt-2 tabular-nums">
              {progress}%
            </span>
          </div>
        </motion.div>
      ) : (
        /* Curtain split exit revealing hero */
        <div className="fixed inset-0 z-50 pointer-events-none flex">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: '-100%' }}
            transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
            className="w-1/2 h-full bg-[#121a3d] border-r border-[#D6336C]/20 shadow-2xl"
          />
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: '100%' }}
            transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
            className="w-1/2 h-full bg-[#121a3d] border-l border-[#D6336C]/20 shadow-2xl"
          />
        </div>
      )}
    </AnimatePresence>
  );
};
