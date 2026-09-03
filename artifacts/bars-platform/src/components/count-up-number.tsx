import { useEffect, useRef, useState } from 'react';
import { useCountUp } from '@/hooks/use-count-up';

const fmtIN = (value: number) => new Intl.NumberFormat('en-IN').format(value);

type CountUpNumberProps = {
  value: number;
  duration?: number;
  delay?: number;
  className?: string;
  suffix?: string;
  /** Skip scroll trigger — animate when `enabled` becomes true. */
  immediate?: boolean;
  /** Gate the animation (e.g. `!isLoading`). Defaults to true. */
  enabled?: boolean;
};

export function CountUpNumber({
  value,
  duration = 720,
  delay = 0,
  className,
  suffix = '',
  immediate = false,
  enabled = true,
}: CountUpNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(immediate);
  const [started, setStarted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (immediate || reduceMotion) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) {
      setStarted(true);
      return;
    }

    if (!enabled || !inView) {
      setStarted(false);
      return;
    }

    setStarted(false);
    const timer = window.setTimeout(() => setStarted(true), delay);
    return () => window.clearTimeout(timer);
  }, [enabled, inView, delay, reduceMotion, value]);

  const display = useCountUp(value, (started || reduceMotion) && enabled, duration, 1);

  return (
    <span ref={ref} className={className} aria-label={`${fmtIN(value)}${suffix}`}>
      {fmtIN(reduceMotion ? value : display)}
      {suffix}
    </span>
  );
}
