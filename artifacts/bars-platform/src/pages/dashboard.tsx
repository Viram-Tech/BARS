import { useState } from 'react';
import { Activity, ArrowRight, TrendingDown, ShieldCheck, MapPin } from 'lucide-react';
import { Link } from 'wouter';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, CartesianGrid } from 'recharts';
import { states } from '@/lib/data';
import { PageHeader, SectionLabel } from '@/components/shared';
import { mediaLibrary } from '@/lib/media-library';

// Data for charts
const nationalTrendData = [
  { year: '2012', deaths: 138258 },
  { year: '2014', deaths: 139671 },
  { year: '2016', deaths: 150785 },
  { year: '2018', deaths: 151417 },
  { year: '2020', deaths: 131714 }, // Covid dip
  { year: '2021', deaths: 153972 },
  { year: '2022', deaths: 168491 },
];

export default function Dashboard() {
  const [selectedState, setSelectedState] = useState('Tamil Nadu');
  const state = states.find((item) => item.name === selectedState) || states[0];
  
  return (
    <div className="flex-1 flex flex-col bg-muted/10">
      <PageHeader 
        eyebrow="02 / National intelligence" 
        title="Read the road ahead." 
        description="A concise view of where risk is concentrated, where progress is holding, and where the next useful question begins. Updated quarterly from public and partner data."
        imageSrc={mediaLibrary.hero.src}
      >
        <div className="flex items-center gap-3 rounded-full border border-border bg-card px-4 py-1.5 shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
          </span>
          <span className="font-mono-ui text-[11px] font-bold text-foreground">Q2 2024 release</span>
        </div>
      </PageHeader>
      
      <section className="flex-1 px-5 py-8 sm:px-10 lg:px-16 lg:py-12">
        <div className="mx-auto max-w-[1240px]">
          
          {/* Top KPIs */}
          <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr_1fr]">
            
            {/* National Picture */}
            <div className="surface-card rounded-xl p-6 sm:p-8 flex flex-col">
              <SectionLabel number="A">National picture</SectionLabel>
              <div className="mt-6 flex items-end gap-4">
                <span data-testid="text-national-fatalities" className="font-mono-ui text-5xl font-bold text-primary dark:text-foreground tracking-tight">
                  1,68,491
                </span>
                <span className="mb-1.5 text-sm font-medium text-muted-foreground leading-tight">
                  reported road deaths<br />in 2022
                </span>
              </div>
              
              <div className="mt-8 h-[160px] w-full flex-1 min-h-[160px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={nationalTrendData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorDeaths" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '0.5rem', fontSize: '12px' }}
                      itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
                      labelStyle={{ color: 'hsl(var(--muted-foreground))', marginBottom: '4px' }}
                      formatter={(value: number) => [new Intl.NumberFormat('en-IN').format(value), 'Deaths']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="deaths" 
                      stroke="hsl(var(--secondary))" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorDeaths)" 
                      activeDot={{ r: 6, fill: 'hsl(var(--secondary))', stroke: 'hsl(var(--card))', strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 flex justify-between font-mono-ui text-[10px] font-bold text-muted-foreground">
                <span>2012</span>
                <span>2017</span>
                <span>2022</span>
              </div>
            </div>
            
            {/* Leading Indicator */}
            <div className="surface-card rounded-xl p-6 sm:p-8 flex flex-col">
              <SectionLabel number="B">Leading indicator</SectionLabel>
              <div className="mt-6">
                <span className="block font-mono-ui text-6xl font-bold text-secondary tracking-tight">63.4</span>
                <p className="mt-2 text-base font-bold text-foreground">Safe-system readiness index</p>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground flex-1">
                Composite of road design, speed management, emergency response, and data practice across participating states.
              </p>
              <div className="mt-6 w-full rounded-full bg-muted h-3 overflow-hidden">
                <div className="h-full bg-secondary rounded-full" style={{ width: '63.4%' }} />
              </div>
              <div className="mt-2 text-right font-mono-ui text-[10px] text-muted-foreground">Target: 100</div>
            </div>
            
            {/* This Quarter */}
            <div className="rounded-xl border border-primary bg-primary text-primary-foreground p-6 sm:p-8 shadow-sm flex flex-col">
              <SectionLabel number="C"><span className="text-primary-foreground/70">This quarter</span></SectionLabel>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-sm">
                  <TrendingDown size={24} strokeWidth={2.5} />
                </div>
                <span className="font-mono-ui text-5xl font-bold tracking-tight">−7.2%</span>
              </div>
              <p className="mt-4 text-base font-medium leading-relaxed text-primary-foreground/90 flex-1">
                change in fatality rate across BARS partner corridors
              </p>
              <div className="mt-6 rounded-lg bg-primary-foreground/10 p-4 border border-primary-foreground/10">
                <p className="text-sm leading-relaxed text-primary-foreground/80">
                  Improvement is strongest where engineering and enforcement plans were funded together.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
            {/* State Comparison */}
            <div className="surface-card rounded-xl p-6 sm:p-8">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                  <SectionLabel number="03">State comparison</SectionLabel>
                  <h2 className="mt-3 font-display text-3xl text-primary dark:text-foreground">Fatality rate, per 100,000</h2>
                </div>
                <label className="relative shrink-0">
                  <span className="sr-only">Select state</span>
                  <select 
                    value={selectedState} 
                    onChange={(event) => setSelectedState(event.target.value)} 
                    data-testid="select-dashboard-state" 
                    className="focus-ring h-10 appearance-none rounded-md border border-border bg-background pl-4 pr-10 text-sm font-semibold outline-none cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    {states.map((item) => <option key={item.name}>{item.name}</option>)}
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </label>
              </div>
              
              <div className="mt-10 space-y-2">
                {states.map((item) => (
                  <button 
                    key={item.name} 
                    onClick={() => setSelectedState(item.name)} 
                    data-testid={`button-state-${item.short}`} 
                     className={`focus-ring group grid w-full grid-cols-[minmax(90px,130px)_minmax(0,1fr)_52px] items-center gap-2 rounded-md p-3 text-left text-sm transition-colors hover:bg-muted/50 sm:grid-cols-[130px_1fr_60px] sm:gap-4 ${selectedState === item.name ? 'bg-muted border border-border/50 shadow-sm' : 'border border-transparent'}`}
                  >
                    <span className={`font-semibold ${selectedState === item.name ? 'text-primary dark:text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                      {item.name}
                    </span>
                    <span className="h-3 w-full rounded-full bg-muted overflow-hidden">
                      <span 
                        className={`block h-full transition-all duration-500 rounded-full ${item.tone === 'watch' ? 'bg-destructive/80' : 'bg-secondary'}`} 
                        style={{ width: `${(item.fatality / 20) * 100}%` }} 
                      />
                    </span>
                    <span className="font-mono-ui text-right font-bold">{item.fatality}</span>
                  </button>
                ))}
              </div>
              
              <div className="mt-8 flex items-center justify-between rounded-lg bg-background border border-border p-4">
                <span className="text-sm text-muted-foreground">
                  Selected: <strong className="text-foreground">{state.name}</strong>
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-muted-foreground">3-year trend:</span>
                  <span className={`inline-flex items-center rounded-sm px-2 py-1 font-mono-ui text-xs font-bold ${state.trend < 0 ? 'bg-secondary/10 text-secondary' : 'bg-destructive/10 text-destructive'}`}>
                    {state.trend > 0 ? '+' : ''}{state.trend}%
                  </span>
                </div>
              </div>
            </div>
            
            {/* A Useful Question / Callout */}
            <div className="surface-card rounded-xl overflow-hidden flex flex-col">
              <div className="bg-muted p-6 sm:p-8 border-b border-border">
                <SectionLabel number="04">A useful question</SectionLabel>
                <h2 className="mt-5 font-display text-4xl leading-tight text-primary dark:text-foreground">
                  What does the number leave out?
                </h2>
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <p className="text-base leading-relaxed text-muted-foreground">
                  Fatality rates help compare risk. They do not show who is walking, cycling, working, waiting for an ambulance, or living beside a high-speed corridor.
                </p>
                <div className="mt-auto pt-8">
                  <Link 
                    href="/repository" 
                    data-testid="link-dashboard-evidence" 
                    className="focus-ring inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-secondary text-sm font-bold text-secondary-foreground shadow-sm transition-all hover:bg-secondary/90 hover:shadow-md"
                  >
                    See the evidence behind the signal <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Coverage metrics */}
          <div className="surface-card mt-8 rounded-xl p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end border-b border-border pb-6">
              <div>
                <SectionLabel number="05">Coverage, not just outcomes</SectionLabel>
                <p className="mt-3 text-base text-muted-foreground">Partner-state adoption of four leading safety practices across the network.</p>
              </div>
              <span className="rounded-sm bg-muted px-2 py-1 font-mono-ui text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Source: BARS Field Index
              </span>
            </div>
            
            <div className="mt-8 h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={states} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="short" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 'bold' }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    cursor={{ fill: 'hsl(var(--muted))' }}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '0.5rem', fontSize: '12px' }}
                    itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
                    formatter={(value: number) => [`${value}%`, 'Coverage']}
                  />
                  <Bar dataKey="coverage" radius={[4, 4, 0, 0]} maxBarSize={60}>
                    {states.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.tone === 'leading' ? 'hsl(var(--accent))' : 'hsl(var(--secondary))'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
}
