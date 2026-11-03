'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  HeartHandshake, 
  Activity, 
  Clock, 
  DollarSign, 
  Layers, 
  Award 
} from 'lucide-react';

export default function WhyChooseSection() {
  const reasons = [
    {
      title: 'NABH-Standard Clinical Protocols',
      description: 'Zero-compromise infection control, patient rights, sterile air filtration, and standardized medication management.',
      icon: ShieldCheck,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
    },
    {
      title: 'Class 100 Laminar Modular OTs',
      description: 'Ultra-clean surgical theatres with HEPA air filters, reducing post-operative surgical site infection risks to near zero.',
      icon: Sparkles,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Flat-Panel Digital Cath Lab',
      description: '24x7 readiness for emergency angioplasties within the crucial 60-minute golden hour of heart attacks.',
      icon: Activity,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      title: '100% Cashless TPA & PM-JAY Empaneled',
      description: 'Seamless cashless admissions with Star Health, HDFC ERGO, ICICI Lombard, Niva Bupa, and Ayushman Bharat.',
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Transparent, Honest Billing',
      description: 'No hidden charges or surprise surcharges. Itemized billing shared upfront with patient family before any procedure.',
      icon: HeartHandshake,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      title: '24x7 Rapid Ambulance & Trauma Unit',
      description: 'GPS-enabled Advanced Life Support (ALS) ambulances stationed for immediate emergency retrieval across Lucknow.',
      icon: Clock,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-teal-50 text-teal-700 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-4 h-4 text-teal-600" />
            <span>The Nexa Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
            Why Lucknow Trusts Nexa Hospital
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-3">
            We blend medical science with human warmth to provide patient outcomes that inspire confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-8 rounded-3xl bg-slate-50/70 border border-slate-100 shadow-soft hover:bg-white hover:border-slate-200 hover:shadow-xl transition-all duration-300 group"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${item.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition transform`}
                >
                  <Icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <h3 className="text-lg font-bold text-navy-950 mb-2 group-hover:text-teal-700 transition">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
