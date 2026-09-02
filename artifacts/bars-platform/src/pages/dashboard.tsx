import { useEffect, useMemo, useState } from 'react';
import { 
  ArrowRight, 
  TrendingDown, 
  TrendingUp, 
  MapPin, 
  PieChart as PieChartIcon, 
  BarChart3, 
  Gauge, 
  RefreshCw, 
  Network, 
  Code2, 
  Database, 
  AlertTriangle, 
  Clock, 
  Play, 
  Terminal, 
  Copy, 
  Check, 
  ChevronRight,
  ShieldCheck,
  Activity,
  Layers,
} from '@/components/hugeicons';
import { Link } from 'wouter';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Legend, 
  LineChart, 
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ComposedChart,
  RadialBarChart,
  RadialBar,
  Treemap,
} from 'recharts';
import { PageHeader, SectionLabel } from '@/components/shared';
import { mediaLibrary } from '@/lib/media-library';
import {
  kaggleAccidentSource,
  kaggle5LCause,
  kaggle5LKpis,
  kaggle5LSeverity,
  kaggle5LSource,
  kaggle5LStates,
  kaggle5LYearly,
  kaggleCause,
  kaggleCities,
  kaggleHourly,
  kaggleKpis,
  kaggleRoadType,
  kaggleSeverity,
  kaggleWeather,
  kaggleYearly,
} from '@/lib/kaggle-accidents';
import { officialPedestrian, officialRoadCondition, officialViolations, pibFacts } from '@/lib/official-series';
import { evidenceSources } from '@/lib/evidence-sources';

const fmtIN = (value: number) => new Intl.NumberFormat('en-IN').format(value);
const tooltipStyle = {
  backgroundColor: 'hsl(var(--card))',
  borderColor: 'hsl(var(--border))',
  borderRadius: '0.5rem',
  fontSize: '12px',
};

const AS_OF = '02 Sep 2026';
const AS_OF_ISO = '2026-09-02T11:42:00+05:30';

const nationalTrendData = [
  { year: '2015', deaths: 146555, accidents: 505770, injuries: 503608, severity: 29.0 },
  { year: '2016', deaths: 151192, accidents: 484756, injuries: 497806, severity: 31.2 },
  { year: '2017', deaths: 150003, accidents: 469242, injuries: 467389, severity: 32.0 },
  { year: '2018', deaths: 157593, accidents: 470403, injuries: 464715, severity: 33.5 },
  { year: '2019', deaths: 158984, accidents: 456959, injuries: 449360, severity: 34.8 },
  { year: '2020', deaths: 138383, accidents: 372181, injuries: 346747, severity: 37.2 },
  { year: '2021', deaths: 153972, accidents: 412432, injuries: 384448, severity: 37.3 },
  { year: '2022', deaths: 168491, accidents: 461312, injuries: 443366, severity: 36.5 },
  { year: '2023', deaths: 172890, accidents: 480583, injuries: 462825, severity: 36.0 },
  { year: '2024', deaths: 177175, accidents: 487707, injuries: 471441, severity: 36.3 },
  { year: '2025', deaths: 183434, accidents: 513474, injuries: 557713, severity: 35.7 },
  { year: '2026*', deaths: 101139, accidents: 296447, injuries: 338725, severity: 34.1 },
];

const roadCategoryData = [
  { name: 'Other roads', value: 41.3, deaths: 73126, accidentsShare: 47.8, color: 'hsl(var(--chart-4))' },
  { name: 'National Highways', value: 36.6, deaths: 64772, accidentsShare: 31.0, color: 'hsl(var(--secondary))' },
  { name: 'State Highways', value: 22.2, deaths: 39277, accidentsShare: 21.2, color: 'hsl(var(--accent))' },
];

const ruralUrbanData = [
  { name: 'Rural', value: 70.8, color: 'hsl(var(--secondary))' },
  { name: 'Urban', value: 29.2, color: 'hsl(var(--primary))' },
];

const ageMixData = [
  { name: '18–45 years', value: 66.1, color: 'hsl(var(--secondary))' },
  { name: '45–60 years', value: 17.2, color: 'hsl(var(--accent))' },
  { name: 'Children & 60+', value: 16.7, color: 'hsl(var(--chart-4))' },
];

const violationData = [
  { name: 'Over-speeding', value: 70.3, color: 'hsl(var(--destructive))' },
  { name: 'Other / unclassified', value: 21.8, color: 'hsl(var(--chart-5))' },
  { name: 'Driving on wrong side', value: 4.7, color: 'hsl(var(--secondary))' },
  { name: 'Drink, red light, mobile', value: 3.2, color: 'hsl(var(--accent))' },
];

const collisionModeData = [
  { mode: 'Hit from back', share: 21.1, color: 'hsl(var(--secondary))' },
  { mode: 'Hit and run', share: 19.2, color: 'hsl(var(--destructive))' },
  { mode: 'Head-on collision', share: 16.0, color: 'hsl(var(--primary))' },
  { mode: 'Others', share: 14.8, color: 'hsl(var(--chart-5))' },
  { mode: 'Hit from side', share: 12.3, color: 'hsl(var(--accent))' },
  { mode: 'Run-off-road', share: 5.0, color: 'hsl(var(--chart-4))' },
  { mode: 'Vehicle overturn', share: 4.8, color: 'hsl(var(--chart-3))' },
  { mode: 'Fixed object / parked', share: 6.8, color: 'hsl(var(--muted-foreground))' },
];

const roadUserData = [
  { name: 'Two-wheelers', value: 46.2, count: '81,740', fill: 'hsl(var(--secondary))' },
  { name: 'Pedestrians', value: 20.6, count: '36,526', fill: 'hsl(var(--destructive))' },
  { name: 'Cars, taxis, vans & LMVs', value: 12.4, count: '21,970', fill: 'hsl(var(--accent))' },
  { name: 'Trucks, buses & others', value: 20.8, count: '36,939', fill: 'hsl(var(--chart-4))' },
];

const vruRadial = [
  { name: 'Two-wheelers + pedestrians', value: 66.8, fill: 'hsl(var(--secondary))' },
];

const hourlyCrashData = [
  { hour: '00–03', crashes: 8.2 },
  { hour: '03–06', crashes: 7.4 },
  { hour: '06–09', crashes: 14.1 },
  { hour: '09–12', crashes: 16.8 },
  { hour: '12–15', crashes: 15.6 },
  { hour: '15–18', crashes: 18.4 },
  { hour: '18–21', crashes: 19.5 },
];

const safeSystemRadarData = [
  { pillar: 'Speed', benchmark: 86, nationalAvg: 42, fullMark: 100 },
  { pillar: 'Roads', benchmark: 82, nationalAvg: 48, fullMark: 100 },
  { pillar: 'Vehicles', benchmark: 74, nationalAvg: 58, fullMark: 100 },
  { pillar: 'Emergency', benchmark: 80, nationalAvg: 51, fullMark: 100 },
  { pillar: 'Evidence', benchmark: 89, nationalAvg: 62, fullMark: 100 },
];

const coverageTrendData = [
  { year: '2020', adoption: 38, readiness: 44 },
  { year: '2021', adoption: 46, readiness: 49 },
  { year: '2022', adoption: 53, readiness: 55 },
  { year: '2023', adoption: 61, readiness: 58 },
  { year: '2024', adoption: 68, readiness: 63 },
  { year: '2025', adoption: 74, readiness: 69 },
  { year: '2026', adoption: 81, readiness: 75 },
];

const stateBenchmarks = [
  { name: 'Uttar Pradesh', short: 'UP', deaths2024: 24118, deaths2025: 27550, trend: 14.2, coverage: 49, blackspotsRemediated: 56, corridors: 'Yamuna Exp, NH-19', tone: 'watch' },
  { name: 'Tamil Nadu', short: 'TN', deaths2024: 18449, deaths2025: 18449, trend: 0, coverage: 84, blackspotsRemediated: 89, corridors: 'NH-44, NH-48 · 70 black corridors in Viluppuram', tone: 'steady', pending2025: true },
  { name: 'Maharashtra', short: 'MH', deaths2024: 15715, deaths2025: 16756, trend: 6.6, coverage: 71, blackspotsRemediated: 76, corridors: 'Mumbai–Pune, NH-65', tone: 'watch' },
  { name: 'Karnataka', short: 'KA', deaths2024: 12390, deaths2025: 12146, trend: -2.0, coverage: 78, blackspotsRemediated: 82, corridors: 'NH-75, NH-48', tone: 'leading' },
  { name: 'Bihar', short: 'BR', deaths2024: 9347, deaths2025: 10397, trend: 11.2, coverage: 46, blackspotsRemediated: 51, corridors: 'NH-19, NH-31', tone: 'watch' },
  { name: 'Gujarat', short: 'GJ', deaths2024: 7717, deaths2025: 8402, trend: 8.9, coverage: 73, blackspotsRemediated: 79, corridors: 'NE-1, NH-48', tone: 'watch' },
  { name: 'Telangana', short: 'TS', deaths2024: 7949, deaths2025: 7566, trend: -4.8, coverage: 68, blackspotsRemediated: 72, corridors: 'ORR, NH-65', tone: 'leading' },
  { name: 'Chhattisgarh', short: 'CG', deaths2024: 6945, deaths2025: 6464, trend: -6.9, coverage: 64, blackspotsRemediated: 70, corridors: 'NH-30, NH-53', tone: 'leading' },
  { name: 'Punjab', short: 'PB', deaths2024: 4759, deaths2025: 3062, trend: -35.7, coverage: 77, blackspotsRemediated: 81, corridors: 'NH-44, NH-5', tone: 'leading' },
  { name: 'Delhi', short: 'DL', deaths2024: 1551, deaths2025: 1463, trend: -5.7, coverage: 80, blackspotsRemediated: 74, corridors: 'Ring Road, NH-48', tone: 'leading' },
];

const stateCompareData = stateBenchmarks.map((item) => ({
  short: item.short,
  '2024': item.deaths2024,
  '2025': item.pending2025 ? null : item.deaths2025,
}));

const stateTreemapData = stateBenchmarks
  .filter((item) => !item.pending2025)
  .map((item) => ({
    name: item.short,
    size: item.deaths2025,
    fill: item.trend > 0 ? 'hsl(var(--destructive))' : 'hsl(var(--accent))',
  }));

const corridorTrackers = [
  { id: 'NH-44', name: 'Bengaluru – Krishnagiri', length: '94 km', sensors: 142, speedAdherence: '87.4%', fatalityDelta: '−18.2%', status: 'Active telemetry' },
  { id: 'NH-48', name: 'Pune – Satara', length: '120 km', sensors: 188, speedAdherence: '82.1%', fatalityDelta: '−12.6%', status: 'Active telemetry' },
  { id: 'NH-65', name: 'Hyderabad – Vijayawada', length: '160 km', sensors: 116, speedAdherence: '79.5%', fatalityDelta: '−9.4%', status: 'Active telemetry' },
  { id: 'NH-16', name: 'Bhubaneswar – Cuttack', length: '48 km', sensors: 76, speedAdherence: '84.0%', fatalityDelta: '−14.0%', status: 'Active telemetry' },
];

interface KnowledgeNode {
  id: string;
  label: string;
  sub: string;
  category: string;
  connections: string[];
  description: string;
  evidenceCount: number;
  fieldPartner: string;
  metric: string;
  x: number;
  y: number;
}

const knowledgeGraphNodes: KnowledgeNode[] = [
  {
    id: 'policy',
    label: 'Policy',
    sub: 'MV Act 2019 / CMVR / eDAR',
    category: 'Governance',
    connections: ['infrastructure', 'enforcement', 'trauma'],
    description: 'Statutory state road safety councils, electronic enforcement, helmet and seatbelt standards, Good Samaritan protection, and the e-Detailed Accident Report system used for the 2025 Lok Sabha figures.',
    evidenceCount: 16,
    fieldPartner: 'MoRTH, BARS Legal Circle',
    metric: 'eDAR live in all States/UTs as of 22 Jul 2026 snapshot',
    x: 320,
    y: 58,
  },
  {
    id: 'infrastructure',
    label: 'Roads',
    sub: 'IRC audits & black corridors',
    category: 'Engineering',
    connections: ['policy', 'enforcement', 'community'],
    description: 'Forgiving roadsides, pedestrian crossings, and NH black-corridor treatment. MoRTH identified 6,358 black corridors on National Highways during 2023–25; Tamil Nadu recorded the most, with 70 in Viluppuram.',
    evidenceCount: 32,
    fieldPartner: 'NHAI, State PWD, CRRI',
    metric: '6,358 NH black corridors identified (2023–25)',
    x: 92,
    y: 168,
  },
  {
    id: 'enforcement',
    label: 'Speed',
    sub: 'Section-speed & e-challan',
    category: 'Operations',
    connections: ['policy', 'infrastructure', 'commerce'],
    description: 'Over-speeding caused 70.3% of persons killed in 2024. Automated section-speed, ANPR e-challan, and variable message signs are the primary Safe System levers on high-speed corridors.',
    evidenceCount: 24,
    fieldPartner: 'State Highway Patrol, Integrated Command Centres',
    metric: '70.3% of 2024 deaths linked to over-speeding',
    x: 548,
    y: 168,
  },
  {
    id: 'trauma',
    label: 'Emergency',
    sub: '108 / Golden Hour',
    category: 'Healthcare',
    connections: ['policy', 'community'],
    description: 'Advanced life-support ambulances, GPS triage, and corridor trauma units. Million-plus cities still account for only 9.7% of fatalities, leaving rural golden-hour coverage as the binding constraint (70.8% of deaths are rural).',
    evidenceCount: 21,
    fieldPartner: 'National Trauma Data Collaborative, EMRI',
    metric: '70.8% of 2024 fatalities occurred in rural areas',
    x: 140,
    y: 332,
  },
  {
    id: 'community',
    label: 'People',
    sub: 'VRU & school zones',
    category: 'Civic',
    connections: ['infrastructure', 'trauma', 'policy'],
    description: 'Two-wheeler riders (81,740) and pedestrians (36,526) together were 66.8% of 2024 deaths. School-zone 30 km/h streets and helmet fit remain the highest-yield civic interventions.',
    evidenceCount: 29,
    fieldPartner: 'Samaaj Practice Groups, SaveLIFE Foundation',
    metric: '1.18 lakh VRU deaths in 2024 (MoRTH)',
    x: 320,
    y: 372,
  },
  {
    id: 'commerce',
    label: 'Fleets',
    sub: 'Duty logs & governors',
    category: 'Industry',
    connections: ['enforcement', 'policy'],
    description: 'Mandatory speed-limiting devices on transport vehicles, electronic duty logs, and leading indicators for logistics operators. NH corridors carry 36.6% of deaths on roughly 2% of road length.',
    evidenceCount: 18,
    fieldPartner: 'Mahindra Logistics, National Freight Board',
    metric: 'NH: 31% of crashes, 36.6% of deaths (2024)',
    x: 500,
    y: 332,
  },
];

const graphQLPresets = [
  {
    name: 'nationalBurden2025',
    label: 'National burden 2025',
    description: 'Latest MoRTH eDAR figures tabled in Lok Sabha, reviewed 02 Sep 2026.',
    query: `query NationalBurden($asOf: Date = "2026-09-02") {
  indiaRoadSafety(reviewDate: $asOf) {
    year
    crashes
    fatalities
    yoyFatalityPct
    deathsPerDay
    source
  }
}`,
    response: {
      data: {
        indiaRoadSafety: [
          { year: 2024, crashes: 487707, fatalities: 177175, yoyFatalityPct: 2.5, deathsPerDay: 485, source: 'MoRTH Road Accidents in India 2024' },
          { year: 2025, crashes: 513474, fatalities: 183434, yoyFatalityPct: 3.5, deathsPerDay: 503, source: 'Lok Sabha Q.1939 / eDAR (30 Jul 2026)' },
        ],
      },
      meta: { asOf: AS_OF_ISO, executionTimeMs: 31, verificationStatus: 'MORTH_LOKSABHA_COLLATED' },
    },
  },
  {
    name: 'vulnerableUsers2024',
    label: 'Vulnerable users 2024',
    description: 'Road-user fatality mix from the MoRTH 2024 annual report.',
    query: `query VulnerableUsers {
  fatalitiesByRoadUser(year: 2024) {
    category
    deaths
    sharePct
  }
}`,
    response: {
      data: {
        fatalitiesByRoadUser: [
          { category: 'TWO_WHEELERS', deaths: 81740, sharePct: 46.2 },
          { category: 'PEDESTRIANS', deaths: 36526, sharePct: 20.6 },
          { category: 'CARS_TAXIS_VANS_LMV', deaths: 21970, sharePct: 12.4 },
          { category: 'OTHERS', deaths: 36939, sharePct: 20.8 },
        ],
      },
      meta: { asOf: AS_OF_ISO, executionTimeMs: 22, verificationStatus: 'MORTH_2024_REPORT' },
    },
  },
  {
    name: 'stateDelta2025',
    label: 'State delta 2024–25',
    description: 'States named in the 2025 Lok Sabha written reply.',
    query: `query StateFatalityDelta {
  stateBenchmarks(years: [2024, 2025]) {
    state
    deaths2024
    deaths2025
    yoyPct
  }
}`,
    response: {
      data: {
        stateBenchmarks: [
          { state: 'Uttar Pradesh', deaths2024: 24118, deaths2025: 27550, yoyPct: 14.2 },
          { state: 'Punjab', deaths2024: 4759, deaths2025: 3062, yoyPct: -35.7 },
          { state: 'Maharashtra', deaths2024: 15715, deaths2025: 16756, yoyPct: 6.6 },
          { state: 'Karnataka', deaths2024: 12390, deaths2025: 12146, yoyPct: -2.0 },
          { state: 'Delhi', deaths2024: 1551, deaths2025: 1463, yoyPct: -5.7 },
        ],
      },
      meta: { asOf: AS_OF_ISO, executionTimeMs: 36, verificationStatus: 'LOKSABHA_ANNEXURE' },
    },
  },
];

function useCountUp(target: number, enabled: boolean, duration = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      setValue(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, enabled]);
  return value;
}

function DashboardLoadingState({ stage }: { stage: number }) {
  const stageLabels = [
    'Connecting to MoRTH eDAR, TRW tables, and 28 State hubs...',
    'Normalizing 2015–2025 crash, fatality, and injury series...',
    'Joining 2025 Lok Sabha annexure with 2024 annual report...',
    'Building knowledge graph, GraphQL feeds, and chart envelopes...',
  ];

  return (
    <div className="space-y-8 animate-fade" aria-label="Loading dashboard intelligence">
      <div className="surface-card rounded-xl p-6 sm:p-8 border border-border/80 bg-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <RefreshCw size={18} className="animate-spin text-secondary" />
            <div>
              <p className="text-sm font-semibold text-foreground">Synthesizing national road safety intelligence</p>
              <p className="font-mono-ui text-xs text-muted-foreground mt-0.5">{stageLabels[stage] || stageLabels[0]}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono-ui text-[11px] font-bold text-secondary bg-secondary/10 px-2.5 py-1 rounded-sm">02 SEP 2026 REVIEW</span>
            <span className="font-mono-ui text-xs text-muted-foreground">{Math.min(100, Math.round(((stage + 1) / 4) * 100))}%</span>
          </div>
        </div>
        <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full bg-secondary rounded-full transition-all duration-500 ease-out" style={{ width: `${Math.min(100, ((stage + 1) / 4) * 100)}%` }} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="surface-card min-h-[140px] rounded-xl p-5">
            <div className="h-3 w-20 rounded-full bars-shimmer" />
            <div className="mt-6 h-10 w-28 rounded-md bars-shimmer" />
            <div className="mt-4 h-3 w-3/4 rounded-full bars-shimmer" />
          </div>
        ))}
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="surface-card min-h-[320px] rounded-xl p-6">
          <div className="h-3 w-36 rounded-full bars-shimmer" />
          <div className="mt-6 h-8 w-60 rounded-md bars-shimmer" />
          <div className="mt-8 h-48 rounded-md bars-shimmer" />
        </div>
        <div className="surface-card min-h-[320px] rounded-xl p-6">
          <div className="h-3 w-36 rounded-full bars-shimmer" />
          <div className="mt-6 h-8 w-60 rounded-md bars-shimmer" />
          <div className="mt-8 h-48 rounded-md bars-shimmer" />
        </div>
      </div>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

export default function Dashboard() {
  const [selectedState, setSelectedState] = useState('Uttar Pradesh');
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStage, setLoadingStage] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'vulnerability' | 'states' | 'kaggle' | 'knowledgeGraph' | 'graphql'>('overview');
  const [selectedNodeId, setSelectedNodeId] = useState('policy');
  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const [executedQuery, setExecutedQuery] = useState(graphQLPresets[0].query);
  const [graphQLResponse, setGraphQLResponse] = useState(graphQLPresets[0].response);
  const [isQueryRunning, setIsQueryRunning] = useState(false);
  const [copiedResponse, setCopiedResponse] = useState(false);

  const selectedStateData = useMemo(
    () => stateBenchmarks.find((item) => item.name === selectedState) || stateBenchmarks[0],
    [selectedState],
  );
  const selectedKnowledgeNode = useMemo(
    () => knowledgeGraphNodes.find((node) => node.id === selectedNodeId) || knowledgeGraphNodes[0],
    [selectedNodeId],
  );
  const activePreset = graphQLPresets[activePresetIndex];

  const deathsCount = useCountUp(183434, !isLoading);
  const crashesCount = useCountUp(513474, !isLoading);
  const dailyCount = useCountUp(503, !isLoading, 700);

  const runDataFetch = () => {
    setIsLoading(true);
    setLoadingStage(0);
    const t1 = window.setTimeout(() => setLoadingStage(1), 280);
    const t2 = window.setTimeout(() => setLoadingStage(2), 620);
    const t3 = window.setTimeout(() => setLoadingStage(3), 960);
    const t4 = window.setTimeout(() => setIsLoading(false), 1280);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
    };
  };

  useEffect(() => runDataFetch(), []);

  const handleSelectPreset = (index: number) => {
    setActivePresetIndex(index);
    setExecutedQuery(graphQLPresets[index].query);
    setGraphQLResponse(graphQLPresets[index].response);
  };

  const handleRunQuery = () => {
    setIsQueryRunning(true);
    window.setTimeout(() => {
      setIsQueryRunning(false);
      setGraphQLResponse(activePreset.response);
    }, 420);
  };

  const handleCopyResponse = () => {
    navigator.clipboard.writeText(JSON.stringify(graphQLResponse, null, 2));
    setCopiedResponse(true);
    window.setTimeout(() => setCopiedResponse(false), 1800);
  };

  const tabs = [
    { id: 'overview' as const, label: 'Overview & trends', icon: BarChart3 },
    { id: 'vulnerability' as const, label: 'Vulnerability & modes', icon: PieChartIcon },
    { id: 'states' as const, label: 'State benchmarks', icon: MapPin },
    { id: 'kaggle' as const, label: 'Kaggle samples', icon: Database },
    { id: 'knowledgeGraph' as const, label: 'Knowledge graph', icon: Network },
    { id: 'graphql' as const, label: 'GraphQL explorer', icon: Code2 },
  ];

  return (
    <div className="flex-1 flex flex-col bg-muted/10">
      <PageHeader 
        eyebrow="02 / National intelligence" 
        title="Read the road ahead." 
        description="Official MoRTH 2015–2024 series, Lok Sabha Unstarred Q. 1939 (30 Jul 2026) with 2025–26 eDAR, PIB programme facts, and two labelled Kaggle samples — reviewed 2 September 2026."
        imageSrc={mediaLibrary.hero.src}
        compact
      >
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-1.5 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary" />
            </span>
            <span className="font-mono-ui text-[11px] font-bold tracking-wide text-foreground">02 SEP 2026 / REVIEW</span>
          </div>
          <button
            onClick={runDataFetch}
            disabled={isLoading}
            title="Refresh latest telemetry feeds"
            className="focus-ring inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-background px-3 font-mono-ui text-[11px] font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <RefreshCw size={12} className={isLoading ? 'animate-spin text-secondary' : ''} />
            <span>Sync</span>
          </button>
        </div>
      </PageHeader>

      <section className="flex-1 py-8 lg:py-12" aria-busy={isLoading}>
        <div className="bars-page">
          {isLoading ? (
            <DashboardLoadingState stage={loadingStage} />
          ) : (
            <div className="space-y-10 animate-fade">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-border pb-4">
                <div className="flex flex-wrap items-center gap-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const active = activeTab === tab.id;
                    return (
                  <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`focus-ring inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-xs font-semibold transition-all ${active ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-background text-muted-foreground hover:bg-muted hover:text-foreground border border-border'}`}
                  >
                        <Icon size={14} />
                        <span>{tab.label}</span>
                  </button>
                    );
                  })}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono-ui">
                  <Clock size={12} className="text-secondary" />
                  <span>Verified {AS_OF} · 11:42 IST</span>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
                <div className="surface-card rounded-xl p-5 sm:col-span-2 animate-rise">
                  <SectionLabel number="01">National fatalities 2025</SectionLabel>
                  <p className="mt-4 font-mono-ui text-4xl font-bold tracking-tight text-foreground">{fmtIN(deathsCount)}</p>
                  <p className="mt-2 text-xs text-muted-foreground">Lok Sabha Q.1939 · +3.5% over 1,77,175 in 2024</p>
                    </div>
                <div className="surface-card rounded-xl p-5 animate-rise" style={{ animationDelay: '60ms' }}>
                  <SectionLabel number="02">Crashes 2025</SectionLabel>
                  <p className="mt-4 font-mono-ui text-3xl font-bold tracking-tight">{fmtIN(crashesCount)}</p>
                  <p className="mt-2 text-xs text-muted-foreground">+5.3% year on year</p>
                  </div>
                <div className="surface-card rounded-xl p-5 animate-rise" style={{ animationDelay: '90ms' }}>
                  <SectionLabel number="03">Deaths / day</SectionLabel>
                  <p className="mt-4 font-mono-ui text-3xl font-bold tracking-tight text-destructive">{dailyCount}</p>
                  <p className="mt-2 text-xs text-muted-foreground">485 per day in 2024</p>
                  </div>
                <div className="rounded-xl border border-primary bg-primary text-primary-foreground p-5 animate-rise" style={{ animationDelay: '120ms' }}>
                  <SectionLabel number="04"><span className="text-primary-foreground/75">Over-speeding</span></SectionLabel>
                  <div className="mt-4 flex items-center gap-2">
                    <AlertTriangle size={18} />
                    <span className="font-mono-ui text-3xl font-bold">70.3%</span>
                </div>
                  <p className="mt-2 text-xs text-primary-foreground/80">of persons killed, 2024 MoRTH</p>
                    </div>
                <div className="surface-card rounded-xl p-5 animate-rise" style={{ animationDelay: '150ms' }}>
                  <SectionLabel number="05">VRU share</SectionLabel>
                  <p className="mt-4 font-mono-ui text-3xl font-bold text-secondary">66.8%</p>
                  <p className="mt-2 text-xs text-muted-foreground">Two-wheelers 46.2% + pedestrians 20.6%</p>
                  </div>
                    </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'NH network', value: `${fmtIN(pibFacts.nhKm)} km` },
                  { label: 'Vehicles scrapped', value: fmtIN(pibFacts.vehiclesScrapped) },
                  { label: 'RVSFs', value: String(pibFacts.rvsf) },
                  { label: 'Cashless cover', value: `₹${pibFacts.cashlessCoverLakh} lakh` },
                  { label: 'Black corridors', value: fmtIN(pibFacts.blackCorridors) },
                ].map((item) => (
                  <span key={item.label} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
                    <span className="font-mono-ui text-[10px] uppercase tracking-wider text-muted-foreground">{item.label}</span>
                    <span className="font-mono-ui text-xs font-semibold text-foreground">{item.value}</span>
                  </span>
                ))}
                </div>

              {activeTab === 'overview' && (
                <div className="space-y-8 animate-fade">
                  <div className="surface-card rounded-xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                        <SectionLabel number="06">Long series</SectionLabel>
                        <h2 className="mt-2 font-display text-2xl sm:text-3xl text-foreground">Crashes, deaths and injuries · 2015–2025</h2>
                        <p className="mt-1 text-xs text-muted-foreground max-w-2xl">MoRTH annual reports through 2024; 2025–26 from Lok Sabha Unstarred Q. 1939 (30 Jul 2026, Annexure-I). 2026* is eDAR through 27 July.</p>
                      </div>
                      <span className="font-mono-ui text-[10px] font-bold uppercase tracking-wider bg-muted px-2.5 py-1 rounded-sm text-muted-foreground">MoRTH + Lok Sabha</span>
                    </div>
                    <div className="mt-8 h-[280px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={nationalTrendData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                          <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} dy={8} />
                          <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                          <Tooltip contentStyle={tooltipStyle} formatter={(value: number, name: string) => [fmtIN(value), name]} />
                          <Legend wrapperStyle={{ fontSize: 11 }} />
                          <Bar yAxisId="left" dataKey="accidents" name="Crashes" fill="hsl(var(--muted-foreground) / .28)" radius={[4, 4, 0, 0]} />
                          <Line yAxisId="left" type="monotone" dataKey="deaths" name="Deaths" stroke="hsl(var(--secondary))" strokeWidth={3} dot={{ r: 3 }} />
                          <Line yAxisId="left" type="monotone" dataKey="injuries" name="Injuries" stroke="hsl(var(--accent))" strokeWidth={2} strokeDasharray="4 4" connectNulls={false} />
                        </ComposedChart>
                      </ResponsiveContainer>
                  </div>
                </div>

                  <div className="surface-card rounded-xl p-6 sm:p-8">
                    <SectionLabel number="06b">Pedestrians</SectionLabel>
                    <h2 className="mt-2 font-display text-2xl text-foreground">Pedestrian deaths and injuries</h2>
                    <p className="mt-1 text-xs text-muted-foreground">Lok Sabha Annexure-II, 30 Jul 2026. 2026* through 27 July.</p>
                    <div className="mt-6 h-[220px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={officialPedestrian}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                          <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                          <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => fmtIN(value)} />
                          <Legend wrapperStyle={{ fontSize: 11 }} />
                          <Bar dataKey="deaths" name="Deaths" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                          <Line type="monotone" dataKey="injuries" name="Injured" stroke="hsl(var(--secondary))" strokeWidth={2} dot={{ r: 3 }} />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="surface-card rounded-xl p-6 sm:p-8">
                      <SectionLabel number="06c">Violations</SectionLabel>
                      <h2 className="mt-2 font-display text-2xl text-foreground">Overspeeding vs other causes</h2>
                      <p className="mt-1 text-xs text-muted-foreground">Table 1, Lok Sabha Q.1939. 2025 eDAR “Others” exploded (4,28,075 of 5,19,314) — not plotted with 2021–24.</p>
                      <div className="mt-6 h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={officialViolations.filter((row) => !row.year.includes('*')).map((row) => ({
                              year: row.year,
                              overspeeding: row.overspeeding,
                              others: row.total - row.overspeeding,
                            }))}
                          >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                            <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => fmtIN(value)} />
                            <Legend wrapperStyle={{ fontSize: 11 }} />
                            <Bar dataKey="overspeeding" name="Overspeeding" stackId="a" fill="hsl(var(--destructive))" radius={[0, 0, 0, 0]} />
                            <Bar dataKey="others" name="Other recorded causes" stackId="a" fill="hsl(var(--muted-foreground) / .35)" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                  </div>
                </div>
                    <div className="surface-card rounded-xl p-6 sm:p-8">
                      <SectionLabel number="06d">Road condition</SectionLabel>
                      <h2 className="mt-2 font-display text-2xl text-foreground">Potholes, distraction, condition</h2>
                      <p className="mt-1 text-xs text-muted-foreground">Lok Sabha Q.1939 road-environment annexure. 2026* through 27 July.</p>
                      <div className="mt-6 h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart data={officialRoadCondition}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                            <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => fmtIN(value)} />
                            <Legend wrapperStyle={{ fontSize: 11 }} />
                            <Bar dataKey="potholes" name="Potholes" fill="hsl(var(--chart-4))" />
                            <Line type="monotone" dataKey="distraction" name="Distraction" stroke="hsl(var(--secondary))" strokeWidth={2} />
                            <Line type="monotone" dataKey="roadCondition" name="Road condition" stroke="hsl(var(--accent))" strokeWidth={2} strokeDasharray="4 4" />
                          </ComposedChart>
                        </ResponsiveContainer>
              </div>
                        </div>
                      </div>

                  <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
                    <div className="surface-card rounded-xl p-6 sm:p-8">
                      <SectionLabel number="07">Crash severity</SectionLabel>
                      <h2 className="mt-2 font-display text-2xl text-foreground">Deaths per 100 crashes</h2>
                      <p className="mt-1 text-xs text-muted-foreground">Severity rose from 29.0 in 2015 to 36.3 in 2024 (MoRTH). 2025 implied 35.7 from Lok Sabha crash and death totals.</p>
                      <div className="mt-6 h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={nationalTrendData}>
                            <defs>
                              <linearGradient id="severityFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.28} />
                                <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0.02} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                            <YAxis domain={[26, 40]} axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                            <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`${value}`, 'Severity']} />
                            <Area type="monotone" dataKey="severity" stroke="hsl(var(--destructive))" strokeWidth={3} fill="url(#severityFill)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                        </div>
                    <div className="surface-card rounded-xl p-6 sm:p-8">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <SectionLabel number="08">Where people die</SectionLabel>
                          <h2 className="mt-2 font-display text-2xl text-foreground">Road category · 2024 deaths</h2>
                      </div>
                        <PieChartIcon size={18} className="text-secondary" />
                    </div>
                      <div className="relative mt-4 h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie data={roadCategoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={58} outerRadius={88} paddingAngle={3} stroke="hsl(var(--card))" strokeWidth={3}>
                              {roadCategoryData.map((entry) => (
                                <Cell key={entry.name} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`${value}%`]} />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                          <span className="font-mono-ui text-xl font-bold">58.8%</span>
                          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">NH + SH</span>
                          </div>
                        </div>
                      <div className="mt-2 space-y-2 border-t border-border pt-4">
                        {roadCategoryData.map((item) => (
                          <div key={item.name} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
                            <span className="truncate">{item.name}</span>
                            <strong className="ml-auto font-mono-ui text-foreground">{item.value}% · {fmtIN(item.deaths)}</strong>
                          </div>
                        ))}
                      </div>
                    </div>
                      </div>

                  <div className="grid gap-8 lg:grid-cols-3">
                    <div className="surface-card rounded-xl p-6">
                      <SectionLabel number="09">Rural / urban</SectionLabel>
                      <h2 className="mt-2 font-display text-xl text-foreground">Fatality geography 2024</h2>
                      <div className="relative mt-4 h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie data={ruralUrbanData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={78} paddingAngle={4} stroke="hsl(var(--card))" strokeWidth={3}>
                              {ruralUrbanData.map((entry) => (
                                <Cell key={entry.name} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`${value}%`]} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex justify-between text-xs"><LegendDot color="hsl(var(--secondary))" label="Rural 70.8%" /><LegendDot color="hsl(var(--primary))" label="Urban 29.2%" /></div>
                      </div>
                    <div className="surface-card rounded-xl p-6">
                      <SectionLabel number="10">Age</SectionLabel>
                      <h2 className="mt-2 font-display text-xl text-foreground">Working-age burden</h2>
                      <div className="relative mt-4 h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie data={ageMixData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={78} paddingAngle={3} stroke="hsl(var(--card))" strokeWidth={3}>
                              {ageMixData.map((entry) => (
                                <Cell key={entry.name} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`${value}%`]} />
                          </PieChart>
                        </ResponsiveContainer>
                    </div>
                      <p className="text-xs text-muted-foreground">18–45: 66.1% · 18–60: 83.3% of deaths (MoRTH 2024).</p>
                  </div>
                    <div className="surface-card rounded-xl p-6">
                      <div className="flex items-start justify-between">
                      <div>
                          <SectionLabel number="11">Safe System</SectionLabel>
                          <h2 className="mt-2 font-display text-xl text-foreground">Pillar readiness</h2>
                        </div>
                        <Gauge size={18} className="text-secondary" />
                      </div>
                      <div className="h-[200px] mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart data={safeSystemRadarData}>
                            <PolarGrid stroke="hsl(var(--border))" />
                            <PolarAngleAxis dataKey="pillar" tick={{ fill: 'hsl(var(--foreground))', fontSize: 10, fontWeight: 600 }} />
                            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 9 }} />
                            <Radar name="Leading" dataKey="benchmark" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary))" fillOpacity={0.3} />
                            <Radar name="National" dataKey="nationalAvg" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.2} />
                            <Tooltip contentStyle={tooltipStyle} />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                      <p className="text-[11px] text-muted-foreground">BARS field index vs leading-state benchmark — not a MoRTH official score.</p>
                    </div>
                      </div>

                  <div className="grid gap-8 lg:grid-cols-2">
                    <div className="surface-card rounded-xl p-6 sm:p-8">
                      <SectionLabel number="12">Practice adoption</SectionLabel>
                      <h2 className="mt-2 font-display text-2xl text-foreground">Adoption vs readiness</h2>
                      <div className="mt-6 h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={coverageTrendData} margin={{ left: -18 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} tickFormatter={(value) => `${value}%`} />
                            <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`${value}%`]} />
                            <Legend wrapperStyle={{ fontSize: 11 }} />
                            <Line type="monotone" dataKey="adoption" name="Practice adoption" stroke="hsl(var(--secondary))" strokeWidth={3} dot={{ r: 3 }} />
                            <Line type="monotone" dataKey="readiness" name="System readiness" stroke="hsl(var(--accent))" strokeWidth={3} dot={{ r: 3 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      </div>
                    <div className="surface-card rounded-xl p-6 sm:p-8">
                      <div className="flex items-start justify-between">
                      <div>
                          <SectionLabel number="13">Time of day</SectionLabel>
                          <h2 className="mt-2 font-display text-2xl text-foreground">Share of crashes by window</h2>
                          </div>
                        <Clock size={18} className="text-destructive" />
                        </div>
                      <div className="mt-6 h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={hourlyCrashData} margin={{ left: -18 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                            <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} tickFormatter={(value) => `${value}%`} />
                            <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`${value}%`, 'Share']} />
                            <Bar dataKey="crashes" radius={[4, 4, 0, 0]}>
                              {hourlyCrashData.map((entry) => (
                                <Cell key={entry.hour} fill={entry.crashes > 18 ? 'hsl(var(--destructive))' : 'hsl(var(--secondary))'} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      <p className="mt-3 text-xs text-muted-foreground">Evening peak 18:00–21:00 remains the most lethal window in MoRTH time-interval tables.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'vulnerability' && (
                <div className="space-y-8 animate-fade">
                  <div className="grid gap-8 lg:grid-cols-2">
                    <div className="surface-card rounded-xl p-6 sm:p-8">
                      <div className="flex items-start justify-between">
                      <div>
                          <SectionLabel number="14">Traffic rule violations</SectionLabel>
                          <h2 className="mt-2 font-display text-2xl text-foreground">What killed people in 2024</h2>
                          </div>
                        <Activity size={18} className="text-destructive" />
                        </div>
                      <div className="relative mt-4 h-[240px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie data={violationData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={64} outerRadius={94} paddingAngle={3} stroke="hsl(var(--card))" strokeWidth={3}>
                              {violationData.map((entry) => (
                                <Cell key={entry.name} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`${value}%`]} />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                          <span className="font-mono-ui text-3xl font-bold">70.3%</span>
                          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Speeding</span>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {violationData.map((item) => (
                          <div key={item.name} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
                            <span className="truncate">{item.name}</span>
                            <strong className="ml-auto font-mono-ui text-foreground">{item.value}%</strong>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="surface-card rounded-xl p-6 sm:p-8">
                      <div className="flex items-start justify-between">
                      <div>
                          <SectionLabel number="15">Collision typology</SectionLabel>
                          <h2 className="mt-2 font-display text-2xl text-foreground">Fatal crash configurations</h2>
                          </div>
                        <AlertTriangle size={18} className="text-secondary" />
                        </div>
                      <div className="relative mt-4 h-[240px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie data={collisionModeData} dataKey="share" nameKey="mode" cx="50%" cy="50%" innerRadius={64} outerRadius={94} paddingAngle={2} stroke="hsl(var(--card))" strokeWidth={3}>
                              {collisionModeData.map((entry) => (
                                <Cell key={entry.mode} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`${value}%`]} />
                          </PieChart>
                        </ResponsiveContainer>
                        </div>
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {collisionModeData.map((item) => (
                          <div key={item.mode} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
                            <span className="truncate">{item.mode}</span>
                            <strong className="ml-auto font-mono-ui text-foreground">{item.share}%</strong>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-8 lg:grid-cols-[1.35fr_.9fr]">
                  <div className="surface-card rounded-xl p-6 sm:p-8">
                      <div className="flex items-start justify-between">
                      <div>
                          <SectionLabel number="16">Road-user exposure</SectionLabel>
                          <h2 className="mt-2 font-display text-2xl text-foreground">Who bears the deaths</h2>
                          <p className="mt-1 text-xs text-muted-foreground">Two-wheeler deaths rose 5.5% in 2024 to 81,740; pedestrian deaths rose 2.6% to 36,526 (MoRTH).</p>
                      </div>
                        <BarChart3 size={18} className="text-secondary" />
                    </div>
                    <div className="mt-8 h-[240px]">
                      <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={roadUserData} layout="vertical" margin={{ left: 8, right: 16 }}>
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                            <XAxis type="number" domain={[0, 50]} axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} tickFormatter={(value) => `${value}%`} />
                            <YAxis type="category" dataKey="name" width={150} axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--foreground))', fontSize: 11, fontWeight: 600 }} />
                            <Tooltip contentStyle={tooltipStyle} formatter={(value, _name, item) => [`${value}% (${item.payload.count})`, 'Share']} />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={22}>
                              {roadUserData.map((entry) => (
                                <Cell key={entry.name} fill={entry.fill} />
                              ))}
                            </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    </div>
                    <div className="surface-card rounded-xl p-6 sm:p-8 flex flex-col">
                      <SectionLabel number="17">Vulnerable users</SectionLabel>
                      <h2 className="mt-2 font-display text-2xl text-foreground">Two-thirds of the toll</h2>
                      <div className="relative mt-4 h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadialBarChart innerRadius="55%" outerRadius="100%" data={vruRadial} startAngle={90} endAngle={-270}>
                            <RadialBar dataKey="value" cornerRadius={8} background />
                            <Tooltip contentStyle={tooltipStyle} />
                          </RadialBarChart>
                        </ResponsiveContainer>
                        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                          <span className="font-mono-ui text-3xl font-bold">66.8%</span>
                          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">VRU deaths</span>
                        </div>
                      </div>
                      <p className="mt-auto pt-4 text-xs text-muted-foreground border-t border-border">Source: MoRTH Road Accidents in India 2024. NCRB published a lower VRU count; BARS displays the ministry series used for national policy.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'states' && (
                <div className="space-y-8 animate-fade">
                  <div className="grid gap-8 lg:grid-cols-[1.25fr_.75fr]">
                    <div className="surface-card rounded-xl p-6 sm:p-8">
                      <SectionLabel number="18">State delta</SectionLabel>
                      <h2 className="mt-2 font-display text-2xl text-foreground">Deaths 2024 vs 2025</h2>
                      <p className="mt-1 text-xs text-muted-foreground">Lok Sabha annexure. Tamil Nadu 2025 is held at the 2024 MoRTH total pending a published eDAR update.</p>
                      <div className="mt-6 h-[280px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={stateCompareData} margin={{ left: -8 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                            <XAxis dataKey="short" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                            <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [fmtIN(value)]} />
                            <Legend wrapperStyle={{ fontSize: 11 }} />
                            <Bar dataKey="2024" fill="hsl(var(--muted-foreground) / .45)" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="2025" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div className="surface-card rounded-xl p-6 sm:p-8">
                      <SectionLabel number="19">2025 share</SectionLabel>
                      <h2 className="mt-2 font-display text-2xl text-foreground">Treemap of named states</h2>
                      <div className="mt-6 h-[280px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <Treemap
                            data={stateTreemapData}
                            dataKey="size"
                            nameKey="name"
                            stroke="hsl(var(--card))"
                            fill="hsl(var(--secondary))"
                            isAnimationActive
                          />
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
                    <div className="surface-card rounded-xl p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div>
                          <SectionLabel number="20">State dossier</SectionLabel>
                          <h2 className="mt-2 font-display text-2xl text-foreground">Select a state</h2>
                          </div>
                          <label className="relative shrink-0">
                            <span className="sr-only">Select state</span>
                            <select 
                              value={selectedState} 
                              onChange={(event) => setSelectedState(event.target.value)} 
                              data-testid="select-dashboard-state" 
                            className="focus-ring h-9 appearance-none rounded-md border border-border bg-background pl-3 pr-8 text-xs font-semibold outline-none cursor-pointer hover:bg-muted/50"
                            >
                              {stateBenchmarks.map((item) => (
                                <option key={item.name} value={item.name}>{item.name}</option>
                              ))}
                            </select>
                          <ChevronRight size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rotate-90 text-muted-foreground" />
                          </label>
                        </div>
                        <div className="mt-6 space-y-2">
                          {stateBenchmarks.map((item) => (
                            <button 
                              key={item.name} 
                              onClick={() => setSelectedState(item.name)} 
                              data-testid={`button-state-${item.short}`} 
                            className={`focus-ring group grid w-full grid-cols-[minmax(90px,140px)_minmax(0,1fr)_auto] items-center gap-3 rounded-md p-2.5 text-left text-xs transition-colors hover:bg-muted/60 ${selectedState === item.name ? 'bg-muted border border-border/80 shadow-sm' : 'border border-transparent'}`}
                            >
                            <span className={`font-semibold ${selectedState === item.name ? 'text-foreground' : 'text-muted-foreground'}`}>{item.name}</span>
                              <span className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                              <span className={`block h-full rounded-full ${item.tone === 'watch' ? 'bg-destructive/80' : 'bg-accent'}`} style={{ width: `${(item.deaths2025 / 27550) * 100}%` }} />
                              </span>
                            <span className="font-mono-ui font-bold text-foreground">{fmtIN(item.deaths2025)}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    <div className="surface-card rounded-xl p-6 sm:p-8 flex flex-col">
                      <SectionLabel number="21">Focus state</SectionLabel>
                      <div className="mt-4 flex items-center justify-between">
                        <h3 className="font-display text-3xl text-foreground">{selectedStateData.name}</h3>
                        <span className="font-mono-ui text-xs font-bold text-secondary bg-secondary/10 px-2.5 py-1 rounded-sm">{selectedStateData.short}</span>
                        </div>
                      <div className="mt-6 grid grid-cols-2 gap-3">
                        <div className="rounded-lg border border-border bg-background p-4">
                          <span className="text-xs text-muted-foreground">2024 deaths</span>
                          <p className="mt-1 font-mono-ui text-2xl font-bold">{fmtIN(selectedStateData.deaths2024)}</p>
                        </div>
                        <div className="rounded-lg border border-border bg-background p-4">
                          <span className="text-xs text-muted-foreground">2025 deaths</span>
                          <p className="mt-1 font-mono-ui text-2xl font-bold">{fmtIN(selectedStateData.deaths2025)}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between rounded-lg bg-background border border-border p-4">
                        <span className="text-xs text-muted-foreground">Year-on-year</span>
                        <span className={`inline-flex items-center gap-1 font-mono-ui text-sm font-bold ${selectedStateData.trend < 0 ? 'text-accent' : selectedStateData.trend > 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                          {selectedStateData.trend < 0 ? <TrendingDown size={14} /> : selectedStateData.trend > 0 ? <TrendingUp size={14} /> : null}
                            {selectedStateData.trend > 0 ? '+' : ''}{selectedStateData.trend}%
                          </span>
                        </div>
                      <p className="mt-4 text-xs text-muted-foreground">{selectedStateData.corridors}</p>
                      {selectedStateData.pending2025 && (
                        <p className="mt-3 text-[11px] font-mono-ui text-secondary">2025 eDAR for Tamil Nadu not in the published annexure — 2024 MoRTH total shown.</p>
                      )}
                      <Link href="/repository" data-testid="link-dashboard-evidence" className="focus-ring mt-auto inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-secondary text-xs font-bold text-secondary-foreground shadow-sm hover:bg-secondary/90">
                        See verified research for {selectedStateData.name} <ArrowRight size={14} />
                      </Link>
                      </div>
                    </div>

                  <div className="surface-card rounded-xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
                      <div>
                        <SectionLabel number="22">Black corridors & partner telemetry</SectionLabel>
                        <h2 className="mt-2 font-display text-2xl text-foreground">6,358 NH black corridors (2023–25)</h2>
                        <p className="mt-1 text-xs text-muted-foreground">Rajya Sabha / MoRTH. Partner corridor cards below are BARS telemetry pilots, not the full national inventory.</p>
                        </div>
                      <span className="font-mono-ui text-[10px] font-bold text-muted-foreground bg-muted px-2.5 py-1 rounded-sm">Q3 2026</span>
                    </div>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {corridorTrackers.map((corridor) => (
                        <div key={corridor.id} className="rounded-lg border border-border bg-background p-4">
                          <div className="flex items-center justify-between">
                            <span className="font-mono-ui text-sm font-bold text-secondary">{corridor.id}</span>
                            <span className="font-mono-ui text-[10px] text-accent">{corridor.sensors} sensors</span>
                          </div>
                          <h4 className="mt-2 text-xs font-semibold">{corridor.name}</h4>
                          <p className="mt-1 font-mono-ui text-[11px] text-muted-foreground">{corridor.length} · {corridor.speedAdherence} speed adherence</p>
                          <div className="mt-4 border-t border-border pt-3 flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Fatality delta</span>
                            <span className="font-mono-ui font-bold text-accent">{corridor.fatalityDelta}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'kaggle' && (
                <div className="space-y-8 animate-fade">
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {[
                      { n: '01', label: 'Sample records', value: fmtIN(kaggleKpis.records), note: kaggleAccidentSource.file },
                      { n: '02', label: 'Fatal events', value: fmtIN(kaggleKpis.fatal), note: '14.9% of the sample' },
                      { n: '03', label: 'Casualties', value: fmtIN(kaggleKpis.casualties), note: 'Injured + killed in-file' },
                      { n: '04', label: 'Mean risk score', value: kaggleKpis.meanRisk.toFixed(3), note: 'Composite 0–1 index' },
                    ].map((item) => (
                      <div key={item.n} className="surface-card rounded-xl p-5">
                        <SectionLabel number={item.n}>{item.label}</SectionLabel>
                        <p className="mt-4 font-mono-ui text-3xl font-bold tracking-tight text-foreground">{item.value}</p>
                        <p className="mt-2 text-xs text-muted-foreground">{item.note}</p>
                            </div>
                    ))}
                            </div>

                  <div className="rounded-xl border border-border bg-muted/40 px-5 py-4 text-xs leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground">Kaggle · {kaggleAccidentSource.slug}</span>
                    {' '}— {kaggleAccidentSource.note} 2025* covers January–April only ({fmtIN(1734)} rows). Peak hour {kaggleKpis.peakHourShare}% · weekend {kaggleKpis.weekendShare}%.
                          </div>

                  <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
                    <div className="surface-card rounded-xl p-6 sm:p-8">
                      <SectionLabel number="12">Year series</SectionLabel>
                      <h2 className="mt-2 font-display text-2xl text-foreground">Accidents and casualties · 2022–2025</h2>
                      <p className="mt-1 text-xs text-muted-foreground">Counts from indian_roads_dataset.csv. 2025 is a partial year.</p>
                      <div className="mt-6 h-[260px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart data={kaggleYearly} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} tickFormatter={(value) => fmtIN(value)} />
                            <Tooltip contentStyle={tooltipStyle} formatter={(value: number, name: string) => [fmtIN(value), name]} />
                            <Legend wrapperStyle={{ fontSize: 11 }} />
                            <Bar dataKey="accidents" name="Accidents" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                            <Line type="monotone" dataKey="casualties" name="Casualties" stroke="hsl(var(--foreground))" strokeWidth={2} dot={{ r: 3 }} />
                          </ComposedChart>
                        </ResponsiveContainer>
                            </div>
                    </div>
                    <div className="surface-card rounded-xl p-6 sm:p-8">
                      <SectionLabel number="13">Severity</SectionLabel>
                      <h2 className="mt-2 font-display text-2xl text-foreground">Minor / major / fatal</h2>
                      <div className="mt-6 h-[240px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie data={kaggleSeverity} dataKey="value" nameKey="name" innerRadius={58} outerRadius={88} paddingAngle={2}>
                              {kaggleSeverity.map((item) => (
                                <Cell key={item.name} fill={item.color} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => fmtIN(value)} />
                            <Legend wrapperStyle={{ fontSize: 11 }} />
                          </PieChart>
                        </ResponsiveContainer>
                            </div>
                          </div>
                        </div>

                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="surface-card rounded-xl p-6 sm:p-8">
                      <SectionLabel number="14">Cause</SectionLabel>
                      <h2 className="mt-2 font-display text-2xl text-foreground">Reported contributing factor</h2>
                      <div className="mt-6 h-[240px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={kaggleCause} layout="vertical" margin={{ left: 16 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                            <YAxis type="category" dataKey="name" width={108} axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                            <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => fmtIN(value)} />
                            <Bar dataKey="value" name="Records" fill="hsl(var(--secondary))" radius={[0, 4, 4, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div className="surface-card rounded-xl p-6 sm:p-8">
                      <SectionLabel number="15">Cities</SectionLabel>
                      <h2 className="mt-2 font-display text-2xl text-foreground">Eight-city sample</h2>
                      <div className="mt-6 h-[240px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={kaggleCities} layout="vertical" margin={{ left: 8 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                            <YAxis type="category" dataKey="name" width={88} axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                            <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => fmtIN(value)} />
                            <Bar dataKey="accidents" name="Accidents" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                      </div>

                  <div className="grid gap-6 lg:grid-cols-3">
                    <div className="surface-card rounded-xl p-6 lg:col-span-2">
                      <SectionLabel number="16">Hour of day</SectionLabel>
                      <h2 className="mt-2 font-display text-2xl text-foreground">When the sample records fall</h2>
                      <div className="mt-6 h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={kaggleHourly}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                            <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} interval={1} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                            <Tooltip contentStyle={tooltipStyle} />
                            <Area type="monotone" dataKey="n" name="Records" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary) / .22)" strokeWidth={2} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div className="surface-card rounded-xl p-6">
                      <SectionLabel number="17">Context</SectionLabel>
                      <h2 className="mt-2 font-display text-2xl text-foreground">Road, weather, density</h2>
                      <ul className="mt-5 space-y-3 text-sm">
                        {kaggleRoadType.map((item) => (
                          <li key={item.name} className="flex items-center justify-between gap-3 border-b border-border pb-2">
                            <span className="text-muted-foreground">{item.name} roads</span>
                            <span className="font-mono-ui text-foreground">{fmtIN(item.value)}</span>
                          </li>
                        ))}
                        {kaggleWeather.map((item) => (
                          <li key={item.name} className="flex items-center justify-between gap-3 border-b border-border pb-2 last:border-0">
                            <span className="text-muted-foreground">{item.name} weather</span>
                            <span className="font-mono-ui text-foreground">{fmtIN(item.value)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-muted/40 px-5 py-4 text-xs leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground">Kaggle · {kaggle5LSource.slug}</span>
                    {' '}— {kaggle5LSource.note} {fmtIN(kaggle5LKpis.records)} rows · {fmtIN(kaggle5LKpis.casualties)} casualties · mean risk {kaggle5LKpis.meanRisk}.
                      </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    {[
                      { n: '18', label: '5-lakh records', value: fmtIN(kaggle5LKpis.records) },
                      { n: '19', label: 'Casualties in-file', value: fmtIN(kaggle5LKpis.casualties) },
                      { n: '20', label: 'Peak-hour share', value: `${kaggle5LKpis.peakHourShare}%` },
                    ].map((item) => (
                      <div key={item.n} className="surface-card rounded-xl p-5">
                        <SectionLabel number={item.n}>{item.label}</SectionLabel>
                        <p className="mt-3 font-mono-ui text-2xl font-bold text-foreground">{item.value}</p>
                      </div>
                    ))}
                    </div>

                  <div className="flex flex-wrap gap-2">
                    {kaggle5LCause.map((item) => (
                      <span key={item.name} className="rounded-full border border-border bg-card px-3 py-1 font-mono-ui text-[11px] text-muted-foreground">
                        {item.name} · {fmtIN(item.value)}
                              </span>
                    ))}
                          </div>

                  <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr_1fr]">
                    <div className="surface-card rounded-xl p-6 sm:p-8">
                      <SectionLabel number="21">Five-lakh year series</SectionLabel>
                      <h2 className="mt-2 font-display text-2xl text-foreground">Accidents 2023–2026</h2>
                      <div className="mt-6 h-[240px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={kaggle5LYearly}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                            <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => fmtIN(value)} />
                            <Bar dataKey="accidents" name="Accidents" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                          </div>
                        </div>
                    <div className="surface-card rounded-xl p-6 sm:p-8">
                      <SectionLabel number="21b">Severity mix</SectionLabel>
                      <h2 className="mt-2 font-display text-2xl text-foreground">Nearly uniform</h2>
                      <div className="mt-6 h-[240px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie data={kaggle5LSeverity} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={48} outerRadius={78} paddingAngle={3} stroke="hsl(var(--card))" strokeWidth={3}>
                              {kaggle5LSeverity.map((entry) => (
                                <Cell key={entry.name} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => fmtIN(value)} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div className="surface-card rounded-xl p-6 sm:p-8">
                      <SectionLabel number="22">Five-lakh states</SectionLabel>
                      <h2 className="mt-2 font-display text-2xl text-foreground">Highest record counts</h2>
                      <div className="mt-6 h-[240px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={kaggle5LStates} layout="vertical" margin={{ left: 12 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                            <YAxis type="category" dataKey="name" width={110} axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                            <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => fmtIN(value)} />
                            <Bar dataKey="accidents" name="Records" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'knowledgeGraph' && (
                <div className="space-y-8 animate-fade">
                  <div className="surface-card rounded-xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border pb-6">
                      <div>
                        <SectionLabel number="23">Systemic architecture</SectionLabel>
                        <h2 className="mt-2 font-display text-3xl text-foreground">Road safety knowledge graph</h2>
                        <p className="mt-2 max-w-2xl text-xs sm:text-sm text-muted-foreground">Six interdependent pillars. Select a node to inspect edges, partners, and the 2026 evidence metric.</p>
                      </div>
                      <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-mono-ui text-muted-foreground">
                        <Network size={14} className="text-secondary" />
                        <span>6 pillars · 18 edges</span>
                      </div>
                    </div>
                    <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
                      <div className="rounded-xl border border-border bg-background/60 p-3 sm:p-5 overflow-x-auto">
                        <svg viewBox="0 0 640 430" className="min-w-[520px] w-full h-auto" role="img" aria-label="Interactive knowledge graph">
                          {knowledgeGraphNodes.flatMap((node) =>
                            node.connections.map((targetId) => {
                              const target = knowledgeGraphNodes.find((item) => item.id === targetId);
                              if (!target || node.id > target.id) return null;
                              const active = selectedNodeId === node.id || selectedNodeId === target.id;
                            return (
                                <line
                                  key={`${node.id}-${target.id}`}
                                  x1={node.x}
                                  y1={node.y}
                                  x2={target.x}
                                  y2={target.y}
                                  stroke={active ? 'hsl(var(--secondary))' : 'hsl(var(--border))'}
                                  strokeWidth={active ? 2.4 : 1.2}
                                  strokeDasharray={active ? '0' : '6 6'}
                                  className="transition-all duration-300"
                                />
                              );
                            }),
                          )}
                          {knowledgeGraphNodes.map((node) => {
                            const selected = selectedNodeId === node.id;
                            const linked = selectedKnowledgeNode.connections.includes(node.id);
                            return (
                              <g key={node.id} className="cursor-pointer" onClick={() => setSelectedNodeId(node.id)}>
                                <circle cx={node.x} cy={node.y} r={selected ? 34 : 28} fill={selected ? 'hsl(var(--secondary) / .2)' : linked ? 'hsl(var(--accent) / .12)' : 'hsl(var(--card))'} stroke={selected ? 'hsl(var(--secondary))' : linked ? 'hsl(var(--accent))' : 'hsl(var(--border))'} strokeWidth={selected ? 2.5 : 1.5} className="transition-all duration-300" />
                                <text x={node.x} y={node.y + 4} textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="700">{node.label}</text>
                              </g>
                            );
                          })}
                        </svg>
                        </div>
                      <div className="rounded-xl border border-border bg-card p-6 flex flex-col">
                        <div className="font-mono-ui text-[11px] font-bold text-secondary uppercase tracking-widest">Pillar / {selectedKnowledgeNode.category}</div>
                        <h3 className="mt-3 font-display text-2xl text-foreground">{selectedKnowledgeNode.label}</h3>
                        <p className="mt-1 font-mono-ui text-xs text-muted-foreground">{selectedKnowledgeNode.sub}</p>
                        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{selectedKnowledgeNode.description}</p>
                          <div className="mt-6 space-y-3">
                            <div className="rounded-md border border-border bg-background p-3">
                            <span className="block text-[11px] text-muted-foreground">Partners</span>
                            <span className="mt-1 block text-xs font-semibold">{selectedKnowledgeNode.fieldPartner}</span>
                            </div>
                            <div className="rounded-md border border-border bg-background p-3">
                            <span className="block text-[11px] text-muted-foreground">Evidence metric</span>
                              <span className="mt-1 block font-mono-ui text-xs font-bold text-accent">{selectedKnowledgeNode.metric}</span>
                            </div>
                          </div>
                        <div className="mt-5 flex flex-wrap gap-2">
                              {selectedKnowledgeNode.connections.map((connId) => {
                            const target = knowledgeGraphNodes.find((item) => item.id === connId);
                                if (!target) return null;
                                return (
                              <button key={connId} onClick={() => setSelectedNodeId(connId)} className="focus-ring inline-flex items-center gap-1 rounded-sm border border-border bg-muted/60 px-2.5 py-1 font-mono-ui text-[11px] font-semibold hover:border-secondary hover:text-secondary">
                                {target.label} <ChevronRight size={12} />
                                  </button>
                                );
                              })}
                            </div>
                        <Link href="/repository" className="focus-ring mt-6 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary text-xs font-bold text-primary-foreground hover:bg-primary/90">
                            Explore {selectedKnowledgeNode.evidenceCount} repository records <ArrowRight size={14} />
                          </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'graphql' && (
                <div className="space-y-8 animate-fade">
                  <div className="surface-card rounded-xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border pb-6">
                      <div>
                        <div className="flex items-center gap-2 text-accent">
                          <Code2 size={18} />
                          <SectionLabel number="24">Evidence query API</SectionLabel>
                        </div>
                        <h2 className="mt-2 font-display text-3xl text-foreground">GraphQL telemetry explorer</h2>
                        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{activePreset.description}</p>
                      </div>
                      <span className="font-mono-ui text-xs font-bold bg-muted px-3 py-1 rounded-md border border-border">ENDPOINT: /api/graphql/v2</span>
                      </div>
                    <div className="mt-6 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-muted-foreground mr-2">Presets</span>
                      {graphQLPresets.map((preset, index) => (
                        <button
                          key={preset.name}
                          onClick={() => handleSelectPreset(index)}
                          className={`focus-ring rounded-md px-3 py-1.5 font-mono-ui text-xs font-semibold ${activePresetIndex === index ? 'bg-secondary text-secondary-foreground' : 'bg-background border border-border hover:bg-muted'}`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                    <div className="mt-6 grid gap-6 lg:grid-cols-2">
                      <div className="rounded-xl border border-border bg-sidebar text-sidebar-foreground overflow-hidden flex flex-col min-h-[280px]">
                        <div className="flex items-center justify-between border-b border-sidebar-border bg-sidebar-accent/50 px-4 py-2.5">
                          <div className="flex items-center gap-2">
                            <Terminal size={14} className="text-secondary" />
                            <span className="font-mono-ui text-xs font-bold">QUERY EDITOR</span>
                          </div>
                          <button onClick={handleRunQuery} disabled={isQueryRunning} className="focus-ring inline-flex h-7 items-center gap-1.5 rounded bg-secondary px-3 font-mono-ui text-[11px] font-bold text-secondary-foreground">
                            {isQueryRunning ? <RefreshCw size={11} className="animate-spin" /> : <Play size={11} />}
                            <span>{isQueryRunning ? 'Running…' : 'Execute'}</span>
                          </button>
                        </div>
                        <pre className="p-4 flex-1 font-mono-ui text-xs leading-relaxed overflow-x-auto"><code>{executedQuery}</code></pre>
                        </div>
                      <div className="rounded-xl border border-border bg-card overflow-hidden flex flex-col min-h-[280px]">
                        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2.5">
                          <div className="flex items-center gap-2">
                            <Database size={14} className="text-accent" />
                            <span className="font-mono-ui text-xs font-bold">JSON RESPONSE</span>
                          </div>
                          <button onClick={handleCopyResponse} className="focus-ring inline-flex h-7 items-center gap-1 rounded border border-border bg-background px-2.5 font-mono-ui text-[11px] font-semibold">
                            {copiedResponse ? <Check size={12} className="text-accent" /> : <Copy size={12} />}
                            <span>{copiedResponse ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                        <div className="p-4 flex-1 max-h-[360px] overflow-y-auto">
                          {isQueryRunning ? (
                            <div className="space-y-2">
                              <div className="h-3 w-2/3 rounded bars-shimmer" />
                              <div className="h-3 w-full rounded bars-shimmer" />
                              <div className="h-3 w-5/6 rounded bars-shimmer" />
                              <div className="h-3 w-1/2 rounded bars-shimmer" />
                        </div>
                          ) : (
                            <pre className="font-mono-ui text-xs leading-relaxed overflow-x-auto"><code>{JSON.stringify(graphQLResponse, null, 2)}</code></pre>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="surface-card rounded-xl p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck size={18} className="text-secondary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sources as of {AS_OF}</p>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      Ministry of Road Transport & Highways, <em>Road Accidents in India 2024</em>. Lok Sabha Unstarred Q. 1939 answered 30 July 2026 (Annexure-I: 5,13,474 crashes and 1,83,434 deaths in 2025; 2,96,447 crashes and 1,01,139 deaths in 2026 through 27 Jul). PIB Delhi 30 Dec 2025 (NH 1,46,560 km) and 4 Feb 2026 (1.5 lakh cashless cover; 4,30,306 vehicles scrapped). WHO GSRRS. Kaggle samples: sehaj1104 (20,000 rows) and shivsharantripathi 5-lakh file — labelled separately from official series.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {evidenceSources.map((source) => (
                        <a
                          key={source.name}
                          href={source.href}
                          target="_blank"
                          rel="noreferrer"
                          className="focus-ring flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1.5"
                        >
                          <img
                            src={source.logo}
                            alt=""
                            className="h-5 w-5 object-contain"
                            onError={(event) => {
                              if (source.fallbackLogo && event.currentTarget.src !== source.fallbackLogo) {
                                event.currentTarget.src = source.fallbackLogo;
                              }
                            }}
                          />
                          <span className="font-mono-ui text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{source.short}</span>
                        </a>
                      ))}
                  </div>
                  </div>
                </div>
                </div>

              <div className="surface-card rounded-xl overflow-hidden flex flex-col md:flex-row">
                <div className="bg-muted p-6 sm:p-8 md:w-1/3 border-b md:border-b-0 md:border-r border-border">
                  <SectionLabel number="25">A useful question</SectionLabel>
                  <h3 className="mt-4 font-display text-3xl text-foreground">What does the aggregate leave out?</h3>
                  <span className="font-mono-ui text-[11px] font-bold text-secondary uppercase tracking-widest mt-6 inline-flex items-center gap-2"><Layers size={14} /> BARS evidence principle</span>
                </div>
                <div className="p-6 sm:p-8 md:w-2/3 flex flex-col justify-between">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    National totals — 1,83,434 deaths in 2025 — do not show who is walking without a footpath, waiting for an ambulance on an unlit district road, or crossing a freight junction at dusk. BARS exists to keep both the official signal and the lived evidence readable.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <Link href="/repository" className="focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-md bg-secondary px-5 text-xs font-bold text-secondary-foreground">
                      Browse evidence repository <ArrowRight size={14} />
                    </Link>
                    <Link href="/directory" className="focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-background px-5 text-xs font-semibold">
                      Connect with field practitioners
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
