import { ArrowRight, ArrowUpRight } from '@/components/hugeicons';
import { SectionLabel } from '@/components/shared';
import { Link } from 'wouter';

export function HomeCta() {
  return (
    <section className="relative overflow-hidden border-t border-border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,hsl(var(--secondary)/0.14),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,hsl(var(--border)/0.55)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.55)_1px,transparent_1px)] [background-size:28px_28px]"
      />

      <div className="bars-page relative py-16 lg:py-20">
        <div className="overflow-hidden rounded-2xl border border-border/80 bg-card/90 shadow-sm backdrop-blur-sm">
          <div className="grid lg:grid-cols-[1.15fr_auto] lg:items-center">
            <div className="border-b border-border/70 px-6 py-8 sm:px-8 lg:border-b-0 lg:border-r lg:py-10">
              <SectionLabel number="10">Start here</SectionLabel>
              <h2 className="mt-4 max-w-[16ch] font-display text-3xl leading-[1.02] text-foreground sm:text-5xl">
                Bring a question. Leave with a source.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                Find practitioners, read the national signal, or open the evidence shelf — all cited to official records.
              </p>
            </div>

            <div className="flex flex-col gap-3 px-6 py-8 sm:flex-row sm:px-8 lg:flex-col lg:px-10 lg:py-10">
              <Link
                href="/directory"
                data-testid="link-home-directory"
                className="focus-ring group inline-flex h-12 items-center justify-between gap-3 rounded-xl bg-secondary px-5 text-sm font-semibold text-secondary-foreground transition hover:brightness-95"
              >
                <span>Meet the network</span>
                <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/dashboard"
                data-testid="link-home-dashboard"
                className="focus-ring group inline-flex h-12 items-center justify-between gap-3 rounded-xl border border-border bg-background px-5 text-sm font-semibold text-foreground transition hover:border-secondary hover:text-secondary"
              >
                <span>Read the signal</span>
                <ArrowUpRight size={16} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
