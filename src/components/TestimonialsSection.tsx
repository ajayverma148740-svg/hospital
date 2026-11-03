'use client';

import React from 'react';
import { Star, CheckCircle, Quote, MessageSquareHeart } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      patientName: 'Shri B. K. Tripathi',
      treatment: 'Emergency Primary Angioplasty (Heart Attack)',
      doctor: 'Dr. Arun V. Sharma',
      location: 'Gomti Nagar, Lucknow',
      rating: 5,
      comment:
        'When I suffered acute chest pain at 2 AM, Nexa Hospital’s emergency ambulance reached our residence in 12 minutes. Dr. Arun Sharma and the Cath Lab team saved my life with emergency stenting within the golden hour. World-class medical infrastructure right here in Lucknow!',
    },
    {
      patientName: 'Mrs. Neha & Vikas Rastogi',
      treatment: 'High-Risk Pregnancy & Painless Delivery',
      doctor: 'Dr. Priya Awasthi',
      location: 'Chinhat, Lucknow',
      rating: 5,
      comment:
        'Dr. Priya Awasthi provided constant warmth and confidence throughout my twin pregnancy. The LDR delivery suite was like a luxury hotel with exceptional nursing staff. We are blessed with two healthy baby girls. Forever grateful to Nexa Hospital!',
    },
    {
      patientName: 'Devendra Pratap Singh (Retd. PWD Chief)',
      treatment: 'Bilateral Computer-Navigated Total Knee Replacement',
      doctor: 'Dr. Rajeshwar Singh',
      location: 'Aliganj, Lucknow',
      rating: 5,
      comment:
        'I had been bedridden with severe osteoarthritis for 3 years. Dr. Rajeshwar Singh performed computer-navigated knee replacement on both legs. On Day 2, their physiotherapy team had me walking with support. Now I walk 3 kilometers daily without pain!',
    },
    {
      patientName: 'Smt. Kamla Devi Yadav',
      treatment: 'Laparoscopic Gallbladder Surgery',
      doctor: 'Dr. Alok Kumar Tiwari',
      location: 'Indira Nagar, Lucknow',
      rating: 5,
      comment:
        'Extremely clean hospital with transparent billing. Dr. Alok Tiwari explained the surgery calmly. I had zero pain after surgery and was discharged within 24 hours. The insurance TPA desk handled our claim seamlessly.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-teal-50 text-teal-700 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <MessageSquareHeart className="w-4 h-4 text-teal-600" />
            <span>Verified Patient Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
            Stories of Healing & Hope
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Read authentic feedback from patients treated at Nexa Hospital Lucknow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-slate-50/80 rounded-3xl p-8 border border-slate-200/70 shadow-soft hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-amber-500 fill-amber-500"
                      />
                    ))}
                  </div>
                  <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-teal-700 bg-teal-100/70 px-2.5 py-0.5 rounded-full">
                    <CheckCircle className="w-3 h-3 text-teal-600" />
                    <span>Verified Patient</span>
                  </span>
                </div>

                <Quote className="w-8 h-8 text-teal-600/20 mb-2" />

                <p className="text-sm text-slate-700 leading-relaxed italic font-light">
                  "{item.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-navy-950">
                    {item.patientName}
                  </h4>
                  <p className="text-xs text-slate-500">{item.location}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-teal-700 block">
                    {item.treatment}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Under {item.doctor}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
