import { useState } from 'react';
import { getBrandMark } from '@/lib/brand-marks';

type BrandMarkProps = {
  name: string;
  initials: string;
  size?: 'sm' | 'md' | 'lg';
};

export function BrandMark({ name, initials, size = 'md' }: BrandMarkProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const brand = getBrandMark(name);
  const sizeClass = size === 'lg' ? 'h-14 w-14' : size === 'sm' ? 'h-9 w-9' : 'h-12 w-12';
  const textClass = size === 'lg' ? 'text-base' : size === 'sm' ? 'text-[10px]' : 'text-xs';

  return (
    <div className={`flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-white shadow-sm ${sizeClass}`}>
      {brand && !imageFailed ? (
        <img
          src={brand.imageUrl}
          alt={`${name} logo`}
          title={brand.sourceLabel}
          onError={() => setImageFailed(true)}
          className="h-full w-full object-contain p-2"
        />
      ) : (
        <span aria-hidden="true" className={`font-mono-ui font-bold tracking-tight text-primary ${textClass}`}>
          {initials}
        </span>
      )}
    </div>
  );
}