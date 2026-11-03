import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
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

export const metadata = {
  title: 'Medical Departments & Specialities | Nexa Hospital Lucknow',
  description:
    'Explore super-speciality departments at Nexa Hospital: Cardiology, Orthopaedics, Neurology, Obstetrics & Gynaecology, ICU Trauma, General Surgery, Paediatrics, and Nephrology.',
};

export const dynamic = 'force-dynamic';

export default async function DepartmentsPage() {
  const departments = await prisma.department.findMany({
    where: { isPublished: true },
    orderBy: { sortOrder: 'asc' },
    include: {
      doctorDepartments: {
        include: {
          doctor: true,
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
            <span>Comprehensive Clinical Care</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-navy-950 tracking-tight">
            Our Medical Specialities & Departments
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-3">
            Offering multidisciplinary tertiary healthcare across all major disciplines under one roof in Chinhat, Lucknow.
          </p>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept) => {
            let services: string[] = [];
            try {
              services = JSON.parse(dept.services || '[]');
            } catch {
              services = [];
            }

            return (
              <div
                key={dept.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-soft hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={dept.image || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800'}
                      alt={dept.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-navy-950/80 backdrop-blur-md text-teal-300 text-xs font-bold px-3 py-1 rounded-full">
                      {dept.doctorDepartments.length} Specialist Doctors
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-4">
                    <h2 className="text-xl font-bold text-navy-950 group-hover:text-teal-700 transition">
                      {dept.name}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      {dept.shortDescription}
                    </p>

                    {services.length > 0 && (
                      <div className="pt-2 border-t border-slate-100">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                          Key Treatments & Procedures:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {services.slice(0, 4).map((s) => (
                            <span
                              key={s}
                              className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 sm:p-8 pt-0 border-t border-slate-50 flex items-center justify-between">
                  <Link
                    href={`/departments/${dept.slug}`}
                    className="text-xs font-bold text-teal-600 hover:text-teal-800 flex items-center space-x-1"
                  >
                    <span>View Department</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/book-appointment"
                    className="bg-navy-950 hover:bg-navy-900 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg transition"
                  >
                    Book Doctor
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
