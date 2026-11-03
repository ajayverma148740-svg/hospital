'use client';

import React from 'react';
import { 
  Users, 
  HeartHandshake, 
  Building2, 
  Activity, 
  Bed, 
  CheckCircle2 
} from 'lucide-react';

export default function StatsSection() {
  const stats = [
    {
      label: 'Specialized Doctors',
      value: '25+',
      description: 'Senior consultants from AIIMS, KGMU & SGPGI',
      icon: Users,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
    },
    {
      label: 'Patients Treated',
      value: '50,000+',
      description: 'Healed with clinical precision and compassion',
      icon: HeartHandshake,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Advanced Departments',
      value: '15+',
      description: 'Cardiac, Ortho, Neuro, Mother & Child, Surgery',
      icon: Building2,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      label: 'Emergency & ICU Care',
      value: '24/7',
      description: 'Critical care, trauma unit & ALS ambulances',
      icon: Activity,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      label: 'Inpatient Beds',
      value: '150+',
      description: 'Suite, Deluxe, Semi-Private & Day Care',
      icon: Bed,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      label: 'Patient Satisfaction',
      value: '99.4%',
      description: 'Verified positive healthcare ratings',
      icon: CheckCircle2,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
  ];

  return (
    <section className="relative -mt-12 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.label}
                className={`flex flex-col items-center text-center group ${
                  idx > 0 ? 'pt-6 lg:pt-0 lg:pl-6' : ''
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${stat.bgColor} flex items-center justify-center mb-3 group-hover:scale-110 transition transform`}
                >
                  <IconComponent className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
                  {stat.value}
                </span>
                <span className="text-sm font-bold text-slate-800 mt-1">
                  {stat.label}
                </span>
                <span className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {stat.description}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
