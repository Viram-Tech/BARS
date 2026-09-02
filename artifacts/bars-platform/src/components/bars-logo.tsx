import barsLogo from '@assets/BARS_LOGO_1788333872731.png';

type BarsLogoProps = {
  size?: 'sm' | 'md';
};

export function BarsLogo({ size = 'md' }: BarsLogoProps) {
  const height = size === 'sm' ? 'h-8' : 'h-10';

  return (
    <img
      src={barsLogo}
      alt="BARS — Bharat Association of Road Safety"
      className={`${height} w-auto max-w-[168px] object-contain object-left mix-blend-multiply dark:mix-blend-normal dark:invert dark:hue-rotate-180 dark:brightness-110 dark:contrast-105`}
    />
  );
}
