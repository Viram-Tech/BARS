import { mediaLibrary } from '@/lib/media-library';

type MediaStoryProps = {
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
};

export function MediaStory({ image, eyebrow, title, description, className = '' }: MediaStoryProps) {
  return (
    <div className={`grid overflow-hidden rounded-2xl border border-border bg-card lg:grid-cols-[1.05fr_.95fr] ${className}`}>
      <div className="relative min-h-[260px] overflow-hidden bg-muted">
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/25 to-transparent dark:from-background/92" />
        <div className="relative flex h-full min-h-[260px] flex-col justify-end p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-secondary">On the road</p>
          <p className="mt-3 max-w-sm font-display text-3xl leading-none text-foreground sm:text-4xl">Design for the human in the road.</p>
        </div>
      </div>
      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
        <p className="font-mono-ui text-[10px] font-bold uppercase tracking-[.16em] text-secondary">{eyebrow}</p>
        <h3 className="mt-3 font-display text-3xl leading-tight text-foreground sm:text-4xl">{title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{description}</p>
        <div className="mt-6 overflow-hidden rounded-xl border border-border bg-muted/30">
          <video
            controls
            muted
            playsInline
            preload="metadata"
            poster={image}
            aria-label={title}
            className="aspect-video w-full bg-muted object-cover"
          >
            <source src={mediaLibrary.reels[0].src} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}
