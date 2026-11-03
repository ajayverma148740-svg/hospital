import React from 'react';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import AboutSection from '@/components/AboutSection';
import DepartmentsSection from '@/components/DepartmentsSection';
import DoctorsSection from '@/components/DoctorsSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import FacilitiesSection from '@/components/FacilitiesSection';
import AppointmentWidget from '@/components/AppointmentWidget';
import TestimonialsSection from '@/components/TestimonialsSection';
import FaqSection from '@/components/FaqSection';
import LocationSection from '@/components/LocationSection';
import ContactSection from '@/components/ContactSection';
import { Calendar, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 2. Hero Section */}
      <HeroSection />

      {/* 3. Hospital Statistics */}
      <StatsSection />

      {/* 4. About Nexa Hospital */}
      <AboutSection />

      {/* 5. Our Medical Departments */}
      <DepartmentsSection />

      {/* 6. Meet Our Doctors */}
      <DoctorsSection />

      {/* 7. Why Choose Nexa Hospital? */}
      <WhyChooseSection />

      {/* 8. Hospital Facilities */}
      <FacilitiesSection />

      {/* 9. Patient Appointment Booking Section */}
      <section id="book-appointment" className="py-20 bg-slate-100/80 border-t border-slate-200/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center space-x-2 bg-teal-50 text-teal-700 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <Calendar className="w-4 h-4 text-teal-600" />
              <span>Real-Time OPD Booking</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
              Patient Appointment Booking
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2">
              Select your department and specialist doctor to reserve your consultation slot in under 2 minutes.
            </p>
          </div>

          <AppointmentWidget />
        </div>
      </section>

      {/* 10. Patient Testimonials (verified reviews only) */}
      <TestimonialsSection />

      {/* 11. Frequently Asked Questions */}
      <FaqSection />

      {/* 12. Hospital Location with interactive Google Map */}
      <LocationSection />

      {/* 13. Contact and enquiry form */}
      <ContactSection />
    </div>
  );
}
