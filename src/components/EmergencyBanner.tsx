'use strict';
import React from 'react';
import { PhoneCall, AlertCircle, Clock, MapPin } from 'lucide-react';

export default function EmergencyBanner() {
  return (
    <div className="bg-navy-950 text-white text-xs border-b border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap justify-between items-center gap-3">
        {/* Left Side: 24x7 Trauma & Ambulance notice */}
        <div className="flex items-center space-x-4 flex-wrap">
          <div className="flex items-center space-x-1.5 text-red-400 font-semibold animate-pulse">
            <AlertCircle className="w-4 h-4" />
            <span>24/7 EMERGENCY & TRAUMA CARE</span>
          </div>
          <span className="hidden md:inline text-navy-400">•</span>
          <div className="hidden sm:flex items-center space-x-1.5 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-turquoise-400" />
            <span>OPD: Mon–Sat 8:00 AM – 8:00 PM</span>
          </div>
          <span className="hidden lg:inline text-navy-400">•</span>
          <div className="hidden lg:flex items-center space-x-1 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-turquoise-400" />
            <span>Malhaur, Chinhat, Lucknow, UP</span>
          </div>
        </div>

        {/* Right Side: Emergency Hotline & Ambulance */}
        <div className="flex items-center space-x-3 ml-auto">
          <a
            href="tel:+919152299108"
            className="flex items-center space-x-1.5 bg-red-600 hover:bg-red-700 text-white px-2.5 py-1 rounded font-medium transition shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Ambulance: +91 91522 99108</span>
          </a>
          <a
            href="tel:+915223504999"
            className="hidden sm:flex items-center space-x-1.5 text-slate-200 hover:text-white transition"
          >
            <PhoneCall className="w-3.5 h-3.5 text-turquoise-400" />
            <span>Hospital: 0522 350 4999</span>
          </a>
        </div>
      </div>
    </div>
  );
}
