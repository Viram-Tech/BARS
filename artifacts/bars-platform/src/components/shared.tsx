import { type ReactNode } from 'react';
import { Link } from 'wouter';

export function SectionLabel({ children, number }: { children: ReactNode; number?: string }) {
  return (
    <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.17em] text-muted-foreground">
      {number && <span className="font-mono-ui text-secondary">{number}</span>}
      <span>{children}</span>
    </div>
  );
}

export function Button({
  children,
  variant = 'primary',
  onClick,
  type = 'button',
  className = '',
  testId,
  disabled = false,
}: {
  children: ReactNode;
  variant?: 'primary' | 'quiet' | 'outline' | 'amber' | 'emerald';
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  testId: string;
  disabled?: boolean;
}) {
  const styles = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 border border-primary',
    quiet: 'text-foreground hover:bg-muted',
    outline: 'border border-border bg-transparent text-foreground hover:border-secondary hover:text-secondary',
    amber: 'bg-secondary text-secondary-foreground hover:brightness-95 border border-secondary',
    emerald: 'bg-accent text-accent-foreground hover:brightness-95 border border-accent',
  };
  return (
    <button
      type={type}
      onClick={onClick}
      data-testid={testId}
      disabled={disabled}
      className={`focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-sm px-4 text-sm font-semibold shadow-sm transition-all active:scale-[.98] disabled:pointer-events-none disabled:opacity-50 ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export function PageHeader({ eyebrow, title, description, children, imageSrc, compact = false }: { eyebrow: string; title: string; description: string; children?: ReactNode; imageSrc?: string; compact?: boolean }) {
  return (
    <section className={`relative overflow-hidden border-b border-border bg-background ${compact ? 'py-8 lg:py-10' : 'py-10 lg:py-14'}`}>
      {imageSrc && (
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] lg:block">
          <img src={imageSrc} alt="" className="h-full w-full object-cover object-center opacity-[.28] dark:opacity-[.18]" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20 dark:via-background/85" />
        </div>
      )}
      <div className="bars-page relative z-10">
        <SectionLabel>{eyebrow}</SectionLabel>
        <div className="mt-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="animate-rise max-w-2xl">
            <h1 className={`font-display leading-[.95] tracking-[-.03em] text-foreground ${compact ? 'text-[2rem] sm:text-5xl' : 'text-4xl sm:text-6xl lg:text-7xl'}`}>
              {title}
            </h1>
            <p className={`max-w-[540px] leading-relaxed text-muted-foreground ${compact ? 'mt-4 text-sm sm:text-[15px]' : 'mt-5 text-[15px] sm:text-base'}`}>
              {description}
            </p>
          </div>
          {children && (
            <div className="animate-rise shrink-0" style={{ animationDelay: '100ms' }}>
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="bars-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-mono-ui text-[10px] font-bold uppercase tracking-[.16em] text-secondary">BARS</p>
          <p className="mt-3 font-display text-2xl leading-tight text-foreground">Bharat Association of Road Safety Volunteers</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Neutral, science-driven. Not a ministry portal. Not a private product. A commons for Sarkaar, Bazaar and Samaaj.
          </p>
        </div>
        <div>
          <p className="font-mono-ui text-[10px] font-bold uppercase tracking-[.16em] text-muted-foreground">This platform</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/repository" className="text-foreground hover:text-secondary">Repository</Link></li>
            <li><Link href="/dashboard" className="text-foreground hover:text-secondary">National intelligence</Link></li>
            <li><Link href="/directory" className="text-foreground hover:text-secondary">Directory</Link></li>
            <li><a href="https://bars.org.in" target="_blank" rel="noreferrer" className="text-foreground hover:text-secondary">bars.org.in</a></li>
          </ul>
        </div>
        <div>
          <p className="font-mono-ui text-[10px] font-bold uppercase tracking-[.16em] text-muted-foreground">Official</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="https://morth.gov.in" target="_blank" rel="noreferrer" className="text-foreground hover:text-secondary">MoRTH</a></li>
            <li><a href="https://www.pib.gov.in" target="_blank" rel="noreferrer" className="text-foreground hover:text-secondary">Press Information Bureau</a></li>
            <li><a href="https://sansad.in" target="_blank" rel="noreferrer" className="text-foreground hover:text-secondary">Lok Sabha</a></li>
            <li><a href="https://nhai.gov.in" target="_blank" rel="noreferrer" className="text-foreground hover:text-secondary">NHAI</a></li>
            <li><a href="https://www.who.int/health-topics/road-safety" target="_blank" rel="noreferrer" className="text-foreground hover:text-secondary">WHO road safety</a></li>
          </ul>
        </div>
        <div>
          <p className="font-mono-ui text-[10px] font-bold uppercase tracking-[.16em] text-muted-foreground">Contact</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">B-334, Second Floor, New Friends Colony, New Delhi-110021</p>
          <a href="mailto:contact@bars.org.in" className="mt-3 inline-block text-sm font-semibold text-secondary hover:underline">contact@bars.org.in</a>
          <p className="mt-6 font-mono-ui text-[10px] uppercase tracking-[.14em] text-muted-foreground">Target · 50% fewer deaths by 2030</p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="bars-page flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} BARS. Official figures cited to MoRTH, Lok Sabha, PIB and WHO.</p>
          <p className="text-xs text-muted-foreground">Last reviewed 02 Sep 2026</p>
        </div>
      </div>
    </footer>
  );
}
