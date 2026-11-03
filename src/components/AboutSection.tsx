'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Heart, 
  Award, 
  Stethoscope, 
  CheckCircle, 
  ArrowRight 
} from 'lucide-react';

export default function AboutSection() {
  const highlights = [
    '24/7 Level-1 Emergency & Critical Care Center',
    'Class 100 Laminar Airflow Modular Operation Theatres',
    'Flat-panel Digital Cath Lab for Emergency Angioplasty',
    'Full Cashless Mediclaim & Ayushman PM-JAY Empanelment',
    'Level III Neonatal Intensive Care Unit (NICU)',
    'Ultra-modern 24x7 In-house Pathology & Radiology Lab',
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Hospital Imagery & Experience Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1000"
                alt="Nexa Hospital Advanced Surgical Infrastructure"
                className="w-full h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-navy-950/70 via-transparent to-transparent" />
            </div>

            {/* Experience Floating Badge */}
            <div className="absolute -bottom-6 -right-6 sm:bottom-6 sm:right-6 bg-navy-900 text-white p-6 rounded-2xl shadow-xl border border-navy-700 max-w-xs">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-2xl font-black text-white">NABH</span>
                  <p className="text-[11px] text-teal-400 font-bold uppercase tracking-wider">
                    Accredited Standards
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-snug">
                Adhering to strict international patient safety protocols and clinical infection control.
              </p>
            </div>
          </div>

          {/* Right Column: About Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-teal-50 text-teal-700 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>About Nexa Hospital Lucknow</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight leading-snug">
              Transforming Healthcare in Lucknow with Compassion & Precision
            </h2>

            <p className="text-base text-slate-600 leading-relaxed font-light">
              Founded with the vision to deliver world-class tertiary healthcare at transparent, 
              honest pricing, Nexa Hospital is Lucknow’s premier medical center serving Chinhat, 
              Gomti Nagar Extension, and adjoining districts across Uttar Pradesh.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              We bring together eminent super-specialists from premier institutions like AIIMS, 
              KGMU, and SGPGI. Backed by cutting-edge medical technology and a dedicated team 
              of compassionate nurses, we put patient comfort and swift recovery at the center 
              of everything we do.
            </p>

            {/* Feature Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {highlights.map((item) => (
                <div key={item} className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-800">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex items-center space-x-4">
              <Link
                href="/about"
                className="bg-navy-900 hover:bg-navy-800 text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-md transition flex items-center space-x-2 group"
              >
                <span>Read Full Story</span>
                <ArrowRight className="w-4 h-4 text-teal-400 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/doctors"
                className="text-teal-700 hover:text-teal-800 text-sm font-bold flex items-center space-x-1.5 px-3 py-3"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Meet Medical Team</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
