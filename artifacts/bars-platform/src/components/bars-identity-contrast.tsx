import { Check, X } from '@/components/hugeicons';
import { barsIs, barsIsNot } from '@/lib/site-content';

function stripNotPrefix(text: string) {
  return text.replace(/^Not\s+/i, '');
}

export function BarsIdentityContrast() {
  return (
    <div className="relative grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2 lg:gap-0">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-8 hidden h-[calc(100%-4rem)] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent lg:block"
      />

      <article className="relative overflow-hidden rounded-xl border border-secondary/30 bg-gradient-to-br from-secondary/10 via-card to-card p-4 sm:p-5 lg:rounded-r-none lg:border-r-0 lg:p-6 dark:from-secondary/15 dark:via-card dark:to-background">
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-secondary/10 blur-2xl dark:bg-secondary/20" />
        <header className="relative flex items-start gap-3 sm:items-center">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-sm sm:size-9">
            <Check size={17} strokeWidth={2.5} />
          </span>
          <div className="min-w-0">
            <p className="font-mono-ui text-[10px] font-bold uppercase tracking-[.18em] text-secondary">What BARS is</p>
            <p className="text-xs text-muted-foreground">Trust layer · repository · bridge</p>
          </div>
        </header>
        <ul className="relative mt-4 space-y-2 sm:mt-5 sm:space-y-2.5">
          {barsIs.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-lg border border-secondary/20 bg-card px-3 py-2.5 sm:px-3.5 sm:py-3 dark:border-secondary/25 dark:bg-card/90"
            >
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary dark:bg-secondary/20">
                <Check size={12} strokeWidth={2.5} />
              </span>
              <span className="text-sm font-bold leading-snug text-foreground sm:text-[15px]">{item}</span>
            </li>
          ))}
        </ul>
      </article>

      <article className="relative overflow-hidden rounded-xl border border-dashed border-border bg-muted/40 p-4 sm:p-5 lg:rounded-l-none lg:border-l-0 lg:p-6 dark:bg-muted/25">
        <div className="pointer-events-none absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-muted-foreground/5 blur-2xl" />
        <header className="relative flex items-start gap-3 sm:items-center">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted-foreground sm:size-9">
            <X size={15} strokeWidth={2.25} />
          </span>
          <div className="min-w-0">
            <p className="font-mono-ui text-[10px] font-bold uppercase tracking-[.18em] text-muted-foreground">What BARS is not</p>
            <p className="text-xs text-muted-foreground/90">Out of scope · not a substitute</p>
          </div>
        </header>
        <ul className="relative mt-4 space-y-2 sm:mt-5 sm:space-y-2.5">
          {barsIsNot.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-lg border border-border/80 bg-background/60 px-3 py-2.5 sm:px-3.5 sm:py-3 dark:bg-background/40"
            >
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-border bg-muted/70 text-muted-foreground dark:bg-muted/50">
                <X size={11} strokeWidth={2.25} />
              </span>
              <span className="text-sm leading-snug text-muted-foreground sm:text-[15px]">{stripNotPrefix(item)}</span>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
