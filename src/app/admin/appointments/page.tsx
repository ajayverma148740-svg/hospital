'use client';

import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Printer,
  Download,
  Eye,
  AlertCircle,
  Loader2,
  RefreshCw,
  Phone,
  User,
  X
} from 'lucide-react';

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [dateFilter, setDateFilter] = useState('');

  // Selected appointment for detail / reschedule modal
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [newDate, setNewDate] = useState('');
  const [newSlot, setNewSlot] = useState('');
  const [cancellationReason, setCancellationReason] = useState('');
  const [internalNote, setInternalNote] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      let url = '/api/appointments?';
      if (statusFilter !== 'ALL') url += `status=${statusFilter}&`;
      if (dateFilter) url += `date=${dateFilter}&`;
      if (searchTerm) url += `search=${encodeURIComponent(searchTerm)}&`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setAppointments(data);
      }
    } catch (err) {
      console.error('Error fetching appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [statusFilter, dateFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAppointments();
  };

  // Status Update Handler
  const handleUpdateStatus = async (appId: string, newStatus: string, reason?: string) => {
    try {
      setActionLoading(true);
      const res = await fetch(`/api/appointments/${appId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          cancellationReason: reason,
          appointmentDate: newDate || undefined,
          timeSlot: newSlot || undefined,
          internalNotes: internalNote || undefined,
        }),
      });

      if (res.ok) {
        setSelectedApp(null);
        setNewDate('');
        setNewSlot('');
        setCancellationReason('');
        setInternalNote('');
        fetchAppointments();
      }
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setActionLoading(false);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (appointments.length === 0) return;

    const headers = [
      'Appointment ID',
      'Patient Name',
      'Phone',
      'Age',
      'Gender',
      'Doctor',
      'Department',
      'Date',
      'Time Slot',
      'Status',
      'Message',
    ];

    const rows = appointments.map((app) => [
      app.appointmentId,
      `"${app.patient?.fullName || ''}"`,
      `"${app.patient?.phone || ''}"`,
      app.patient?.age || '',
      app.patient?.gender || '',
      `"${app.doctor?.name || ''}"`,
      `"${app.department?.name || ''}"`,
      app.appointmentDate,
      app.timeSlot,
      app.status,
      `"${(app.message || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `nexa-appointments-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy-950 tracking-tight">
            Appointment Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review, confirm, reschedule, or cancel patient OPD appointments.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-sm transition"
          >
            <Download className="w-3.5 h-3.5 text-teal-600" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-sm transition"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>Print List</span>
          </button>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
        <form onSubmit={handleSearchSubmit} className="w-full md:w-96 flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by ID, Patient name, or Phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <button
            type="submit"
            className="px-3.5 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold hover:bg-teal-700 transition"
          >
            Search
          </button>
        </form>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Status Filter */}
          <div className="flex items-center space-x-1.5 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-600">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-1.5 px-2.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-800"
            >
              <option value="ALL">All Statuses</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="PENDING">Pending</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="flex items-center space-x-1.5 text-xs">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="py-1 px-2 rounded-lg border border-slate-200 bg-white text-xs text-slate-800"
            />
            {dateFilter && (
              <button
                onClick={() => setDateFilter('')}
                className="text-[11px] text-red-500 font-semibold hover:underline"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Appointments Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Ref ID</th>
                <th className="py-3.5 px-4">Patient Details</th>
                <th className="py-3.5 px-4">Doctor & Speciality</th>
                <th className="py-3.5 px-4">Date & Slot</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-teal-600" />
                    <span>Loading appointments...</span>
                  </td>
                </tr>
              ) : appointments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No appointments match the selected filters.
                  </td>
                </tr>
              ) : (
                appointments.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/70 transition">
                    {/* Ref ID */}
                    <td className="py-3 px-4 font-mono font-bold text-teal-800">
                      {app.appointmentId}
                    </td>

                    {/* Patient */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-navy-950">{app.patient?.fullName}</div>
                      <div className="text-[11px] text-slate-400 flex items-center space-x-1">
                        <span>{app.patient?.phone}</span>
                        {app.patient?.age && <span>• {app.patient.age}y</span>}
                        {app.patient?.gender && <span>• {app.patient.gender}</span>}
                      </div>
                    </td>

                    {/* Doctor */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800">{app.doctor?.name}</div>
                      <div className="text-[11px] text-teal-700">{app.department?.name}</div>
                    </td>

                    {/* Date & Slot */}
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-800">{app.appointmentDate}</div>
                      <div className="text-[11px] text-slate-500">{app.timeSlot}</div>
                    </td>

                    {/* Status Pill */}
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                          app.status === 'CONFIRMED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : app.status === 'PENDING'
                            ? 'bg-amber-100 text-amber-800'
                            : app.status === 'COMPLETED'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>

                    {/* Quick Actions */}
                    <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                        title="View Details & Manage"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {app.status === 'PENDING' && (
                        <button
                          onClick={() => handleUpdateStatus(app.id, 'CONFIRMED')}
                          className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition"
                          title="Confirm Appointment"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {app.status === 'CONFIRMED' && (
                        <button
                          onClick={() => handleUpdateStatus(app.id, 'COMPLETED')}
                          className="p-1.5 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-800 transition"
                          title="Mark Completed"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {app.status !== 'CANCELLED' && (
                        <button
                          onClick={() => {
                            setSelectedApp(app);
                          }}
                          className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 transition"
                          title="Cancel or Reschedule"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* APPOINTMENT DETAILS & ACTION MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-scaleIn">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider">
                  Appointment Reference
                </span>
                <h3 className="text-xl font-black text-navy-950">
                  {selectedApp.appointmentId}
                </h3>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Patient & Doctor Card */}
            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Patient</span>
                <span className="font-bold text-slate-800">{selectedApp.patient?.fullName}</span>
                <span className="text-slate-500 block">{selectedApp.patient?.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Doctor</span>
                <span className="font-bold text-slate-800">{selectedApp.doctor?.name}</span>
                <span className="text-slate-500 block">{selectedApp.department?.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Current Slot</span>
                <span className="font-bold text-slate-800">{selectedApp.appointmentDate} at {selectedApp.timeSlot}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Status</span>
                <span className="font-bold text-teal-700">{selectedApp.status}</span>
              </div>
            </div>

            {selectedApp.message && (
              <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-xl text-xs text-amber-900">
                <span className="font-bold block">Patient's Symptoms / Note:</span>
                <p className="mt-0.5">{selectedApp.message}</p>
              </div>
            )}

            {/* Reschedule Section */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700 block">
                Reschedule Date & Time Slot:
              </span>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="py-2 px-3 border border-slate-300 rounded-xl text-xs bg-white"
                />
                <input
                  type="text"
                  placeholder="e.g. 11:30 AM"
                  value={newSlot}
                  onChange={(e) => setNewSlot(e.target.value)}
                  className="py-2 px-3 border border-slate-300 rounded-xl text-xs bg-white"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <button
                disabled={actionLoading}
                onClick={() => handleUpdateStatus(selectedApp.id, 'CANCELLED', cancellationReason || 'Cancelled by staff')}
                className="text-xs font-bold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-4 py-2.5 rounded-xl transition"
              >
                Cancel Appointment
              </button>

              <div className="flex items-center space-x-2">
                <button
                  disabled={actionLoading}
                  onClick={() => handleUpdateStatus(selectedApp.id, 'CONFIRMED')}
                  className="text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 px-4 py-2.5 rounded-xl transition shadow-sm"
                >
                  Save / Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
