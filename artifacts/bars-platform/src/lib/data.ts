export type Resource = {
  id: string;
  type: string;
  title: string;
  description: string;
  source: string;
  year: string;
  region: string;
  format: string;
  featured?: boolean;
};

export const resources: Resource[] = [
  {
    id: 'speed-management-2024',
    type: 'Briefing note',
    title: 'Speed management on urban arterial roads',
    description: 'A practical evidence review of lower urban speed limits, street design, and enforcement in Indian cities.',
    source: 'BARS Evidence Unit',
    year: '2024',
    region: 'National',
    format: 'PDF · 28 pages',
    featured: true,
  },
  {
    id: 'blackspot-karnataka',
    type: 'Field report',
    title: 'From black spots to safer corridors: Karnataka',
    description: 'What changed across 117 high-risk locations after engineering, enforcement, and community reporting were aligned.',
    source: 'Karnataka Road Safety Authority',
    year: '2023',
    region: 'Karnataka',
    format: 'Report · 64 pages',
  },
  {
    id: 'ambulance-response',
    type: 'Data note',
    title: 'The first 60 minutes: emergency response times',
    description: 'A district-level view of trauma response readiness across the Golden Quadrilateral, 2021–23.',
    source: 'National Trauma Data Collaborative',
    year: '2024',
    region: 'National',
    format: 'Dataset · CSV',
  },
  {
    id: 'school-zones',
    type: 'Toolkit',
    title: 'Safer journeys to school',
    description: 'A co-designed toolkit for school leaders, ward officers, parents, and young road users.',
    source: 'Samaaj Practice Group',
    year: '2022',
    region: 'Maharashtra',
    format: 'Toolkit · 42 pages',
  },
  {
    id: 'fleet-safety',
    type: 'Case study',
    title: 'Making safety a fleet decision',
    description: 'How a 4,800-vehicle logistics network moved from compliance training to leading indicators.',
    source: 'Bazaar Working Group',
    year: '2024',
    region: 'Telangana',
    format: 'Case study · 12 pages',
  },
  {
    id: 'morth-report',
    type: 'Government report',
    title: 'Road accidents in India: 2022',
    description: 'Official national and state-level tables on crashes, fatalities, causes, and road-user categories.',
    source: 'Ministry of Road Transport & Highways',
    year: '2023',
    region: 'National',
    format: 'Report · 186 pages',
  },
  {
    id: 'motorcycle-helmets',
    type: 'Research paper',
    title: 'Helmet use, fit, and enforcement in tier-two cities',
    description: 'Mixed-method research from four cities on why helmet use persists, slips, and changes.',
    source: 'Indian Institute of Public Health',
    year: '2021',
    region: 'Rajasthan',
    format: 'Paper · 19 pages',
  },
  {
    id: 'safe-system-primer',
    type: 'Primer',
    title: 'A Safe System primer for Indian practitioners',
    description: 'A shared language for designing roads that account for human error and protect human life.',
    source: 'BARS Learning Lab',
    year: '2024',
    region: 'National',
    format: 'Primer · 34 pages',
  },
];

export const states = [
  { name: 'Tamil Nadu', short: 'TN', fatality: 8.7, trend: -14, coverage: 82, tone: 'leading' },
  { name: 'Karnataka', short: 'KA', fatality: 10.9, trend: -8, coverage: 76, tone: 'steady' },
  { name: 'Maharashtra', short: 'MH', fatality: 12.4, trend: -3, coverage: 69, tone: 'steady' },
  { name: 'Rajasthan', short: 'RJ', fatality: 14.8, trend: 6, coverage: 54, tone: 'watch' },
  { name: 'Uttar Pradesh', short: 'UP', fatality: 16.2, trend: 2, coverage: 48, tone: 'watch' },
];

export const directoryRecords = [
  { id: 'r1', kind: 'Organisation', name: 'Karnataka Road Safety Authority', detail: 'State road safety authority', location: 'Bengaluru, Karnataka', network: 'Sarkaar', verified: true, initials: 'KR' },
  { id: 'r2', kind: 'Organisation', name: 'SaveLIFE Foundation', detail: 'Policy and emergency care', location: 'New Delhi, Delhi', network: 'Samaaj', verified: true, initials: 'SL' },
  { id: 'r3', kind: 'Expert', name: 'Dr. Meera Iyer', detail: 'Trauma systems and public health', location: 'Chennai, Tamil Nadu', network: 'Samaaj', verified: true, initials: 'MI' },
  { id: 'r4', kind: 'Organisation', name: 'Mahindra Logistics', detail: 'Commercial fleet operator', location: 'Mumbai, Maharashtra', network: 'Bazaar', verified: true, initials: 'ML' },
  { id: 'r5', kind: 'Expert', name: 'Arun Prakash', detail: 'Street design and active mobility', location: 'Pune, Maharashtra', network: 'Samaaj', verified: true, initials: 'AP' },
  { id: 'r6', kind: 'Organisation', name: 'Chennai Metropolitan Transport Corporation', detail: 'Public transport operator', location: 'Chennai, Tamil Nadu', network: 'Sarkaar', verified: true, initials: 'CM' },
  { id: 'r7', kind: 'Expert', name: 'Nandita Rao', detail: 'Behaviour change and communications', location: 'Hyderabad, Telangana', network: 'Bazaar', verified: true, initials: 'NR' },
  { id: 'r8', kind: 'Organisation', name: 'Indian Institute of Technology Delhi', detail: 'Transport research centre', location: 'New Delhi, Delhi', network: 'Samaaj', verified: true, initials: 'ID' },
];
