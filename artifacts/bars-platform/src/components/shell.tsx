import { type ReactNode, useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  BookOpen, 
  Command, 
  LayoutDashboard, 
  Users, 
  X, 
  Menu, 
  MessageCircle, 
  Moon, 
  Sun, 
  Monitor,
  SlidersHorizontal,
  ArrowUpRight,
  Languages,
  type LucideIcon 
} from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { indicLanguages } from '@/lib/languages';
import barsLogo from '@assets/BARS_LOGO_1788333872731.png';

type ThemeMode = 'light' | 'dark' | 'system';

export function Shell({
  children,
  onOpenAssistant,
}: {
  children: ReactNode;
  onOpenAssistant: () => void;
}) {
  const [location] = useLocation();
  const { language, setLanguage, copy, direction } = useLanguage();
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
    { href: '/', label: copy.home, icon: Command },
    { href: '/repository', label: copy.repository, icon: BookOpen },
    { href: '/dashboard', label: copy.dashboard, icon: LayoutDashboard },
    { href: '/directory', label: copy.directory, icon: Users },
  ];

  return (
    <div className="bars-grain min-h-[100dvh] bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 z-40 flex w-[280px] flex-col border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform duration-300 md:translate-x-0 ${direction === 'rtl' ? 'right-0 border-l' : 'left-0 border-r'} ${mobileOpen ? 'translate-x-0' : direction === 'rtl' ? 'translate-x-full' : '-translate-x-full'}`}>
        <div className="flex h-[72px] items-center px-6">
          <Link href="/" data-testid="link-logo" className="focus-ring flex items-center gap-3">
            <span className="flex h-12 w-[136px] items-center justify-center rounded-md bg-white px-2 shadow-sm">
              <img src={barsLogo} alt="BARS — Bharat Association of Road Safety" className="max-h-10 w-full object-contain" />
            </span>
          </Link>
          <button aria-label="Close navigation" data-testid="button-close-menu" onClick={() => setMobileOpen(false)} className="focus-ring ml-auto p-2 md:hidden text-sidebar-foreground/70 hover:text-sidebar-foreground rounded-sm"><X size={18} /></button>
        </div>
        
        <div className="flex-1 px-4 py-8 overflow-y-auto">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-[.18em] text-sidebar-foreground/45">{copy.navigate}</p>
          <nav className="mt-4 space-y-1.5" aria-label="Main navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = item.href === location;
              return (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`} 
                  className={`focus-ring flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${active ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'}`}
                >
                  <Icon size={17} strokeWidth={active ? 2.2 : 1.7} className={active ? 'text-secondary' : ''} />
                  <span>{item.label}</span>
                  {item.href === '/repository' && savedCount > 0 && (
                    <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-secondary/20 px-1.5 font-mono-ui text-[10px] text-secondary">
                      {savedCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
          
          <div className="mt-10 pt-8">
             <p className="px-3 text-[10px] font-semibold uppercase tracking-[.18em] text-sidebar-foreground/45">{copy.workspace}</p>
            <Link 
              href="/design-system" 
              data-testid="link-nav-design-system" 
              className={`focus-ring mt-4 flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${location === '/design-system' ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'}`}
            >
              <SlidersHorizontal size={17} className={location === '/design-system' ? 'text-secondary' : ''} />
               <span>{copy.designSystem}</span>
            </Link>
          </div>
        </div>
        
        <div className="p-4 bg-sidebar-accent/30 mt-auto">
          <button onClick={onOpenAssistant} data-testid="button-sidebar-ask" className="focus-ring group flex w-full items-center gap-3 rounded-md border border-sidebar-border bg-sidebar-accent/50 px-3 py-3 text-left transition-all hover:border-secondary/50 hover:bg-sidebar-accent shadow-sm">
            <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-secondary text-secondary-foreground shadow-sm"><MessageCircle size={16} /></span>
            <span className="min-w-0">
               <span className="block text-sm font-semibold text-sidebar-foreground">{copy.askBars}</span>
              <span className="block truncate text-[11px] text-sidebar-foreground/60">Evidence, explained.</span>
            </span>
            <ArrowUpRight className="ml-auto text-sidebar-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-secondary" size={15} />
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <button aria-label="Close menu overlay" data-testid="button-menu-overlay" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-30 bg-foreground/30 backdrop-blur-sm md:hidden animate-fade" />
      )}

      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-w-0 ${direction === 'rtl' ? 'md:pr-[280px]' : 'md:pl-[280px]'}`}>
        <header className="sticky top-0 z-20 flex h-[72px] shrink-0 items-center justify-between border-b border-border bg-background/80 px-5 backdrop-blur-md md:px-8">
          <button aria-label="Open navigation" data-testid="button-open-menu" onClick={() => setMobileOpen(true)} className="focus-ring p-2 -ml-2 rounded-sm md:hidden hover:bg-muted"><Menu size={21} /></button>
          
          <div className="hidden items-center gap-4 text-xs font-medium text-muted-foreground md:flex">
            <span className="font-mono-ui text-[10px] text-secondary tracking-wider bg-secondary/10 px-2 py-1 rounded-sm">2030 / INDIA</span>
            <span className="h-4 w-px bg-border" />
            <span>Road safety, as shared infrastructure</span>
          </div>
          
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
             <button onClick={onOpenAssistant} data-testid="button-header-ask" className="focus-ring inline-flex h-9 items-center gap-2 rounded-md bg-secondary/10 px-3 text-sm font-semibold text-secondary hover:bg-secondary/20 transition-colors shadow-sm">
              <MessageCircle size={16} />
              <span className="hidden sm:inline">Ask BARS</span>
              <kbd className="hidden border border-secondary/30 rounded-[3px] bg-background px-1.5 py-0.5 font-mono-ui text-[10px] text-secondary sm:inline shadow-sm">⌘ K</kbd>
            </button>
            
             <div className="mx-1 h-5 w-px bg-border" />

             <div className="relative flex items-center rounded-md border border-border bg-muted/40 pl-1">
               <Languages size={14} className="pointer-events-none absolute left-2 text-secondary" />
               <label className="sr-only" htmlFor="language-preference">{copy.language}</label>
               <select
                 id="language-preference"
                 value={language}
                 onChange={(event) => setLanguage(event.target.value as typeof language)}
                 data-testid="select-language-preference"
                 title={copy.language}
                 className="bars-language-select focus-ring h-9 max-w-[136px] appearance-none bg-transparent pl-7 pr-2 text-xs font-semibold text-foreground outline-none hover:text-foreground cursor-pointer"
               >
                  <option value="en">English · English</option>
                  <optgroup label="22 official Indic languages">
                    {indicLanguages.filter((item) => item.code !== 'en').map((item) => <option key={item.code} value={item.code}>{item.nativeName} · {item.name}</option>)}
                  </optgroup>
               </select>
             </div>

             <div className="mx-1 h-5 w-px bg-border" />
            
             <div role="group" aria-label="Theme preference" className="flex items-center gap-1 rounded-md border border-border bg-muted/40 p-1">
               <button
                 type="button"
                  aria-label={copy.system}
                  aria-pressed={theme === 'system'}
                  title={copy.system}
                  onClick={() => setTheme('system')}
                  data-testid="button-theme-system"
                  className={`focus-ring flex h-7 w-7 items-center justify-center rounded-sm transition-colors ${theme === 'system' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:bg-background/70 hover:text-foreground'}`}
               >
                  <Monitor size={14} strokeWidth={1.8} />
               </button>
                <button
                  type="button"
                  aria-label={copy.light}
                  aria-pressed={theme === 'light'}
                  title={copy.light}
                  onClick={() => setTheme('light')}
                  data-testid="button-theme-light"
                  className={`focus-ring flex h-7 w-7 items-center justify-center rounded-sm transition-colors ${theme === 'light' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:bg-background/70 hover:text-foreground'}`}
               >
                  <Sun size={14} strokeWidth={1.8} />
                </button>
                <button
                  type="button"
                  aria-label={copy.dark}
                  aria-pressed={theme === 'dark'}
                  title={copy.dark}
                  onClick={() => setTheme('dark')}
                  data-testid="button-theme-dark"
                  className={`focus-ring flex h-7 w-7 items-center justify-center rounded-sm transition-colors ${theme === 'dark' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:bg-background/70 hover:text-foreground'}`}
                >
                  <Moon size={14} strokeWidth={1.8} />
                </button>
            </div>
          </div>
        </header>
        <main className="flex-1 flex flex-col">{children}</main>
      </div>
    </div>
  );
}
