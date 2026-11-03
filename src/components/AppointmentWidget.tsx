'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  Printer, 
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Building2
} from 'lucide-react';

interface Department {
  id: string;
  name: string;
  slug: string;
}

interface Doctor {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  opdSchedule: string;
  consultationFee: number;
  doctorDepartments?: { departmentId: string }[];
}

export default function AppointmentWidget() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [message, setMessage] = useState('');

  // OTP Verification Simulation
  const [otpStep, setOtpStep] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [simulatedOtp, setSimulatedOtp] = useState('123456');

  // Confirmation Result State
  const [bookingSuccess, setBookingSuccess] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Pre-set minimum date to today
  const todayStr = new Date().toISOString().split('T')[0];

  const timeSlots = [
    '09:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '12:30 PM',
    '04:30 PM',
    '05:00 PM',
    '05:30 PM',
    '06:00 PM',
    '06:30 PM',
  ];

  // Fetch departments & doctors on load
  useEffect(() => {
    async function loadData() {
      try {
        setFetchingData(true);
        const [depRes, docRes] = await Promise.all([
          fetch('/api/departments'),
          fetch('/api/doctors'),
        ]);

        if (depRes.ok && docRes.ok) {
          const depData = await depRes.json();
          const docData = await docRes.json();
          setDepartments(depData);
          setDoctors(docData);

          if (depData.length > 0) {
            setSelectedDepartment(depData[0].id);
          }
        }
      } catch (err) {
        console.error('Error fetching appointment data:', err);
      } finally {
        setFetchingData(false);
      }
    }
    loadData();
  }, []);

  // Filter doctors based on selected department
  const filteredDoctors = doctors.filter((doc) => {
    if (!selectedDepartment) return true;
    return doc.doctorDepartments?.some(
      (dd) => dd.departmentId === selectedDepartment
    );
  });

  // Select first doctor when department changes
  useEffect(() => {
    if (filteredDoctors.length > 0) {
      setSelectedDoctor(filteredDoctors[0].id);
    } else {
      setSelectedDoctor('');
    }
  }, [selectedDepartment, doctors]);

  const activeDoctor = doctors.find((d) => d.id === selectedDoctor);

  // Trigger booking validation
  const handleInitiateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || fullName.length < 3) {
      setErrorMessage('Please enter patient full name (minimum 3 characters).');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!appointmentDate) {
      setErrorMessage('Please select an appointment date.');
      return;
    }

    if (!timeSlot) {
      setErrorMessage('Please select an available OPD time slot.');
      return;
    }

    if (!selectedDoctor) {
      setErrorMessage('Please choose a consulting doctor.');
      return;
    }

    // Advance to simulated OTP verification
    setSimulatedOtp('123456');
    setOtpStep(true);
  };

  // Submit appointment to backend API
  const handleConfirmWithOtp = async () => {
    if (enteredOtp !== '123456' && enteredOtp.length !== 6) {
      setErrorMessage('Invalid OTP code. For testing, use default demo OTP: 123456');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage('');

      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          age: age ? parseInt(age) : null,
          gender,
          departmentId: selectedDepartment,
          doctorId: selectedDoctor,
          appointmentDate,
          timeSlot,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to confirm appointment. Please try again.');
      }

      setBookingSuccess(data);
      setOtpStep(false);
    } catch (err: any) {
      setErrorMessage(err.message || 'Network error occurred during booking.');
    } finally {
      setLoading(false);
    }
  };

  // Reset form to book another
  const handleReset = () => {
    setBookingSuccess(null);
    setFullName('');
    setPhone('');
    setEmail('');
    setAge('');
    setMessage('');
    setTimeSlot('');
    setOtpStep(false);
    setEnteredOtp('');
  };

  return (
    <div id="booking-widget" className="w-full">
      {/* SUCCESS CONFIRMATION RECEIPT */}
      {bookingSuccess ? (
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-emerald-200 shadow-xl space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-slate-100 gap-4 text-center sm:text-left">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  Booking Confirmed
                </span>
                <h3 className="text-2xl font-black text-navy-950">
                  Appointment Reference Generated
                </h3>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-200 px-4 py-2 rounded-xl text-center">
              <span className="text-xs text-slate-500 font-semibold block">Unique Reference ID</span>
              <span className="text-lg font-black text-teal-800 tracking-wider">
                {bookingSuccess.appointmentId}
              </span>
            </div>
          </div>

          {/* Receipt Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100 text-sm">
            <div>
              <span className="text-xs text-slate-400 block font-medium">Patient Name</span>
              <span className="font-bold text-slate-800">{bookingSuccess.patient?.fullName || fullName}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Mobile Number</span>
              <span className="font-bold text-slate-800">{phone}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Consulting Doctor</span>
              <span className="font-bold text-slate-800">{bookingSuccess.doctor?.name || activeDoctor?.name}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Date & Time Slot</span>
              <span className="font-bold text-teal-700">{appointmentDate} • {timeSlot}</span>
            </div>
          </div>

          {/* Guidelines Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs text-blue-900 space-y-1">
            <p className="font-bold flex items-center space-x-1">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>OPD Instructions for Patient:</span>
            </p>
            <ul className="list-disc list-inside space-y-0.5 text-blue-800 pl-1">
              <li>Please arrive 15 minutes prior to your time slot for front-desk vitals checking.</li>
              <li>Bring past medical prescriptions, discharge summaries, or previous lab test reports.</li>
              <li>An SMS confirmation with hospital token directions has been queued to {phone}.</li>
            </ul>
          </div>

          {/* Action Buttons: Print, Track, Book Another */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center space-x-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print Appointment Slip</span>
            </button>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleReset}
                className="text-xs font-bold text-teal-700 hover:text-teal-900 px-4 py-2.5 rounded-xl border border-teal-200 hover:bg-teal-50 transition"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* APPOINTMENT FORM */
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/90 relative">
          <div className="mb-6">
            <div className="inline-flex items-center space-x-2 bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
              <span>Instant OPD Booking</span>
            </div>
            <h3 className="text-2xl font-black text-navy-950">
              Book Doctor Consultation
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select doctor, preferred time slot, and receive immediate appointment confirmation.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* OTP VERIFICATION STEP MODAL / VIEW */}
          {otpStep ? (
            <div className="bg-teal-50/70 border border-teal-200 p-6 rounded-2xl space-y-4 animate-fadeIn">
              <div className="text-center max-w-md mx-auto space-y-2">
                <ShieldCheck className="w-10 h-10 text-teal-600 mx-auto" />
                <h4 className="text-lg font-bold text-navy-950">Verify Mobile Number</h4>
                <p className="text-xs text-slate-600">
                  Please enter the 6-digit verification code sent to{' '}
                  <span className="font-bold text-slate-800">{phone}</span>.
                </p>
                <div className="bg-white p-2.5 rounded-lg border border-teal-200 text-xs text-teal-800 font-medium inline-block">
                  Demo Test Verification Code: <span className="font-bold text-teal-900 tracking-wider">123456</span>
                </div>
              </div>

              <div className="max-w-xs mx-auto space-y-3">
                <input
                  type="text"
                  maxLength={6}
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="w-full text-center tracking-widest text-xl font-bold py-3 px-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />

                <button
                  type="button"
                  disabled={loading}
                  onClick={handleConfirmWithOtp}
                  className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm flex items-center justify-center space-x-2 transition shadow-md disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Confirming with Hospital DB...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Confirm & Generate Booking</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setOtpStep(false)}
                  className="w-full text-center text-xs text-slate-500 hover:text-slate-800"
                >
                  ← Edit Appointment Details
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleInitiateBooking} className="space-y-6">
              {/* Row 1: Department & Doctor */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    1. Select Medical Department *
                  </label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    2. Select Consulting Doctor *
                  </label>
                  <select
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {filteredDoctors.length > 0 ? (
                      filteredDoctors.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {doc.name} — {doc.designation} (Fee: ₹{doc.consultationFee})
                        </option>
                      ))
                    ) : (
                      <option value="">No doctors available for this department</option>
                    )}
                  </select>
                </div>
              </div>

              {/* Active Doctor Details Bar */}
              {activeDoctor && (
                <div className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="font-bold text-teal-900">{activeDoctor.name}</span>
                    <span className="text-teal-700 ml-2">({activeDoctor.qualification})</span>
                  </div>
                  <div className="flex items-center space-x-3 text-teal-800">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      <span>{activeDoctor.opdSchedule}</span>
                    </span>
                    <span className="font-bold text-navy-950 bg-teal-200/80 px-2 py-0.5 rounded">
                      Fee: ₹{activeDoctor.consultationFee}
                    </span>
                  </div>
                </div>
              )}

              {/* Row 2: Date & Available Slot Picker */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    3. Appointment Date *
                  </label>
                  <input
                    type="date"
                    min={todayStr}
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    required
                    className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    4. Available OPD Time Slot *
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {timeSlots.map((slot) => {
                      const isSelected = timeSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTimeSlot(slot)}
                          className={`py-2 px-1 text-xs font-semibold rounded-lg border transition ${
                            isSelected
                              ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-teal-400 hover:bg-teal-50/50'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Row 3: Patient Information Fields */}
              <div className="pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">
                  5. Patient Details
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Patient Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rameshwar Dayal"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full py-2 px-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Mobile Number (10 digits) *
                    </label>
                    <input
                      type="tel"
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full py-2 px-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="name@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full py-2 px-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Age (Years)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 45"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full py-2 px-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Gender
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full py-2 px-3 rounded-lg border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Primary Health Concern / Symptoms
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Chest pain, knee ache"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full py-2 px-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500 flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Confidential healthcare records protected under DPDP standards.</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-bold px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center space-x-2 text-sm"
                >
                  <CalendarIcon className="w-4 h-4" />
                  <span>Proceed to Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
