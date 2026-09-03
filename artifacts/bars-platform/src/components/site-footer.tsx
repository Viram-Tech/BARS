import { ArrowUpRight } from '@/components/hugeicons';
import { BarsLogo } from '@/components/bars-logo';
import { Link } from 'wouter';
import { barsOrg } from '@/lib/site-content';

const platformLinks = [
  { label: 'Repository', href: '/repository' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Directory', href: '/directory' },
] as const;

const sourceLinks = [
  { label: 'MoRTH', href: 'https://morth.gov.in' },
  { label: 'Lok Sabha', href: 'https://sansad.in' },
  { label: 'WHO', href: 'https://www.who.int/health-topics/road-safety' },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-border bg-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent"
      />

      <div className="bars-page py-12 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
          <div className="space-y-5">
            <BarsLogo size="sm" />
            <p className="max-w-md font-display text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.12] tracking-[-0.025em] text-foreground">
              {barsOrg.name}
            </p>
          </div>

          <div>
            <p className="font-mono-ui text-[10px] font-bold uppercase tracking-[.16em] text-muted-foreground">Platform</p>
            <ul className="mt-4 space-y-2.5">
              {platformLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm font-medium text-foreground transition hover:text-secondary">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={barsOrg.site}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition hover:text-secondary"
                >
                  bars.org.in
                  <ArrowUpRight size={14} />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono-ui text-[10px] font-bold uppercase tracking-[.16em] text-muted-foreground">Sources & contact</p>
            <ul className="mt-4 space-y-2.5">
              {sourceLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition hover:text-secondary"
                  >
                    {item.label}
                    <ArrowUpRight size={14} />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${barsOrg.email}`}
              className="mt-5 inline-block text-sm font-semibold text-secondary hover:underline"
            >
              {barsOrg.email}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border/80">
        <div className="bars-page flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} BARS · Figures cited to MoRTH, Lok Sabha, PIB & WHO</p>
          <p className="font-mono-ui text-[11px] text-muted-foreground">Last reviewed 02 Sep 2026</p>
        </div>
      </div>
    </footer>
  );
}
