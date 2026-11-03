'use client';

import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin, 
  Clock 
} from 'lucide-react';

export default function ContactSection() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('General');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim() || !phone.trim() || !message.trim()) {
      setError('Please fill in your name, contact phone number, and enquiry message.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          subject: subject || `${category} Enquiry from Website`,
          category,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry. Please try again.');
      }

      setSuccess(true);
      setFullName('');
      setPhone('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      setError(err.message || 'Network error occurred. Please contact hospital directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact-form" className="py-20 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center space-x-2 bg-teal-50 text-teal-700 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                <MessageSquare className="w-4 h-4 text-teal-600" />
                <span>Patient Support & Helplines</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
                Connect With Nexa Hospital
              </h2>
              <p className="text-sm sm:text-base text-slate-500 mt-2">
                Have a question about OPD consultations, health insurance empanelment, 
                or surgical second opinions? Our medical coordinators respond promptly.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-soft">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Hospital General Desk
                  </h4>
                  <p className="text-base font-bold text-navy-950 mt-0.5">
                    +91 522 350 4999
                  </p>
                  <p className="text-xs text-slate-500">Mon - Sat: 8:00 AM - 8:00 PM</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-soft">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-red-500">
                    24/7 Emergency & ICU Ambulance
                  </h4>
                  <p className="text-base font-bold text-red-600 mt-0.5">
                    +91 91522 99108
                  </p>
                  <p className="text-xs text-slate-500">Immediate trauma dispatch across Lucknow</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-soft">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Email Inquiries
                  </h4>
                  <p className="text-sm font-bold text-navy-950 mt-0.5">
                    contact@nexahospital.com
                  </p>
                  <p className="text-xs text-slate-500">Expect a reply within 2 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Enquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl">
            <h3 className="text-2xl font-extrabold text-navy-950 mb-2">
              Send Patient Enquiry
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Fill in your details below and our patient care team will get in touch with you.
            </p>

            {success ? (
              <div className="p-8 text-center space-y-4 bg-emerald-50 rounded-2xl border border-emerald-200 animate-fadeIn">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-navy-950">
                  Enquiry Received Successfully!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Thank you for reaching out to Nexa Hospital. A dedicated patient coordinator 
                  has received your message and will call you shortly on your provided contact number.
                </p>
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="mt-2 text-xs font-bold text-teal-700 bg-teal-100 hover:bg-teal-200 px-5 py-2.5 rounded-xl transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Anil Shukla"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Phone Number (10 Digits) *
                    </label>
                    <input
                      type="tel"
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Enquiry Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="General">General Hospital Enquiry</option>
                      <option value="OPD">Doctor OPD Timings</option>
                      <option value="TPA_Insurance">Cashless TPA & Mediclaim</option>
                      <option value="Billing">Surgery Packages & Billing</option>
                      <option value="Feedback">Patient Feedback</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Subject / Concern Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Star Health Cashless admission procedure"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Message / Medical Query *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Please write your questions or medical requirements here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 px-6 rounded-xl text-sm flex items-center justify-center space-x-2 transition shadow-md disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Enquiry to Nexa Team...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Hospital Enquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
