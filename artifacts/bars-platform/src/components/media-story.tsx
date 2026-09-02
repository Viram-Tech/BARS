import { Play, ShieldCheck } from 'lucide-react';

type MediaStoryProps = {
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
};

const fieldFilmUrl = 'https://assets.mixkit.co/videos/preview/mixkit-traffic-on-a-road-in-the-city-11-large.mp4';

export function MediaStory({ image, eyebrow, title, description, className = '' }: MediaStoryProps) {
  return (
    <div className={`grid overflow-hidden rounded-2xl border border-border bg-card shadow-sm lg:grid-cols-[1.05fr_.95fr] ${className}`}>
      <div className="relative min-h-[280px] overflow-hidden bg-primary">
        <img src={image} alt="Road traffic and safer journeys in India" className="absolute inset-0 h-full w-full object-cover opacity-85" />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/90 via-primary/35 to-transparent" />
        <div className="relative flex h-full flex-col justify-between p-6 text-primary-foreground sm:p-8">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1.5 font-mono-ui text-[10px] font-bold uppercase tracking-[.14em]">
              <ShieldCheck size={13} className="text-secondary" /> BARS field film
            </span>
            <span className="font-mono-ui text-[10px] font-bold tracking-widest text-primary-foreground/70">04:12</span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[.16em] text-secondary">Watch the signal</p>
            <p className="mt-3 max-w-sm font-display text-4xl leading-none sm:text-5xl">Design for the human in the road.</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
        <p className="font-mono-ui text-[10px] font-bold uppercase tracking-[.16em] text-secondary">{eyebrow}</p>
        <h3 className="mt-4 font-display text-3xl leading-tight text-primary dark:text-foreground sm:text-4xl">{title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{description}</p>
        <div className="mt-7 overflow-hidden rounded-xl border border-border bg-muted/30">
          <video controls muted loop playsInline preload="metadata" poster={image} className="aspect-video w-full bg-primary object-cover">
            <source src={fieldFilmUrl} type="video/mp4" />
            Your browser does not support embedded video. The field film is available with the BARS media brief.
          </video>
        </div>
        <p className="mt-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Play size={12} className="fill-secondary text-secondary" /> A short visual briefing for practitioners and partners.
        </p>
      </div>
    </div>
  );
}