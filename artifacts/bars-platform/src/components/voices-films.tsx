import { useRef, useState } from 'react';
import { Pause, Play } from '@/components/hugeicons';

const films = [
  { src: '/media/org-vids/1.mp4', poster: '/media/org-vids/poster-1.webp', label: 'Voices for safer roads · 01' },
  { src: '/media/org-vids/2.mp4', poster: '/media/org-vids/poster-2.webp', label: 'Voices for safer roads · 02' },
  { src: '/media/org-vids/3.mp4', poster: '/media/org-vids/poster-3.png', label: 'Voices for safer roads · 03' },
];

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
    <div className="mt-8 grid gap-3 sm:grid-cols-3">
      {films.map((film, index) => {
        const playing = playingIndex === index;
        return (
          <div key={film.src} className="relative aspect-square overflow-hidden border border-border bg-muted">
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
            <button
              type="button"
              onClick={() => void toggle(index)}
              aria-label={playing ? `Pause ${film.label}` : `Play ${film.label}`}
              className="focus-ring absolute inset-0 z-10 flex items-center justify-center"
            >
              <span
                className={`flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full text-foreground transition-opacity duration-200 sm:h-20 sm:w-20 ${
                  playing ? 'bg-background/50 opacity-80 hover:opacity-100' : 'bg-background/90 opacity-100'
                }`}
              >
                {playing ? <Pause size={34} /> : <Play size={34} />}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
