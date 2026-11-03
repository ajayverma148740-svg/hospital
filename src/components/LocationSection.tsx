'use client';

import React from 'react';
import { MapPin, Navigation, Car, Bus, Train, Phone, ExternalLink } from 'lucide-react';

export default function LocationSection() {
  const googleMapsUrl = 'https://maps.app.goo.gl/kCBhC8C9eyxRQJpr8';

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 bg-teal-50 text-teal-700 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-4 h-4 text-teal-600" />
            <span>Campus Location & Directions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
            How to Reach Nexa Hospital
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Strategically located near Malhaur Railway Station, Chinhat, Lucknow with fast access 
            via Shaheed Path and Faizabad Road.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Google Map */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-200 shadow-xl min-h-[420px] relative bg-slate-100">
            <iframe
              title="Nexa Hospital Lucknow Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14238.940562512967!2d81.0189!3d26.8790!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be3a7b7a7a7a7%3A0x1!2sChinhat%2C%20Lucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '420px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
            {/* Overlay pill for direct Google Maps App */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-slate-200 text-xs font-bold text-slate-800 flex items-center space-x-1.5">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-700 hover:text-teal-800 flex items-center space-x-1"
              >
                <span>Open in Google Maps App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Transport Guide & Coordinates */}
          <div className="lg:col-span-5 bg-slate-50 rounded-3xl p-8 border border-slate-200/80 shadow-soft flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-start space-x-3 pb-6 border-b border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy-950">
                    Nexa Hospital, Lucknow
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Near Malhaur Railway Station, Nizampur, Chinhat, Lucknow, Uttar Pradesh 226028, India
                  </p>
                  <p className="text-xs text-teal-700 font-semibold mt-1">
                    Landmark: Near Malhaur Station Road / Chinhat Flyover
                  </p>
                </div>
              </div>

              {/* Transit Options */}
              <div className="space-y-4 pt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Access & Commute Highlights
                </h4>

                <div className="flex items-start space-x-3 text-xs text-slate-600">
                  <Train className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800">By Train:</span> 5 minutes from Malhaur Railway Station; 25 minutes from Lucknow Charbagh Railway Station.
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-xs text-slate-600">
                  <Car className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800">By Car / Taxi:</span> Directly connected via Shaheed Path, Faizabad Road, and Gomti Nagar Extension. Free 24/7 valet parking on-site.
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-xs text-slate-600">
                  <Bus className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800">By City Bus / Metro:</span> Closest metro stations are Munshipulia and Transport Nagar; frequent city buses connect from Chinhat Tiraha.
                  </div>
                </div>
              </div>
            </div>

            {/* Driving Direction CTA */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-navy-950 hover:bg-navy-900 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-md"
              >
                <Navigation className="w-4 h-4 text-teal-400" />
                <span>Get Driving Directions</span>
              </a>

              <a
                href="tel:+915223504999"
                className="bg-white hover:bg-slate-100 text-slate-800 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 border border-slate-200 transition"
              >
                <Phone className="w-4 h-4 text-teal-600" />
                <span>Call Front Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
