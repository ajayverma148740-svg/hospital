'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What are the OPD consultation timings at Nexa Hospital?',
      answer:
        'Our Outpatient Department (OPD) operates Monday to Saturday from 08:00 AM to 08:00 PM across all specialities. Select senior consultants are also available for Sunday clinics from 09:00 AM to 02:00 PM. Emergency and Trauma services operate 24 hours, 7 days a week.',
    },
    {
      question: 'Does Nexa Hospital offer cashless treatment for health insurance policies?',
      answer:
        'Yes. Nexa Hospital is empaneled with all major government and private TPAs/insurers including Star Health, HDFC ERGO, ICICI Lombard, Care Health, Niva Bupa, Bajaj Allianz, New India Assurance, and Ayushman Bharat (PM-JAY). Our 24/7 dedicated TPA desk manages pre-authorization and quick claim approvals.',
    },
    {
      question: 'How do I book an emergency ambulance in Lucknow?',
      answer:
        'You can instantly dial our 24/7 Emergency & Critical Ambulance Helpline at +91 91522 99108 or our direct hospital line +91 522 350 4999. Our Advanced Life Support (ALS) ambulances are equipped with defibrillators, transport ventilators, and trained emergency medical paramedics.',
    },
    {
      question: 'Can I track or reschedule my appointment online?',
      answer:
        'Yes! After booking an appointment, you receive a unique Nexa Tracking ID (e.g. NXA-2025-XXXXX) via SMS and email. You can visit the "Track Appointment" section on our website at any time to check status, download appointment slips, or reschedule your slot.',
    },
    {
      question: 'What are the patient visiting hours for Inpatient Suites and ICU?',
      answer:
        'For general and private patient suites, visiting hours are 11:00 AM to 01:00 PM and 05:00 PM to 07:00 PM (1 visitor allowed at a time with pass). For Intensive Care Units (ICU/CICU/NICU), to maintain sterile infection control, visiting is strictly restricted to 05:00 PM - 06:00 PM for immediate family members.',
    },
    {
      question: 'Where is Nexa Hospital located in Lucknow and is parking available?',
      answer:
        'Nexa Hospital is strategically situated near Malhaur Railway Station, Nizampur, Chinhat, Lucknow, UP 226028. It is conveniently accessible from Gomti Nagar Extension, Faizabad Road (Ayodhya Highway), and Shaheed Path. Ample 24/7 guarded valet parking is available on campus.',
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 bg-teal-50 text-teal-700 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-4 h-4 text-teal-600" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Find prompt answers to common inquiries about hospital services, OPD, and insurance.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left p-6 flex items-center justify-between space-x-4 focus:outline-none"
                >
                  <span className="text-base font-bold text-navy-950">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? 'bg-teal-50 text-teal-600 rotate-180' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
