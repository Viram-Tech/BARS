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
