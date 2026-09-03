import pibLogo from '@sources/PIB_LOGO.webp';
import { barsOrgMedia } from '@/lib/bars-org-media';

const emblem = 'https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg';
const whoLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/WHO_logo.svg/240px-WHO_logo.svg.png';
const kaggleLogo = 'https://www.kaggle.com/static/images/logos/kaggle-logo-transparent-300.png';
const nhaiLogo = 'https://upload.wikimedia.org/wikipedia/en/8/80/National_Highways_Authority_of_India_logo.png';
const sansadLogo = 'https://sansad.in/static-backend/assets/images/lok-sabha.png';
const nhaLogo = 'https://nha.gov.in/img/NHA-logo.png';
const unLogo = 'https://upload.wikimedia.org/wikipedia/commons/e/ee/UN_emblem_blue.svg';
const iitdLogo = 'https://home.iitd.ac.in/images/logo-iit.png';
const wriLogo = 'https://www.wri.org/favicon.ico';
const saveLifeLogo = 'https://savelifefoundation.org/wp-content/themes/safe/assets/favis/favicon.png';
const favicon = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=256`;

export type EvidenceSource = {
  name: string;
  short: string;
  href: string;
  logo: string;
  fallbackLogo?: string;
  role: string;
};

export const evidenceSources: EvidenceSource[] = [
  {
    name: 'Ministry of Road Transport & Highways',
    short: 'MoRTH',
    href: 'https://morth.gov.in',
    logo: emblem,
    role: 'Road Accidents in India · eDAR',
  },
  {
    name: 'Press Information Bureau',
    short: 'PIB',
    href: 'https://www.pib.gov.in',
    logo: pibLogo,
    role: 'Year-end review · scrappage · cashless care',
  },
  {
    name: 'Lok Sabha',
    short: 'Lok Sabha',
    href: 'https://sansad.in',
    logo: sansadLogo,
    fallbackLogo: favicon('sansad.in'),
    role: 'Unstarred Q. 1939 · 30 Jul 2026',
  },
  {
    name: 'National Highways Authority of India',
    short: 'NHAI',
    href: 'https://nhai.gov.in',
    logo: nhaiLogo,
    fallbackLogo: favicon('nhai.gov.in'),
    role: 'NH network · black corridors',
  },
  {
    name: 'National Health Authority',
    short: 'NHA',
    href: 'https://nha.gov.in',
    logo: nhaLogo,
    fallbackLogo: favicon('nha.gov.in'),
    role: 'Cashless treatment · TMS 2.0',
  },
  {
    name: 'eDAR / iRAD',
    short: 'eDAR',
    href: 'https://edar.morth.gov.in',
    logo: favicon('edar.morth.gov.in'),
    fallbackLogo: emblem,
    role: 'Electronic detailed accident reports',
  },
  {
    name: 'National Crime Records Bureau',
    short: 'NCRB',
    href: 'https://ncrb.gov.in',
    logo: favicon('ncrb.gov.in'),
    fallbackLogo: emblem,
    role: 'Accidental Deaths & Suicides in India',
  },
  {
    name: 'India.gov.in',
    short: 'India.gov',
    href: 'https://www.india.gov.in',
    logo: favicon('india.gov.in'),
    fallbackLogo: emblem,
    role: 'National portal · schemes and notices',
  },
  {
    name: 'World Health Organization',
    short: 'WHO',
    href: 'https://www.who.int/health-topics/road-safety',
    logo: whoLogo,
    fallbackLogo: favicon('who.int'),
    role: 'Global Status Report on Road Safety',
  },
  {
    name: 'UN Decade of Action',
    short: 'UN Decade',
    href: 'https://www.undecadeofaction.org',
    logo: unLogo,
    fallbackLogo: favicon('un.org'),
    role: 'Decade of Action 2021–2030',
  },
  {
    name: 'Bharat Association of Road Safety Volunteers',
    short: 'BARS',
    href: 'https://bars.org.in',
    logo: barsOrgMedia.logo.color,
    fallbackLogo: favicon('bars.org.in'),
    role: 'New Delhi Road Safety Declaration',
  },
  {
    name: 'WRI India',
    short: 'WRI India',
    href: 'https://wri-india.org',
    logo: wriLogo,
    fallbackLogo: favicon('wri.org'),
    role: 'Knowledge partner · New Delhi Declaration',
  },
  {
    name: 'Indian Institute of Technology Delhi',
    short: 'IIT Delhi',
    href: 'https://home.iitd.ac.in',
    logo: iitdLogo,
    fallbackLogo: favicon('iitd.ac.in'),
    role: 'Host · New Delhi Road Safety Declaration',
  },
  {
    name: 'SaveLIFE Foundation',
    short: 'SaveLIFE',
    href: 'https://savelifefoundation.org',
    logo: saveLifeLogo,
    fallbackLogo: favicon('savelifefoundation.org'),
    role: 'Road safety practice and research',
  },
  {
    name: 'Kaggle',
    short: 'Kaggle',
    href: 'https://www.kaggle.com',
    logo: kaggleLogo,
    fallbackLogo: favicon('kaggle.com'),
    role: 'Labelled open accident samples',
  },
];
