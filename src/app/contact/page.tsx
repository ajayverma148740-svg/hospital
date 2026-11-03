import React from 'react';
import LocationSection from '@/components/LocationSection';
import ContactSection from '@/components/ContactSection';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export const metadata = {
  title: 'Contact Us & Campus Location | Nexa Hospital Lucknow',
  description:
    'Contact Nexa Hospital in Chinhat, Lucknow, UP. 24/7 Emergency: +91 91522 99108. Front Desk: 0522 350 4999. Driving directions via Malhaur Railway Station Road.',
};

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <section className="bg-navy-950 text-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block">
            24 Hours • 7 Days a Week
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Contact Nexa Hospital
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-light">
            We are always here to assist you with OPD appointments, emergency ambulance retrieval, and insurance queries.
          </p>
        </div>
      </section>

      {/* Interactive Map & Transport Location Section */}
      <LocationSection />

      {/* Direct Contact & Enquiry Form */}
      <ContactSection />
    </div>
  );
}
