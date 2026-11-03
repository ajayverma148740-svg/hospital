import React from 'react';
import Link from 'next/link';
import { 
  Building, 
  Activity, 
  Pill, 
  Bed, 
  Truck, 
  Microscope, 
  ShieldCheck, 
  Calendar,
  CheckCircle2
} from 'lucide-react';

export const metadata = {
  title: 'Hospital Facilities & Infrastructure | Nexa Hospital Lucknow',
  description:
    'Explore Nexa Hospital Lucknow’s world-class medical infrastructure: Class 100 Laminar Modular OTs, 24/7 Digital Cath Lab, Level III NICU, NABL Pathology, and 24x7 Ambulance.',
};

export default function FacilitiesPage() {
  const detailedFacilities = [
    {
      title: 'Multidisciplinary Intensive Care Unit (ICU & CICU)',
      subtitle: 'Tertiary Critical Care & Cardiac ICU',
      description:
        'Our 24-bed critical care unit features invasive arterial and central venous monitoring, high-end Hamilton and Dräger mechanical ventilators, bedside ultrasound, continuous arterial blood gas (ABG), and dedicated 1:1 intensive nursing ratios overseen by full-time intensivists.',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
      specs: [
        'Isolated Positive Pressure Rooms for Immunocompromised Patients',
        'Bedside Hemodialysis (SLED) for Renal ICU Patients',
        'Advanced Central Cardiac Telemetry Monitoring',
        'Infection Control Protocol strictly meeting NABH Guidelines',
      ],
    },
    {
      title: 'Class 100 Modular Operation Theatres',
      subtitle: 'Zero-Bacteria Sterile Surgical Environment',
      description:
        'Equipped with laminar air flow, HEPA air filtration exchanging air 25+ times per hour, seamless anti-fungal wall paneling, and robotic orthopedic navigation for painless joint replacements and complex neurosurgical interventions.',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1000',
      specs: [
        'Karl Storz 4K Ultra-HD Laparoscopic Towers',
        'Zeiss Surgical Operating Microscope for Neurosurgery',
        'Dual-Dome LED Surgical Lighting with HD Camera recording',
        'Anti-Static Vinyl Conductive Flooring',
      ],
    },
    {
      title: '24/7 Digital Flat-Panel Cardiac Cath Lab',
      subtitle: 'Emergency Heart Attack Interventions (Primary PCI)',
      description:
        'Our state-of-the-art Philips flat-panel Cath Lab delivers ultra-clear visualization of coronary vessels with lowest radiation dose. Stationed 24/7 with emergency interventional cardiologists to perform life-saving angioplasties within the 60-minute golden hour.',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1000',
      specs: [
        'Fractional Flow Reserve (FFR) & IVUS Coronary Imaging',
        'Rotablation for Calcified Arteries',
        'Permanent Pacemaker (PPI) & AICD Implantation',
        'Emergency Intra-Aortic Balloon Pump (IABP) Backup',
      ],
    },
    {
      title: 'Advanced Diagnostic Radiology & Pathology',
      subtitle: 'High Precision 24/7 Diagnostics',
      description:
        'Round-the-clock diagnostic services including high-speed 128-slice CT scanner, 1.5 Tesla MRI, 4D Color Doppler Ultrasound, Digital X-Ray, and fully automated Biochemistry, Hematology, and Microbiology analyzers.',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000',
      specs: [
        'Immediate online digital reports via SMS & WhatsApp',
        'Routine and Specialized Hormonal & Oncology Markers',
        'Bedside Portable X-Ray and Ultrasound for Critical Patients',
        'Strict External Quality Assurance (EQAS) Validated',
      ],
    },
    {
      title: '24x7 Ambulance & Emergency Trauma Triage',
      subtitle: 'Lifesaving Mobile Critical Care',
      description:
        'A dedicated fleet of GPS-equipped Advanced Life Support (ALS) ambulances stationed across Lucknow. Outfitted with transport ventilators, biphasic defibrillators, spinal backboards, and emergency trauma resuscitation drugs.',
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=1000',
      specs: [
        'Trained Emergency Medical Technicians (EMTs) on board',
        'Real-time communication with hospital trauma resuscitation bay',
        'Oxygen bank capable of multi-hour transport',
        'Direct hotline dispatch: +91 91522 99108',
      ],
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-teal-50 text-teal-700 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Building className="w-4 h-4 text-teal-600" />
            <span>State-of-the-Art Infrastructure</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-navy-950 tracking-tight">
            Hospital Facilities & Amenities
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-3">
            Every square foot of Nexa Hospital Lucknow has been architecturally planned around patient safety, sterile cleanliness, and rapid emergency intervention.
          </p>
        </div>

        {/* Detailed Facilities List */}
        <div className="space-y-12">
          {detailedFacilities.map((facility, index) => (
            <div
              key={facility.title}
              className={`bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-soft grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="lg:col-span-6 p-8 sm:p-12 space-y-4">
                <span className="text-xs font-bold text-teal-600 uppercase tracking-wider block">
                  {facility.subtitle}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-navy-950">
                  {facility.title}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed font-light">
                  {facility.description}
                </p>

                <div className="pt-2 space-y-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                    Technical Specifications:
                  </span>
                  {facility.specs.map((spec) => (
                    <div key={spec} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-700 font-medium">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 h-full min-h-[340px] bg-slate-100 relative">
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
