import { barsOrgMedia } from '@/lib/bars-org-media';

type BarsLogoProps = {
  size?: 'sm' | 'md';
};

export function BarsLogo({ size = 'md' }: BarsLogoProps) {
  const height = size === 'sm' ? 'h-8' : 'h-10';

  return (
    <>
      <img
        src={barsOrgMedia.logo.color}
        alt="BARS — Bharat Association of Road Safety Volunteers"
        className={`${height} w-auto max-w-[168px] object-contain object-left dark:hidden`}
      />
      <img
        src={barsOrgMedia.logo.mark}
        alt="BARS — Bharat Association of Road Safety Volunteers"
        className={`${height} hidden w-auto max-w-[168px] object-contain object-left dark:block`}
      />
    </>
  );
}
