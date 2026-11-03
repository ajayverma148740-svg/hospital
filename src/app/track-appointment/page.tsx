'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertCircle, 
  Loader2, 
  Printer, 
  Phone,
  User,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';

export default function TrackAppointmentPage() {
  const [appointmentId, setAppointmentId] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [appointment, setAppointment] = useState<any | null>(null);
  const [error, setError] = useState('');

  // Cancellation modal
  const [cancelModal, setCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelLoading, setCancelLoading] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setAppointment(null);

    if (!appointmentId.trim() || !phone.trim()) {
      setError('Please provide both Appointment Reference ID and registered phone number.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/appointments/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appointmentId, phone }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'No appointment found with the provided details.');
      }

      setAppointment(data);
    } catch (err: any) {
      setError(err.message || 'Error tracking appointment.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async () => {
    if (!appointment) return;

    try {
      setCancelLoading(true);
      const res = await fetch(`/api/appointments/${appointment.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'CANCELLED',
          cancellationReason: cancelReason || 'Cancelled by patient via portal',
        }),
      });

      if (res.ok) {
        setAppointment({
          ...appointment,
          status: 'CANCELLED',
          cancellationReason: cancelReason || 'Cancelled by patient via portal',
        });
        setCancelModal(false);
      }
    } catch (err) {
      console.error('Error cancelling appointment:', err);
    } finally {
      setCancelLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-teal-50 text-teal-700 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Search className="w-4 h-4 text-teal-600" />
            <span>Appointment Self-Service</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
            Track Your Appointment
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Enter your unique Nexa Reference Code and registered mobile number to view details or print your appointment token slip.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-soft">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleTrack} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Appointment Reference ID *
                </label>
                <input
                  type="text"
                  placeholder="e.g. NXA-2025-10020"
                  value={appointmentId}
                  onChange={(e) => setAppointmentId(e.target.value.toUpperCase())}
                  required
                  className="w-full py-2.5 px-3.5 border border-slate-300 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Registered Mobile Number *
                </label>
                <input
                  type="tel"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full py-2.5 px-3.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 px-6 rounded-xl text-sm flex items-center justify-center space-x-2 shadow-md transition disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Searching Hospital Records...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Find Appointment</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* APPOINTMENT RESULT CARD */}
        {appointment && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-slate-100 gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl sm:text-2xl font-black text-navy-950 font-mono">
                    {appointment.appointmentId}
                  </span>
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                      appointment.status === 'CONFIRMED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : appointment.status === 'PENDING'
                        ? 'bg-amber-100 text-amber-800'
                        : appointment.status === 'COMPLETED'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {appointment.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Booked on {new Date(appointment.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.print()}
                  className="text-xs font-semibold px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl flex items-center space-x-1.5 transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Slip</span>
                </button>

                {appointment.status !== 'CANCELLED' && appointment.status !== 'COMPLETED' && (
                  <button
                    onClick={() => setCancelModal(true)}
                    className="text-xs font-semibold px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl flex items-center space-x-1 transition"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Cancel Appointment</span>
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Patient</span>
                <span className="font-bold text-slate-800 text-sm">{appointment.patient?.fullName}</span>
                <span className="text-slate-500 block">{appointment.patient?.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Doctor</span>
                <span className="font-bold text-slate-800 text-sm">{appointment.doctor?.name}</span>
                <span className="text-teal-700 block">{appointment.department?.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Consultation Slot</span>
                <span className="font-bold text-slate-800 text-sm">{appointment.appointmentDate}</span>
                <span className="text-teal-700 block">{appointment.timeSlot}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">OPD Fee</span>
                <span className="font-bold text-navy-950 text-sm">₹{appointment.doctor?.consultationFee || 800}</span>
                <span className="text-slate-400 block">Payable at Front Desk</span>
              </div>
            </div>

            {appointment.status === 'CANCELLED' && appointment.cancellationReason && (
              <div className="p-4 bg-red-50 rounded-2xl border border-red-200 text-xs text-red-800">
                <span className="font-bold block">Cancellation Reason:</span>
                <p className="mt-0.5">{appointment.cancellationReason}</p>
              </div>
            )}
          </div>
        )}

        {/* Cancellation Confirmation Modal */}
        {cancelModal && (
          <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
              <h3 className="text-lg font-bold text-navy-950">
                Cancel Appointment Confirmation
              </h3>
              <p className="text-xs text-slate-600">
                Are you sure you wish to cancel appointment <span className="font-mono font-bold text-navy-950">{appointment.appointmentId}</span>?
              </p>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Reason for Cancellation (Optional)
                </label>
                <textarea
                  rows={2}
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="e.g. Schedule clash, feeling better..."
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCancelModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold"
                >
                  Keep Appointment
                </button>
                <button
                  type="button"
                  disabled={cancelLoading}
                  onClick={handleCancelAppointment}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
                >
                  {cancelLoading ? 'Cancelling...' : 'Confirm Cancellation'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
