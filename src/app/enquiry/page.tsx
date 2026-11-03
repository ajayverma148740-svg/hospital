import React from 'react';
import ContactSection from '@/components/ContactSection';
import { HelpCircle, Phone, FileCheck, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Patient Enquiry & TPA Helpdesk | Nexa Hospital Lucknow',
  description:
    'Submit patient queries, cashless insurance authorization help, or OPD timing questions to Nexa Hospital Lucknow.',
};

export default function EnquiryPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-teal-50 text-teal-700 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-4 h-4 text-teal-600" />
            <span>Patient Assistance Desk</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-navy-950 tracking-tight">
            Patient Enquiries & Support
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Ask our medical coordination desk about insurance empanelment, surgery packages, or OPD schedules.
          </p>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-2">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-navy-950">Direct Hospital Line</h3>
            <p className="text-xs text-slate-500">Call for immediate queries & doctor availability</p>
            <p className="text-sm font-bold text-teal-700 pt-1">+91 522 350 4999</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-navy-950">Cashless TPA Desk</h3>
            <p className="text-xs text-slate-500">Star Health, HDFC ERGO, ICICI Lombard & PM-JAY</p>
            <p className="text-sm font-bold text-emerald-700 pt-1">tpa@nexahospital.com</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-2">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-navy-950">24x7 Ambulance Dispatch</h3>
            <p className="text-xs text-slate-500">Advanced life support mobile intensive care</p>
            <p className="text-sm font-bold text-red-600 pt-1">+91 91522 99108</p>
          </div>
        </div>

        {/* Contact Form Section */}
        <ContactSection />
      </div>
    </div>
  );
}
