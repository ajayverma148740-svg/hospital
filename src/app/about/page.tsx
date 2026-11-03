import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Heart, 
  Award, 
  Users, 
  Target, 
  Compass, 
  CheckCircle,
  Calendar,
  Building
} from 'lucide-react';

export const metadata = {
  title: 'About Nexa Hospital Lucknow | Clinical Excellence & NABH Quality',
  description:
    'Learn about Nexa Hospital Lucknow, our vision, medical leadership, NABH safety protocols, advanced ICU infrastructure, and community service across Uttar Pradesh.',
};

export default function AboutPage() {
  const leadership = [
    {
      name: 'Dr. Vikram Malhotra',
      role: 'Medical Director & Chief of Surgery',
      qualification: 'MBBS, MS, MCh (AIIMS)',
      bio: 'Over 24 years of surgical leadership guiding Nexa Hospital’s clinical governance and patient safety standards.',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    },
    {
      name: 'Dr. Arun V. Sharma',
      role: 'Director - Cardiology Sciences',
      qualification: 'MBBS, MD, DM (Cardiology) - AIIMS New Delhi',
      bio: 'Leading interventional cardiologist with over 4,500 emergency angioplasties and clinical research publications.',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    },
    {
      name: 'Dr. Priya Awasthi',
      role: 'Head - Obstetrics, Gynaecology & Fetal Medicine',
      qualification: 'MBBS, MS (OBGYN) - KGMU Lucknow',
      bio: 'Distinguished pioneer of patient-first painless natural delivery suites and high-risk maternal intensive care.',
      image: 'https://images.unsplash.com/photo-1594824813682-12797e88b63e?auto=format&fit=crop&q=80&w=400',
    },
  ];

  const milestones = [
    { year: '2016', event: 'Founded as a dedicated medical care facility in Chinhat, Lucknow.' },
    { year: '2018', event: 'Commissioned 24x7 Digital Flat-Panel Cardiac Cath Lab & Primary PCI Unit.' },
    { year: '2020', event: 'Expanded to 150-bed multi-speciality tertiary setup with Class 100 Modular OTs.' },
    { year: '2022', event: 'Achieved full NABH Accreditation and Empanelment with major TPAs & PM-JAY.' },
    { year: '2025', event: 'Over 50,000 satisfied patients healed with 99.4% clinical excellence satisfaction.' },
  ];

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="bg-navy-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000"
            alt="Nexa Hospital Infrastructure"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-teal-500/20 border border-teal-400/30 px-3.5 py-1 rounded-full text-xs font-bold text-teal-300">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Dedicated to Healing Lucknow with Dignity</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            About Nexa Hospital
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg font-light">
            Bringing tertiary healthcare, advanced medical technology, and honest clinical ethics to the heart of Uttar Pradesh.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-soft space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-navy-950">Our Mission</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                To provide world-class, accessible, and transparent tertiary healthcare to every citizen in Lucknow and surrounding regions. We combine leading clinical specialists, state-of-the-art diagnostic technology, and compassionate nursing care to ensure optimum patient healing and human dignity.
              </p>
            </div>

            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-soft space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-navy-950">Our Vision</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                To be North India’s most trusted center of healing, renowned for zero-compromise clinical standards, technological innovation, ethical medicine, and rapid emergency intervention during the critical golden hour.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider block mb-2">
              Clinical Governance
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950">
              Meet Our Medical Leadership
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Experienced medical directors ensuring high NABH compliance, surgical excellence, and ethical healthcare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((leader) => (
              <div
                key={leader.name}
                className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 shadow-soft p-6 flex flex-col justify-between"
              >
                <div>
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-24 h-24 rounded-2xl object-cover mb-4 border-2 border-white shadow-md"
                  />
                  <h3 className="text-lg font-bold text-navy-950">{leader.name}</h3>
                  <p className="text-xs font-bold text-teal-700">{leader.role}</p>
                  <p className="text-[11px] text-slate-400 font-medium mb-3">{leader.qualification}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hospital Journey Timeline */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-navy-950">Our Journey & Milestones</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Building medical trust and infrastructure brick by brick in Lucknow.
            </p>
          </div>

          <div className="space-y-6">
            {milestones.map((m) => (
              <div key={m.year} className="flex items-start space-x-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <span className="text-lg font-black text-teal-700 bg-teal-50 px-3 py-1 rounded-xl shrink-0">
                  {m.year}
                </span>
                <p className="text-sm text-slate-700 font-medium pt-1">{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
