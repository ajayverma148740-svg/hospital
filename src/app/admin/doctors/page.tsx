'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Loader2,
  Clock,
  GraduationCap,
  Star,
  Search,
  X
} from 'lucide-react';

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<any | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [designation, setDesignation] = useState('');
  const [qualification, setQualification] = useState('');
  const [experienceYears, setExperienceYears] = useState('10');
  const [opdSchedule, setOpdSchedule] = useState('Mon - Sat: 10:00 AM - 02:00 PM');
  const [consultationFee, setConsultationFee] = useState('800');
  const [departmentId, setDepartmentId] = useState('');
  const [biography, setBiography] = useState('');
  const [avatar, setAvatar] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [docRes, depRes] = await Promise.all([
        fetch('/api/doctors'),
        fetch('/api/departments'),
      ]);
      if (docRes.ok && depRes.ok) {
        setDoctors(await docRes.json());
        const deps = await depRes.json();
        setDepartments(deps);
        if (deps.length > 0 && !departmentId) {
          setDepartmentId(deps[0].id);
        }
      }
    } catch (err) {
      console.error('Error fetching doctors:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAddModal = () => {
    setEditingDoctor(null);
    setName('');
    setEmail('');
    setPhone('');
    setDesignation('Senior Consultant Specialist');
    setQualification('MBBS, MD');
    setExperienceYears('10');
    setOpdSchedule('Mon - Sat: 10:00 AM - 02:00 PM');
    setConsultationFee('800');
    setBiography('');
    setAvatar('https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400');
    setModalOpen(true);
  };

  const openEditModal = (doctor: any) => {
    setEditingDoctor(doctor);
    setName(doctor.name);
    setEmail(doctor.email);
    setPhone(doctor.phone || '');
    setDesignation(doctor.designation);
    setQualification(doctor.qualification);
    setExperienceYears(String(doctor.experienceYears));
    setOpdSchedule(doctor.opdSchedule);
    setConsultationFee(String(doctor.consultationFee));
    setBiography(doctor.biography);
    setAvatar(doctor.avatar || '');
    setModalOpen(true);
  };

  const handleToggleActive = async (doctor: any) => {
    try {
      await fetch(`/api/doctors/${doctor.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !doctor.isActive }),
      });
      fetchData();
    } catch (err) {
      console.error('Error toggling doctor status:', err);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setFormSubmitting(true);
      const url = editingDoctor ? `/api/doctors/${editingDoctor.id}` : '/api/doctors';
      const method = editingDoctor ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          designation,
          qualification,
          experienceYears: Number(experienceYears),
          opdSchedule,
          consultationFee: Number(consultationFee),
          departmentId,
          biography,
          avatar,
        }),
      });

      if (res.ok) {
        setModalOpen(false);
        fetchData();
      }
    } catch (err) {
      console.error('Error saving doctor:', err);
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy-950 tracking-tight">
            Doctor Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Add new specialists, manage clinical OPD hours, fees, and doctor statuses.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition flex items-center space-x-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Doctor</span>
        </button>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-teal-600 mb-2" />
            <span>Loading medical staff...</span>
          </div>
        ) : (
          doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start space-x-3.5">
                  <img
                    src={doctor.avatar || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200'}
                    alt={doctor.name}
                    className="w-14 h-14 rounded-2xl object-cover object-top border-2 border-slate-100 shrink-0"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-navy-950">{doctor.name}</h3>
                    <p className="text-xs font-semibold text-teal-700">{doctor.designation}</p>
                    <p className="text-[11px] text-slate-400">{doctor.qualification}</p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{doctor.opdSchedule}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Experience: <strong className="text-slate-700">{doctor.experienceYears} Years</strong></span>
                    <span>Fee: <strong className="text-slate-800">₹{doctor.consultationFee}</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleToggleActive(doctor)}
                  className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-1 rounded-full ${
                    doctor.isActive
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {doctor.isActive ? 'Active Profile' : 'Inactive'}
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openEditModal(doctor)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                    title="Edit Profile"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ADD / EDIT DOCTOR MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 my-8 animate-scaleIn">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-black text-navy-950">
                {editingDoctor ? 'Edit Doctor Profile' : 'Add New Medical Consultant'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Doctor Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Arun V. Sharma"
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="dr.arun@nexahospital.com"
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Designation *</label>
                  <input
                    type="text"
                    required
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="Senior Interventional Cardiologist"
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Qualifications *</label>
                  <input
                    type="text"
                    required
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    placeholder="MBBS, MD, DM (Cardiology)"
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Department</label>
                  <select
                    value={departmentId}
                    onChange={(e) => setDepartmentId(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl bg-white"
                  >
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Experience (Years)</label>
                  <input
                    type="number"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">OPD Fee (₹)</label>
                  <input
                    type="number"
                    value={consultationFee}
                    onChange={(e) => setConsultationFee(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">OPD Schedule Timings</label>
                <input
                  type="text"
                  value={opdSchedule}
                  onChange={(e) => setOpdSchedule(e.target.value)}
                  placeholder="Mon - Sat: 10:00 AM - 02:00 PM"
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Photograph Image URL</label>
                <input
                  type="url"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Biography & Credentials</label>
                <textarea
                  rows={3}
                  value={biography}
                  onChange={(e) => setBiography(e.target.value)}
                  placeholder="Clinical background, achievements, previous institutions..."
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold flex items-center space-x-1"
                >
                  {formSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingDoctor ? 'Update Doctor' : 'Save Doctor'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
