import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

export const FloatingWhatsApp: React.FC = () => {
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  return (
    <div className="fixed bottom-6 right-5 sm:right-7 z-35 flex items-end gap-3 pointer-events-auto">
      {/* Tooltip greeting */}
      {!tooltipDismissed && (
        <div className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md text-[#1E2A5A] px-3.5 py-2 rounded-2xl shadow-xl border border-[#FCE4EC] text-xs font-medium animate-bounce duration-1000">
          <span>Need an appointment or quote? WhatsApp us!</span>
          <button
            onClick={() => setTooltipDismissed(true)}
            className="text-[#1E2A5A]/40 hover:text-[#1E2A5A] ml-1 p-0.5"
            aria-label="Dismiss message"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Button with Pulse Ring */}
      <a
        href={siteConfig.contact.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
        aria-label="Chat with Sapphire Beauty on WhatsApp (07904 994275)"
      >
        {/* Pulse ring animation */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping opacity-75 duration-1000 pointer-events-none" />
        <MessageSquare className="w-6 h-6 fill-white drop-shadow-xs relative z-10" />
      </a>
    </div>
  );
};
