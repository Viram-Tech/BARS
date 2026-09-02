import heroImage from '@assets/generated_images/road-safety-hero.jpg';
import evidenceImage from '@assets/generated_images/road-safety-evidence.jpg';
import communityImage from '@assets/generated_images/road-safety-community.jpg';
import repositoryImage from '@assets/generated_images/repository.jpg';
import roadRotating from '@assets/Videos/Road_Rotating.mp4';
import roadsideTimelapse from '@assets/Videos/Roadside_Timelapse.mp4';

type MediaStill = {
  src: string;
  alt: string;
  label: string;
};

type MediaReel = {
  src: string;
  label: string;
  note: string;
  preload: 'none' | 'metadata' | 'auto';
};

export const mediaLibrary = {
  hero: {
    src: heroImage,
    alt: 'Urban road traffic in India with a protected pedestrian crossing',
    label: 'Protected crossing',
  } satisfies MediaStill,
  evidence: {
    src: evidenceImage,
    alt: 'Traffic engineer reviewing evidence beside a safer intersection',
    label: 'Evidence in the field',
  } satisfies MediaStill,
  community: {
    src: communityImage,
    alt: 'Road-safety practitioners and community members beside a school-zone street',
    label: 'Community on the street',
  } satisfies MediaStill,
  repository: {
    src: repositoryImage,
    alt: 'Road-safety evidence and transport research materials',
    label: 'Knowledge shelf',
  } satisfies MediaStill,
  reels: [
    {
      src: roadsideTimelapse,
      label: 'Corridor flow',
      note: 'Volume moving through a typical stretch.',
      preload: 'metadata',
    },
    {
      src: roadRotating,
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
