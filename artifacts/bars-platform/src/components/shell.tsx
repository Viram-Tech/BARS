import { type ReactNode } from 'react';
import { Navbar1 } from '@/components/ui/navbar-1';
import { SiteFooter } from '@/components/site-footer';
import { tickerItems } from '@/lib/site-content';

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="bars-grain flex min-h-[100dvh] flex-col bg-background text-foreground">
      <a href="#main-content" className="bars-skip focus-ring">Skip to content</a>
      <header className="sticky top-0 z-20 shrink-0">
        <div className="relative z-30 overflow-hidden bg-primary text-primary-foreground">
          <div className="flex whitespace-nowrap">
            <div className="bars-marquee gap-10 py-2 font-mono-ui text-[11px] font-semibold uppercase tracking-[.14em]">
              {[...tickerItems, ...tickerItems].map((item, index) => (
                <span key={`${item}-${index}`} className="inline-flex items-center gap-10">
                  <span>{item}</span>
                  <span className="text-secondary" aria-hidden="true">/</span>
                </span>
              ))}
            </div>
          </div>
        </div>
        <Navbar1 />
      </header>
      <main id="main-content" className="flex flex-1 flex-col">{children}</main>
      <SiteFooter />
    </div>
  );
}
