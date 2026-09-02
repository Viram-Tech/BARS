import { type ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';

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
      className={`focus-ring inline-flex min-h-10 items-center justify-center gap-2 px-4 text-sm font-semibold transition-colors disabled:opacity-50 disabled:pointer-events-none rounded-sm ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export function PageHeader({ eyebrow, title, description, children, imageSrc }: { eyebrow: string; title: string; description: string; children?: ReactNode; imageSrc?: string }) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background px-5 pb-10 pt-12 sm:px-10 lg:px-16 lg:pb-16 lg:pt-20">
      <div className="mx-auto max-w-[1240px] relative z-10">
        <SectionLabel>{eyebrow}</SectionLabel>
        <div className="mt-6 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <div className="animate-rise max-w-2xl">
            <h1 className="font-display text-5xl leading-[.95] tracking-tight text-primary dark:text-foreground sm:text-7xl">
              {title}
            </h1>
            <p className="mt-6 text-[16px] leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
          {children && (
            <div className="animate-rise" style={{ animationDelay: '100ms' }}>
              {children}
            </div>
          )}
        </div>
      </div>
      {imageSrc && (
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none mix-blend-multiply dark:mix-blend-screen hidden lg:block">
          <img src={imageSrc} alt="" className="w-full h-full object-cover object-left" />
          <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent" />
        </div>
      )}
    </section>
  );
}
