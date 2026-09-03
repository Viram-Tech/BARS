import { barsOrgMedia } from '@/lib/bars-org-media';

type MediaStill = {
  src: string;
  alt: string;
  label: string;
};

type MediaReel = {
  src: string;
  poster: string;
  label: string;
  note: string;
  preload: 'none' | 'metadata' | 'auto';
};

const { banners } = barsOrgMedia;

/** Served from public/media — not bundled (keeps deploy size down). */
const roadsideTimelapse = '/media/roadside-timelapse.mp4';
const roadRotating = '/media/road-rotating.mp4';

export const mediaLibrary = {
  hero: {
    src: banners.hero,
    alt: 'BARS road safety platform — field context across India',
    label: 'National field context',
  } satisfies MediaStill,
  evidence: {
    src: banners.field1,
    alt: 'Road safety evidence and corridor monitoring — BARS',
    label: 'Evidence in the field',
  } satisfies MediaStill,
  community: {
    src: banners.about,
    alt: 'BARS volunteers and road safety practitioners',
    label: 'Community on the street',
  } satisfies MediaStill,
  repository: {
    src: banners.field2,
    alt: 'Safer roads collective action — BARS organisation',
    label: 'Knowledge in practice',
  } satisfies MediaStill,
  reels: [
    {
      src: roadsideTimelapse,
      poster: banners.field1,
      label: 'Corridor flow',
      note: 'Volume moving through a typical stretch.',
      preload: 'metadata',
    },
    {
      src: roadRotating,
      poster: banners.field2,
      label: 'Night on the highway',
      note: 'Long sightlines and mixed traffic after dusk.',
      preload: 'none',
    },
  ] satisfies MediaReel[],
  /** @deprecated use mediaLibrary.reels[1] */
  roadRotating: { src: roadRotating },
  /** @deprecated use mediaLibrary.reels[0] */
  roadsideTimelapse: { src: roadsideTimelapse },
  /** @deprecated */
  openSourceFieldFilm: { src: roadsideTimelapse },
} as const;
