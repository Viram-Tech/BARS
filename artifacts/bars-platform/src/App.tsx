import { type FormEvent, type ReactNode, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bookmark,
  BookmarkCheck,
  BookOpen,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Clock3,
  Command,
  Database,
  Download,
  ExternalLink,
  Filter,
  LayoutDashboard,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  Network,
  Search,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Sun,
  Users,
  UserRound,
  X,
  type LucideIcon,
} from 'lucide-react';
import { Link, Route, Switch, useLocation } from 'wouter';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

type ThemeMode = 'light' | 'dark' | 'system';

type Resource = {
  id: string;
  type: string;
  title: string;
  description: string;
  source: string;
  year: string;
  region: string;
  format: string;
  featured?: boolean;
};

const resources: Resource[] = [
  {
    id: 'speed-management-2024',
    type: 'Briefing note',
    title: 'Speed management on urban arterial roads',
    description: 'A practical evidence review of lower urban speed limits, street design, and enforcement in Indian cities.',
    source: 'BARS Evidence Unit',
    year: '2024',
    region: 'National',
    format: 'PDF · 28 pages',
    featured: true,
  },
  {
    id: 'blackspot-karnataka',
    type: 'Field report',
    title: 'From black spots to safer corridors: Karnataka',
    description: 'What changed across 117 high-risk locations after engineering, enforcement, and community reporting were aligned.',
    source: 'Karnataka Road Safety Authority',
    year: '2023',
    region: 'Karnataka',
    format: 'Report · 64 pages',
  },
  {
    id: 'ambulance-response',
    type: 'Data note',
    title: 'The first 60 minutes: emergency response times',
    description: 'A district-level view of trauma response readiness across the Golden Quadrilateral, 2021–23.',
    source: 'National Trauma Data Collaborative',
    year: '2024',
    region: 'National',
    format: 'Dataset · CSV',
  },
  {
    id: 'school-zones',
    type: 'Toolkit',
    title: 'Safer journeys to school',
    description: 'A co-designed toolkit for school leaders, ward officers, parents, and young road users.',
    source: 'Samaaj Practice Group',
    year: '2022',
    region: 'Maharashtra',
    format: 'Toolkit · 42 pages',
  },
  {
    id: 'fleet-safety',
    type: 'Case study',
    title: 'Making safety a fleet decision',
    description: 'How a 4,800-vehicle logistics network moved from compliance training to leading indicators.',
    source: 'Bazaar Working Group',
    year: '2024',
    region: 'Telangana',
    format: 'Case study · 12 pages',
  },
  {
    id: 'morth-report',
    type: 'Government report',
    title: 'Road accidents in India: 2022',
    description: 'Official national and state-level tables on crashes, fatalities, causes, and road-user categories.',
    source: 'Ministry of Road Transport & Highways',
    year: '2023',
    region: 'National',
    format: 'Report · 186 pages',
  },
  {
    id: 'motorcycle-helmets',
    type: 'Research paper',
    title: 'Helmet use, fit, and enforcement in tier-two cities',
    description: 'Mixed-method research from four cities on why helmet use persists, slips, and changes.',
    source: 'Indian Institute of Public Health',
    year: '2021',
    region: 'Rajasthan',
    format: 'Paper · 19 pages',
  },
  {
    id: 'safe-system-primer',
    type: 'Primer',
    title: 'A Safe System primer for Indian practitioners',
    description: 'A shared language for designing roads that account for human error and protect human life.',
    source: 'BARS Learning Lab',
    year: '2024',
    region: 'National',
    format: 'Primer · 34 pages',
  },
];

const states = [
  { name: 'Tamil Nadu', short: 'TN', fatality: 8.7, trend: -14, coverage: 82, tone: 'leading' },
  { name: 'Karnataka', short: 'KA', fatality: 10.9, trend: -8, coverage: 76, tone: 'steady' },
  { name: 'Maharashtra', short: 'MH', fatality: 12.4, trend: -3, coverage: 69, tone: 'steady' },
  { name: 'Rajasthan', short: 'RJ', fatality: 14.8, trend: 6, coverage: 54, tone: 'watch' },
  { name: 'Uttar Pradesh', short: 'UP', fatality: 16.2, trend: 2, coverage: 48, tone: 'watch' },
];

const directoryRecords = [
  { id: 'r1', kind: 'Organisation', name: 'Karnataka Road Safety Authority', detail: 'State road safety authority', location: 'Bengaluru, Karnataka', network: 'Sarkaar', verified: true, initials: 'KR' },
  { id: 'r2', kind: 'Organisation', name: 'SaveLIFE Foundation', detail: 'Policy and emergency care', location: 'New Delhi, Delhi', network: 'Samaaj', verified: true, initials: 'SL' },
  { id: 'r3', kind: 'Expert', name: 'Dr. Meera Iyer', detail: 'Trauma systems and public health', location: 'Chennai, Tamil Nadu', network: 'Samaaj', verified: true, initials: 'MI' },
  { id: 'r4', kind: 'Organisation', name: 'Mahindra Logistics', detail: 'Commercial fleet operator', location: 'Mumbai, Maharashtra', network: 'Bazaar', verified: true, initials: 'ML' },
  { id: 'r5', kind: 'Expert', name: 'Arun Prakash', detail: 'Street design and active mobility', location: 'Pune, Maharashtra', network: 'Samaaj', verified: true, initials: 'AP' },
  { id: 'r6', kind: 'Organisation', name: 'Chennai Metropolitan Transport Corporation', detail: 'Public transport operator', location: 'Chennai, Tamil Nadu', network: 'Sarkaar', verified: true, initials: 'CM' },
  { id: 'r7', kind: 'Expert', name: 'Nandita Rao', detail: 'Behaviour change and communications', location: 'Hyderabad, Telangana', network: 'Bazaar', verified: true, initials: 'NR' },
  { id: 'r8', kind: 'Organisation', name: 'Indian Institute of Technology Delhi', detail: 'Transport research centre', location: 'New Delhi, Delhi', network: 'Samaaj', verified: true, initials: 'ID' },
];

function SectionLabel({ children, number }: { children: ReactNode; number?: string }) {
  return (
    <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.17em] text-muted-foreground">
      {number && <span className="font-mono-ui text-accent">{number}</span>}
      <span>{children}</span>
    </div>
  );
}

function Button({
  children,
  variant = 'primary',
  onClick,
  type = 'button',
  className = '',
  testId,
}: {
  children: ReactNode;
  variant?: 'primary' | 'quiet' | 'outline' | 'amber';
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  testId: string;
}) {
  const styles = {
    primary: 'bg-primary text-primary-foreground hover:bg-secondary',
    quiet: 'text-foreground hover:bg-muted',
    outline: 'border border-border bg-transparent text-foreground hover:border-secondary hover:text-secondary',
    amber: 'bg-accent text-accent-foreground hover:brightness-95',
  };
  return (
    <button type={type} onClick={onClick} data-testid={testId} className={`focus-ring inline-flex min-h-10 items-center justify-center gap-2 px-4 text-sm font-semibold transition-colors ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
}

function Shell({
  children,
  onOpenAssistant,
}: {
  children: ReactNode;
  onOpenAssistant: () => void;
}) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'light';
    return (localStorage.getItem('bars-theme') as ThemeMode) || 'system';
  });
  const [savedCount] = useState(3);

  useEffect(() => {
    localStorage.setItem('bars-theme', theme);
    const root = document.documentElement;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.classList.toggle('dark', theme === 'dark' || (theme === 'system' && prefersDark));
  }, [theme]);

  useEffect(() => setMobileOpen(false), [location]);

  const navItems: { href: string; label: string; icon: LucideIcon }[] = [
    { href: '/', label: 'Home', icon: Command },
    { href: '/repository', label: 'Repository', icon: BookOpen },
    { href: '/dashboard', label: 'National intelligence', icon: LayoutDashboard },
    { href: '/directory', label: 'Directory', icon: Users },
  ];

  return (
    <div className="bars-grain min-h-[100dvh] bg-background text-foreground">
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[268px] flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 md:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-[84px] items-center border-b border-sidebar-border px-7">
          <Link href="/" data-testid="link-logo" className="focus-ring flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center border border-accent text-accent font-mono-ui text-sm font-medium">B</span>
            <span>
              <span className="block text-[15px] font-extrabold tracking-[.2em]">BARS</span>
              <span className="mt-0.5 block text-[9px] uppercase tracking-[.14em] text-sidebar-foreground/60">Bharat Association<br />of Road Safety Volunteers</span>
            </span>
          </Link>
          <button aria-label="Close navigation" data-testid="button-close-menu" onClick={() => setMobileOpen(false)} className="focus-ring ml-auto p-2 md:hidden"><X size={18} /></button>
        </div>
        <div className="flex-1 px-4 py-7">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-[.18em] text-sidebar-foreground/45">Navigate</p>
          <nav className="mt-3 space-y-1" aria-label="Main navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = item.href === location;
              return (
                <Link key={item.href} href={item.href} data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`} className={`focus-ring flex items-center gap-3 border-l-2 px-3 py-3 text-sm transition-colors ${active ? 'border-accent bg-sidebar-accent text-sidebar-accent-foreground' : 'border-transparent text-sidebar-foreground/65 hover:border-sidebar-foreground/30 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground'}`}>
                  <Icon size={17} strokeWidth={active ? 2.2 : 1.7} />
                  <span>{item.label}</span>
                  {item.href === '/repository' && savedCount > 0 && <span className="ml-auto font-mono-ui text-[10px] text-accent">{savedCount}</span>}
                </Link>
              );
            })}
          </nav>
          <div className="mt-10 border-t border-sidebar-border pt-7">
            <p className="px-3 text-[10px] font-semibold uppercase tracking-[.18em] text-sidebar-foreground/45">Workspace</p>
            <Link href="/design-system" data-testid="link-nav-design-system" className={`focus-ring mt-3 flex items-center gap-3 border-l-2 border-transparent px-3 py-3 text-sm text-sidebar-foreground/65 transition-colors hover:border-sidebar-foreground/30 hover:bg-sidebar-accent hover:text-sidebar-foreground ${location === '/design-system' ? 'border-accent bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}>
              <SlidersHorizontal size={17} />
              <span>Design system</span>
            </Link>
          </div>
        </div>
        <div className="border-t border-sidebar-border p-5">
          <button onClick={onOpenAssistant} data-testid="button-sidebar-ask" className="focus-ring group flex w-full items-center gap-3 border border-sidebar-foreground/20 px-3 py-3 text-left transition-colors hover:border-accent">
            <span className="flex h-8 w-8 items-center justify-center bg-accent text-accent-foreground"><MessageCircle size={16} /></span>
            <span className="min-w-0"><span className="block text-sm font-semibold">Ask BARS</span><span className="block truncate text-[10px] text-sidebar-foreground/55">Evidence, explained.</span></span>
            <ArrowUpRight className="ml-auto text-sidebar-foreground/45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={15} />
          </button>
          <p className="mt-5 px-1 text-[10px] leading-relaxed text-sidebar-foreground/40">A shared intelligence layer for India&apos;s 2030 road-safety mission.</p>
        </div>
      </aside>

      {mobileOpen && <button aria-label="Close menu overlay" data-testid="button-menu-overlay" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-30 bg-primary/40 md:hidden" />}

      <div className="min-h-[100dvh] md:pl-[268px]">
        <header className="sticky top-0 z-20 flex h-[68px] items-center justify-between border-b border-border bg-background/95 px-5 backdrop-blur-sm md:px-10">
          <button aria-label="Open navigation" data-testid="button-open-menu" onClick={() => setMobileOpen(true)} className="focus-ring p-2 md:hidden"><Menu size={21} /></button>
          <div className="hidden items-center gap-3 text-xs text-muted-foreground md:flex">
            <span className="font-mono-ui text-[10px] text-accent">2030 / INDIA</span>
            <span className="h-3 w-px bg-border" />
            <span>Road safety, as shared infrastructure</span>
          </div>
          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <button onClick={onOpenAssistant} data-testid="button-header-ask" className="focus-ring inline-flex min-h-9 items-center gap-2 px-2 text-sm font-semibold text-secondary hover:bg-muted sm:px-3"><MessageCircle size={16} /><span className="hidden sm:inline">Ask BARS</span><kbd className="hidden border border-border px-1.5 py-0.5 font-mono-ui text-[9px] text-muted-foreground sm:inline">⌘ K</kbd></button>
            <div className="mx-1 h-5 w-px bg-border" />
            <label className="sr-only" htmlFor="theme-preference">Theme preference</label>
            <select id="theme-preference" value={theme} onChange={(event) => setTheme(event.target.value as ThemeMode)} data-testid="select-theme-preference" className="focus-ring h-9 max-w-[82px] border-0 bg-transparent px-1 text-xs text-muted-foreground outline-none sm:max-w-none">
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
            <span className="hidden text-muted-foreground sm:inline">{theme === 'dark' ? <Moon size={15} /> : theme === 'light' ? <Sun size={15} /> : <CircleHelp size={15} />}</span>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}

function Home({ onAsk }: { onAsk: () => void }) {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border px-5 pb-20 pt-14 sm:px-10 sm:pt-20 lg:px-16 lg:pb-28 lg:pt-24">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid items-end gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
            <div className="animate-rise">
              <SectionLabel number="00">The BARS platform</SectionLabel>
              <h1 className="mt-7 max-w-[780px] font-display text-[clamp(3.5rem,8.5vw,8.2rem)] leading-[.86] tracking-[-.045em] text-primary dark:text-foreground">
                Safer roads<br /><em>start</em> with<br /><span className="text-secondary">shared truth.</span>
              </h1>
              <p className="mt-9 max-w-[515px] text-[15px] leading-7 text-muted-foreground">BARS brings India&apos;s road-safety evidence, people, and practice into one working commons — so that every decision can move us closer to 2030.</p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/repository" data-testid="link-hero-repository" className="focus-ring inline-flex min-h-11 items-center gap-3 bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-secondary">Explore the repository <ArrowRight size={16} /></Link>
                <button onClick={onAsk} data-testid="button-hero-ask" className="focus-ring inline-flex min-h-11 items-center gap-2 border-b border-primary px-1 text-sm font-semibold text-primary transition-colors hover:border-secondary hover:text-secondary">Ask a road-safety question <MessageCircle size={15} /></button>
              </div>
            </div>
            <div className="animate-rise lg:pb-3" style={{ animationDelay: '120ms' }}>
              <div className="relative border border-border bg-card p-6 sm:p-8">
                <div className="absolute right-0 top-0 h-2 w-20 bg-accent" />
                <div className="flex items-start justify-between">
                  <SectionLabel number="01">Why this exists</SectionLabel>
                  <span className="font-mono-ui text-[10px] text-muted-foreground">BARS / 001</span>
                </div>
                <p className="mt-8 font-display text-[2.2rem] leading-[.98] text-primary dark:text-foreground">A road crash is never just a number.</p>
                <p className="mt-5 text-sm leading-6 text-muted-foreground">Behind every record is a journey, a family, a livelihood, a community. Better evidence helps institutions see the full picture — and act before harm repeats.</p>
                <div className="mt-9 grid grid-cols-2 border-t border-border pt-5">
                  <div><span className="block font-mono-ui text-2xl text-primary dark:text-foreground">Sarkaar</span><span className="mt-1 block text-xs text-muted-foreground">Policy & infrastructure</span></div>
                  <div className="border-l border-border pl-5"><span className="block font-mono-ui text-2xl text-secondary">Bazaar</span><span className="mt-1 block text-xs text-muted-foreground">Business & mobility</span></div>
                </div>
                <div className="mt-5"><span className="block font-mono-ui text-2xl text-accent-foreground dark:text-accent">Samaaj</span><span className="mt-1 block text-xs text-muted-foreground">People & communities</span></div>
              </div>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute -bottom-10 right-[-25px] hidden select-none font-mono-ui text-[180px] leading-none text-primary/[.035] lg:block">B</div>
      </section>

      <section className="px-5 py-16 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div><SectionLabel number="02">A platform for the whole system</SectionLabel><h2 className="mt-5 max-w-[660px] font-display text-4xl leading-none text-primary dark:text-foreground sm:text-6xl">Move from isolated effort to collective progress.</h2></div>
            <p className="max-w-[300px] text-sm leading-6 text-muted-foreground">The hard work is already happening across the country. BARS makes it easier to find, trust, and build on it.</p>
          </div>
          <div className="mt-14 grid border-y border-border md:grid-cols-3">
            {[
              { n: '01', title: 'Know what works', copy: 'Search a living repository of research, policy, field notes, and tools — grounded in Indian context.', icon: BookOpen, href: '/repository' },
              { n: '02', title: 'See the signal', copy: 'Read national and state-level indicators together, with the nuance that a headline number cannot hold.', icon: BarChart3, href: '/dashboard' },
              { n: '03', title: 'Find your people', copy: 'Connect with verified institutions and practitioners working on the same road, in the same direction.', icon: Network, href: '/directory' },
            ].map((item) => {
              const Icon = item.icon;
              return <Link key={item.n} href={item.href} data-testid={`link-platform-${item.n}`} className="focus-ring group border-b border-border p-6 transition-colors hover:bg-muted md:border-b-0 md:border-r md:p-8 md:last:border-r-0">
                <div className="flex items-center justify-between"><span className="font-mono-ui text-xs text-accent">{item.n}</span><Icon className="text-secondary" size={21} strokeWidth={1.6} /></div>
                <h3 className="mt-14 font-display text-3xl text-primary dark:text-foreground">{item.title}</h3><p className="mt-4 max-w-[280px] text-sm leading-6 text-muted-foreground">{item.copy}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-secondary">Open <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
              </Link>;
            })}
          </div>
        </div>
      </section>

      <section className="bg-primary px-5 py-16 text-primary-foreground sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
            <div><SectionLabel number="03">The 2030 frame</SectionLabel><h2 className="mt-6 max-w-[450px] font-display text-5xl leading-[.92] sm:text-7xl">A safer road is a design decision.</h2><p className="mt-7 max-w-[390px] text-sm leading-6 text-primary-foreground/65">India&apos;s road-safety mission needs more than awareness. It needs an honest view of risk, and the discipline to make safety the default.</p></div>
            <div className="grid gap-0 border-t border-primary-foreground/20 sm:grid-cols-2 sm:border-t-0">
              {[
                ['1.68 lakh', 'reported road deaths in 2022', 'MoRTH / 2023'],
                ['4 in 5', 'fatalities involve vulnerable road users', 'BARS synthesis'],
                ['28 states', 'with active road-safety committees', 'BARS directory'],
                ['2030', 'the horizon for action, not aspiration', 'BARS mission'],
              ].map(([value, label, source], index) => <div key={value} className={`border-b border-primary-foreground/20 py-6 sm:px-6 sm:py-7 ${index % 2 === 0 ? 'sm:border-r' : ''} ${index > 1 ? 'sm:border-b-0' : ''}`}><span className="font-mono-ui text-3xl text-accent">{value}</span><p className="mt-3 text-sm font-semibold">{label}</p><span className="mt-2 block text-[10px] uppercase tracking-[.14em] text-primary-foreground/45">{source}</span></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="border-l-4 border-accent pl-6 sm:pl-8"><p className="font-display text-4xl leading-[.95] text-primary dark:text-foreground sm:text-6xl">“We cannot solve what we cannot see together.”</p><p className="mt-6 font-mono-ui text-[10px] uppercase tracking-[.14em] text-muted-foreground">A shared principle / BARS founding note</p></div>
          <div className="lg:pl-14"><SectionLabel number="04">Start where you are</SectionLabel><p className="mt-6 max-w-[470px] text-lg leading-8 text-muted-foreground">Whether you work in a ministry, run a fleet, study transport, or simply want your street to be safer, there is a place for your question and your contribution.</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/directory" data-testid="link-home-directory" className="focus-ring inline-flex min-h-10 items-center gap-2 border border-border px-4 text-sm font-semibold hover:border-secondary hover:text-secondary">Meet the network <ArrowRight size={15} /></Link><Link href="/dashboard" data-testid="link-home-dashboard" className="focus-ring inline-flex min-h-10 items-center gap-2 px-2 text-sm font-semibold text-secondary hover:text-primary">Read the signal <ArrowUpRight size={15} /></Link></div></div>
        </div>
      </section>
      <footer className="border-t border-border px-5 py-8 sm:px-10 lg:px-16"><div className="mx-auto flex max-w-[1240px] flex-col gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><span className="font-mono-ui">BARS / BHARAT ASSOCIATION OF ROAD SAFETY VOLUNTEERS</span><span>Knowledge in service of safer journeys.</span></div></footer>
    </div>
  );
}

function PageHeader({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return <section className="border-b border-border px-5 pb-10 pt-12 sm:px-10 lg:px-16 lg:pb-14 lg:pt-16"><div className="mx-auto max-w-[1240px]"><SectionLabel>{eyebrow}</SectionLabel><div className="mt-6 flex flex-col justify-between gap-7 lg:flex-row lg:items-end"><div><h1 className="max-w-[760px] font-display text-5xl leading-[.9] tracking-[-.025em] text-primary dark:text-foreground sm:text-7xl">{title}</h1><p className="mt-6 max-w-[610px] text-[15px] leading-7 text-muted-foreground">{description}</p></div>{children}</div></div></section>;
}

function ResourceCard({ resource, saved, onToggle }: { resource: Resource; saved: boolean; onToggle: () => void }) {
  const [showRecord, setShowRecord] = useState(false);
  return <article data-testid={`card-resource-${resource.id}`} className="group flex min-h-[250px] flex-col border-b border-border bg-card p-5 transition-colors hover:bg-muted sm:p-6">
    <div className="flex items-start justify-between gap-4"><span className="font-mono-ui text-[10px] uppercase tracking-[.12em] text-secondary">{resource.type}</span><button aria-label={`${saved ? 'Remove' : 'Save'} ${resource.title}`} data-testid={`button-save-${resource.id}`} onClick={onToggle} className={`focus-ring p-1 transition-colors ${saved ? 'text-accent' : 'text-muted-foreground hover:text-accent'}`}>{saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}</button></div>
    <h2 className="mt-7 max-w-[450px] text-lg font-bold leading-6 text-primary transition-colors group-hover:text-secondary dark:text-foreground">{resource.title}</h2><p className="mt-3 max-w-[490px] text-sm leading-6 text-muted-foreground">{resource.description}</p>
    <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-7"><div><p className="text-xs font-semibold">{resource.source}</p><p className="mt-1 font-mono-ui text-[10px] text-muted-foreground">{resource.year} · {resource.region} · {resource.format}</p></div><button onClick={() => setShowRecord((current) => !current)} data-testid={`button-open-resource-${resource.id}`} className="focus-ring inline-flex items-center gap-1 text-xs font-bold text-secondary hover:text-primary">{showRecord ? 'Close record' : 'Read record'} <ArrowUpRight size={14} /></button></div>
    {showRecord && <div data-testid={`text-resource-record-${resource.id}`} className="mt-4 border-t border-border pt-4 text-xs leading-5 text-muted-foreground"><strong className="text-foreground">Catalog note:</strong> This record is available as a grounded starting point for practitioners. Ask BARS for related sources or implementation examples.</div>}
  </article>;
}

function Repository() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('All formats');
  const [region, setRegion] = useState('All India');
  const [saved, setSaved] = useState<string[]>(['morth-report', 'safe-system-primer', 'fleet-safety']);
  const filtered = useMemo(() => resources.filter((item) => {
    const haystack = `${item.title} ${item.description} ${item.source} ${item.type}`.toLowerCase();
    return haystack.includes(query.toLowerCase()) && (type === 'All formats' || item.type === type) && (region === 'All India' || item.region === region);
  }), [query, type, region]);
  const types = ['All formats', ...Array.from(new Set(resources.map((item) => item.type)))];
  const regions = ['All India', ...Array.from(new Set(resources.map((item) => item.region)))];
  const toggleSaved = (id: string) => setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const downloadCatalogue = () => {
    const catalogue = resources.map((item) => `${item.type} | ${item.title} | ${item.source} | ${item.year}`).join('\n');
    const blob = new Blob([`BARS REPOSITORY CATALOGUE\n\n${catalogue}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'bars-repository-catalogue.txt';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return <div><PageHeader eyebrow="01 / Knowledge repository" title="Evidence you can use." description="A working library of Indian road-safety research, policy, field practice, and tools. Every record is sourced, dated, and ready to build on."><Button variant="outline" onClick={downloadCatalogue} testId="button-repository-download"><Download size={15} /> Download catalogue</Button></PageHeader>
    <section className="px-5 py-8 sm:px-10 lg:px-16 lg:py-12"><div className="mx-auto max-w-[1240px]">
      <div className="grid gap-3 border-b border-border pb-7 lg:grid-cols-[1fr_auto_auto]"><div className="relative"><Search className="absolute left-3 top-3 text-muted-foreground" size={18} /><label className="sr-only" htmlFor="repository-search">Search the repository</label><input id="repository-search" data-testid="input-repository-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search evidence, places, people..." className="focus-ring h-11 w-full border border-border bg-card pl-10 pr-3 text-sm outline-none placeholder:text-muted-foreground" /></div><label className="relative"><span className="sr-only">Filter by format</span><Filter className="pointer-events-none absolute left-3 top-3 text-muted-foreground" size={15} /><select value={type} onChange={(event) => setType(event.target.value)} data-testid="select-repository-type" className="focus-ring h-11 w-full appearance-none border border-border bg-card pl-9 pr-9 text-sm outline-none lg:w-[185px]">{types.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-3 text-muted-foreground" size={15} /></label><label className="relative"><span className="sr-only">Filter by region</span><MapPin className="pointer-events-none absolute left-3 top-3 text-muted-foreground" size={15} /><select value={region} onChange={(event) => setRegion(event.target.value)} data-testid="select-repository-region" className="focus-ring h-11 w-full appearance-none border border-border bg-card pl-9 pr-9 text-sm outline-none lg:w-[170px]">{regions.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-3 text-muted-foreground" size={15} /></label></div>
      <div className="flex flex-wrap items-center justify-between gap-3 py-5"><p className="font-mono-ui text-[11px] text-muted-foreground"><span data-testid="text-repository-result-count" className="text-foreground">{filtered.length.toString().padStart(2, '0')}</span> records / showing {type.toLowerCase()}</p><button onClick={() => { setQuery(''); setType('All formats'); setRegion('All India'); }} data-testid="button-clear-repository-filters" className="focus-ring text-xs font-semibold text-secondary hover:text-primary">Clear filters</button></div>
      {filtered.length > 0 ? <div className="grid border-l border-t border-border sm:grid-cols-2">{filtered.map((resource) => <ResourceCard key={resource.id} resource={resource} saved={saved.includes(resource.id)} onToggle={() => toggleSaved(resource.id)} />)}</div> : <div data-testid="empty-repository-results" className="border border-dashed border-border bg-card px-6 py-16 text-center"><Search size={25} className="mx-auto text-muted-foreground" /><h2 className="mt-5 font-display text-3xl text-primary dark:text-foreground">No records match that search.</h2><p className="mt-2 text-sm text-muted-foreground">Try a different term or clear one of the filters.</p></div>}
      <div className="mt-10 flex items-start gap-3 border-l-2 border-accent bg-muted px-5 py-4 text-sm text-muted-foreground"><ShieldCheck className="mt-0.5 shrink-0 text-secondary" size={17} /><p><strong className="text-foreground">About the repository.</strong> Records are reviewed for provenance and practical relevance. A source label is not an endorsement; it is an invitation to examine the evidence.</p></div>
    </div></section>
  </div>;
}

function Dashboard() {
  const [selectedState, setSelectedState] = useState('Tamil Nadu');
  const state = states.find((item) => item.name === selectedState) || states[0];
  const chart = [58, 53, 49, 51, 44, 38, 34, 31, 28, 25, 23, 20];
  return <div><PageHeader eyebrow="02 / National intelligence" title="Read the road ahead." description="A concise view of where risk is concentrated, where progress is holding, and where the next useful question begins. Updated quarterly from public and partner data."><div className="flex items-center gap-2 font-mono-ui text-[10px] text-muted-foreground"><span className="h-2 w-2 bg-secondary" /> Q2 2024 release</div></PageHeader>
    <section className="px-5 py-8 sm:px-10 lg:px-16 lg:py-12"><div className="mx-auto max-w-[1240px]">
      <div className="grid gap-px border border-border bg-border lg:grid-cols-[1.35fr_1fr_1fr]">
        <div className="bg-card p-6 sm:p-8"><SectionLabel number="A">National picture</SectionLabel><div className="mt-8 flex items-end gap-3"><span data-testid="text-national-fatalities" className="font-mono-ui text-5xl text-primary dark:text-foreground">1,68,491</span><span className="mb-2 text-xs text-muted-foreground">reported road deaths<br />in 2022</span></div><div className="mt-8 h-[132px] w-full"><svg viewBox="0 0 620 132" className="h-full w-full" preserveAspectRatio="none" role="img" aria-label="Downward trend of reported road deaths"><path d="M0 24 C50 33 60 42 100 38 S170 50 210 57 S270 46 310 67 S365 64 400 79 S455 72 490 92 S550 98 620 120" fill="none" stroke="hsl(var(--secondary))" strokeWidth="3" /><path d="M0 24 C50 33 60 42 100 38 S170 50 210 57 S270 46 310 67 S365 64 400 79 S455 72 490 92 S550 98 620 120 V132 H0 Z" fill="hsl(var(--secondary) / .10)" /></svg></div><div className="mt-2 flex justify-between font-mono-ui text-[9px] text-muted-foreground"><span>2012</span><span>2017</span><span>2022</span></div></div>
        <div className="bg-card p-6 sm:p-8"><SectionLabel number="B">Leading indicator</SectionLabel><span className="mt-8 block font-mono-ui text-5xl text-secondary">63.4</span><p className="mt-3 max-w-[200px] text-sm font-semibold leading-5">Safe-system readiness index</p><p className="mt-8 text-xs leading-5 text-muted-foreground">Composite of road design, speed management, emergency response, and data practice across participating states.</p><div className="mt-5 h-1.5 bg-muted"><div className="h-full bg-secondary" style={{ width: '63.4%' }} /></div></div>
        <div className="bg-card p-6 sm:p-8"><SectionLabel number="C">This quarter</SectionLabel><div className="mt-8 flex items-center gap-3"><Activity className="text-accent" size={20} /><span className="font-mono-ui text-4xl text-primary dark:text-foreground">−7.2%</span></div><p className="mt-3 text-sm font-semibold leading-5">change in fatality rate across BARS partner corridors</p><div className="mt-8 border-t border-border pt-4"><p className="text-xs leading-5 text-muted-foreground">Improvement is strongest where engineering and enforcement plans were funded together.</p></div></div>
      </div>
      <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
        <div className="border border-border bg-card p-6 sm:p-8"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><SectionLabel number="03">State comparison</SectionLabel><h2 className="mt-4 font-display text-3xl text-primary dark:text-foreground">Fatality rate, per 100,000</h2></div><label className="relative"><span className="sr-only">Select state</span><select value={selectedState} onChange={(event) => setSelectedState(event.target.value)} data-testid="select-dashboard-state" className="focus-ring h-9 border border-border bg-background px-3 pr-8 text-xs font-semibold outline-none">{states.map((item) => <option key={item.name}>{item.name}</option>)}</select></label></div><div className="mt-9 space-y-5">{states.map((item) => <button key={item.name} onClick={() => setSelectedState(item.name)} data-testid={`button-state-${item.short}`} className={`focus-ring group grid w-full grid-cols-[108px_1fr_54px] items-center gap-3 text-left text-xs sm:grid-cols-[130px_1fr_58px] ${selectedState === item.name ? 'text-primary dark:text-foreground' : 'text-muted-foreground'}`}><span className="font-semibold">{item.name}</span><span className="h-2 bg-muted"><span className={`block h-full transition-all ${item.tone === 'watch' ? 'bg-accent' : 'bg-secondary'}`} style={{ width: `${(item.fatality / 18) * 100}%` }} /></span><span className="font-mono-ui text-right">{item.fatality}</span></button>)}</div><div className="mt-8 flex items-center justify-between border-t border-border pt-5"><span className="text-xs text-muted-foreground">Selected: <strong className="text-foreground">{state.name}</strong></span><span className={`font-mono-ui text-xs ${state.trend < 0 ? 'text-secondary' : 'text-accent-foreground dark:text-accent'}`}>{state.trend > 0 ? '+' : ''}{state.trend}% / 3yr</span></div></div>
        <div className="border border-border bg-primary p-6 text-primary-foreground sm:p-8"><SectionLabel number="04">A useful question</SectionLabel><h2 className="mt-5 font-display text-4xl leading-none">What does the number leave out?</h2><p className="mt-5 text-sm leading-6 text-primary-foreground/65">Fatality rates help compare risk. They do not show who is walking, cycling, working, waiting for an ambulance, or living beside a high-speed corridor.</p><Link href="/repository" data-testid="link-dashboard-evidence" className="focus-ring mt-8 inline-flex items-center gap-2 border-b border-accent pb-1 text-sm font-semibold text-accent">See the evidence behind the signal <ArrowRight size={15} /></Link></div>
      </div>
      <div className="mt-12 border-t border-border pt-7"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><SectionLabel number="05">Coverage, not just outcomes</SectionLabel><p className="mt-2 text-sm text-muted-foreground">Partner-state adoption of four leading safety practices</p></div><span className="font-mono-ui text-[10px] text-muted-foreground">SOURCE / BARS FIELD INDEX 2024</span></div><div className="mt-8 grid gap-5 sm:grid-cols-5">{states.map((item) => <div key={item.short} data-testid={`metric-coverage-${item.short}`}><div className="flex items-end justify-between text-xs"><span className="font-semibold">{item.short}</span><span className="font-mono-ui text-muted-foreground">{item.coverage}%</span></div><div className="mt-2 h-20 bg-muted"><div className="h-full bg-secondary" style={{ height: `${item.coverage}%` }} /></div></div>)}</div></div>
    </div></section>
  </div>;
}

function Directory() {
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState('All records');
  const [network, setNetwork] = useState('All networks');
  const [contributeOpen, setContributeOpen] = useState(false);
  const filtered = directoryRecords.filter((record) => `${record.name} ${record.detail} ${record.location}`.toLowerCase().includes(query.toLowerCase()) && (kind === 'All records' || record.kind === kind) && (network === 'All networks' || record.network === network));
  return <div><PageHeader eyebrow="03 / Verified directory" title="The people doing the work." description="A trusted starting point for collaboration across Sarkaar, Bazaar, and Samaaj. Profiles are reviewed for identity, role, and active road-safety work."><Button variant="amber" onClick={() => setContributeOpen(true)} testId="button-directory-suggest"><Users size={15} /> Suggest a record</Button></PageHeader>
    <section className="px-5 py-8 sm:px-10 lg:px-16 lg:py-12"><div className="mx-auto max-w-[1240px]">
      <div className="flex flex-col gap-3 border-b border-border pb-7 lg:flex-row"><div className="relative flex-1"><Search className="absolute left-3 top-3 text-muted-foreground" size={17} /><label className="sr-only" htmlFor="directory-search">Search directory</label><input id="directory-search" value={query} onChange={(event) => setQuery(event.target.value)} data-testid="input-directory-search" placeholder="Search organisation, expert, or place..." className="focus-ring h-11 w-full border border-border bg-card pl-10 text-sm outline-none placeholder:text-muted-foreground" /></div><select value={kind} onChange={(event) => setKind(event.target.value)} data-testid="select-directory-kind" className="focus-ring h-11 border border-border bg-card px-3 text-sm outline-none"><option>All records</option><option>Organisation</option><option>Expert</option></select><select value={network} onChange={(event) => setNetwork(event.target.value)} data-testid="select-directory-network" className="focus-ring h-11 border border-border bg-card px-3 text-sm outline-none"><option>All networks</option><option>Sarkaar</option><option>Bazaar</option><option>Samaaj</option></select></div>
      <div className="flex items-center justify-between py-5"><p className="font-mono-ui text-[11px] text-muted-foreground"><span data-testid="text-directory-result-count" className="text-foreground">{filtered.length.toString().padStart(2, '0')}</span> verified records</p><span className="text-xs text-muted-foreground"><ShieldCheck size={14} className="mr-1 inline text-secondary" />Reviewed by BARS</span></div>
      <div className="grid gap-px border border-border bg-border sm:grid-cols-2">{filtered.map((record) => <article key={record.id} data-testid={`card-directory-${record.id}`} className="group flex min-h-[190px] flex-col bg-card p-5 transition-colors hover:bg-muted sm:p-6"><div className="flex items-start justify-between"><span className="flex items-center gap-2 font-mono-ui text-[10px] uppercase tracking-[.12em] text-secondary">{record.kind === 'Organisation' ? <Building2 size={13} /> : <UserRound size={13} />}{record.kind}</span><span className="flex items-center gap-1 text-[10px] font-semibold text-secondary"><CheckCircle2 size={13} /> Verified</span></div><div className="mt-8 flex items-start gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center border border-border bg-muted font-mono-ui text-xs text-secondary">{record.initials}</span><div className="min-w-0"><h2 className="break-words text-base font-bold leading-5 text-primary dark:text-foreground">{record.name}</h2><p className="mt-1 text-xs text-muted-foreground">{record.detail}</p></div></div><div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4"><span className="flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin size={13} />{record.location}</span><span className="font-mono-ui text-[10px] text-secondary">{record.network}</span></div></article>)}</div>
      {filtered.length === 0 && <div data-testid="empty-directory-results" className="border border-dashed border-border px-6 py-14 text-center"><Users className="mx-auto text-muted-foreground" size={25} /><p className="mt-4 font-display text-3xl text-primary dark:text-foreground">No records found.</p></div>}
      <div className="mt-10 flex flex-col justify-between gap-5 border-l-2 border-secondary bg-muted px-5 py-5 sm:flex-row sm:items-center sm:px-6"><div><p className="text-sm font-bold">Are you part of the road-safety ecosystem?</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Help keep this directory useful, current, and representative.</p></div><Button variant="outline" onClick={() => setContributeOpen(true)} testId="button-directory-contribute">Contribute information <ArrowUpRight size={14} /></Button></div>
      {contributeOpen && <div role="dialog" aria-label="Suggest a directory record" data-testid="dialog-directory-contribute" className="fixed inset-x-5 bottom-5 z-30 border border-border bg-card p-5 shadow-md sm:inset-x-auto sm:right-8 sm:w-[420px]"><div className="flex items-start justify-between gap-4"><div><SectionLabel number="BARS">Contribute to the directory</SectionLabel><h2 className="mt-3 font-display text-3xl text-primary dark:text-foreground">Keep the map current.</h2></div><button onClick={() => setContributeOpen(false)} data-testid="button-close-directory-dialog" className="focus-ring p-1 text-muted-foreground"><X size={17} /></button></div><p className="mt-4 text-sm leading-6 text-muted-foreground">This first slice accepts suggestions for review. In the connected version, submissions will route to the BARS stewardship team.</p><Button variant="amber" onClick={() => setContributeOpen(false)} className="mt-5 w-full" testId="button-directory-dialog-done">Understood</Button></div>}
    </div></section>
  </div>;
}

function DesignSystem() {
  const [tab, setTab] = useState<'tokens' | 'components'>('tokens');
  return <div><PageHeader eyebrow="04 / Living design system" title="The BARS language." description="A small, deliberate set of visual decisions for communicating evidence with clarity, warmth, and institutional confidence." />
    <section className="px-5 py-8 sm:px-10 lg:px-16 lg:py-12"><div className="mx-auto max-w-[1240px]">
      <div className="flex gap-6 border-b border-border"><button onClick={() => setTab('tokens')} data-testid="button-design-tokens" className={`focus-ring border-b-2 pb-3 text-sm font-semibold ${tab === 'tokens' ? 'border-accent text-primary dark:text-foreground' : 'border-transparent text-muted-foreground'}`}>Foundations</button><button onClick={() => setTab('components')} data-testid="button-design-components" className={`focus-ring border-b-2 pb-3 text-sm font-semibold ${tab === 'components' ? 'border-accent text-primary dark:text-foreground' : 'border-transparent text-muted-foreground'}`}>Components</button></div>
      {tab === 'tokens' ? <div className="mt-10 grid gap-12 lg:grid-cols-2"><div><SectionLabel number="A">Colour as signal</SectionLabel><div className="mt-6 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">{[['Navy', 'bg-primary', 'Institution'], ['Amber', 'bg-accent', 'Action'], ['Sage', 'bg-secondary', 'Progress'], ['Paper', 'bg-background', 'Context']].map(([name, color, role]) => <div key={name} className="bg-card"><div className={`h-24 ${color}`} /><div className="p-3"><p className="text-xs font-bold">{name}</p><p className="mt-1 text-[10px] text-muted-foreground">{role}</p></div></div>)}</div></div><div><SectionLabel number="B">Type in two voices</SectionLabel><div className="mt-6 space-y-6 border-t border-border pt-6"><div><p className="font-display text-5xl leading-none text-primary dark:text-foreground">Evidence moves us.</p><p className="mt-2 font-mono-ui text-[10px] text-muted-foreground">Instrument Serif / display</p></div><div><p className="text-base font-bold">Every record should help someone decide.</p><p className="mt-2 font-mono-ui text-[10px] text-muted-foreground">Manrope / interface</p></div><div><p className="font-mono-ui text-sm text-secondary">2030 / Q2 / 1,68,491</p><p className="mt-2 font-mono-ui text-[10px] text-muted-foreground">DM Mono / data</p></div></div></div><div className="lg:col-span-2"><SectionLabel number="C">Spacing &amp; edges</SectionLabel><div className="mt-6 grid gap-4 sm:grid-cols-3"><div className="border border-border p-5"><div className="h-1 w-8 bg-accent" /><p className="mt-5 text-sm font-bold">Sharp hierarchy</p><p className="mt-2 text-xs leading-5 text-muted-foreground">Borders and rules do the work of decoration.</p></div><div className="border border-border p-5"><div className="flex items-end gap-1"><span className="h-2 w-2 bg-secondary" /><span className="h-4 w-2 bg-secondary" /><span className="h-7 w-2 bg-secondary" /></div><p className="mt-5 text-sm font-bold">Measured rhythm</p><p className="mt-2 text-xs leading-5 text-muted-foreground">A quiet scale with room for real content.</p></div><div className="border border-border p-5"><div className="h-8 border-l-2 border-accent" /><p className="mt-5 text-sm font-bold">Human emphasis</p><p className="mt-2 text-xs leading-5 text-muted-foreground">Amber marks the moment that needs attention.</p></div></div></div></div> : <div className="mt-10 grid gap-10 lg:grid-cols-2"><div><SectionLabel number="A">Controls</SectionLabel><div className="mt-6 space-y-5 border border-border bg-card p-6"><div className="flex flex-wrap gap-3"><Button variant="primary" testId="button-show-primary">Primary action <ArrowRight size={15} /></Button><Button variant="amber" testId="button-show-amber">Mark for review</Button><Button variant="outline" testId="button-show-outline">Secondary</Button></div><div className="flex flex-wrap gap-3"><button data-testid="button-show-bookmark" className="focus-ring flex h-10 w-10 items-center justify-center border border-border text-secondary"><Bookmark size={17} /></button><button data-testid="button-show-download" className="focus-ring flex h-10 w-10 items-center justify-center border border-border text-secondary"><Download size={17} /></button><span className="flex items-center gap-2 border border-border px-3 text-xs font-semibold"><CheckCircle2 size={15} className="text-secondary" /> Verified record</span></div></div></div><div><SectionLabel number="B">Editorial blocks</SectionLabel><div className="mt-6 space-y-4"><div className="border-l-2 border-accent bg-muted p-5"><p className="text-sm font-bold">A useful note</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Context belongs next to the number, not hidden behind it.</p></div><div className="bg-primary p-5 text-primary-foreground"><p className="font-display text-3xl">Ask a better question.</p><p className="mt-3 text-xs leading-5 text-primary-foreground/65">The assistant should point to evidence, show its limits, and invite the next step.</p></div></div></div></div>}
    </div></section>
  </div>;
}

function Assistant({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [question, setQuestion] = useState('');
  const [asked, setAsked] = useState('');
  const suggestions = ['What is a Safe System?', 'Show me school-zone evidence', 'Which states are improving?'];
  const ask = (event?: FormEvent) => { event?.preventDefault(); if (question.trim()) { setAsked(question.trim()); setQuestion(''); } };
  if (!open) return null;
  return <><button onClick={onClose} data-testid="button-assistant-backdrop" aria-label="Close Ask BARS" className="fixed inset-0 z-40 bg-primary/35" /><aside role="dialog" aria-label="Ask BARS assistant" className="fixed bottom-0 right-0 z-50 flex h-[min(680px,100dvh)] w-full flex-col border-l border-border bg-card shadow-2xl sm:bottom-5 sm:right-5 sm:h-[620px] sm:w-[430px]"><div className="flex items-start justify-between border-b border-border bg-primary p-5 text-primary-foreground"><div><div className="flex items-center gap-2"><span className="flex h-7 w-7 items-center justify-center bg-accent text-accent-foreground"><MessageCircle size={15} /></span><span className="font-mono-ui text-xs tracking-[.12em]">ASK BARS</span></div><h2 className="mt-4 font-display text-3xl">A grounded starting point.</h2></div><button onClick={onClose} data-testid="button-close-assistant" className="focus-ring p-1 text-primary-foreground/70 hover:text-primary-foreground"><X size={19} /></button></div><div className="flex-1 overflow-y-auto p-5"><div className="flex gap-3 border-l-2 border-accent pl-4"><ShieldCheck className="mt-0.5 shrink-0 text-secondary" size={17} /><p className="text-sm leading-6 text-muted-foreground">I can help you find your way through BARS&apos; evidence and people. I&apos;ll point to what we know, and say when we don&apos;t.</p></div>{!asked && <div className="mt-10"><p className="font-mono-ui text-[10px] uppercase tracking-[.14em] text-muted-foreground">Try asking</p><div className="mt-3 space-y-2">{suggestions.map((suggestion) => <button key={suggestion} onClick={() => { setQuestion(suggestion); setAsked(suggestion); }} data-testid={`button-assistant-suggestion-${suggestion.slice(0, 4).toLowerCase()}`} className="focus-ring flex w-full items-center justify-between border-b border-border py-3 text-left text-sm font-semibold hover:text-secondary"><span>{suggestion}</span><ArrowUpRight size={14} /></button>)}</div></div>}{asked && <div className="mt-8"><div className="ml-8 bg-muted px-4 py-3 text-sm leading-6 text-foreground">{asked}</div><div className="mt-5 flex gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center bg-secondary text-secondary-foreground"><Check size={14} /></span><div><p className="text-sm leading-6 text-foreground">A useful place to begin is the Safe System primer: it frames road death as preventable, while accounting for human error in the design of roads, vehicles, speeds, and response.</p><Link href="/repository" onClick={onClose} data-testid="link-assistant-result" className="focus-ring mt-4 inline-flex items-center gap-2 text-xs font-bold text-secondary">Open the related evidence <ArrowRight size={14} /></Link></div></div></div>}</div><form onSubmit={ask} className="border-t border-border p-4"><div className="flex items-center border border-border bg-background"><label className="sr-only" htmlFor="assistant-question">Ask BARS a question</label><input id="assistant-question" value={question} onChange={(event) => setQuestion(event.target.value)} data-testid="input-assistant-question" placeholder="Ask about evidence, states, or practice..." className="focus-ring min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-muted-foreground" /><button type="submit" disabled={!question.trim()} data-testid="button-submit-assistant" className="focus-ring mr-1 flex h-9 w-9 items-center justify-center bg-primary text-primary-foreground disabled:opacity-30"><Send size={15} /></button></div><p className="mt-2 font-mono-ui text-[9px] text-muted-foreground">Grounded mock / replace with API retrieval later</p></form></aside></>;
}

function Router({ onOpenAssistant }: { onOpenAssistant: () => void }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}><Shell onOpenAssistant={onOpenAssistant}><Switch><Route path="/" component={() => <Home onAsk={onOpenAssistant} />} /><Route path="/repository" component={Repository} /><Route path="/dashboard" component={Dashboard} /><Route path="/directory" component={Directory} /><Route path="/design-system" component={DesignSystem} /><Route component={NotFound} /></Switch></Shell></ErrorBoundary>;
}

function App() {
  const [assistantOpen, setAssistantOpen] = useState(false);
  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setAssistantOpen(true); }
      if (event.key === 'Escape') setAssistantOpen(false);
    };
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);
  return <QueryClientProvider client={queryClient}><TooltipProvider><Router onOpenAssistant={() => setAssistantOpen(true)} /><Assistant open={assistantOpen} onClose={() => setAssistantOpen(false)} /><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;