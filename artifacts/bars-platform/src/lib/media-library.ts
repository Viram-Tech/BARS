import heroImage from '@assets/generated_images/road-safety-hero.jpg';
import evidenceImage from '@assets/generated_images/road-safety-evidence.jpg';
import communityImage from '@assets/generated_images/road-safety-community.jpg';
import repositoryImage from '@assets/generated_images/repository.jpg';

export const mediaLibrary = {
  hero: {
    src: heroImage,
    alt: 'Urban road traffic in India with a protected pedestrian crossing',
    credit: 'BARS original / generated editorial image',
  },
  evidence: {
    src: evidenceImage,
    alt: 'Traffic engineer reviewing evidence beside a safer Indian intersection',
    credit: 'BARS original / generated editorial image',
  },
  community: {
    src: communityImage,
    alt: 'Indian road-safety practitioners and community members beside a school-zone street',
    credit: 'BARS original / generated editorial image',
  },
  repository: {
    src: repositoryImage,
    alt: 'Road-safety evidence and transport research materials',
    credit: 'BARS repository visual',
  },
  openSourceFieldFilm: {
    src: 'https://assets.mixkit.co/videos/preview/mixkit-traffic-on-a-road-in-the-city-11-large.mp4',
    credit: 'Open-source Mixkit field footage',
  },
} as const;