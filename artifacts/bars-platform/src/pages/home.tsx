import { ArrowRight, ArrowUpRight } from '@/components/hugeicons';
import { Link } from 'wouter';
import { CountUpNumber } from '@/components/count-up-number';
import { HomeCta } from '@/components/home-cta';
import { BarsIdentityContrast } from '@/components/bars-identity-contrast';
import { SectionLabel } from '@/components/shared';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HeroSearch } from '@/components/hero-search';
import { mediaLibrary } from '@/lib/media-library';
import { PartnerMarquee } from '@/components/partner-marquee';
import { TestimonialSection1 } from '@/components/ui/testimonial-section-1';
import { VoicesFilms } from '@/components/voices-films';
import { evidenceSources } from '@/lib/evidence-sources';
import { officialNational, officialPedestrian } from '@/lib/official-series';
import { barsOrg, faqs, importantLinks, voices } from '@/lib/site-content';
import { directoryRecords, resources } from '@/lib/data';

export default function Home({ onAsk }: { onAsk: () => void }) {
  const groups = [...new Set(importantLinks.map((link) => link.group))];

  return (
    <div>
      <section className="relative isolate min-h-[min(78vh,820px)] -mt-[5.5rem] border-b border-border bg-background sm:-mt-[6.25rem]">
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={mediaLibrary.hero.src}
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-center motion-reduce:hidden"
          >
            <source src={mediaLibrary.reels[1].src} type="video/mp4" />
          </video>
          <img src={mediaLibrary.hero.src} alt="" className="absolute inset-0 hidden h-full w-full object-cover motion-reduce:block" />
          <div className="absolute inset-0 bg-background/38 dark:bg-background/48" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/88 via-background/52 to-background/16" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="bars-page relative z-10 pb-14 pt-[6.25rem] sm:pt-[7rem] lg:pb-20">
          <div className="max-w-2xl animate-rise">
            <SectionLabel number="00">BARS platform</SectionLabel>
            <h1 className="mt-6 max-w-[16ch] font-display text-[clamp(2.7rem,6.2vw,5.8rem)] leading-[0.94] tracking-tight text-foreground">
              Safer roads <span className="italic opacity-90">start</span> with <span className="text-secondary">shared truth.</span>
            </h1>
            <p className="mt-6 max-w-[34rem] text-balance text-base leading-relaxed text-muted-foreground sm:text-[17px] sm:leading-[1.65]">
              A <span className="bars-word-mark">science-driven commons</span> for India — aligning{' '}
              <span className="bars-word-mark">Sarkaar</span>, <span className="bars-word-mark">Bazaar</span> and{' '}
              <span className="bars-word-mark">Samaaj</span> to cut road deaths and grievous injuries{' '}
              <span className="bars-word-mark">50% by 2030</span>.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/repository" data-testid="link-hero-repository" className="focus-ring inline-flex h-11 items-center gap-2.5 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                Open the repository <ArrowRight size={16} />
              </Link>
              <button onClick={onAsk} data-testid="button-hero-ask" className="focus-ring inline-flex h-11 items-center gap-2 rounded-md border border-border bg-card/75 px-5 text-sm font-semibold text-foreground backdrop-blur-sm hover:border-secondary hover:text-secondary">
                Ask BARS
              </button>
            </div>
          </div>

          <div className="mt-10 animate-rise lg:mt-12" style={{ animationDelay: '120ms' }}>
            <HeroSearch />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="bars-page grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { href: '/repository', n: '01', title: 'Know what works', count: resources.length, copy: 'sourced records — MoRTH, Lok Sabha, PIB, WHO and labelled samples.' },
            { href: '/dashboard', n: '02', title: 'See the signal', copy: 'MoRTH, Lok Sabha, PIB and labelled Kaggle samples in one frame.' },
            { href: '/directory', n: '03', title: 'Find your people', count: directoryRecords.length, copy: 'verified institutions and practitioners.' },
          ].map((item) => (
            <Link key={item.n} href={item.href} className="focus-ring group flex items-start justify-between gap-4 px-0 py-7 sm:px-6 sm:py-8">
              <div>
                <p className="font-mono-ui text-[11px] font-bold text-secondary">{item.n}</p>
                <h2 className="mt-2 font-display text-2xl text-foreground group-hover:text-secondary">{item.title}</h2>
                <p className="mt-2 max-w-[36ch] text-sm leading-relaxed text-muted-foreground">
                  {item.count != null && item.n === '01' ? (
                    <>
                      Search <CountUpNumber value={item.count} className="font-semibold text-foreground" delay={80} immediate enabled /> {item.copy}
                    </>
                  ) : item.count != null ? (
                    <>
                      <CountUpNumber value={item.count} className="font-semibold text-foreground" delay={120} immediate enabled /> {item.copy}
                    </>
                  ) : (
                    item.copy
                  )}
                </p>
              </div>
              <ArrowUpRight size={18} className="mt-1 shrink-0 text-muted-foreground group-hover:text-secondary" />
            </Link>
          ))}
        </div>
      </section>

      <section className="border-b border-border bg-muted/20 py-16 lg:py-20">
        <div className="bars-page">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <SectionLabel number="02">Official series</SectionLabel>
              <h2 className="mt-4 font-display text-3xl leading-tight text-foreground sm:text-5xl">Crashes, deaths, injuries.</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">MoRTH through 2024; 2025–26 from Lok Sabha Unstarred Q. 1939. 2026* is eDAR through 27 July.</p>
          </div>
          <div className="mt-8 overflow-x-auto border border-border">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-muted/60 font-mono-ui text-[10px] uppercase tracking-[.14em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Year</th>
                  <th className="px-4 py-3">Accidents</th>
                  <th className="px-4 py-3">Deaths</th>
                  <th className="px-4 py-3">Injuries</th>
                  <th className="px-4 py-3">Pedestrian deaths</th>
                </tr>
              </thead>
              <tbody>
                {officialNational.map((row, index) => (
                  <tr key={row.year} className="border-t border-border">
                    <td className="px-4 py-3 font-mono-ui font-semibold">{row.year}</td>
                    <td className="px-4 py-3 font-mono-ui">
                      <CountUpNumber value={row.accidents} delay={index * 45} />
                    </td>
                    <td className="px-4 py-3 font-mono-ui text-foreground">
                      <CountUpNumber value={row.deaths} delay={index * 45 + 20} />
                    </td>
                    <td className="px-4 py-3 font-mono-ui">
                      <CountUpNumber value={row.injuries} delay={index * 45 + 40} />
                    </td>
                    <td className="px-4 py-3 font-mono-ui">
                      <CountUpNumber value={officialPedestrian[index].deaths} delay={index * 45 + 60} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background py-16 lg:py-20">
        <div className="bars-page">
          <SectionLabel number="03">On the road</SectionLabel>
          <h2 className="mt-4 font-display text-3xl text-foreground sm:text-5xl">Three frames from the street.</h2>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {[mediaLibrary.hero, mediaLibrary.evidence, mediaLibrary.community].map((item) => (
              <figure key={item.src} className="overflow-hidden border border-border">
                <img src={item.src} alt={item.alt} className="aspect-[4/3] w-full object-cover" />
                <figcaption className="border-t border-border px-4 py-2.5 text-sm font-medium text-foreground">{item.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/15 py-16 lg:py-20">
        <div className="bars-page">
          <SectionLabel number="04">Moving frames</SectionLabel>
          <h2 className="mt-4 font-display text-3xl text-foreground sm:text-5xl">Two views from the field.</h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {mediaLibrary.reels.map((film) => (
              <figure key={film.label} className="overflow-hidden border border-border bg-background">
                <video
                  controls
                  playsInline
                  preload={film.preload}
                  poster={film.poster}
                  className="aspect-video w-full bg-muted object-cover"
                  aria-label={film.label}
                >
                  <source src={film.src} type="video/mp4" />
                </video>
                <figcaption className="border-t border-border px-4 py-3">
                  <span className="text-sm font-semibold text-foreground">{film.label}</span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">{film.note}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background py-12 sm:py-16 lg:py-20">
        <div className="bars-page space-y-8 sm:space-y-10">
          <div className="max-w-2xl">
            <SectionLabel number="05">What BARS is</SectionLabel>
            <h2 className="mt-4 font-display text-[clamp(1.85rem,4.5vw,3.25rem)] leading-tight text-foreground">
              Collaboration over activism.
            </h2>
          </div>
          <BarsIdentityContrast />
        </div>
      </section>

      <section className="border-b border-border bg-card py-16 lg:py-20">
        <div className="bars-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Success Stories</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Reflections from institutional partners and global stakeholders across policy, investment, and international engagement.
            </p>
          </div>
          <TestimonialSection1 voices={voices} className="mt-10 lg:mt-12" />
          <div className="mt-12 flex flex-col gap-1 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">Write to the network.</p>
            <a href={`mailto:${barsOrg.email}`} className="focus-ring font-mono-ui text-sm font-semibold text-secondary hover:underline">
              {barsOrg.email}
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background py-16 lg:py-20">
        <div className="bars-page">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <SectionLabel number="07">Important links</SectionLabel>
              <h2 className="mt-4 font-display text-3xl text-foreground sm:text-5xl">Go to the source.</h2>
            </div>
            <p className="max-w-xs text-sm text-muted-foreground">Ministry, Parliament, WHO, and the BARS organisation site. Our UI stays here; their records stay theirs.</p>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {groups.map((group) => (
              <div key={group}>
                <p className="font-mono-ui text-[10px] font-bold uppercase tracking-[.16em] text-secondary">{group}</p>
                <ul className="mt-3 space-y-2 border-t border-border pt-3">
                  {importantLinks.filter((link) => link.group === group).map((link) => (
                    <li key={link.href}>
                      <a href={link.href} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-1.5 text-sm text-foreground hover:text-secondary">
                        {link.name} <ArrowUpRight size={12} className="text-muted-foreground" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <PartnerMarquee sources={evidenceSources} />
      </section>

      <section className="border-b border-border bg-muted/15 py-16 lg:py-20">
        <div className="bars-page">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <SectionLabel number="08">Voices for safer roads</SectionLabel>
              <h2 className="mt-4 font-display text-3xl leading-tight text-foreground sm:text-5xl">From the organisation.</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Three field films from BARS. Play with sound — pause from the centre of the frame.
            </p>
          </div>
          <VoicesFilms />
        </div>
      </section>

      <section className="border-b border-border bg-muted/20 py-16 lg:py-20">
        <div className="bars-page grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionLabel number="09">FAQ</SectionLabel>
            <h2 className="mt-4 font-display text-3xl text-foreground sm:text-5xl">Questions the ecosystem actually asks.</h2>
            <p className="mt-5 max-w-[40ch] text-sm leading-relaxed text-muted-foreground">Adapted from BARS organisational guidance and the evidence held on this platform.</p>
          </div>
          <Accordion type="single" collapsible className="border-t border-border">
            {faqs.map((item, index) => (
              <AccordionItem key={item.q} value={`faq-${index}`} className="border-border">
                <AccordionTrigger className="py-5 text-base font-semibold text-foreground hover:no-underline hover:text-secondary">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <HomeCta />
    </div>
  );
}
