import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { 
  Calendar, 
  Clock, 
  GraduationCap, 
  Award, 
  Star, 
  ArrowLeft, 
  CheckCircle2, 
  Phone 
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const doctor = await prisma.doctor.findFirst({
    where: { OR: [{ id: params.id }, { slug: params.id }] },
  });

  if (!doctor) return { title: 'Doctor Not Found | Nexa Hospital' };

  return {
    title: `${doctor.name} - ${doctor.designation} | Nexa Hospital Lucknow`,
    description: doctor.biography.slice(0, 160),
  };
}

export default async function DoctorProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const doctor = await prisma.doctor.findFirst({
    where: { OR: [{ id: params.id }, { slug: params.id }] },
    include: {
      doctorDepartments: {
        include: {
          department: true,
        },
      },
    },
  });

  if (!doctor) {
    notFound();
  }

  const department = doctor.doctorDepartments[0]?.department;

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          href="/doctors"
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-navy-950 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Doctors</span>
        </Link>

        {/* Doctor Main Profile Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4 space-y-4">
            <div className="rounded-2xl overflow-hidden border-2 border-slate-100 shadow-md">
              <img
                src={doctor.avatar || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600'}
                alt={doctor.name}
                className="w-full h-80 object-cover object-top"
              />
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Consultation Fee</span>
                <span className="font-bold text-navy-950 text-sm">₹{doctor.consultationFee}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Clinical Experience</span>
                <span className="font-bold text-slate-800">{doctor.experienceYears} Years</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Patient Rating</span>
                <span className="font-bold text-amber-600 flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-amber-500" />
                  <span>{doctor.rating} ({doctor.reviewCount})</span>
                </span>
              </div>
            </div>

            <Link
              href="/book-appointment"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-md transition"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment with {doctor.name.split(' ')[1] || doctor.name}</span>
            </Link>
          </div>

          <div className="md:col-span-8 space-y-6">
            <div>
              {department && (
                <Link
                  href={`/departments/${department.slug}`}
                  className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-2"
                >
                  {department.name}
                </Link>
              )}
              <h1 className="text-3xl font-black text-navy-950">{doctor.name}</h1>
              <p className="text-sm font-bold text-slate-700 mt-1">{doctor.designation}</p>
            </div>

            <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 text-xs space-y-2 text-teal-900">
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-4 h-4 text-teal-700 shrink-0" />
                <span className="font-semibold">{doctor.qualification}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-teal-700 shrink-0" />
                <span>OPD Timings: {doctor.opdSchedule}</span>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-base font-bold text-navy-950">Biography & Background</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                {doctor.biography}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h2 className="text-sm font-bold text-navy-950">Hospital Campus</h2>
              <p className="text-xs text-slate-500">
                Nexa Hospital, Near Malhaur Railway Station, Nizampur, Chinhat, Lucknow, UP.
              </p>
              <p className="text-xs text-slate-500 flex items-center space-x-1">
                <Phone className="w-3.5 h-3.5 text-teal-600" />
                <span>Doctor Assistant Desk: +91 522 350 4999</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
