'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  PhoneCall, 
  ShieldCheck, 
  Clock, 
  Award, 
  ArrowRight,
  MapPin,
  Activity
} from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative bg-navy-950 overflow-hidden text-white min-h-[620px] lg:min-h-[700px] flex items-center">
      {/* Background Hospital Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000"
          alt="Nexa Hospital Lucknow Modern Healthcare Facility"
          className="w-full h-full object-cover object-center opacity-30 scale-105 transform animate-pulse duration-1000"
          style={{ animationDuration: '8s' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-900/60" />
        <div className="absolute inset-0 bg-[radial-gradient(#0D9488_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Location & Trust Tag */}
            <div className="inline-flex items-center space-x-2 bg-navy-800/80 border border-teal-500/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-teal-300 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              <span>Chinhat, Lucknow, UP • 24x7 Emergency Care</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Your Health, <br />
              <span className="bg-gradient-to-r from-teal-400 via-teal-300 to-cyan-200 bg-clip-text text-transparent">
                Our Priority.
              </span>
            </h1>

            {/* Short Hospital Introduction */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-light">
              Nexa Hospital Lucknow is a premier multi-speciality tertiary medical center 
              delivering world-class clinical excellence, state-of-the-art modular OTs, 
              24/7 cardiac catheterization, and patient-first compassionate care for families 
              across Uttar Pradesh.
            </p>

            {/* Hero CTAs: Book Appointment & Emergency Call */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/book-appointment"
                className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold px-7 py-4 rounded-xl shadow-floating flex items-center justify-center space-x-2.5 transition transform hover:-translate-y-0.5 text-base"
              >
                <Calendar className="w-5 h-5 text-teal-100" />
                <span>Book Doctor Appointment</span>
                <ArrowRight className="w-4 h-4 text-teal-200" />
              </Link>

              <a
                href="tel:+919152299108"
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-4 rounded-xl shadow-lg flex items-center justify-center space-x-2.5 transition transform hover:-translate-y-0.5 text-base"
              >
                <PhoneCall className="w-5 h-5 text-red-100 animate-bounce" />
                <span>24/7 Emergency: +91 91522 99108</span>
              </a>
            </div>

            {/* Verified Quick Highlights */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-navy-800 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                <span>NABH Standard Guidelines</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Cashless TPA Insurance</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>25+ Top Medical Experts</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative">
              {/* Main Card Image */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-navy-700/80 shadow-2xl bg-navy-900 group">
                <img
                  src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=900"
                  alt="Nexa Hospital Inpatient & Diagnostic Excellence"
                  className="w-full h-[450px] object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />
                
                {/* Floating Hospital Status Overlay */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-navy-900/90 backdrop-blur-md border border-navy-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold tracking-wider text-teal-400 flex items-center space-x-1.5">
                      <Activity className="w-3.5 h-3.5 text-teal-400" />
                      <span>Live Facility Status</span>
                    </span>
                    <span className="text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      Emergency Open 24/7
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white">
                    Super-Speciality Consultations & Critical Care
                  </p>
                  <p className="text-xs text-slate-300">
                    Cath Lab • Class 100 Modular OTs • Level-III NICU • Hemodialysis
                  </p>
                </div>
              </div>

              {/* Decorative Accent Glow */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-teal-500/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
