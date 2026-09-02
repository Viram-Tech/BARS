import { useState } from 'react';
import { ArrowRight, Bookmark, CheckCircle2, Download } from '@/components/hugeicons';
import { PageHeader, SectionLabel, Button } from '@/components/shared';

export default function DesignSystem() {
  const [tab, setTab] = useState<'tokens' | 'components'>('tokens');
  
  return (
    <div className="flex-1 flex flex-col bg-background">
      <PageHeader 
        eyebrow="04 / Living design system" 
        title="The BARS language." 
        description="A small, deliberate set of visual decisions for communicating evidence with clarity, warmth, and institutional confidence." 
      />
      
      <section className="flex-1 px-5 py-8 sm:px-10 lg:px-16 lg:py-12">
        <div className="mx-auto max-w-[1240px]">
          
          <div className="flex gap-8 border-b border-border">
            <button 
              onClick={() => setTab('tokens')} 
              data-testid="button-design-tokens" 
              className={`focus-ring relative pb-4 text-sm font-bold uppercase tracking-wider transition-colors ${tab === 'tokens' ? 'text-primary dark:text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Foundations
              {tab === 'tokens' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary" />}
            </button>
            <button 
              onClick={() => setTab('components')} 
              data-testid="button-design-components" 
              className={`focus-ring relative pb-4 text-sm font-bold uppercase tracking-wider transition-colors ${tab === 'components' ? 'text-primary dark:text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Components
              {tab === 'components' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary" />}
            </button>
          </div>
          
          {tab === 'tokens' ? (
            <div className="mt-12 grid gap-16 lg:grid-cols-2">
              
              {/* Colors */}
              <div>
                <SectionLabel number="A">Colour as signal</SectionLabel>
                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-2">
                  {[
                    ['Navy', 'bg-primary', 'Institution & Primary text', 'text-primary-foreground'], 
                    ['Saffron', 'bg-secondary', 'Action & Highlights', 'text-secondary-foreground'], 
                    ['Emerald', 'bg-accent', 'Progress & Verification', 'text-accent-foreground'], 
                    ['Paper', 'bg-background', 'Context & Canvas', 'text-foreground border border-border']
                  ].map(([name, colorClass, role, textClass]) => (
                    <div key={name} className="surface-card overflow-hidden rounded-xl">
                      <div className={`h-32 p-4 flex items-end ${colorClass} ${textClass}`}>
                        <span className="font-mono-ui text-xs font-bold uppercase tracking-widest opacity-80">{name}</span>
                      </div>
                      <div className="p-4">
                        <p className="text-xs font-semibold text-muted-foreground">{role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Typography */}
              <div>
                <SectionLabel number="B">Type in two voices</SectionLabel>
                <div className="surface-card mt-8 space-y-10 rounded-xl p-8">
                  <div>
                    <p className="font-display text-5xl leading-none text-primary dark:text-foreground tracking-tight">Evidence moves us.</p>
                    <p className="mt-4 flex items-center gap-3 font-mono-ui text-xs font-bold text-muted-foreground">
                      <span className="rounded-sm bg-muted px-2 py-1">Instrument Serif</span> Display & Emotion
                    </p>
                  </div>
                  <div className="border-t border-border pt-8">
                    <p className="text-lg font-medium leading-relaxed text-foreground max-w-sm">Every record should help someone decide what to do next.</p>
                    <p className="mt-4 flex items-center gap-3 font-mono-ui text-xs font-bold text-muted-foreground">
                      <span className="rounded-sm bg-muted px-2 py-1">Manrope</span> Interface & Utility
                    </p>
                  </div>
                  <div className="border-t border-border pt-8">
                    <p className="font-mono-ui text-base text-secondary font-bold tracking-widest">2030 / Q2 / 1,68,491</p>
                    <p className="mt-4 flex items-center gap-3 font-mono-ui text-xs font-bold text-muted-foreground">
                      <span className="rounded-sm bg-muted px-2 py-1">DM Mono</span> Data & Navigation
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Principles */}
              <div className="lg:col-span-2">
                <SectionLabel number="C">Spacing & edges</SectionLabel>
                <div className="mt-8 grid gap-6 sm:grid-cols-3">
                  <div className="surface-card rounded-xl p-8">
                    <div className="h-1 w-12 bg-secondary rounded-full" />
                    <p className="mt-6 font-display text-2xl text-primary dark:text-foreground">Sharp hierarchy</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Borders and rules do the work of decoration. Everything has its place.</p>
                  </div>
                  <div className="surface-card rounded-xl p-8">
                    <div className="flex items-end gap-1.5 h-8">
                      <span className="h-3 w-3 rounded-sm bg-accent" />
                      <span className="h-5 w-3 rounded-sm bg-accent" />
                      <span className="h-8 w-3 rounded-sm bg-accent" />
                    </div>
                    <p className="mt-6 font-display text-2xl text-primary dark:text-foreground">Measured rhythm</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">A quiet scale with plenty of room for dense data and real content.</p>
                  </div>
                  <div className="surface-card rounded-xl p-8">
                    <div className="h-8 border-l-[3px] border-secondary pl-3 flex items-center text-sm font-bold text-secondary">Focus</div>
                    <p className="mt-6 font-display text-2xl text-primary dark:text-foreground">Human emphasis</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Saffron and Emerald mark the moments that need a practitioner's attention.</p>
                  </div>
                </div>
              </div>
              
            </div>
          ) : (
            <div className="mt-12 grid gap-12 lg:grid-cols-2">
              
              {/* Controls */}
              <div>
                <SectionLabel number="A">Controls</SectionLabel>
                <div className="surface-card mt-8 space-y-8 rounded-xl p-8">
                  <div>
                    <p className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Buttons</p>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="primary" testId="button-show-primary">Primary action <ArrowRight size={16} /></Button>
                      <Button variant="amber" testId="button-show-amber">Mark for review</Button>
                      <Button variant="outline" testId="button-show-outline">Secondary</Button>
                    </div>
                  </div>
                  
                  <div className="border-t border-border pt-8">
                    <p className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Icon Actions & Badges</p>
                    <div className="flex flex-wrap items-center gap-4">
                      <button data-testid="button-show-bookmark" className="focus-ring flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors">
                        <Bookmark size={18} />
                      </button>
                      <button data-testid="button-show-download" className="focus-ring flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background text-foreground hover:bg-muted transition-colors">
                        <Download size={18} />
                      </button>
                      <span className="flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1.5 text-xs font-bold text-accent border border-accent/20">
                        <CheckCircle2 size={16} /> Verified record
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Editorial */}
              <div>
                <SectionLabel number="B">Editorial blocks</SectionLabel>
                <div className="mt-8 space-y-6">
                   <div className="surface-card rounded-xl border-l-[4px] border-secondary p-6">
                    <p className="text-base font-bold text-foreground">A useful note</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Context belongs next to the number, not hidden behind it. Use this block to explain caveats or data provenance.</p>
                  </div>
                  
                  <div className="rounded-xl bg-primary p-8 text-primary-foreground shadow-lg overflow-hidden relative">
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-secondary/20 to-transparent pointer-events-none" />
                    <p className="font-display text-4xl leading-tight">Ask a better question.</p>
                    <p className="mt-4 text-sm leading-relaxed text-primary-foreground/80 max-w-sm">
                      The assistant should point to evidence, show its limits, and invite the next step.
                    </p>
                  </div>
                </div>
              </div>
              
            </div>
          )}
          
        </div>
      </section>
    </div>
  );
}
