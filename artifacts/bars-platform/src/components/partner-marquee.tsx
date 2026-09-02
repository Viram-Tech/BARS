import type { EvidenceSource } from '@/lib/evidence-sources';

function PartnerMark({ source, inert }: { source: EvidenceSource; inert?: boolean }) {
  return (
    <a
      href={source.href}
      target="_blank"
      rel="noreferrer"
      tabIndex={inert ? -1 : undefined}
      aria-hidden={inert || undefined}
      className="focus-ring flex shrink-0 items-center gap-2.5 opacity-[0.7] transition-opacity duration-300 hover:opacity-100 dark:opacity-80 dark:hover:opacity-100"
    >
      <img
        src={source.logo}
        alt=""
        className="h-7 w-auto max-h-7 object-contain object-center sm:h-8 sm:max-h-8"
        onError={(event) => {
          if (source.fallbackLogo && event.currentTarget.src !== source.fallbackLogo) {
            event.currentTarget.src = source.fallbackLogo;
          }
        }}
      />
      <span className="whitespace-nowrap font-mono-ui text-[10px] font-bold uppercase tracking-[.14em] text-muted-foreground">
        {source.short}
      </span>
    </a>
  );
}

export function PartnerMarquee({ sources }: { sources: EvidenceSource[] }) {
  return (
    <div className="bars-logo-rail mt-10 border-t border-border py-8 sm:py-9" role="region" aria-label="Evidence sources">
      <div className="bars-logo-marquee">
        <div className="bars-logo-group">
          {sources.map((source) => (
            <PartnerMark key={source.name} source={source} />
          ))}
        </div>
        <div className="bars-logo-group" aria-hidden="true">
          {sources.map((source) => (
            <PartnerMark key={`loop-${source.name}`} source={source} inert />
          ))}
        </div>
      </div>
    </div>
  );
}
