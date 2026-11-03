'use client';

import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Loader2 } from 'lucide-react';

export default function GalleryPage() {
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  useEffect(() => {
    async function loadGallery() {
      try {
        setLoading(true);
        const res = await fetch('/api/cms?type=gallery');
        if (res.ok) {
          const data = await res.json();
          setGallery(data.gallery || []);
        }
      } catch (err) {
        console.error('Error loading gallery:', err);
      } finally {
        setLoading(false);
      }
    }
    loadGallery();
  }, []);

  const categories = [
    'ALL',
    'Infrastructure',
    'Operation Theatre',
    'ICU & Rooms',
    'Diagnostics',
    'Events',
  ];

  const filteredItems = gallery.filter((item) => {
    if (selectedCategory === 'ALL') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-teal-50 text-teal-700 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <ImageIcon className="w-4 h-4 text-teal-600" />
            <span>Campus Tour in Pictures</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-navy-950 tracking-tight">
            Hospital Photo Gallery
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            A glimpse into our advanced operation theatres, patient recovery suites, diagnostic equipment, and community health camps.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                selectedCategory === cat
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat === 'ALL' ? 'All Photographs' : cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="py-20 text-center text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-teal-600 mb-2" />
            <span>Loading gallery photographs...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-soft group hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-navy-950/80 backdrop-blur-md text-teal-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    {item.category}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-base font-bold text-navy-950 group-hover:text-teal-700 transition">
                    {item.title}
                  </h3>
                  {item.caption && (
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {item.caption}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
