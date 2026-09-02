import barsLogo from '@assets/BARS_LOGO_1788333872731.png';

type BrandMark = {
  imageUrl: string;
  sourceLabel: string;
};

const favicon = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

export const brandMarks: Record<string, BrandMark> = {
  'BARS Evidence Unit': { imageUrl: barsLogo, sourceLabel: 'BARS original mark' },
  'BARS Learning Lab': { imageUrl: barsLogo, sourceLabel: 'BARS original mark' },
  'Karnataka Road Safety Authority': { imageUrl: 'https://karnataka.gov.in/frontend/assets/img/favicon.ico', sourceLabel: 'Public mark via karnataka.gov.in' },
  'SaveLIFE Foundation': { imageUrl: 'https://savelifefoundation.org/wp-content/themes/safe/assets/favis/favicon.png', sourceLabel: 'Public mark via savelifefoundation.org' },
  'Mahindra Logistics': { imageUrl: 'https://mahindralogistics.com/wp-content/uploads/2024/10/Mahindra-Logo.png', sourceLabel: 'Public mark via mahindralogistics.com' },
  'Chennai Metropolitan Transport Corporation': { imageUrl: favicon('mtcchennai.com'), sourceLabel: 'Public mark via mtcchennai.com' },
  'Indian Institute of Technology Delhi': { imageUrl: 'https://home.iitd.ac.in/images/logo-iit.png', sourceLabel: 'Public mark via home.iitd.ac.in' },
  'Ministry of Road Transport & Highways': { imageUrl: 'https://morth.gov.in/assets/images/favicon.ico', sourceLabel: 'Public mark via morth.gov.in' },
  'Indian Institute of Public Health': { imageUrl: 'https://iiphg.org/phfi-logo.jpg', sourceLabel: 'Public mark via iiphg.org' },
};

export function getBrandMark(name: string) {
  return brandMarks[name];
}