import React from 'react';
import AppointmentWidget from '@/components/AppointmentWidget';
import { Calendar, ShieldCheck, Clock, Phone, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Book Doctor Appointment Online | Nexa Hospital Lucknow',
  description:
    'Schedule your OPD consultation online at Nexa Hospital Lucknow. Real-time slot availability, instant SMS confirmation, and verified medical specialists in Chinhat.',
};

export default function BookAppointmentPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-teal-50 text-teal-700 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Calendar className="w-4 h-4 text-teal-600" />
            <span>Fast & Secure Healthcare Access</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-navy-950 tracking-tight">
            Book Hospital Appointment
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Select your department, doctor, and preferred time slot to receive immediate confirmation.
          </p>
        </div>

        {/* The Live Interactive Appointment Engine */}
        <AppointmentWidget />

        {/* Emergency Note */}
        <div className="p-6 rounded-3xl bg-red-50 border border-red-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-red-900">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-6 h-6 text-red-600 shrink-0" />
            <div>
              <span className="font-bold block">Experiencing a medical emergency or trauma?</span>
              <span>Do not wait for an OPD slot. Directly call our 24x7 Ambulance & Emergency dispatch.</span>
            </div>
          </div>
          <a
            href="tel:+919152299108"
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl shrink-0 transition"
          >
            Emergency: +91 91522 99108
          </a>
        </div>
      </div>
    </div>
  );
}
