# 🏥 Nexa Hospital – Premium Healthcare Portal & Administration System
**Nexa Hospital, Lucknow, Uttar Pradesh, India**  
*Google Maps Reference:* [https://maps.app.goo.gl/kCBhC8C9eyxRQJpr8](https://maps.app.goo.gl/kCBhC8C9eyxRQJpr8)

---

## 🌟 Overview

Nexa Hospital is a state-of-the-art, production-ready, multi-speciality tertiary healthcare web platform and hospital management system designed with an uncompromising standard of UI/UX, clinical aesthetics, smooth animations, and data security.

The application serves both **patients** (with real-time online appointment scheduling, slot reservation, doctor profiles, interactive Google Maps location, and DPDP-compliant enquiry forms) and **hospital administrators** (with a comprehensive, role-based dashboard at `/admin` for managing appointments, doctors, OPD schedules, clinical departments, patient enquiries, content CMS, and audit security logs).

---

## 🛠️ Technology Stack

### **Frontend**
- **Framework:** Next.js 14 (App Router) with React 18 & TypeScript
- **Styling:** Tailwind CSS with custom medical palettes (Navy Blue `#0B1B3D`, Medical Turquoise `#0D9488`, Clean Whites & Soft Medical Blues `#F0F7FF`)
- **Icons:** Lucide React
- **Animations & Interactivity:** Framer Motion & CSS custom micro-interactions with `@media (prefers-reduced-motion: reduce)` accessibility compliance

### **Backend & Database**
- **Runtime:** Node.js with Next.js App Router Route Handlers (`/api/*`)
- **Database ORM:** Prisma ORM
- **Database Engine:** 
  - **Development:** Zero-configuration SQLite (`file:./dev.db`) for instant local testing.
  - **Production:** PostgreSQL supported natively (includes `docker-compose.yml` and `prisma/schema.postgresql.prisma`).
- **Authentication & Security:** 
  - Role-Based Access Control (`ADMIN`, `RECEPTIONIST`, `DOCTOR`)
  - Password Hashing with `bcryptjs`
  - Stateless JWT token signing with `jose` using HTTP-Only secure cookies
  - System audit trails logging every critical clinical and administrative action

---

## 🔐 Demo Credentials

Use these pre-seeded accounts to sign in at [`/admin/login`](http://localhost:3000/admin/login):

| Role | Email | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `admin@nexahospital.com` | `Admin@12345` | Full hospital governance, appointments, doctors, CMS, security logs |
| **Receptionist** | `reception@nexahospital.com` | `Recept@12345` | Front-desk appointment confirmation, rescheduling, enquiries |
| **Doctor** | `dr.arun@nexahospital.com` | `Doctor@12345` | OPD clinical scheduling and appointment reviews |

*(Convenient one-click quick login presets are also available right on the login card).*

---

## 🚀 Quickstart Guide

### 1. Prerequisites
- **Node.js:** v18+ or v20+ LTS (installed and configured)
- **NPM:** v9+ or v10+

### 2. Install Dependencies
```bash
npm install
```

### 3. Initialize Database & Seed Medical Data
The project comes pre-configured with Prisma. Initialize the database and run the comprehensive seed script:
```bash
# Push Prisma schema to SQLite (or Postgres if configured)
npx prisma db push

# Seed realistic Lucknow hospital departments, doctors, appointments, and FAQs
node prisma/seed.js
```

### 4. Run the Integration Test Suite
Verify that database relations, appointment booking, slot deduplication, and auth mechanisms pass:
```bash
npm test
```

### 5. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗺️ Website Sections (Homepage Order)

1. **Top Emergency Bar & Navigation Bar:** Hospital branding, NABH badge, OPD timings, direct emergency click-to-call.
2. **Hero Section:** Premium hospital photography, Headline: *"Your Health, Our Priority."*, short hospital introduction, *Book Appointment* and *Emergency Call* CTAs.
3. **Hospital Statistics:** Verified numbers (25+ Specialists, 15+ Advanced Departments, 50,000+ Happy Patients, 24/7 Emergency & ICU Care, 150+ Bedded Facility, 99.4% Patient Satisfaction).
4. **About Nexa Hospital:** Mission, vision, Class 100 modular OTs, and Lucknow healthcare commitment.
5. **Our Medical Departments:** Interactive department cards with treatments and direct links.
6. **Meet Our Doctors:** Specialist profiles with qualifications (AIIMS/KGMU/SGPGI), OPD timings, and ratings.
7. **Why Choose Nexa Hospital?:** Computer-navigated joint replacement, 24/7 Cath Lab, cashless TPA insurance.
8. **Hospital Facilities:** Multidisciplinary ICU, Modular OTs, 24/7 NABL Pathology, ALS Ambulances, Inpatient Suites.
9. **Patient Appointment Booking:** Embedded interactive real-time slot picker with instant confirmation reference.
10. **Patient Testimonials:** Verified reviews from patients in Lucknow (Gomti Nagar, Chinhat, Aliganj).
11. **Frequently Asked Questions:** Interactive accordion FAQ on OPD, insurance, ambulance, and visiting hours.
12. **Hospital Location & Directions:** Interactive Google Map embed, driving instructions, parking, and transit guide.
13. **Contact & Enquiry Form:** Direct patient inquiry submission with real-time status tracking.
14. **Professional Footer:** Social media links, quick navigation, legal policies, and hospital staff portal link.

---

## 📑 Individual Website Pages

- `/` – Homepage
- `/about` – Comprehensive hospital story, mission, and leadership
- `/departments` – All medical departments directory
- `/departments/[slug]` – Department details with clinical procedures & consulting doctors
- `/doctors` – Searchable doctor directory with experience and OPD schedules
- `/doctors/[id]` – Detailed doctor profile and direct booking
- `/book-appointment` – Full appointment booking portal with real-time slot verification
- `/track-appointment` – Patient self-service tracking by Reference ID (`NXA-YYYY-XXXXX`) & Phone
- `/facilities` – Hospital infrastructure and technology specifications
- `/gallery` – Categorized photo gallery (OT, ICU, Diagnostics, Health Camps)
- `/enquiry` – Patient assistance & Cashless TPA insurance helpdesk
- `/contact` – Contact details, Google Map directions, and emergency hotlines
- `/privacy` – Healthcare Data Protection & DPDP Act 2023 compliance policy
- `/terms` – Clinical terms of service and OPD guidelines

---

## 🛡️ Admin Dashboard Modules (`/admin`)

- **Overview (`/admin`):** Live KPIs for total, today's, pending, and confirmed appointments, total doctors, departments, recent enquiries, and quick actions.
- **Appointments (`/admin/appointments`):** Search, filter by status or date, one-click confirm, reschedule, cancel with reason, print appointment slip, and export report to CSV.
- **Doctors (`/admin/doctors`):** Add new doctors, edit designations, qualifications, fees, OPD schedules, upload photos, and toggle active status.
- **Departments (`/admin/departments`):** Add clinical departments, edit descriptions, manage procedure lists, upload banner images, and toggle publish status.
- **Enquiries (`/admin/enquiries`):** Review patient questions, update status (`NEW` → `IN_REVIEW` → `RESOLVED`), assign staff, and log internal notes.
- **Content CMS (`/admin/content`):** Update hospital telephone numbers, emergency lines, OPD timings, campus address, FAQs, patient testimonials, and gallery images.
- **Staff & Security (`/admin/security`):** Manage administrative accounts, configure roles, and inspect the real-time audit log stream.

---

## 🐘 PostgreSQL Production Deployment

To connect Nexa Hospital to a dedicated PostgreSQL instance:

1. Start the included PostgreSQL container via Docker Compose:
```bash
docker-compose up -d
```
2. Update `.env` with your PostgreSQL connection URL:
```env
DATABASE_URL="postgresql://nexa_admin:nexa_secure_password_2025@localhost:5432/nexa_hospital_db?schema=public"
```
3. Update `provider = "postgresql"` in `prisma/schema.prisma` (or copy from `prisma/schema.postgresql.prisma`), then run:
```bash
npx prisma db push
node prisma/seed.js
```

---

## 📍 Hospital Contact & Location
- **Address:** Near Malhaur Railway Station, Nizampur, Chinhat, Lucknow, Uttar Pradesh 226028, India
- **General Hospital Line:** +91 522 350 4999
- **24/7 Emergency & Ambulance:** +91 91522 99108
- **Official Google Maps Link:** [https://maps.app.goo.gl/kCBhC8C9eyxRQJpr8](https://maps.app.goo.gl/kCBhC8C9eyxRQJpr8)
