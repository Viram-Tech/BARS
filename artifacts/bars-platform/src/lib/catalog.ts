import { resources, type Resource } from '@/lib/data';

export const CATALOG_SIZE = resources.length;
export const CATALOG_PAGE_SIZE = 12;

function haystack(record: Resource) {
  return `${record.title} ${record.description} ${record.source} ${record.type} ${record.region} ${record.format} ${record.year}`.toLowerCase();
}

function recordMatches(record: Resource, needle: string, type: string, region: string) {
  if (type !== 'All formats' && record.type !== type) return false;
  if (region !== 'All India' && record.region !== region) return false;
  if (!needle) return true;
  return haystack(record).includes(needle);
}

export function catalogMatches(query: string, type: string, region: string) {
  const needle = query.trim().toLowerCase();
  const hits: number[] = [];
  resources.forEach((record, index) => {
    if (recordMatches(record, needle, type, region)) hits.push(index);
  });
  return { total: hits.length, at: (i: number) => hits[i] };
}

export function catalogPage(query: string, type: string, region: string, page: number, pageSize = CATALOG_PAGE_SIZE) {
  const { total, at } = catalogMatches(query, type, region);
  const start = page * pageSize;
  const end = Math.min(start + pageSize, total);
  const items: Resource[] = [];
  for (let i = start; i < end; i += 1) {
    items.push(resources[at(i)]);
  }
  return { total, items, pages: Math.max(1, Math.ceil(total / pageSize) || 1) };
}

export const catalogTypes = ['All formats', ...Array.from(new Set(resources.map((item) => item.type)))];
export const catalogRegions = ['All India', ...Array.from(new Set(resources.map((item) => item.region)))];
export const CATALOG_PAGES = Math.max(1, Math.ceil(CATALOG_SIZE / CATALOG_PAGE_SIZE));

const EXTRA_KEYWORDS = [
  'pedestrian deaths',
  'Lok Sabha Q.1939',
  'overspeeding',
  'black corridors',
  'eDAR',
  'helmet',
  'school zone',
  'cashless treatment',
  'New Delhi Road Safety Declaration',
  'Safe System',
  'two-wheeler',
  'national highways',
  'vehicles scrapped',
  'Kaggle',
  'WHO Global Status Report',
  'MoRTH Road Accidents in India',
];

const SUGGEST_POOL: { text: string; hint: string }[] = [
  ...resources.map((item) => ({ text: item.title, hint: item.type })),
  ...catalogTypes.filter((item) => item !== 'All formats').map((item) => ({ text: item, hint: 'Format' })),
  ...catalogRegions.filter((item) => item !== 'All India').map((item) => ({ text: item, hint: 'Region' })),
  ...EXTRA_KEYWORDS.map((item) => ({ text: item, hint: 'Keyword' })),
];

export function suggestCatalog(query: string, limit = 7) {
  const needle = query.trim().toLowerCase();
  if (needle.length < 1) return [];

  const lastToken = needle.split(/\s+/).pop() || needle;
  const scored = SUGGEST_POOL.map((item) => {
    const hay = item.text.toLowerCase();
    let score = 0;
    if (hay === needle) score = 100;
    else if (hay.startsWith(needle)) score = 80;
    else if (hay.startsWith(lastToken) && lastToken.length >= 2) score = 55;
    else if (hay.includes(needle)) score = 40;
    else if (lastToken.length >= 2 && hay.includes(lastToken)) score = 25;
    return { ...item, score };
  })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.text.localeCompare(b.text));

  const seen = new Set<string>();
  const unique: { text: string; hint: string }[] = [];
  for (const item of scored) {
    const key = item.text.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push({ text: item.text, hint: item.hint });
    if (unique.length >= limit) break;
  }
  return unique;
}

export function repositorySearchHref(query: string, type = 'All formats', region = 'All India') {
  const params = new URLSearchParams();
  const trimmed = query.trim();
  if (trimmed) params.set('q', trimmed);
  if (type && type !== 'All formats') params.set('type', type);
  if (region && region !== 'All India') params.set('region', region);
  const qs = params.toString();
  return qs ? `/repository?${qs}` : '/repository';
}
