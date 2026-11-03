import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EmergencyBanner from '@/components/EmergencyBanner';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export const metadata: Metadata = {
  title: 'Nexa Hospital Lucknow | Multi-Speciality Tertiary Healthcare & 24/7 Trauma Care',
  description:
    'Nexa Hospital is a premier NABH-standard hospital in Chinhat, Lucknow, UP. 24x7 Emergency, ICU, Cath Lab, Knee Replacement, Heart Care, Obstetrics, and Advanced Surgery.',
  keywords: [
    'Nexa Hospital Lucknow',
    'Best Hospital in Chinhat Lucknow',
    'Emergency Hospital Lucknow',
    'Cardiology Hospital Lucknow',
    'Joint Replacement Lucknow',
    'Dr Arun Sharma Cardiologist',
    'Dr Priya Awasthi Gynaecologist',
    'Malhaur Chinhat Hospital',
  ],
  authors: [{ name: 'Nexa Hospital Lucknow' }],
  openGraph: {
    title: 'Nexa Hospital Lucknow | World-Class Healthcare',
    description:
      'NABH Standard Multi-Speciality Hospital in Chinhat, Lucknow. 24/7 Emergency & ICU, Advanced Modular OTs, Super-Specialist Doctors.',
    url: 'https://nexahospital.com',
    siteName: 'Nexa Hospital',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexa Hospital Lucknow',
    description: 'Premier Multi-Speciality Healthcare in Lucknow, Uttar Pradesh.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#0B1B3D',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schema.org structured data for Nexa Hospital
  const hospitalSchema = {
    '@context': 'https://schema.org',
    '@type': 'Hospital',
    name: 'Nexa Hospital',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=1200',
    description:
      'Premier multi-speciality tertiary hospital located in Chinhat, Lucknow, Uttar Pradesh offering 24/7 emergency, heart care, joint replacement, mother & child care.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Near Malhaur Railway Station, Nizampur, Chinhat',
      addressLocality: 'Lucknow',
      addressRegion: 'Uttar Pradesh',
      postalCode: '226028',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '26.8790',
      longitude: '81.0260',
    },
    url: 'https://nexahospital.com',
    telephone: '+91-522-3504999',
    emergencyTelephone: '+91-9152299108',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    hasMap: 'https://maps.app.goo.gl/kCBhC8C9eyxRQJpr8',
    medicalSpecialty: [
      'Cardiovascular',
      'Orthopedic',
      'Neurologic',
      'Obstetric',
      'Pediatric',
      'Surgical',
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hospitalSchema) }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
        <EmergencyBanner />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
