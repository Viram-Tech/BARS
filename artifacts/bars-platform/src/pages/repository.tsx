import { useEffect, useMemo, useState } from 'react';
import { useLocation, useSearch } from 'wouter';
import { Search, Filter, MapPin, ChevronDown, ChevronLeft, ChevronRight, ShieldCheck } from '@/components/hugeicons';
import { resources, type Resource } from '@/lib/data';
import { CATALOG_PAGE_SIZE, CATALOG_SIZE, catalogPage, catalogRegions, catalogTypes } from '@/lib/catalog';
import { officialAsOf, officialNational, pibFacts } from '@/lib/official-series';
import { PageHeader, Button, SectionLabel } from '@/components/shared';
import { mediaLibrary } from '@/lib/media-library';
import { ResourceCard } from '@/components/resource-card';

const fmt = (value: number) => new Intl.NumberFormat('en-IN').format(value);

function paramsFromSearch(search: string) {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
  return {
    q: params.get('q') ?? '',
    type: params.get('type') || 'All formats',
    region: params.get('region') || 'All India',
  };
}

function sortItems(items: Resource[], sort: string) {
  const next = [...items];
  if (sort === 'Title') next.sort((a, b) => a.title.localeCompare(b.title));
  else if (sort === 'Source') next.sort((a, b) => a.source.localeCompare(b.source));
  else next.sort((a, b) => b.year.localeCompare(a.year));
  return next;
}

export default function Repository() {
  const search = useSearch();
  const [, navigate] = useLocation();
  const incoming = useMemo(() => paramsFromSearch(search), [search]);
  const [query, setQuery] = useState(incoming.q);
  const [debounced, setDebounced] = useState(incoming.q);
  const [type, setType] = useState(incoming.type);
  const [region, setRegion] = useState(incoming.region);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState('Latest');

  useEffect(() => {
    setQuery(incoming.q);
    setDebounced(incoming.q);
    setType(incoming.type);
    setRegion(incoming.region);
    setPage(0);
  }, [incoming.q, incoming.type, incoming.region]);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(query), 220);
    return () => window.clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    setPage(0);
  }, [debounced, type, region, sort]);

  const result = useMemo(
    () => catalogPage(debounced, type, region, page, CATALOG_PAGE_SIZE),
    [debounced, type, region, page],
  );

  const visible = useMemo(() => sortItems(result.items, sort), [result.items, sort]);
  const featured = resources.filter((item) => item.featured).slice(0, 3);
  const browsing = !debounced && type === 'All formats' && region === 'All India' && page === 0;

  const downloadCatalogue = () => {
    const head = `BARS REPOSITORY CATALOGUE\nSourced records: ${CATALOG_SIZE}\nAs of ${officialAsOf}\n2025 deaths (Lok Sabha Q.1939): ${officialNational[4].deaths}\n\n`;
    const body = resources.map((item) => `${item.type} | ${item.title} | ${item.source} | ${item.year}`).join('\n');
    const blob = new Blob([head + body], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'bars-repository-catalogue.txt';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const go = (next: number) => setPage(Math.max(0, Math.min(result.pages - 1, next)));

  return (
    <div className="flex-1 flex flex-col bg-muted/20">
      <PageHeader
        eyebrow="01 / Knowledge repository"
        title="Evidence you can use."
        description={`Every card is a sourced record — MoRTH, Lok Sabha Q.1939, PIB, WHO, IRF, or a labelled Kaggle sample. Figures below are official national totals as of ${officialAsOf}, not generated catalogue counts. A source label is provenance, not endorsement.`}
        imageSrc={mediaLibrary.evidence.src}
      >
        <Button variant="outline" onClick={downloadCatalogue} testId="button-repository-download" className="bg-background">
          Download featured catalogue
        </Button>
      </PageHeader>

      <section className="flex-1 py-8 lg:py-10">
        <div className="bars-page">
          <div className="w-fit max-w-full overflow-x-auto rounded-lg border border-border bg-card">
            <div className="flex divide-x divide-border">
              {[
                ['Sourced records', fmt(CATALOG_SIZE)],
                ['Deaths, 2025', fmt(officialNational[4].deaths)],
                ['Crashes, 2025', fmt(officialNational[4].accidents)],
                ['NH network', `${fmt(pibFacts.nhKm)}\u00a0km`],
                ['This view', fmt(result.total)],
              ].map(([label, value]) => (
                <div key={label} className="shrink-0 px-4 py-2.5 sm:px-5 sm:py-3">
                  <p className="whitespace-nowrap font-mono-ui text-[10px] uppercase tracking-[.14em] text-muted-foreground">{label}</p>
                  <p className="mt-1 whitespace-nowrap font-mono-ui text-lg font-bold tabular-nums leading-none text-foreground sm:text-xl">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm lg:flex-row lg:items-stretch">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <label className="sr-only" htmlFor="repository-search">Search the repository</label>
              <input
                id="repository-search"
                data-testid="input-repository-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search title, source, state, theme..."
                className="h-14 w-full bg-transparent pl-12 pr-4 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="hidden w-px bg-border lg:block" />
            <label className="relative border-t border-border lg:w-[200px] lg:border-t-0">
              <span className="sr-only">Filter by format</span>
              <Filter className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <select
                value={type}
                onChange={(event) => setType(event.target.value)}
                data-testid="select-repository-type"
                className="h-12 w-full appearance-none bg-transparent pl-10 pr-9 text-sm font-medium outline-none lg:h-14"
              >
                {catalogTypes.map((item) => <option key={item}>{item}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            </label>
            <div className="hidden w-px bg-border lg:block" />
            <label className="relative border-t border-border lg:w-[200px] lg:border-t-0">
              <span className="sr-only">Filter by region</span>
              <MapPin className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <select
                value={region}
                onChange={(event) => setRegion(event.target.value)}
                data-testid="select-repository-region"
                className="h-12 w-full appearance-none bg-transparent pl-10 pr-9 text-sm font-medium outline-none lg:h-14"
              >
                {catalogRegions.map((item) => <option key={item}>{item}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            </label>
          </div>

          {browsing && (
            <div className="mt-12">
              <SectionLabel number="02">Featured</SectionLabel>
              <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">Start with the official series.</h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">MoRTH, Lok Sabha, PIB and labelled open samples.</p>
              <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {featured.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl text-foreground">{fmt(result.total)} resources</h2>
              <p className="mt-1 text-sm text-muted-foreground" data-testid="text-repository-result-count">
                Sorted by {sort.toLowerCase()} · page {page + 1} of {fmt(result.pages)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {(query || type !== 'All formats' || region !== 'All India') && (
                <button
                  onClick={() => {
                    setQuery('');
                    setType('All formats');
                    setRegion('All India');
                    navigate('/repository');
                  }}
                  data-testid="button-clear-repository-filters"
                  className="focus-ring text-xs font-semibold text-secondary"
                >
                  Clear filters
                </button>
              )}
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                Sort
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  className="focus-ring h-10 rounded-md border border-border bg-card px-3 text-sm font-medium text-foreground"
                >
                  <option>Latest</option>
                  <option>Title</option>
                  <option>Source</option>
                </select>
              </label>
            </div>
          </div>

          {visible.length > 0 ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {visible.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div data-testid="empty-repository-results" className="mt-8 rounded-2xl border border-dashed border-border bg-card px-6 py-20 text-center">
              <h2 className="font-display text-3xl text-foreground">No records match.</h2>
              <p className="mt-3 text-sm text-muted-foreground">Adjust the search or clear filters.</p>
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => go(page - 1)}
              disabled={page === 0}
              className="focus-ring inline-flex h-10 items-center gap-1 rounded-md border border-border bg-card px-3 text-sm font-semibold disabled:opacity-40"
            >
              <ChevronLeft size={16} /> Previous
            </button>
            <p className="font-mono-ui text-xs text-muted-foreground">
              Showing {page * CATALOG_PAGE_SIZE + 1}–{Math.min((page + 1) * CATALOG_PAGE_SIZE, result.total)} of {fmt(result.total)}
            </p>
            <button
              type="button"
              onClick={() => go(page + 1)}
              disabled={page >= result.pages - 1}
              className="focus-ring inline-flex h-10 items-center gap-1 rounded-md border border-border bg-card px-3 text-sm font-semibold disabled:opacity-40"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>

          <div className="mt-10 flex items-start gap-3 rounded-2xl border border-border bg-card px-5 py-5 text-sm">
            <ShieldCheck className="mt-0.5 shrink-0 text-accent" size={20} />
            <p className="leading-relaxed text-muted-foreground">
              <strong className="text-foreground">About these records.</strong> {resources.length} sourced items: MoRTH annual tables, Lok Sabha Unstarred Q.1939 (30 Jul 2026), PIB programme facts, WHO GSRRS 2023, IRF World Road Statistics, two labelled Kaggle samples, and BARS practice notes. Practice notes do not invent national totals. Kaggle files are samples, not substitutes for Annexure-I.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
