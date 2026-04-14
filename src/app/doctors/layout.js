import { departments } from '@/data/hospital';

export const metadata = {
  title: 'Our Doctors & Medical Team — 50+ Expert Specialists',
  description: 'Meet our 50+ expert doctors across 15 super specialties at K.R. Memorial Hospital, Jaipur. Find specialists in Cardiology, Orthopaedics, Neurology, Nephrology, Oncology and more. Book your appointment today.',
  keywords: ['best doctors Jaipur', 'specialist doctors Chomu', 'orthopaedic surgeon Jaipur', 'cardiologist Jaipur', 'neurologist Rajasthan', 'nephrologist dialysis Jaipur'],
  openGraph: {
    title: 'Our Doctors — K.R. Memorial Hospital Jaipur',
    description: 'Meet 50+ expert specialists across 15 departments. Book appointment with the best doctors in Jaipur.',
  },
};

export default function DoctorsLayout({ children }) {
  return children;
}
