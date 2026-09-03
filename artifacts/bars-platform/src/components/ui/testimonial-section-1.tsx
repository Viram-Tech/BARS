import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

export type TestimonialVoice = {
  name: string;
  role: string;
  photo: string;
  quote: string;
};

const lightToBlackDark =
  'bg-card text-foreground border border-border dark:bg-primary dark:text-primary-foreground dark:border-border/50';

type CardTone = {
  shell: string;
  ring: string;
  divider: string;
};

const toneByName: Record<string, CardTone> = {
  'Sudhir Malhotra': {
    shell: lightToBlackDark,
    ring: 'border-secondary',
    divider: 'border-border dark:border-primary-foreground/15',
  },
  'Naresh Raghavan': {
    shell: 'bg-secondary text-secondary-foreground border-transparent',
    ring: 'border-primary',
    divider: 'border-secondary-foreground/15',
  },
  'Dr. Mats-Åke Belin': {
    shell:
      'bg-primary text-primary-foreground border-transparent dark:bg-[hsl(40_20%_98%)] dark:text-[hsl(24_10%_12%)] dark:border dark:border-border/70',
    ring: 'border-secondary dark:border-secondary',
    divider: 'border-primary-foreground/15 dark:border-[hsl(24_10%_12%)]/12',
  },
  'Sh. V. Umashankar': {
    shell: lightToBlackDark,
    ring: 'border-secondary',
    divider: 'border-border dark:border-primary-foreground/15',
  },
  'Rama Shankar Pandey': {
    shell:
      'bg-foreground text-background border-transparent dark:bg-[hsl(40_20%_98%)] dark:text-[hsl(24_10%_12%)] dark:border dark:border-border/70',
    ring: 'border-secondary dark:border-secondary',
    divider: 'border-background/15 dark:border-[hsl(24_10%_12%)]/12',
  },
  'Pawan Mulukutla': {
    shell: 'bg-secondary text-secondary-foreground border-transparent',
    ring: 'border-primary',
    divider: 'border-secondary-foreground/15',
  },
};

const defaultTone: CardTone = {
  shell: lightToBlackDark,
  ring: 'border-secondary',
  divider: 'border-border dark:border-primary-foreground/15',
};

type TestimonialSectionProps = {
  voices: TestimonialVoice[];
  className?: string;
};

export function TestimonialSection1({ voices, className }: TestimonialSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16, filter: 'blur(3px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.35, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className={cn(
        'grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6',
        className,
      )}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {voices.slice(0, 6).map((voice) => {
        const tone = toneByName[voice.name] ?? defaultTone;

        return (
          <motion.figure
            key={voice.name}
            variants={itemVariants}
            whileHover={{ scale: 1.012 }}
            className={cn(
              'flex aspect-square w-full flex-col overflow-hidden rounded-2xl p-5 sm:p-6',
              tone.shell,
            )}
          >
            <blockquote className="min-h-0 flex-1 overflow-y-auto pr-1 [scrollbar-width:thin]">
              <p className="text-[13px] leading-[1.55] sm:text-sm sm:leading-relaxed">
                &ldquo;{voice.quote}&rdquo;
              </p>
            </blockquote>

            <figcaption
              className={cn(
                'mt-4 flex shrink-0 items-center gap-3 border-t pt-4 sm:gap-3.5',
                tone.divider,
              )}
            >
              <div
                className={cn(
                  'size-10 shrink-0 overflow-hidden rounded-full border-[1.5px] sm:size-11',
                  tone.ring,
                )}
              >
                <img
                  src={voice.photo}
                  alt={voice.name}
                  loading="lazy"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="min-w-0 flex-1">
                <cite className="block truncate text-sm font-bold not-italic">{voice.name}</cite>
                <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug opacity-85 sm:text-xs">{voice.role}</p>
              </div>
            </figcaption>
          </motion.figure>
        );
      })}
    </motion.div>
  );
}
