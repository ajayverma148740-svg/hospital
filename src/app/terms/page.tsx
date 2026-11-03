import React from 'react';
import { FileText, ShieldCheck, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Terms and Conditions | Nexa Hospital Lucknow',
  description:
    'Terms and conditions of medical services, OPD booking policies, emergency triage regulations, and billing terms at Nexa Hospital Lucknow.',
};

export default function TermsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5 text-teal-600" />
            <span>Clinical Terms of Service</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-navy-950">
            Terms and Conditions
          </h1>
          <p className="text-xs text-slate-500">
            Nexa Hospital, Lucknow, Uttar Pradesh • Effective 2025
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-soft space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy-950">
              1. OPD Appointment Policy
            </h2>
            <p>
              Online appointments scheduled through this website represent reserved consultation slots with the chosen specialist. While our clinical coordinators strive to minimize wait times, emergency trauma cases and acute resuscitations in the ICU may cause unexpected delays. We request patients to arrive 15 minutes before the allocated slot for baseline vitals recording.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy-950">
              2. Emergency & Trauma Triage Priority
            </h2>
            <p>
              Patients entering through the 24x7 Emergency & Trauma Department are evaluated via the standard triage protocol (Red, Yellow, Green). Critical life-threatening emergencies receive immediate priority over non-urgent outpatient requests.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy-950">
              3. Cashless Mediclaim & Insurance
            </h2>
            <p>
              Cashless hospital admission is subject to pre-authorization approval from your designated Third Party Administrator (TPA) or insurance underwriter. Disallowed items, non-medical consumables, and deductible limits are the financial responsibility of the patient/attendant as per the insurer's policy terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy-950">
              4. Patient Rights & Responsibilities
            </h2>
            <p>
              Patients have the right to receive respectful care, complete information regarding their diagnosis, proposed surgical procedures, alternative treatments, and transparent cost estimates. Patients are expected to furnish accurate medical history, existing medications, and allergies to ensure clinical safety.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy-950">
              5. Governing Law & Jurisdiction
            </h2>
            <p>
              These terms are governed in accordance with the laws of India. Any clinical dispute or claim shall be subject exclusively to the courts of Lucknow, Uttar Pradesh.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
