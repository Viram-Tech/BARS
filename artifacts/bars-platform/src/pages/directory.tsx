import { useState } from 'react';
import { Building2, CheckCircle2, MapPin, Search, UserRound, Users, X, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { directoryRecords } from '@/lib/data';
import { PageHeader, SectionLabel, Button } from '@/components/shared';

export default function Directory() {
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState('All records');
  const [network, setNetwork] = useState('All networks');
  const [contributeOpen, setContributeOpen] = useState(false);
  
  const filtered = directoryRecords.filter((record) => 
    `${record.name} ${record.detail} ${record.location}`.toLowerCase().includes(query.toLowerCase()) && 
    (kind === 'All records' || record.kind === kind) && 
    (network === 'All networks' || record.network === network)
  );

  return (
    <div className="flex-1 flex flex-col bg-muted/20">
      <PageHeader 
        eyebrow="03 / Verified directory" 
        title="The people doing the work." 
        description="A trusted starting point for collaboration across Sarkaar, Bazaar, and Samaaj. Profiles are reviewed for identity, role, and active road-safety work."
      >
        <Button variant="amber" onClick={() => setContributeOpen(true)} testId="button-directory-suggest" className="shadow-sm hover:shadow-md">
          <Users size={16} /> Suggest a record
        </Button>
      </PageHeader>
      
      <section className="flex-1 px-5 py-8 sm:px-10 lg:px-16 lg:py-12">
        <div className="mx-auto max-w-[1240px]">
          
          {/* Search & Filters */}
          <div className="flex flex-col gap-4 rounded-xl bg-card p-2 shadow-sm border border-border lg:flex-row">
            <div className="relative flex-1 flex items-center">
              <Search className="absolute left-4 text-muted-foreground" size={18} />
              <label className="sr-only" htmlFor="directory-search">Search directory</label>
              <input 
                id="directory-search" 
                value={query} 
                onChange={(event) => setQuery(event.target.value)} 
                data-testid="input-directory-search" 
                placeholder="Search organisation, expert, or place..." 
                className="h-12 w-full rounded-lg bg-transparent pl-11 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:bg-muted/50 transition-colors" 
              />
            </div>
            
            <div className="hidden lg:block w-px bg-border my-2" />
            
            <div className="flex gap-2 px-2 pb-2 lg:p-0">
              <select 
                value={kind} 
                onChange={(event) => setKind(event.target.value)} 
                data-testid="select-directory-kind" 
                className="focus-ring h-12 appearance-none rounded-lg border border-border lg:border-transparent bg-background lg:bg-transparent px-4 text-sm font-medium outline-none cursor-pointer hover:bg-muted/50 transition-colors min-w-[140px]"
              >
                <option>All records</option>
                <option>Organisation</option>
                <option>Expert</option>
              </select>
              
              <select 
                value={network} 
                onChange={(event) => setNetwork(event.target.value)} 
                data-testid="select-directory-network" 
                className="focus-ring h-12 appearance-none rounded-lg border border-border lg:border-transparent bg-background lg:bg-transparent px-4 text-sm font-medium outline-none cursor-pointer hover:bg-muted/50 transition-colors min-w-[140px]"
              >
                <option>All networks</option>
                <option>Sarkaar</option>
                <option>Bazaar</option>
                <option>Samaaj</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center justify-between py-6 px-1">
            <p className="font-mono-ui text-[12px] text-muted-foreground flex items-center gap-2">
              <span data-testid="text-directory-result-count" className="flex h-6 min-w-[24px] items-center justify-center rounded-sm bg-primary text-primary-foreground font-bold px-1.5">
                {filtered.length.toString().padStart(2, '0')}
              </span>
              <span>verified records</span>
            </p>
            <span className="flex items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
              <ShieldCheck size={14} /> Reviewed by BARS
            </span>
          </div>
          
          {filtered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((record) => (
                <article 
                  key={record.id} 
                  data-testid={`card-directory-${record.id}`} 
                  className="group flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-secondary/30"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono-ui text-[10px] uppercase tracking-[.12em] font-bold ${record.kind === 'Organisation' ? 'bg-primary/10 text-primary dark:text-foreground' : 'bg-muted text-muted-foreground'}`}>
                        {record.kind === 'Organisation' ? <Building2 size={12} /> : <UserRound size={12} />}
                        {record.kind}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-accent">
                        <CheckCircle2 size={14} className="fill-accent/20" /> Verified
                      </span>
                    </div>
                    
                    <div className="mt-8 flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary/10 border border-secondary/20 font-mono-ui text-sm font-bold text-secondary shadow-inner">
                        {record.initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h2 className="break-words text-lg font-bold leading-tight text-primary dark:text-foreground group-hover:text-secondary transition-colors">
                          {record.name}
                        </h2>
                        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
                          {record.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <MapPin size={14} className="text-secondary/70" />
                      {record.location}
                    </span>
                    <span className={`rounded-sm px-2 py-1 font-mono-ui text-[10px] font-bold uppercase tracking-wider ${
                      record.network === 'Sarkaar' ? 'bg-primary/10 text-primary dark:text-primary-foreground' : 
                      record.network === 'Bazaar' ? 'bg-secondary/10 text-secondary' : 
                      'bg-accent/10 text-accent'
                    }`}>
                      {record.network}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div data-testid="empty-directory-results" className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card px-6 py-24 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Users className="text-muted-foreground" size={28} />
              </div>
              <p className="mt-6 font-display text-3xl text-primary dark:text-foreground">No records found.</p>
              <p className="mt-3 text-sm text-muted-foreground">Try adjusting your search or filters.</p>
            </div>
          )}
          
          <div className="mt-12 flex flex-col justify-between gap-6 rounded-xl border border-border bg-primary p-6 sm:flex-row sm:items-center sm:p-8 shadow-md">
            <div>
              <p className="font-display text-2xl text-primary-foreground">Are you part of the road-safety ecosystem?</p>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70 max-w-md">
                Help keep this directory useful, current, and representative of the actual work happening on the ground.
              </p>
            </div>
            <Button variant="amber" onClick={() => setContributeOpen(true)} testId="button-directory-contribute" className="shrink-0 h-12 px-6">
              Contribute information <ArrowUpRight size={16} />
            </Button>
          </div>
          
          {/* Contribute Dialog */}
          {contributeOpen && (
            <>
              <div className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm animate-fade" onClick={() => setContributeOpen(false)} />
              <div 
                role="dialog" 
                aria-label="Suggest a directory record" 
                data-testid="dialog-directory-contribute" 
                className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card p-6 shadow-2xl sm:p-8 animate-rise"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <SectionLabel number="BARS">Contribute to the directory</SectionLabel>
                    <h2 className="mt-4 font-display text-3xl text-primary dark:text-foreground">Keep the map current.</h2>
                  </div>
                  <button 
                    onClick={() => setContributeOpen(false)} 
                    data-testid="button-close-directory-dialog" 
                    className="focus-ring -mr-2 -mt-2 p-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="mt-6 rounded-lg bg-muted/50 p-4 border border-border">
                  <p className="text-sm leading-relaxed text-foreground">
                    This first slice accepts suggestions for review. In the connected version, submissions will route directly to the BARS stewardship team for verification.
                  </p>
                </div>
                
                <div className="mt-8 flex justify-end gap-3">
                  <Button variant="quiet" onClick={() => setContributeOpen(false)} testId="button-directory-dialog-cancel">
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={() => setContributeOpen(false)} testId="button-directory-dialog-done">
                    Understood
                  </Button>
                </div>
              </div>
            </>
          )}
          
        </div>
      </section>
    </div>
  );
}
