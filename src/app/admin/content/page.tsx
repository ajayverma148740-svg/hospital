'use client';

import React, { useState, useEffect } from 'react';
import {
  FileText,
  Save,
  CheckCircle,
  HelpCircle,
  MessageSquareHeart,
  Image as ImageIcon,
  Clock,
  Phone,
  Plus,
  Trash2,
  Loader2
} from 'lucide-react';

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState<'info' | 'faqs' | 'testimonials' | 'gallery'>('info');
  const [settings, setSettings] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // General Hospital Info Form
  const [hospitalPhone, setHospitalPhone] = useState('+91 522 350 4999');
  const [emergencyPhone, setEmergencyPhone] = useState('+91 91522 99108');
  const [opdHours, setOpdHours] = useState('Mon - Sat: 08:00 AM - 08:00 PM | Sun: 09:00 AM - 02:00 PM');
  const [hospitalAddress, setHospitalAddress] = useState(
    'Near Malhaur Railway Station, Nizampur, Chinhat, Lucknow, Uttar Pradesh 226028'
  );

  // New FAQ form
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [newFaqCat, setNewFaqCat] = useState('General');

  // New Testimonial form
  const [tName, setTName] = useState('');
  const [tTreatment, setTTreatment] = useState('');
  const [tComment, setTComment] = useState('');

  // New Gallery form
  const [gTitle, setGTitle] = useState('');
  const [gCat, setGCat] = useState('Infrastructure');
  const [gUrl, setGUrl] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/cms?type=all');
      if (res.ok) {
        const data = await res.json();
        setSettings(data.settings || []);
        setFaqs(data.faqs || []);
        setTestimonials(data.testimonials || []);
        setGallery(data.gallery || []);

        // Populate fields from settings
        const phoneS = data.settings?.find((s: any) => s.key === 'phone_general');
        if (phoneS) setHospitalPhone(phoneS.value);

        const emergS = data.settings?.find((s: any) => s.key === 'phone_emergency');
        if (emergS) setEmergencyPhone(emergS.value);

        const hoursS = data.settings?.find((s: any) => s.key === 'opd_timings');
        if (hoursS) setOpdHours(hoursS.value);

        const addrS = data.settings?.find((s: any) => s.key === 'hospital_address');
        if (addrS) setHospitalAddress(addrS.value);
      }
    } catch (err) {
      console.error('Error fetching CMS:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await Promise.all([
        fetch('/api/cms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'setting', payload: { key: 'phone_general', value: hospitalPhone } }),
        }),
        fetch('/api/cms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'setting', payload: { key: 'phone_emergency', value: emergencyPhone } }),
        }),
        fetch('/api/cms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'setting', payload: { key: 'opd_timings', value: opdHours } }),
        }),
        fetch('/api/cms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'setting', payload: { key: 'hospital_address', value: hospitalAddress } }),
        }),
      ]);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving info:', err);
    }
  };

  const handleAddFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion || !newAnswer) return;

    try {
      const res = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'faq',
          payload: { question: newQuestion, answer: newAnswer, category: newFaqCat },
        }),
      });
      if (res.ok) {
        setNewQuestion('');
        setNewAnswer('');
        fetchData();
      }
    } catch (err) {
      console.error('Error adding FAQ:', err);
    }
  };

  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tName || !tComment) return;

    try {
      const res = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'testimonial',
          payload: {
            patientName: tName,
            treatment: tTreatment || 'Specialist Consultation',
            comment: tComment,
            rating: 5,
          },
        }),
      });
      if (res.ok) {
        setTName('');
        setTTreatment('');
        setTComment('');
        fetchData();
      }
    } catch (err) {
      console.error('Error adding testimonial:', err);
    }
  };

  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gTitle || !gUrl) return;

    try {
      const res = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'gallery',
          payload: {
            title: gTitle,
            category: gCat,
            imageUrl: gUrl,
          },
        }),
      });
      if (res.ok) {
        setGTitle('');
        setGUrl('');
        fetchData();
      }
    } catch (err) {
      console.error('Error adding gallery item:', err);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-navy-950 tracking-tight">
          Website Content Management (CMS)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Update phone numbers, OPD hours, FAQs, patient testimonials, and infrastructure photos.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 space-x-6 text-xs font-bold">
        <button
          onClick={() => setActiveTab('info')}
          className={`pb-3 transition flex items-center space-x-1.5 ${
            activeTab === 'info'
              ? 'text-teal-700 border-b-2 border-teal-600'
              : 'text-slate-500 hover:text-navy-950'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Hospital Info & Hours</span>
        </button>

        <button
          onClick={() => setActiveTab('faqs')}
          className={`pb-3 transition flex items-center space-x-1.5 ${
            activeTab === 'faqs'
              ? 'text-teal-700 border-b-2 border-teal-600'
              : 'text-slate-500 hover:text-navy-950'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>FAQs ({faqs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('testimonials')}
          className={`pb-3 transition flex items-center space-x-1.5 ${
            activeTab === 'testimonials'
              ? 'text-teal-700 border-b-2 border-teal-600'
              : 'text-slate-500 hover:text-navy-950'
          }`}
        >
          <MessageSquareHeart className="w-4 h-4" />
          <span>Testimonials ({testimonials.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('gallery')}
          className={`pb-3 transition flex items-center space-x-1.5 ${
            activeTab === 'gallery'
              ? 'text-teal-700 border-b-2 border-teal-600'
              : 'text-slate-500 hover:text-navy-950'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Gallery ({gallery.length})</span>
        </button>
      </div>

      {/* TAB 1: HOSPITAL INFO */}
      {activeTab === 'info' && (
        <form
          onSubmit={handleSaveInfo}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft max-w-2xl space-y-4 text-xs"
        >
          {saveSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Hospital contact info updated successfully!</span>
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              General Front Desk Phone Number
            </label>
            <input
              type="text"
              value={hospitalPhone}
              onChange={(e) => setHospitalPhone(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-xl"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              24/7 Emergency & Critical Ambulance Line
            </label>
            <input
              type="text"
              value={emergencyPhone}
              onChange={(e) => setEmergencyPhone(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-xl font-bold text-red-600"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              OPD Timings Text
            </label>
            <input
              type="text"
              value={opdHours}
              onChange={(e) => setOpdHours(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-xl"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Hospital Campus Address (Lucknow)
            </label>
            <textarea
              rows={2}
              value={hospitalAddress}
              onChange={(e) => setHospitalAddress(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-xl"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-6 rounded-xl flex items-center space-x-1.5 shadow-md transition"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Hospital Information</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: FAQS */}
      {activeTab === 'faqs' && (
        <div className="space-y-6">
          {/* Add New FAQ */}
          <form
            onSubmit={handleAddFaq}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft max-w-2xl space-y-3 text-xs"
          >
            <span className="font-bold text-sm text-navy-950 block">Add New Frequently Asked Question</span>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Question</label>
              <input
                type="text"
                required
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="e.g. Do you have cashless facility for Bajaj Allianz?"
                className="w-full p-2.5 border border-slate-300 rounded-xl"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Answer</label>
              <textarea
                rows={2}
                required
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                placeholder="Detailed helpful answer..."
                className="w-full p-2.5 border border-slate-300 rounded-xl"
              />
            </div>
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-xl flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add FAQ</span>
            </button>
          </form>

          {/* Existing FAQs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1 text-xs">
                <span className="font-bold text-navy-950 block">{faq.question}</span>
                <p className="text-slate-600">{faq.answer}</p>
                <span className="text-[10px] text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded inline-block mt-2">
                  {faq.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: TESTIMONIALS */}
      {activeTab === 'testimonials' && (
        <div className="space-y-6">
          <form
            onSubmit={handleAddTestimonial}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft max-w-2xl space-y-3 text-xs"
          >
            <span className="font-bold text-sm text-navy-950 block">Add Patient Testimonial</span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Patient Name</label>
                <input
                  type="text"
                  required
                  value={tName}
                  onChange={(e) => setTName(e.target.value)}
                  placeholder="e.g. Smt. Radha Sharma"
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Treatment Received</label>
                <input
                  type="text"
                  value={tTreatment}
                  onChange={(e) => setTTreatment(e.target.value)}
                  placeholder="e.g. Total Knee Replacement"
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Patient Review Comment</label>
              <textarea
                rows={2}
                required
                value={tComment}
                onChange={(e) => setTComment(e.target.value)}
                placeholder="Share the patient's positive experience..."
                className="w-full p-2.5 border border-slate-300 rounded-xl"
              />
            </div>
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-xl flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Testimonial</span>
            </button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map((t) => (
              <div key={t.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1 text-xs">
                <span className="font-bold text-navy-950 block">{t.patientName}</span>
                <span className="text-[11px] text-teal-700 block">{t.treatment}</span>
                <p className="text-slate-600 italic">"{t.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: GALLERY */}
      {activeTab === 'gallery' && (
        <div className="space-y-6">
          <form
            onSubmit={handleAddGallery}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft max-w-2xl space-y-3 text-xs"
          >
            <span className="font-bold text-sm text-navy-950 block">Add Photo to Hospital Gallery</span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Photo Title</label>
                <input
                  type="text"
                  required
                  value={gTitle}
                  onChange={(e) => setGTitle(e.target.value)}
                  placeholder="e.g. High-Tech Cath Lab"
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={gCat}
                  onChange={(e) => setGCat(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl bg-white"
                >
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Operation Theatre">Operation Theatre</option>
                  <option value="ICU & Rooms">ICU & Rooms</option>
                  <option value="Diagnostics">Diagnostics</option>
                  <option value="Events">Events</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Image URL</label>
              <input
                type="url"
                required
                value={gUrl}
                onChange={(e) => setGUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full p-2.5 border border-slate-300 rounded-xl"
              />
            </div>
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-xl flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Gallery</span>
            </button>
          </form>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {gallery.map((g) => (
              <div key={g.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                <img src={g.imageUrl} alt={g.title} className="w-full h-32 object-cover" />
                <div className="p-3">
                  <span className="font-bold text-xs text-navy-950 block truncate">{g.title}</span>
                  <span className="text-[10px] text-teal-700">{g.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
