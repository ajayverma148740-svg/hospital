'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const pathname = usePathname();

  // Hide on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const phone = '919152299108';
  const text = encodeURIComponent(
    'Hello Nexa Hospital Lucknow, I would like to enquire about Doctor OPD appointments and hospital services.'
  );
  const whatsappUrl = `https://wa.me/${phone}?text=${text}`;

  return (
    <aside aria-label="WhatsApp enquiry" className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-2 group">
      {/* Tooltip on hover */}
      <span className="hidden group-hover:block bg-navy-950 text-white text-xs py-1.5 px-3 rounded-lg shadow-xl border border-navy-700 animate-fadeIn font-medium">
        Chat with Hospital Desk
      </span>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Nexa Hospital on WhatsApp"
        className="w-14 h-14 bg-gradient-to-tr from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white rounded-full flex items-center justify-center shadow-floating transition-all transform hover:scale-110 active:scale-95"
      >
        <MessageCircle className="w-7 h-7 fill-white/20 stroke-[2.2]" />
      </a>
    </aside>
  );
}
