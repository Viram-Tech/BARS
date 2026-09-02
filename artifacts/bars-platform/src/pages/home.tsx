import { ArrowRight, ArrowUpRight, BarChart3, BookOpen, MessageCircle, Network } from 'lucide-react';
import { Link } from 'wouter';
import { SectionLabel } from '@/components/shared';
import { MediaStory } from '@/components/media-story';
import heroImg from '@assets/generated_images/hero.jpg';

export default function Home({ onAsk }: { onAsk: () => void }) {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-background px-5 pb-20 pt-16 sm:px-10 sm:pt-24 lg:px-16 lg:pb-32 lg:pt-28">
        <div className="mx-auto max-w-[1240px] relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
            <div className="animate-rise max-w-[820px]">
              <SectionLabel number="00">The BARS platform</SectionLabel>
              <h1 className="mt-8 font-display text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.9] tracking-tight text-primary dark:text-foreground">
                Safer roads<br />
                <span className="italic opacity-90">start</span> with<br />
                <span className="text-secondary">shared truth.</span>
              </h1>
              <p className="mt-10 max-w-[540px] text-lg leading-relaxed text-muted-foreground">
                BARS brings India&apos;s road-safety evidence, people, and practice into one working commons — so that every decision can move us closer to 2030.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link 
                  href="/repository" 
                  data-testid="link-hero-repository" 
                  className="focus-ring inline-flex h-12 items-center gap-3 rounded-sm bg-primary px-6 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5"
                >
                  Explore the repository <ArrowRight size={16} />
                </Link>
                <button 
                  onClick={onAsk} 
                  data-testid="button-hero-ask" 
                  className="focus-ring inline-flex h-12 items-center gap-2 rounded-sm border border-border bg-card px-6 text-sm font-bold text-foreground shadow-sm transition-all hover:border-secondary hover:text-secondary hover:shadow-md hover:-translate-y-0.5"
                >
                  Ask a question <MessageCircle size={15} />
                </button>
              </div>
            </div>
            
            <div className="animate-rise hidden lg:block" style={{ animationDelay: '150ms' }}>
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-xl">
                <div className="absolute right-0 top-0 h-1.5 w-32 bg-secondary" />
                <div className="flex items-start justify-between">
                  <SectionLabel number="01">Why this exists</SectionLabel>
                  <span className="rounded-sm bg-muted px-2 py-1 font-mono-ui text-[10px] font-medium text-muted-foreground">
                    BARS / 001
                  </span>
                </div>
                <p className="mt-10 font-display text-4xl leading-tight text-primary dark:text-foreground">
                  A road crash is never just a number.
                </p>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                  Behind every record is a journey, a family, a livelihood, a community. Better evidence helps institutions see the full picture — and act before harm repeats.
                </p>
                
                <div className="mt-10 grid grid-cols-2 gap-4 border-t border-border pt-6">
                  <div className="rounded-lg bg-muted/50 p-4">
                    <span className="block font-mono-ui text-xl font-medium text-primary dark:text-foreground">Sarkaar</span>
                    <span className="mt-1 block text-xs text-muted-foreground">Policy & infrastructure</span>
                  </div>
                  <div className="rounded-lg bg-secondary/10 p-4 border border-secondary/20">
                    <span className="block font-mono-ui text-xl font-medium text-secondary">Bazaar</span>
                    <span className="mt-1 block text-xs text-secondary/80">Business & mobility</span>
                  </div>
                  <div className="col-span-2 rounded-lg bg-accent/10 p-4 border border-accent/20">
                    <span className="block font-mono-ui text-xl font-medium text-accent">Samaaj</span>
                    <span className="mt-1 block text-xs text-accent/80">People & communities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute -bottom-16 right-[-40px] hidden select-none font-mono-ui text-[240px] font-bold leading-none text-primary/[.02] dark:text-foreground/[.02] lg:block">
          B
        </div>
      </section>

      {/* Platform Features */}
      <section className="px-5 py-20 sm:px-10 lg:px-16 lg:py-28 bg-muted/20">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <SectionLabel number="02">A platform for the whole system</SectionLabel>
              <h2 className="mt-6 font-display text-4xl leading-tight text-primary dark:text-foreground sm:text-6xl">
                Move from isolated effort to collective progress.
              </h2>
            </div>
            <p className="max-w-[320px] text-base leading-relaxed text-muted-foreground">
              The hard work is already happening across the country. BARS makes it easier to find, trust, and build on it.
            </p>
          </div>
          
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              { n: '01', title: 'Know what works', copy: 'Search a living repository of research, policy, field notes, and tools — grounded in Indian context.', icon: BookOpen, href: '/repository' },
              { n: '02', title: 'See the signal', copy: 'Read national and state-level indicators together, with the nuance that a headline number cannot hold.', icon: BarChart3, href: '/dashboard' },
              { n: '03', title: 'Find your people', copy: 'Connect with verified institutions and practitioners working on the same road, in the same direction.', icon: Network, href: '/directory' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link 
                  key={item.n} 
                  href={item.href} 
                  data-testid={`link-platform-${item.n}`} 
                  className="focus-ring group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:border-border/80"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 font-mono-ui text-sm font-bold text-secondary">
                        {item.n}
                      </span>
                      <Icon className="text-muted-foreground group-hover:text-secondary transition-colors" size={24} strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-12 font-display text-3xl text-primary dark:text-foreground">{item.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.copy}</p>
                  </div>
                  <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
                    <span className="text-xs font-bold uppercase tracking-[.12em] text-secondary">Open module</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground group-hover:bg-secondary group-hover:text-secondary-foreground transition-all">
                      <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-10 lg:px-16 lg:py-28 bg-background">
        <div className="mx-auto max-w-[1240px]">
          <MediaStory
            image={heroImg}
            eyebrow="05 / Field perspective"
            title="See the street behind the statistic."
            description="Road safety becomes practical when data, design, and lived experience are viewed together. Explore a visual briefing built for the people who make journeys safer."
          />
        </div>
      </section>

      {/* The 2030 Frame */}
      <section className="bg-primary px-5 py-20 text-primary-foreground sm:px-10 lg:px-16 lg:py-28 relative overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-secondary via-primary to-primary pointer-events-none" />
        
        <div className="mx-auto max-w-[1240px] relative z-10">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24 items-center">
            <div>
              <SectionLabel number="03">The 2030 frame</SectionLabel>
              <h2 className="mt-8 font-display text-5xl leading-[.92] sm:text-7xl">
                A safer road is a design decision.
              </h2>
              <p className="mt-8 max-w-[420px] text-base leading-relaxed text-primary-foreground/70">
                India&apos;s road-safety mission needs more than awareness. It needs an honest view of risk, and the discipline to make safety the default.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-px bg-primary-foreground/10 border border-primary-foreground/10 rounded-2xl overflow-hidden">
              {[
                ['1.68 L', 'reported road deaths in 2022', 'MoRTH / 2023'],
                ['80%', 'fatalities involve vulnerable road users', 'BARS synthesis'],
                ['28', 'states with active safety committees', 'BARS directory'],
                ['2030', 'the horizon for action, not aspiration', 'BARS mission'],
              ].map(([value, label, source], index) => (
                <div key={value} className="bg-primary p-6 sm:p-10 flex flex-col justify-center transition-colors hover:bg-primary-foreground/5">
                  <span className="font-mono-ui text-4xl sm:text-5xl font-bold text-secondary">{value}</span>
                  <p className="mt-4 text-sm font-medium leading-relaxed">{label}</p>
                  <span className="mt-4 inline-block rounded-sm bg-primary-foreground/10 px-2 py-1 font-mono-ui text-[9px] uppercase tracking-[.14em] text-primary-foreground/60 w-fit">
                    {source}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Outro CTA */}
      <section className="px-5 py-20 sm:px-10 lg:px-16 lg:py-28 bg-card">
        <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div className="rounded-2xl bg-muted/50 p-8 sm:p-12 border border-border relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-secondary" />
            <p className="font-display text-4xl leading-tight text-primary dark:text-foreground sm:text-5xl">
              “We cannot solve what we cannot see together.”
            </p>
            <p className="mt-8 font-mono-ui text-xs uppercase tracking-[.14em] text-muted-foreground flex items-center gap-3">
              <span className="h-px w-8 bg-border" />
              A shared principle / BARS founding note
            </p>
          </div>
          
          <div className="lg:pl-10">
            <SectionLabel number="04">Start where you are</SectionLabel>
            <p className="mt-6 max-w-[480px] text-lg leading-relaxed text-muted-foreground">
              Whether you work in a ministry, run a fleet, study transport, or simply want your street to be safer, there is a place for your question and your contribution.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link 
                href="/directory" 
                data-testid="link-home-directory" 
                className="focus-ring inline-flex h-12 items-center gap-2 rounded-sm bg-secondary px-6 text-sm font-bold text-secondary-foreground transition-all hover:bg-secondary/90 hover:shadow-md hover:-translate-y-0.5"
              >
                Meet the network <ArrowRight size={16} />
              </Link>
              <Link 
                href="/dashboard" 
                data-testid="link-home-dashboard" 
                className="focus-ring inline-flex h-12 items-center gap-2 rounded-sm border border-border bg-transparent px-6 text-sm font-bold text-foreground transition-all hover:border-primary hover:text-primary"
              >
                Read the signal <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="border-t border-border bg-background px-5 py-10 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-secondary text-secondary-foreground font-mono-ui text-xs font-bold shadow-sm">B</span>
            <span className="font-mono-ui text-xs font-semibold tracking-widest text-foreground">BARS</span>
          </div>
          <span className="text-sm font-medium text-muted-foreground">Knowledge in service of safer journeys.</span>
        </div>
      </footer>
    </div>
  );
}
