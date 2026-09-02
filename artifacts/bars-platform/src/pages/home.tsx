import { ArrowRight, ArrowUpRight } from '@/components/hugeicons';
import { Link } from 'wouter';
import { SectionLabel } from '@/components/shared';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HeroSearch } from '@/components/hero-search';
import { mediaLibrary } from '@/lib/media-library';
import { PartnerMarquee } from '@/components/partner-marquee';
import { VoicesFilms } from '@/components/voices-films';
import { evidenceSources } from '@/lib/evidence-sources';
import { officialNational, officialPedestrian, pibFacts } from '@/lib/official-series';
import { barsIs, barsIsNot, barsOrg, faqs, importantLinks, voices } from '@/lib/site-content';
import { directoryRecords, resources } from '@/lib/data';

const fmt = (value: number) => new Intl.NumberFormat('en-IN').format(value);

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
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,440px)] lg:gap-16">
            <div className="animate-rise">
              <SectionLabel number="00">BARS platform</SectionLabel>
              <h1 className="mt-6 max-w-[16ch] font-display text-[clamp(2.7rem,6.2vw,5.8rem)] leading-[0.94] tracking-tight text-foreground">
                Safer roads <span className="italic opacity-90">start</span> with <span className="text-secondary">shared truth.</span>
              </h1>
              <p className="mt-6 max-w-[36rem] text-base leading-relaxed text-muted-foreground sm:text-[17px]">
                Bharat Association of Road Safety Volunteers is a neutral, science-driven commons — not a ministry portal, not a private product. It aligns Sarkaar, Bazaar and Samaaj so India can cut road deaths and grievous injuries by 50% by 2030.
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

            <div className="animate-rise overflow-hidden border border-border bg-card/85 backdrop-blur-md" style={{ animationDelay: '100ms' }}>
              <div className="flex items-baseline justify-between border-b border-border px-4 py-3">
                <SectionLabel number="01">National signal</SectionLabel>
                <span className="font-mono-ui text-[10px] text-muted-foreground">30 Jul 2026</span>
              </div>
              <table className="w-full text-left text-sm">
                <tbody>
                  {[
                    ['Deaths, 2025', fmt(officialNational[4].deaths), 'Lok Sabha Q.1939'],
                    ['Crashes, 2025', fmt(officialNational[4].accidents), 'Annexure-I'],
                    ['Deaths, 2026*', fmt(officialNational[5].deaths), 'eDAR to 27 Jul'],
                    ['Pedestrian deaths, 2025', fmt(officialPedestrian[4].deaths), 'Annexure-II'],
                    ['National Highways', `${fmt(pibFacts.nhKm)} km`, 'PIB year-end'],
                    ['Vehicles scrapped', fmt(pibFacts.vehiclesScrapped), 'PIB 4 Feb 2026'],
                  ].map(([label, value, source]) => (
                    <tr key={label} className="border-b border-border last:border-0">
                      <th className="px-4 py-2.5 font-medium text-muted-foreground">{label}</th>
                      <td className="px-4 py-2.5 font-mono-ui font-semibold text-foreground">{value}</td>
                      <td className="hidden px-4 py-2.5 font-mono-ui text-[10px] uppercase tracking-wider text-muted-foreground sm:table-cell">{source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-10 animate-rise lg:mt-12" style={{ animationDelay: '160ms' }}>
            <HeroSearch />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="bars-page grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { href: '/repository', n: '01', title: 'Know what works', copy: `Search ${fmt(resources.length)} sourced records — MoRTH, Lok Sabha, PIB, WHO and labelled samples.` },
            { href: '/dashboard', n: '02', title: 'See the signal', copy: 'MoRTH, Lok Sabha, PIB and labelled Kaggle samples in one frame.' },
            { href: '/directory', n: '03', title: 'Find your people', copy: `${directoryRecords.length} verified institutions and practitioners.` },
          ].map((item) => (
            <Link key={item.n} href={item.href} className="focus-ring group flex items-start justify-between gap-4 px-0 py-7 sm:px-6 sm:py-8">
              <div>
                <p className="font-mono-ui text-[11px] font-bold text-secondary">{item.n}</p>
                <h2 className="mt-2 font-display text-2xl text-foreground group-hover:text-secondary">{item.title}</h2>
                <p className="mt-2 max-w-[36ch] text-sm leading-relaxed text-muted-foreground">{item.copy}</p>
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
                    <td className="px-4 py-3 font-mono-ui">{fmt(row.accidents)}</td>
                    <td className="px-4 py-3 font-mono-ui text-foreground">{fmt(row.deaths)}</td>
                    <td className="px-4 py-3 font-mono-ui">{fmt(row.injuries)}</td>
                    <td className="px-4 py-3 font-mono-ui">{fmt(officialPedestrian[index].deaths)}</td>
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
                  poster={mediaLibrary.hero.src}
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

      <section className="border-b border-border bg-background py-16 lg:py-20">
        <div className="bars-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionLabel number="05">What BARS is</SectionLabel>
            <h2 className="mt-4 font-display text-3xl leading-tight text-foreground sm:text-5xl">Collaboration over activism.</h2>
            <p className="mt-5 max-w-[42ch] text-sm leading-relaxed text-muted-foreground">
              India&apos;s first association of experienced road-safety volunteers and leaders. Neutrality, credibility, institutional clarity. Long-term commitment over short campaigns.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="font-mono-ui text-[10px] font-bold uppercase tracking-[.16em] text-secondary">Is</p>
              <ul className="mt-4 space-y-3 border-t border-border pt-4 text-sm leading-relaxed text-foreground">
                {barsIs.map((item) => (
                  <li key={item} className="border-b border-border pb-3">{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono-ui text-[10px] font-bold uppercase tracking-[.16em] text-muted-foreground">Is not</p>
              <ul className="mt-4 space-y-3 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
                {barsIsNot.map((item) => (
                  <li key={item} className="border-b border-border pb-3">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card py-16 lg:py-20">
        <div className="bars-page">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <SectionLabel number="06">Success stories</SectionLabel>
              <h2 className="mt-4 font-display text-3xl leading-tight text-foreground sm:text-5xl">From the Declaration and the field.</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Reflections from institutional partners and global stakeholders across policy, investment, and international engagement.
            </p>
          </div>
          <div className="mt-10 grid gap-x-12 gap-y-10 lg:grid-cols-2">
            {voices.map((item) => (
              <blockquote key={item.name} className="border-l-2 border-secondary pl-5">
                <p className="text-[15px] leading-relaxed text-foreground sm:text-base">“{item.quote}”</p>
                <footer className="mt-5 flex items-center gap-3">
                  <img
                    src={item.photo}
                    alt=""
                    className="h-12 w-12 shrink-0 rounded-full border border-border object-cover object-top sm:h-14 sm:w-14"
                  />
                  <div>
                    <cite className="not-italic text-sm font-semibold text-foreground">{item.name}</cite>
                    <span className="mt-0.5 block font-mono-ui text-[10px] uppercase tracking-[.12em] text-muted-foreground">{item.role}</span>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
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

      <section className="bg-background py-16 lg:py-20">
        <div className="bars-page flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel number="10">Start</SectionLabel>
            <h2 className="mt-4 max-w-[18ch] font-display text-3xl text-foreground sm:text-5xl">Bring a question. Leave with a source.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/directory" data-testid="link-home-directory" className="focus-ring inline-flex h-11 items-center gap-2 rounded-md bg-secondary px-5 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90">
              Meet the network <ArrowRight size={16} />
            </Link>
            <Link href="/dashboard" data-testid="link-home-dashboard" className="focus-ring inline-flex h-11 items-center gap-2 rounded-md border border-border px-5 text-sm font-semibold hover:border-secondary hover:text-secondary">
              Read the signal <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
