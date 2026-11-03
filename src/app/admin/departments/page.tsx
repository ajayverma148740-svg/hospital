'use client';

import React, { useState, useEffect } from 'react';
import {
  Building2,
  Plus,
  Edit2,
  CheckCircle,
  XCircle,
  Loader2,
  Activity,
  Layers,
  X
} from 'lucide-react';

export default function AdminDepartmentsPage() {
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<any | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [image, setImage] = useState('');
  const [servicesInput, setServicesInput] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/departments');
      if (res.ok) {
        setDepartments(await res.json());
      }
    } catch (err) {
      console.error('Error fetching departments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const openAddModal = () => {
    setEditingDept(null);
    setName('');
    setShortDescription('');
    setFullDescription('');
    setImage('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000');
    setServicesInput('24/7 Consultation\nAdvanced Diagnostics\nSurgical Intervention');
    setIsPublished(true);
    setModalOpen(true);
  };

  const openEditModal = (dept: any) => {
    setEditingDept(dept);
    setName(dept.name);
    setShortDescription(dept.shortDescription);
    setFullDescription(dept.fullDescription);
    setImage(dept.image || '');

    let servicesArr = [];
    try {
      servicesArr = JSON.parse(dept.services || '[]');
    } catch {
      servicesArr = [];
    }
    setServicesInput(servicesArr.join('\n'));
    setIsPublished(dept.isPublished);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const servicesArray = servicesInput
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      const url = editingDept ? `/api/departments/${editingDept.slug}` : '/api/departments';
      const method = editingDept ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          shortDescription,
          fullDescription,
          image,
          services: servicesArray,
          isPublished,
        }),
      });

      if (res.ok) {
        setModalOpen(false);
        fetchDepartments();
      }
    } catch (err) {
      console.error('Error saving department:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy-950 tracking-tight">
            Medical Department Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage clinical centres of excellence, treatments offered, and publishing status.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition flex items-center space-x-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Department</span>
        </button>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-teal-600 mb-2" />
            <span>Loading departments...</span>
          </div>
        ) : (
          departments.map((dept) => {
            let services: string[] = [];
            try {
              services = JSON.parse(dept.services || '[]');
            } catch {
              services = [];
            }

            return (
              <div
                key={dept.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-soft hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-40 overflow-hidden bg-slate-100">
                    <img
                      src={dept.image || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600'}
                      alt={dept.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-navy-950/80 backdrop-blur-md text-teal-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      {dept._count?.doctorDepartments ?? 0} Doctors
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-navy-950">{dept.name}</h3>
                      <span
                        className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                          dept.isPublished
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {dept.isPublished ? 'Published' : 'Hidden'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {dept.shortDescription}
                    </p>

                    {services.length > 0 && (
                      <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1">
                        {services.slice(0, 3).map((s) => (
                          <span
                            key={s}
                            className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded"
                          >
                            {s}
                          </span>
                        ))}
                        {services.length > 3 && (
                          <span className="text-[10px] text-teal-700 font-semibold px-1">
                            +{services.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-end">
                  <button
                    onClick={() => openEditModal(dept)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center space-x-1 text-xs font-semibold px-3 py-1.5"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ADD / EDIT DEPARTMENT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 my-8 animate-scaleIn">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-black text-navy-950">
                {editingDept ? 'Edit Medical Department' : 'Add New Medical Department'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Department Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ophthalmology & Eye Surgery"
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Summary *</label>
                <input
                  type="text"
                  required
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Brief 1-line overview of treatments and technology..."
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Clinical Description *</label>
                <textarea
                  rows={3}
                  required
                  value={fullDescription}
                  onChange={(e) => setFullDescription(e.target.value)}
                  placeholder="Detailed background on medical facilities, equipment, and surgical standards..."
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Header Image URL</label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Services Offered (1 per line)
                </label>
                <textarea
                  rows={3}
                  value={servicesInput}
                  onChange={(e) => setServicesInput(e.target.value)}
                  placeholder="24x7 Cath Lab&#10;Angioplasty&#10;Pacemaker Implantation"
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-mono text-[11px]"
                />
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="publishedCheckbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4"
                />
                <label htmlFor="publishedCheckbox" className="font-semibold text-slate-700">
                  Publish on public hospital website
                </label>
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
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold flex items-center space-x-1"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingDept ? 'Update Department' : 'Save Department'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
