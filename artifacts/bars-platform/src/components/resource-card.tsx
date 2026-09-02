import { useState } from 'react';
import { ArrowUpRight, CheckCircle2, FileText } from '@/components/hugeicons';
import type { Resource } from '@/lib/data';
import { coverFallback, coverForResource } from '@/lib/resource-covers';

function networkFor(resource: Resource): 'Sarkaar' | 'Bazaar' | 'Samaaj' {
  const hay = `${resource.source} ${resource.type}`.toLowerCase();
  if (/morth|lok sabha|pib|nhai|nha|rajya|police|transport office|state road|government|parliamentary/.test(hay)) return 'Sarkaar';
  if (/kaggle|fleet|logistics|bazaar/.test(hay)) return 'Bazaar';
  return 'Samaaj';
}

const networkTone = {
  Sarkaar: 'bg-primary/90 text-primary-foreground',
  Bazaar: 'bg-secondary text-secondary-foreground',
  Samaaj: 'bg-accent text-accent-foreground',
};

export function ResourceCard({ resource, testId }: { resource: Resource; testId?: string }) {
  const [open, setOpen] = useState(false);
  const [broken, setBroken] = useState(false);
  const cover = broken ? coverFallback : coverForResource(resource);
  const network = networkFor(resource);
  const official = /MoRTH|Lok Sabha|PIB|WHO|NHAI|Press Information/.test(resource.source);

  return (
    <article
      data-testid={testId ?? `card-resource-${resource.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_2px_hsl(var(--foreground)/.04)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-secondary/30 hover:shadow-[0_18px_40px_hsl(var(--foreground)/.08)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={cover.src}
          alt={cover.alt}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          onError={() => setBroken(true)}
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
          <span className={`rounded-full px-2.5 py-1 font-mono-ui text-[10px] font-bold uppercase tracking-[.12em] ${networkTone[network]}`}>
            {network}
          </span>
          {official && (
            <span className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-card/95 px-2 py-1 font-mono-ui text-[10px] font-bold uppercase tracking-[.12em] text-accent backdrop-blur-sm">
              <CheckCircle2 size={11} /> Verified
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <p className="font-mono-ui text-[10px] font-bold uppercase tracking-[.16em] text-secondary">{resource.type}</p>
        <h2 className="mt-2 font-display text-[1.35rem] leading-tight text-foreground">{resource.title}</h2>
        <p className={`mt-2 text-sm leading-relaxed text-muted-foreground ${open ? '' : 'line-clamp-2'}`}>
          {resource.description}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <button
            type="button"
            data-testid={`button-open-resource-${resource.id}`}
            onClick={() => setOpen((value) => !value)}
            className="focus-ring self-start text-xs font-semibold text-secondary hover:underline"
          >
            {open ? 'Show less' : 'Read record'}
          </button>
          {resource.href && (
            <a
              href={resource.href}
              target="_blank"
              rel="noreferrer"
              data-testid={`link-resource-source-${resource.id}`}
              className="focus-ring inline-flex items-center gap-1 text-xs font-semibold text-foreground hover:text-secondary"
            >
              View source <ArrowUpRight size={12} />
            </a>
          )}
        </div>
        {open && (
          <p data-testid={`text-resource-record-${resource.id}`} className="mt-2 font-mono-ui text-[11px] text-muted-foreground">
            {resource.format} · {resource.year} · {resource.region}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4 text-xs text-muted-foreground">
          <span className="flex min-w-0 items-center gap-1.5">
            <FileText size={13} />
            <span className="truncate">{resource.source}</span>
          </span>
          <span className="shrink-0 font-mono-ui whitespace-nowrap">{resource.year}</span>
        </div>
      </div>
    </article>
  );
}
