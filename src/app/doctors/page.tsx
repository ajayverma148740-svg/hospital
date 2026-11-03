import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { 
  Users, 
  Calendar, 
  GraduationCap, 
  Clock, 
  Star, 
  ArrowRight,
  Stethoscope 
} from 'lucide-react';

export const metadata = {
  title: 'Our Doctors & Medical Specialists | Nexa Hospital Lucknow',
  description:
    'Meet our senior medical consultants and surgeons across Cardiology, Orthopaedics, Neurology, Obstetrics & Gynaecology, Paediatrics, and Laparoscopic Surgery.',
};

export const dynamic = 'force-dynamic';

export default async function DoctorsPage() {
  const doctors = await prisma.doctor.findMany({
    where: { isActive: true },
    orderBy: { experienceYears: 'desc' },
    include: {
      doctorDepartments: {
        include: {
          department: true,
        },
      },
    },
  });

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-teal-50 text-teal-700 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Stethoscope className="w-4 h-4 text-teal-600" />
            <span>Senior Medical Consultants</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-navy-950 tracking-tight">
            Meet Our Specialist Doctors
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-3">
            Experienced medical practitioners and surgeons trained at AIIMS, KGMU, and SGPGI dedicated to your wellbeing.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => {
            const primaryDept = doctor.doctorDepartments[0]?.department?.name || 'General Medicine';

            return (
              <div
                key={doctor.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-soft hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-64 overflow-hidden bg-slate-100">
                    <img
                      src={doctor.avatar || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400'}
                      alt={doctor.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center space-x-1 shadow-sm">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{doctor.rating}</span>
                      <span className="text-[10px] text-slate-400">({doctor.reviewCount})</span>
                    </div>

                    <div className="absolute bottom-3 left-3 bg-navy-950/80 backdrop-blur-md text-teal-300 text-xs font-semibold px-3 py-1 rounded-full">
                      {primaryDept}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div>
                      <h2 className="text-lg font-bold text-navy-950 group-hover:text-teal-700 transition">
                        {doctor.name}
                      </h2>
                      <p className="text-xs font-bold text-teal-700">
                        {doctor.designation}
                      </p>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-500 pt-2 border-t border-slate-100">
                      <div className="flex items-start space-x-1.5">
                        <GraduationCap className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{doctor.qualification}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="truncate">{doctor.opdSchedule}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-50 grid grid-cols-2 gap-2">
                  <Link
                    href={`/doctors/${doctor.slug}`}
                    className="text-center py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                  >
                    View Profile
                  </Link>

                  <Link
                    href="/book-appointment"
                    className="text-center py-2.5 px-3 rounded-xl text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 flex items-center justify-center space-x-1 shadow-sm transition"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book OPD</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
