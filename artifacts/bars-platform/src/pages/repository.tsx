import { useState, useMemo } from 'react';
import { Search, Filter, MapPin, ChevronDown, ShieldCheck, Bookmark, BookmarkCheck, ArrowUpRight } from 'lucide-react';
import { resources, type Resource } from '@/lib/data';
import { PageHeader, Button } from '@/components/shared';
import { mediaLibrary } from '@/lib/media-library';
import { BrandMark } from '@/components/brand-mark';

function ResourceCard({ resource, saved, onToggle }: { resource: Resource; saved: boolean; onToggle: () => void }) {
  const [showRecord, setShowRecord] = useState(false);
  
  return (
    <article data-testid={`card-resource-${resource.id}`} className="surface-card group relative flex min-h-[320px] flex-col rounded-lg p-6">
      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex items-center rounded-full bg-secondary/10 px-2.5 py-0.5 font-mono-ui text-[10px] uppercase tracking-[.12em] text-secondary font-semibold">
          {resource.type}
        </span>
        <button 
          aria-label={`${saved ? 'Remove' : 'Save'} ${resource.title}`} 
          data-testid={`button-save-${resource.id}`} 
          onClick={onToggle} 
          className={`focus-ring -mr-2 -mt-2 rounded-md p-2 transition-colors ${saved ? 'text-secondary hover:bg-secondary/10' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
        >
          {saved ? <BookmarkCheck size={18} className="fill-secondary/20" /> : <Bookmark size={18} />}
        </button>
      </div>
      
      <h2 className="mt-5 max-w-[450px] font-display text-2xl leading-tight text-primary transition-colors group-hover:text-secondary dark:text-foreground">
        {resource.title}
      </h2>
      
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground flex-1">
        {resource.description}
      </p>
      
      <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-border pt-5">
        <div className="flex min-w-0 items-center gap-3">
          <BrandMark name={resource.source} initials={resource.source.split(/\s+/).map((word) => word[0]).join('').slice(0, 2)} size="sm" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">{resource.source}</p>
          <p className="mt-1 flex items-center gap-2 font-mono-ui text-[11px] text-muted-foreground">
            <span>{resource.year}</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>{resource.region}</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>{resource.format}</span>
          </p>
          </div>
        </div>
        <button 
          onClick={() => setShowRecord((current) => !current)} 
          data-testid={`button-open-resource-${resource.id}`} 
          className="focus-ring inline-flex items-center gap-1.5 rounded-sm px-2 py-1 text-xs font-bold text-secondary transition-colors hover:bg-secondary/10 hover:text-secondary"
        >
          {showRecord ? 'Close record' : 'Read record'} 
          <ArrowUpRight size={14} className={`transition-transform ${showRecord ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      {showRecord && (
        <div data-testid={`text-resource-record-${resource.id}`} className="mt-4 rounded-md border border-border bg-muted/60 p-4 text-xs leading-relaxed text-muted-foreground animate-fade">
          <strong className="text-foreground block mb-1">Catalog note:</strong> 
          This record is available as a grounded starting point for practitioners. Ask BARS for related sources or implementation examples. The full text is secured in the repository.
        </div>
      )}
    </article>
  );
}

export default function Repository() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('All formats');
  const [region, setRegion] = useState('All India');
  const [saved, setSaved] = useState<string[]>(['morth-report', 'safe-system-primer', 'fleet-safety']);
  
  const filtered = useMemo(() => resources.filter((item) => {
    const haystack = `${item.title} ${item.description} ${item.source} ${item.type}`.toLowerCase();
    return haystack.includes(query.toLowerCase()) && 
           (type === 'All formats' || item.type === type) && 
           (region === 'All India' || item.region === region);
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

  return (
    <div className="flex-1 flex flex-col bg-muted/20">
      <PageHeader 
        eyebrow="01 / Knowledge repository" 
        title="Evidence you can use." 
        description="A working library of Indian road-safety research, policy, field practice, and tools. Every record is sourced, dated, and ready to build on."
        imageSrc={mediaLibrary.evidence.src}
      >
        <Button variant="outline" onClick={downloadCatalogue} testId="button-repository-download" className="bg-background">
          Download catalogue
        </Button>
      </PageHeader>
      
      <section className="flex-1 px-5 py-8 sm:px-10 lg:px-16 lg:py-12">
        <div className="mx-auto max-w-[1240px]">
          
          {/* Search & Filters */}
          <div className="surface-card grid gap-4 rounded-xl p-2 lg:grid-cols-[1fr_auto_auto]">
            <div className="relative flex items-center">
              <Search className="absolute left-4 text-muted-foreground" size={18} />
              <label className="sr-only" htmlFor="repository-search">Search the repository</label>
              <input 
                id="repository-search" 
                data-testid="input-repository-search" 
                value={query} 
                onChange={(event) => setQuery(event.target.value)} 
                placeholder="Search evidence, places, people..." 
                className="h-12 w-full rounded-lg bg-transparent pl-11 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:bg-muted/50 transition-colors" 
              />
            </div>
            
            <div className="h-px bg-border lg:h-8 lg:w-px lg:self-center" />
            
            <div className="flex flex-col sm:flex-row gap-2 px-2 pb-2 lg:p-0">
              <label className="relative flex-1 sm:w-[185px]">
                <span className="sr-only">Filter by format</span>
                <Filter className="pointer-events-none absolute left-3 top-3.5 text-muted-foreground" size={16} />
                <select 
                  value={type} 
                  onChange={(event) => setType(event.target.value)} 
                  data-testid="select-repository-type" 
                  className="focus-ring h-12 w-full appearance-none rounded-lg bg-transparent pl-10 pr-10 text-sm font-medium outline-none hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  {types.map((item) => <option key={item}>{item}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-3.5 text-muted-foreground" size={16} />
              </label>
              
              <label className="relative flex-1 sm:w-[170px]">
                <span className="sr-only">Filter by region</span>
                <MapPin className="pointer-events-none absolute left-3 top-3.5 text-muted-foreground" size={16} />
                <select 
                  value={region} 
                  onChange={(event) => setRegion(event.target.value)} 
                  data-testid="select-repository-region" 
                  className="focus-ring h-12 w-full appearance-none rounded-lg bg-transparent pl-10 pr-10 text-sm font-medium outline-none hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  {regions.map((item) => <option key={item}>{item}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-3.5 text-muted-foreground" size={16} />
              </label>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-between gap-4 py-6 px-1">
            <p className="font-mono-ui text-[12px] text-muted-foreground flex items-center gap-2">
              <span data-testid="text-repository-result-count" className="flex h-6 min-w-[24px] items-center justify-center rounded-sm bg-primary text-primary-foreground font-bold px-1.5">
                {filtered.length.toString().padStart(2, '0')}
              </span> 
              <span>records / showing {type.toLowerCase()}</span>
            </p>
            {(query || type !== 'All formats' || region !== 'All India') && (
              <button 
                onClick={() => { setQuery(''); setType('All formats'); setRegion('All India'); }} 
                data-testid="button-clear-repository-filters" 
                className="focus-ring text-xs font-semibold text-secondary hover:text-primary transition-colors bg-secondary/10 px-3 py-1.5 rounded-sm"
              >
                Clear filters
              </button>
            )}
          </div>
          
          {filtered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
              {filtered.map((resource) => (
                <ResourceCard 
                  key={resource.id} 
                  resource={resource} 
                  saved={saved.includes(resource.id)} 
                  onToggle={() => toggleSaved(resource.id)} 
                />
              ))}
            </div>
          ) : (
             <div data-testid="empty-repository-results" className="surface-card flex flex-col items-center justify-center rounded-xl border-dashed px-6 py-24 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Search size={28} className="text-muted-foreground" />
              </div>
              <h2 className="mt-6 font-display text-3xl text-primary dark:text-foreground">No records match.</h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">We couldn't find any evidence matching those filters. Try adjusting your search term or clearing filters to see more.</p>
            </div>
          )}
          
           <div className="mt-12 flex items-start gap-4 rounded-xl border border-accent/20 bg-accent/5 p-6 text-sm text-foreground">
            <ShieldCheck className="shrink-0 text-accent" size={24} />
            <div>
              <strong className="block text-accent mb-1 text-base">About the repository.</strong> 
              <p className="leading-relaxed opacity-90 text-muted-foreground">
                Records are reviewed for provenance and practical relevance. A source label is not an endorsement; it is an invitation to examine the evidence. New findings are added quarterly by the BARS evidence unit.
              </p>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
}
