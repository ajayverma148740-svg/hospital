'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HeartPulse,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  ArrowUpRight,
  Heart
} from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();

  // Hide public footer on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const departments = [
    { name: 'Cardiology & Heart Care', href: '/departments/cardiology' },
    { name: 'Orthopaedics & Joint Replacement', href: '/departments/orthopaedics' },
    { name: 'Neurology & Neurosurgery', href: '/departments/neurology' },
    { name: 'Obstetrics & Gynaecology', href: '/departments/obstetrics-gynaecology' },
    { name: 'Emergency & Critical Care (ICU)', href: '/departments/emergency-trauma' },
    { name: 'General & Laparoscopic Surgery', href: '/departments/general-surgery' },
    { name: 'Paediatrics & Neonatology', href: '/departments/paediatrics' },
    { name: 'Nephrology & Dialysis', href: '/departments/nephrology' },
  ];

  const quickLinks = [
    { name: 'About Nexa Hospital', href: '/about' },
    { name: 'Meet Our Doctors', href: '/doctors' },
    { name: 'Hospital Facilities', href: '/facilities' },
    { name: 'Photo Gallery', href: '/gallery' },
    { name: 'Patient Enquiries & Help', href: '/enquiry' },
    { name: 'Track Appointment Status', href: '/track-appointment' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms & Conditions', href: '/terms' },
  ];

  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-8 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-navy-800/80">
          {/* Col 1 & 2: Hospital Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-teal-400 flex items-center justify-center text-navy-950 shadow-md">
                <HeartPulse className="w-6 h-6 text-navy-950" />
              </div>
              <div>
                <span className="text-2xl font-black text-white tracking-tight">NEXA</span>
                <span className="text-2xl font-light text-teal-400 ml-1">HOSPITAL</span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed pr-6">
              A premier multi-speciality tertiary healthcare institute in Lucknow, Uttar Pradesh. 
              Committed to clinical excellence, compassionate patient care, cutting-edge technology, 
              and transparent healthcare ethics.
            </p>

            {/* Accreditations Badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-navy-900 border border-teal-500/30 text-teal-300 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>NABH Standard Facility</span>
              </div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-navy-900 border border-slate-700 text-slate-300 text-xs font-semibold">
                <Award className="w-4 h-4 text-amber-400" />
                <span>ISO 9001:2015 Certified</span>
              </div>
            </div>

            {/* Emergency Call Box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/60 to-navy-900 border border-red-800/50 space-y-1">
              <span className="text-xs uppercase font-bold text-red-400 tracking-wider flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping mr-1"></span>
                24x7 Emergency & Ambulance
              </span>
              <p className="text-lg font-bold text-white tracking-wide">
                <a href="tel:+919152299108" className="hover:text-red-300 transition">
                  +91 91522 99108 / 0522 350 4999
                </a>
              </p>
            </div>
          </div>

          {/* Col 3: Medical Departments */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4 flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-teal-400 rounded-full"></span>
              <span>Departments</span>
            </h3>
            <ul className="space-y-2 text-sm">
              {departments.map((dept) => (
                <li key={dept.name}>
                  <Link
                    href={dept.href}
                    className="text-slate-400 hover:text-teal-400 transition-colors flex items-center group text-xs"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">{dept.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Quick Links */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4 flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-teal-400 rounded-full"></span>
              <span>Quick Links</span>
            </h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-teal-400 transition-colors text-xs"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Location & Contact */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4 flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-teal-400 rounded-full"></span>
              <span>Hospital Location</span>
            </h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>
                  Near Malhaur Railway Station, Nizampur, Chinhat, Lucknow, Uttar Pradesh 226028, India
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span>+91 522 350 4999</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>contact@nexahospital.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span>OPD: Mon–Sat 8 AM – 8 PM</span>
              </div>

              <div className="pt-2">
                <a
                  href="https://maps.app.goo.gl/kCBhC8C9eyxRQJpr8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold text-teal-400 hover:text-teal-300 transition"
                >
                  <span>Open in Google Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Staff Portal */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Nexa Hospital, Lucknow. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-slate-300 transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition">
              Terms & Conditions
            </Link>
            <Link href="/admin/login" className="text-teal-400 hover:text-teal-300 font-medium transition">
              Staff & Doctor Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
