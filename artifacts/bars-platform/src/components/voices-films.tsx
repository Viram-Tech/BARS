import { useRef, useState } from 'react';
import { Pause, Play } from '@/components/hugeicons';
import { cn } from '@/lib/utils';
import { barsOrgMedia } from '@/lib/bars-org-media';

export function VoicesFilms() {
  const refs = useRef<Array<HTMLVideoElement | null>>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const toggle = async (index: number) => {
    const video = refs.current[index];
    if (!video) return;

    refs.current.forEach((other, otherIndex) => {
      if (otherIndex !== index) other?.pause();
    });

    if (video.paused) {
      video.muted = false;
      video.volume = 1;
      try {
        await video.play();
        setPlayingIndex(index);
      } catch {
        setPlayingIndex(null);
      }
    } else {
      video.pause();
      setPlayingIndex(null);
    }
  };

  return (
    <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 lg:max-w-5xl lg:gap-6">
      {barsOrgMedia.orgFilms.map((film, index) => {
        const playing = playingIndex === index;
        const isCenter = index === 1;

        return (
          <div
            key={film.src}
            className={cn(
              'relative mx-auto aspect-[9/16] w-full max-w-[260px] overflow-hidden rounded-3xl bg-muted shadow-md ring-1 ring-border/60 sm:max-w-none',
              isCenter && 'sm:scale-[1.03] sm:-translate-y-1',
            )}
          >
            <video
              ref={(node) => {
                refs.current[index] = node;
              }}
              src={film.src}
              poster={film.poster}
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
              aria-label={film.label}
              onPlay={() => setPlayingIndex(index)}
              onPause={() => setPlayingIndex((current) => (current === index ? null : current))}
              onEnded={() => setPlayingIndex((current) => (current === index ? null : current))}
            />

            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/55 via-black/20 to-transparent"
              aria-hidden
            />

            <button
              type="button"
              onClick={() => void toggle(index)}
              aria-label={playing ? `Pause ${film.label}` : `Play ${film.label}`}
              className="focus-ring absolute inset-0 z-10 flex items-center justify-center"
            >
              <span
                className={cn(
                  'flex size-14 items-center justify-center rounded-full text-secondary-foreground shadow-lg transition-all duration-200 sm:size-16',
                  playing
                    ? 'bg-secondary/75 opacity-90 hover:opacity-100'
                    : 'bg-secondary opacity-100 hover:scale-105',
                )}
              >
                {playing ? <Pause size={28} /> : <Play size={28} className="ml-0.5" />}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
