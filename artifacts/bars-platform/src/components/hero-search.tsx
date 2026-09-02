import { FormEvent, KeyboardEvent, useEffect, useId, useMemo, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { ChevronDown, Filter, MapPin, Search } from '@/components/hugeicons';
import {
  CATALOG_SIZE,
  catalogRegions,
  catalogTypes,
  repositorySearchHref,
  suggestCatalog,
} from '@/lib/catalog';
import { officialAsOf } from '@/lib/official-series';

const fmt = (value: number) => new Intl.NumberFormat('en-IN').format(value);

function Highlight({ text, query }: { text: string; query: string }) {
  const needle = query.trim();
  if (!needle) return <>{text}</>;
  const index = text.toLowerCase().indexOf(needle.toLowerCase());
  if (index < 0) {
    const token = needle.split(/\s+/).pop() || needle;
    const tokenAt = text.toLowerCase().indexOf(token.toLowerCase());
    if (tokenAt < 0) return <>{text}</>;
    return (
      <>
        {text.slice(0, tokenAt)}
        <span className="text-foreground">{text.slice(tokenAt, tokenAt + token.length)}</span>
        <span className="text-muted-foreground">{text.slice(tokenAt + token.length)}</span>
      </>
    );
  }
  return (
    <>
      <span className="text-muted-foreground">{text.slice(0, index)}</span>
      <span className="text-foreground">{text.slice(index, index + needle.length)}</span>
      <span className="text-muted-foreground">{text.slice(index + needle.length)}</span>
    </>
  );
}

export function HeroSearch({
  autoFocus = false,
  testIdPrefix = 'hero',
}: {
  autoFocus?: boolean;
  testIdPrefix?: string;
}) {
  const [, navigate] = useLocation();
  const listId = useId();
  const rootRef = useRef<HTMLFormElement>(null);
  const [query, setQuery] = useState('');
  const [type, setType] = useState('All formats');
  const [region, setRegion] = useState('All India');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const suggestions = useMemo(() => suggestCatalog(query), [query]);
  const showList = open && query.trim().length > 0 && suggestions.length > 0;

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const go = (value = query) => {
    setOpen(false);
    navigate(repositorySearchHref(value, type, region));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const picked = showList ? suggestions[active]?.text ?? query : query;
    go(picked);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!showList) {
      if (event.key === 'Escape') (event.target as HTMLInputElement).blur();
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((value) => (value + 1) % suggestions.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((value) => (value - 1 + suggestions.length) % suggestions.length);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
    }
  };

  return (
    <form ref={rootRef} onSubmit={onSubmit} className="relative w-full" role="search">
      <div className="flex flex-col overflow-hidden rounded-md border border-border/80 bg-card/95 shadow-[0_10px_40px_hsl(var(--foreground)/.08)] backdrop-blur-md lg:flex-row lg:items-stretch">
        <div className="relative min-w-0 flex-1">
          <button
            type="submit"
            aria-label="Search repository"
            className="focus-ring absolute left-1.5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground"
          >
            <Search size={18} />
          </button>
          <label className="sr-only" htmlFor={`${testIdPrefix}-search`}>
            Search the BARS repository
          </label>
          <input
            id={`${testIdPrefix}-search`}
            data-testid={`input-${testIdPrefix}-search`}
            autoFocus={autoFocus}
            value={query}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            role="combobox"
            aria-expanded={showList}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={showList ? `${listId}-${active}` : undefined}
            placeholder="Search title, source, state, theme..."
            onFocus={() => setOpen(true)}
            onChange={(event) => {
              setQuery(event.target.value);
              setOpen(true);
            }}
            onKeyDown={onKeyDown}
            className="h-14 w-full bg-transparent pl-12 pr-4 text-[15px] text-foreground outline-none placeholder:text-muted-foreground/70"
          />
        </div>
        <div className="hidden h-8 w-px self-center bg-border lg:block" />
        <label className="relative shrink-0 border-t border-border lg:w-[200px] lg:border-t-0">
          <span className="sr-only">Filter by format</span>
          <Filter className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={15} />
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            data-testid={`select-${testIdPrefix}-type`}
            className="h-12 w-full cursor-pointer appearance-none bg-transparent pl-10 pr-9 text-sm text-foreground outline-none lg:h-14"
          >
            {catalogTypes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={15} />
        </label>
        <div className="hidden h-8 w-px self-center bg-border lg:block" />
        <label className="relative shrink-0 border-t border-border lg:w-[188px] lg:border-t-0">
          <span className="sr-only">Filter by region</span>
          <MapPin className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={15} />
          <select
            value={region}
            onChange={(event) => setRegion(event.target.value)}
            data-testid={`select-${testIdPrefix}-region`}
            className="h-12 w-full cursor-pointer appearance-none bg-transparent pl-10 pr-9 text-sm text-foreground outline-none lg:h-14"
          >
            {catalogRegions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={15} />
        </label>
      </div>

      {showList && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Predicted search terms"
          className="absolute inset-x-0 top-[calc(100%+6px)] z-30 overflow-hidden rounded-md border border-border bg-card py-1 shadow-lg"
        >
          {suggestions.map((item, index) => (
            <li key={`${item.hint}-${item.text}`} role="presentation">
              <button
                type="button"
                id={`${listId}-${index}`}
                role="option"
                aria-selected={index === active}
                data-testid={`button-${testIdPrefix}-suggest-${index}`}
                onMouseEnter={() => setActive(index)}
                onClick={() => go(item.text)}
                className={`flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left text-sm ${
                  index === active ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/70'
                }`}
              >
                <span className="min-w-0 truncate font-medium">
                  <Highlight text={item.text} query={query} />
                </span>
                <span className="shrink-0 font-mono-ui text-[10px] uppercase tracking-[.12em] text-muted-foreground">
                  {item.hint}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-3 font-mono-ui text-[12px] text-muted-foreground">
        {fmt(CATALOG_SIZE)} sourced records · MoRTH / Lok Sabha / PIB as of {officialAsOf}
      </p>
    </form>
  );
}
