import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BookOpen,
  Command,
  LayoutDashboard,
  Menu,
  Moon,
  Sun,
  Users,
  X,
  type HugeIconProps,
} from '@/components/hugeicons';
import { HugeiconsIcon } from '@hugeicons/react';
import { LanguagesIcon } from '@hugeicons/core-free-icons';
import { useLanguage } from '@/lib/language-context';
import { indicLanguages } from '@/lib/languages';
import { BarsLogo } from '@/components/bars-logo';

type ThemeMode = 'light' | 'dark' | 'system';

function applyTheme(theme: ThemeMode) {
  const root = document.documentElement;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.classList.toggle('dark', theme === 'dark' || (theme === 'system' && prefersDark));
}

function LanguageMenu({ align = 'right' }: { align?: 'left' | 'right' }) {
  const { language, setLanguage, copy } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={copy.language}
        aria-haspopup="listbox"
        aria-expanded={open}
        data-testid="select-language-preference"
        onClick={() => setOpen((value) => !value)}
        className="focus-ring flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
      >
        <HugeiconsIcon icon={LanguagesIcon} size={18} color="currentColor" strokeWidth={1.7} />
      </button>
      {open && (
        <div
          role="listbox"
          aria-label={copy.language}
          className={`absolute top-[calc(100%+10px)] z-50 max-h-[min(360px,70vh)] w-[220px] overflow-y-auto rounded-2xl border border-border bg-popover p-1 shadow-lg animate-fade ${align === 'right' ? 'right-0' : 'left-0'}`}
        >
          {indicLanguages.map((item) => {
            const selected = language === item.code;
            return (
              <button
                key={item.code}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => {
                  setLanguage(item.code);
                  setOpen(false);
                }}
                className={`focus-ring flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors ${selected ? 'bg-secondary/10 text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
              >
                <span className="w-8 shrink-0 font-mono-ui text-[11px] font-bold tracking-wider">{item.code.toUpperCase()}</span>
                <span className="min-w-0 truncate text-xs">{item.nativeName}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ThemeToggle() {
  const { copy } = useLanguage();
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'system';
    const stored = (localStorage.getItem('bars-theme') as ThemeMode) || 'system';
    applyTheme(stored);
    return stored;
  });
  const [prefersDark, setPrefersDark] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false,
  );

  useEffect(() => {
    localStorage.setItem('bars-theme', theme);
    applyTheme(theme);
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      setPrefersDark(media.matches);
      applyTheme(theme);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [theme]);

  const resolvedDark = theme === 'dark' || (theme === 'system' && prefersDark);

  return (
    <button
      type="button"
      aria-label={resolvedDark ? copy.light : copy.dark}
      title={resolvedDark ? copy.light : copy.dark}
      data-testid="button-theme-toggle"
      onClick={() => setTheme(resolvedDark ? 'light' : 'dark')}
      className="focus-ring flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
    >
      {resolvedDark ? <Sun size={18} strokeWidth={1.7} /> : <Moon size={18} strokeWidth={1.7} />}
    </button>
  );
}

export function Navbar1() {
  const [location] = useLocation();
  const { copy } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const navItems: { href: string; label: string; icon: React.ComponentType<HugeIconProps> }[] = [
    { href: '/', label: copy.home, icon: Command },
    { href: '/repository', label: copy.repository, icon: BookOpen },
    { href: '/dashboard', label: copy.dashboard, icon: LayoutDashboard },
    { href: '/directory', label: copy.directory, icon: Users },
  ];

  useEffect(() => setIsOpen(false), [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className="flex w-full justify-center px-4 pb-3 pt-5 sm:px-6 sm:pb-4 sm:pt-6">
      <div className="relative z-10 flex w-full max-w-5xl items-center justify-between rounded-full border border-border bg-card/90 px-3 py-2 shadow-[0_12px_40px_hsl(var(--foreground)/.10)] backdrop-blur-xl sm:px-5 sm:py-2.5">
        <Link href="/" data-testid="link-header-logo" className="focus-ring shrink-0 rounded-full px-1">
          <motion.div
            className="flex items-center"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.25 }}
          >
            <BarsLogo size="md" />
          </motion.div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navItems.map((item, index) => {
            const active = item.href === location;
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: index * 0.05 }}
                whileHover={{ scale: 1.04 }}
              >
                <Link
                  href={item.href}
                  data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}
                  className={`focus-ring inline-flex h-9 items-center whitespace-nowrap rounded-full px-3.5 text-sm font-medium transition-colors ${
                    active ? 'bg-secondary/15 text-secondary' : 'text-foreground/80 hover:text-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <motion.div
          className="hidden items-center gap-2 md:flex"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <LanguageMenu />
          <ThemeToggle />
        </motion.div>

        <motion.button
          type="button"
          aria-label="Open navigation"
          data-testid="button-open-menu"
          className="focus-ring flex h-10 w-10 items-center justify-center rounded-full text-foreground md:hidden"
          onClick={() => setIsOpen(true)}
          whileTap={{ scale: 0.92 }}
        >
          <Menu size={20} />
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-background px-6 pt-24 md:hidden"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <motion.button
              type="button"
              aria-label="Close navigation"
              data-testid="button-close-menu"
              className="focus-ring absolute right-6 top-6 rounded-full p-2 text-foreground"
              onClick={() => setIsOpen(false)}
              whileTap={{ scale: 0.92 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              <X size={22} />
            </motion.button>

            <div className="flex flex-col space-y-5">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const active = item.href === location;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.08 + 0.08 }}
                  >
                    <Link
                      href={item.href}
                      data-testid={`link-drawer-${item.label.toLowerCase().replaceAll(' ', '-')}`}
                      className={`focus-ring flex items-center gap-3 text-lg font-medium ${active ? 'text-secondary' : 'text-foreground'}`}
                    >
                      <Icon size={18} className={active ? 'text-secondary' : 'text-muted-foreground'} />
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ delay: 0.42 }}
                className="flex flex-wrap items-center gap-2 border-t border-border pt-6"
              >
                <LanguageMenu align="left" />
                <ThemeToggle />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
