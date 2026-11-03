'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  HeartPulse, 
  Bone, 
  Brain, 
  Baby, 
  Siren, 
  Activity, 
  Heart, 
  ShieldCheck, 
  ArrowRight,
  Stethoscope
} from 'lucide-react';

export default function DepartmentsSection() {
  const departments = [
    {
      name: 'Cardiology & Heart Care',
      slug: 'cardiology',
      icon: HeartPulse,
      shortDesc: '24/7 Primary Angioplasty, Cath Lab, Pacemakers, Echocardiography & Intensive Cardiac Care.',
      treatments: ['Angioplasty (PCI)', 'Heart Failure Clinic', 'Echocardiography'],
      color: 'from-rose-500 to-red-600',
      iconColor: 'text-red-500',
      bgColor: 'bg-red-50',
    },
    {
      name: 'Orthopaedics & Joint Replacement',
      slug: 'orthopaedics',
      icon: Bone,
      shortDesc: 'Computer-navigated robotic knee & hip replacement, sports ligament reconstruction, and trauma care.',
      treatments: ['Total Knee Replacement', 'Arthroscopy', 'Complex Fractures'],
      color: 'from-amber-500 to-orange-600',
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      name: 'Neurology & Neurosurgery',
      slug: 'neurology',
      icon: Brain,
      shortDesc: 'Rapid stroke thrombolysis (Code Stroke), epilepsy clinic, brain tumor surgery & neuro ICU.',
      treatments: ['Acute Stroke Care', 'Epilepsy Clinic', 'Spine Surgery'],
      color: 'from-purple-500 to-indigo-600',
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      name: 'Obstetrics & Gynaecology',
      slug: 'obstetrics-gynaecology',
      icon: Baby,
      shortDesc: 'High-risk maternity, luxury painless LDR delivery suites, laparoscopic surgeries & infertility guidance.',
      treatments: ['Painless Delivery', 'High-Risk Pregnancy', 'Laparoscopy'],
      color: 'from-pink-500 to-rose-600',
      iconColor: 'text-pink-600',
      bgColor: 'bg-pink-50',
    },
    {
      name: 'Emergency & Critical Care (ICU)',
      slug: 'emergency-trauma',
      icon: Siren,
      shortDesc: 'Round-the-clock emergency triage, acute trauma bays, multi-bed tertiary ICU & ALS ambulances.',
      treatments: ['24x7 Trauma Bay', 'Ventilator ICU', 'ALS Ambulances'],
      color: 'from-red-600 to-red-700',
      iconColor: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      name: 'General & Laparoscopic Surgery',
      slug: 'general-surgery',
      icon: Activity,
      shortDesc: 'Minimally invasive 4K keyhole surgery for gallbladder stones, hernia, appendix & proctology.',
      treatments: ['Gallbladder Stones', 'Hernia Repair', 'Laser Proctology'],
      color: 'from-teal-500 to-emerald-600',
      iconColor: 'text-teal-600',
      bgColor: 'bg-teal-50',
    },
    {
      name: 'Paediatrics & Neonatology',
      slug: 'paediatrics',
      icon: Heart,
      shortDesc: 'Level III Neonatal ICU (NICU), pediatric emergency care, child vaccinations & developmental care.',
      treatments: ['Level III NICU', 'Child Immunization', 'Pediatric Asthma'],
      color: 'from-cyan-500 to-blue-600',
      iconColor: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
    },
    {
      name: 'Nephrology & Dialysis',
      slug: 'nephrology',
      icon: ShieldCheck,
      shortDesc: '24/7 advanced hemodialysis stations with double RO water plant, kidney stones & diabetic kidney care.',
      treatments: ['Hemodialysis 24/7', 'Kidney Biopsy', 'Fistula Care'],
      color: 'from-blue-500 to-indigo-600',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-teal-50 text-teal-700 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <Stethoscope className="w-4 h-4 text-teal-600" />
              <span>Centres of Excellence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
              Our Medical Departments
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2">
              Comprehensive super-speciality care backed by leading specialists, modern diagnostic labs, 
              and state-of-the-art operation theatres.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <Link
              href="/departments"
              className="inline-flex items-center space-x-2 text-sm font-bold text-teal-600 hover:text-teal-700 group"
            >
              <span>Explore All Departments</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Department Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept) => {
            const Icon = dept.icon;
            return (
              <div
                key={dept.slug}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-soft card-hover-effect flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${dept.bgColor} flex items-center justify-center group-hover:scale-110 transition transform`}>
                      <Icon className={`w-6 h-6 ${dept.iconColor}`} />
                    </div>
                    <span className="text-xs font-bold text-slate-400 group-hover:text-teal-600 transition">
                      Speciality
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-navy-950 group-hover:text-teal-700 transition">
                    {dept.name}
                  </h3>

                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {dept.shortDesc}
                  </p>

                  {/* Key Treatments Pills */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {dept.treatments.map((treatment) => (
                      <span
                        key={treatment}
                        className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                      >
                        {treatment}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 flex items-center justify-between">
                  <Link
                    href={`/departments/${dept.slug}`}
                    className="text-xs font-bold text-teal-600 hover:text-teal-800 flex items-center space-x-1"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/book-appointment"
                    className="text-xs font-semibold text-slate-500 hover:text-navy-950 bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded"
                  >
                    Book OPD
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
