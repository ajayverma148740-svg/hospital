'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Building2,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  Activity,
  Phone,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Error fetching admin stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const kpis = [
    {
      label: 'Total Appointments',
      value: stats?.totalAppointments ?? 0,
      icon: Calendar,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
    },
    {
      label: "Today's Appointments",
      value: stats?.todayAppointments ?? 0,
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      label: 'Pending Approval',
      value: stats?.pendingAppointments ?? 0,
      icon: AlertCircle,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
    },
    {
      label: 'Confirmed Bookings',
      value: stats?.confirmedAppointments ?? 0,
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
    },
    {
      label: 'Consultant Doctors',
      value: stats?.totalDoctors ?? 0,
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
    },
    {
      label: 'Active Departments',
      value: stats?.totalDepartments ?? 0,
      icon: Building2,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
            Hospital Administration Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time OPD metrics, patient admissions, and clinical activity monitor for Nexa Hospital Lucknow.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchStats}
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-navy-950 hover:bg-slate-50 transition shadow-sm"
            title="Refresh Real-Time Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <Link
            href="/admin/appointments"
            className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition flex items-center space-x-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Manage Appointments</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className={`p-5 rounded-2xl bg-white border ${kpi.borderColor} shadow-soft hover:shadow-md transition flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {kpi.label}
                </span>
                <div className={`w-8 h-8 rounded-lg ${kpi.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
              </div>
              <span className="text-2xl sm:text-3xl font-black text-navy-950">
                {loading ? '...' : kpi.value}
              </span>
            </div>
          );
        })}
      </div>

      {/* Two Column Grid: Recent Appointments & Recent Patient Enquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Appointments List */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-navy-950">Recent OPD Appointments</h2>
              <p className="text-xs text-slate-400">Latest patient booking submissions</p>
            </div>
            <Link
              href="/admin/appointments"
              className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {stats?.recentAppointments && stats.recentAppointments.length > 0 ? (
              stats.recentAppointments.map((app: any) => (
                <div key={app.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-navy-950">
                        {app.patient?.fullName}
                      </span>
                      <span className="text-[10px] text-teal-700 font-mono bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                        {app.appointmentId}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Doctor: <span className="font-semibold text-slate-700">{app.doctor?.name}</span> • {app.appointmentDate} at {app.timeSlot}
                    </p>
                  </div>

                  <div>
                    <span
                      className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                        app.status === 'CONFIRMED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : app.status === 'PENDING'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-6 text-center">
                No recent appointments found.
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Recent Patient Enquiries */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-navy-950">Recent Patient Enquiries</h2>
              <p className="text-xs text-slate-400">Incoming requests and insurance questions</p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {stats?.recentEnquiries && stats.recentEnquiries.length > 0 ? (
              stats.recentEnquiries.map((enq: any) => (
                <div
                  key={enq.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-navy-950">{enq.fullName}</span>
                    <span className="text-[10px] font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {enq.category}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700 truncate">
                    {enq.subject}
                  </p>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {enq.message}
                  </p>
                  <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="flex items-center space-x-1">
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>{enq.phone}</span>
                    </span>
                    <span
                      className={`font-bold ${
                        enq.status === 'NEW'
                          ? 'text-red-600'
                          : enq.status === 'IN_REVIEW'
                          ? 'text-amber-600'
                          : 'text-emerald-600'
                      }`}
                    >
                      {enq.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-6 text-center">
                No recent enquiries.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
