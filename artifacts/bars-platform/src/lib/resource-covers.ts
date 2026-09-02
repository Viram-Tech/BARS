import type { Resource } from '@/lib/data';

/** Large stills from Pexels / Unsplash (hotlink, ~4k wide). Matched to the record, not cycled as decoration. */
const pexels = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=3840`;

const unsplash = (photo: string) =>
  `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=3840&q=80`;

export type Cover = { src: string; alt: string; credit: string };

const covers = {
  motorcycle: [
    { src: pexels(8904506), alt: 'Motorcycles on a highway in Lucknow', credit: 'Pexels / Shivam' },
    { src: pexels(14596638), alt: 'Motorbike on a busy street in Delhi', credit: 'Pexels / Shantum Singh' },
    { src: pexels(27565422), alt: 'Motorcyclist in protective gear on an Indian street', credit: 'Pexels / Pratik Brahmbhatt' },
  ],
  highway: [
    { src: pexels(2199293), alt: 'Multi-lane highway traffic', credit: 'Pexels' },
    { src: unsplash('photo-1465447142348-e9952c393450'), alt: 'Elevated highway corridor', credit: 'Unsplash' },
    { src: pexels(1149137), alt: 'Road ahead from a moving vehicle', credit: 'Pexels' },
    { src: pexels(8904506), alt: 'Motorcycles on a highway in Lucknow', credit: 'Pexels / Shivam' },
  ],
  night: [
    { src: pexels(28556110), alt: 'Aerial night traffic in Delhi', credit: 'Pexels / Dev Choubey' },
    { src: pexels(210182), alt: 'Long-exposure urban traffic at night', credit: 'Pexels' },
  ],
  pedestrian: [
    { src: pexels(16968641), alt: 'Zebra crossing at a busy urban intersection', credit: 'Pexels / Jimmy Liao' },
    { src: pexels(19528151), alt: 'Pedestrians and mixed traffic on a Delhi street', credit: 'Pexels / Keith Lobo' },
  ],
  school: [
    { src: pexels(16968641), alt: 'Marked pedestrian crossing used on school journeys', credit: 'Pexels / Jimmy Liao' },
    { src: pexels(19528151), alt: 'People on a city street near mixed traffic', credit: 'Pexels / Keith Lobo' },
  ],
  ambulance: [
    { src: pexels(7527770), alt: 'Ambulance on a road in Pune', credit: 'Pexels / Ajil Saji' },
  ],
  police: [
    { src: pexels(35886031), alt: 'Police vehicles in urban traffic', credit: 'Pexels / Arnold Nagy' },
  ],
  freight: [
    { src: pexels(2199293), alt: 'Highway used by mixed traffic including freight', credit: 'Pexels' },
    { src: pexels(1149137), alt: 'Long road corridor used by freight and mixed traffic', credit: 'Pexels' },
  ],
  data: [
    { src: unsplash('photo-1551288049-bebda4e38f71'), alt: 'Statistical dashboards and charts', credit: 'Unsplash' },
    { src: unsplash('photo-1454165804606-c3d57bc86b40'), alt: 'Analysts reviewing documents and data', credit: 'Unsplash' },
  ],
  government: [
    { src: unsplash('photo-1587474260584-136574528ed5'), alt: 'India Gate, New Delhi — public institution setting', credit: 'Unsplash' },
  ],
  scrap: [
    { src: pexels(190574), alt: 'Vehicle engine and mechanical parts', credit: 'Pexels' },
  ],
  urban: [
    { src: pexels(37243399), alt: 'Urban street scene in New Delhi with mixed traffic', credit: 'Pexels / Faheema Farooque' },
    { src: pexels(14596638), alt: 'Busy Indian city street with mixed traffic', credit: 'Pexels / Shantum Singh' },
    { src: pexels(8904506), alt: 'Urban highway motorcycles in Lucknow', credit: 'Pexels / Shivam' },
  ],
} satisfies Record<string, Cover[]>;

type Topic = keyof typeof covers;

const byId: Record<string, Topic> = {
  'morth-report-2024': 'highway',
  'lok-sabha-2025-edar': 'government',
  'pib-year-end-2025': 'highway',
  'pib-scrappage-cashless-2026': 'scrap',
  'kaggle-indian-roads-2022-2025': 'data',
  'kaggle-indian-accident-5lakh': 'data',
  'who-gsrrs-2023': 'pedestrian',
  'irf-wrs-2025': 'data',
  'black-corridors-nh': 'highway',
  'speed-management-2024': 'urban',
  'blackspot-karnataka': 'highway',
  'ambulance-response': 'ambulance',
  'school-zones': 'school',
  'fleet-safety': 'freight',
  'motorcycle-helmets': 'motorcycle',
  'safe-system-primer': 'pedestrian',
};

const rules: { topic: Topic; test: RegExp }[] = [
  { topic: 'ambulance', test: /ambulance|trauma|golden hour|emergency|cashless|nhs|health authority/i },
  { topic: 'scrap', test: /scrap|scrappage|rvfs|end-of-life/i },
  { topic: 'school', test: /school|child|safer journeys to school/i },
  { topic: 'motorcycle', test: /helmet|seatbelt|two-wheeler|motorcycle|motorbike|vru/i },
  { topic: 'pedestrian', test: /pedestrian|crossing|footpath|walk|safe system/i },
  { topic: 'police', test: /enforcement|police|violation|overspeed|wrong-side|red light|mobile use/i },
  { topic: 'freight', test: /fleet|freight|truck|logistics|work-zone/i },
  { topic: 'night', test: /night|lighting|run-off|dusk/i },
  { topic: 'highway', test: /highway|expressway|national highway|nh stretch|black corridor|black-spot|black spot|road accidents in india/i },
  { topic: 'data', test: /dataset|kaggle|edar|csv|statistics|yearbook|dashboard|open dataset|world road statistics/i },
  { topic: 'government', test: /lok sabha|parliamentary|morth|pib|press release|government report|who global/i },
  { topic: 'urban', test: /urban|arterial|city|street|speed management/i },
];

function pick(list: Cover[], seed: string) {
  let n = 0;
  for (let i = 0; i < seed.length; i += 1) n = (n * 33 + seed.charCodeAt(i)) >>> 0;
  return list[n % list.length];
}

export function coverForResource(resource: Resource): Cover {
  const topic =
    byId[resource.id] ??
    rules.find((rule) => rule.test.test(`${resource.title} ${resource.type} ${resource.description} ${resource.source} ${resource.region}`))?.topic ??
    'urban';
  return pick(covers[topic], resource.id);
}

export const coverFallback = covers.urban[0];
