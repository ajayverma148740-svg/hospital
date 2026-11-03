import React from 'react';
import { ShieldCheck, Lock, EyeOff, FileText } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy & Patient Data Protection | Nexa Hospital Lucknow',
  description:
    'Patient information privacy policy for Nexa Hospital Lucknow adhering to Digital Personal Data Protection (DPDP) Act 2023 and healthcare confidentiality standards.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5 text-teal-600" />
            <span>Healthcare Data Protection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-navy-950">
            Privacy Policy & Medical Confidentiality
          </h1>
          <p className="text-xs text-slate-500">
            Last Updated: October 2025 • Nexa Hospital, Chinhat, Lucknow
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-soft space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy-950 flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              <span>1. Commitment to Patient Confidentiality</span>
            </h2>
            <p>
              At Nexa Hospital Lucknow, safeguarding your clinical records and personal health information is our highest ethical obligation. All medical consultations, diagnostic test results, inpatient charts, and emergency triage records are treated with the utmost strict confidentiality in accordance with the <strong>Digital Personal Data Protection (DPDP) Act 2023</strong> and the <strong>National Ethical Guidelines for Biomedical and Health Research</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy-950 flex items-center space-x-2">
              <EyeOff className="w-5 h-5 text-teal-600" />
              <span>2. No Patient Health Information in Public URLs</span>
            </h2>
            <p>
              We enforce strict architectural safeguards. No patient diagnostic details, symptoms, or identification numbers are ever exposed in public URLs, search engines, or public analytics trackers. Appointment status checks are encrypted and require twin verification (Reference ID and registered mobile phone).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy-950">
              3. Information We Collect
            </h2>
            <p>
              When you book an appointment, register for OPD, or submit an enquiry, we collect:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 pl-2">
              <li>Patient full name, contact mobile phone number, email address, age, and gender.</li>
              <li>Clinical symptoms and consulting department preference.</li>
              <li>Insurance TPA card details (only when requested by the patient for cashless mediclaim pre-authorization).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy-950">
              4. Role-Based Access Control (RBAC)
            </h2>
            <p>
              Access to patient charts is strictly restricted to certified treating doctors, registered staff nurses, and authorized hospital billing executives. Every dashboard action (appointment confirmation, reschedule, or notes) is automatically audited in immutable security logs.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy-950">
              5. Contact Our Data Protection Officer
            </h2>
            <p>
              For inquiries regarding your personal healthcare records, requests for medical summaries, or privacy grievances, please write to:
            </p>
            <p className="font-semibold text-navy-950 bg-slate-50 p-4 rounded-xl border border-slate-200">
              Data Privacy & Medical Records Office<br />
              Nexa Hospital, Near Malhaur Railway Station, Nizampur, Chinhat, Lucknow, UP 226028<br />
              Email: privacy@nexahospital.com • Phone: +91 522 350 4999
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
