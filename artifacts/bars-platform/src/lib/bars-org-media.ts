/** Hotlinked media from https://bars.org.in — official BARS organisation site. */
const base = 'https://bars.org.in';

export type BarsOrgImage = {
  src: string;
  alt: string;
  credit: string;
};

export type BarsOrgVideo = {
  src: string;
  title: string;
  credit: string;
  poster?: string;
};

export const barsOrgMedia = {
  logo: `${base}/images/logo.png`,
  banners: [
    { src: `${base}/images/banner1.webp`, alt: 'Road safety banner — BARS national platform', credit: 'bars.org.in' },
    { src: `${base}/images/banner2.webp`, alt: 'Safer roads collective action — BARS', credit: 'bars.org.in' },
    { src: `${base}/images/banner-mob.jpg`, alt: 'Road safety in India — field context', credit: 'bars.org.in' },
    { src: `${base}/images/about-us.png`, alt: 'BARS volunteers and road safety practitioners', credit: 'bars.org.in' },
    { src: `${base}/images/cta-2.png`, alt: 'Stop and cone — enforcement and field safety', credit: 'bars.org.in' },
  ] satisfies BarsOrgImage[],
  pillars: [
    { src: `${base}/images/sarkaar.png`, alt: 'Sarkaar — government and public institutions', credit: 'bars.org.in · Sarkaar' },
    { src: `${base}/images/bazaar.png`, alt: 'Bazaar — industry and fleet partners', credit: 'bars.org.in · Bazaar' },
    { src: `${base}/images/samaaj.png`, alt: 'Samaaj — communities and civil society', credit: 'bars.org.in · Samaaj' },
  ] satisfies BarsOrgImage[],
  about: {
    src: `${base}/images/about-us.png`,
    alt: 'Who we are — Bharat Association of Road Safety Volunteers',
    credit: 'bars.org.in',
  } satisfies BarsOrgImage,
  heroPoster: `${base}/images/banner1.webp`,
  reels: [
    { src: `${base}/reel/1.mp4`, title: 'Corridor flow', credit: 'bars.org.in', poster: `${base}/images/banner1.webp` },
    { src: `${base}/reel/2.mp4`, title: 'Night on the highway', credit: 'bars.org.in', poster: `${base}/images/banner2.webp` },
    { src: `${base}/reel/3.mp4`, title: 'Community on the street', credit: 'bars.org.in', poster: `${base}/images/banner-mob.jpg` },
  ] satisfies BarsOrgVideo[],
} as const;
