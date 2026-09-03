import pibLogo from '@sources/PIB_LOGO.webp';
import { barsOrgMedia } from '@/lib/bars-org-media';

type BrandMark = {
  imageUrl: string;
  sourceLabel: string;
};

const favicon = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

export const brandMarks: Record<string, BrandMark> = {
  'BARS Evidence Unit': { imageUrl: barsOrgMedia.logo.color, sourceLabel: 'BARS official mark' },
  'BARS Learning Lab': { imageUrl: barsOrgMedia.logo.color, sourceLabel: 'BARS official mark' },
  'Karnataka Road Safety Authority': { imageUrl: 'https://karnataka.gov.in/frontend/assets/img/favicon.ico', sourceLabel: 'Public mark via karnataka.gov.in' },
  'SaveLIFE Foundation': { imageUrl: 'https://savelifefoundation.org/wp-content/themes/safe/assets/favis/favicon.png', sourceLabel: 'Public mark via savelifefoundation.org' },
  'Mahindra Logistics': { imageUrl: 'https://mahindralogistics.com/wp-content/uploads/2024/10/Mahindra-Logo.png', sourceLabel: 'Public mark via mahindralogistics.com' },
  'Chennai Metropolitan Transport Corporation': { imageUrl: favicon('mtcchennai.com'), sourceLabel: 'Public mark via mtcchennai.com' },
  'Indian Institute of Technology Delhi': { imageUrl: 'https://home.iitd.ac.in/images/logo-iit.png', sourceLabel: 'Public mark via home.iitd.ac.in' },
  'Ministry of Road Transport & Highways': { imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg', sourceLabel: 'Emblem of India' },
  'Lok Sabha / MoRTH eDAR': { imageUrl: 'https://www.google.com/s2/favicons?domain=sansad.in&sz=128', sourceLabel: 'Public mark via sansad.in' },
  'Press Information Bureau': { imageUrl: pibLogo, sourceLabel: 'Press Information Bureau official mark' },
  'Kaggle / sehaj1104': { imageUrl: 'https://www.google.com/s2/favicons?domain=kaggle.com&sz=128', sourceLabel: 'Public mark via kaggle.com' },
  'Kaggle / shivsharantripathi': { imageUrl: 'https://www.google.com/s2/favicons?domain=kaggle.com&sz=128', sourceLabel: 'Public mark via kaggle.com' },
  'World Health Organization': { imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/WHO_logo.svg/120px-WHO_logo.svg.png', sourceLabel: 'WHO mark' },
};

export function getBrandMark(name: string) {
  return brandMarks[name];
}