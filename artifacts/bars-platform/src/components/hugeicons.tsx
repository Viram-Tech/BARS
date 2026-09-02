import React, { type SVGProps } from 'react';

export interface HugeIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
  color?: string;
  className?: string;
}

// -------------------------------------------------------------
// HUGEICONS FREE / OPEN-SOURCE STROKE ICON ENGINE
// 24x24 viewBox, stroke-width 1.5, round caps & joins
// -------------------------------------------------------------

function createHugeIcon(svgPath: (color: string, strokeWidth: number | string) => React.ReactNode) {
  return function HugeIcon({
    size = 20,
    strokeWidth = 1.5,
    color = 'currentColor',
    className = '',
    ...props
  }: HugeIconProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`shrink-0 select-none ${className}`}
        {...props}
      >
        {svgPath(color, strokeWidth)}
      </svg>
    );
  };
}

// System / Monitor
export const ComputerIcon = createHugeIcon(() => (
  <>
    <rect x="2.5" y="3.5" width="19" height="13" rx="2.5" />
    <path d="M8.5 20.5h7" />
    <path d="M12 16.5v4" />
  </>
));
export const Monitor = ComputerIcon;

// Sun / Light Mode
export const Sun01Icon = createHugeIcon(() => (
  <>
    <circle cx="12" cy="12" r="4.5" />
    <path d="M12 2.5v2M12 19.5v2M21.5 12h-2M4.5 12h-2M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4M18.7 18.7l-1.4-1.4M6.7 6.7L5.3 5.3" />
  </>
));
export const Sun = Sun01Icon;

// Moon / Dark Mode
export const Moon01Icon = createHugeIcon(() => (
  <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />
));
export const Moon = Moon01Icon;

// Language / Translation Global
export const LanguageSkill01Icon = createHugeIcon(() => (
  <>
    <circle cx="12" cy="12" r="9.5" />
    <path d="M2.8 9.5h18.4M2.8 14.5h18.4" />
    <path d="M12 2.5c2.6 2.5 4.2 6 4.2 9.5s-1.6 7-4.2 9.5c-2.6-2.5-4.2-6-4.2-9.5s1.6-7 4.2-9.5Z" />
  </>
));
export const Languages = LanguageSkill01Icon;
export const GlobalIcon = LanguageSkill01Icon;

export const TranslateIcon = createHugeIcon(() => (
  <>
    <path d="M3 5.5h11M8.5 5.5V4M6 19.5 10.2 9.5h1.1L15.5 19.5" />
    <path d="M7.2 16.5h7.1" />
    <path d="M17.2 8.5h4.3M19.4 8.5c0 4.2-2.3 7.7-5.2 9.5" />
    <path d="M21.5 12.2c-1.8 1.1-3.8 1.8-5.8 2" />
  </>
));
export const Translate = TranslateIcon;

// Chevrons
export const ChevronDownIcon = createHugeIcon(() => (
  <path d="m6 9.5 6 6 6-6" />
));
export const ChevronDown = ChevronDownIcon;

export const ChevronUpIcon = createHugeIcon(() => (
  <path d="m18 14.5-6-6-6 6" />
));
export const ChevronUp = ChevronUpIcon;

export const ChevronRightIcon = createHugeIcon(() => (
  <path d="m9.5 6 6 6-6 6" />
));
export const ChevronRight = ChevronRightIcon;

export const ChevronLeftIcon = createHugeIcon(() => (
  <path d="m14.5 18-6-6 6-6" />
));
export const ChevronLeft = ChevronLeftIcon;

// Navigation and Layout
export const DashboardSquare01Icon = createHugeIcon(() => (
  <>
    <rect x="3.5" y="3.5" width="7" height="7" rx="2" />
    <rect x="13.5" y="3.5" width="7" height="11" rx="2" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="2" />
    <rect x="13.5" y="17.5" width="7" height="3" rx="1.5" />
  </>
));
export const LayoutDashboard = DashboardSquare01Icon;

export const BookOpen01Icon = createHugeIcon(() => (
  <>
    <path d="M12 6.5c-2.4-1.6-5.8-1.5-8 .5v13.5c2.2-2 5.6-2.1 8-.5 2.4-1.6 5.8-1.5 8 .5V7c-2.2-2-5.6-2.1-8-.5Z" />
    <path d="M12 6.5v13.5" />
  </>
));
export const BookOpen = BookOpen01Icon;

export const UserGroupIcon = createHugeIcon(() => (
  <>
    <path d="M17 20.5v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1.5" />
    <circle cx="10" cy="7.5" r="3.5" />
    <path d="M21 20.5v-1.5a3.8 3.8 0 0 0-3-3.7" />
    <path d="M16 4.2a3.5 3.5 0 0 1 0 6.6" />
  </>
));
export const Users = UserGroupIcon;

export const SlidersHorizontalIcon = createHugeIcon(() => (
  <>
    <path d="M3.5 6.5h8M15.5 6.5h5" />
    <circle cx="13.5" cy="6.5" r="2" />
    <path d="M3.5 17.5h4M11.5 17.5h9" />
    <circle cx="9.5" cy="17.5" r="2" />
  </>
));
export const SlidersHorizontal = SlidersHorizontalIcon;

export const CommandIcon = createHugeIcon(() => (
  <path d="M18 9a3 3 0 1 0-3-3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12Z" />
));
export const Command = CommandIcon;

export const Menu01Icon = createHugeIcon(() => (
  <>
    <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
  </>
));
export const Menu = Menu01Icon;

export const Cancel01Icon = createHugeIcon(() => (
  <path d="m6 6 12 12M18 6 6 18" />
));
export const X = Cancel01Icon;

// Actions and Directives
export const ArrowRight01Icon = createHugeIcon(() => (
  <>
    <path d="M4 12h16" />
    <path d="m14 6 6 6-6 6" />
  </>
));
export const ArrowRight = ArrowRight01Icon;

export const ArrowUpRight01Icon = createHugeIcon(() => (
  <>
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </>
));
export const ArrowUpRight = ArrowUpRight01Icon;

export const Search01Icon = createHugeIcon(() => (
  <>
    <circle cx="11" cy="11" r="7.5" />
    <path d="m20.5 20.5-4.2-4.2" />
  </>
));
export const Search = Search01Icon;

export const Filter01Icon = createHugeIcon(() => (
  <path d="M3.5 5.5h17l-6.5 7.8v5.2l-4 2v-7.2L3.5 5.5Z" />
));
export const Filter = Filter01Icon;

export const Copy01Icon = createHugeIcon(() => (
  <>
    <rect x="8.5" y="8.5" width="11" height="11" rx="2" />
    <path d="M5.5 15.5H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8.5a2 2 0 0 1 2 2v.5" />
  </>
));
export const Copy = Copy01Icon;

export const CheckmarkCircle01Icon = createHugeIcon(() => (
  <>
    <circle cx="12" cy="12" r="9.5" />
    <path d="m8.5 12 2.5 2.5 5-5" />
  </>
));
export const CheckCircle2 = CheckmarkCircle01Icon;
export const Check = createHugeIcon(() => <path d="m5 12.5 4.5 4.5 9.5-9.5" />);

export const RefreshIcon = createHugeIcon(() => (
  <>
    <path d="M20 12A8 8 0 1 1 17.6 6.3L21 3v6h-6" />
  </>
));
export const RefreshCw = RefreshIcon;

// Communication & Verification
export const MessageCircle01Icon = createHugeIcon(() => (
  <path d="M12 21a9 9 0 1 0-7.3-3.8L3 21l3.8-1.7A8.9 8.9 0 0 0 12 21Z" />
));
export const MessageCircle = MessageCircle01Icon;

export const ShieldCheck01Icon = createHugeIcon(() => (
  <>
    <path d="M12 2.5 4 5.5v6.2c0 5.4 3.4 10.5 8 11.8 4.6-1.3 8-6.4 8-11.8V5.5l-8-3Z" />
    <path d="m9 12 2 2 4-4" />
  </>
));
export const ShieldCheck = ShieldCheck01Icon;

export const MapPin01Icon = createHugeIcon(() => (
  <>
    <path d="M12 21.5s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </>
));
export const MapPin = MapPin01Icon;

export const Alert01Icon = createHugeIcon(() => (
  <>
    <path d="M12 3 2.5 20h19L12 3Z" />
    <path d="M12 9v5M12 17.5v.5" />
  </>
));
export const AlertTriangle = Alert01Icon;

// Analytics & Visualizations
export const ChartBarLineIcon = createHugeIcon(() => (
  <>
    <path d="M3.5 20.5h17" />
    <rect x="5.5" y="11" width="3" height="6.5" rx="1" />
    <rect x="10.5" y="6" width="3" height="11.5" rx="1" />
    <rect x="15.5" y="8.5" width="3" height="9" rx="1" />
  </>
));
export const BarChart3 = ChartBarLineIcon;

export const PieChart01Icon = createHugeIcon(() => (
  <>
    <path d="M12 2.5a9.5 9.5 0 0 1 9.5 9.5H12V2.5Z" />
    <path d="M10 3.2A9.5 9.5 0 1 0 20.8 14H10V3.2Z" />
  </>
));
export const PieChart = PieChart01Icon;

export const Activity01Icon = createHugeIcon(() => (
  <path d="M3 12h4.5l2.5-6 4 12 2.5-6H21" />
));
export const Activity = Activity01Icon;

export const TrendingDown01Icon = createHugeIcon(() => (
  <>
    <path d="m21 18-7.5-7.5-4 4L2 7" />
    <path d="M15 18h6v-6" />
  </>
));
export const TrendingDown = TrendingDown01Icon;

export const TrendingUp01Icon = createHugeIcon(() => (
  <>
    <path d="m21 6-7.5 7.5-4-4L2 17" />
    <path d="M15 6h6v6" />
  </>
));
export const TrendingUp = TrendingUp01Icon;

export const Gauge01Icon = createHugeIcon(() => (
  <>
    <path d="M12 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
    <path d="M13.8 10.2 17 7" />
    <path d="M3.5 13.5a8.5 8.5 0 1 1 17 0" />
  </>
));
export const Gauge = Gauge01Icon;

export const Clock01Icon = createHugeIcon(() => (
  <>
    <circle cx="12" cy="12" r="9.5" />
    <path d="M12 7v5l3 2" />
  </>
));
export const Clock = Clock01Icon;

// Developer, Data & Knowledge Graph
export const Network01Icon = createHugeIcon(() => (
  <>
    <circle cx="12" cy="5" r="2.5" />
    <circle cx="5" cy="19" r="2.5" />
    <circle cx="19" cy="19" r="2.5" />
    <path d="M10.3 7 6.7 17M13.7 7l3.6 10M7.5 19h9" />
  </>
));
export const Network = Network01Icon;

export const Code01Icon = createHugeIcon(() => (
  <>
    <path d="m7.5 8-4.5 4 4.5 4M16.5 8l4.5 4-4.5 4M14 4.5l-4 15" />
  </>
));
export const Code2 = Code01Icon;

export const Database01Icon = createHugeIcon(() => (
  <>
    <ellipse cx="12" cy="5.5" rx="8.5" ry="3" />
    <path d="M3.5 5.5v6.5c0 1.7 3.8 3 8.5 3s8.5-1.3 8.5-3V5.5" />
    <path d="M3.5 12v6.5c0 1.7 3.8 3 8.5 3s8.5-1.3 8.5-3V12" />
  </>
));
export const Database = Database01Icon;

export const Terminal01Icon = createHugeIcon(() => (
  <>
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <path d="m7.5 9 3 3-3 3M13.5 15h3.5" />
  </>
));
export const Terminal = Terminal01Icon;

export const Play01Icon = createHugeIcon(() => (
  <path d="m8 6 10 6-10 6V6Z" />
));
export const Play = Play01Icon;

export const Pause01Icon = createHugeIcon(() => (
  <>
    <rect x="6.5" y="5" width="4" height="14" rx="0.8" />
    <rect x="13.5" y="5" width="4" height="14" rx="0.8" />
  </>
));
export const Pause = Pause01Icon;

export const Compass01Icon = createHugeIcon(() => (
  <>
    <circle cx="12" cy="12" r="9.5" />
    <polygon points="15.5,8.5 13.5,13.5 8.5,15.5 10.5,10.5" />
  </>
));
export const Compass = Compass01Icon;

export const Layers01Icon = createHugeIcon(() => (
  <>
    <path d="M12 2.5 2.5 7.5 12 12.5l9.5-5L12 2.5Z" />
    <path d="M2.5 12 12 17l9.5-5" />
    <path d="M2.5 16.5 12 21.5l9.5-5" />
  </>
));
export const Layers = Layers01Icon;

export const Info01Icon = createHugeIcon(() => (
  <>
    <circle cx="12" cy="12" r="9.5" />
    <path d="M12 11v6M12 7.5v.5" />
  </>
));
export const Info = Info01Icon;

export const FileText01Icon = createHugeIcon(() => (
  <>
    <path d="M14 2.5H6a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.5L14 2.5Z" />
    <path d="M14 2.5V8.5H20M8 13.5h8M8 17.5h5" />
  </>
));
export const FileText = FileText01Icon;

export const Share01Icon = createHugeIcon(() => (
  <>
    <circle cx="18" cy="5" r="2.5" />
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="18" cy="19" r="2.5" />
    <path d="m8.3 10.9 7.4-4.8M8.3 13.1l7.4 4.8" />
  </>
));
export const Share = Share01Icon;

export const Eye = createHugeIcon(() => (
  <>
    <path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z" />
    <circle cx="12" cy="12" r="3" />
  </>
));

export const Download01Icon = createHugeIcon(() => (
  <>
    <path d="M12 3.5v12M7.5 11l4.5 4.5 4.5-4.5" />
    <path d="M4 19.5h16" />
  </>
));
export const Download = Download01Icon;

export const Loading03Icon = createHugeIcon(() => (
  <path d="M12 3.5a8.5 8.5 0 1 1-6 2.5" />
));
export const Loader2Icon = Loading03Icon;
export const Loader2 = Loading03Icon;

export const CircleIcon = createHugeIcon(() => <circle cx="12" cy="12" r="3.5" />);
export const Circle = CircleIcon;

export const MinusSignIcon = createHugeIcon(() => <path d="M5 12h14" />);
export const Minus = MinusSignIcon;

export const MoreHorizontalIcon = createHugeIcon(() => (
  <>
    <circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none" />
  </>
));
export const MoreHorizontal = MoreHorizontalIcon;

export const ArrowLeft01Icon = createHugeIcon(() => (
  <>
    <path d="M20 12H4" />
    <path d="m10 6-6 6 6 6" />
  </>
));
export const ArrowLeft = ArrowLeft01Icon;

export const PanelLeftIcon = createHugeIcon(() => (
  <>
    <rect x="3.5" y="4" width="17" height="16" rx="2.5" />
    <path d="M9.5 4v16" />
  </>
));

export const DragDropVerticalIcon = createHugeIcon(() => (
  <>
    <circle cx="9" cy="6" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="15" cy="6" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="9" cy="12" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="15" cy="12" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="9" cy="18" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="15" cy="18" r="1.2" fill="currentColor" stroke="none" />
  </>
));
export const GripVertical = DragDropVerticalIcon;

export const Building02Icon = createHugeIcon(() => (
  <>
    <path d="M4.5 20.5V6.5A2 2 0 0 1 6.5 4.5h5A2 2 0 0 1 13.5 6.5v14" />
    <path d="M13.5 9.5H18a1.5 1.5 0 0 1 1.5 1.5v9.5" />
    <path d="M3.5 20.5h17" />
    <path d="M7.5 8h2M7.5 12h2M7.5 16h2M16 13h1.5M16 16.5h1.5" />
  </>
));
export const Building2 = Building02Icon;

export const UserCircle02Icon = createHugeIcon(() => (
  <>
    <circle cx="12" cy="12" r="9.5" />
    <circle cx="12" cy="9.5" r="2.6" />
    <path d="M6.8 18.2a5.6 5.6 0 0 1 10.4 0" />
  </>
));
export const UserRound = UserCircle02Icon;

export const Bookmark01Icon = createHugeIcon(() => (
  <path d="M6.5 3.5h11A1.5 1.5 0 0 1 19 5v15.5L12 16.5 5 20.5V5A1.5 1.5 0 0 1 6.5 3.5Z" />
));
export const Bookmark = Bookmark01Icon;

export const BookmarkCheck01Icon = createHugeIcon(() => (
  <>
    <path d="M6.5 3.5h11A1.5 1.5 0 0 1 19 5v15.5L12 16.5 5 20.5V5A1.5 1.5 0 0 1 6.5 3.5Z" />
    <path d="m9 10 2 2 4-4" />
  </>
));
export const BookmarkCheck = BookmarkCheck01Icon;

export const SentIcon = createHugeIcon(() => (
  <path d="M4 12 20.5 4.5 14 20.5l-2.2-6.8L4 12Z" />
));
export const Send = SentIcon;

export const AlertCircleIcon = createHugeIcon(() => (
  <>
    <circle cx="12" cy="12" r="9.5" />
    <path d="M12 8v5M12 16.5v.5" />
  </>
));
export const AlertCircle = AlertCircleIcon;

export const SparklesIcon = createHugeIcon(() => (
  <>
    <path d="M12 3.5 13.4 8.6 18.5 10 13.4 11.4 12 16.5 10.6 11.4 5.5 10 10.6 8.6 12 3.5Z" />
    <path d="M18.5 15.5 19.2 17.8 21.5 18.5 19.2 19.2 18.5 21.5 17.8 19.2 15.5 18.5 17.8 17.8 18.5 15.5Z" />
  </>
));
export const Sparkles = SparklesIcon;
