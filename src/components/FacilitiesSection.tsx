'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building, 
  Activity, 
  Pill, 
  Bed, 
  Truck, 
  Microscope, 
  ArrowRight 
} from 'lucide-react';

export default function FacilitiesSection() {
  const facilities = [
    {
      title: 'Multidisciplinary Tertiary ICU & CICU',
      description: 'Equipped with invasive hemodynamic monitoring, high-end Hamilton ventilators, and continuous intensivist oversight.',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
      badge: '24/7 Monitored',
      icon: Activity,
    },
    {
      title: 'Modular Operation Theatres',
      description: 'Laminar air flow Class 100 systems with robotic navigation and seamless antimicrobial wall cladding for surgical safety.',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800',
      badge: 'Class 100 Sterile',
      icon: Building,
    },
    {
      title: '24/7 Fully Automated Diagnostic Lab',
      description: 'NABL accredited pathology, biochemistry, 128-slice CT, high-resolution ultrasound & 1.5 Tesla MRI scanning.',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
      badge: 'Quick Digital Reports',
      icon: Microscope,
    },
    {
      title: 'Advanced Life Support (ALS) Ambulances',
      description: 'Mobile ICUs equipped with portable ventilators, cardiac defibrillators, oxygen banks, and trained paramedics.',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
      badge: 'GPS Tracked',
      icon: Truck,
    },
    {
      title: '24x7 In-House Pharmacy',
      description: 'Fully stocked with genuine pharmaceuticals, emergency life-saving injectables, and surgical consumables at MRP discounts.',
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800',
      badge: 'Genuine Medicines',
      icon: Pill,
    },
    {
      title: 'Deluxe & Suite Inpatient Rooms',
      description: 'Hygienic, sunlit patient suites with motorized beds, attendant accommodation, Wi-Fi, and emergency nurse call buttons.',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
      badge: 'Comfort Recovery',
      icon: Bed,
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-teal-50 text-teal-700 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <Building className="w-4 h-4 text-teal-600" />
              <span>World-Class Infrastructure</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
              Hospital Facilities & Amenities
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2">
              Designed around patient comfort, clinical precision, and emergency preparedness.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <Link
              href="/facilities"
              className="inline-flex items-center space-x-2 text-sm font-bold text-teal-600 hover:text-teal-700 group"
            >
              <span>Explore All Facilities</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((fac) => (
            <div
              key={fac.title}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={fac.image}
                    alt={fac.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-navy-950/80 backdrop-blur-md text-teal-300 text-xs font-bold px-3 py-1 rounded-full">
                    {fac.badge}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-navy-950 group-hover:text-teal-700 transition">
                    {fac.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                    {fac.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-50">
                <Link
                  href="/facilities"
                  className="text-xs font-bold text-teal-600 hover:text-teal-800 inline-flex items-center space-x-1"
                >
                  <span>Read Specifications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
