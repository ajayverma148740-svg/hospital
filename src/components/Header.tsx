'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HeartPulse, 
  Calendar, 
  Menu, 
  X, 
  ShieldCheck, 
  Search, 
  UserCheck 
} from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Hide public header on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Departments', href: '/departments' },
    { name: 'Our Doctors', href: '/doctors' },
    { name: 'Facilities', href: '/facilities' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 glass-nav border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Hospital Logo & Branding */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-navy-900 to-turquoise-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition transform">
              <HeartPulse className="w-6 h-6 text-turquoise-300" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-2xl font-black tracking-tight text-navy-900">
                  NEXA
                </span>
                <span className="text-2xl font-light text-turquoise-600">
                  HOSPITAL
                </span>
              </div>
              <p className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase flex items-center space-x-1">
                <span>LUCKNOW</span>
                <span className="text-navy-300">•</span>
                <span className="text-teal-600 flex items-center">
                  <ShieldCheck className="w-3 h-3 inline mr-0.5 text-teal-600" /> NABH Standards
                </span>
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-teal-700 bg-teal-50 font-semibold'
                      : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100/70'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA Actions */}
          <div className="hidden sm:flex items-center space-x-3">
            <Link
              href="/track-appointment"
              className="text-xs font-semibold text-slate-600 hover:text-navy-900 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg flex items-center space-x-1.5 transition"
              title="Track your appointment status with Appointment ID"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span>Track Status</span>
            </Link>

            <Link
              href="/book-appointment"
              className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center space-x-2 shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4 text-teal-100" />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <Link
              href="/book-appointment"
              className="bg-teal-600 text-white px-3 py-1.5 rounded-md text-xs font-semibold flex items-center space-x-1 shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slideout Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                  isActive
                    ? 'text-teal-700 bg-teal-50 font-bold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-slate-100 flex flex-col space-y-2">
            <Link
              href="/track-appointment"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200"
            >
              Check Appointment Status
            </Link>
            <Link
              href="/book-appointment"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 shadow-md"
            >
              Book an Appointment
            </Link>
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center text-xs text-slate-400 hover:text-slate-600 pt-2 flex items-center justify-center space-x-1"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Hospital Staff Portal</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
