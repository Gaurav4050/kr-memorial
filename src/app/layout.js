import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';

export const metadata = {
  title: {
    default: 'K.R. Memorial Hospital — Best Multi-Specialty Hospital in Jaipur, Rajasthan | 200+ Beds',
    template: '%s | K.R. Memorial Hospital, Jaipur',
  },
  description: 'K.R. Memorial Hospital is a 200+ bedded multi-super specialty hospital in Chomu, Jaipur, Rajasthan. Offering 15 super specialties including Cardiology, Orthopaedics, Neurology, Nephrology, Oncology, and more. 24/7 Emergency, ICU, Ambulance. Book your appointment today.',
  keywords: [
    'best hospital in Jaipur',
    'multi specialty hospital Jaipur',
    'hospital near me Chomu',
    'KR Memorial Hospital',
    'hospital in Rajasthan',
    'cardiology hospital Jaipur',
    'orthopaedics hospital Jaipur',
    'joint replacement Jaipur',
    'neurology hospital Jaipur',
    'nephrology dialysis Jaipur',
    'oncology hospital Rajasthan',
    'laparoscopic surgery Jaipur',
    'best doctors in Jaipur',
    'emergency hospital Chomu',
    '24x7 hospital Jaipur',
    'affordable hospital Rajasthan',
    'RGHS hospital Rajasthan',
    'cashless hospital Jaipur',
    'Sikar Road hospital',
    'NH-11 hospital Chomu',
    'ICU facility Jaipur',
    'ambulance service Jaipur',
    'hospital Chomu Jaipur',
  ],
  authors: [{ name: 'K.R. Memorial Hospital' }],
  creator: 'K.R. Memorial Hospital',
  publisher: 'K.R. Memorial Hospital',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'K.R. Memorial Hospital',
    title: 'K.R. Memorial Hospital — Best Multi-Specialty Hospital in Jaipur, Rajasthan',
    description: '200+ bedded multi-super specialty hospital in Chomu, Jaipur. 15 super specialties, 50+ doctors, 24/7 emergency. Book appointment today.',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@KRMHospital',
    creator: '@KRMHospital',
    title: 'K.R. Memorial Hospital — Best Multi-Specialty Hospital in Jaipur',
    description: '200+ bedded multi-super specialty hospital in Chomu, Jaipur. 15 super specialties, 50+ doctors, 24/7 emergency.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://krmemorialhospital.com',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'healthcare',

};

// Structured Data (JSON-LD)
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Hospital',
  name: 'K.R. Memorial Hospital',
  alternateName: 'KR Memorial Hospital Jaipur',
  url: 'https://krmemorialhospital.com',
  logo: 'https://krmemorialhospital.com/logo.jpeg',
  image: 'https://krmemorialhospital.com/og-image.jpg',
  description: 'K.R. Memorial Hospital is a 200+ bedded multi-super specialty hospital in Chomu, Jaipur, Rajasthan offering 15 super specialties with 24/7 emergency services.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Radha Swami Bagh, NH-11, Sikar Road',
    addressLocality: 'Chomu',
    addressRegion: 'Rajasthan',
    postalCode: '303702',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '27.1663',
    longitude: '75.7284',
  },
  telephone: ['+91-8006005111', '+91-01423-220320'],
  email: 'wecare@krmemorialhospital.com',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '20:00',
      description: 'OPD Hours',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
      description: 'Emergency Services',
    },
  ],
  medicalSpecialty: [
    'GeneralSurgery', 'Orthopedic', 'Nephrology', 'Urology', 'Neurosurgery',
    'Neurology', 'PlasticSurgery', 'Gastroenterology', 'Otolaryngology',
    'Gynecology', 'InternalMedicine', 'Cardiology', 'CardiovascularSurgery',
    'Oncology', 'EmergencyMedicine'
  ],
  availableService: [
    { '@type': 'MedicalProcedure', name: 'Laparoscopic Surgery' },
    { '@type': 'MedicalProcedure', name: 'Joint Replacement' },
    { '@type': 'MedicalProcedure', name: 'Dialysis' },
    { '@type': 'MedicalProcedure', name: 'Cardiac Angioplasty' },
    { '@type': 'MedicalProcedure', name: 'Brain Surgery' },
    { '@type': 'MedicalProcedure', name: 'Cancer Surgery' },
  ],
  numberOfBeds: 200,
  smokingAllowed: false,
  isAccessibleForFree: false,
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, Credit Card, Debit Card, UPI, Insurance',
  sameAs: [
    'https://www.facebook.com/krmhofficial',
    'https://www.instagram.com/krmhospital',
    'https://twitter.com/KRMHospital',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
