/**
 * Official BARS organisation media from Sources/Bars_Org_IMGS.
 * Single registry — use these instead of generated placeholders or hotlinks.
 */
import logoColor from '@sources/Bars_Org_IMGS/logo-color.png';
import logoMark from '@sources/Bars_Org_IMGS/logo.png';
import banner from '@sources/Bars_Org_IMGS/banner.webp';
import banner1 from '@sources/Bars_Org_IMGS/banner1.webp';
import banner2 from '@sources/Bars_Org_IMGS/banner2.webp';
import aboutUs from '@sources/Bars_Org_IMGS/about-us.png';
import bannerMob from '@sources/Bars_Org_IMGS/banner-mob.jpg.jpeg';
import bannerMob1 from '@sources/Bars_Org_IMGS/banner-mob1.jpg.jpeg';
import bannerMob2 from '@sources/Bars_Org_IMGS/banner-mob2.jpg.jpeg';
import voiceSudhir from '@sources/Bars_Org_IMGS/sudhir-malhotra.jpg.jpeg';
import voiceNaresh from '@sources/Bars_Org_IMGS/naresh.jpg.jpeg';
import voiceMats from '@sources/Bars_Org_IMGS/mats.jpg.jpeg';
import voiceUmashankar from '@sources/Bars_Org_IMGS/umashankar.jpg.png';
import voiceRama from '@sources/Bars_Org_IMGS/rama.jpg.png';
import voicePawan from '@sources/Bars_Org_IMGS/pawan.jpg.jpeg';

export type BarsOrgImage = {
  src: string;
  alt: string;
  credit: string;
};

export type BarsOrgVideo = {
  src: string;
  title: string;
  credit: string;
  poster: string;
};

export const barsOrgMedia = {
  logo: {
    color: logoColor,
    mark: logoMark,
  },
  banners: {
    hero: banner,
    field1: banner1,
    field2: banner2,
    about: aboutUs,
    mob: bannerMob,
    mob1: bannerMob1,
    mob2: bannerMob2,
  },
  voices: {
    'Sudhir Malhotra': voiceSudhir,
    'Naresh Raghavan': voiceNaresh,
    'Dr. Mats-Åke Belin': voiceMats,
    'Sh. V. Umashankar': voiceUmashankar,
    'Rama Shankar Pandey': voiceRama,
    'Pawan Mulukutla': voicePawan,
  } as Record<string, string>,
  /** Square org films — served from public/ (Git LFS copies of Sources/Bars_ORG_Vids). */
  orgFilms: [
    { src: '/media/org-vids/1.mp4', poster: bannerMob1, label: 'Voices for safer roads · 01' },
    { src: '/media/org-vids/2.mp4', poster: bannerMob2, label: 'Voices for safer roads · 02' },
    { src: '/media/org-vids/3.mp4', poster: aboutUs, label: 'Voices for safer roads · 03' },
  ] satisfies { src: string; poster: string; label: string }[],
} as const;

export function getBarsVoicePhoto(name: string): string | undefined {
  return barsOrgMedia.voices[name];
}
