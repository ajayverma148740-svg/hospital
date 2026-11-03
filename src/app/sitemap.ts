import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nexahospital.com';

  const routes = [
    '',
    '/about',
    '/departments',
    '/departments/cardiology',
    '/departments/orthopaedics',
    '/departments/neurology',
    '/departments/obstetrics-gynaecology',
    '/departments/emergency-trauma',
    '/departments/general-surgery',
    '/departments/paediatrics',
    '/departments/nephrology',
    '/doctors',
    '/book-appointment',
    '/track-appointment',
    '/facilities',
    '/gallery',
    '/enquiry',
    '/contact',
    '/privacy',
    '/terms',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
