'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  GraduationCap, 
  Star, 
  ArrowRight, 
  Users, 
  CheckCircle2 
} from 'lucide-react';

export default function DoctorsSection() {
  const doctors = [
    {
      id: 'dr-arun-v-sharma',
      name: 'Dr. Arun V. Sharma',
      designation: 'Director & Chief Interventional Cardiologist',
      department: 'Cardiology & Heart Care',
      qualification: 'MBBS, MD, DM (Cardiology) - AIIMS New Delhi',
      experience: '18+ Years Experience',
      opdSchedule: 'Mon - Sat: 10:00 AM - 02:00 PM',
      rating: 4.9,
      reviews: 342,
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=500',
    },
    {
      id: 'dr-priya-awasthi',
      name: 'Dr. Priya Awasthi',
      designation: 'Senior Consultant - Obstetrics & Gynaecology',
      department: 'Mother & Child Care',
      qualification: 'MBBS, MS (OBGYN) - KGMU, Fetal Medicine',
      experience: '14+ Years Experience',
      opdSchedule: 'Mon - Sat: 09:30 AM - 01:30 PM',
      rating: 4.95,
      reviews: 420,
      avatar: 'https://images.unsplash.com/photo-1594824813682-12797e88b63e?auto=format&fit=crop&q=80&w=500',
    },
    {
      id: 'dr-rajeshwar-singh',
      name: 'Dr. Rajeshwar Singh',
      designation: 'Head - Orthopaedics & Joint Replacement',
      department: 'Orthopaedics & Joint Care',
      qualification: 'MBBS, MS (Ortho), MCh Orth (UK)',
      experience: '20+ Years Experience',
      opdSchedule: 'Mon - Fri: 10:30 AM - 03:00 PM',
      rating: 4.88,
      reviews: 285,
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=500',
    },
    {
      id: 'dr-sameer-khan',
      name: 'Dr. Sameer Khan',
      designation: 'Senior Consultant Neurologist & Stroke Care',
      department: 'Neurology & Neurosciences',
      qualification: 'MBBS, MD, DM (Neurology) - SGPGI Lucknow',
      experience: '12+ Years Experience',
      opdSchedule: 'Mon, Wed, Fri: 11:00 AM - 04:00 PM',
      rating: 4.85,
      reviews: 194,
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=500',
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-teal-50 text-teal-700 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <Users className="w-4 h-4 text-teal-600" />
              <span>Medical Specialists</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
              Meet Our Senior Doctors
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2">
              Renowned doctors trained at premier medical institutes like AIIMS, KGMU and SGPGI, 
              bringing decades of clinical mastery to Lucknow.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <Link
              href="/doctors"
              className="inline-flex items-center space-x-2 text-sm font-bold text-teal-600 hover:text-teal-700 group"
            >
              <span>View All 25+ Doctors</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-soft card-hover-effect flex flex-col justify-between group"
            >
              <div>
                {/* Image & Rating */}
                <div className="relative h-60 overflow-hidden bg-slate-100">
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center space-x-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{doctor.rating}</span>
                    <span className="text-[10px] text-slate-400">({doctor.reviews})</span>
                  </div>

                  <div className="absolute bottom-3 left-3 bg-navy-950/80 backdrop-blur-md text-teal-300 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                    {doctor.department}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-navy-950 group-hover:text-teal-700 transition">
                      {doctor.name}
                    </h3>
                    <p className="text-xs font-semibold text-teal-700">
                      {doctor.designation}
                    </p>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <div className="flex items-start space-x-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{doctor.qualification}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="font-medium text-slate-700">{doctor.experience}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{doctor.opdSchedule}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                <Link
                  href={`/doctors/${doctor.id}`}
                  className="text-center py-2 px-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                >
                  View Profile
                </Link>
                <Link
                  href="/book-appointment"
                  className="text-center py-2 px-2 rounded-xl text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 flex items-center justify-center space-x-1 shadow-sm transition"
                >
                  <Calendar className="w-3 h-3" />
                  <span>Book OPD</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
