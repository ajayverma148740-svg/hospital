import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { 
  ShieldCheck, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle2, 
  ArrowLeft, 
  Phone,
  GraduationCap
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const department = await prisma.department.findUnique({
    where: { slug: params.slug },
  });

  if (!department) return { title: 'Department Not Found | Nexa Hospital' };

  return {
    title: `${department.name} | Nexa Hospital Lucknow`,
    description: department.shortDescription,
  };
}

export default async function DepartmentDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const department = await prisma.department.findUnique({
    where: { slug: params.slug },
    include: {
      doctorDepartments: {
        include: {
          doctor: true,
        },
      },
    },
  });

  if (!department) {
    notFound();
  }

  let services: string[] = [];
  try {
    services = JSON.parse(department.services || '[]');
  } catch {
    services = [];
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <Link
          href="/departments"
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-navy-950 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Medical Departments</span>
        </Link>

        {/* Hero Header Box */}
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Centre of Clinical Excellence</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
                {department.name}
              </h1>
              <p className="text-base text-slate-600 leading-relaxed font-light">
                {department.fullDescription}
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/book-appointment"
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm flex items-center space-x-2 shadow-md transition"
              >
                <Calendar className="w-4 h-4" />
                <span>Book OPD Consultation</span>
              </Link>
              <a
                href="tel:+915223504999"
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm flex items-center space-x-2 transition"
              >
                <Phone className="w-4 h-4 text-teal-600" />
                <span>Call Helpline: 0522 350 4999</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[320px] bg-slate-100">
            <img
              src={department.image || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800'}
              alt={department.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Procedures / Treatments Section */}
        {services.length > 0 && (
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-soft space-y-6">
            <h2 className="text-2xl font-black text-navy-950 tracking-tight">
              Clinical Procedures & Services Offered
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {services.map((item) => (
                <div
                  key={item}
                  className="flex items-start space-x-3 p-4 rounded-2xl bg-slate-50 border border-slate-100"
                >
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Doctors in this department */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-black text-navy-950 tracking-tight">
              Consultant Doctors in {department.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Schedule an in-person OPD consultation with our specialist doctors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {department.doctorDepartments.map((dd) => {
              const doc = dd.doctor;
              return (
                <div
                  key={doc.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft flex flex-col justify-between space-y-4"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={doc.avatar || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300'}
                      alt={doc.name}
                      className="w-16 h-16 rounded-2xl object-cover object-top border-2 border-slate-100 shrink-0"
                    />
                    <div>
                      <h3 className="text-base font-bold text-navy-950">{doc.name}</h3>
                      <p className="text-xs font-semibold text-teal-700">{doc.designation}</p>
                      <p className="text-[11px] text-slate-400 mt-1">{doc.qualification}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1.5 text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{doc.opdSchedule}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/book-appointment"
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-1 shadow-sm transition"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Consultation (₹{doc.consultationFee})</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
