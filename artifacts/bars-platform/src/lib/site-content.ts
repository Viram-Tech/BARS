export const barsOrg = {
  name: 'Bharat Association of Road Safety Volunteers',
  short: 'BARS',
  email: 'contact@bars.org.in',
  site: 'https://bars.org.in',
  address: 'B-334, Second Floor, New Friends Colony, New Delhi-110021',
  target: '50% fewer road deaths and grievous injuries by 2030',
} as const;

export const tickerItems = [
  'Lok Sabha Q.1939 · 1,83,434 road deaths in 2025',
  'eDAR · 1,01,139 deaths in 2026 through 27 July',
  'Annexure-II · 48,039 pedestrian fatalities in 2025',
  'PIB · National Highways 1,46,560 km',
  'PIB · 4,30,306 vehicles scrapped · 129 RVSFs',
  'MoRTH · 6,358 black corridors on the NH network',
  'BARS · New Delhi Road Safety Declaration · 50% by 2030',
  'WHO Decade of Action 2021–2030 · Safe System',
];

export const importantLinks = [
  { name: 'Ministry of Road Transport & Highways', href: 'https://morth.gov.in', group: 'Sarkaar' },
  { name: 'Press Information Bureau', href: 'https://www.pib.gov.in', group: 'Sarkaar' },
  { name: 'Lok Sabha / Sansad', href: 'https://sansad.in', group: 'Sarkaar' },
  { name: 'National Highways Authority of India', href: 'https://nhai.gov.in', group: 'Sarkaar' },
  { name: 'National Health Authority', href: 'https://nha.gov.in', group: 'Sarkaar' },
  { name: 'India.gov.in', href: 'https://www.india.gov.in', group: 'Sarkaar' },
  { name: 'eDAR / iRAD', href: 'https://edar.morth.gov.in', group: 'Sarkaar' },
  { name: 'WHO Road Safety', href: 'https://www.who.int/health-topics/road-safety', group: 'Global' },
  { name: 'UN Decade of Action', href: 'https://www.undecadeofaction.org', group: 'Global' },
  { name: 'BARS organisation', href: 'https://bars.org.in', group: 'BARS' },
  { name: 'Kaggle', href: 'https://www.kaggle.com', group: 'Open data' },
];

export const barsIs = [
  'A knowledge and best-practice repository',
  'A facilitator of partnerships across Sarkaar, Bazaar and Samaaj',
  'A catalyst and trust layer for the ecosystem',
  'A synchroniser of existing efforts — not a duplicate of them',
  'A science- and data-aligned institutional bridge',
  'Guardian of a national repository on road safety in India',
];

export const barsIsNot = [
  'Not an implementing agency or project executor',
  'Not a grant-making or funding body',
  'Not political, and not a campaign vehicle',
  'Not a competitor to ministries, NGOs, or operators',
  'Not a substitute for MoRTH official totals',
  'Not activism without evidence',
];

const voicePhoto = (file: string) => `/media/voices/${file}`;

export const voices = [
  {
    quote: 'Human life is non-negotiable. Road safety cannot remain fragmented or reactive. I support the New Delhi Road Safety Declaration because it calls for coordinated, accountable action to prevent deaths that should never occur.',
    name: 'Sudhir Malhotra',
    role: 'Former Vice-President, Renault India',
    photo: voicePhoto('sudhir-malhotra.jpg'),
  },
  {
    quote: 'Of the four E’s of Road Safety, Engineering of Roads is not really in our hands, Enforcement is not in our hands, Emergency services is not in our hands. The only thing in our hands is Education — Driver Education. I believe a well trained, defensive driver can drive safely, overcoming flaws in engineering and enforcement. And that is why I stand in support of the New Delhi Road Safety Declaration.',
    name: 'Naresh Raghavan',
    role: 'Topdriver India',
    photo: voicePhoto('naresh.jpg'),
  },
  {
    quote: 'Road safety is now firmly on the global agenda, with strong political and media attention. Our responsibility is to move beyond awareness and ensure consistent, evidence-based implementation so that no country is left behind in preventing road traffic deaths.',
    name: 'Dr. Mats-Åke Belin',
    role: 'Global Lead – Decade of Action for Road Safety, WHO',
    photo: voicePhoto('mats.jpg'),
  },
  {
    quote: 'As a nation, we cannot accept road fatalities as inevitable. Each accident is personal, each loss preventable. Awareness is not enough — what we need is organised, district-level action, backed by certainty of enforcement and supported by strong institutions. When compliance becomes habit and accountability becomes certain, road safety will move from intention to impact.',
    name: 'Sh. V. Umashankar',
    role: 'Secretary, Ministry of Road Transport & Highways, Government of India',
    photo: voicePhoto('umashankar.png'),
  },
  {
    quote: 'Road safety is not merely a transport issue; it is a governance responsibility and a moral obligation. The New Delhi Declaration shifts the national conversation from fragmented initiatives to coordinated, time-bound, accountable action.',
    name: 'Rama Shankar Pandey',
    role: 'Chairman – BARS',
    photo: voicePhoto('rama.png'),
  },
  {
    quote: 'Road safety is a systems challenge, one that demands shared responsibility and collective action. BARS and the New Delhi Declaration have brought together India’s road safety ecosystem — the institutions, data and design — putting human life at the forefront. The Declaration will transform intent into accountability, at scale.',
    name: 'Pawan Mulukutla',
    role: 'Executive Program Director, Integrated Transport, Clean Air and Hydrogen, WRI India',
    photo: voicePhoto('pawan.jpg'),
  },
];

export const faqs = [
  {
    q: 'What does a national road safety platform in India actually do?',
    a: 'It connects Sarkaar, Bazaar and Samaaj; holds official series next to open samples; and makes it possible to find people, practice, and proof without duplicating existing institutions. BARS is a trust layer and a repository, not an implementing agency.',
  },
  {
    q: 'Are the 2025 death figures from MoRTH or from a model?',
    a: 'From the Union government. Lok Sabha Unstarred Q. 1939, answered 30 July 2026, Annexure-I (eDAR): 5,13,474 crashes and 1,83,434 deaths in 2025. 2026* is eDAR through 27 July. Kaggle files on this site are labelled samples and are not substitutes for those totals.',
  },
  {
    q: 'How can organisations or NGOs join the network?',
    a: 'Register interest through the directory, collaborate on shared evidence, and take part in knowledge exchange. Write to contact@bars.org.in. BARS prioritises long-term commitment over short campaigns.',
  },
  {
    q: 'What kind of data and resources are on this platform?',
    a: 'MoRTH annual series, Lok Sabha annexures, PIB programme facts, WHO status reports, two labelled Kaggle samples, practice notes, toolkits, and a verified directory of institutions and practitioners. Card counts and national KPIs are from the cited source — not generated catalogue totals.',
  },
  {
    q: 'How does district-level road safety support work?',
    a: 'District work is capacity, coordination, and a monitoring frame — not a parallel project office. Start from the official national series and the sourced repository records, then work with the state RSA and volunteer network in the directory.',
  },
  {
    q: 'Can corporates contribute?',
    a: 'Yes — through CSR aligned to proven interventions, fleet leading indicators, data sharing, and advocacy that does not replace public duty. BARS is not a funding body.',
  },
  {
    q: 'Is BARS a government website?',
    a: 'No. BARS is a neutral, science-driven association. Official numbers shown here are cited to MoRTH, Lok Sabha, PIB and WHO. The platform is a commons, not a ministry portal and not a private product.',
  },
  {
    q: 'What is the New Delhi Road Safety Declaration?',
    a: 'A stakeholder commitment, hosted by BARS at IIT Delhi with WRI India as knowledge partner, to cut road deaths and serious injuries by at least 50% by 2030 in line with the WHO Decade of Action — shifting from fragmented initiatives to accountable, time-bound action.',
  },
];
